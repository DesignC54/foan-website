import type { ReactNode } from "react";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

// Figma: CTA / Section (2236:3031). Closing section used across pages: white
// panel, hex lattice fading in from below, Display/XL headline with an olive
// last word, two buttons. Pinned Light so it stays white in both themes.

type Cta = {
  label: string;
  href: string;
  variant: ButtonVariant;
  arrowSrc?: string;
};

export function CtaSection({
  tag,
  title,
  emphasis,
  ctas,
}: {
  tag: string;
  title: ReactNode;
  emphasis: string;
  ctas: Cta[];
}) {
  return (
    <section
      data-theme="light"
      className="max-w-frame px-gutter relative mx-auto w-full overflow-clip bg-white py-6"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative lattice */}
      <img
        src="/images/home/hex-lattice.svg"
        alt=""
        className="pointer-events-none absolute bottom-[-478px] left-[calc(50%-16px)] h-[1479px] w-[1472px] max-w-none -translate-x-1/2 -scale-y-100"
      />
      <div
        className="pointer-events-none absolute top-[-315px] left-1/2 h-[1303px] w-[1534px] -translate-x-1/2 -rotate-[0.42deg]"
        style={{
          backgroundImage:
            "linear-gradient(180.42deg, #fff 32.58%, rgba(255,255,255,0.92) 63.54%, rgba(255,255,255,0) 99.98%)",
        }}
      />
      <div
        data-reveal
        className="relative flex flex-col items-center gap-6 py-10 lg:p-20"
      >
        <Tag label={tag} tone="dark" />
        <h2 className="type-display-xl max-w-[760px] text-center text-black">
          {title} <span className="text-olive-500">{emphasis}</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {ctas.map((c) => (
            <Button key={c.label} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
