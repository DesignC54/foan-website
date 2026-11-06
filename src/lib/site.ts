// Site-wide navigation and footer content.
// Labels come from the Figma design; link targets from the live foangroup.com.

export type HouseKey = "c54" | "f1" | "foanl" | "afrixx" | "future";

export type House = {
  key: HouseKey;
  name: string;
  /** Desktop dropdown shows both lines; mobile menu shows the first. */
  meta: [string, string];
  href: string;
};

export const houses: House[] = [
  {
    key: "c54",
    name: "C54News",
    meta: ["News & documentary", "Group company"],
    href: "https://c54news.com",
  },
  {
    key: "f1",
    name: "F1 Digital",
    meta: ["Studios", "Coming soon"],
    href: "https://fonedigital.foangroup.com",
  },
  {
    key: "foanl",
    name: "FOANL",
    meta: ["Communications", "Group company"],
    href: "/about/#brands",
  },
  {
    key: "afrixx",
    name: "AfrixxStreams",
    meta: ["Streaming", "Coming soon"],
    href: "https://afrixxstreams.com",
  },
  {
    key: "future",
    name: "Future One Studios",
    meta: ["Technology", "Group company"],
    href: "https://futureonestudios.com",
  },
];

export const impactLinks = [
  { label: "Blog", href: "/blog/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Video Tours", href: "/video-tours/" },
];

export type NavItem =
  | { label: string; href: string; menu?: undefined }
  | { label: string; menu: "businesses" | "impact"; href?: undefined };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Leadership", href: "/leadership/" },
  { label: "Businesses", menu: "businesses" },
  { label: "News", href: "/press-releases/" },
  { label: "Investors", href: "/about/#investors" },
  { label: "Careers", href: "/careers/" },
  { label: "Impact", menu: "impact" },
];

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/foangroup",
    icon: "/images/site/icon-instagram.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/futureoneafricanetworkglobal",
    icon: "/images/site/icon-linkedin.svg",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/foangroup",
    icon: "/images/site/icon-facebook.svg",
  },
  {
    label: "X",
    href: "https://x.com/foangroup",
    icon: "/images/site/icon-x.svg",
  },
];

export const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "Leadership", href: "/leadership/" },
      { label: "Businesses", href: "/about/#brands" },
      { label: "Impact", href: "/about/#impact" },
      { label: "Careers", href: "/careers/" },
      { label: "CSR", href: "/blog/" },
    ],
  },
  {
    title: "Businesses",
    links: houses.map((h) => ({
      label: h.key === "foanl" ? "FOAN" : h.name,
      href: h.href,
    })),
  },
  {
    title: "Connect",
    links: [
      { label: "Investor Relations", href: "/about/" },
      { label: "Newsroom", href: "/press-releases/" },
      { label: "Contact", href: "/contact/" },
      { label: "Media Enquiries", href: "mailto:media@foangroup.com" },
    ],
  },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Service", href: "/terms-of-service/" },
  { label: "Cookie Policy", href: "/cookie-policy/" },
];

export const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);
