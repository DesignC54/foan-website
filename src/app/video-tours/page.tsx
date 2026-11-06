import type { Metadata } from "next";
import { VideoTours } from "@/components/pages/video-tours";
import { videoTours } from "@/lib/media";

export const metadata: Metadata = {
  title: "Video Tours",
  description:
    "Step through FOAN Group moments, spaces, and stories in a curated reel.",
};

// Figma: Video Tours — Desktop (2380:5739) / Mobile (2380:5966);
// empty state (2169:1670).

export default function VideoToursPage() {
  return <VideoTours videos={videoTours} />;
}
