import type { L } from "./types";

/** Related guides, grouped by the session types Thanal already offers. */
export const serviceConcerns: Record<string, string[]> = {
  individual: ["anxiety", "depression", "work-stress", "grief", "trauma", "anger", "ocd", "sleep"],
  couples: ["relationships", "anger", "parenting"],
  teens: ["anxiety", "depression", "anger", "sleep"],
  family: ["relationships", "parenting", "grief"],
  "follow-up": ["anxiety", "relationships", "work-stress"],
};

export const serviceEntrances: Record<string, { title: L; line: L }> = {
  individual: {
    title: { en: "For yourself", ml: "നിങ്ങൾക്കായി" },
    line: { en: "Room for everything on your mind.", ml: "മനസ്സിലുള്ളതെല്ലാം പറയാൻ ഒരിടം." },
  },
  couples: {
    title: { en: "For the two of you", ml: "നിങ്ങൾ രണ്ടുപേർക്കായി" },
    line: { en: "Make space for each other again.", ml: "പരസ്പരം കേൾക്കാൻ വീണ്ടും ഒരിടം." },
  },
  teens: {
    title: { en: "For growing up", ml: "വളരുന്ന പ്രായത്തിൽ" },
    line: { en: "Support through a changing world.", ml: "മാറുന്ന ലോകത്ത് കൂടെ നിൽക്കുന്ന പിന്തുണ." },
  },
  family: {
    title: { en: "For your family", ml: "നിങ്ങളുടെ കുടുംബത്തിനായി" },
    line: { en: "Find a way through, together.", ml: "ഒരുമിച്ച് മുന്നോട്ടുള്ള വഴി കണ്ടെത്താം." },
  },
};

export const discoveryLabels = {
  eyebrow: { en: "A place to begin", ml: "തുടങ്ങാൻ ഒരിടം" },
  title: { en: "Different lives.", ml: "വ്യത്യസ്ത ജീവിതങ്ങൾ." },
  italic: { en: "Support for yours.", ml: "നിങ്ങൾക്കിണങ്ങുന്ന പിന്തുണ." },
  lead: { en: "Start with who you’re here for. We’ll help you find the right conversation.", ml: "ആർക്കുവേണ്ടിയാണ് വന്നതെന്ന് തീരുമാനിക്കാം. അനുയോജ്യമായ പിന്തുണ കണ്ടെത്താൻ ഞങ്ങൾ കൂടെയുണ്ട്." },
  concerns: { en: "Or start with what’s on your mind", ml: "അല്ലെങ്കിൽ മനസ്സിലുള്ളതിൽ നിന്ന് തുടങ്ങാം" },
  explore: { en: "Explore this support", ml: "ഈ പിന്തുണയെക്കുറിച്ച് അറിയാം" },
  all: { en: "All services & session details", ml: "എല്ലാ സേവനങ്ങളും സെഷൻ വിവരങ്ങളും" },
  followUp: { en: "Already seeing someone? Book a follow-up", ml: "സെഷനുകൾ തുടങ്ങിയോ? തുടർ സെഷൻ ബുക്ക് ചെയ്യാം" },
  topics: { en: "Things we can talk through", ml: "നമുക്ക് സംസാരിക്കാവുന്ന കാര്യങ്ങൾ" },
  expect: { en: "What to expect", ml: "എന്താണ് പ്രതീക്ഷിക്കേണ്ടത്" },
  fees: { en: "Your session, at a glance", ml: "നിങ്ങളുടെ സെഷൻ ഒറ്റനോട്ടത്തിൽ" },
  teamEyebrow: { en: "People, before profiles", ml: "പ്രൊഫൈലിനപ്പുറം മനുഷ്യർ" },
  teamTitle: { en: "Find someone", ml: "കണ്ടെത്താം" },
  teamItalic: { en: "you can open up to.", ml: "മനസ്സ് തുറക്കാവുന്ന ഒരാളെ." },
  teamLead: { en: "Different experiences, a shared intention: to listen closely and work with you, at your pace.", ml: "വ്യത്യസ്ത അനുഭവങ്ങൾ, ഒരേ ലക്ഷ്യം: ശ്രദ്ധയോടെ കേൾക്കാനും നിങ്ങളുടെ വേഗത്തിൽ കൂടെ പ്രവർത്തിക്കാനും." },
  faqLead: { en: "A little clarity before your first conversation. If you’re still unsure, our team is here to help.", ml: "ആദ്യ സംഭാഷണത്തിന് മുമ്പ് കുറച്ച് വ്യക്തത. സംശയമുണ്ടെങ്കിൽ ഞങ്ങളുടെ ടീം സഹായിക്കാൻ ഇവിടെയുണ്ട്." },
  sampleReviews: { en: "Illustrative stories for this preview. Real reviews will be shared with consent.", ml: "ഈ പ്രിവ്യൂവിലെ മാതൃകാ അനുഭവങ്ങൾ. യഥാർത്ഥ അഭിപ്രായങ്ങൾ സമ്മതത്തോടെ പങ്കുവെക്കും." },
};
