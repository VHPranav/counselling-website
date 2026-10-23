import { WordText } from "@/components/motion/WordText";
import Image from "next/image";
import Link from "next/link";
import { pageImages, type PageImageKey } from "@/lib/page-images";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon, Button } from "./Button";
import { Container, Heading, Section } from "./Section";
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

/**
 * Standard top-of-page header used by inner pages. With an image it matches the
 * home hero: a full-screen photo with the text on a soft cream wash on the left
 * (desktop), or an arched photo under the text (mobile).
 */
export function PageHero({
  title,
  lead,
  crumbs,
  crumbLabel,
  children,
  tone = "cream",
  image,
  imagePosition = "100% 35%",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  crumbLabel?: string;
  children?: ReactNode;
  tone?: "cream" | "sand";
  image?: PageImageKey;
  /** CSS object-position for the photo, e.g. "70% 40%". */
  imagePosition?: string;
}) {
  const photo = image ? pageImages[image] : null;

  if (!photo) {
    return (
      <Section tone={tone} grain spacing="none" className="page-intro overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-12">
        <Blob variant={0} className="pointer-events-none absolute -right-48 -top-40 w-[34rem] text-sand/80 sm:w-[44rem] [.bg-sand_&]:text-cream/50" />
        <Ripple className="pointer-events-none absolute -bottom-10 right-[6%] hidden w-80 text-clay/25 md:block" />
        <Container className="relative">
          {crumbs && crumbLabel ? <Breadcrumbs items={crumbs} label={crumbLabel} /> : null}

          <Heading level={1} size={1} className={cn("max-w-4xl", "mt-8")}>
            {title}
          </Heading>
          {lead ? <p className="mt-5 max-w-2xl text-lead text-cocoa-soft"><WordText>{lead}</WordText></p> : null}
          {children}
        </Container>
      </Section>
    );
  }

  return (
    <section className="page-intro grain relative overflow-hidden bg-cream pb-14 pt-8 sm:pb-20 sm:pt-10 lg:flex lg:min-h-[calc(100dvh-4.5rem)] lg:flex-col lg:py-10">
      <Container size="wide" className="relative z-10 lg:flex lg:flex-1 lg:flex-col">
        {crumbs && crumbLabel ? <Breadcrumbs items={crumbs} label={crumbLabel} /> : null}
        <div className="lg:my-auto lg:max-w-[52%] lg:py-12 xl:max-w-[46%]">

          <Heading level={1} size="display" className={cn("fade-up", "mt-8 lg:mt-0")} style={{ "--i": 1 } as CSSProperties}>
            {title}
          </Heading>
          {lead ? (
            <p className="fade-up mt-6 max-w-xl text-lead text-cocoa-soft" style={{ "--i": 3 } as CSSProperties}><WordText>
              {lead}
            </WordText></p>
          ) : null}
          {children ? (
            <div className="fade-up" style={{ "--i": 5 } as CSSProperties}>
              {children}
            </div>
          ) : null}
        </div>
      </Container>

      {/* Mobile: arched photo under the text. Desktop: full-bleed behind it. */}
      <div className="relative mx-4 mt-10 aspect-[4/3] overflow-hidden rounded-t-[999px] rounded-b-pebble sm:mx-6 sm:aspect-[16/10] lg:absolute lg:inset-0 lg:m-0 lg:aspect-auto lg:rounded-none">
        <Image
          src={photo}
          alt=""
          fill
          preload
          fetchPriority="high"
          placeholder="blur"
          sizes="(min-width: 1024px) 100vw, calc(100vw - 2rem)"
          className="hero-photo object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(246_240_230/0.95)_0%,rgb(246_240_230/0.86)_36%,rgb(246_240_230/0.3)_60%,transparent_76%)] lg:block" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-32 bg-gradient-to-t from-cream/60 to-transparent lg:block" />
      </div>
    </section>
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
          <p className="mt-3 text-lead text-cocoa-soft"><WordText>{body}</WordText></p>
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

