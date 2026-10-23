import { WordText } from "@/components/motion/WordText";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { CrisisCallout } from "@/components/layout/CrisisCallout";
import { Helplines } from "@/components/layout/Helplines";
import { Ph } from "@/components/ui/Placeholder";
import { Children, type ReactNode } from "react";

/** Highlight [bracketed placeholders] inside plain-text MDX children. */
function marks(children: ReactNode): ReactNode {
  return Children.map(children, (child) => (typeof child === "string" && child.includes("[") ? <Ph>{child}</Ph> : child));
}

/**
 * Styling for long-form MDX content (concern guides, blog, legal pages).
 * Headings and lists get the site's type scale; links use the brand link style.
 */
const components: MDXComponents = {
  CrisisCallout,
  Helplines,
  h2: ({ children, ...props }) => <h2 className="mt-14 text-h3 first:mt-0" {...props}><WordText>{children}</WordText></h2>,
  h3: ({ children, ...props }) => <h3 className="mt-10 text-h4" {...props}><WordText>{children}</WordText></h3>,
  p: ({ children, ...props }) => (
    <p className="mt-4 text-cocoa-soft" {...props}>
      <WordText>{marks(children)}</WordText>
    </p>
  ),
  ul: (props) => <ul className="mt-4 space-y-2.5" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2.5 pl-6 marker:text-clay-deep" {...props} />,
  li: ({ children, ...props }) => (
    <li
      className="relative pl-6 text-cocoa-soft before:absolute before:left-0 before:top-[0.7em] before:size-2 before:rounded-full before:bg-ochre [ol_&]:pl-1 [ol_&]:before:hidden"
      {...props}
    >
      {marks(children)}
    </li>
  ),
  strong: (props) => <strong className="font-semibold text-cocoa" {...props} />,
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} className="text-link" {...props} />
    ) : (
      <a href={href} className="text-link" rel="noopener noreferrer" target="_blank" {...props} />
    ),
  blockquote: (props) => (
    <blockquote className="mt-6 rounded-soft border-l-4 border-ochre bg-sand/60 px-5 py-4 font-display text-h4 leading-snug" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
