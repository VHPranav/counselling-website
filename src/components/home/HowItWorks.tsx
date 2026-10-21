"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import stepChoose from "@/assets/images/step-choose.jpg";
import stepMatch from "@/assets/images/step-match.jpg";
import stepTalk from "@/assets/images/step-talk.jpg";
import stepGrow from "@/assets/images/step-grow.jpg";

type Step = { title: string; body: string; label: string };

const stepImages = [stepChoose, stepMatch, stepTalk, stepGrow];

/**
 * Choose → Match → Talk → Grow.
 * Desktop: Scroll-pinned 2-column layout (CSS sticky).
 * - Left side: Section title and interactive step pills.
 * - Right side: Clean, unadorned column-stacked layout with the image placed over
 *   the number (01, 02, 03, 04) and description.
 * Mobile: Stacked cards with image placed over number and text.
 */
export function HowItWorks({ title, steps }: { title: string; steps: Step[] }) {
  const sectionRef = useRef<HTMLElement>(null);
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

  const scrollToStep = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const total = rect.height - window.innerHeight;
    const targetScroll = scrollTop + (i / Math.max(1, steps.length - 1)) * total;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} aria-labelledby="how-title" className="relative bg-cream-soft lg:h-[300vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:items-center">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.35fr] lg:gap-16 lg:px-10 lg:py-0">
          
          {/* Left Side: Title & Step Pills */}
          <div className="lg:self-center">
            <h2 id="how-title" className="text-h2 font-display leading-tight">
              {title}
            </h2>

            {/* Desktop step indicator pills */}
            <ol className="mt-8 hidden flex-wrap gap-2.5 lg:flex" aria-hidden>
              {steps.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => scrollToStep(i)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium ring-1 ring-inset transition-colors duration-500",
                      i === active
                        ? "bg-forest text-cream ring-forest shadow-warm-sm"
                        : "text-cocoa-soft ring-cocoa/15 hover:bg-sand hover:text-cocoa",
                    )}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Right Side: Column Stacking (Clean image over Number & Text, no shadows, no rounded corners, no abstract shapes) */}
          <div className="relative lg:h-[32rem]">
            {/* Desktop Step Items (Stacked as column: Image OVER Number + Text) */}
            <ol className="relative hidden lg:grid lg:h-full">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  aria-current={i === active ? "step" : undefined}
                  className={cn(
                    "relative flex flex-col justify-center lg:col-start-1 lg:row-start-1",
                    "transition-[opacity,transform] duration-700 ease-[var(--ease-soft)]",
                    i === active
                      ? "translate-y-0 opacity-100 pointer-events-auto"
                      : i < active
                        ? "-translate-y-8 opacity-0 pointer-events-none"
                        : "translate-y-8 opacity-0 pointer-events-none",
                  )}
                >
                  {/* 1. Image on top: no rounded corners, no shadow */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
                    <Image
                      src={stepImages[i]}
                      alt={s.title}
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>

                  {/* 2. Number (01, 02, 03, 04) & Title & Body below */}
                  <div className="mt-6">
                    <div className="flex items-center gap-3.5">
                      <span className="font-display text-3xl sm:text-4xl font-medium text-clay leading-none">
                        0{i + 1}
                      </span>
                      <h3 className="text-h3 leading-tight text-cocoa">{s.title}</h3>
                    </div>
                    <p className="mt-3 max-w-xl text-lead text-cocoa-soft">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Mobile Layout: Stacked cards with clean image over number and text */}
            <ol className="grid gap-10 lg:hidden">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="bg-cream p-5 sm:p-7"
                >
                  {/* Image on top: no rounded corners, no shadow */}
                  {stepImages[i] ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
                      <Image
                        src={stepImages[i]}
                        alt={s.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 640px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}

                  {/* Number & Text below */}
                  <div className="mt-5">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-2xl font-medium text-clay leading-none">
                        0{i + 1}
                      </span>
                      <h3 className="text-h3 leading-tight">{s.title}</h3>
                    </div>
                    <p className="mt-2 text-lead text-cocoa-soft">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}
