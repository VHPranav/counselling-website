"use client";

import { useId, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { TherapistCard, type TherapistCardData, type TherapistCardLabels } from "./TherapistCard";

export type DirectoryEntry = {
  card: TherapistCardData;
  languages: string[];
  concerns: string[];
  services: string[];
  availability: "this-week" | "next-week" | "later";
};

type Option = { value: string; label: string };

type Labels = {
  filters: string;
  language: string;
  concern: string;
  service: string;
  availability: string;
  any: string;
  availThisWeek: string;
  availSoon: string;
  clear: string;
  results: string;
  resultsOne: string;
  empty: string;
  match: string;
};

/**
 * Filterable therapist list. Filter state lives only in memory: it is never
 * written to the URL, storage or analytics, because a chosen concern is
 * health information.
 */
export function TherapistDirectory({
  entries,
  labels,
  cardLabels,
  languageOptions,
  concernOptions,
  serviceOptions,
  matchHref,
}: {
  entries: DirectoryEntry[];
  labels: Labels;
  cardLabels: TherapistCardLabels;
  languageOptions: Option[];
  concernOptions: Option[];
  serviceOptions: Option[];
  matchHref: string;
}) {
  const [language, setLanguage] = useState("");
  const [concern, setConcern] = useState("");
  const [service, setService] = useState("");
  const [availability, setAvailability] = useState("");
  const ids = { concern: useId(), service: useId(), lang: useId(), avail: useId() };

  const results = useMemo(
    () =>
      entries.filter(
        (e) =>
          (!language || e.languages.includes(language)) &&
          (!concern || e.concerns.includes(concern)) &&
          (!service || e.services.includes(service)) &&
          (!availability ||
            (availability === "this-week" ? e.availability === "this-week" : e.availability !== "later")),
      ),
    [entries, language, concern, service, availability],
  );

  const active = Boolean(language || concern || service || availability);
  const clear = () => {
    setLanguage("");
    setConcern("");
    setService("");
    setAvailability("");
  };
  const count = results.length === 1 ? labels.resultsOne : labels.results.replace("{n}", String(results.length));

  const selectClass =
    "min-h-12 w-full appearance-none rounded-2xl bg-cream-soft px-4 pr-10 text-base ring-1 ring-inset ring-cocoa/25 hover:ring-cocoa/45";
  const chevron = (
    <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
      <path d="m3 5 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );

  const filters = (
    <div className="grid gap-6">
      <div>
        <label htmlFor={ids.concern} className="text-sm font-medium">
          {labels.concern}
        </label>
        <div className="relative mt-2">
          <select id={ids.concern} value={concern} onChange={(e) => setConcern(e.target.value)} className={selectClass}>
          <option value="">{labels.any}</option>
          {concernOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
          {chevron}
        </div>
      </div>
      <div>
        <label htmlFor={ids.service} className="text-sm font-medium">
          {labels.service}
        </label>
        <div className="relative mt-2">
          <select id={ids.service} value={service} onChange={(e) => setService(e.target.value)} className={selectClass}>
          <option value="">{labels.any}</option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
          {chevron}
        </div>
      </div>
      <div role="group" aria-labelledby={ids.lang}>
        <p id={ids.lang} className="text-sm font-medium">
          {labels.language}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {languageOptions.map((o) => (
            <Chip key={o.value} selected={language === o.value} onClick={() => setLanguage(language === o.value ? "" : o.value)}>
              {o.label}
            </Chip>
          ))}
        </div>
      </div>
      <div role="group" aria-labelledby={ids.avail}>
        <p id={ids.avail} className="text-sm font-medium">
          {labels.availability}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            { value: "this-week", label: labels.availThisWeek },
            { value: "soon", label: labels.availSoon },
          ].map((o) => (
            <Chip key={o.value} selected={availability === o.value} onClick={() => setAvailability(availability === o.value ? "" : o.value)}>
              {o.label}
            </Chip>
          ))}
        </div>
      </div>
      {active ? (
        <button type="button" onClick={clear} className="min-h-11 justify-self-start text-sm underline underline-offset-4 hover:text-clay-deep">
          {labels.clear}
        </button>
      ) : null}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
      {/* Mobile: collapsible. Desktop: sticky sidebar. */}
      <details className="group rounded-pebble bg-sand p-5 lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-medium [&::-webkit-details-marker]:hidden">
          <span>
            {labels.filters}
            {active ? <span className="ml-2 inline-block size-2 rounded-full bg-clay-deep align-middle" aria-hidden /> : null}
          </span>
          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden className="transition-transform group-open:rotate-180">
            <path d="m3 5 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </summary>
        <div className="mt-5">{filters}</div>
      </details>
      <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start" aria-label={labels.filters}>
        <div className="rounded-pebble bg-sand p-6">{filters}</div>
      </aside>

      <div>
        <h2 className="font-sans text-sm font-normal leading-normal tracking-normal text-cocoa-soft" aria-live="polite">
          {count}
        </h2>
        {results.length ? (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((e) => (
              <li key={e.card.slug}>
                <TherapistCard data={e.card} labels={cardLabels} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-pebble bg-cream-soft p-8 text-center ring-1 ring-cocoa/10">
            <p className="mx-auto max-w-md text-cocoa-soft">{labels.empty}</p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Button onClick={clear} variant="secondary">
                {labels.clear}
              </Button>
              <Button href={matchHref}>{labels.match}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
