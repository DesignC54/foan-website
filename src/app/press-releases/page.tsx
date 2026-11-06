import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { CtaSection } from "@/components/site/cta-section";
import { ReleaseList } from "@/components/pages/release-list";
import { getReleases } from "@/lib/cms";

// Refresh from Sanity at most once a minute after a publish.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Press Releases",
  description:
    "Follow FOAN Group announcements, partnerships, milestones, and company news in one concise feed.",
};

// Figma: Press Releases — Desktop (2167:687) / Mobile (2167:883).

export default async function PressReleasesPage() {
  const releases = await getReleases();
  return (
    <>
      <PageHero
        tag="Press Releases"
        title="Corporate updates, published with clarity."
        intro="Follow FOAN Group announcements, partnerships, milestones, and company news in one concise feed."
      />
      <section className="max-w-frame px-gutter mx-auto pb-16 lg:pb-20">
        <ReleaseList releases={releases} />
      </section>
      <CtaSection
        tag="Connect"
        title="Connect with our"
        emphasis="leadership"
        ctas={[
          { label: "Contact us", href: "/contact/", variant: "dark" },
          { label: "Read the blog", href: "/blog/", variant: "yellow" },
        ]}
      />
      <div className="h-12 lg:h-20" />
    </>
  );
}
