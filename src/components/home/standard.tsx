import { Tag } from "@/components/ui/tag";
import { ScrollWords } from "@/components/motion/scroll-words";

// Figma: Home › Standard (2109:10274 desktop / 2109:9764 mobile).

const steps = [
  { n: "01", label: "Gather", icon: "icon-gather" },
  { n: "02", label: "Verify", icon: "icon-verify" },
  { n: "03", label: "Produce", icon: "icon-produce" },
  { n: "04", label: "Distribute", icon: "icon-distribute" },
];

export function Standard() {
  return (
    <section className="max-w-frame px-gutter py-section relative mx-auto w-full overflow-clip">
      {/* Background grid: 1px lines every 134.64 × 128.93px (Figma Grid, white 10%) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[563px] lg:h-[1126px]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border-default) 1px, transparent 1px), linear-gradient(to bottom, var(--border-default) 1px, transparent 1px)",
          backgroundSize: "134.64px 128.93px",
        }}
      />

      <div className="gap-section-gap relative flex flex-col items-center">
        <div data-reveal className="flex flex-col items-center gap-4 lg:gap-6">
          <Tag label="Standard" />
          <ScrollWords
            className="type-h2 text-primary text-center lg:w-[866.67px]"
            text="One standard for how information is gathered, verified, produced and distributed. So Africa’s story is told on its own terms"
          />
        </div>

        {/* Hexagon steps: fixed dark shapes in both themes */}
        <ol
          data-theme="dark"
          data-reveal-group="zoom-in"
          className="grid w-full grid-cols-2 gap-5 md:grid-cols-4 lg:gap-10"
        >
          {steps.map((s) => (
            <li
              key={s.label}
              className="relative mx-auto flex aspect-[300/346] w-full max-w-[300px] flex-col items-center gap-5 pt-[26%] lg:gap-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- hexagon shape */}
              <img
                src="/images/home/step-hex-m.svg"
                alt=""
                className="absolute inset-0 size-full lg:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- hexagon shape */}
              <img
                src="/images/home/step-hex.svg"
                alt=""
                className="absolute inset-0 hidden size-full lg:block"
              />
              <p className="font-display text-accent-text md:type-body-l lg:type-body-xl relative text-[12.54px]">
                {s.n}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element -- step icon */}
              <img
                src={`/images/home/${s.icon}.svg`}
                alt=""
                className="relative size-[31.92px] lg:size-14"
              />
              <p className="font-display text-primary relative text-[14.82px] font-medium lg:text-[26px]">
                {s.label}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
