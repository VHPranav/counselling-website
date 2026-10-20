"use client";

import { Analytics } from "@vercel/analytics/next";

/**
 * Cookieless page-view analytics (Vercel Web Analytics), only when
 * NEXT_PUBLIC_ANALYTICS=vercel. Query strings are stripped, so nothing like
 * ?ref= or ?service= is ever recorded, and no custom events are sent.
 */
export function SiteAnalytics() {
  if (process.env.NEXT_PUBLIC_ANALYTICS !== "vercel") return null;
  return (
    <Analytics
      beforeSend={(event) => {
        const url = new URL(event.url);
        // The confirmation page carries a booking reference; never record it.
        if (url.pathname.includes("/book/confirmed")) return null;
        return { ...event, url: `${url.origin}${url.pathname}` };
      }}
    />
  );
}
