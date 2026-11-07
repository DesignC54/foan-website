import Image from "next/image";
import { C54Logo } from "@/components/site/c54-logo";

// Figma: Home › Where we stand (2109:10063 desktop / 2109:9553 mobile).

type Milestone =
  | { date: string; title: string; thumb: "photo"; image: string }
  | { date: string; title: string; thumb: "c54" };

const milestones: Milestone[] = [
  {
    date: "In service",
    title: "Technology platforms in service",
    thumb: "photo",
    image: "/images/home/photo-towers-a.webp",
  },
  {
    date: "14 Oct 2026",
    title: "C54News shadow launch",
    thumb: "c54",
  },
  {
    date: "Aug 2027",
    title: "C54News commercial launch",
    thumb: "c54",
  },
  {
    date: "31 Mar 2026",
    title: "FOAN Group Board inaugurated",
    thumb: "photo",
    image: "/images/home/photo-towers-b.webp",
  },
];

/** C54 thumbnail: the C54NEWS logo fitted on its brand blue (140px mobile, 180px desktop). */
function C54Thumb() {
  return (
    <div className="bg-c54-blue relative h-full w-[140px] shrink-0 overflow-clip lg:w-[180px]">
      <C54Logo
        className="inset-x-0 top-1/2 h-[92.8%] -translate-y-1/2"
        sizes="180px"
      />
    </div>
  );
}

export function WhereWeStand() {
  return (
    <section className="max-w-frame px-gutter py-section mx-auto w-full">
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[866.67fr_413.33fr] lg:gap-10">
        {/* Feature card */}
        <div
          data-theme="dark"
          data-reveal
          data-reveal-img
          className="relative flex min-h-[351px] flex-col justify-end gap-6 overflow-clip rounded-sm p-7 md:min-h-[460px] md:p-10 lg:h-[880px] lg:gap-10 lg:p-[52px]"
        >
          <Image
            src="/images/home/photo-towers-b.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 867px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-x-0 bottom-0 h-[580px] bg-gradient-to-b from-black/0 to-black/95" />
          <h2 className="type-h1 text-primary relative whitespace-nowrap">
            Where we stand
          </h2>
          <div className="relative h-px w-full bg-white" />
          <div className="text-primary relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="type-body-xl lg:w-[330px]">
              Work already delivered and work committed to a date — stated
              separately.
            </p>
            <div className="flex flex-col gap-1 whitespace-nowrap lg:items-end">
              <p className="type-stat">2026</p>
              <p className="type-body-l">Board inaugurated</p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <ol
          data-reveal-group="right"
          className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:flex"
        >
          {milestones.map((m) => (
            <li
              key={m.title}
              className="bg-surface hover:shadow-tag flex h-[116px] gap-5 overflow-clip rounded-sm transition-shadow lg:h-auto lg:flex-1 lg:gap-7"
            >
              {m.thumb === "photo" ? (
                <div className="relative h-full w-[140px] shrink-0 lg:w-[180px]">
                  <Image
                    src={m.image}
                    alt=""
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <C54Thumb />
              )}
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 py-6 pr-5 lg:justify-start lg:gap-5 lg:py-9 lg:pr-7">
                <p className="type-body-s text-accent-text">{m.date}</p>
                <p className="type-h4 text-primary">{m.title}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
