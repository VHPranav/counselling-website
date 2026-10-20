import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { concerns } from "@/data/concerns";
import { therapists } from "@/data/therapists";
import { localeTags, locales } from "@/i18n/config";
import { postSlugs } from "@/lib/content";

/**
 * Every public page in both languages, each listing its other-language twin.
 * Left out on purpose: legal drafts (noindex until reviewed), the booking
 * confirmation page and the styleguide.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const paths = [
    "",
    "/services",
    "/concerns",
    ...concerns.map((c) => `/concerns/${c.slug}`),
    "/therapists",
    ...therapists.map((t) => `/therapists/${t.slug}`),
    "/book",
    "/business",
    "/community",
    "/blog",
    ...postSlugs.map((s) => `/blog/${s}`),
    "/about",
    "/faq",
    "/pricing",
    "/contact",
  ];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      changeFrequency: path.startsWith("/blog/") ? ("monthly" as const) : ("weekly" as const),
      priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeTags[l], `${base}/${l}${path}`])),
      },
    })),
  );
}
