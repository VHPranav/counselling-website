import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon, Button } from "./Button";
import { Container, Eyebrow, Heading, Section } from "./Section";
import { Blob, Ripple } from "@/components/shapes/Shapes";

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail. The last item is the current page. */
export function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label} className="text-sm text-cocoa-soft">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="link-underline inline-flex min-h-8 items-center hover:text-cocoa">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-cocoa">
                {item.label}
              </span>
            )}
            {i < items.length - 1 ? <span aria-hidden className="text-cocoa/30">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Standard top-of-page header used by inner pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  crumbLabel,
  children,
  tone = "cream",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  crumbLabel?: string;
  children?: ReactNode;
  tone?: "cream" | "sand";
}) {
  return (
    <Section tone={tone} grain spacing="none" className="overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-12">
      <Blob variant={0} className="pointer-events-none absolute -right-48 -top-40 w-[34rem] text-sand/80 sm:w-[44rem] [.bg-sand_&]:text-cream/50" />
      <Ripple className="pointer-events-none absolute -bottom-10 right-[6%] hidden w-80 text-clay/25 md:block" />
      <Container className="relative">
        {crumbs && crumbLabel ? <Breadcrumbs items={crumbs} label={crumbLabel} /> : null}
        {eyebrow ? <Eyebrow className="mt-8">{eyebrow}</Eyebrow> : null}
        <Heading level={1} size={1} className={cn("max-w-4xl", eyebrow ? "mt-4" : "mt-8")}>
          {title}
        </Heading>
        {lead ? <p className="mt-5 max-w-2xl text-lead text-cocoa-soft">{lead}</p> : null}
        {children}
      </Container>
    </Section>
  );
}

/** Accessible accordion list built on <details>. */
export function FaqList({ items, className }: { items: Array<{ q: string; a: ReactNode }>; className?: string }) {
  return (
    <div className={cn("divide-y divide-cocoa/15 border-y border-cocoa/15", className)}>
      {items.map((item, i) => (
        <details key={i} className="group py-1">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-h4 leading-snug [&::-webkit-details-marker]:hidden">
            {item.q}
            <span aria-hidden className="relative size-5 shrink-0">
              <span className="absolute left-0 top-1/2 h-px w-5 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-5 rotate-90 bg-current transition-transform duration-300 group-open:rotate-0" />
            </span>
          </summary>
          <div className="max-w-2xl pb-6 text-cocoa-soft">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

/** Closing call to action used at the bottom of inner pages. */
export function CtaBand({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <Section tone="sand" grain spacing="tight" className="overflow-hidden">
      <Blob variant={1} className="pointer-events-none absolute -left-32 -top-24 w-96 text-cream/40" />
      <Container className="relative flex flex-col gap-8 py-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <Heading level={2} size={2}>
            {title}
          </Heading>
          <p className="mt-3 text-lead text-cocoa-soft">{body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button href={primary.href} size="lg" magnetic icon={<ArrowIcon />}>
            {primary.label}
          </Button>
          {secondary ? (
            <Button href={secondary.href} size="lg" variant="secondary">
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

