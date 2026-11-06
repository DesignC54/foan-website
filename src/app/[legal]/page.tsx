import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tag } from "@/components/ui/tag";
import { getLegalPages } from "@/lib/cms";

// Privacy Policy, Terms of Service, Cookie Policy. No Figma frame: a plain
// reading page in the inner-page hero style, 760px measure. Text is edited in
// Sanity (Legal pages).

type Params = { params: Promise<{ legal: string }> };

export const revalidate = 60;
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getLegalPages()).map((p) => ({ legal: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { legal } = await params;
  const page = (await getLegalPages()).find((p) => p.slug === legal);
  return page ? { title: page.title, description: page.summary } : {};
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function LegalPage({ params }: Params) {
  const { legal } = await params;
  const page = (await getLegalPages()).find((p) => p.slug === legal);
  if (!page) notFound();

  const updated = new Date(`${page.updated}T12:00:00Z`).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <div className="px-gutter nav:pt-[168px] mx-auto flex max-w-[calc(760px+2*var(--layout-gutter))] flex-col gap-10 pt-[96px] pb-16 md:pt-[120px] lg:pb-24">
      <header className="flex flex-col gap-5">
        <div className="intro-up" style={d(100)}>
          <Tag label="Legal" />
        </div>
        <h1 className="intro-up type-h1 text-primary" style={d(180)}>
          {page.title}
        </h1>
        <p
          className="intro-up type-label-overline text-tertiary"
          style={d(260)}
        >
          Last updated {updated}
        </p>
      </header>
      <div
        className="intro-up border-subtle flex flex-col gap-5 border-t pt-10"
        style={d(340)}
      >
        {page.body.map((b, i) =>
          b.type === "h2" ? (
            <h2 key={i} className="type-h4 text-primary mt-5">
              {b.text}
            </h2>
          ) : b.type === "ul" ? (
            <ul
              key={i}
              className="type-body-m text-secondary flex list-disc flex-col gap-2 pl-5 marker:text-accent-text"
            >
              {b.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          ) : (
            <p key={i} className="type-body-m text-secondary">
              {b.text}
            </p>
          ),
        )}
      </div>
    </div>
  );
}
