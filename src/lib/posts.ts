// Blog posts from the live foangroup.com/blog (text verbatim).
// Temporary home until Sanity: the same shapes will come from the CMS.

/** A block of article body. Sanity's Portable Text will map onto these. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
  image: string;
  body: Block[];
  gallery: { src: string; caption: string }[];
};

const p = (text: string): Block => ({ type: "p", text });
const h = (text: string): Block => ({ type: "h2", text });

export const posts: Post[] = [
  {
    slug: "january-progress-report-on-c54news-launch",
    title: "January Progress Report on C54NEWS Launch",
    date: "January 28, 2026",
    categories: ["Technology", "Business", "Design", "Lifestyle"],
    excerpt:
      "Building the Global Backbone of C54NEWS. January marked a defining phase in the build journey of C54 NEWS. It was a month focused not on announcements, but on infrastructure, alignment, and execution...",
    image: "/images/blog/jan-main.webp",
    body: [
      h("Building the Global Backbone of C54NEWS"),
      p(
        "January marked a defining phase in the build journey of C54 NEWS. It was a month focused not on announcements, but on infrastructure, alignment, and execution across China's most advanced technology corridors. As the countdown to launch continues, the work carried out in January reflects a deliberate effort to secure the systems, partnerships, and technical depth required to operate C54 NEWS as a truly global technology news platform.",
      ),
      p(
        "At the center of these engagements was the Group Chief Executive Officer of FOAN Group, Idris Etanami Usman, working directly with technology manufacturers, infrastructure builders, and platform partners whose capabilities sit at the core of modern global media systems.",
      ),
      h("Strategic Technology Alignment with Voidtech in Shenzhen"),
      p(
        "One of the most significant engagements of the month took place in Shenzhen with Voidtech, one of the city's strongest and most established technology companies. This meeting brought together the FOAN Group leadership team and Voidtech's executive management to advance discussions around a solid backbone partnership.",
      ),
      p(
        "The focus of the engagement was C54 NEWS and the technology systems already developed to support large scale, real time, multi market news operations. Conversations centered on reinforcing broadcast infrastructure, digital distribution systems, and platform reliability at a level suitable for global reach.",
      ),
      p(
        "This was not framed as a vendor relationship. It was approached as a structural partnership where engineering depth, system resilience, and long term scalability are embedded into the core of C54 NEWS operations. The outcome of the meeting confirmed strong alignment on technical vision and execution standards, setting the stage for deeper collaboration as formal frameworks progress.",
      ),
      h("Expanding Live TV and Hardware Partnerships with AOWE"),
      p(
        "January also saw a successful visit to AOWE, a leading technology screen manufacturing company in China. AOWE is recognized for manufacturing television screens for major global brands, with established market presence across Central Africa and Eastern Africa.",
      ),
      p(
        "Discussions with AOWE focused on live television integration, hardware level collaboration, and expansion of C54 NEWS distribution through smart TV ecosystems. The engagement explored how C54 NEWS can be embedded more directly into television manufacturing pipelines, strengthening its presence across OTT platforms and traditional viewing environments.",
      ),
      p(
        "The meeting reinforced FOAN Group's strategy of partnering directly with TV manufacturers rather than relying solely on third party distribution channels. This approach ensures tighter control over quality, reach, and long term scalability. The discussions were productive and are positioned as an extension of FOAN Group's ongoing commitment to expanding C54 NEWS distribution across global markets.",
      ),
      h("Continuity from the JAV Partnership in Shenzhen"),
      p(
        "The January engagements also served as a continuation of the partnership groundwork established last year with JAV in Shenzhen. That collaboration laid the foundation for FOAN Group's approach to China based technology partnerships, emphasizing long term system integration rather than isolated solutions.",
      ),
      p(
        "The progress made this January reflects continuity, discipline, and follow through. Each new engagement builds on previous relationships, strengthening a growing ecosystem of partners aligned with the technical and operational demands of C54 NEWS.",
      ),
      h("Advancing AI Infrastructure with LIAN LI"),
      p(
        "A major pillar of January's progress was FOAN Group's engagement with LIAN LI, a globally respected server and systems engineering company known for building advanced AI super servers.",
      ),
      p(
        "C54 NEWS is in the process of deploying one of its most advanced AI driven server infrastructures to date. The engagement with LIAN LI focused on high performance server architecture, thermal efficiency, scalability, and reliability required to support intensive AI workloads.",
      ),
      p(
        "These systems are designed to power real time analytics, intelligent content workflows, automation, and data driven decision making across the entire C54 NEWS operation. This infrastructure is not an upgrade. It is foundational to C54 NEWS's ambition to redefine how technology driven journalism operates at global scale.",
      ),
      p(
        "The work with LIAN LI ensures that C54 NEWS remains technically prepared to adapt, expand, and innovate as media systems evolve.",
      ),
      h("A Month That Defined Direction"),
      p(
        "January was not about visibility. It was about structure. It was about putting the right systems in place, working with the right builders, and making decisions that will matter years from now.",
      ),
      p(
        "From infrastructure partnerships with Voidtech, to live TV manufacturing discussions with AOWE, to AI server deployment with LIAN LI, and the continued momentum from the JAV partnership, the month delivered tangible progress across every critical layer of the C54 NEWS ecosystem.",
      ),
      p(
        "As FOAN Group moves closer to the launch of C54 NEWS, the work completed in January stands as proof of intent. This is a platform being built with patience, precision, and global standards firmly in view.",
      ),
    ],
    gallery: [
      {
        src: "/images/blog/jan-3.webp",
        caption: "Advancing AI Infrastructure",
      },
      {
        src: "/images/blog/jan-4.webp",
        caption: "Advancing AI Infrastructure",
      },
      {
        src: "/images/blog/jan-1.webp",
        caption: "Expanding Live TV and Hardware Partnerships",
      },
      {
        src: "/images/blog/jan-2.webp",
        caption: "Expanding Live TV and Hardware Partnerships",
      },
      {
        src: "/images/blog/jan-5.webp",
        caption: "Strategic Technology Alignment with Voidtech",
      },
      {
        src: "/images/blog/jan-6.webp",
        caption: "Strategic Technology Alignment with Voidtech",
      },
      {
        src: "/images/blog/jan-main.webp",
        caption: "Brainstorming Sessions with strategists",
      },
    ],
  },
  {
    slug: "foan-group-csr-supporting-environmental-awareness-through-city-nature-challenge-kano-2025",
    title:
      "FOAN Group CSR: Supporting Environmental Awareness Through City Nature Challenge Kano 2025",
    date: "May 6, 2025",
    categories: ["Corporate Social Responsibility"],
    excerpt:
      "As part of our Corporate Social Responsibility (CSR) commitment to environmental sustainability and community engagement, FOAN Group is proud to sponsor the City Nature Challenge Kano 2025. This initiative empowers ci...",
    image: "/images/pages/csr-kano-2025.webp",
    body: [
      p(
        "As part of our Corporate Social Responsibility (CSR) commitment to environmental sustainability and community engagement, FOAN Group is proud to sponsor the City Nature Challenge Kano 2025.",
      ),
      p(
        "This initiative empowers citizens to explore nature, document Kano’s rich biodiversity, and contribute to global conservation efforts using the iNaturalist app. From nature walks to interactive biodiversity mapping, it’s a celebration of knowledge, conservation, and community.",
      ),
      {
        type: "quote",
        text: "Together, we’re putting Kano and Africa on the global biodiversity map.",
      },
    ],
    gallery: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
      src: `/images/blog/csr-${n}.webp`,
      caption: "City Nature Challenge Kano 2025",
    })),
  },
];

export const blogCategories = [
  "Technology",
  "Business",
  "Design",
  "Lifestyle",
  "Corporate Social Responsibility",
];
