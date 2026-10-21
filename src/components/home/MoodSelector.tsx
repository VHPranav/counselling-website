"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { TherapistCard, type TherapistCardData, type TherapistCardLabels } from "@/components/therapists/TherapistCard";

export type MoodOption = {
  id: string;
  label: string;
  response: string;
  concerns: Array<{ slug: string; name: string; summary: string; href: string }>;
  therapists: TherapistCardData[];
};

type Labels = {
  eyebrow: string;
  title: string;
  lead: string;
  groupLabel: string;
  prompt: string;
  concernsTitle: string;
  therapistsTitle: string;
  book: string;
  match: string;
  reset: string;
  readyTitle: string;
  readyBody: string;
};

type LenisLike = { scrollTo: (target: HTMLElement, opts?: { offset?: number }) => void };

/* ---------- Mood icons: weather and nature, drawn to match the leaf motif ---------- */

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const icons: Record<string, ReactNode> = {
  // A swirl of wind
  anxious: (
    <>
      <path {...stroke} d="M4 10h11a3 3 0 1 0-3-3" />
      <path {...stroke} d="M4 14h15a3 3 0 1 1-3 3" />
      <path {...stroke} d="M4 18h6" />
    </>
  ),
  // A low cloud with rain
  low: (
    <>
      <path {...stroke} d="M7 15a4 4 0 1 1 1.2-7.8A5 5 0 0 1 18 9a3 3 0 0 1 0 6Z" />
      <path {...stroke} d="M9 18.5 8.3 20M13 18.5l-.7 1.5M17 18.5l-.7 1.5" />
    </>
  ),
  // Stacked waves
  overwhelmed: (
    <>
      <path {...stroke} d="M3 8c2-1.5 3.5-1.5 5.5 0s3.5 1.5 5.5 0 3.5-1.5 5.5 0" />
      <path {...stroke} d="M3 12.5c2-1.5 3.5-1.5 5.5 0s3.5 1.5 5.5 0 3.5-1.5 5.5 0" />
      <path {...stroke} d="M3 17c2-1.5 3.5-1.5 5.5 0s3.5 1.5 5.5 0 3.5-1.5 5.5 0" />
    </>
  ),
  // Two overlapping circles
  relationship: (
    <>
      <circle {...stroke} cx="9.5" cy="12" r="5" />
      <circle {...stroke} cx="14.5" cy="12" r="5" />
    </>
  ),
  // A falling leaf
  grief: (
    <>
      <path {...stroke} d="M6 18c0-7 5-12 13-13-1 8-6 13-13 13Z" />
      <path {...stroke} d="M6 18c3-3 6-6 9-9" />
    </>
  ),
  // A sun pressing down on a horizon
  work: (
    <>
      <path {...stroke} d="M3 17h18" />
      <path {...stroke} d="M7 17a5 5 0 0 1 10 0" />
      <path {...stroke} d="M12 6V4M5.6 9.6 4.2 8.2M18.4 9.6l1.4-1.4" />
    </>
  ),
  // A small flame
  anger: (
    <path {...stroke} d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.5 2-5 1 1 1.5 2 1.5 3 1-2 1.5-5 1.5-8Z" />
  ),
  // Moon and a star
  sleep: (
    <>
      <path {...stroke} d="M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5Z" />
      <path {...stroke} d="M17 4v3M15.5 5.5h3" />
    </>
  ),
  // A speech bubble
  talk: (
    <>
      <path {...stroke} d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-4 4v-4h0A2 2 0 0 1 5 13Z" />
      <path {...stroke} d="M9 9.5h6" />
    </>
  ),
};

