import type { Messages } from "@/i18n/dictionaries";

type NavKey = keyof Messages["nav"];
export type NavItem = { key: NavKey; path: string };

/** Header links (desktop bar and mobile menu). */
export const primaryNav: NavItem[] = [
  { key: "services", path: "/services" },
  { key: "concerns", path: "/concerns" },
  { key: "therapists", path: "/therapists" },
  { key: "business", path: "/business" },
  { key: "about", path: "/about" },
];

export const footerExplore: NavItem[] = [
  ...primaryNav,
  { key: "community", path: "/community" },
  { key: "blog", path: "/blog" },
];

export const footerHelp: NavItem[] = [
  { key: "pricing", path: "/pricing" },
  { key: "faq", path: "/faq" },
  { key: "contact", path: "/contact" },
];

export const legalNav: Array<{ key: keyof Messages["footer"]; path: string }> = [
  { key: "privacy", path: "/legal/privacy" },
  { key: "terms", path: "/legal/terms" },
  { key: "refund", path: "/legal/refunds" },
  { key: "agreement", path: "/legal/therapy-agreement" },
  { key: "minors", path: "/legal/minor-protection" },
];

export const bookPath = "/book";
