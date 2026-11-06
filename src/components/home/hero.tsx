import Image from "next/image";
import Link from "next/link";
import { MeshBackground } from "@/components/motion/mesh-background";
import { PillarMotion } from "./pillar-motion";
import { Carousel } from "@/components/ui/carousel";
import { MaskIcon } from "@/components/ui/mask-icon";
import { Tag } from "@/components/ui/tag";

// Figma: Home — Desktop › Hero (2109:9880) / Home — Mobile › Hero (2109:9382).

const pillars = [
  // Desktop positions are % of the 1440 frame, as in Figma.
  { label: "Media", shape: "hex-a", pos: "left-[10.42%] top-[320px]" },
  { label: "Data", shape: "hex-a", pos: "left-[17.36%] top-[450px]" },
  { label: "Technology", shape: "hex-b", pos: "left-[79.86%] top-[320px]" },
  { label: "Streams", shape: "hex-c", pos: "left-[73.61%] top-[460px]" },
];

type Story = {
  tag: string;
  title: string;
  date: string;
  image?: string;
};

// Stories on the live homepage (FOAN Newsroom press items).
const stories: Story[] = [
  {
    tag: "Press",
    title:
      "FOAN Group deepens technology drive as C54 News readies for its May 2026 launch",
    date: "Nov 1, 2025",
    image: "/images/home/photo-towers-a.webp",
  },
  {
    tag: "Press",
    title: "C54 News set for May 2026 launch",
    date: "Nov 1, 2025",
  },
  {
    tag: "Opinion",
    title: "Future of global news — why Africa needs to control its narrative",
    date: "Nov 1, 2025",
    image: "/images/home/photo-towers-b.webp",
  },
];

function Hex({
  label,
  shape,
  size,
}: {
  label: string;
  shape: string;
  size: "lg" | "sm";
}) {
  const lg = size === "lg";
  return (
    <div
      className={`relative shrink-0 ${lg ? "h-[152px] w-[136px]" : "h-[91.2px] w-[81.6px]"}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- hexagon outline */}
      <img
        src={`/images/home/${shape}.svg`}
        alt=""
        className="absolute inset-0 size-full"
      />
      <p
        className={`absolute inset-x-0 text-center text-white ${
          lg
            ? "type-body-m top-[66px]"
            : "font-display top-[39.6px] text-[9.6px] leading-normal"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      href="/press-releases/"
      data-theme="dark"
      className={`relative flex h-[440px] w-[362px] shrink-0 snap-start flex-col justify-between overflow-clip rounded-sm p-6 md:h-[480px] md:w-[520px] lg:h-[500px] lg:w-[640px] lg:p-10 ${
        story.image ? "" : "from-c54-navy bg-gradient-to-b to-[#030a24]"
      }`}
    >
      {story.image ? (
        <>
          <Image
            src={story.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 640px, 362px"
            className="intro-photo object-cover"
          />
          <div className="absolute inset-0 bg-black/12" />
        </>
      ) : (
        <C54Mark />
      )}
      <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-b from-black/0 to-black/88" />
      <Tag label={story.tag} className="relative" />
      <div className="relative flex flex-col gap-6">
        <p className="type-h3 text-primary">{story.title}</p>
        <div className="type-body-m text-primary flex items-center gap-4 whitespace-nowrap">
          <span className="bg-accent relative size-10 shrink-0 overflow-clip rounded-[20px]">
            <Image
              src="/images/site/foan-logo.webp"
              alt=""
              width={240}
              height={146}
              className="absolute top-[11px] left-[5px] h-[18px] w-[30px] object-contain"
            />
          </span>
          FOAN Newsroom
          <span className="text-tertiary">|</span>
          {story.date}
        </div>
      </div>
    </Link>
  );
}

/** The large "C54 NEWS" mark on the brand story card. */
function C54Mark() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative rings */}
      <img
        src="/images/home/story-rings.svg"
        alt=""
        className="absolute top-[10px] left-1/2 h-[300px] w-[372px] max-w-none -translate-x-1/2 lg:top-0 lg:h-[500px] lg:w-[620px]"
      />
      <p className="font-display absolute top-[26.8px] left-[calc(50%-110.5px)] text-[125.4px] leading-normal font-semibold tracking-[-5.016px] text-white lg:top-[28px] lg:left-[calc(50%-184px)] lg:text-[209px] lg:tracking-[-8.36px]">
        C54
      </p>
      <div className="bg-c54-red absolute top-[178px] left-1/2 flex h-[31.8px] w-24 -translate-x-1/2 items-center justify-center rounded-[2.4px] lg:top-[280px] lg:h-[53px] lg:w-40 lg:rounded-xs">
        <span className="font-display text-[16.2px] font-semibold tracking-[2.268px] text-white lg:text-[27px] lg:tracking-[3.78px]">
          NEWS
        </span>
      </div>
    </>
  );
}

