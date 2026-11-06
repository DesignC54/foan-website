// Gallery and Video Tours. The live site has no items yet, so these are the
// placeholder items from the Figma "· with content" frames, using photos we
// already hold. Empty either array to see the designed empty state.
// Sanity will replace both lists.

export const galleryFilters = [
  "All",
  "Events",
  "Leadership",
  "Community",
  "Production",
  "Spaces",
] as const;

export type GalleryItem = {
  title: string;
  category: (typeof galleryFilters)[number];
  date: string;
  image: string;
};

export const galleryItems: GalleryItem[] = [
  {
    title: "Community outreach day in Uyo",
    category: "Community",
    date: "March 2026",
    image: "/images/pages/csr-kano-2025.webp",
  },
  {
    title: "Board strategy session, Abuja",
    category: "Leadership",
    date: "February 2026",
    image: "/images/blog/jan-main.webp",
  },
  {
    title: "Dakkada Tower at dusk",
    category: "Spaces",
    date: "January 2026",
    image: "/images/about/towers-blue.webp",
  },
  {
    title: "Story mapping for the new season",
    category: "Production",
    date: "January 2026",
    image: "/images/about/value-craft.webp",
  },
  {
    title: "Partnership signing, Dubai",
    category: "Events",
    date: "December 2025",
    image: "/images/about/value-ownership.webp",
  },
  {
    title: "Newsroom fact-check desk",
    category: "Production",
    date: "December 2025",
    image: "/images/about/value-verification.webp",
  },
  {
    title: "Global Streaming Hub exterior",
    category: "Spaces",
    date: "November 2025",
    image: "/images/about/towers-colour.webp",
  },
  {
    title: "Annex office, 19th floor",
    category: "Spaces",
    date: "November 2025",
    image: "/images/home/photo-pyramid.webp",
  },
  {
    title: "Family day at the Group",
    category: "Community",
    date: "October 2025",
    image: "/images/about/value-legacy.webp",
  },
];

export type VideoTour = {
  title: string;
  category: string;
  location: string;
  duration: string;
  poster: string;
  /** YouTube video ID. Without one the stage shows the poster only. */
  youtubeId?: string;
};

export const videoTours: VideoTour[] = [
  {
    title: "Inside the Global Streaming Hub",
    category: "Spaces",
    location: "Uyo, Nigeria",
    duration: "04:32",
    poster: "/images/about/towers-blue.webp",
  },
  {
    title: "A day in the C54News newsroom",
    category: "Production",
    location: "Uyo, Nigeria",
    duration: "06:10",
    poster: "/images/about/value-verification.webp",
  },
  {
    title: "Community outreach in Uyo",
    category: "Community",
    location: "Akwa Ibom, Nigeria",
    duration: "03:45",
    poster: "/images/pages/csr-kano-2025.webp",
  },
  {
    title: "Board strategy session",
    category: "Leadership",
    location: "Abuja, Nigeria",
    duration: "02:58",
    poster: "/images/blog/jan-main.webp",
  },
  {
    title: "Signing the Dubai partnership",
    category: "Events",
    location: "Dubai, UAE",
    duration: "05:21",
    poster: "/images/about/value-ownership.webp",
  },
  {
    title: "Story mapping the new season",
    category: "Production",
    location: "Nairobi, Kenya",
    duration: "03:12",
    poster: "/images/about/value-craft.webp",
  },
  {
    title: "The Annex office tour",
    category: "Spaces",
    location: "Uyo, Nigeria",
    duration: "04:05",
    poster: "/images/home/photo-pyramid.webp",
  },
  {
    title: "Building for the next generation",
    category: "Community",
    location: "Lagos, Nigeria",
    duration: "02:40",
    poster: "/images/about/value-legacy.webp",
  },
];
