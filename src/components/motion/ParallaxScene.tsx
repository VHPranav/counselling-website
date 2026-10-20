"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Moves every child with a `data-depth` attribute at its own speed on scroll,
 * and gently towards the cursor on desktop. Uses the CSS `translate` property
 * so it never fights rotate/scale classes. Runs only while on screen and not
 * at all with reduced motion.
 */
export function ParallaxScene({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]")).map((el) => ({
      el,
      depth: Number(el.dataset.depth) || 0,
    }));
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let visible = true;

    const frame = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      const sy = window.scrollY;
      for (const { el, depth } of layers) {
        const x = current.x * depth * 48;
        const y = current.y * depth * 36 + sy * depth * 0.32;
        el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };

    const onPointer = (e: PointerEvent) => {
      target = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 };
    };
    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(root);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      {children}
    </div>
  );
}
