import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Slow horizontal drift (CSS only). Pauses on hover and keyboard focus.
 * Content is duplicated once for a seamless loop; the copy is hidden from
 * screen readers. With reduced motion it becomes a plain scrollable row.
 */
export function Marquee({
  children,
  seconds = 60,
  className,
  label,
}: {
  children: ReactNode;
  seconds?: number;
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="region"
      aria-label={label}
      className={cn(
        "group/marquee relative overflow-hidden motion-reduce:overflow-x-auto",
        "[mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max animate-[marquee_var(--marquee-duration)_linear_infinite] gap-6 group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ "--marquee-duration": `${seconds}s` } as CSSProperties}
      >
        <div className="flex shrink-0 gap-6">{children}</div>
        <div className="flex shrink-0 gap-6 motion-reduce:hidden" aria-hidden inert>
          {children}
        </div>
      </div>
    </div>
  );
}
