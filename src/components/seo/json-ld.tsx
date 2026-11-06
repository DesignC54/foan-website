import { houses, isExternal, socialLinks } from "@/lib/site";

// Structured data (schema.org JSON-LD) so search engines understand who FOAN
// Group is and what each page holds. Validate at
// https://search.google.com/test/rich-results
// `<` is escaped as the Next.js JSON-LD guide recommends.

export const SITE = "https://www.foangroup.com";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export const organization = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "FOAN Group",
  url: `${SITE}/`,
  logo: `${SITE}/icon.png`,
  description:
    "A media, technology and data company that gathers, verifies and interprets information about African markets and builds the platforms that carry it.",
  email: "info@foangroup.com",
  telephone: "+234 811 111 1393",
  address: {
    "@type": "PostalAddress",
    streetAddress: "628 Sunday Adewusi Street, Guzape",
    addressLocality: "Abuja",
    addressRegion: "FCT",
    addressCountry: "NG",
  },
  sameAs: socialLinks.map((s) => s.href),
  subOrganization: houses
    .filter((h) => isExternal(h.href))
    .map((h) => ({ "@type": "Organization", name: h.name, url: h.href })),
};

/** Site-wide: the organisation and the website. */
export function SiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          organization,
          {
            "@type": "WebSite",
            "@id": `${SITE}/#website`,
            url: `${SITE}/`,
            name: "FOAN Group",
            publisher: { "@id": `${SITE}/#organization` },
            inLanguage: "en",
          },
        ],
      }}
    />
  );
}
