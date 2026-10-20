import type { Service } from "./types";

/**
 * Session types. To set a price, replace `null` with a number in rupees,
 * e.g. priceInr: 1500. Durations are a starting suggestion — confirm them (see TODO.md).
 */
export const services: Service[] = [
  {
    slug: "individual",
    name: { en: "Individual therapy", ml: "വ്യക്തിഗത തെറാപ്പി" },
    audience: { en: "Adults, 18+", ml: "18 വയസ്സിന് മുകളിലുള്ളവർക്ക്" },
    summary: {
      en: "One-to-one sessions about whatever is on your mind, at your pace.",
      ml: "മനസ്സിലുള്ള എന്തിനെക്കുറിച്ചും, നിങ്ങളുടെ വേഗത്തിൽ, ഒരാളോട് മാത്രമായി സംസാരിക്കാം.",
    },
    durationMinutes: 50,
    priceInr: null,
    modes: ["video", "audio"],
  },
  {
    slug: "couples",
    name: { en: "Couples therapy", ml: "ദമ്പതികൾക്കുള്ള തെറാപ്പി" },
    audience: { en: "Partners, together", ml: "പങ്കാളികൾ ഒരുമിച്ച്" },
    summary: {
      en: "Room for both of you to be heard, and to find a way forward.",
      ml: "രണ്ടുപേർക്കും കേൾക്കപ്പെടാനും മുന്നോട്ടുള്ള വഴി കണ്ടെത്താനും ഒരിടം.",
    },
    durationMinutes: 60,
    priceInr: null,
    modes: ["video", "audio"],
  },
  {
    slug: "teens",
    name: { en: "Teen counselling", ml: "കൗമാരക്കാർക്കുള്ള കൗൺസലിങ്" },
    audience: { en: "Ages 13–17, with guardian consent", ml: "13–17 വയസ്സ്, രക്ഷിതാവിന്റെ സമ്മതത്തോടെ" },
    summary: {
      en: "A safe space for teenagers, with clear, agreed rules on privacy.",
      ml: "സ്വകാര്യതയെക്കുറിച്ച് വ്യക്തവും പരസ്പരം അംഗീകരിച്ചതുമായ നിയമങ്ങളോടെ, കൗമാരക്കാർക്ക് സുരക്ഷിതമായ ഒരിടം.",
    },
    durationMinutes: 50,
    priceInr: null,
    modes: ["video", "audio"],
    requiresGuardianConsent: true,
  },
  {
    slug: "family",
    name: { en: "Family therapy", ml: "കുടുംബ തെറാപ്പി" },
    audience: { en: "Two or more family members", ml: "രണ്ടോ അതിലധികമോ കുടുംബാംഗങ്ങൾ" },
    summary: {
      en: "Work through tension and change together, across generations.",
      ml: "തലമുറകൾക്കിടയിലെ പിരിമുറുക്കങ്ങളും മാറ്റങ്ങളും ഒരുമിച്ച് കൈകാര്യം ചെയ്യാം.",
    },
    durationMinutes: 75,
    priceInr: null,
    modes: ["video"],
  },
  {
    slug: "follow-up",
    name: { en: "Follow-up session", ml: "തുടർ സെഷൻ" },
    audience: { en: "For existing clients", ml: "നിലവിലുള്ള ക്ലയന്റുകൾക്ക്" },
    summary: {
      en: "Continue the work with your therapist.",
      ml: "നിങ്ങളുടെ തെറാപ്പിസ്റ്റുമായി തുടരാം.",
    },
    durationMinutes: 50,
    priceInr: null,
    modes: ["video", "audio"],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<string, Service>;
