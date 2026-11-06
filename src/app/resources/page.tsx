import type { Metadata } from "next";
import Image from "next/image";
import { MaskIcon } from "@/components/ui/mask-icon";
import { Lime, PageHero } from "@/components/site/page-hero";
import { getResources } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Resources",
  description: "Download our latest documents, reports, and other materials.",
};

// Figma: Resources — Desktop (2168:1081) / Mobile (2168:1196).

export default async function ResourcesPage() {
  const resources = await getResources();
  return (
    <>
      <PageHero
        tag="Resources"
        title="Resources"
        intro="Download our latest documents, reports, and other materials."
      />
      <section className="max-w-frame px-gutter mx-auto flex flex-col gap-10 pb-16 lg:gap-12 lg:pb-20">
        <h2 data-reveal className="type-h2 text-primary">
          Our <Lime>Resources</Lime>
        </h2>
        <div data-reveal-group className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {resources.map((r) => (
            <a
              key={r.title}
              href={r.href}
              download
              className="group border-subtle bg-surface hover:border-default flex flex-col-reverse gap-6 rounded-sm border p-5 transition-colors sm:flex-row sm:gap-7 lg:p-6"
            >
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 sm:py-4 sm:pl-4">
                <p className="type-h2 text-primary">{r.title}</p>
                <span className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-full bg-lime-500 text-black transition-transform group-hover:translate-y-0.5">
                    <MaskIcon
                      src="/images/site/icon-arrow-right.svg"
                      className="size-5 rotate-90"
                    />
                  </span>
                  <span className="type-label-button text-secondary">
                    Download PDF
                  </span>
                </span>
              </div>
              {/* Document cover (brand purple, fixed in both themes) */}
              <div
                data-theme="dark"
                className="bg-f1-purple flex h-[260px] shrink-0 flex-col justify-between overflow-clip rounded-xs p-6 transition-transform duration-500 group-hover:-rotate-1 sm:h-[300px] sm:w-[220px] lg:w-[260px]"
              >
                <Image
                  src="/images/site/foan-logo.webp"
                  alt=""
                  width={240}
                  height={146}
                  className="h-[58px] w-24 object-contain object-left"
                />
                <p className="type-h4 text-white">{r.title}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
