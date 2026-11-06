// Page content from the live foangroup.com (titles, dates, sources, links).
// Temporary home until Sanity: the same shapes will come from the CMS.

export type Release = {
  title: string;
  date: string;
  source: string;
  href: string;
};

export const releases: Release[] = [
  {
    title:
      "FOAN Group Deepens Technology Drive As C54 News Readies For May 2026 Launch",
    date: "November 1, 2025",
    source: "independent.ng",
    href: "https://independent.ng/foan-group-deepens-technology-drive-as-c54-news-readies-for-may-2026-launch/",
  },
  {
    title: "C54 News set for May 2026 launch",
    date: "November 1, 2025",
    source: "www.vanguardngr.com",
    href: "https://www.vanguardngr.com/2025/09/c54-news-set-for-may-2026-launch/",
  },
  {
    title: "Future Of Global News – Why Africa Needs To Control Its Narrative",
    date: "November 1, 2025",
    source: "independent.ng",
    href: "https://independent.ng/future-of-global-news-why-africa-needs-to-control-its-narrative/",
  },
  {
    title:
      "The future of global news – Why Africa needs to control its narrative",
    date: "November 1, 2025",
    source: "guardian.ng",
    href: "https://guardian.ng/opinion/letters/the-future-of-global-news-why-africa-needs-to-control-its-narrative/",
  },
  {
    title:
      "C54 News Set to Redefine Global News and Documentary Landscape with Unmatched Digital Power",
    date: "November 1, 2025",
    source: "techcabal.com",
    href: "https://techcabal.com/2025/04/02/c54-news-set-to-redefine-global-news-and-documentary-landscape-with-unmatched-digital-power/",
  },
  {
    title:
      "C54 News poised to disrupt global media with cutting-edge technology",
    date: "November 1, 2025",
    source: "guardian.ng",
    href: "https://guardian.ng/news/c54-news-poised-to-disrupt-global-media-with-cutting-edge-technology/",
  },
  {
    title: "NBC gives green light to C54News",
    date: "November 1, 2025",
    source: "thesun.ng",
    href: "https://thesun.ng/nbc-gives-greenlight-to-c54news/",
  },
  {
    title: "C54 News Channel Will Redefine Journalism In Africa",
    date: "November 1, 2025",
    source: "leadership.ng",
    href: "https://leadership.ng/c54-news-channel-will-redefine-journalism-in-africa",
  },
  {
    title:
      "How We'll Counter Western Media's Wrong Narratives About Africa – FOA Africa TV Boss",
    date: "November 1, 2025",
    source: "dailytrust.com",
    href: "https://dailytrust.com/how-well-counter-western-medias-wrong-narratives-about-africa-foa-africa-tv-boss/",
  },
  {
    title:
      "Our vision is to correct wrong narratives about Africa in foreign media—Usman",
    date: "November 1, 2025",
    source: "tribuneonlineng.com",
    href: "https://tribuneonlineng.com/our-vision-is-to-correct-wrong-narratives-about-africa-in-foreign-media-usman/",
  },
  {
    title: "Idris Etanami Usman: The making of innovative media guru",
    date: "November 1, 2025",
    source: "thesun.ng",
    href: "https://thesun.ng/idris-etanami-usman-the-making-of-innovative-media-guru/",
  },
];

export type Role = { title: string; mode: string; href: string };

export const roles: Role[] = [
  {
    title: "Guest Experience Executive",
    mode: "On-site",
    href: "https://emp.jobylon.com/jobs/370177/",
  },
  {
    title: "Content & Community Growth Coordinator",
    mode: "On-site",
    href: "https://emp.jobylon.com/jobs/370209/",
  },
  {
    title: "Office Manager",
    mode: "On-site",
    href: "https://emp.jobylon.com/jobs/370210/",
  },
];

export type Resource = { title: string; href: string };

export const resources: Resource[] = [
  {
    title: "FOANGroup Company Profile",
    href: "/files/foan-group-company-profile.pdf",
  },
  {
    title: "ANNUAL REPORT 2025",
    href: "/files/foan-group-annual-report-2025.pdf",
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
};

export const posts: Post[] = [
  {
    slug: "foan-group-csr-supporting-environmental-awareness-through-city-nature-challenge-kano-2025",
    title:
      "FOAN Group CSR: Supporting Environmental Awareness Through City Nature Challenge Kano 2025",
    date: "May 6, 2025",
    category: "Corporate Social Responsibility",
    excerpt:
      "As part of our Corporate Social Responsibility (CSR) commitment to environmental sustainability and community engagement, FOAN Group is proud to sponsor the City Nature Challenge Kano 2025. This initiative empowers ci...",
    image: "/images/pages/csr-kano-2025.webp",
  },
];

export const blogCategories = [
  "Technology",
  "Business",
  "Design",
  "Lifestyle",
  "Corporate Social Responsibility",
];
