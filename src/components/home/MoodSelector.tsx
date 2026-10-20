"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { TherapistCard, type TherapistCardData, type TherapistCardLabels } from "@/components/therapists/TherapistCard";

export type MoodOption = {
  id: string;
  label: string;
  response: string;
  concerns: Array<{ slug: string; name: string; summary: string; href: string }>;
  therapists: TherapistCardData[];
};

type Labels = {
  groupLabel: string;
  prompt: string;
  concernsTitle: string;
  therapistsTitle: string;
  book: string;
  match: string;
  reset: string;
};

type LenisLike = { scrollTo: (target: HTMLElement, opts?: { offset?: number }) => void };

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
}: {
  moods: MoodOption[];
  labels: Labels;
  cardLabels: TherapistCardLabels;
  bookHref: string;
  matchHref: string;
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
    if (top > 0 && top < window.innerHeight * 0.55) return;
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -110 });
    else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, [selectedId]);

  return (
    <div>
      <div role="group" aria-labelledby={groupId} className="flex flex-wrap gap-2.5 sm:gap-3">
        <span id={groupId} className="sr-only">
          {labels.groupLabel}
        </span>
        {moods.map((m) => (
          <Chip key={m.id} selected={m.id === selectedId} onClick={() => setSelectedId(m.id === selectedId ? null : m.id)}>
            {m.label}
          </Chip>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {selected?.response ?? ""}
      </p>
      <div ref={resultsRef} className="mt-10 scroll-mt-28">
        {selected ? (
          <div key={selected.id} className="rounded-pebble bg-cream p-5 shadow-warm ring-1 ring-cocoa/[0.06] sm:p-8 lg:p-10">
            <p aria-hidden className="fade-up max-w-3xl font-display text-h3 leading-snug text-cocoa">{selected.response}</p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-10">
              <div className="fade-up" style={{ "--i": 1 } as CSSProperties}>
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-moss [:lang(ml)_&]:normal-case [:lang(ml)_&]:tracking-normal">
                  {labels.concernsTitle}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {selected.concerns.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={c.href}
                        className="group flex items-start justify-between gap-4 rounded-soft bg-sand/60 p-4 transition-colors duration-300 hover:bg-sand"
                      >
                        <span>
                          <span className="block font-medium">{c.name}</span>
                          <span className="mt-0.5 block text-sm text-cocoa-soft">{c.summary}</span>
                        </span>
                        <ArrowIcon className="mt-1 shrink-0 text-clay-deep transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="fade-up" style={{ "--i": 2 } as CSSProperties}>
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-moss [:lang(ml)_&]:normal-case [:lang(ml)_&]:tracking-normal">
                  {labels.therapistsTitle}
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {selected.therapists.slice(0, 2).map((th) => (
                    <li key={th.slug}>
                      <TherapistCard data={th} labels={cardLabels} compact />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="fade-up mt-8 flex flex-col gap-3 border-t border-cocoa/10 pt-6 sm:flex-row sm:items-center" style={{ "--i": 3 } as CSSProperties}>
              <Button href={bookHref} magnetic icon={<ArrowIcon />}>
                {labels.book}
              </Button>
              <Button href={matchHref} variant="secondary">
                {labels.match}
              </Button>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="min-h-11 px-2 text-sm text-cocoa-soft underline underline-offset-4 hover:text-cocoa sm:ml-auto"
              >
                {labels.reset}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-cocoa-soft">{labels.prompt}</p>
        )}
      </div>
    </div>
  );
}
