import type { Faq } from "./types";
import { siteConfig } from "../config/site.ts";
import { demoFaqAnswers } from "./demo.ts";

/**
 * Frequently asked questions. Answers describe how the service is intended to
 * work; confirm each against your actual policies before launch (see TODO.md).
 */
const baseFaqs: Faq[] = [
  {
    id: "confidential",
    home: true,
    category: "privacy",
    question: { en: "Is it really confidential?", ml: "ഇത് ശരിക്കും രഹസ്യമായിരിക്കുമോ?" },
    answer: {
      en: "Yes. What you share stays between you and your therapist. The only exceptions are rare situations where someone's safety is at serious risk, or where the law requires it. Your therapist will explain these in your first session.",
      ml: "അതെ. നിങ്ങൾ പറയുന്നത് നിങ്ങൾക്കും തെറാപ്പിസ്റ്റിനും ഇടയിൽ മാത്രം. ആരുടെയെങ്കിലും സുരക്ഷ ഗുരുതരമായ അപകടത്തിലാകുന്ന അപൂർവ സാഹചര്യങ്ങളിലോ നിയമം ആവശ്യപ്പെടുമ്പോഴോ മാത്രമാണ് ഇതിന് ഒഴിവ്. ആദ്യ സെഷനിൽ തെറാപ്പിസ്റ്റ് ഇത് വിശദീകരിക്കും.",
    },
  },
  {
    id: "need-a-reason",
    home: true,
    category: "getting-started",
    question: {
      en: "Do I need to be 'unwell' to start therapy?",
      ml: "തെറാപ്പിക്ക് വരാൻ എന്തെങ്കിലും 'പ്രശ്നം' വേണമെന്നുണ്ടോ?",
    },
    answer: {
      en: "Not at all. Many people come simply because something feels heavy, or because they want to understand themselves better.",
      ml: "ഒട്ടുമില്ല. എന്തോ ഒരു ഭാരം തോന്നുന്നതുകൊണ്ടോ, സ്വയം കൂടുതൽ മനസ്സിലാക്കാനോ ആണ് പലരും വരുന്നത്.",
    },
  },
  {
    id: "mixed-language",
    home: true,
    category: "sessions",
    question: {
      en: "Can I mix Malayalam and English?",
      ml: "മലയാളവും ഇംഗ്ലീഷും ഇടകലർത്തി സംസാരിക്കാമോ?",
    },
    answer: {
      en: "Of course. Switching between the two is completely natural, and you can choose a therapist who speaks both.",
      ml: "തീർച്ചയായും. രണ്ടും ഇടകലർത്തി സംസാരിക്കുന്നത് തികച്ചും സ്വാഭാവികമാണ്. രണ്ട് ഭാഷയും സംസാരിക്കുന്ന ഒരു തെറാപ്പിസ്റ്റിനെ തിരഞ്ഞെടുക്കുകയും ചെയ്യാം.",
    },
  },
  {
    id: "outside-india",
    home: true,
    category: "sessions",
    question: { en: "What if I live outside India?", ml: "ഞാൻ ഇന്ത്യയ്ക്ക് പുറത്താണെങ്കിലോ?" },
    answer: {
      en: "Sessions are online, so you can join from anywhere. When you book, pick a time that suits your time zone.",
      ml: "സെഷനുകൾ ഓൺലൈനാണ്, അതിനാൽ എവിടെ നിന്നും പങ്കെടുക്കാം. ബുക്ക് ചെയ്യുമ്പോൾ നിങ്ങളുടെ സമയമേഖലയ്ക്ക് യോജിച്ച സമയം തിരഞ്ഞെടുക്കാം.",
    },
  },
  {
    id: "first-session",
    category: "getting-started",
    question: { en: "What happens in the first session?", ml: "ആദ്യ സെഷനിൽ എന്താണ് നടക്കുക?" },
    answer: {
      en: "Your therapist will get to know you and what brought you here. You decide how much or how little to share.",
      ml: "നിങ്ങളെക്കുറിച്ചും എന്താണ് നിങ്ങളെ ഇവിടെ എത്തിച്ചതെന്നും തെറാപ്പിസ്റ്റ് മനസ്സിലാക്കാൻ ശ്രമിക്കും. എത്രത്തോളം പറയണമെന്ന് നിങ്ങൾക്ക് തീരുമാനിക്കാം.",
    },
  },
  {
    id: "someone-else",
    category: "getting-started",
    question: {
      en: "Can I book a session for someone else?",
      ml: "മറ്റൊരാൾക്ക് വേണ്ടി സെഷൻ ബുക്ക് ചെയ്യാമോ?",
    },
    answer: {
      en: "Yes, as long as they know and agree. Therapy works best when the person has chosen it themselves. For anyone under 18, a parent or guardian completes the consent step.",
      ml: "ചെയ്യാം, അവർ അറിയുകയും സമ്മതിക്കുകയും ചെയ്യുന്നുണ്ടെങ്കിൽ. ആ വ്യക്തി സ്വയം തിരഞ്ഞെടുക്കുമ്പോഴാണ് തെറാപ്പി ഏറ്റവും നന്നായി ഫലിക്കുക. 18 വയസ്സിന് താഴെയുള്ളവർക്ക്, മാതാപിതാക്കളോ രക്ഷിതാവോ ആണ് സമ്മതം നൽകേണ്ടത്.",
    },
  },
  {
    id: "camera",
    category: "sessions",
    question: { en: "Do I have to turn my camera on?", ml: "ക്യാമറ ഓൺ ചെയ്യണമെന്നുണ്ടോ?" },
    answer: {
      en: "No. You can choose an audio-only session when you book.",
      ml: "വേണ്ട. ബുക്ക് ചെയ്യുമ്പോൾ ഓഡിയോ മാത്രമുള്ള സെഷൻ തിരഞ്ഞെടുക്കാം.",
    },
  },
  {
    id: "what-you-need",
    category: "sessions",
    question: { en: "What do I need for an online session?", ml: "ഓൺലൈൻ സെഷന് എന്താണ് വേണ്ടത്?" },
    answer: {
      en: "A phone or computer with a steady internet connection, and a private, quiet space. Headphones help.",
      ml: "സ്ഥിരമായ ഇന്റർനെറ്റ് കണക്ഷനുള്ള ഫോണോ കമ്പ്യൂട്ടറോ, സ്വകാര്യവും ശാന്തവുമായ ഒരിടവും. ഹെഡ്‌ഫോൺ ഉപയോഗിക്കുന്നത് നല്ലതാണ്.",
    },
  },
  {
    id: "change-therapist",
    category: "sessions",
    question: { en: "Can I change my therapist?", ml: "തെറാപ്പിസ്റ്റിനെ മാറ്റാമോ?" },
    answer: {
      en: "Yes. Feeling comfortable with your therapist matters. Just tell us and we'll help you find someone else.",
      ml: "മാറ്റാം. തെറാപ്പിസ്റ്റിനോട് സൗകര്യം തോന്നുന്നത് പ്രധാനമാണ്. ഞങ്ങളോട് പറഞ്ഞാൽ മറ്റൊരാളെ കണ്ടെത്താൻ സഹായിക്കാം.",
    },
  },
  {
    id: "data-security",
    category: "privacy",
    question: { en: "How is my information kept safe?", ml: "എന്റെ വിവരങ്ങൾ എങ്ങനെയാണ് സുരക്ഷിതമായി സൂക്ഷിക്കുന്നത്?" },
    answer: {
      en: "We collect only what's needed to arrange your sessions, and never sell it. [Describe storage, encryption and access controls.]",
      ml: "സെഷനുകൾ ക്രമീകരിക്കാൻ ആവശ്യമുള്ളത് മാത്രമേ ശേഖരിക്കൂ, ഒരിക്കലും വിൽക്കില്ല. [സംഭരണം, എൻക്രിപ്ഷൻ, ആക്സസ് നിയന്ത്രണം എന്നിവ വിവരിക്കുക.]",
    },
  },
  {
    id: "how-to-pay",
    category: "payments",
    question: { en: "How do I pay?", ml: "എങ്ങനെയാണ് പണമടയ്ക്കേണ്ടത്?" },
    answer: {
      en: "Once your session is confirmed, we send a secure payment link. [Accepted methods, e.g. UPI, cards, net banking — confirm.]",
      ml: "സെഷൻ ഉറപ്പായാൽ ഒരു സുരക്ഷിത പേയ്മെന്റ് ലിങ്ക് അയച്ചുതരും. [സ്വീകരിക്കുന്ന രീതികൾ, ഉദാ. UPI, കാർഡുകൾ, നെറ്റ് ബാങ്കിങ് — ഉറപ്പാക്കുക.]",
    },
  },
  {
    id: "cancel",
    category: "payments",
    question: { en: "What if I need to cancel or reschedule?", ml: "റദ്ദാക്കാനോ സമയം മാറ്റാനോ ഉണ്ടെങ്കിലോ?" },
    answer: {
      en: "You can reschedule or cancel up to [24 hours] before your session. The Refund Policy has the details.",
      ml: "സെഷന് [24 മണിക്കൂർ] മുമ്പ് വരെ സമയം മാറ്റുകയോ റദ്ദാക്കുകയോ ചെയ്യാം. വിശദാംശങ്ങൾ റീഫണ്ട് നയത്തിലുണ്ട്.",
    },
  },
  {
    id: "pay-from-abroad",
    category: "payments",
    question: { en: "Can I pay from outside India?", ml: "ഇന്ത്യയ്ക്ക് പുറത്ത് നിന്ന് പണമടയ്ക്കാമോ?" },
    answer: {
      en: "[Confirm: international cards accepted through Razorpay, and in which currency.]",
      ml: "[ഉറപ്പാക്കുക: Razorpay വഴി അന്താരാഷ്ട്ര കാർഡുകൾ സ്വീകരിക്കുമോ, ഏത് കറൻസിയിൽ.]",
    },
  },
];

/** Demo mode swaps in sample answers where the real ones are still placeholders. */
export const faqs: Faq[] = siteConfig.demoMode
  ? baseFaqs.map((f) => (demoFaqAnswers[f.id] ? { ...f, answer: demoFaqAnswers[f.id] } : f))
  : baseFaqs;
