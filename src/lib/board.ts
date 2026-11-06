// FOAN Group Board. Names, titles and biographies verbatim from the design
// (sourced from foangroup.com/leadership). Photo crops follow Figma.

export type BoardMember = {
  slug: string;
  name: string;
  title: string;
  photo: string;
  position?: string;
  bio: string[];
};

export const chairman: BoardMember = {
  slug: "patrick-utomi",
  name: "Professor Patrick Utomi",
  title: "Chairman of the Board",
  photo: "/images/about/board-utomi.webp",
  position: "50% 20%",
  bio: [
    "Professor Pat Utomi brings an unparalleled multi-sectoral pedigree to the Board of the FOAN Group, epitomizing high-fidelity leadership across academia, business, and state governance. A visionary scholar operator, he earned two Master’s degrees and a PhD by age 26, attained a Presidential Advisory role at 27, and reached the peak of manufacturing management before his 33rd birthday, later achieving global acclaim as a Professor of Business, Political Economy, and Media Studies. As a prolific enterprise architect, Prof. Utomi has founded and cofounded diverse ventures spanning ICT, financial services, media, and agriculture, notably serving as Vice Chairman of Platinum-Habib Bank and Chairman of BusinessDay Media Limited.",
  ],
};

export const directors: BoardMember[] = [
  {
    slug: "ummi-mohammed",
    name: "Dr. Ummi K. Mohammed",
    title: "Secretary of the Board",
    photo: "/images/about/board-ummi.webp",
    position: "50% 30%",
    bio: [
      "Dr. Ummi Khalthum Mohammed is a climate change expert, researcher, senior lecturer, and environmental management specialist. She works with Bayero University Kano and has expertise in sustainability, natural resource management, environmental governance, data analysis, project management, and community development.",
      "She also has excellent communication and media engagement skills, for dissemination of information relevant to contemporary issues bordering on sustainable development.",
    ],
  },
  {
    slug: "idris-etanami-usman",
    name: "Mr. Idris-Etanami Usman",
    title: "Group Chief Executive Officer",
    photo: "/images/about/board-usman.webp",
    position: "50% 25%",
    bio: [
      "Idris-Etanami Usman is a visionary Nigerian media entrepreneur, technology executive, and rights activist who serves as the Group Chief Executive Officer of the FOAN Group (Media, Technology, Data). As the pioneering founder of C54News, a global tech-driven news platform engineered to operate seamlessly across all 54 African countries, he has committed his career to building pan-African digital broadcasting infrastructure designed to challenge and reshape legacy Western media narratives. Under his strategic direction, the FOAN Group has disrupted global news delivery by leveraging cutting-edge technology, a vision highlighted by his spearheading of Future One Africa TV (FOA) a digital television network showcasing authentic African stories backed by an initial $7 million investment across major hubs in Lagos, Nairobi, South Africa, and London. Beyond his commercial ventures, Usman acts as the Executive Director of the Sustainable Initiative for Nurturing Growth (SING) Nigeria, where he serves as a leading voice for institutional advancement, actively challenging policymakers and financial institutions to recognize creative intellectual property and copyrights as serious, bankable corporate assets rather than mere cultural decorations.",
    ],
  },
  {
    slug: "agbo-madaki",
    name: "Professor Agbo Madaki",
    title: "Director",
    photo: "/images/about/board-madaki.webp",
    position: "50% 25%",
    bio: [
      "Professor Agbo J. Madaki brings extensive legal expertise and academic leadership to the Board of the FOAN Group. As a distinguished Professor of International Human Rights Law and International Humanitarian Law, he has a proven track record of teaching and conducting legal research at prominent universities across both Nigeria and Kenya. His cross-border experience in diverse African higher education systems provides him with a deep understanding of transnational legal frameworks, corporate governance, and regulatory environments across the continent. Professor Madaki’s ability to combine rigorous academic theory with practical, international legal insights ensures that the FOAN Group maintains absolute structural compliance and strategic alignment as it executes its pan-African expansion in media, education, and social enterprise.",
    ],
  },
  {
    slug: "bukola-olusola-alabi",
    name: "Ms. Bukola Olusola-Alabi",
    title: "Director",
    photo: "/images/about/board-olusola-alabi.webp",
    position: "50% 25%",
    bio: [
      "Olusola-Alabi Bukola Cherry brings a powerful combination of financial acumen, institutional administration, and strategic resource development to the Board of the FOAN Group. Her background is anchored by a Chartered Banker MBA, which enables her to seamlessly blend technical depth in corporate finance and advanced Customer Relationship Management (CRM) with sustainable business models. During her tenure at Epitome Group, her leadership in finance and administration focused on refining financial strategies and driving operational excellence, creating solid frameworks to support the organization's broader developmental goals. Furthermore, her previous role as Fund Development Manager at SOS Children's Villages Nigeria highlighted her ability to manage complex stakeholder relationships, deploy high-impact fundraising strategies, and design robust fiscal systems that align economic performance with corporate purpose. Olusola-Alabi's expertise in structural budgeting, relationship governance, and value-driven resource optimization ensures she provides the precise oversight and strategic depth required to advance the FOAN Group's pan-African commercial and social initiatives.",
    ],
  },
  {
    slug: "grace-ihonvbere",
    name: "Chief Mrs. Grace Ihonvbere",
    title: "Director",
    photo: "/images/about/board-ihonvbere.webp",
    position: "50% 25%",
    bio: [
      "Chief Mrs. Grace Edirin Ihonvbere brings a distinguished legacy of strategic governance, community leadership, and organizational excellence to the Board of the FOAN Group. Widely recognized as the Olohijere of Iuleha and a premier administrative leader, she has demonstrated an exceptional capacity for institutional stewardship through her high-profile appointment to the Board of the IBB International Golf and Country Club, having previously served with distinction as the club's Lady Captain. In addition to her elite administrative and sporting background, Chief Mrs. Ihonvbere is a committed philanthropist and a key pillar of community development in the region, bringing an invaluable understanding of high-level partnership, stakeholder diplomacy, and collaborative leadership alongside her husband, Professor Julius Ihonvbere, the Majority Leader of the Nigerian House of Representatives. Her vast network, coupled with her proven track record of elevating complex organizational structures to new operational heights, ensures she infuses the FOAN Group with the critical relationship intelligence, corporate polish, and governance depth required to guide our expanding pan-African portfolios.",
    ],
  },
  {
    slug: "barnabas-arastus",
    name: "Rev. (Dr) Barnabas Arastus",
    title: "Director",
    photo: "/images/about/board-arastus.webp",
    position: "50% 30%",
    bio: [
      "Rev. Dr. Barnabas Aratus Nyawebowe joins the Board of the FOAN Group, bringing a rare and dynamic fusion of strategic foresight, technological depth, and institutional leadership. As the North-West Regional Director for House on the Rock Church Nigeria and Resident Pastor of The Mission House in Kaduna, Dr. Aratus has established an unassailable track record in high-stakes human capital development and organizational governance. His exceptional academic profile spans a PhD in Strategic Foresight from DOXA Leadership Theological Institute, honors in Software Engineering from NIIT, and European Business Competence Licenses (Levels A and B), balanced by top honors in Homiletics from the School of End Time Ministerial Anointing (S.E.T.M.A.). A former Chairman of the Pentecostal Fellowship of Nigeria (PFN) for Kaduna North LGA, he is a seasoned life coach who pioneered a premier leadership academy that has trained hundreds of graduates in Strategic Christian Leadership. Renowned for driving high-impact community interventions such as free medical outreach programs for vulnerable northern populations and commanding national platforms like the RESET Conference, Dr. Aratus infuses the FOAN Group Board with the precise psychological clarity, systemic tracking expertise, and visionary leadership required to pilot our expanding multi-sectoral operations across Africa.",
    ],
  },
];

/** About page grid: the chairman plus the first five directors (as designed). */
export const board: BoardMember[] = [chairman, ...directors.slice(0, 5)];
