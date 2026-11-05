import Image from "next/image";
import { MaskIcon } from "@/components/ui/mask-icon";

// Figma: Home › Stream AfrixxStreams (2109:10197 desktop / 2109:9687 mobile).
// Copy is verbatim from the design (including its typos, see the build notes).

export function StreamAfrixx() {
  return (
    <section className="max-w-frame px-gutter py-section mx-auto w-full">
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="flex flex-col gap-5">
            <h2 className="type-h1 text-primary">
              Stream{" "}
              <span className="text-highlight light:text-yellow-700">
                AfrixxStreams
              </span>
            </h2>
            <p className="type-body-xl light:text-secondary text-neutral-200">
              Premium subscription, advertising supported and transanctional
              streaming for African and diaspora audiences, Access is priced at
              several points, because a platform in this market that depends on
              subscriptioin alone bets against the observable economics.
            </p>
          </div>
          <span
            aria-disabled
            className="bg-disabled type-label-button text-on-accent flex items-center gap-4 self-start rounded-full py-2 pr-2 pl-6 whitespace-nowrap"
          >
            Coming soon
            <span className="bg-page text-primary grid size-8 place-items-center rounded-full">
              <MaskIcon
                src="/images/home/icon-arrow-right-white.svg"
                className="size-6"
              />
            </span>
          </span>
        </div>

        {/* "Coming soon" card: white in Dark, near-black in Light (bg/inverse) */}
        <div className="bg-inverse relative flex h-[260px] flex-col justify-between overflow-clip rounded-sm p-6 lg:h-[360px] lg:px-7 lg:pt-12 lg:pb-10">
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative stripes */}
          <img
            src="/images/home/stream-stripes-m.svg"
            alt=""
            className="light:opacity-10 pointer-events-none absolute top-[-49.72%] left-[-17.5%] h-[160.26%] w-[139.73%] max-w-none lg:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative stripes */}
          <img
            src="/images/home/stream-stripes.svg"
            alt=""
            className="light:opacity-10 pointer-events-none absolute top-[-49.72%] left-[-17.5%] hidden h-[160.26%] w-[139.73%] max-w-none lg:block"
          />
          <Image
            src="/images/site/logo-afrixxstreams.webp"
            alt="AfrixxStreams"
            width={320}
            height={110}
            className="relative h-[71.447px] w-[207.9px] lg:h-[102.067px] lg:w-[297px]"
          />
          <div className="relative flex items-end justify-between">
            <p className="type-display text-inverse-text">
              Coming
              <br />
              soon.
            </p>
            <span className="relative size-[51.84px] shrink-0 rounded-full bg-neutral-400 lg:size-[72px]">
              {/* eslint-disable-next-line @next/next/no-img-element -- play glyph */}
              <img
                src="/images/home/stream-play.svg"
                alt=""
                className="absolute top-[16.56px] left-[20.16px] h-[18.72px] w-[15.84px] lg:top-[23px] lg:left-7 lg:h-[26px] lg:w-[22px]"
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
