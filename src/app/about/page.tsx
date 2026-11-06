import type { Metadata } from "next";
import {
  AboutHero,
  AtAGlance,
  Governance,
  Infrastructure,
  People,
  SingleView,
  SixValues,
  Statement,
  VisionMissionValues,
  WhereTheGroupStands,
} from "@/components/about/sections";
import { FiveHouses } from "@/components/home/five-houses";
import { CtaSection } from "@/components/site/cta-section";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about/" },
  description:
    "FOAN Group is a media, technology and data holding company headquartered in Abuja, built to occupy the layer between Africa's information and the value its attention generates.",
};

// Figma: About — Desktop (2297:4696) / About — Mobile (2303:4915).

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <SingleView />
      <AtAGlance />
      <WhereTheGroupStands />
      <Governance />
      <VisionMissionValues />
      <SixValues />
      <Infrastructure />
      <FiveHouses />
      <People />
      <Statement />
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
