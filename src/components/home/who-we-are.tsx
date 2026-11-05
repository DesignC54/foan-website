import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MaskIcon } from "@/components/ui/mask-icon";
import { Tag } from "@/components/ui/tag";

// Figma: Home › Who we are (2109:9996 desktop / 2109:9486 mobile).
// Desktop columns are 300 / 526.67 / 413.33 of 1320, kept as fractions so
// the grid also works between 1024 and 1440.

type Stat = { icon: string; value: string; title: string; body: string };

const hubsBody =
  "Global Streaming Hub in Uyo, production in Nairobi, commercial in Johannesburg, annex commercial in Lagos and a continental hub in Senegal.";

const stats: Record<"hubs" | "countries" | "hubs5", Stat> = {
  hubs: { icon: "icon-building", value: "3", title: "Hubs", body: hubsBody },
  countries: {
    icon: "icon-globe",
    value: "5",
    title: "Countries",
    body: "Nigeria, Kenya, South Africa, Senegal and the UAE — with editorial reach across the continent through owned platforms and syndication.",
  },
  hubs5: { icon: "icon-broadcast", value: "5", title: "Hubs", body: hubsBody },
};

function StatCard({
  stat,
  className = "",
}: {
  stat: Stat;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-7 overflow-clip rounded-sm p-7 lg:gap-9 ${className}`}
    >
      <div className="flex items-center justify-between">
        <MaskIcon
          src={`/images/home/${stat.icon}.svg`}
          className="text-primary size-11"
        />
        <p className="type-stat text-accent-text">{stat.value}</p>
      </div>
      <div className="flex flex-col gap-5">
        <p className="type-h4 text-primary">{stat.title}</p>
        <p className="type-body-s text-secondary">{stat.body}</p>
      </div>
    </div>
  );
}

export function WhoWeAre() {
  return (
    <section className="max-w-frame gap-section-gap px-gutter py-section mx-auto flex w-full flex-col">
      <div className="flex flex-col gap-4 lg:gap-6">
        <Tag label="Who we are" />
        <h2 className="type-h2 text-primary lg:max-w-[1206.67px]">
          FOAN Group builds and operates the companies that carry Africa’s news,
          data, stories and streams
        </h2>
      </div>

      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[300fr_526.67fr_413.33fr] lg:gap-10">
        {/* Col / 3 */}
        <div className="flex flex-col gap-5 lg:gap-10">
          <StatCard stat={stats.hubs} className="bg-surface lg:p-9" />
          <Link
            href="/video-tours/"
            className="group bg-surface flex flex-1 flex-col gap-7 overflow-clip rounded-sm pb-7"
          >
            <div
              data-theme="dark"
              className="from-afrixx-orange relative flex h-[220px] flex-col justify-end overflow-clip bg-gradient-to-b to-[#b54700] p-7 lg:h-auto lg:min-h-[280px] lg:flex-1"
            >
              <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-b from-black/0 to-black/65" />
              {/* eslint-disable-next-line @next/next/no-img-element -- icon artwork */}
              <img
                src="/images/home/icon-tv.svg"
                alt=""
                className="absolute top-[calc(50%-20px)] left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-105 lg:top-[calc(50%-24px)]"
              />
              <div className="relative flex items-center gap-3">
                <span className="bg-accent relative size-7 rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element -- play glyph */}
                  <img
                    src="/images/home/icon-play.svg"
                    alt=""
                    className="absolute top-2 left-2.5 h-3 w-2.5"
                  />
                </span>
                <span className="type-body-s text-primary whitespace-nowrap">
                  Who we are in a minute
                </span>
              </div>
            </div>
            <p className="type-lead text-primary px-7">Watch the dream.</p>
          </Link>
        </div>

        {/* Col / 5: photo with glass stat card */}
        <div
          data-theme="dark"
          className="relative flex h-[480px] flex-col justify-end overflow-clip rounded-sm p-6 lg:h-[735px]"
        >
          <Image
            src="/images/home/photo-pyramid.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 527px, 100vw"
            className="object-cover"
          />
          <StatCard
            stat={stats.countries}
            className="shadow-tag relative bg-[rgba(20,20,20,0.5)] lg:bg-[rgba(20,20,20,0.7)]"
          />
        </div>

        {/* Col / 4 */}
        <div className="flex flex-col gap-5 lg:gap-10">
          <StatCard stat={stats.hubs5} className="bg-surface lg:p-9" />
          <div
            data-theme="dark"
            className="bg-highlight relative flex flex-1 flex-col gap-6 overflow-clip rounded-sm px-7 pt-10 pb-8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative stripes */}
            <img
              src="/images/home/who-stripes-m.svg"
              alt=""
              className="absolute inset-0 size-full object-cover lg:hidden"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative stripes */}
            <img
              src="/images/home/who-stripes.svg"
              alt=""
              className="absolute inset-0 hidden size-full object-cover lg:block"
            />
            <p className="type-h3 text-on-accent relative">
              We unified by one standard for how information is gathered,
              verified, produced and distributed, from Abuja, Uyo and Dubai.
            </p>
            <Button
              label="See open roles"
              href="/careers/"
              variant="white"
              arrowSrc="/images/home/btn-arrow-black.svg"
              className="relative self-start"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
