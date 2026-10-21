import { Fragment, type ReactNode } from "react";
import { siteConfig } from "@/config/site";

/**
 * Renders text, wrapping any [bracketed placeholder] in a highlighted marker
 * so unfinished content is impossible to miss.
 */
export function Ph({ children, title }: { children: string; title?: string }): ReactNode {
  const parts = children.split(/(\[[^\]]+\])/g);
  // Demo mode shows remaining placeholders as plain text (no striped marker).
  if (parts.length === 1 || siteConfig.demoMode) return children;
  return parts.map((part, i) =>
    /^\[[^\]]+\]$/.test(part) ? (
      <mark key={i} className="ph" title={title} data-placeholder="">
        {part}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
