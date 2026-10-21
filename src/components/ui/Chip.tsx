"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Tactile, toggleable pill. Uses aria-pressed so screen readers announce its state. */
export function Chip({
  selected = false,
  icon,
  className,
  children,
  ...props
}: { selected?: boolean; icon?: ReactNode; children: ReactNode } & ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-full px-4 py-1.5 text-sm leading-snug",
        "ring-1 ring-inset transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--ease-soft)]",
        "active:scale-[0.97] touch-manipulation",
        selected
          ? "bg-forest text-cream ring-forest shadow-warm"
          : "bg-cream-soft text-cocoa ring-cocoa/20 hover:ring-cocoa/50 hover:-translate-y-0.5 hover:shadow-warm",
        className,
      )}
      {...props}
    >
      {icon ? <span aria-hidden className="text-ochre">{icon}</span> : null}
      <span className="[:lang(ml)_&]:pt-[0.1em]">{children}</span>
    </button>
  );
}
