import Link from "next/link";
import { Ph } from "@/components/ui/Placeholder";
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

/** Illustrated stand-in used until a real, consented photo is supplied. */
export function TherapistAvatar({ tone, className }: { tone: Therapist["tone"]; className?: string }) {
  const c = tones[tone];
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
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-pebble bg-cream-soft p-5 ring-1 ring-cocoa/[0.08]",
        "transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 hover:shadow-warm-lg focus-within:shadow-warm-lg",
        className,
      )}
    >
      <div className={cn("flex gap-4", compact ? "items-center" : "flex-col")}>
        <TherapistAvatar tone={data.tone} className={compact ? "h-20 w-16 shrink-0" : "aspect-[5/4] w-full"} />
        <div className="min-w-0">
          <h3 className="font-display text-h4 leading-tight">
            {/* The whole card is clickable via this link's ::after overlay. */}
            <Link href={data.href} className="after:absolute after:inset-0 after:rounded-pebble after:content-['']">
              <Ph>{data.name}</Ph>
            </Link>
          </h3>
          <p className="mt-1 text-sm text-cocoa-soft">
            <Ph>{data.role}</Ph>
          </p>
          {!compact ? (
            <p className="mt-0.5 text-xs text-cocoa-soft">
              <Ph>{data.credential}</Ph>
            </p>
          ) : null}
        </div>
      </div>

      {!compact ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {data.concerns.slice(0, 3).map((c) => (
            <li key={c} className="rounded-full bg-sand/70 px-3 py-1 text-xs">
              {c}
            </li>
          ))}
        </ul>
      ) : null}

      <dl className={cn("grid grid-cols-2 gap-3 text-sm", compact ? "mt-4" : "mt-auto pt-5")}>
        <div>
          <dt className="text-xs text-cocoa-soft">{labels.speaks}</dt>
          <dd className="font-medium">{data.languages}</dd>
        </div>
        <div>
          <dt className="text-xs text-cocoa-soft">{labels.next}</dt>
          <dd className="font-medium">{data.next}</dd>
        </div>
      </dl>
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-cocoa/10 pt-3 text-sm">
        <p className="font-medium">
          <Ph>{data.price}</Ph>
        </p>
        <span aria-hidden className="text-clay-deep transition-transform duration-300 group-hover:translate-x-1">
          {labels.viewProfile} →
        </span>
      </div>
    </article>
  );
}
