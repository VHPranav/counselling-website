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
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Malayalam is the default language.
    return [{ source: "/", destination: "/ml", permanent: false }];
  },
};

// MDX for long-form content in /content (concern guides, blog, legal).
const withMDX = createMDX({});

export default withMDX(nextConfig);
