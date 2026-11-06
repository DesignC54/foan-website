import type { MetadataRoute } from "next";
import { getLegalPages, getPosts } from "@/lib/cms";

// /sitemap.xml for Google. Blog posts come from Sanity, so new ones are
// listed within a minute of publishing.
export const revalidate = 60;

const BASE = "https://www.foangroup.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    "",
    "about/",
    "leadership/",
    "careers/",
    "blog/",
    "press-releases/",
    "resources/",
    "gallery/",
    "video-tours/",
    "contact/",
  ].map((p) => ({ url: `${BASE}/${p}`, priority: p === "" ? 1 : 0.8 }));

  const [posts, legal] = await Promise.all([getPosts(), getLegalPages()]);

  return [
    ...pages,
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}/`,
      lastModified: new Date(p.date),
      priority: 0.6,
    })),
    ...legal.map((l) => ({
      url: `${BASE}/${l.slug}/`,
      lastModified: new Date(l.updated),
      priority: 0.2,
    })),
  ];
}
