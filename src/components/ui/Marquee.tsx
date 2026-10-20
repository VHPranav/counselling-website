"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Slow horizontal drift (CSS only). Pauses on hover, on keyboard focus and via
 * a pause button (WCAG 2.2.2). Content is duplicated once for a seamless loop;
 * the copy is hidden from assistive tech. With reduced motion it becomes a
 * plain horizontally scrollable row.
 */
export function Marquee({
  children,
  seconds = 60,
  className,
  label,
  pauseLabel,
  playLabel,
}: {
  children: ReactNode;
  seconds?: number;
  className?: string;
  label?: string;
  pauseLabel?: string;
  playLabel?: string;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={className}>
      <div
        role="region"
        aria-label={label}
        className={cn(
          "group/marquee relative overflow-hidden motion-reduce:overflow-x-auto",
          "[mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]",
        )}
      >
        <div
          className={cn(
            "flex w-max animate-[marquee_var(--marquee-duration)_linear_infinite] gap-6 py-2 motion-reduce:animate-none",
            "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]",
            paused && "[animation-play-state:paused]",
          )}
          style={{ "--marquee-duration": `${seconds}s` } as CSSProperties}
        >
          <div className="flex shrink-0 gap-6">{children}</div>
          <div className="flex shrink-0 gap-6 motion-reduce:hidden" aria-hidden inert>
            {children}
          </div>
        </div>
      </div>
      {pauseLabel && playLabel ? (
        <div className="mx-auto flex max-w-6xl justify-end px-4 pt-4 motion-reduce:hidden sm:px-6 lg:px-10">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm ring-1 ring-inset ring-current/25 opacity-85 transition-opacity hover:opacity-100"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
              {paused ? <path d="M4 2.5v11l9-5.5-9-5.5Z" fill="currentColor" /> : <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor" />}
            </svg>
            {paused ? playLabel : pauseLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
