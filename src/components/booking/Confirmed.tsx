"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Ph } from "@/components/ui/Placeholder";

type Summary = { ref: string; service?: string; therapist?: string | null; when?: string; demo?: boolean };

/**
 * Shows the booking reference from ?ref= and, if this browser just booked,
 * the short summary left in sessionStorage (removed as soon as it is read).
 */
export function Confirmed({
  t,
  labels,
  whatsapp,
}: {
  t: { ref: string; noRef: string; demoNote: string; whatsapp: string; whatsappText: string };
  labels: { service: string; therapist: string; when: string; matched: string };
  whatsapp: string | null;
}) {
  const params = useSearchParams();
  const raw = params.get("ref") ?? "";
  const ref = /^[A-Z0-9]{6}$/.test(raw) ? raw : null;
  // This component only renders in the browser (it sits under useSearchParams' Suspense).
  const [summary] = useState<Summary | null>(() => {
    try {
      const stored = typeof window === "undefined" ? null : sessionStorage.getItem("booking:last");
      const parsed = stored ? (JSON.parse(stored) as Summary) : null;
      return parsed?.ref === ref ? parsed : null;
    } catch {
      return null;
    }
  });
  useEffect(() => {
    try {
      sessionStorage.removeItem("booking:last");
    } catch {}
  }, []);

  if (!ref) return <p className="rounded-soft bg-sand/70 p-5">{t.noRef}</p>;

  return (
    <div className="space-y-5">
      <div className="rounded-pebble bg-forest p-6 text-center text-cream on-dark grain grain-light sm:p-8">
        <p className="text-sm text-cream/80">{t.ref}</p>
        <p className="mt-2 font-display text-h1 tracking-[0.12em] tabular-nums">{ref}</p>
      </div>
      {summary ? (
        <dl className="grid gap-3 rounded-pebble bg-sand p-5 text-sm sm:grid-cols-3">
          {summary.service ? (
            <div>
              <dt className="text-cocoa-soft">{labels.service}</dt>
              <dd className="font-medium">{summary.service}</dd>
            </div>
          ) : null}
          <div>
            <dt className="text-cocoa-soft">{labels.therapist}</dt>
            <dd className="font-medium">{summary.therapist ? <Ph>{summary.therapist}</Ph> : labels.matched}</dd>
          </div>
          {summary.when ? (
            <div>
              <dt className="text-cocoa-soft">{labels.when}</dt>
              <dd className="font-medium">{summary.when}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      {summary?.demo ? (
        <p className="text-sm">
          <Ph>{t.demoNote}</Ph>
        </p>
      ) : null}
      {whatsapp ? (
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(t.whatsappText.replace("{ref}", ref))}`}
          rel="noopener"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-moss px-6 font-medium text-cream hover:bg-forest"
        >
          {t.whatsapp}
        </a>
      ) : null}
    </div>
  );
}