/** Each feeling gets its own soft tint (icon chip + section wash). */
const tints: Record<string, { chip: string; wash: string }> = {
  anxious: { chip: "bg-clay/15 text-clay-deep", wash: "bg-clay/10" },
  low: { chip: "bg-sage/30 text-moss", wash: "bg-sage/20" },
  overwhelmed: { chip: "bg-ochre/20 text-clay-deep", wash: "bg-ochre/10" },
  relationship: { chip: "bg-clay/15 text-clay-deep", wash: "bg-clay/10" },
  grief: { chip: "bg-moss/15 text-moss", wash: "bg-moss/10" },
  work: { chip: "bg-ochre/20 text-clay-deep", wash: "bg-ochre/10" },
  anger: { chip: "bg-clay-deep/15 text-clay-deep", wash: "bg-clay-deep/10" },
  sleep: { chip: "bg-forest/10 text-forest", wash: "bg-forest/[0.07]" },
  talk: { chip: "bg-sage/30 text-moss", wash: "bg-sage/20" },
};
const fallbackTint = { chip: "bg-sand text-cocoa", wash: "bg-transparent" };

function MoodIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden className={className}>
      {icons[id] ?? icons.talk}
    </svg>
  );
}

/**
 * The main conversion path: pick a feeling → see matching topics and
 * therapists → book. Nothing chosen here is stored or sent anywhere.
 */
