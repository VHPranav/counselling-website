import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { localeTags, locales } from "@/i18n/config";
import { getLocale } from "@/i18n/dictionaries";

/**
 * Per-page metadata with canonical URL and hreflang alternates for both
 * languages. `path` is the path without the locale, e.g. "/services".
 */
export async function pageMetadata({
  path,
  title,
  description,
  noIndex = false,
}: {
  path: string;
  title?: string;
  description?: string;
  noIndex?: boolean;
}): Promise<Metadata> {
  const locale = await getLocale();
  const suffix = path === "/" ? "" : path;
  const languages = Object.fromEntries(locales.map((l) => [localeTags[l], `/${l}${suffix}`]));
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: { ...languages, "x-default": `/ml${suffix}` },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.brandName,
      url: `/${locale}${suffix}`,
      locale: localeTags[locale].replace("-", "_"),
      ...(title ? { title: `${title} · ${siteConfig.brandName}` } : {}),
      ...(description ? { description } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
