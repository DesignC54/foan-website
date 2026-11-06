import type { ReactNode } from "react";
import { Tag } from "@/components/ui/tag";

// Centred inner-page hero used across Careers, Blog, Press Releases,
// Resources (Figma "Hero" frames): glow, tag, heading, intro, optional CTAs.
// Plays the same load sequence as Leadership.

export function PageHero({
  tag,
  title,
  intro,
  size = "h1",
  children,
}: {
  tag: string;
  title: ReactNode;
  intro?: ReactNode;
  size?: "h1" | "display";
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-clip">
      {/* eslint-disable-next-line @next/next/no-img-element -- glow */}
      <img
        src="/images/about/hero-glow.svg"
        alt=""
        className="intro-fade light:opacity-40 pointer-events-none absolute top-[-260px] left-1/2 h-[700px] w-[1200px] max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_92%)]"
      />
      <div className="max-w-frame px-gutter nav:pt-[184px] relative mx-auto flex flex-col items-center gap-6 pt-[96px] pb-12 text-center md:pt-[120px] lg:gap-10 lg:pb-[112px]">
        <div
          className="intro-up"
          style={{ "--d": "100ms" } as React.CSSProperties}
        >
          <Tag label={tag} />
        </div>
        <h1
          className={`intro-zoom text-primary ${size === "display" ? "type-display lg:w-[880px]" : "type-h1 lg:w-[1000px]"}`}
          style={{ "--d": "200ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="intro-up type-body-xl text-secondary lg:w-[780px]"
            style={{ "--d": "420ms" } as React.CSSProperties}
          >
            {intro}
          </p>
        )}
        {children && (
          <div
            className="intro-up flex flex-wrap justify-center gap-3"
            style={{ "--d": "540ms" } as React.CSSProperties}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export const Lime = ({ children }: { children: ReactNode }) => (
  <span className="text-accent-text">{children}</span>
);
