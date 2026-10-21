import type { Therapist } from "./types";
import { siteConfig } from "../config/site.ts";
import { demoTherapists } from "./demo.ts";

/**
 * PLACEHOLDER PROFILES. These are not real people. Replace each entry with a
 * real, consenting therapist before launch (see TODO.md). The languages,
 * concerns and modes vary only so the filters can be tested.
 */
const placeholderBio = {
  en: "[Short bio in the therapist's own words: their approach, who they work with, and what a first session is like.]",
  ml: "[തെറാപ്പിസ്റ്റിന്റെ സ്വന്തം വാക്കുകളിൽ ചെറിയ വിവരണം: സമീപനം, ആരോടൊപ്പം പ്രവർത്തിക്കുന്നു, ആദ്യ സെഷൻ എങ്ങനെയായിരിക്കും.]",
};

const placeholder = (n: number) => ({
  name: { en: `[Therapist name ${n}]`, ml: `[തെറാപ്പിസ്റ്റിന്റെ പേര് ${n}]` },
  role: { en: "[Role, e.g. Counselling Psychologist]", ml: "[പദവി, ഉദാ. കൗൺസലിങ് സൈക്കോളജിസ്റ്റ്]" },
  credential: { en: "[Qualification · RCI reg. no.]", ml: "[യോഗ്യത · RCI രജി. നമ്പർ]" },
  bio: placeholderBio,
  priceFromInr: null,
  photo: null,
});

const placeholderTherapists: Therapist[] = [
  {
    slug: "therapist-1",
    ...placeholder(1),
    languages: ["ml", "en"],
    concerns: ["anxiety", "depression", "work-stress", "sleep"],
    services: ["individual", "follow-up"],
    modes: ["video", "audio"],
    availability: "this-week",
    tone: "clay",
  },
  {
    slug: "therapist-2",
    ...placeholder(2),
    languages: ["ml", "en"],
    concerns: ["relationships", "parenting", "anger"],
    services: ["individual", "couples", "family", "follow-up"],
    modes: ["video"],
    availability: "next-week",
    tone: "moss",
  },
  {
    slug: "therapist-3",
    ...placeholder(3),
    languages: ["ml"],
    concerns: ["grief", "trauma", "depression"],
    services: ["individual", "follow-up"],
    modes: ["video", "audio"],
    availability: "this-week",
    tone: "ochre",
  },
  {
    slug: "therapist-4",
    ...placeholder(4),
    languages: ["en", "ml"],
    concerns: ["anxiety", "ocd", "sleep"],
    services: ["individual", "teens", "follow-up"],
    modes: ["video", "audio"],
    availability: "later",
    tone: "sage",
  },
  {
    slug: "therapist-5",
    ...placeholder(5),
    languages: ["ml", "en"],
    concerns: ["parenting", "relationships", "anxiety"],
    services: ["teens", "family", "follow-up"],
    modes: ["video"],
    availability: "next-week",
    tone: "clay",
  },
  {
    slug: "therapist-6",
    ...placeholder(6),
    languages: ["en"],
    concerns: ["work-stress", "anger", "depression"],
    services: ["individual", "couples", "follow-up"],
    modes: ["video", "audio"],
    availability: "this-week",
    tone: "moss",
  },
];

/** The live list: demo profiles while demo mode is on, placeholders otherwise. */
export const therapists: Therapist[] = siteConfig.demoMode ? demoTherapists : placeholderTherapists;

/** Therapists who work with any of the given concerns, best overlap first. */
export function matchTherapists(concernSlugs: string[], limit = 3): Therapist[] {
  return therapists
    .map((t) => ({
      t,
      score: concernSlugs.reduce((s, c, i) => s + (t.concerns.includes(c) ? concernSlugs.length - i : 0), 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.t);
}
