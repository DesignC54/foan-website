import Image from "next/image";

// Figma: Home › Where we stand (2109:10063 desktop / 2109:9553 mobile).

type Milestone =
  | { date: string; title: string; thumb: "photo"; image: string }
  | { date: string; title: string; thumb: "c54"; tone: "navy" | "red" };

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
    tone: "navy",
  },
  {
    date: "Aug 2027",
    title: "C54News commercial launch",
    thumb: "c54",
    tone: "red",
  },
  {
    date: "31 Mar 2026",
    title: "FOAN Group Board inaugurated",
    thumb: "photo",
    image: "/images/home/photo-towers-b.webp",
  },
];

/** C54 thumbnail, drawn at desktop size (180px) and scaled to 140px on mobile. */
function C54Thumb({ tone }: { tone: "navy" | "red" }) {
  const navy = tone === "navy";
  return (
    <div
      className={`relative h-full w-[140px] shrink-0 overflow-clip bg-gradient-to-b lg:w-[180px] ${
        navy ? "from-c54-navy to-[#030a24]" : "from-c54-red to-[#7a0f14]"
      }`}
    >
      <div className="absolute top-0 left-0 h-[205px] w-[180px] origin-top-left scale-[0.7778] lg:scale-100">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative rings */}
        <img
          src="/images/home/milestone-rings.svg"
          alt=""
          className="absolute inset-0 size-full"
        />
        <p className="font-display absolute top-[39px] left-[30px] text-[68px] leading-normal font-semibold tracking-[-2.72px] text-white">
          C54
        </p>
        <div
          className={`absolute top-[121px] left-16 flex h-[17px] w-[52px] items-center justify-center rounded-xs ${navy ? "bg-c54-red" : "bg-c54-navy"}`}
        >
          <span className="font-display text-[9px] font-semibold tracking-[1.26px] text-white">
            NEWS
          </span>
        </div>
      </div>
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
          className="relative flex min-h-[351px] flex-col justify-end gap-6 overflow-clip rounded-sm p-7 lg:h-[880px] lg:gap-10 lg:p-[52px]"
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
        <ol className="flex flex-col gap-5">
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
                <C54Thumb tone={m.tone} />
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
