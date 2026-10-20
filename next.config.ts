import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  experimental: {
    // Styled 404 for URLs outside /ml and /en (app/global-not-found.tsx).
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    // Privacy and security headers for every response.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
          },
        ],
      },
    ];
  },
  async redirects() {
    // Malayalam is the default language.
    // Any path without a language prefix goes to the Malayalam version:
    // /about → /ml/about. Unknown paths then get the styled 404 with a 404 status.
    // Excludes framework files, public assets and root metadata files.
    const skip = "ml|en|_next|textures|icon\\.svg|robots\\.txt|sitemap\\.xml|favicon\\.ico|\\.well-known";
    return [
      { source: "/", destination: "/ml", permanent: false },
      { source: `/:first((?!(?:${skip})(?:/|$))[^/]+)/:rest*`, destination: "/ml/:first/:rest*", permanent: false },
    ];
  },
};

// MDX for long-form content in /content (concern guides, blog, legal).
const withMDX = createMDX({});

export default withMDX(nextConfig);
