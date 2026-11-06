import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Figma: Home › White panel (2109:10224 desktop / 2109:9714 mobile).
// The panel is pinned to Light in the design, so it stays white in both themes.

type Built = {
  title: string;
  meta: string;
  href: string;
  border: string;
  media: "photo" | "signal";
};

const built: Built[] = [
  {
    title: "Governance and structure",
    meta: "Board inaugurated · 31 March 2026",
    href: "/leadership/",
    border: "border-neutral-950",
    media: "photo",
  },
  {
    title: "Signal that belongs here",
    meta: "Production, not advocacy",
    href: "/about/",
    border: "border-[#cbdd0c]",
    media: "signal",
  },
];

/** Card media, drawn at desktop size (330×375) and scaled to 42% on mobile. */
function Media({ kind }: { kind: Built["media"] }) {
  return (
    <div className="relative w-[138.6px] shrink-0 self-stretch overflow-clip lg:h-[375px] lg:w-[43.8%] lg:self-auto">
      <div
        className="absolute top-0 left-0 h-[375px] w-[330px] origin-top-left scale-[0.42] lg:scale-100"
        style={
          kind === "signal"
            ? {
                backgroundImage:
                  "linear-gradient(131.35deg, #e9fe00 14.286%, #677132 85.714%)",
              }
            : undefined
        }
      >
        {kind === "photo" ? (
          <div className="absolute top-0 left-[-120px] h-[375px] w-[600px]">
            <Image
              src="/images/home/photo-towers-a.webp"
              alt=""
              fill
              sizes="600px"
              className="object-cover"
            />
          </div>
        ) : (
          <>
            <p className="font-display absolute top-[272px] left-[18px] text-[86px] leading-normal font-semibold tracking-[-2.58px] text-black/12">
              SIGNAL
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element -- pulse line */}
            <img
              src="/images/home/pulse.svg"
              alt=""
              className="absolute top-[110px] left-[65px] h-[120px] w-[200px]"
            />
          </>
        )}
      </div>
    </div>
  );
}

export function WhitePanel() {
  return (
    <div className="max-w-frame mx-auto w-full">
      <section
        data-theme="light"
        className="bg-page flex flex-col overflow-clip rounded-lg"
      >
        {/* How we are built */}
        <div className="flex flex-col gap-8 px-5 pt-16 pb-12 lg:gap-16 lg:px-[60px] lg:py-10">
          <h2
            data-reveal
            className="type-h1 whitespace-nowrap text-neutral-950"
          >
            How we are <span className="text-olive-500">built</span>
          </h2>
          <div
            data-reveal-group
            className="flex flex-col gap-5 md:grid md:grid-cols-[1.3fr_1fr] lg:grid-cols-[753.33fr_526.67fr] lg:gap-10"
          >
            <div className="flex flex-col gap-5 lg:gap-10">
              {built.map((b) => (
                <Link
                  key={b.title}
                  href={b.href}
                  className={`group bg-page flex overflow-clip rounded-[16px] border ${b.border}`}
                >
                  <Media kind={b.media} />
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 px-5 pt-6 pb-5 lg:gap-0 lg:px-10 lg:pt-14 lg:pb-10">
                    <div className="flex flex-col gap-5">
                      <p className="type-h3 text-primary">{b.title}</p>
                      <p className="type-body-s text-neutral-950">{b.meta}</p>
                    </div>
                    <div className="flex justify-end">
                      <span className="grid size-10 place-items-center rounded-full border-[0.8px] border-neutral-950 transition-colors group-hover:bg-lime-500 lg:size-[50px] lg:border">
                        {/* eslint-disable-next-line @next/next/no-img-element -- arrow glyph */}
                        <img
                          src="/images/home/built-arrow.svg"
                          alt=""
                          className="size-4 lg:size-5"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Chair card */}
            <div
              data-reveal-img
              className="relative flex h-[540px] flex-col justify-end gap-6 overflow-clip rounded-[16px] bg-black p-6 md:h-auto md:min-h-[540px] lg:p-10"
            >
              <div className="absolute top-0 left-1/2 h-[551.8px] w-[513.174px] -translate-x-1/2 lg:top-[19px] lg:h-[890px] lg:w-[827.7px]">
                <Image
                  src="/images/home/chair-portrait.webp"
                  alt="Prof. Pat Utomi"
                  fill
                  sizes="(min-width: 1024px) 828px, 513px"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute inset-x-0 top-0 bottom-[-440px]"
                style={{
                  backgroundImage:
                    "linear-gradient(21.09deg, rgba(25,24,24,0.68) 48.81%, rgba(153,153,153,0.08) 99.5%)",
                }}
              />
              <div className="relative flex flex-col gap-8">
                <div className="flex w-[269px] flex-col gap-3">
                  <p className="type-h2 text-white">Prof. Pat Utomi</p>
                  <p className="type-body-m text-lime-500">
                    Chairman, FOAN Group Board
                  </p>
                </div>
                <p className="type-body-m text-white/90">
                  The Board holds strategy, capital, risk and appointments — and
                  protects editorial independence by a standard it cannot
                  override on commercial grounds.
                </p>
              </div>
              <Link
                href="/leadership/"
                className="group type-label-button relative flex h-[54px] items-center justify-center gap-3 self-start rounded-full bg-lime-500 px-7 whitespace-nowrap text-black"
              >
                View leadership
                {/* eslint-disable-next-line @next/next/no-img-element -- arrow glyph */}
                <img
                  src="/images/home/leadership-arrow.svg"
                  alt=""
                  className="size-[18px] transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Build with us */}
        <div className="relative flex flex-col items-center gap-6 overflow-clip px-5 pt-4 pb-16 lg:h-[585px] lg:gap-9 lg:px-[60px] lg:py-10">
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative lattice */}
          <img
            src="/images/home/hex-lattice.svg"
            alt=""
            className="pointer-events-none absolute bottom-[-488px] left-[calc(50%-16px)] hidden h-[1479px] w-[1472px] max-w-none -translate-x-1/2 -scale-y-100 lg:block"
          />
          <div
            className="pointer-events-none absolute top-[-315px] left-1/2 hidden h-[1303px] w-[1534px] -translate-x-1/2 -rotate-[0.42deg] lg:block"
            style={{
              backgroundImage:
                "linear-gradient(180.42deg, #fff 32.58%, rgba(255,255,255,0.92) 63.54%, rgba(255,255,255,0) 99.98%)",
            }}
          />
          <p
            data-reveal="zoom-out"
            className="type-display-xl relative text-center text-neutral-900"
          >
            Let’s build
            <br />
            <span className="text-olive-500">the signal.</span>
          </p>
          <p className="type-body-l text-tertiary relative text-center lg:w-[640px]">
            We are working with people who choose global standards over local
            comfort. Every role and every partnership is measured against the
            best in the world.
          </p>
          <Button
            label="See open roles"
            href="/careers/"
            variant="dark"
            className="relative"
          />
        </div>
      </section>
    </div>
  );
}
