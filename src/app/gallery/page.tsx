import type { Metadata } from "next";
import { Lime, PageHero } from "@/components/site/page-hero";
import { GalleryGrid } from "@/components/pages/gallery-grid";
import { getGallery } from "@/lib/cms";

// Refresh from Sanity at most once a minute after a publish.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gallery",
  alternates: { canonical: "/gallery/" },
  description:
    "Highlights from events, leadership activities, community work, and production moments across FOAN Group.",
};

// Figma: Gallery — Desktop (2379:5574) / Mobile (2379:5759);
// empty state (2169:1475 / 2169:1582).

export default async function GalleryPage() {
  const galleryItems = await getGallery();
  return (
    <>
      <PageHero
        tag="Gallery"
        size="display"
        title={
          <>
            A visual archive of the Group <Lime>in motion.</Lime>
          </>
        }
        intro="Explore highlights from events, leadership activities, community work, and production moments."
      />
      <section className="max-w-frame px-gutter mx-auto pb-16 lg:pb-20">
        <GalleryGrid items={galleryItems} />
      </section>
    </>
  );
}
