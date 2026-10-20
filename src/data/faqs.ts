import type { Faq } from "./types";

/**
 * Frequently asked questions. Answers describe how the service is intended to
 * work; confirm each against your actual policies before launch (see TODO.md).
 */
export const faqs: Faq[] = [
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
];
