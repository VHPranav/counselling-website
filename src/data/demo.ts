import type { L, Therapist } from "./types";

/**
 * DEMO CONTENT, for client presentations only.
 * Fictional people: names, photos (AI-generated in Google Flow), bios and
 * prices are invented. Used only while `demoMode` is on in src/config/site.ts.
 * Never publish this as real therapists, credentials or testimonials.
 */

export const demoTherapists: Therapist[] = [
  {
    slug: "anjali-menon",
    name: { en: "Anjali Menon", ml: "അഞ്ജലി മേനോൻ" },
    role: { en: "Counselling Psychologist", ml: "കൗൺസലിങ് സൈക്കോളജിസ്റ്റ്" },
    credential: { en: "M.Sc. Counselling Psychology · 7 years' experience", ml: "എം.എസ്‌സി. കൗൺസലിങ് സൈക്കോളജി · 7 വർഷത്തെ പരിചയം" },
    bio: {
      en: "I work with young adults and working professionals facing anxiety, low mood and burnout. My sessions are warm and practical: we make sense of what's happening, then find small, doable steps forward.",
      ml: "ഉത്കണ്ഠ, മനസ്സിന്റെ തളർച്ച, ജോലി സമ്മർദ്ദം എന്നിവ അനുഭവിക്കുന്ന യുവാക്കളോടും ജോലിക്കാരോടുമൊപ്പമാണ് ഞാൻ പ്രവർത്തിക്കുന്നത്. എന്താണ് സംഭവിക്കുന്നതെന്ന് ഒരുമിച്ച് മനസ്സിലാക്കി, ചെറുതും ചെയ്യാവുന്നതുമായ ചുവടുകൾ കണ്ടെത്താം.",
    },
    languages: ["ml", "en"],
    concerns: ["anxiety", "depression", "work-stress", "sleep"],
    services: ["individual", "follow-up"],
    modes: ["video", "audio"],
    priceFromInr: 1200,
    availability: "this-week",
    photo: "anjali-menon",
    tone: "clay",
  },
  {
    slug: "arjun-nair",
    name: { en: "Arjun Nair", ml: "അർജുൻ നായർ" },
    role: { en: "Clinical Psychologist", ml: "ക്ലിനിക്കൽ സൈക്കോളജിസ്റ്റ്" },
    credential: { en: "M.Phil. Clinical Psychology · 9 years' experience", ml: "എം.ഫിൽ. ക്ലിനിക്കൽ സൈക്കോളജി · 9 വർഷത്തെ പരിചയം" },
    bio: {
      en: "Couples and families often come to me when conversations keep turning into arguments. I help each person feel heard, and we work on patterns rather than blame.",
      ml: "സംസാരങ്ങൾ വഴക്കുകളിലേക്ക് മാറുമ്പോഴാണ് പല ദമ്പതികളും കുടുംബങ്ങളും എന്റെ അടുത്ത് വരുന്നത്. ഓരോരുത്തരും കേൾക്കപ്പെടാൻ ഞാൻ സഹായിക്കും; കുറ്റപ്പെടുത്തലല്ല, ആവർത്തിക്കുന്ന രീതികളാണ് നമ്മൾ മാറ്റാൻ ശ്രമിക്കുക.",
    },
    languages: ["ml", "en"],
    concerns: ["relationships", "parenting", "anger"],
    services: ["individual", "couples", "family", "follow-up"],
    modes: ["video"],
    priceFromInr: 1500,
    availability: "next-week",
    photo: "arjun-nair",
    tone: "moss",
  },
  {
    slug: "lakshmi-pillai",
    name: { en: "Dr. Lakshmi Pillai", ml: "ഡോ. ലക്ഷ്മി പിള്ള" },
    role: { en: "Senior Clinical Psychologist", ml: "സീനിയർ ക്ലിനിക്കൽ സൈക്കോളജിസ്റ്റ്" },
    credential: { en: "Ph.D. Clinical Psychology · 18 years' experience", ml: "പിഎച്ച്.ഡി. ക്ലിനിക്കൽ സൈക്കോളജി · 18 വർഷത്തെ പരിചയം" },
    bio: {
      en: "I've spent most of my career supporting people through grief, loss and difficult life events. There's no rush in my sessions; we go at the pace that feels safe for you.",
      ml: "ദുഃഖം, നഷ്ടം, ജീവിതത്തിലെ പ്രയാസമുള്ള സംഭവങ്ങൾ എന്നിവയിലൂടെ കടന്നുപോകുന്നവരെ പിന്തുണയ്ക്കാനാണ് ഞാൻ എന്റെ കരിയറിന്റെ ഏറിയ പങ്കും ചെലവഴിച്ചത്. എന്റെ സെഷനുകളിൽ ധൃതിയില്ല; നിങ്ങൾക്ക് സുരക്ഷിതമെന്ന് തോന്നുന്ന വേഗത്തിൽ നമുക്ക് പോകാം.",
    },
    languages: ["ml", "en"],
    concerns: ["grief", "trauma", "depression"],
    services: ["individual", "follow-up"],
    modes: ["video", "audio"],
    priceFromInr: 1800,
    availability: "next-week",
    photo: "lakshmi-pillai",
    tone: "ochre",
  },
  {
    slug: "fathima-rahman",
    name: { en: "Fathima Rahman", ml: "ഫാത്തിമ റഹ്മാൻ" },
    role: { en: "Child & Adolescent Counsellor", ml: "കുട്ടികൾക്കും കൗമാരക്കാർക്കുമുള്ള കൗൺസലർ" },
    credential: { en: "M.Sc. Psychology · 6 years' experience", ml: "എം.എസ്‌സി. സൈക്കോളജി · 6 വർഷത്തെ പരിചയം" },
    bio: {
      en: "I work with teenagers on exam stress, anxiety, friendships and the big feelings of growing up. Teens set the pace, and parents are kept involved in the ways we agree together.",
      ml: "പരീക്ഷാ സമ്മർദ്ദം, ഉത്കണ്ഠ, സൗഹൃദങ്ങൾ, വളർന്നുവരുമ്പോഴുള്ള വലിയ വികാരങ്ങൾ എന്നിവയിൽ കൗമാരക്കാരോടൊപ്പം ഞാൻ പ്രവർത്തിക്കുന്നു. വേഗം തീരുമാനിക്കുന്നത് കുട്ടികളാണ്; ഒരുമിച്ച് തീരുമാനിക്കുന്ന രീതിയിൽ മാതാപിതാക്കളെയും ഉൾപ്പെടുത്തും.",
    },
    languages: ["ml", "en"],
    concerns: ["anxiety", "ocd", "sleep"],
    services: ["individual", "teens", "follow-up"],
    modes: ["video", "audio"],
    priceFromInr: 1200,
    availability: "this-week",
    photo: "fathima-rahman",
    tone: "sage",
  },
  {
    slug: "sneha-thomas",
    name: { en: "Sneha Thomas", ml: "സ്നേഹ തോമസ്" },
    role: { en: "Family Therapist", ml: "ഫാമിലി തെറാപ്പിസ്റ്റ്" },
    credential: { en: "M.A. Psychology, PG Diploma in Family Therapy · 8 years' experience", ml: "എം.എ. സൈക്കോളജി, ഫാമിലി തെറാപ്പിയിൽ പിജി ഡിപ്ലോമ · 8 വർഷത്തെ പരിചയം" },
    bio: {
      en: "Many of the families I see are living between Kerala and abroad. I help parents and children talk across generations, and find a rhythm that works for everyone.",
      ml: "ഞാൻ കാണുന്ന പല കുടുംബങ്ങളും കേരളത്തിനും വിദേശത്തിനുമിടയിലാണ് ജീവിക്കുന്നത്. തലമുറകൾക്കിടയിൽ സംസാരിക്കാനും എല്ലാവർക്കും യോജിക്കുന്ന ഒരു താളം കണ്ടെത്താനും ഞാൻ മാതാപിതാക്കളെയും കുട്ടികളെയും സഹായിക്കുന്നു.",
    },
    languages: ["ml", "en"],
    concerns: ["parenting", "relationships", "anxiety"],
    services: ["teens", "family", "follow-up"],
    modes: ["video"],
    priceFromInr: 1400,
    availability: "this-week",
    photo: "sneha-thomas",
    tone: "clay",
  },
  {
    slug: "rahul-varghese",
    name: { en: "Rahul Varghese", ml: "രാഹുൽ വർഗീസ്" },
    role: { en: "Counselling Psychologist", ml: "കൗൺസലിങ് സൈക്കോളജിസ്റ്റ്" },
    credential: { en: "M.A. Applied Psychology · 5 years' experience", ml: "എം.എ. അപ്ലൈഡ് സൈക്കോളജി · 5 വർഷത്തെ പരിചയം" },
    bio: {
      en: "I mostly work with men who find it hard to talk about stress, anger or low mood. Sessions are straightforward and judgement-free, in Malayalam, English or both.",
      ml: "സമ്മർദ്ദം, ദേഷ്യം, മനസ്സിന്റെ തളർച്ച എന്നിവയെക്കുറിച്ച് സംസാരിക്കാൻ ബുദ്ധിമുട്ടുള്ള പുരുഷന്മാരോടൊപ്പമാണ് ഞാൻ കൂടുതലും പ്രവർത്തിക്കുന്നത്. സെഷനുകൾ ലളിതവും വിധിക്കാത്തതുമാണ്; മലയാളത്തിലോ ഇംഗ്ലീഷിലോ രണ്ടിലുമോ.",
    },
    languages: ["ml", "en"],
    concerns: ["work-stress", "anger", "depression"],
    services: ["individual", "couples", "follow-up"],
    modes: ["video", "audio"],
    priceFromInr: 1000,
    availability: "this-week",
    photo: "rahul-varghese",
    tone: "moss",
  },
];

