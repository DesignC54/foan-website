// Starting text for the legal pages, written to match what this website
// actually does (no tracking cookies; theme choice in localStorage; YouTube
// in privacy-enhanced mode; contact form). FOR LEGAL REVIEW before launch.
// Editors change it in Sanity (Legal pages); this file is the fallback and the
// source of the first import.

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type LegalPage = {
  slug: "privacy-policy" | "terms-of-service" | "cookie-policy";
  title: string;
  summary: string;
  updated: string; // ISO date
  body: LegalBlock[];
};

const p = (text: string): LegalBlock => ({ type: "p", text });
const h = (text: string): LegalBlock => ({ type: "h2", text });
const ul = (...items: string[]): LegalBlock => ({ type: "ul", items });

const contact =
  "FOAN Group, 628 Sunday Adewusi Street, Guzape, FCT Abuja, Nigeria. Email: info@foangroup.com. Phone: +234 811 111 1393.";

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary:
      "What personal information this website collects, why, and the choices you have.",
    updated: "2026-11-06",
    body: [
      p(
        "FOAN Group (“FOAN”, “we”, “us”) respects your privacy. This policy explains how we handle personal information collected through foangroup.com (the “Website”). It is written to meet the Nigeria Data Protection Act 2023 and, where it applies to you, the EU and UK General Data Protection Regulation.",
      ),
      h("Who is responsible"),
      p(`The data controller is FOAN Group. ${contact}`),
      h("What we collect"),
      ul(
        "Information you send us: your name, email address, phone number, company, subject and message when you use the contact form or email us.",
        "Job applications: these are handled on our recruitment partner’s site (Jobylon), under its own privacy notice.",
        "Technical information: our hosting provider records standard server logs (such as IP address, browser type and the pages requested) to keep the Website secure and working.",
        "Your theme choice (light or dark), stored only in your own browser. It is never sent to us.",
      ),
      p(
        "We do not use advertising or tracking cookies, and we do not sell personal information.",
      ),
      h("Why we use it"),
      ul(
        "To reply to your enquiry and route it to the right team or Group company (our legitimate interest, or steps you ask for before a contract).",
        "To keep the Website secure, prevent abuse and fix problems (our legitimate interest).",
        "To meet legal obligations, where they apply.",
      ),
      h("Who we share it with"),
      p(
        "We share personal information only as needed to run the Website and answer you: our hosting and email providers, our content management provider, and the FOAN Group company your enquiry concerns (C54News, F1 Digital, FOANL, Afrixx Streams or FutureOne Studio). These providers act on our instructions. Some of them process data outside Nigeria; where they do, we rely on the safeguards the law requires.",
      ),
      h("How long we keep it"),
      p(
        "Enquiries are kept for up to 24 months after our last contact with you, unless we need them longer for a legal reason. Server logs are kept for a short period set by our hosting provider.",
      ),
      h("Your rights"),
      p(
        "You can ask to access, correct or delete your personal information, object to or restrict how we use it, ask for a copy to move elsewhere, and withdraw consent where we rely on it. Write to info@foangroup.com. We reply within 30 days. You can also complain to the Nigeria Data Protection Commission (ndpc.gov.ng) or your local data protection authority.",
      ),
      h("Security"),
      p(
        "The Website is served over HTTPS, and access to our systems is limited to the people who need it. No system is completely secure, so please do not send sensitive information through the contact form.",
      ),
      h("Embedded videos and links"),
      p(
        "Video tours play from YouTube in privacy-enhanced mode, which sets no YouTube cookies until you press play. Links to other websites, including news articles and Group company sites, are governed by those sites’ own policies.",
      ),
      h("Children"),
      p(
        "The Website is not aimed at children under 13, and we do not knowingly collect their information.",
      ),
      h("Changes"),
      p(
        "We may update this policy. The date at the top shows the latest version.",
      ),
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    summary: "The terms for using foangroup.com and its content.",
    updated: "2026-11-06",
    body: [
      p(
        "These terms apply to your use of foangroup.com (the “Website”), operated by FOAN Group. By using the Website you accept them. If you do not agree, please do not use the Website.",
      ),
      h("About the Website"),
      p(
        "The Website gives information about FOAN Group and its companies. It is for general information only and is not an offer of securities, investment advice or a contract. Investment decisions should not be made on the basis of the Website.",
      ),
      h("Intellectual property"),
      p(
        "The FOAN Group name and logo, the names and logos of C54News, F1 Digital, FOANL, Afrixx Streams and FutureOne Studio, and the text, photographs, videos, graphics and design of the Website belong to FOAN Group or its licensors. You may view and share pages for personal, non-commercial use and link to them. Any other use, including copying, editing, republishing or commercial use, needs our written permission.",
      ),
      h("Downloads"),
      p(
        "Documents offered for download, such as the company profile and annual report, may be shared unchanged with attribution to FOAN Group. Figures in them are correct as of their stated date.",
      ),
      h("Acceptable use"),
      p("When using the Website, you must not:"),
      ul(
        "break the law or anyone else’s rights;",
        "try to gain unauthorised access to the Website or its systems, or disrupt them;",
        "send spam, malware or misleading information through the contact form;",
        "scrape or copy the Website in bulk, or use its content to train automated systems, without permission.",
      ),
      h("Third-party links and content"),
      p(
        "The Website links to news articles, Group company sites, recruitment pages and video platforms we do not control. We are not responsible for their content or practices.",
      ),
      h("No warranty"),
      p(
        "We work to keep the Website accurate and available, but it is provided “as is”. We do not guarantee it will always be complete, current or uninterrupted.",
      ),
      h("Limitation of liability"),
      p(
        "To the extent the law allows, FOAN Group is not liable for any indirect or consequential loss arising from use of the Website. Nothing in these terms limits liability that cannot be limited by law.",
      ),
      h("Governing law"),
      p(
        "These terms are governed by the laws of the Federal Republic of Nigeria. The courts of the Federal Capital Territory, Abuja, have jurisdiction over any dispute.",
      ),
      h("Changes and contact"),
      p(
        `We may update these terms; the date at the top shows the latest version. Questions: ${contact}`,
      ),
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    summary:
      "The small amount of information this website stores in your browser, and how to control it.",
    updated: "2026-11-06",
    body: [
      p(
        "Cookies and similar technologies are small pieces of information a website stores in your browser. This policy explains the very few that foangroup.com uses.",
      ),
      h("What we use"),
      ul(
        "Theme preference (foan-theme, stored in your browser’s local storage): remembers whether you chose the light or dark theme. It stays in your browser, is never sent to us, and is kept until you clear it.",
        "Essential security cookies our hosting provider may set to protect the Website from abuse. These do not identify you.",
      ),
      p(
        "We do not use advertising, analytics or social media tracking cookies, so we do not ask for cookie consent. If we ever add them, we will update this policy and ask for your consent first.",
      ),
      h("Embedded videos"),
      p(
        "Video tours use YouTube’s privacy-enhanced mode (youtube-nocookie.com). YouTube sets no cookies until you press play; after that, Google’s own cookie policy applies.",
      ),
      h("How to control them"),
      p(
        "You can delete or block cookies and local storage in your browser settings. The Website works without them; it will simply forget your theme choice.",
      ),
      h("Contact"),
      p(`Questions about this policy: ${contact}`),
    ],
  },
];
