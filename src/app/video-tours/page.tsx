import type { Metadata } from "next";
import { VideoTours } from "@/components/pages/video-tours";
import { getVideoTours } from "@/lib/cms";

// Refresh from Sanity at most once a minute after a publish.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Video Tours",
  description:
    "Step through FOAN Group moments, spaces, and stories in a curated reel.",
};

// Figma: Video Tours — Desktop (2380:5739) / Mobile (2380:5966);
// empty state (2169:1670).

export default async function VideoToursPage() {
  const videoTours = await getVideoTours();
  return <VideoTours videos={videoTours} />;
}
