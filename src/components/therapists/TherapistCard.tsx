import Image from "next/image";
import Link from "next/link";
import { Ph } from "@/components/ui/Placeholder";
import { getPortrait } from "@/lib/portraits";
import { Arch, BananaLeaf, Blob } from "@/components/shapes/Shapes";
import { cn } from "@/lib/cn";
import type { Therapist } from "@/data/types";

/** Already-localised card data, so the card works in server and client components. */
export type TherapistCardData = {
  slug: string;
  href: string;
  name: string;
  role: string;
  credential: string;
  languages: string;
  concerns: string[];
  price: string;
  next: string;
  photo: string | null;
  voiceIntroSrc?: string;
  tone: Therapist["tone"];
};

export type TherapistCardLabels = {
  viewProfile: string;
  speaks: string;
  next: string;
};

const tones = {
  clay: { bg: "bg-clay/25", blob: "text-clay", leaf: "text-clay-deep/60" },
  moss: { bg: "bg-sage/40", blob: "text-moss", leaf: "text-forest/50" },
  ochre: { bg: "bg-ochre/25", blob: "text-ochre", leaf: "text-clay-deep/50" },
  sage: { bg: "bg-sage/35", blob: "text-sage", leaf: "text-moss/70" },
};

/**
 * Therapist photo, or an illustrated stand-in when there's no photo yet.
 * `round` gives a circular crop for compact cards and avatar rows.
 */
export function TherapistAvatar({
  tone,
  photo,
  className,
  round = false,
  sizes = "(min-width: 1024px) 22rem, 80vw",
  preload = false,
}: {
  tone: Therapist["tone"];
  photo?: string | null;
  className?: string;
  round?: boolean;
  sizes?: string;
  preload?: boolean;
}) {
  const c = tones[tone];
  const img = getPortrait(photo);
  if (img) {
    return (
      <div className={cn("relative overflow-hidden", round ? "rounded-full" : "rounded-soft", c.bg, className)}>
        <Image src={img} alt="" fill sizes={sizes} placeholder="blur" preload={preload} className="object-cover object-[50%_20%]" />
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden>
      <Arch className="absolute inset-0 h-full w-full text-cream-soft" />
      <div className={cn("absolute inset-x-[12%] bottom-0 top-[18%] [clip-path:inset(0_round_999px_999px_0_0)]", c.bg)}>
        <Blob variant={1} className={cn("absolute -bottom-[20%] -left-[10%] w-[90%]", c.blob)} />
        <BananaLeaf className={cn("absolute -right-[6%] bottom-[-10%] w-[42%] rotate-[24deg]", c.leaf)} />
      </div>
    </div>
  );
}

export function TherapistCard({
  data,
  labels,
  compact = false,
  className,
}: {
  data: TherapistCardData;
  labels: TherapistCardLabels;
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <article
        className={cn(
          "group relative flex h-full items-center gap-4 rounded-soft bg-cream-soft p-4 ring-1 ring-cocoa/[0.08]",
          "transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-warm",
          className,
        )}
      >
        <TherapistAvatar tone={data.tone} photo={data.photo} round className="size-16 shrink-0" sizes="64px" />
        <div className="min-w-0">
          <h3 className="font-sans text-[0.9375rem] font-semibold leading-snug tracking-normal">
            <Link href={data.href} className="after:absolute after:inset-0 after:rounded-soft after:content-['']">
              <Ph>{data.name}</Ph>
            </Link>
          </h3>
          <p className="text-[0.8125rem] text-cocoa-soft">
            <Ph>{data.role}</Ph>
          </p>
          <p className="mt-1 text-xs text-cocoa-soft">
            {data.languages} · <Ph>{data.price}</Ph>
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-pebble bg-cream-soft p-3 ring-1 ring-cocoa/[0.08]",
        "transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 hover:shadow-warm-lg focus-within:shadow-warm-lg",
        className,
      )}
    >
      <TherapistAvatar tone={data.tone} photo={data.photo} className="aspect-[4/5] w-full" />
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <h3 className="font-sans text-base font-semibold leading-snug tracking-normal">
          {/* The whole card is clickable via this link's ::after overlay. */}
          <Link href={data.href} className="after:absolute after:inset-0 after:rounded-pebble after:content-['']">
            <Ph>{data.name}</Ph>
          </Link>
        </h3>
        <p className="mt-0.5 text-[0.8125rem] text-clay-deep">
          <Ph>{data.role}</Ph>
        </p>
        <p className="mt-1 text-xs leading-relaxed text-cocoa-soft">
          <Ph>{data.credential}</Ph>
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {data.concerns.slice(0, 3).map((c) => (
            <li key={c} className="rounded-full bg-sand/70 px-2.5 py-0.5 text-[0.6875rem]">
              {c}
            </li>
          ))}
        </ul>
        <dl className="mt-auto grid grid-cols-2 gap-2 pt-4 text-xs">
          <div>
            <dt className="text-cocoa-soft">{labels.speaks}</dt>
            <dd className="mt-0.5 font-medium">{data.languages}</dd>
          </div>
          <div>
            <dt className="text-cocoa-soft">{labels.next}</dt>
            <dd className="mt-0.5 font-medium">{data.next}</dd>
          </div>
        </dl>
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-cocoa/10 pt-3 text-[0.8125rem]">
          <p className="font-semibold">
            <Ph>{data.price}</Ph>
          </p>
          <span aria-hidden className="text-clay-deep transition-transform duration-300 group-hover:translate-x-1">
            {labels.viewProfile} →
          </span>
        </div>
      </div>
    </article>
  );
}