/** Demo session fees in INR, by service slug. */
export const demoPrices: Record<string, number> = {
  individual: 1200,
  couples: 1800,
  teens: 1200,
  family: 2200,
  "follow-up": 1000,
};

/** Demo testimonials (fictional). */
export const demoTestimonials: Array<{ quote: L; who: L }> = [
  {
    quote: {
      en: "Being able to talk in Malayalam made it so much easier. I didn't have to translate my feelings.",
      ml: "മലയാളത്തിൽ സംസാരിക്കാൻ കഴിഞ്ഞത് വളരെ എളുപ്പമാക്കി. എന്റെ വികാരങ്ങൾ വിവർത്തനം ചെയ്യേണ്ടി വന്നില്ല.",
    },
    who: { en: "Ammu, Kochi", ml: "അമ്മു, കൊച്ചി" },
  },
  {
    quote: {
      en: "I'm in Dubai and work long hours. Evening sessions on my phone fitted in without anyone knowing.",
      ml: "ഞാൻ ദുബായിലാണ്, ജോലി സമയം നീണ്ടതാണ്. ഫോണിൽ വൈകുന്നേരത്തെ സെഷനുകൾ ആരും അറിയാതെ ഒതുങ്ങി.",
    },
    who: { en: "Shibu, Dubai", ml: "ഷിബു, ദുബായ്" },
  },
  {
    quote: {
      en: "We came in barely speaking to each other. Six sessions later we can actually disagree without shouting.",
      ml: "പരസ്പരം മിണ്ടാതെയാണ് ഞങ്ങൾ വന്നത്. ആറ് സെഷനുകൾക്ക് ശേഷം, ഒച്ചയെടുക്കാതെ അഭിപ്രായവ്യത്യാസം പറയാൻ ഇപ്പോൾ കഴിയുന്നുണ്ട്.",
    },
    who: { en: "Neethu & Vivek, Thrissur", ml: "നീതു & വിവേക്, തൃശ്ശൂർ" },
  },
  {
    quote: {
      en: "My daughter actually looks forward to her sessions. The counsellor explained the privacy rules to both of us at the start.",
      ml: "മകൾ ഇപ്പോൾ അവളുടെ സെഷനുകൾക്കായി കാത്തിരിക്കുന്നു. സ്വകാര്യതയുടെ നിയമങ്ങൾ തുടക്കത്തിൽ തന്നെ കൗൺസലർ ഞങ്ങൾ രണ്ടുപേർക്കും വിശദീകരിച്ചു.",
    },
    who: { en: "Parent of a 15-year-old, Kozhikode", ml: "15 വയസ്സുകാരിയുടെ രക്ഷിതാവ്, കോഴിക്കോട്" },
  },
  {
    quote: {
      en: "After my father passed, I didn't know who to talk to. Having someone patient made a real difference.",
      ml: "അച്ഛൻ മരിച്ചതിന് ശേഷം ആരോട് സംസാരിക്കണമെന്ന് അറിയില്ലായിരുന്നു. ക്ഷമയോടെ കേൾക്കുന്ന ഒരാൾ ഉണ്ടായത് വലിയ വ്യത്യാസമുണ്ടാക്കി.",
    },
    who: { en: "Anoop, Thiruvananthapuram", ml: "അനൂപ്, തിരുവനന്തപുരം" },
  },
];

