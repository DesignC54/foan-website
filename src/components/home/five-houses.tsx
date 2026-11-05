import Image from "next/image";
import { SmartLink } from "@/components/ui/smart-link";
import { Tag } from "@/components/ui/tag";
import { houses, type HouseKey } from "@/lib/site";

// Figma: Home › Five houses (2109:10113 desktop / 2109:9603 mobile).
// A lime brand band: pinned to Dark so it looks the same in both themes.

const copy: Record<
  Exclude<HouseKey, "c54">,
  { meta: [string, string]; lead: string }
> = {
  future: {
    meta: ["Technology", "Group company"],
    lead: "Building the solutions that power the future of content delivery",
  },
  afrixx: {
    meta: ["Streaming", "Coming soon"],
    lead: "Premium streaming for African and diaspora audiences",
  },
  foanl: {
    meta: ["Communications", "Group company"],
    lead: "PR, media consulting and advertising for institutions",
  },
  f1: {
    meta: ["Studios", "Coming soon"],
    lead: "Production for film, documentary and branded stories",
  },
};
const order: Exclude<HouseKey, "c54">[] = ["future", "afrixx", "foanl", "f1"];
const href = (k: HouseKey) => houses.find((h) => h.key === k)!.href;

/** House tile artwork: 300×262 on desktop, full width × 220 on mobile. */
function Tile({ house }: { house: Exclude<HouseKey, "c54"> }) {
  const base =
    "relative h-[220px] w-full overflow-clip rounded-[16px] lg:aspect-[300/262] lg:h-auto";
  if (house === "future")
    return (
      <div
        className={base}
        style={{
          backgroundImage:
            "linear-gradient(138.87deg, #3b0b8c 14.286%, #c026d3 85.714%)",
        }}
      >
        <Image
          src="/images/site/logo-future-one-studios.webp"
          alt="Future One Studios"
          fill
          sizes="(min-width: 1024px) 300px, 100vw"
          className="object-cover lg:hidden"
        />
        <div className="absolute top-0 left-[-3.5%] hidden h-full w-[107%] overflow-hidden lg:block">
          <Image
            src="/images/site/logo-future-one-studios.webp"
            alt="Future One Studios"
            width={600}
            height={600}
            className="absolute top-[-45.04%] left-[-37%] h-[198.73%] w-[162.2%] max-w-none"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative grid */}
        <img
          src="/images/home/houses-grid-m.svg"
          alt=""
          className="absolute top-0 left-0 w-full max-w-none lg:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative grid */}
        <img
          src="/images/home/houses-grid.svg"
          alt=""
          className="absolute top-0 left-0 hidden h-full w-[107%] max-w-none lg:block"
        />
      </div>
    );
  if (house === "afrixx")
    return (
      <div className={`${base} bg-black`}>
        <Image
          src="/images/site/logo-afrixxstreams.webp"
          alt="AfrixxStreams"
          width={320}
          height={110}
          className="absolute top-1/2 left-1/2 h-[91.757px] w-[267px] -translate-x-1/2 -translate-y-1/2 lg:left-[calc(50%-11px)]"
        />
      </div>
    );
  if (house === "foanl")
    return (
      <div className={`${base} bg-white`}>
        <div className="absolute top-[calc(50%-4px)] left-[calc(50%+1px)] h-[228.841px] w-[278px] -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/site/logo-foanl.webp"
            alt="FOANL"
            width={320}
            height={139}
            className="absolute top-[27.04%] left-[3.05%] h-[48.77%] w-[92.38%] max-w-none"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative ring */}
        <img
          src="/images/home/houses-ellipse.svg"
          alt=""
          className="absolute top-[-140px] left-[66.5%] size-[220px] max-w-none"
        />
      </div>
    );
  return (
    <div className={`${base} bg-neutral-950`}>
      <Image
        src="/images/site/logo-f1-digital.webp"
        alt="F1 Digital"
        width={320}
        height={133}
        className="absolute top-1/2 left-1/2 h-[112.306px] w-[271px] -translate-x-1/2 -translate-y-1/2 lg:left-[calc(50%-11px)]"
      />
    </div>
  );
}

