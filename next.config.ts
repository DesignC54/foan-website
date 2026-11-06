import type { NextConfig } from "next";

// Hosted on Vercel (domain connected Nov 2026). Pages are static and refresh
// from Sanity every 60s (ISR), the contact form posts to /api/contact, and
// Vercel resizes images (local and cdn.sanity.io).
const nextConfig: NextConfig = {
  // Keep the /about/ style URLs the site launched with.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Few build workers: each fetches from Sanity, and 15 in parallel ran the
  // local build machine out of memory. The site is small, so 2 is plenty fast.
  experimental: { cpus: 2 },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
