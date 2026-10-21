import type { Workshop } from "./types";
import { siteConfig } from "../config/site.ts";
import { demoFacilitators } from "./demo.ts";

/**
 * SAMPLE EVENTS. Replace with your real schedule. Events whose start time has
 * passed are hidden from the Workshops page automatically.
 */
const facilitator = { en: "[Facilitator name]", ml: "[നയിക്കുന്നയാളുടെ പേര്]" };

const baseWorkshops: Workshop[] = [
  {
    slug: "exam-stress-parents",
    sample: true,
    title: { en: "Exam stress: a session for parents", ml: "പരീക്ഷാ സമ്മർദ്ദം: മാതാപിതാക്കൾക്കായി" },
    summary: {
      en: "How to notice when exam pressure is becoming too much, and how to talk about it at home without adding to it.",
      ml: "പരീക്ഷാ സമ്മർദ്ദം അമിതമാകുന്നത് എങ്ങനെ തിരിച്ചറിയാം, അത് കൂട്ടാതെ വീട്ടിൽ എങ്ങനെ സംസാരിക്കാം.",
    },
    start: "2026-11-14T10:00:00+05:30",
    durationMinutes: 90,
    languages: ["ml"],
    audience: { en: "Parents of students", ml: "വിദ്യാർത്ഥികളുടെ മാതാപിതാക്കൾ" },
    facilitator,
    priceInr: null,
    seats: 40,
  },
  {
    slug: "sleep-busy-mind",
    sample: true,
    title: { en: "Sleeping better when your mind won't settle", ml: "മനസ്സ് ശാന്തമാകാത്തപ്പോൾ നന്നായി ഉറങ്ങാൻ" },
    summary: {
      en: "Simple, practical habits for winding down, and what to do when you're lying awake at 2am.",
      ml: "ദിവസം ശാന്തമായി അവസാനിപ്പിക്കാനുള്ള ലളിതമായ ശീലങ്ങൾ, പുലർച്ചെ രണ്ട് മണിക്ക് ഉറക്കമില്ലാതെ കിടക്കുമ്പോൾ എന്ത് ചെയ്യാം.",
    },
    start: "2026-11-28T19:30:00+05:30",
    durationMinutes: 60,
    languages: ["en", "ml"],
    audience: { en: "Adults", ml: "മുതിർന്നവർ" },
    facilitator,
    priceInr: null,
    seats: 60,
  },
  {
    slug: "life-abroad",
    sample: true,
    title: { en: "Life abroad: staying connected while far from home", ml: "പ്രവാസ ജീവിതം: ദൂരെയായിരിക്കുമ്പോഴും ബന്ധം നിലനിർത്താൻ" },
    summary: {
      en: "For Malayalis living away from family: loneliness, guilt, distance, and keeping relationships close.",
      ml: "കുടുംബത്തിൽ നിന്ന് അകലെ ജീവിക്കുന്ന മലയാളികൾക്ക്: ഒറ്റപ്പെടൽ, കുറ്റബോധം, അകലം, ബന്ധങ്ങൾ അടുപ്പത്തോടെ നിലനിർത്തൽ.",
    },
    start: "2026-12-12T18:00:00+05:30",
    durationMinutes: 75,
    languages: ["ml"],
    audience: { en: "Malayalis living abroad", ml: "വിദേശത്ത് താമസിക്കുന്ന മലയാളികൾ" },
    facilitator,
    priceInr: null,
    seats: 50,
  },
];

export const workshops: Workshop[] = siteConfig.demoMode
  ? baseWorkshops.map((w) => ({ ...w, sample: false, facilitator: demoFacilitators[w.slug] ?? w.facilitator }))
  : baseWorkshops;
