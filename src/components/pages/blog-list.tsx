"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { blogCategories, type Post } from "@/lib/content";

// Figma: CSR — Desktop (2168:744): category pills, post card, archive sidebar
// and the yellow "Need updates fast?" callout. Filters work client-side.

const ALL = "All posts";

export function BlogList({
  posts,
  initial,
}: {
  posts: Post[];
  initial: string;
}) {
  const [cat, setCat] = useState(initial);
  const count = (c: string) =>
    c === ALL
      ? posts.length
      : posts.filter((p) => p.categories.includes(c)).length;
  const shown =
    cat === ALL ? posts : posts.filter((p) => p.categories.includes(cat));
  const cats = [ALL, ...blogCategories];

  return (
    <>
      {/* Heading + intro follow the active category */}
      <div
        className="intro-up flex flex-col items-center gap-6 text-center lg:gap-10"
        style={{ "--d": "200ms" } as React.CSSProperties}
      >
        <h1 className="type-h1 text-primary">
          Blog{" "}
          <span className="text-accent-text">{cat === ALL ? "" : cat}</span>
        </h1>
        <p className="type-body-xl text-secondary lg:w-[780px]">
          {cat === ALL
            ? "Company news, commentary, and updates from across the Group."
            : `Showing posts from the ${cat} category.`}
        </p>
      </div>

      <div className="no-scrollbar -mx-gutter px-gutter mt-10 flex gap-3 overflow-x-auto md:mx-0 md:flex-wrap md:justify-center md:px-0 lg:mt-12">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            aria-pressed={c === cat}
            className={`type-label-button shrink-0 cursor-pointer rounded-full px-3 py-1.5 whitespace-nowrap transition-colors ${
              c === cat
                ? "bg-accent text-on-accent"
                : "bg-surface text-primary hover:bg-surface-raised"
            }`}
          >
            {c === ALL ? c : `${c} (${count(c)})`}
          </button>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-8 lg:mt-20 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          {shown.length === 0 && (
            <div className="border-subtle bg-surface type-body-l text-secondary rounded-sm border p-10 text-center">
              No posts in this category yet.
            </div>
          )}
          {shown.map((p) => (
            <article
              key={p.slug}
              className="group border-subtle bg-surface overflow-clip rounded-sm border"
            >
              <div
                data-theme="dark"
                className="bg-surface-raised relative h-[240px] overflow-clip md:h-[360px] lg:h-[420px]"
              >
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 890px, 100vw"
                  className="object-cover object-[50%_35%] transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <Tag
                  label={p.categories.join(", ")}
                  className="absolute top-5 left-5"
                />
              </div>
              <div className="flex flex-col gap-4 p-6 lg:p-9">
                <p className="type-label-overline flex flex-wrap gap-2.5">
                  <span className="text-secondary">{p.date}</span>
                  <span className="text-tertiary">·</span>
                  <span className="text-accent-text">
                    {p.categories.join(", ")}
                  </span>
                </p>
                <h2 className="type-h3 text-primary">{p.title}</h2>
                <p className="type-body-m text-secondary">{p.excerpt}</p>
                <Button
                  label="Read article"
                  href={`/blog/${p.slug}/`}
                  variant="lime"
                  className="self-start"
                />
              </div>
            </article>
          ))}
        </div>

        <aside className="flex shrink-0 flex-col gap-4 md:grid md:grid-cols-2 lg:flex lg:w-[400px]">
          <div className="border-subtle bg-surface flex flex-col gap-4 rounded-sm border p-7">
            <Tag label="Categories" />
            <p className="type-h4 text-primary">Browse the archive</p>
            <p className="type-body-s text-secondary">
              Filter the blog by topic to find company news, commentary, and
              updates faster.
            </p>
            <ul className="flex flex-col gap-2">
              {cats.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => setCat(c)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xs px-4 py-3 text-left transition-colors ${
                      c === cat
                        ? "bg-accent text-on-accent"
                        : "bg-surface-raised text-primary hover:bg-default"
                    }`}
                  >
                    <span className="type-label-button min-w-0 flex-1">
                      {c}
                    </span>
                    <span
                      className={`type-label-small ${c === cat ? "" : "text-tertiary"}`}
                    >
                      ({count(c)})
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div
            data-theme="dark"
            className="bg-highlight relative flex flex-col gap-4 self-start overflow-clip rounded-sm p-7"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative stripes */}
            <img
              src="/images/pages/csr-callout-stripes.svg"
              alt=""
              className="pointer-events-none absolute top-1/2 left-[calc(50%-19px)] h-[472px] w-[406px] max-w-none -translate-x-1/2 -translate-y-1/2"
            />
            <p className="type-h4 relative text-black">Need updates fast?</p>
            <p className="type-body-s relative text-black">
              Press releases publish formal announcements. Use the blog for
              editorial context and broader stories.
            </p>
            <div className="relative flex flex-wrap gap-2">
              <Button
                label="Press releases"
                href="/press-releases/"
                variant="dark"
              />
              <Button label="Contact us" href="/contact/" variant="white" />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
