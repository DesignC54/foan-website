import Image from "next/image";
import type { CSSProperties } from "react";
import { footerColumns, legalLinks, socialLinks } from "@/lib/site";
import { MeshBackground } from "@/components/motion/mesh-background";
import { SmartLink } from "@/components/ui/smart-link";

// Figma: Site / Footer (2163:166). Device=Desktop from lg (1024px), Mobile below.
// The wordmark band is a fixed dark graphic in both themes (as in the Light designs).

export function SiteFooter() {
  return (
    <footer className="gap-section-gap bg-footer px-gutter pt-section flex flex-col items-center overflow-clip">
      <div className="gap-section-gap mx-auto flex w-full max-w-[1320px] flex-col">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          {/* Brand */}
          <div className="flex flex-col items-start gap-5">
            <div className="rounded-[18px] bg-neutral-50 px-4 py-3">
              <Image
                src="/images/site/foan-logo.webp"
                alt="FOAN Group"
                width={240}
                height={146}
                className="h-[58px] w-24 object-cover"
              />
            </div>
            <p className="type-body-s light:text-secondary text-white/60 lg:w-[300px]">
              A media, technology and data holding company headquartered in
              Abuja, Nigeria.
            </p>
            <ul className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`FOAN Group on ${s.label}`}
                    className="bg-surface-raised hover:text-accent-text light:text-primary grid size-11 place-items-center rounded-md text-white transition-colors"
                  >
                    <span
                      className="icon size-[18px]"
                      style={{ "--icon": `url(${s.icon})` } as CSSProperties}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-5 gap-y-8 lg:flex-nowrap lg:gap-[72px]"
          >
            {footerColumns.map((col) => (
              <div
                key={col.title}
                className="flex w-[171px] flex-col items-start gap-4 lg:w-auto"
              >
                <p className="type-label-overline text-accent-text">
                  {col.title}
                </p>
                <ul className="flex flex-col items-start gap-4">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <SmartLink
                        href={l.href}
                        className="type-label-nav text-primary hover:text-accent-text whitespace-nowrap transition-colors"
                      >
                        {l.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="type-label-small light:border-default light:text-primary flex flex-col items-start gap-4 border-t border-white pt-6 whitespace-nowrap text-white/90 lg:flex-row lg:items-center lg:justify-between">
          <p>© 2026 FOAN Group. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:gap-7">
            {legalLinks.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Wordmark band: live wireframe mesh + FOAN logo, dark in both themes.
          Mobile sits inside the gutters; desktop is the full 1440 band. */}
      <div className="relative flex h-60 w-full items-start justify-center overflow-clip bg-neutral-900 pt-4 lg:h-[392px] lg:w-[1440px] lg:max-w-none lg:shrink-0 lg:pt-[26px]">
        <MeshBackground
          className="absolute inset-x-0 top-5 h-[calc(100%-20px)] w-full text-white"
          cell={72}
          rows={8}
          amplitude={24}
          opacity={[0.12, 0.34]}
          seed={21}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- wordmark artwork */}
        <img
          src="/images/site/foan-group-logo.svg"
          alt=""
          width={339.6}
          height={203.4}
          className="relative h-[203.4px] w-[339.6px] max-w-none lg:h-[332.2px] lg:w-[554.6px]"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-[-24.58%] left-[-23.19%]"
          style={{
            backgroundImage:
              "linear-gradient(203.48deg, #0e0f0c 3.6%, rgba(14,15,12,0.52) 31.18%, #0e0f0c 68.69%)",
          }}
        />
      </div>
    </footer>
  );
}
