// Image loader for the static export (see next.config.ts).
// next/image asks for one URL per width; we answer without an image server.

type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderArgs) {
  // Sanity CMS images: let Sanity's CDN resize and convert (WebP/AVIF).
  if (src.startsWith("https://cdn.sanity.io/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "max");
    return url.toString();
  }
  // Local images in /public are served as committed (compress them first).
  // The width param keeps next/image happy; Apache ignores it.
  return `${src}?w=${width}`;
}
