"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const cards = [
  '[data-reveal="card"]', '.practitioner-card', '.services-page-card', '.psychologist-card',
  '.concern-practitioner-card', '.concern-sign-grid > li', '.concern-benefit-grid > li',
  '.concern-session-grid > li', '.concern-experience-grid > li', '.concern-resource-grid > a',
  '.concern-process-steps > li', '.reviews-carousel-card', '.thanal-practitioner',
  '#mood [role="group"] > button', '.therapist-profile-services > li',
].join(", ");
const targets = `${cards}, h1, h2, h3, h4, h5, h6, p`;
const excluded = 'button, label, summary, [role="alert"], [aria-live], .psychologist-results-bar';

/** Once-per-visit entrances, with readable content before JS and no layout shifts. */
export function ScrollReveals() {
  const pathname = usePathname();
  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<HTMLElement>();
    const animations = new Set<Animation>();
    let scanFrame = 0;
    let disposed = false;

    const observer = new IntersectionObserver((entries) => {
      let order = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        if (reduced.matches || el.contains(document.activeElement)) continue;
        const card = el.matches(cards);
        const delay = Math.min(Number(el.dataset.revealDelay || 0) + order++ * 45, 220);
        const track = (animation: Animation) => {
          animations.add(animation);
          void animation.finished.then(() => animations.delete(animation)).catch(() => {});
        };
        if (card) {
          track(el.animate([
            { opacity: 0.01, transform: "scale(0.94)", transformOrigin: "top left" },
            { opacity: 1, transform: "scale(1)", transformOrigin: "top left" },
          ], { duration: 720, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" }));
        } else {
          const words = Array.from(el.querySelectorAll<HTMLElement>("[data-blur-word]"));
          const heading = el.matches("h1, h2, h3, h4, h5, h6");
          const booking = pathname.includes("/book");
          if (heading) {
            const stagger = Math.min(booking ? 45 : 80, (booking ? 350 : 850) / Math.max(words.length - 1, 1));
            (words.length ? words : [el]).forEach((word, index) => track(word.animate([
              { opacity: 0.01, filter: "blur(10px)", translate: "0 18px", offset: 0 },
              { opacity: 0.65, filter: "blur(4px)", translate: "0 -2px", offset: 0.5 },
              { opacity: 1, filter: "blur(0px)", translate: "0 0", offset: 1 },
            ], { duration: booking ? 450 : 700, delay: (booking ? 0 : delay) + index * stagger, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" })));
          } else {
            // Words on the same rendered line move in unison. Measuring here
            // respects the current font and responsive wrapping without DOM surgery.
            const lines: { top: number; words: HTMLElement[] }[] = [];
            for (const word of words) {
              const top = word.getBoundingClientRect().top;
              let line = lines.find((item) => Math.abs(item.top - top) < 4);
              if (!line) { line = { top, words: [] }; lines.push(line); }
              line.words.push(word);
            }
            const groups = lines.length ? lines.map((line) => line.words) : [[el]];
            groups.forEach((line, index) => {
              const lineDelay = (booking ? 0 : delay) + Math.min(index * 90, 360);
              for (const word of line) track(word.animate([
                { opacity: 0.01, filter: "blur(5px)", translate: "0 10px" },
                { opacity: 1, filter: "blur(0px)", translate: "0 0" },
              ], { duration: booking ? 350 : 520, delay: lineDelay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" }));
            });
          }
        }
      }
    }, { rootMargin: "0px 0px -20px 0px", threshold: 0.05 });

    function scan() {
      if (reduced.matches || document.fonts.status !== "loaded") return;
      main!.querySelectorAll<HTMLElement>(targets).forEach((el) => {
        if (seen.has(el) || el.closest(excluded)) return;
        // One entrance per card/group; its child text follows that entrance.
        if (el.parentElement?.closest(cards)) return;
        // Keep booking controls and validation messages steady while stepping through forms.
        if (pathname.includes("/book") && !el.matches("h1, h1 + p")) return;
        seen.add(el);
        observer.observe(el);
      });
    }
    void document.fonts.ready.then(() => { if (!disposed) scan(); });
    const mutations = new MutationObserver(() => {
      if (!scanFrame) scanFrame = requestAnimationFrame(() => { scanFrame = 0; scan(); });
    });
    mutations.observe(main, { childList: true, subtree: true });
    const stop = () => {
      if (!reduced.matches) { scan(); return; }
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const onFocus = (event: FocusEvent) => {
      const target = event.target as Element | null;
      animations.forEach((animation) => {
        const element = (animation.effect as KeyframeEffect | null)?.target;
        if (element instanceof Element && target && (element.contains(target) || target.contains(element))) animation.finish();
      });
    };
    const finishOnResize = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    window.addEventListener("resize", finishOnResize, { passive: true });
    reduced.addEventListener("change", stop);
    main.addEventListener("focusin", onFocus);
    return () => {
      disposed = true;
      window.removeEventListener("resize", finishOnResize);
      cancelAnimationFrame(scanFrame);
      mutations.disconnect();
      observer.disconnect();
      reduced.removeEventListener("change", stop);
      main.removeEventListener("focusin", onFocus);
      animations.forEach((animation) => animation.cancel());
    };
  }, [pathname]);
  return null;
}