export function FiveHouses() {
  return (
    <div className="max-w-frame mx-auto w-full">
      <section
        id="five-houses"
        data-theme="dark"
        className="gap-section-gap bg-accent px-gutter py-section relative flex flex-col overflow-clip rounded-lg"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative stripes */}
        <img
          src="/images/home/houses-stripes.svg"
          alt=""
          className="pointer-events-none absolute top-0 left-0 h-[calc(100%+326px)] w-[calc(100%+32px)] max-w-none"
        />

        <div data-reveal className="relative flex flex-col gap-4 lg:gap-6">
          <Tag label="Everything at a glance" tone="dark" />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="type-h1 text-neutral-950">
              Five houses, <span className="text-olive-500">one group</span>
            </h2>
            <p className="type-body-l text-neutral-950 lg:w-[413.33px]">
              Five companies, one standard for how information is gathered,
              verified, produced and distributed.
            </p>
          </div>
        </div>

        <div className="relative flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-10">
          {/* C54News feature */}
          <SmartLink
            href={href("c54")}
            className="from-c54-navy relative flex h-[540px] flex-col justify-end overflow-clip rounded-[16px] bg-gradient-to-b to-[#030a24] p-4 lg:h-auto lg:p-5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- broadcast rings */}
            <img
              src="/images/home/houses-rings.svg"
              alt=""
              className="absolute top-3.5 left-1/2 size-[336px] max-w-none -translate-x-1/2 lg:top-10 lg:size-[560px]"
            />
            <p className="font-display absolute top-20 left-[calc(50%-106px)] text-[120px] leading-normal font-semibold tracking-[-4.8px] text-white lg:top-[150px] lg:left-[calc(50%-176px)] lg:text-[200px] lg:tracking-[-8px]">
              C54
            </p>
            <div className="bg-c54-red absolute top-[227.6px] left-1/2 flex h-[28.8px] w-[90px] -translate-x-1/2 items-center justify-center rounded-[3.6px] lg:top-[396px] lg:h-12 lg:w-[150px] lg:rounded-[6px]">
              <span className="font-display text-[14.4px] font-semibold tracking-[2.016px] text-white lg:text-2xl lg:tracking-[3.36px]">
                NEWS
              </span>
            </div>
            <div className="bg-surface relative flex flex-col gap-5 rounded-[12px] p-6 lg:gap-7 lg:px-10 lg:pt-9 lg:pb-10">
              <div className="flex flex-col gap-3">
                <p className="type-h3 text-primary">C54News</p>
                <p className="type-body-l text-white">
                  Digital-first news and documentary network delivering trusted
                  reporting across Africa and the globe.
                </p>
              </div>
              <p className="type-body-s whitespace-pre-wrap text-white/90">
                {"News & documentary   |   Group company"}
              </p>
            </div>
          </SmartLink>

          {/* The other four houses */}
          <ul
            data-reveal-group="zoom-in"
            className="grid grid-cols-1 gap-10 lg:grid-cols-2"
          >
            {order.map((k) => (
              <li key={k}>
                <SmartLink href={href(k)} className="group flex flex-col gap-5">
                  <div className="transition-transform duration-300 group-hover:-translate-y-1">
                    <Tile house={k} />
                  </div>
                  <div className="type-body-s flex items-center gap-4 whitespace-nowrap">
                    <span className="text-olive-500">{copy[k].meta[0]}</span>
                    <span className="h-[18px] w-px bg-olive-500" />
                    <span className="text-[rgba(10,10,10,0.65)]">
                      {copy[k].meta[1]}
                    </span>
                  </div>
                  <p className="type-lead text-inverse-text">{copy[k].lead}</p>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
