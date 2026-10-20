import type { Concern } from "./types";

/** Concern pages live at /[locale]/concerns/[slug]. Order here is display order. */
export const concerns: Concern[] = [
  {
    slug: "anxiety",
    featured: true,
    name: { en: "Anxiety", ml: "ഉത്കണ്ഠ" },
    summary: {
      en: "Worry, panic and a mind that won't switch off.",
      ml: "അമിതമായ ആധി, പരിഭ്രമം, നിൽക്കാത്ത ചിന്തകൾ.",
    },
  },
  {
    slug: "depression",
    featured: true,
    name: { en: "Depression", ml: "വിഷാദം" },
    summary: {
      en: "Low mood, numbness, losing interest in things you used to enjoy.",
      ml: "മനസ്സിന്റെ തളർച്ച, മരവിപ്പ്, മുമ്പ് ഇഷ്ടപ്പെട്ടിരുന്നവയോട് പോലും താൽപര്യമില്ലായ്മ.",
    },
  },
  {
    slug: "relationships",
    featured: true,
    name: { en: "Relationships", ml: "ബന്ധങ്ങൾ" },
    summary: {
      en: "Partners, family and friendships, and the distance that can grow between.",
      ml: "പങ്കാളി, കുടുംബം, സൗഹൃദങ്ങൾ — അവയ്ക്കിടയിൽ വളരുന്ന അകലങ്ങളും.",
    },
  },
  {
    slug: "work-stress",
    featured: true,
    name: { en: "Work stress & burnout", ml: "ജോലി സമ്മർദ്ദവും തളർച്ചയും" },
    summary: {
      en: "Pressure, exhaustion, and feeling stuck at work.",
      ml: "സമ്മർദ്ദം, ക്ഷീണം, ജോലിയിൽ മുന്നോട്ട് പോകാനാവാത്ത തോന്നൽ.",
    },
  },
  {
    slug: "grief",
    name: { en: "Grief & loss", ml: "ദുഃഖവും നഷ്ടവും" },
    summary: {
      en: "Losing someone, or something, that mattered.",
      ml: "പ്രിയപ്പെട്ട ഒരാളെയോ ഒന്നിനെയോ നഷ്ടപ്പെടുമ്പോൾ.",
    },
  },
  {
    slug: "trauma",
    name: { en: "Trauma", ml: "മാനസികാഘാതം (ട്രോമ)" },
    summary: {
      en: "Painful experiences that still feel close.",
      ml: "ഇപ്പോഴും വിട്ടുമാറാത്ത വേദനിപ്പിക്കുന്ന അനുഭവങ്ങൾ.",
    },
  },
  {
    slug: "parenting",
    name: { en: "Parenting", ml: "പാരന്റിങ്" },
    summary: {
      en: "Raising children across generations, cultures and countries.",
      ml: "തലമുറകൾക്കും സംസ്കാരങ്ങൾക്കും നാടുകൾക്കുമിടയിൽ കുട്ടികളെ വളർത്തുമ്പോൾ.",
    },
  },
  {
    slug: "anger",
    name: { en: "Anger", ml: "ദേഷ്യം" },
    summary: {
      en: "Frustration that feels hard to hold.",
      ml: "നിയന്ത്രിക്കാൻ പ്രയാസം തോന്നുന്ന ദേഷ്യവും അസ്വസ്ഥതയും.",
    },
  },
  {
    slug: "ocd",
    name: { en: "OCD", ml: "ഒസിഡി" },
    summary: {
      en: "Intrusive thoughts and urges that keep coming back.",
      ml: "വീണ്ടും വീണ്ടും വരുന്ന അനാവശ്യ ചിന്തകളും പ്രേരണകളും.",
    },
  },
  {
    slug: "sleep",
    name: { en: "Sleep", ml: "ഉറക്കം" },
    summary: {
      en: "Trouble falling asleep, or staying asleep.",
      ml: "ഉറങ്ങാനോ ഉറക്കം നിലനിർത്താനോ ഉള്ള ബുദ്ധിമുട്ട്.",
    },
  },
];

export const concernBySlug = Object.fromEntries(concerns.map((c) => [c.slug, c])) as Record<string, Concern>;
