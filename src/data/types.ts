/** A string in both languages. Every user-facing text in src/data uses this. */
export type L = { en: string; ml: string };

export type LanguageCode = "ml" | "en";
export type SessionMode = "video" | "audio";

export type Concern = {
  slug: string;
  name: L;
  summary: L;
  /** Fully written page in content/concerns (Phase 3); others use the template. */
  featured?: boolean;
};

export type Mood = {
  id: string;
  label: L;
  /** A short, validating line shown after someone picks this mood. */
  response: L;
  /** Concern slugs to suggest, most relevant first. */
  concerns: string[];
};

export type Service = {
  slug: string;
  name: L;
  audience: L;
  summary: L;
  /** Longer description for the Services page. */
  details: L;
  durationMinutes: number;
  /** Price in INR. null shows a [Price] placeholder. */
  priceInr: number | null;
  modes: SessionMode[];
  /** Teens need a guardian consent step in booking. */
  requiresGuardianConsent?: boolean;
};

export type Therapist = {
  slug: string;
  name: L;
  /** e.g. Counselling Psychologist, Clinical Psychologist. */
  role: L;
  credential: L;
  bio: L;
  languages: LanguageCode[];
  /** Concern slugs. */
  concerns: string[];
  services: string[];
  modes: SessionMode[];
  priceFromInr: number | null;
  /** Placeholder until real availability comes from a calendar. */
  availability: "this-week" | "next-week" | "later";
  /** Path under /public, or null for the illustrated placeholder. */
  photo: string | null;
  /** Placeholder avatar colour. */
  tone: "clay" | "moss" | "ochre" | "sage";
};

export type Faq = {
  id: string;
  question: L;
  answer: L;
  /** Show in the home page teaser. */
  home?: boolean;
  category: "getting-started" | "sessions" | "privacy" | "payments";
};

export type Workshop = {
  slug: string;
  title: L;
  summary: L;
  /** Start time, ISO 8601 with offset. Past events are hidden automatically. */
  start: string;
  durationMinutes: number;
  languages: LanguageCode[];
  audience: L;
  facilitator: L;
  /** null = free */
  priceInr: number | null;
  seats: number;
  /** Shows a "sample" marker until replaced with a real event. */
  sample?: boolean;
};
