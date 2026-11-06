// Content source for every page. Reads from Sanity at build time (the site is
// a static export, so publishing in the Studio triggers a rebuild).
// Until NEXT_PUBLIC_SANITY_PROJECT_ID is set, the local files are used, so
// the site always builds.

import { createClient } from "@sanity/client";
import * as local from "./content";
import * as localMedia from "./media";
import type { Block, Post } from "./posts";
import type { GalleryItem, VideoTour } from "./media";
import { legalPages, type LegalBlock, type LegalPage } from "./legal";

// Project IDs are public. Set NEXT_PUBLIC_SANITY_PROJECT_ID="" to build from
// the local files instead.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "8km87koc";

export const cmsEnabled = Boolean(projectId);

const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2026-10-01",
      useCdn: false, // build time: always the latest published content
      perspective: "published",
    })
  : null;

const fmtDay = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
const fmtMonth = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

/* ---------------- Blog ---------------- */

type PtBlock = {
  _type: string;
  style?: string;
  children?: { text?: string }[];
};

const toBlocks = (body: PtBlock[] = []): Block[] =>
  body
    .filter((b) => b._type === "block")
    .map((b) => {
      const text = (b.children ?? []).map((c) => c.text ?? "").join("");
      if (b.style === "h2") return { type: "h2" as const, text };
      if (b.style === "blockquote") return { type: "quote" as const, text };
      return { type: "p" as const, text };
    })
    .filter((b) => b.text.trim());

export async function getPosts(): Promise<Post[]> {
  if (!client) return local.posts;
  const rows = await client.fetch<
    {
      slug: string;
      title: string;
      date: string;
      categories: string[] | null;
      excerpt: string | null;
      image: string;
      body: PtBlock[];
      gallery: { src: string; caption: string | null }[] | null;
    }[]
  >(`*[_type == "post" && defined(slug.current)] | order(date desc) {
      "slug": slug.current, title, date,
      "categories": categories[]->title,
      excerpt,
      "image": mainImage.asset->url,
      body,
      "gallery": gallery[]{ "src": asset->url, caption }
    }`);
  return rows.map((r) => {
    const body = toBlocks(r.body);
    const plain = body.map((b) => b.text).join(" ");
    return {
      slug: r.slug,
      title: r.title,
      date: fmtDay(r.date),
      categories: r.categories ?? [],
      excerpt:
        r.excerpt ?? (plain.length > 220 ? `${plain.slice(0, 217)}...` : plain),
      image: r.image,
      body,
      gallery: (r.gallery ?? []).map((g) => ({
        src: g.src,
        caption: g.caption ?? r.title,
      })),
    };
  });
}

export async function getBlogCategories(): Promise<string[]> {
  if (!client) return local.blogCategories;
  return client.fetch<string[]>(
    `*[_type == "category"] | order(order asc, title asc).title`,
  );
}

/* ---------------- Gallery + video ---------------- */

export async function getGallery(): Promise<GalleryItem[]> {
  if (!client) return localMedia.galleryItems;
  const rows = await client.fetch<
    {
      title: string;
      category: GalleryItem["category"];
      date: string;
      image: string;
    }[]
  >(`*[_type == "galleryItem"] | order(date desc) {
      title, category, date, "image": image.asset->url }`);
  return rows.map((r) => ({ ...r, date: fmtMonth(r.date) }));
}

const youtubeId = (url = "") =>
  url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/)?.[1];

export async function getVideoTours(): Promise<VideoTour[]> {
  if (!client) return localMedia.videoTours;
  const rows = await client.fetch<
    {
      title: string;
      category: string;
      location: string | null;
      duration: string | null;
      poster: string;
      youtubeUrl: string;
    }[]
  >(`*[_type == "videoTour"] | order(order asc, _createdAt desc) {
      title, category, location, duration, youtubeUrl,
      "poster": poster.asset->url }`);
  return rows.map((r) => ({
    title: r.title,
    category: r.category,
    location: r.location ?? "",
    duration: r.duration ?? "",
    poster: r.poster,
    youtubeId: youtubeId(r.youtubeUrl),
  }));
}

/* ---------------- Press, careers, downloads ---------------- */

export async function getReleases(): Promise<local.Release[]> {
  if (!client) return local.releases;
  const rows = await client.fetch<
    { title: string; date: string; source: string; href: string }[]
  >(`*[_type == "pressRelease"] | order(date desc, _id asc) {
      title, date, source, "href": url }`);
  return rows.map((r) => ({ ...r, date: fmtDay(r.date) }));
}

export async function getRoles(): Promise<local.Role[]> {
  if (!client) return local.roles;
  return client.fetch(
    `*[_type == "role"] | order(_createdAt asc) { title, "mode": coalesce(mode, "On-site"), "href": url }`,
  );
}

export async function getResources(): Promise<local.Resource[]> {
  if (!client) return local.resources;
  return client.fetch(
    `*[_type == "resource"] | order(order asc) { title, "href": file.asset->url + "?dl=" }`,
  );
}

/* ---------------- Legal pages ---------------- */

type LegalRow = {
  slug: LegalPage["slug"];
  title: string;
  summary: string | null;
  updated: string;
  body: (PtBlock & { listItem?: string })[];
};

const toLegalBlocks = (body: LegalRow["body"] = []): LegalBlock[] => {
  const out: LegalBlock[] = [];
  for (const b of body) {
    if (b._type !== "block") continue;
    const text = (b.children ?? []).map((c) => c.text ?? "").join("");
    if (!text.trim()) continue;
    if (b.listItem) {
      const last = out[out.length - 1];
      if (last?.type === "ul") last.items.push(text);
      else out.push({ type: "ul", items: [text] });
    } else out.push({ type: b.style === "h2" ? "h2" : "p", text });
  }
  return out;
};

export async function getLegalPages(): Promise<LegalPage[]> {
  if (!client) return legalPages;
  const rows = await client.fetch<LegalRow[]>(
    `*[_type == "legalPage" && defined(slug)] { slug, title, summary, updated, body }`,
  );
  // A page not yet created in Sanity keeps its starting text.
  return legalPages.map((fallback) => {
    const r = rows.find((x) => x.slug === fallback.slug);
    return r
      ? {
          slug: r.slug,
          title: r.title,
          summary: r.summary ?? fallback.summary,
          updated: r.updated,
          body: toLegalBlocks(r.body),
        }
      : fallback;
  });
}
