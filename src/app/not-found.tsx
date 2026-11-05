import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

// Figma: 404 — Desktop (4006:4990) / 404 — Mobile (4006:5292).
// Exported as /404.html, which .htaccess serves for unknown URLs on Namecheap.

export const metadata: Metadata = {
  title: "404 | Not Found",
};

// The illustration is drawn at desktop size (760×620). Mobile is the same
// drawing at 47.632% (362px wide), exactly as in Figma, so it is scaled.
function Illustration() {
  const diamond =
    "absolute rotate-45 border-2 border-white/60 bg-gradient-to-r from-[#050505]";
  return (
    <div
      className="relative h-[295.316px] w-[362px] shrink-0 lg:h-[620px] lg:w-[760px]"
      aria-hidden
    >
      <div className="absolute top-0 left-0 h-[620px] w-[760px] origin-top-left scale-[0.47632] lg:scale-100">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG */}
        <img
          src="/images/site/404-glow.svg"
          alt=""
          width={700}
          height={520}
          className="absolute top-[60px] left-0 h-[520px] w-[700px] max-w-none"
        />
        {/* Large diamond: 400px square rotated 45° inside a 565.685px box */}
        <div
          className={`${diamond} top-[120px] left-[100px] size-[400px] rounded-[80px] to-[#333800]`}
        />
        <p className="font-display absolute top-[175px] left-[242.5px] text-[230px] leading-normal font-bold text-white">
          ?
        </p>
        <div
          className={`${diamond} top-[280px] left-[475px] size-[160px] rounded-[32px] to-[#545e00]`}
        />
        <div
          className={`${diamond} top-[65px] left-[480px] size-[90px] rounded-[18px] to-[#545e00]`}
        />
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <section className="gap-section-gap px-gutter nav:pt-[calc(72px+var(--layout-section-padding-y))] flex flex-col items-center overflow-clip pt-[calc(64px+var(--layout-section-padding-y))] pb-[calc(var(--layout-section-padding-y)+48px)] lg:gap-6 lg:pb-[calc(var(--layout-section-padding-y)+80px)]">
      <Illustration />
      <Tag label="404" />
      <h1 className="type-h1 text-primary lg:type-display text-center whitespace-nowrap">
        Not <span className="text-accent-text">Found</span>
      </h1>
      <div className="flex items-center gap-3 lg:pt-4">
        <Button label="Home" href="/" variant="lime" />
        <Button label="Contact Us" href="/contact/" variant="white" />
      </div>
    </section>
  );
}
