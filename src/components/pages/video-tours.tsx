"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Lime } from "@/components/site/page-hero";
import type { VideoTour } from "@/lib/media";

// Figma: Video Tours — Desktop (2380:5739): Hero with the main stage
// (2380:5742) and The lineup (2380:5757). Picking a video in the lineup
// updates the stage. Empty state: Lineup (2169:1718).

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Duration({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  return (
    <span className={`flex items-center ${className}`}>
      <span className="bg-afrixx-orange h-7 w-1 shrink-0" aria-hidden />
      <span className="type-label-tag bg-black/55 px-1.5 py-1 text-white backdrop-blur-[4px]">
        {value}
      </span>
    </span>
  );
}

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
    </svg>
  );
}

export function VideoTours({ videos }: { videos: VideoTour[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const v = videos[active];
  const count = `${videos.length} video${videos.length === 1 ? "" : "s"}`;

  const pick = (i: number) => {
    setActive(i);
    setPlaying(false);
    document
      .getElementById("stage")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {/* Hero + main stage */}
      <section className="relative overflow-clip">
        {/* eslint-disable-next-line @next/next/no-img-element -- glow */}
        <img
          src="/images/about/hero-glow.svg"
          alt=""
          className="intro-fade light:opacity-40 pointer-events-none absolute top-[-260px] left-[-200px] h-[700px] w-[1200px] max-w-none [mask-image:linear-gradient(to_bottom,#000_50%,transparent_92%)]"
        />
        <div className="max-w-frame px-gutter nav:pt-[168px] relative mx-auto flex flex-col gap-10 pt-[96px] pb-12 md:pt-[120px] lg:flex-row lg:items-center lg:gap-16 lg:pb-20">
          <div className="flex flex-col gap-6 lg:flex-1 lg:gap-8">
            <div className="intro-up" style={d(100)}>
              <Tag label="FOAN Screening Room" />
            </div>
            <h1 className="intro-zoom type-h1 text-primary" style={d(200)}>
              Video tours that feel more like a <Lime>guided premiere</Lime>{" "}
              than a static archive.
            </h1>
            <p className="intro-up type-body-l text-secondary" style={d(420)}>
              Step through FOAN Group moments, spaces, and stories in a curated
              reel. Pick a video from the lineup and the main stage updates
              instantly.
            </p>
            <div
              className="intro-up flex flex-wrap items-center gap-3"
              style={d(540)}
            >
              <Button
                label="Enter the Screening Room"
                href="#lineup"
                variant="lime"
              />
              <span className="bg-surface type-label-button text-primary rounded-full px-4 py-2">
                {count} in the reel
              </span>
            </div>
          </div>

          <div
            id="stage"
            data-theme="dark"
            className="intro-up bg-surface-raised relative aspect-[16/10] w-full scroll-mt-28 overflow-clip rounded-[20px] lg:w-[620px] lg:shrink-0"
            style={d(400)}
          >
            {!v ? (
              <div className="absolute inset-0 grid place-items-center p-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <span className="grid size-16 place-items-center rounded-full bg-white/10 text-white/50">
                    <PlayIcon className="size-7" />
                  </span>
                  <p className="type-h4 text-white">
                    No video tours are live yet.
                  </p>
                </div>
              </div>
            ) : playing && v.youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
                title={v.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            ) : (
              <>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={v.poster + active}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={v.poster}
                      alt=""
                      fill
                      priority
                      sizes="(min-width: 1024px) 620px, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <span className="absolute inset-0 bg-linear-to-b from-black/20 from-30% to-black/85" />
                <div className="absolute inset-x-5 top-5 flex items-start justify-between">
                  <Tag label="Now playing" />
                  <Duration value={v.duration} />
                </div>
                <button
                  type="button"
                  onClick={() => v.youtubeId && setPlaying(true)}
                  aria-label={
                    v.youtubeId ? `Play ${v.title}` : "Video coming soon"
                  }
                  title={v.youtubeId ? undefined : "Video coming soon"}
                  className="absolute top-1/2 left-1/2 grid size-16 -translate-1/2 cursor-pointer place-items-center rounded-full bg-lime-500 text-black shadow-[0_0_0_10px_rgba(220,255,0,0.18)] transition-transform hover:scale-105 lg:size-20"
                >
                  <PlayIcon className="size-7 translate-x-0.5 lg:size-8" />
                </button>
                <div className="absolute inset-x-5 bottom-5 flex flex-col gap-2">
                  <span className="type-label-overline text-lime-500">
                    {v.category}
                  </span>
                  <span className="type-h4 text-white">{v.title}</span>
                  <span className="mt-1 h-1 overflow-clip rounded-full bg-white/20">
                    <span className="block h-full w-[35%] rounded-full bg-lime-500" />
                  </span>
                  <span className="type-label-small flex justify-between text-white/70">
                    <span>{v.location}</span>
                    <span>{v.duration}</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* The lineup */}
      <section
        id="lineup"
        className="max-w-frame px-gutter mx-auto flex scroll-mt-24 flex-col gap-8 pb-16 lg:gap-10 lg:pb-20"
      >
        <div data-reveal className="flex items-end justify-between gap-4">
          <h2 className="type-h2 text-primary">
            The <Lime>lineup</Lime>
          </h2>
          <span className="type-label-button text-secondary">{count}</span>
        </div>

        {videos.length === 0 ? (
          <div
            data-reveal
            data-theme="dark"
            className="bg-surface flex flex-col items-center gap-3 rounded-[20px] px-6 py-16 text-center lg:py-20"
          >
            <p className="type-h3 text-white">No video tours available yet</p>
            <p className="type-body-s text-white/70">
              Published video tours will appear here once they are added from
              the admin panel.
            </p>
          </div>
        ) : (
          <div
            data-reveal-group
            className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-12"
          >
            {videos.map((it, i) => {
              const on = i === active;
              return (
                <button
                  key={it.title}
                  type="button"
                  onClick={() => pick(i)}
                  aria-current={on || undefined}
                  className="group flex cursor-pointer flex-col gap-3 text-left"
                >
                  <span
                    data-theme="dark"
                    className={`bg-surface-raised relative aspect-[16/9] w-full overflow-clip rounded-[16px] outline-2 -outline-offset-2 transition-[outline-color] ${on ? "outline-lime-500" : "outline-transparent group-hover:outline-white/40"}`}
                  >
                    <Image
                      src={it.poster}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 bg-linear-to-b from-transparent from-40% to-black/60" />
                    {on && (
                      <Tag
                        label="Now playing"
                        className="absolute top-3 left-3"
                      />
                    )}
                    <span
                      className={`absolute bottom-3 left-3 grid place-items-center rounded-full transition-colors ${on ? "size-12 bg-lime-500 text-black" : "size-10 bg-black/60 text-white group-hover:bg-lime-500 group-hover:text-black"}`}
                    >
                      <PlayIcon className="size-5 translate-x-px" />
                    </span>
                    <Duration
                      value={it.duration}
                      className="absolute right-3 bottom-3"
                    />
                  </span>
                  <span className="type-label-overline text-accent-text">
                    {it.category}
                  </span>
                  <span
                    className={`type-h4 transition-colors ${on ? "text-accent-text" : "text-primary"}`}
                  >
                    {it.title}
                  </span>
                  <span className="type-body-s text-tertiary -mt-1">
                    {it.location}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
