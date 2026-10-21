import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontVariables } from "./fonts";
import { siteConfig } from "@/config/site";
import { BananaLeaf, BrandMark, Ripple } from "@/components/shapes/Shapes";

/**
 * 404 for URLs outside /ml and /en. Bypasses the normal layout, so it is a
 * self-contained bilingual page. (Missing pages inside a language use
 * app/[locale]/not-found.tsx instead.)
 */
export const metadata: Metadata = {
  title: `404 · ${siteConfig.brandName}`,
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="grain flex min-h-dvh items-center justify-center overflow-hidden px-4 text-center">
        <Ripple className="pointer-events-none absolute left-1/2 top-10 w-[36rem] -translate-x-1/2 text-clay/25" />
        <BananaLeaf className="pointer-events-none absolute -bottom-10 right-[10%] w-28 rotate-[-20deg] text-moss/25" />
        <main className="relative max-w-xl py-16">
          <BrandMark className="mx-auto size-12" />
          <p className="mt-6 font-display text-display text-clay">404</p>
          <h1 className="mt-4 text-h2">Page not found</h1>
          <p className="mt-2 text-lead text-cocoa-soft">
            We couldn&apos;t find that page.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/en"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-clay-deep px-6 font-medium text-cream hover:bg-clay-deeper"
            >
              Go to Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
