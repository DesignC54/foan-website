// FOAN Group Board. Names and titles verbatim from foangroup.com/leadership.
// Photo crops (object-position) follow the Figma Photo layers.

export type BoardMember = {
  slug: string;
  name: string;
  title: string;
  photo: string;
  position?: string;
};

export const board: BoardMember[] = [
  {
    slug: "patrick-utomi",
    name: "Professor Patrick Utomi",
    title: "Chairman of the Board",
    photo: "/images/about/board-utomi.webp",
    position: "50% 20%",
  },
  {
    slug: "ummi-mohammed",
    name: "Dr. Ummi K. Mohammed",
    title: "Secretary of the Board",
    photo: "/images/about/board-ummi.webp",
    position: "50% 30%",
  },
  {
    slug: "idris-etanami-usman",
    name: "Mr. Idris-Etanami Usman",
    title: "Group Chief Executive Officer",
    photo: "/images/about/board-usman.webp",
    position: "50% 25%",
  },
  {
    slug: "agbo-madaki",
    name: "Professor Agbo Madaki",
    title: "Director",
    photo: "/images/about/board-madaki.webp",
    position: "50% 25%",
  },
  {
    slug: "bukola-olusola-alabi",
    name: "Ms. Bukola Olusola-Alabi",
    title: "Director",
    photo: "/images/about/board-olusola-alabi.webp",
    position: "50% 25%",
  },
  {
    slug: "grace-ihonvbere",
    name: "Chief Mrs. Grace Ihonvbere",
    title: "Director",
    photo: "/images/about/board-ihonvbere.webp",
    position: "50% 25%",
  },
];
