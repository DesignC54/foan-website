import type { NextConfig } from "next";

// The site is hosted on Namecheap shared hosting (Apache, no Node server).
// `output: "export"` builds the whole site into plain HTML/CSS/JS in /out,
// which GitHub Actions uploads over FTP. That rules out server-only features
// (route handlers that read the request, server actions, proxy, redirects,
// ISR), so forms post to PHP on the same hosting.
const nextConfig: NextConfig = {
  output: "export",
  // /about → /about/index.html, which Apache serves without extra rules.
  trailingSlash: true,
  images: {
    // No image server on Namecheap: Sanity's CDN resizes CMS images,
    // local images in /public are exported at the size we commit.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  // Few build workers: each fetches from Sanity, and 15 in parallel ran the
  // build machine out of memory. The site is small, so 2 is plenty fast.
  experimental: { cpus: 2 },
  // cacheComponents / partialPrefetching are off: they need a server (PPR)
  // and the build fails with them in export mode.
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
