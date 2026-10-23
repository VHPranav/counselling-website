"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * 4s in / 6s out breathing circle (pure CSS animation).
 * - Has a pause control (WCAG 2.2.2) and pauses itself when off screen.
 * - With reduced motion it stays still and shows the rhythm as text instead.
 */
export function Breathing({ labels }: { labels: { in: string; out: string; pause?: string; play?: string; still: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offscreen, setOffscreen] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  const paused = offscreen || reduced;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className={cn("relative grid size-64 place-items-center sm:size-80", paused && "breath-paused")} aria-hidden>
        {/* Soft halo rings */}
        <div className="absolute inset-0 rounded-full bg-cream/40 motion-safe:animate-[breathe_10s_var(--ease-breath)_infinite]" style={{ animationDelay: "-0.3s" }} />
        <div className="absolute inset-[12%] rounded-full bg-cream/50 motion-safe:animate-[breathe_10s_var(--ease-breath)_infinite]" style={{ animationDelay: "-0.15s" }} />
        <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-clay/80 to-ochre/80 motion-safe:animate-[breathe_10s_var(--ease-breath)_infinite]" />
        <div className="relative font-display text-h4 font-medium text-cocoa">
          {reduced ? null : (
            <>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap animate-[breathe-in-label_10s_linear_infinite]">
                {labels.in}
              </span>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 animate-[breathe-out-label_10s_linear_infinite]">
                {labels.out}
              </span>
            </>
          )}
        </div>
      </div>

      {reduced ? <p className="mt-8 text-lead">{labels.still}</p> : null}
    </div>
  );
}
