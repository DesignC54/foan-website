import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { WhoWeAre } from "@/components/home/who-we-are";
import { WhereWeStand } from "@/components/home/where-we-stand";
import { FiveHouses } from "@/components/home/five-houses";
import { StreamAfrixx } from "@/components/home/stream-afrixx";
import { WhitePanel } from "@/components/home/white-panel";
import { Standard } from "@/components/home/standard";

// Figma: Home — Desktop (2109:9879) / Home — Mobile (2109:9381).
// Sections sit 60px apart on desktop and 20px on mobile, as in the frames.

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-5 pb-5 lg:gap-[60px] lg:pb-[60px]">
      <Hero />
      <WhoWeAre />
      <WhereWeStand />
      <FiveHouses />
      <StreamAfrixx />
      <WhitePanel />
      <Standard />
    </div>
  );
}
