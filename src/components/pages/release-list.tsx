"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MaskIcon } from "@/components/ui/mask-icon";
import type { Release } from "@/lib/content";

// Figma: Press Releases › Releases (2167:721): Card / Release rows + pager.
// 5 per page, as on the live site ("Showing 1 to 5 of 11 results").

const PER_PAGE = 5;

export function ReleaseList({ releases }: { releases: Release[] }) {
  const [page, setPage] = useState(0);
  const top = useRef<HTMLDivElement>(null);
  const pages = Math.ceil(releases.length / PER_PAGE);
  const start = page * PER_PAGE;
  const shown = releases.slice(start, start + PER_PAGE);

  const go = (p: number) => {
    setPage(p);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const iconBtn =
    "grid size-10 cursor-pointer place-items-center rounded-full transition-colors disabled:cursor-default disabled:opacity-30";

  return (
    <div ref={top} className="flex scroll-mt-28 flex-col gap-10 lg:gap-12">
      <ol key={page} className="flex flex-col gap-4">
        {shown.map((r, i) => (
          <li
            key={r.href}
            className="border-subtle bg-surface hover:border-default flex animate-[intro-up_0.6s_cubic-bezier(0.22,1,0.36,1)_backwards] flex-col gap-5 rounded-sm border p-6 transition-colors md:flex-row md:items-center md:gap-8 md:px-8 md:py-8 lg:gap-12 lg:px-10 lg:py-9"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="bg-surface-raised type-label-button text-accent-text grid size-14 shrink-0 place-items-center rounded-full lg:size-16">
              {String(start + i + 1).padStart(2, "0")}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <p className="type-label-overline flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span className="text-accent-text">Press Release</span>
                <span className="text-tertiary">·</span>
                <span className="text-secondary">{r.date}</span>
                <span className="text-tertiary">·</span>
                <span className="text-secondary">{r.source}</span>
              </p>
              <p className="type-h3 text-primary">{r.title}</p>
            </div>
            <Button
              label="Open release"
              href={r.href}
              variant="lime"
              className="self-start md:self-auto"
            />
          </li>
        ))}
      </ol>

      <div className="border-subtle bg-surface flex flex-col items-start gap-4 rounded-sm border px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="type-body-s text-secondary">
          Showing {start + 1} to {start + shown.length} of {releases.length}{" "}
          results
        </p>
        <nav aria-label="Pages" className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(page - 1)}
            disabled={page === 0}
            aria-label="Previous page"
            className={`${iconBtn} bg-surface-raised text-primary hover:bg-accent hover:text-on-accent`}
          >
            <MaskIcon
              src="/images/site/icon-arrow-right.svg"
              className="size-5 rotate-180"
            />
          </button>
          {Array.from({ length: pages }, (_, p) => (
            <button
              key={p}
              type="button"
              onClick={() => go(p)}
              aria-current={p === page ? "page" : undefined}
              className={`${iconBtn} type-label-button ${p === page ? "bg-accent text-on-accent" : "bg-surface-raised text-primary hover:bg-default"}`}
            >
              {p + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go(page + 1)}
            disabled={page === pages - 1}
            aria-label="Next page"
            className={`${iconBtn} bg-surface-raised text-primary hover:bg-accent hover:text-on-accent`}
          >
            <MaskIcon
              src="/images/site/icon-arrow-right.svg"
              className="size-5"
            />
          </button>
        </nav>
      </div>
    </div>
  );
}
