"use client";

import { useEffect } from "react";

/**
 * Smooth scrolling and desktop polish, loaded after the page is idle:
 * - Lenis smooth scrolling
 * - magnetic pull on elements with data-magnetic
 * - a soft trailing cursor ring that grows over links and buttons
 * Native touch scrolling is retained; reduced motion disables the enhancements.
 */
export function MotionBoot() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const cleanups: Array<() => void> = [];
    let cancelled = false;

    const start = async () => {
      // Smooth scroll
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const lenis = new Lenis({ autoRaf: true, smoothWheel: true, syncTouch: false, lerp: 0.09, anchors: true });
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      cleanups.push(() => {
        lenis.destroy();
        delete (window as unknown as { __lenis?: unknown }).__lenis;
      });

      if (!fine) return;

      // Magnetic buttons (delegated, so it works for elements added later)
      let magnet: HTMLElement | null = null;
      const release = () => {
        if (magnet) magnet.style.translate = "";
        magnet = null;
      };
      const onMove = (e: PointerEvent) => {
        const el = (e.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
        if (el !== magnet) release();
        if (!el) return;
        magnet = el;
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        el.style.translate = `${Math.max(-10, Math.min(10, dx)).toFixed(1)}px ${Math.max(-8, Math.min(8, dy)).toFixed(1)}px`;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", release);
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", release);
        release();
      });

      // Cursor ring
      const ring = document.createElement("div");
      ring.className = "cursor-ring";
      ring.setAttribute("aria-hidden", "true");
      document.body.appendChild(ring);
      const pos = { x: -100, y: -100 };
      const cur = { x: -100, y: -100 };
      let raf = 0;
      const tick = () => {
        cur.x += (pos.x - cur.x) * 0.2;
        cur.y += (pos.y - cur.y) * 0.2;
        ring.style.transform = `translate3d(${cur.x.toFixed(1)}px, ${cur.y.toFixed(1)}px, 0)`;
        raf = Math.abs(pos.x - cur.x) + Math.abs(pos.y - cur.y) > 0.1 ? requestAnimationFrame(tick) : 0;
      };
      const onCursor = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        pos.x = e.clientX;
        pos.y = e.clientY;
        ring.dataset.visible = "true";
        const interactive = (e.target as Element | null)?.closest("a, button, summary, [role=button], label, input, select, textarea");
        ring.dataset.hover = interactive ? "true" : "false";
        if (!raf) raf = requestAnimationFrame(tick);
      };
      const hide = () => (ring.dataset.visible = "false");
      window.addEventListener("pointermove", onCursor, { passive: true });
      document.documentElement.addEventListener("pointerleave", hide);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onCursor);
        document.documentElement.removeEventListener("pointerleave", hide);
        ring.remove();
      });
    };

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const handle = idle(() => void start());

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback && typeof handle === "number") window.cancelIdleCallback(handle);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