export function Hero() {
  return (
    <section className="gap-section-gap pb-section nav:pt-[156px] relative flex flex-col pt-[84px] lg:gap-[60px]">
      {/* Animated wireframe terrain across the whole hero, kept faint so it
          reads as texture; fades out towards the stories below. */}
      <div
        aria-hidden
        className="intro-fade pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2"
        style={{ "--d": "0ms", "--dur": "1800ms" } as React.CSSProperties}
      >
        <MeshBackground
          rows={14}
          amplitude={28}
          opacity={[0.05, 0.18]}
          className="text-primary absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_60%,transparent_92%)]"
        />
      </div>
      {/* Stage */}
      <div className="max-w-frame relative mx-auto flex w-full flex-col items-center gap-6 px-5 pt-6 md:px-10 lg:h-[612px] lg:gap-8 lg:px-[60px] lg:pt-8">
        {/* Load sequence (CSS, see "Intro" in globals.css):
            mesh + glow fade in → logo settles (zoom out) → text and button
            rise → the four pillars glide onto the stage, then float. */}
        <div
          className="intro-fade pointer-events-none absolute inset-0"
          style={{ "--d": "0ms", "--dur": "1600ms" } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- glow */}
          <img
            src="/images/home/hero-glow-m.svg"
            alt=""
            className="absolute top-0 left-1/2 h-[300px] w-[520px] max-w-none -translate-x-1/2 lg:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- glow */}
          <img
            src="/images/home/hero-glow.svg"
            alt=""
            className="absolute top-0 left-1/2 hidden h-[520px] w-[900px] max-w-none -translate-x-1/2 lg:block"
          />
        </div>

        {/* Desktop pillars glide in from their side, then float */}
        <div
          data-theme="dark"
          className="pointer-events-none absolute inset-0 hidden lg:block"
        >
          {pillars.map((p, i) => (
            <div key={p.label} className={`absolute ${p.pos}`}>
              <PillarMotion
                from={i < 2 ? "left" : "right"}
                delay={0.48 + i * 0.11}
                floatOffset={i * 0.7}
              >
                <Hex label={p.label} shape={p.shape} size="lg" />
              </PillarMotion>
            </div>
          ))}
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- logo artwork */}
        <img
          src="/images/home/hero-logo.svg"
          alt="FOAN Group"
          width={565.163}
          height={290}
          className="intro-zoom relative h-[159.5px] w-[310.84px] md:h-[230px] md:w-[448px] lg:h-[290px] lg:w-[565.163px]"
          style={{ "--d": "150ms" } as React.CSSProperties}
        />
        <h1
          className="intro-up type-body-xl text-primary relative w-full text-center lg:w-[640px]"
          style={{ "--d": "380ms" } as React.CSSProperties}
        >
          A media, technology and data company that gathers, verifies and
          interprets information about African markets and builds the platforms
          that carry it.
        </h1>
        <Link
          href="/about/"
          style={{ "--d": "520ms" } as React.CSSProperties}
          className="intro-up group bg-inverse type-label-button text-inverse-text relative flex items-center gap-4 rounded-full py-2 pr-2 pl-6"
        >
          Learn more
          <span className="bg-highlight grid size-8 place-items-center rounded-full text-black">
            <MaskIcon
              src="/images/site/icon-arrow-right.svg"
              className="size-6 transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </Link>

        {/* Mobile/tablet: three pillars in a centred row (Streams is
            desktop-only, so the row has room to breathe) */}
        <div
          data-theme="dark"
          className="relative flex w-full items-center justify-center gap-7 md:gap-12 lg:hidden"
        >
          {pillars
            .filter((p) => p.label !== "Streams")
            .map((p, i) => (
              <PillarMotion key={p.label} from="below" delay={0.48 + i * 0.09}>
                <Hex label={p.label} shape={p.shape} size="sm" />
              </PillarMotion>
            ))}
        </div>
      </div>

      {/* Stories: scroller with pagination (the third card peeks, as in Figma) */}
      <div
        className="intro-up max-w-frame mx-auto w-full"
        style={{ "--d": "800ms" } as React.CSSProperties}
      >
        <Carousel label="Latest from the FOAN Newsroom">
          {stories.map((s) => (
            <StoryCard key={s.title} story={s} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
