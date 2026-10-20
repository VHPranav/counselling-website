import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import "../globals.css";
import { fontVariables } from "../fonts";
import { siteConfig } from "@/config/site";
import { localeTags, locales } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

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
    alternates: {
      canonical: `/${locale}`,
      languages: { "ml-IN": "/ml", "en-IN": "/en", "x-default": "/ml" },
    },
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
  return (
    <html lang={locale} className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <SkipLink label={t.header.skip} />
        <Header locale={locale} t={t} />
        <ViewTransition>
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
        </ViewTransition>
        <Footer locale={locale} t={t} />
      </body>
    </html>
  );
}
