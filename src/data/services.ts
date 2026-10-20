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
    details: {
      en: "Talk through what's on your mind with a therapist who listens closely and doesn't judge. Sessions can focus on a specific concern, a life change, or simply understanding yourself better.",
      ml: "വിധിക്കാതെ, ശ്രദ്ധയോടെ കേൾക്കുന്ന ഒരു തെറാപ്പിസ്റ്റുമായി മനസ്സിലുള്ളത് സംസാരിക്കാം. ഒരു പ്രത്യേക പ്രശ്നം, ജീവിതത്തിലെ ഒരു മാറ്റം, അല്ലെങ്കിൽ സ്വയം കൂടുതൽ മനസ്സിലാക്കൽ — എന്തിനെക്കുറിച്ചുമാകാം സെഷനുകൾ.",
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
    details: {
      en: "For partners who want to communicate better, work through conflict, rebuild trust or make a big decision together. You both get space to speak, and your therapist won't take sides.",
      ml: "നന്നായി ആശയവിനിമയം ചെയ്യാനും, പിണക്കങ്ങൾ പരിഹരിക്കാനും, വിശ്വാസം വീണ്ടെടുക്കാനും, ഒരുമിച്ച് വലിയ തീരുമാനമെടുക്കാനും ആഗ്രഹിക്കുന്ന പങ്കാളികൾക്ക്. രണ്ടുപേർക്കും സംസാരിക്കാൻ ഇടമുണ്ടാകും; തെറാപ്പിസ്റ്റ് ആരുടെയും പക്ഷം പിടിക്കില്ല.",
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
    details: {
      en: "Support for 13 to 17 year olds with exams, friendships, family, identity, mood or anything else on their mind. A parent or guardian gives consent at booking, and the therapist agrees privacy rules with both of you at the start.",
      ml: "പരീക്ഷ, സൗഹൃദങ്ങൾ, കുടുംബം, സ്വത്വം, മൂഡ് — മനസ്സിലുള്ള എന്തിനെക്കുറിച്ചും 13 മുതൽ 17 വരെ പ്രായമുള്ളവർക്ക് പിന്തുണ. ബുക്ക് ചെയ്യുമ്പോൾ മാതാപിതാക്കളോ രക്ഷിതാവോ സമ്മതം നൽകും. സ്വകാര്യതയെക്കുറിച്ചുള്ള നിയമങ്ങൾ തുടക്കത്തിൽ തന്നെ തെറാപ്പിസ്റ്റ് നിങ്ങൾ രണ്ടുപേരുമായും ചേർന്ന് തീരുമാനിക്കും.",
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
    details: {
      en: "For families going through change, conflict or loss together. Sessions can include parents, children (with consent), siblings or elders, joining from one place or several.",
      ml: "മാറ്റങ്ങളിലൂടെയോ പിണക്കങ്ങളിലൂടെയോ നഷ്ടങ്ങളിലൂടെയോ ഒരുമിച്ച് കടന്നുപോകുന്ന കുടുംബങ്ങൾക്ക്. മാതാപിതാക്കൾ, കുട്ടികൾ (സമ്മതത്തോടെ), സഹോദരങ്ങൾ, മുതിർന്നവർ — ഒരിടത്ത് നിന്നോ പല സ്ഥലങ്ങളിൽ നിന്നോ പങ്കെടുക്കാം.",
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
    details: {
      en: "Continue with the same therapist. Book your next session whenever you're ready.",
      ml: "അതേ തെറാപ്പിസ്റ്റുമായി തുടരാം. തയ്യാറാകുമ്പോൾ അടുത്ത സെഷൻ ബുക്ക് ചെയ്യാം.",
    },
    durationMinutes: 50,
    priceInr: null,
    modes: ["video", "audio"],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<string, Service>;
