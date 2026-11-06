import type { Metadata } from "next";
import { Tag } from "@/components/ui/tag";
import { CtaSection } from "@/components/site/cta-section";
import { BlogList } from "@/components/pages/blog-list";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Company news, commentary and Corporate Social Responsibility updates from FOAN Group.",
};

// Figma: CSR — Desktop (2168:744) / Mobile (2168:921). The nav's Impact › Blog
// and the footer's CSR both land here, opened on the CSR category as designed.

export default function BlogPage() {
  return (
    <>
      <section className="relative overflow-clip">
        {/* eslint-disable-next-line @next/next/no-img-element -- glow */}
        <img
          src="/images/about/hero-glow.svg"
          alt=""
          className="intro-fade light:opacity-40 pointer-events-none absolute top-[-260px] left-1/2 h-[700px] w-[1200px] max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_92%)]"
        />
        <div className="max-w-frame px-gutter nav:pt-[184px] relative mx-auto flex flex-col pt-[96px] pb-16 md:pt-[120px] lg:pb-20">
          <div
            className="intro-up mb-6 flex justify-center lg:mb-10"
            style={{ "--d": "100ms" } as React.CSSProperties}
          >
            <Tag label="Blog" />
          </div>
          <BlogList posts={posts} initial="Corporate Social Responsibility" />
        </div>
      </section>
      <CtaSection
        tag="Connect"
        title="Connect with our"
        emphasis="leadership"
        ctas={[
          { label: "Leadership", href: "/leadership/", variant: "dark" },
          {
            label: "Press releases",
            href: "/press-releases/",
            variant: "yellow",
          },
        ]}
      />
      <div className="h-12 lg:h-20" />
    </>
  );
}