/** Demo answers for FAQs that still contain placeholders. */
export const demoFaqAnswers: Record<string, L> = {
  "data-security": {
    en: "We collect only what's needed to arrange your sessions and never sell it. Data is encrypted, and only your therapist and our small care team can see your booking details.",
    ml: "സെഷനുകൾ ക്രമീകരിക്കാൻ ആവശ്യമുള്ളത് മാത്രമേ ശേഖരിക്കൂ, ഒരിക്കലും വിൽക്കില്ല. വിവരങ്ങൾ എൻക്രിപ്റ്റ് ചെയ്താണ് സൂക്ഷിക്കുന്നത്; നിങ്ങളുടെ തെറാപ്പിസ്റ്റിനും ഞങ്ങളുടെ ചെറിയ കെയർ ടീമിനും മാത്രമേ ബുക്കിങ് വിവരങ്ങൾ കാണാനാകൂ.",
  },
  "how-to-pay": {
    en: "Once your session is confirmed, we send a secure payment link. You can pay by UPI, debit or credit card, or net banking.",
    ml: "സെഷൻ ഉറപ്പായാൽ ഒരു സുരക്ഷിത പേയ്മെന്റ് ലിങ്ക് അയച്ചുതരും. UPI, ഡെബിറ്റ് / ക്രെഡിറ്റ് കാർഡ്, നെറ്റ് ബാങ്കിങ് എന്നിവയിലൂടെ പണമടയ്ക്കാം.",
  },
  cancel: {
    en: "You can reschedule or cancel up to 24 hours before your session. The Refund Policy has the details.",
    ml: "സെഷന് 24 മണിക്കൂർ മുമ്പ് വരെ സമയം മാറ്റുകയോ റദ്ദാക്കുകയോ ചെയ്യാം. വിശദാംശങ്ങൾ റീഫണ്ട് നയത്തിലുണ്ട്.",
  },
  "pay-from-abroad": {
    en: "Yes. International cards are accepted. Fees are charged in INR and your bank converts the amount.",
    ml: "പണമടയ്ക്കാം. അന്താരാഷ്ട്ര കാർഡുകൾ സ്വീകരിക്കും. ഫീസ് ഇന്ത്യൻ രൂപയിലാണ്; നിങ്ങളുടെ ബാങ്ക് തുക മാറ്റിക്കൊള്ളും.",
  },
};

/** Demo facilitators for the sample workshops, by workshop slug. */
export const demoFacilitators: Record<string, L> = {
  "exam-stress-parents": { en: "Fathima Rahman", ml: "ഫാത്തിമ റഹ്മാൻ" },
  "sleep-busy-mind": { en: "Anjali Menon", ml: "അഞ്ജലി മേനോൻ" },
  "life-abroad": { en: "Sneha Thomas", ml: "സ്നേഹ തോമസ്" },
};
