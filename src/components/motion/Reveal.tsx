import type { ElementType, ReactNode } from "react";

/** Entrance group, animated by the shared scroll observer when it enters view. */
export function Reveal({ as: Tag = "div", delay = 0, className, children }: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return <Tag data-reveal={Tag === "li" ? "card" : "text"} data-reveal-delay={delay} className={className}>{children}</Tag>;
}
