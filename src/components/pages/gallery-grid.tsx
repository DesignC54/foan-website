"use client";

import Image from "next/image";
import { useState } from "react";
import { Tag } from "@/components/ui/tag";
import { MaskIcon } from "@/components/ui/mask-icon";
import { galleryFilters, type GalleryItem } from "@/lib/media";
import { Lightbox } from "./lightbox";

// Figma: Gallery — Desktop (2379:5574) › Gallery (2379:5582).
// Filter pills, a bento grid that repeats every three rows
// (large + stack · three across · stack + large), and Load more.
// Empty state: Gallery (2169:1509).

const PAGE = 9;

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<string>("All");
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);

  if (items.length === 0) return <GalleryEmpty />;

  const filtered =
    filter === "All" ? items : items.filter((i) => i.category === filter);
  const shown = filtered.slice(0, limit);
  const rows: GalleryItem[][] = [];
  for (let i = 0; i < shown.length; i += 3) rows.push(shown.slice(i, i + 3));

  const tile = (it: GalleryItem, cls: string) => {
    const idx = shown.indexOf(it);
    return (
      <button
        key={it.title}
        type="button"
        onClick={() => setOpen(idx)}
        className={`group bg-surface-raised relative min-h-[240px] cursor-zoom-in overflow-clip rounded-[20px] text-left outline-2 -outline-offset-2 outline-transparent transition-[outline-color] hover:outline-lime-500 ${cls}`}
      >
        <Image
          src={it.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 880px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-linear-to-b from-transparent from-35% to-black/85" />
        <span className="absolute top-4 right-4 grid size-9 scale-75 place-items-center rounded-full bg-lime-500 text-black opacity-0 transition-[opacity,scale] duration-300 group-hover:scale-100 group-hover:opacity-100">
          <MaskIcon
            src="/images/site/icon-arrow-right.svg"
            className="size-4 -rotate-45"
          />
        </span>
        <span
          data-theme="dark"
          className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 lg:p-6"
        >
          <Tag label={it.category} />
          <span className="type-h4 text-white">{it.title}</span>
          <span className="type-label-small text-white/70">{it.date}</span>
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      <div className="no-scrollbar -mx-gutter px-gutter flex gap-2 overflow-x-auto md:mx-0 md:flex-wrap md:px-0">
        {galleryFilters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={f === filter}
            onClick={() => {
              setFilter(f);
              setLimit(PAGE);
            }}
            className={`type-label-button shrink-0 cursor-pointer rounded-full px-4 py-2 whitespace-nowrap transition-colors ${
              f === filter
                ? "bg-accent text-on-accent"
                : "bg-surface text-primary hover:bg-surface-raised"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div key={filter} className="flex flex-col gap-4 lg:gap-5">
        {rows.map((row, r) => {
          const kind = r % 3;
          if (kind === 1 || row.length < 3) {
            return (
              <div
                key={r}
                data-reveal
                className="grid gap-4 md:grid-cols-3 lg:gap-5"
              >
                {row.map((it) => tile(it, "md:h-[280px] lg:h-[340px]"))}
              </div>
            );
          }
          const [big, a, b] = row;
          const stack = (
            <div className="flex flex-col gap-4 md:w-[38%] lg:w-[440px] lg:gap-5">
              {tile(a, "md:flex-1 lg:h-[250px] lg:flex-none")}
              {tile(b, "md:flex-1 lg:h-[250px] lg:flex-none")}
            </div>
          );
          return (
            <div
              key={r}
              data-reveal
              className={`flex flex-col gap-4 md:flex-row lg:gap-5 ${kind === 2 ? "md:flex-row-reverse" : ""}`}
            >
              {tile(big, "md:h-[440px] md:flex-1 lg:h-[520px]")}
              {stack}
            </div>
          );
        })}
        {shown.length === 0 && (
          <p className="border-subtle bg-surface type-body-l text-secondary rounded-[20px] border p-10 text-center">
            No items in {filter} yet.
          </p>
        )}
      </div>

      {filtered.length > limit && (
        <button
          type="button"
          onClick={() => setLimit((l) => l + 6)}
          className="group type-label-button inline-flex cursor-pointer items-center gap-4 self-center rounded-full border-[1.5px] border-neutral-900 bg-white py-2 pr-2 pl-6 text-neutral-900"
        >
          Load more
          {/* eslint-disable-next-line @next/next/no-img-element -- arrow badge */}
          <img
            src="/images/site/btn-arrow-dark.svg"
            alt=""
            width={32}
            height={32}
            className="size-8 rotate-90 transition-transform group-hover:translate-y-0.5"
          />
        </button>
      )}

      <Lightbox
        items={shown.map((s) => ({ src: s.image, caption: s.title }))}
        index={open}
        onChange={setOpen}
      />
    </div>
  );
}

function GalleryEmpty() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="grid grid-cols-2 gap-4 opacity-60 md:grid-cols-3 lg:gap-5"
      >
        {[200, 200, 200, 280, 280, 280].map((h, i) => (
          <div
            key={i}
            className="bg-surface-raised rounded-[16px]"
            style={{ height: h }}
          />
        ))}
      </div>
      <div className="absolute inset-0 grid place-items-center p-5">
        <div
          data-theme="dark"
          data-reveal="zoom-in"
          className="bg-surface flex max-w-[440px] flex-col items-center gap-4 rounded-[20px] px-8 py-10 text-center shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
        >
          <span className="grid size-14 place-items-center rounded-full bg-lime-500 text-black">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="1.6" />
              <path d="m21 16-5-5-9 9" />
            </svg>
          </span>
          <p className="type-h3 text-white">No gallery items found</p>
          <p className="type-body-s text-white/70">
            Gallery items will appear here once they are published.
          </p>
        </div>
      </div>
    </div>
  );
}
