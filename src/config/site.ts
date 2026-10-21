/**
 * Brand and contact details. Change the brand name, domain and contact
 * details here and they update across the whole site.
 *
 * Anything in [square brackets] is a placeholder and is highlighted on the
 * page until it is replaced.
 */
export const siteConfig = {
  /**
   * DEMO MODE: shows fictional sample therapists (with AI-generated photos),
   * prices, testimonials and filled-in placeholder text for client
   * presentations. While it's on, every page is marked noindex.
   * Set to false before launch (see TODO.md).
   */
  demoMode: true,
  brandName: "Thanal",
  /** Short form for tight spaces (mobile header, favicon title). */
  brandShort: "Thanal",
  domain: "[DOMAIN]",
  /** Used for canonical URLs, sitemap and OpenGraph. No trailing slash. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    email: "[hello@DOMAIN]",
    /** International format without + or spaces, e.g. 919876543210 */
    whatsapp: "[WHATSAPP NUMBER]",
    phoneDisplay: "[PHONE NUMBER]",
    hours: { en: "[Mon–Sat, 9am–9pm IST]", ml: "[തിങ്കൾ–ശനി, രാവിലെ 9–രാത്രി 9 IST]" },
  },
  social: {
    instagram: "",
    linkedin: "",
    youtube: "",
  },
  copyrightYear: 2026,
} as const;

export type SiteConfig = typeof siteConfig;
