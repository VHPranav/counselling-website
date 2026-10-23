"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

/** New pages start at the top; explicit section links retain their destination. */
export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    if (window.location.hash) return;
    const reset = () => {
      if (window.location.hash) return;
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      // Cancel any remaining smooth-scroll momentum as well as native scroll.
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    reset();
    const frame = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
