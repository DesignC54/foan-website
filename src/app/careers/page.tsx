import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Lime, PageHero } from "@/components/site/page-hero";
import { CtaSection } from "@/components/site/cta-section";
import { getRoles } from "@/lib/cms";

// Refresh from Sanity at most once a minute after a publish.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers",
  description:
    "We are building with people who choose global standards over local comfort. Every role is measured against the best in the world.",
};

// Figma: Careers — Desktop (2167:360) / Mobile (2167:532).

export default async function CareersPage() {
  const roles = await getRoles();
  return (
    <>
      <PageHero
        tag="Careers"
        size="display"
        title={
          <>
            Build what Africa <Lime>has not built before.</Lime>
          </>
        }
        intro="We are building with people who choose global standards over local comfort. Every role is measured against the best in the world."
      >
        <Button label="See open roles" href="#open-roles" variant="lime" />
        <Button label="About the Group" href="/about/" variant="white" />
      </PageHero>

      <div className="max-w-frame px-gutter mx-auto">
        <div
          data-theme="dark"
          data-reveal-img
          className="relative h-[280px] overflow-clip rounded-lg md:h-[400px] lg:h-[520px]"
        >
          <Image
            src="/images/about/towers-colour.webp"
            alt=""
            fill
            sizes="(min-width: 1440px) 1320px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Execution */}
      <section className="max-w-frame px-gutter mx-auto py-16 lg:py-20">
        <div
          data-reveal
          className="flex flex-col gap-6 md:flex-row md:gap-10 lg:gap-20"
        >
          <h2 className="type-h1 text-primary md:w-[46%] md:shrink-0 lg:w-[600px]">
            Vision must be matched with <Lime>execution.</Lime>
          </h2>
          <p className="type-body-xl text-secondary">
            Our leadership philosophy rests on mentorship, meritocracy, and
            accountability. We look for people who are both innovators and
            custodians of the Group’s integrity, and we give them the scale to
            prove it.
          </p>
        </div>
      </section>

      {/* Open roles */}
      <section
        id="open-roles"
        className="max-w-frame px-gutter mx-auto flex scroll-mt-28 flex-col gap-10 pb-16 lg:gap-12 lg:pb-20"
      >
        <div data-reveal className="flex flex-col gap-5">
          <Tag label="Open roles" />
          <h2 className="type-h2 text-primary">
            Current <Lime>opportunities</Lime>
          </h2>
          <p className="type-body-l text-secondary lg:w-[760px]">
            Browse the latest openings across the FOAN Group ecosystem.
          </p>
        </div>
        <ul data-reveal-group className="flex flex-col gap-4">
          {roles.map((r) => (
            <li
              key={r.title}
              className="border-subtle bg-surface hover:border-default flex flex-col gap-6 rounded-sm border p-6 transition-colors md:flex-row md:items-center md:gap-10 md:px-10 md:py-8"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="type-label-overline text-accent-text">
                    Position
                  </span>
                  <span className="bg-accent type-label-small text-on-accent rounded-full px-3 py-1.5">
                    Open
                  </span>
                </div>
                <p className="type-h3 text-primary">{r.title}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-surface-raised type-label-small text-secondary rounded-full px-3 py-1.5">
                    {r.mode}
                  </span>
                  <span className="type-body-s text-tertiary">
                    Applications are reviewed through the external application
                    link.
                  </span>
                </div>
              </div>
              <Button
                label="Apply now"
                href={r.href}
                variant="lime"
                className="self-start md:self-auto"
              />
            </li>
          ))}
        </ul>
      </section>

      <CtaSection
        tag="Connect"
        title="Connect with our"
        emphasis="leadership"
        ctas={[
          { label: "Explore roles", href: "#open-roles", variant: "dark" },
          { label: "Contact us", href: "/contact/", variant: "yellow" },
        ]}
      />
      <div className="h-12 lg:h-20" />
    </>
  );
}
