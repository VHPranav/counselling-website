/**
 * Crisis resources shown in the footer and on every booking page.
 *
 * Last checked: 20 October 2026 (news coverage of World Mental Health Day 2026
 * and Kerala NHM references). Re-verify with the official sources before
 * launch — see TODO.md.
 */
export type CrisisLine = {
  id: string;
  name: { en: string; ml: string };
  description: { en: string; ml: string };
  /** What people dial. */
  number: string;
  /** Digits only, for tel: links. */
  tel: string;
  alternate?: { number: string; tel: string; verified: boolean };
};

export const crisisLines: CrisisLine[] = [
  {
    id: "tele-manas",
    name: { en: "Tele-MANAS", ml: "ടെലി-മനസ്" },
    description: {
      en: "Free, confidential, 24×7 national mental health helpline (Government of India)",
      ml: "സൗജന്യവും രഹസ്യാത്മകവുമായ, 24 മണിക്കൂറും ലഭ്യമായ ദേശീയ മാനസികാരോഗ്യ ഹെൽപ്‌ലൈൻ (ഭാരത സർക്കാർ)",
    },
    number: "14416",
    tel: "14416",
    alternate: { number: "1-800-891-4416", tel: "18008914416", verified: true },
  },
  {
    id: "disha",
    name: { en: "DISHA", ml: "ദിശ" },
    description: {
      en: "Kerala Health Department helpline, including mental health support",
      ml: "മാനസികാരോഗ്യ പിന്തുണ ഉൾപ്പെടെയുള്ള കേരള ആരോഗ്യ വകുപ്പിന്റെ ഹെൽപ്‌ലൈൻ",
    },
    number: "1056",
    tel: "1056",
    // Listed in 2021 and 2025 press; not confirmed on an official page.
    alternate: { number: "0471 2552056", tel: "04712552056", verified: false },
  },
];
