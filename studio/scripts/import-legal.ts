// One-time import of the starting legal text. Run from /studio:
//   npx sanity exec scripts/import-legal.ts --with-user-token
// Uses createIfNotExists, so it never overwrites edits made in the Studio.
import { getCliClient } from "sanity/cli";
import { legalPages } from "../../src/lib/legal";

const client = getCliClient({ apiVersion: "2026-10-01" });
const key = () => Math.random().toString(36).slice(2, 12);

const tx = client.transaction();
for (const p of legalPages) {
  const body = p.body.flatMap((b) =>
    b.type === "ul"
      ? b.items.map((text) => ({
          _key: key(), _type: "block", style: "normal", listItem: "bullet", level: 1, markDefs: [],
          children: [{ _key: key(), _type: "span", text, marks: [] }],
        }))
      : [{
          _key: key(), _type: "block", style: b.type === "h2" ? "h2" : "normal", markDefs: [],
          children: [{ _key: key(), _type: "span", text: b.text, marks: [] }],
        }],
  );
  tx.createIfNotExists({
    _id: `legal-${p.slug}`, _type: "legalPage", slug: p.slug, title: p.title,
    summary: p.summary, updated: p.updated, body,
  });
}
tx.commit().then(() => console.log("Done.")).catch((e) => { console.error(e); process.exit(1); });
