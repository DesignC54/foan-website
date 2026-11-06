import type { Metadata } from "next";
import {
  Board,
  Chairman,
  LeadershipHero,
  Offices,
  Principles,
  Reserved,
} from "@/components/leadership/sections";
import { CtaSection } from "@/components/site/cta-section";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The FOAN Group Board of Directors, inaugurated on 31 March 2026 under the chairmanship of Professor Pat Utomi: the forum in which strategy, capital, risk and appointments are decided.",
};

// Figma: Leadership — Desktop (2164:14) / Leadership — Mobile (2164:254).

export default function LeadershipPage() {
  return (
    <>
      <LeadershipHero />
      <Chairman />
      <Board />
      <Reserved />
      <Principles />
      <Offices />
      <CtaSection
        tag="Connect"
        title="Connect with our"
        emphasis="leadership."
        ctas={[
          { label: "Contact us", href: "/contact/", variant: "dark" },
          { label: "Careers", href: "/careers/", variant: "yellow" },
        ]}
      />
      <div className="h-12 lg:h-20" />
    </>
  );
}
