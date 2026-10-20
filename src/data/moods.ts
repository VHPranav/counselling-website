import type { Mood } from "./types";

/** The "How are you feeling today?" chips on the home page. */
export const moods: Mood[] = [
  {
    id: "anxious",
    label: { en: "Anxious", ml: "ഉത്കണ്ഠ തോന്നുന്നു" },
    response: {
      en: "Racing thoughts and a tight chest are exhausting. You don't have to untangle them alone.",
      ml: "ഓടിക്കൊണ്ടിരിക്കുന്ന ചിന്തകളും നെഞ്ചിലെ ഭാരവും വല്ലാതെ തളർത്തും. ഇതൊക്കെ ഒറ്റയ്ക്ക് അഴിച്ചെടുക്കേണ്ടതില്ല.",
    },
    concerns: ["anxiety", "sleep", "ocd"],
  },
  {
    id: "low",
    label: { en: "Feeling low", ml: "മനസ്സിന് ഒരു ഭാരം" },
    response: {
      en: "When everything feels heavy, even small things take effort. Talking can make a little room to breathe.",
      ml: "എല്ലാം ഭാരമായി തോന്നുമ്പോൾ ചെറിയ കാര്യങ്ങൾ പോലും പ്രയാസമാകും. സംസാരിക്കുന്നത് ഒരല്പം ആശ്വാസം നൽകിയേക്കാം.",
    },
    concerns: ["depression", "grief", "sleep"],
  },
  {
    id: "overwhelmed",
    label: { en: "Overwhelmed", ml: "എല്ലാം കൂടി താങ്ങാനാവുന്നില്ല" },
    response: {
      en: "When it all arrives at once, it's hard to know where to begin. We can start with just one thing.",
      ml: "എല്ലാം ഒരുമിച്ച് വരുമ്പോൾ എവിടെ തുടങ്ങണമെന്ന് അറിയില്ല. നമുക്ക് ഒരു കാര്യത്തിൽ നിന്ന് തുടങ്ങാം.",
    },
    concerns: ["work-stress", "anxiety", "parenting"],
  },
  {
    id: "relationship",
    label: { en: "Relationship stress", ml: "ബന്ധങ്ങളിലെ സമ്മർദ്ദം" },
    response: {
      en: "With a partner, parents or family, conflict close to home hurts. You can come on your own or together.",
      ml: "പങ്കാളിയുമായോ മാതാപിതാക്കളുമായോ കുടുംബവുമായോ ആകട്ടെ, അടുത്തവരുമായുള്ള പിണക്കം വേദനിപ്പിക്കും. ഒറ്റയ്ക്കോ ഒരുമിച്ചോ വരാം.",
    },
    concerns: ["relationships", "parenting", "anger"],
  },
  {
    id: "grief",
    label: { en: "Grief or loss", ml: "നഷ്ടത്തിന്റെ ദുഃഖം" },
    response: {
      en: "Grief keeps no timetable. A counsellor can sit with you in it, at your pace.",
      ml: "ദുഃഖത്തിന് ഒരു സമയപരിധിയില്ല. നിങ്ങളുടെ വേഗത്തിൽ, ഒപ്പമിരിക്കാൻ ഒരു കൗൺസലറുണ്ട്.",
    },
    concerns: ["grief", "depression", "trauma"],
  },
  {
    id: "work",
    label: { en: "Work stress", ml: "ജോലിയിലെ സമ്മർദ്ദം" },
    response: {
      en: "Long hours, pressure or feeling stuck can follow you home. Let's look at what's weighing on you.",
      ml: "നീണ്ട ജോലി സമയവും സമ്മർദ്ദവും മുന്നോട്ട് പോകാനാവാത്ത അവസ്ഥയും വീട്ടിലേക്കും കൂടെ വരും. എന്താണ് ഭാരമാകുന്നതെന്ന് നമുക്ക് നോക്കാം.",
    },
    concerns: ["work-stress", "anxiety", "sleep"],
  },
  {
    id: "anger",
    label: { en: "On edge", ml: "പെട്ടെന്ന് ദേഷ്യം വരുന്നു" },
    response: {
      en: "Anger often protects something underneath. Understanding it is a good first step.",
      ml: "ദേഷ്യത്തിനടിയിൽ പലപ്പോഴും മറ്റെന്തെങ്കിലും ഒളിഞ്ഞിരിപ്പുണ്ടാകും. അത് മനസ്സിലാക്കുന്നത് നല്ലൊരു തുടക്കമാണ്.",
    },
    concerns: ["anger", "relationships", "work-stress"],
  },
  {
    id: "sleep",
    label: { en: "Can't sleep", ml: "ഉറക്കം കിട്ടുന്നില്ല" },
    response: {
      en: "Nights feel long when the mind won't settle. There are gentle, practical ways to help.",
      ml: "മനസ്സ് ശാന്തമാകാത്തപ്പോൾ രാത്രികൾക്ക് നീളം കൂടും. സഹായിക്കാൻ ലളിതവും പ്രായോഗികവുമായ വഴികളുണ്ട്.",
    },
    concerns: ["sleep", "anxiety", "depression"],
  },
  {
    id: "talk",
    label: { en: "Just need to talk", ml: "ആരോടെങ്കിലും ഒന്ന് മിണ്ടണം" },
    response: {
      en: "You don't need a reason or a label. Sometimes being heard is where it starts.",
      ml: "ഒരു കാരണമോ പേരോ വേണമെന്നില്ല. ചിലപ്പോൾ ആരെങ്കിലും കേൾക്കുന്നിടത്താണ് തുടക്കം.",
    },
    concerns: ["relationships", "anxiety", "depression"],
  },
];
