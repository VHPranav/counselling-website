import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontVariables } from "../fonts";
import { siteConfig } from "@/config/site";
import { localeTags, locales } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionBoot } from "@/components/motion/MotionBoot";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { abroadPlaces, keralaPlaces } from "@/data/places";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getMessages();
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: { default: `${t.meta.title} · ${siteConfig.brandName}`, template: `%s · ${siteConfig.brandName}` },
    description: t.meta.description,
    openGraph: {
      type: "website",
      siteName: siteConfig.brandName,
      locale: localeTags[locale].replace("-", "_"),
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeTags[l].replace("-", "_")),
    },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#f6f0e6",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const t = await getMessages();
  // Organization + WebSite structured data, once per page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.siteUrl}/#organization`,
        name: siteConfig.brandName,
        url: siteConfig.siteUrl,
        logo: `${siteConfig.siteUrl}/icon.svg`,
        description: t.meta.description,
        knowsLanguage: ["ml", "en"],
        areaServed: [
          { "@type": "State", name: "Kerala" },
          ...keralaPlaces.map((p) => ({ "@type": "City", name: p.en })),
          ...abroadPlaces.map((p) => ({ "@type": "Country", name: p.en })),
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        url: `${siteConfig.siteUrl}/${locale}`,
        name: siteConfig.brandName,
        inLanguage: locale,
        publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
      },
    ],
  };

  return (
    <html lang={locale} className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <SkipLink label={t.header.skip} />
        <Header locale={locale} t={t} />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer locale={locale} t={t} />
        <MotionBoot />
        <SiteAnalytics />
      </body>
    </html>
  );
}
