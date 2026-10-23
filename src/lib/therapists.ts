import { concernBySlug } from "@/data/concerns";
import type { Therapist } from "@/data/types";
import { href, localeTags, type Locale } from "@/i18n/config";
import { format, type Messages } from "@/i18n/dictionaries";
import type { TherapistCardData, TherapistCardLabels } from "@/components/therapists/TherapistCard";

export function formatInr(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTags[locale] ?? "en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Localise a therapist for TherapistCard. */
export function toCardData(th: Therapist, locale: Locale, t: Messages): TherapistCardData {
  const tt = t.home.therapists;
  const next = { "this-week": tt.thisWeek, "next-week": tt.nextWeek, later: tt.later }[th.availability];
  return {
    slug: th.slug,
    href: href(locale, `/therapists/${th.slug}`),
    name: th.name[locale],
    role: th.role[locale],
    credential: th.credential[locale],
    languages: th.languages.map((l) => t.common[l]).join(", "),
    concerns: th.concerns.map((c) => concernBySlug[c]?.name[locale]).filter(Boolean) as string[],
    price: th.priceFromInr == null ? format(tt.from, { price: t.home.services.price }) : format(tt.from, { price: formatInr(th.priceFromInr, locale) }),
    next,
    photo: th.photo,
    voiceIntroSrc: th.voiceIntroSrc,
    tone: th.tone,
  };
}

export function cardLabels(t: Messages): TherapistCardLabels {
  const tt = t.home.therapists;
  return { viewProfile: tt.viewProfile, speaks: tt.speaks, next: tt.next };
}
