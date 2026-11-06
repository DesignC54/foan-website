// One-time import of the current website content into Sanity.
// Run from /studio:  npx sanity exec scripts/import-current.ts --with-user-token
// Safe to re-run: documents use fixed IDs, so they are replaced, not doubled.
// Gallery and Video tours are not imported (the live site has none yet;
// the website's placeholders are for design only).

import { getCliClient } from "sanity/cli";
import fs from "node:fs";
import path from "node:path";
import { posts, blogCategories } from "../../src/lib/posts";
import { releases, roles, resources } from "../../src/lib/content";

const client = getCliClient({ apiVersion: "2026-10-01" });
const pub = path.resolve(process.cwd(), "../public"); // run from /studio
const key = () => Math.random().toString(36).slice(2, 12);
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
const isoDate = (s: string) => {
  const d = new Date(`${s} 12:00 UTC`);
  return d.toISOString().slice(0, 10);
};

const assetCache = new Map<string, string>();
async function upload(kind: "image" | "file", publicPath: string) {
  if (assetCache.has(publicPath)) return assetCache.get(publicPath)!;
  const file = path.join(pub, publicPath.split("?")[0]);
  const asset = await client.assets.upload(kind, fs.createReadStream(file), {
    filename: path.basename(file),
  });
  assetCache.set(publicPath, asset._id);
  return asset._id;
}
const imageRef = async (p: string) => ({
  _type: "image",
  asset: { _type: "reference", _ref: await upload("image", p) },
});

async function run() {
  const tx = client.transaction();

  blogCategories.forEach((title, i) =>
    tx.createOrReplace({ _id: `category-${slugify(title)}`, _type: "category", title, order: i + 1 }),
  );

  for (const p of posts) {
    console.log("post:", p.title);
    tx.createOrReplace({
      _id: `post-${p.slug.slice(0, 60)}`,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      date: isoDate(p.date),
      categories: p.categories.map((c) => ({
        _key: key(),
        _type: "reference",
        _ref: `category-${slugify(c)}`,
      })),
      excerpt: p.excerpt,
      mainImage: await imageRef(p.image),
      body: p.body.map((b) => ({
        _key: key(),
        _type: "block",
        style: b.type === "h2" ? "h2" : b.type === "quote" ? "blockquote" : "normal",
        markDefs: [],
        children: [{ _key: key(), _type: "span", text: b.text, marks: [] }],
      })),
      gallery: await Promise.all(
        p.gallery.map(async (g) => ({ _key: key(), ...(await imageRef(g.src)), caption: g.caption })),
      ),
    });
  }

  releases.forEach((r, i) =>
    tx.createOrReplace({
      _id: `release-${String(i + 1).padStart(2, "0")}`,
      _type: "pressRelease",
      title: r.title,
      url: r.href,
      source: r.source,
      date: isoDate(r.date),
    }),
  );

  roles.forEach((r) =>
    tx.createOrReplace({ _id: `role-${slugify(r.title)}`, _type: "role", title: r.title, mode: r.mode, url: r.href }),
  );

  for (const [i, r] of resources.entries()) {
    console.log("download:", r.title);
    tx.createOrReplace({
      _id: `resource-${slugify(r.title)}`,
      _type: "resource",
      title: r.title,
      order: i + 1,
      file: { _type: "file", asset: { _type: "reference", _ref: await upload("file", r.href) } },
    });
  }

  await tx.commit();
  console.log("Done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