export function MoodSelector({
  moods,
  labels,
  cardLabels,
  bookHref,
  matchHref,
  crisis,
  heading,
}: {
  moods: MoodOption[];
  labels: Labels;
  cardLabels: TherapistCardLabels;
  bookHref: string;
  matchHref: string;
  /** Always-visible safety line, e.g. "Feeling unsafe right now? Call Tele-MANAS 14416". */
  crisis: { text: string; tel: string; number: string };
  /** The section heading, rendered by the server for consistent styling. */
  heading: ReactNode;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const groupId = useId();
  const selected = moods.find((m) => m.id === selectedId) ?? null;

  // Bring the results into view, unless they are already comfortably visible.
  useEffect(() => {
    const el = resultsRef.current;
    if (!selectedId || !el) return;
    const top = el.getBoundingClientRect().top;
    if (top > 0 && top < window.innerHeight * 0.6) return;
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -110 });
    else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 110, behavior: reduce ? "auto" : "smooth" });
    }
  }, [selectedId]);

  return (
    <>
      {/* The whole section takes on a faint tint of the chosen feeling. */}
      {moods.map((m) => (
        <div
          key={m.id}
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-700 ease-[var(--ease-soft)] motion-reduce:transition-none",
            (tints[m.id] ?? fallbackTint).wash,
            m.id === selectedId ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:pt-2">
          {heading}
          <p className="mt-5 flex items-start gap-2.5 text-sm text-cocoa-soft">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden className="mt-0.5 shrink-0 text-moss">
              <rect {...stroke} x="5" y="10.5" width="14" height="9.5" rx="2.5" />
              <path {...stroke} d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
            </svg>
            <span>{labels.lead}</span>
          </p>
          <p className="mt-8 hidden border-l-2 border-clay/40 pl-4 text-sm text-cocoa-soft lg:block">
            {crisis.text}{" "}
            <a href={`tel:${crisis.tel}`} className="font-semibold text-clay-deeper underline underline-offset-4">
              {crisis.number}
            </a>
          </p>
        </div>

        <div>
          <div role="group" aria-labelledby={groupId} className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            <span id={groupId} className="sr-only">
              {labels.groupLabel}
            </span>
            {moods.map((m, i) => {
              const on = m.id === selectedId;
              const tint = tints[m.id] ?? fallbackTint;
              return (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSelectedId(on ? null : m.id)}
                  style={{ "--i": i } as CSSProperties}
                  className={cn(
                    "group relative flex min-h-28 flex-col items-start justify-between gap-4 rounded-[1.25rem] p-4 text-left sm:min-h-32 sm:p-5",
                    "ring-1 ring-inset transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--ease-soft)]",
                    "touch-manipulation active:scale-[0.98] motion-reduce:transition-none",
                    on
                      ? "bg-forest text-cream shadow-warm-lg ring-forest"
                      : "bg-cream-soft/90 text-cocoa ring-cocoa/[0.08] hover:-translate-y-1 hover:shadow-warm hover:ring-cocoa/20",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-11 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-110",
                      on ? "bg-cream/15 text-cream" : tint.chip,
                    )}
                  >
                    <MoodIcon id={m.id} />
                  </span>
                  <span className="text-[0.9375rem] font-medium leading-snug [:lang(ml)_&]:text-sm">{m.label}</span>
                  {/* Tick when chosen */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute right-3.5 top-3.5 grid size-6 place-items-center rounded-full bg-cream text-forest transition-[opacity,transform] duration-300",
                      on ? "scale-100 opacity-100" : "scale-50 opacity-0",
                    )}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path {...stroke} strokeWidth={2.4} d="m6 12.5 4 4 8-9" />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-6 border-l-2 border-clay/40 pl-4 text-sm text-cocoa-soft lg:hidden">
            {crisis.text}{" "}
            <a href={`tel:${crisis.tel}`} className="font-semibold text-clay-deeper underline underline-offset-4">
              {crisis.number}
            </a>
          </p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {selected?.response ?? ""}
      </p>

      <div ref={resultsRef} className="relative scroll-mt-28">
        {selected ? (
          <div key={selected.id} className="mt-12 grid gap-4 lg:grid-cols-12">
            {/* Response */}
            <div className="fade-up rounded-pebble bg-cream-soft p-6 shadow-warm ring-1 ring-cocoa/[0.06] sm:p-8 lg:col-span-12">
              <div className="flex items-start gap-4">
                <span className={cn("grid size-12 shrink-0 place-items-center rounded-full", (tints[selected.id] ?? fallbackTint).chip)}>
                  <MoodIcon id={selected.id} />
                </span>
                <p className="max-w-3xl font-display text-h3 leading-snug text-cocoa">{selected.response}</p>
              </div>
            </div>

            {/* Topics */}
            <div className="fade-up rounded-pebble bg-cream-soft p-6 ring-1 ring-cocoa/[0.06] sm:p-7 lg:col-span-4" style={{ "--i": 1 } as CSSProperties}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-moss [:lang(ml)_&]:text-sm [:lang(ml)_&]:normal-case [:lang(ml)_&]:tracking-normal">
                {labels.concernsTitle}
              </h3>
              <ul className="mt-4 divide-y divide-cocoa/10">
                {selected.concerns.map((c) => (
                  <li key={c.slug}>
                    <Link href={c.href} className="group flex items-start justify-between gap-4 py-3.5">
                      <span>
                        <span className="block text-[0.9375rem] font-medium group-hover:underline group-hover:underline-offset-4">{c.name}</span>
                        <span className="mt-0.5 block text-sm text-cocoa-soft">{c.summary}</span>
                      </span>
                      <ArrowIcon className="mt-1 shrink-0 text-clay-deep transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Therapists */}
            <div className="fade-up rounded-pebble bg-cream-soft p-6 ring-1 ring-cocoa/[0.06] sm:p-7 lg:col-span-5" style={{ "--i": 2 } as CSSProperties}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-moss [:lang(ml)_&]:text-sm [:lang(ml)_&]:normal-case [:lang(ml)_&]:tracking-normal">
                {labels.therapistsTitle}
              </h3>
              <ul className="mt-4 grid gap-3">
                {selected.therapists.slice(0, 2).map((th) => (
                  <li key={th.slug}>
                    <TherapistCard data={th} labels={cardLabels} compact />
                  </li>
                ))}
              </ul>
            </div>

            {/* Next step */}
            <div
              className="fade-up on-dark grain grain-light relative flex flex-col justify-between overflow-hidden rounded-pebble bg-forest p-6 text-cream sm:p-7 lg:col-span-3"
              style={{ "--i": 3 } as CSSProperties}
            >
              <div>
                <p className="font-display text-h4 text-cream">{labels.readyTitle}</p>
                <p className="mt-2 text-sm text-cream/75">{labels.readyBody}</p>
              </div>
              <div className="mt-6 flex flex-col gap-2.5">
                <Button href={bookHref} magnetic icon={<ArrowIcon />} className="w-full justify-center">
                  {labels.book}
                </Button>
                <Link href={matchHref} className="inline-flex min-h-11 items-center justify-center text-sm text-cream/85 underline underline-offset-4 hover:text-cream">
                  {labels.match}
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="min-h-10 text-xs text-cream/60 hover:text-cream"
                >
                  {labels.reset}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-10 text-sm text-cocoa-soft lg:text-right">{labels.prompt}</p>
        )}
      </div>
    </>
  );
}
