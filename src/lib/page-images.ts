import type { StaticImageData } from "next/image";
import about from "@/assets/pages/about.jpg";
import blog from "@/assets/pages/blog.jpg";
import business from "@/assets/pages/business.jpg";
import community from "@/assets/pages/community.jpg";
import concerns from "@/assets/pages/concerns.jpg";
import contact from "@/assets/pages/contact.jpg";
import faq from "@/assets/pages/faq.jpg";
import pricing from "@/assets/pages/pricing.jpg";
import services from "@/assets/pages/services.jpg";
import therapists from "@/assets/pages/therapists.jpg";

/**
 * Header photos for inner pages (AI-generated in Google Flow, no faces).
 * To replace one, drop a portrait JPG (3:4, about 1200px wide) into
 * src/assets/pages/ with the same file name.
 */
export const pageImages = {
  about,
  blog,
  business,
  community,
  concerns,
  contact,
  faq,
  pricing,
  services,
  therapists,
} satisfies Record<string, StaticImageData>;

export type PageImageKey = keyof typeof pageImages;
