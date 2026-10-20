"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Blob, Ripple } from "@/components/shapes/Shapes";

type Step = { title: string; body: string; label: string };

/**
 * Choose → Match → Talk → Grow.
 * Desktop: the section pins (CSS sticky) and the steps advance as you scroll,
 * with a progress line. Mobile and reduced motion: a simple vertical list.
 * Only transform/opacity change; the scroll handler is rAF-throttled and
 * runs only while the section is on screen.
 */
export function HowItWorks({ eyebrow, title, steps }: { eyebrow: string; title: string; steps: Step[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    let inView = false;

    const update = () => {
      raf = 0;
      if (!desktop.matches) return;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      setActive(Math.min(steps.length - 1, Math.floor(progress * steps.length * 0.999)));
      if (barRef.current) barRef.current.style.transform = `scaleY(${progress})`;
    };
    const onScroll = () => {
      if (inView && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView) onScroll();
    });
    io.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [steps.length]);

  return (
    <section ref={sectionRef} aria-labelledby="how-title" className="relative bg-cream-soft lg:h-[300vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:items-center">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-10 lg:py-0">
          <div className="lg:self-center">
            <p className="inline-flex items-center gap-2.5 text-sm font-medium tracking-wide text-moss before:h-px before:w-6 before:bg-current before:opacity-60">
              {eyebrow}
            </p>
            <h2 id="how-title" className="mt-4 text-h2">
              {title}
            </h2>

            {/* Desktop step indicator */}
            <ol className="mt-10 hidden gap-3 lg:flex" aria-hidden>
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm ring-1 ring-inset transition-colors duration-500",
                    i === active ? "bg-forest text-cream ring-forest" : "text-cocoa-soft ring-cocoa/15",
                  )}
                >
                  {s.title}
                </li>
              ))}
            </ol>
          </div>

          <div className="relative lg:h-[26rem]">
            <Blob
              variant={2}
              className="pointer-events-none absolute -right-16 top-1/2 hidden w-[30rem] -translate-y-1/2 text-sand/70 transition-[rotate] duration-1000 ease-[var(--ease-soft)] lg:block"
              style={{ rotate: `${active * 24}deg` }}
            />
            <Ripple className="pointer-events-none absolute -bottom-10 right-0 hidden w-72 text-clay/30 lg:block" />
            {/* Progress line (desktop) */}
            <div className="absolute left-0 top-0 hidden h-full w-0.5 rounded-full bg-cocoa/10 lg:block" aria-hidden>
              <div ref={barRef} className="h-full w-full origin-top scale-y-0 bg-clay-deep" />
            </div>

            <ol className="relative grid gap-10 lg:h-full lg:pl-14">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  aria-current={i === active ? "step" : undefined}
                  className={cn(
                    "relative grid grid-cols-[3.5rem_1fr] gap-x-5 lg:col-start-1 lg:row-start-1 lg:grid-cols-1 lg:content-center",
                    "lg:transition-[opacity,transform] lg:duration-700 lg:ease-[var(--ease-soft)]",
                    i === active ? "lg:translate-y-0 lg:opacity-100" : i < active ? "lg:-translate-y-8 lg:opacity-0" : "lg:translate-y-8 lg:opacity-0",
                  )}
                >
                  <span
                    aria-hidden
                    className="row-span-3 flex size-14 items-center justify-center rounded-full bg-sand font-display text-h4 lg:mb-6 lg:size-24 lg:text-h1 lg:bg-transparent lg:justify-start lg:text-clay"
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-cocoa-soft">{s.label}</p>
                  <h3 className="text-h3">{s.title}</h3>
                  <p className="mt-2 max-w-md text-lead text-cocoa-soft">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
