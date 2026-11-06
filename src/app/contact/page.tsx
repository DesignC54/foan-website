import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Lime } from "@/components/site/page-hero";
import {
  ContactForm,
  OfficeAccordion,
  type Office,
} from "@/components/pages/contact";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact/" },
  description:
    "For partnerships, press, investment, and general enquiries. Offices in Abuja, Uyo, and Dubai.",
};

// Figma: Contact — Desktop (2169:1074) / Mobile (2169:1283).
// Hero (2169:1102), Message (2169:1124), Offices (2369:5358),
// Operating hubs (2374:5503). Contact details from foangroup.com/contact.

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const icon = (path: React.ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    className="size-7"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {path}
  </svg>
);

const icons = {
  mail: icon(
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>,
  ),
  phone: icon(
    <path d="M5 4h3.5l1.5 4.5-2 1.5a11 11 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  ),
  clock: icon(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>,
  ),
  people: icon(
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8" />
    </>,
  ),
};

const card =
  "group flex flex-col items-center gap-3 rounded-[20px] bg-black/30 px-6 py-10 text-center text-white backdrop-blur-[6px] transition-colors duration-300 hover:bg-white hover:text-neutral-950 lg:py-14";
const sub =
  "type-body-s text-white/75 transition-colors group-hover:text-neutral-700";

const offices: Office[] = [
  {
    kind: "Head office",
    city: "Abuja",
    address: "628 Sunday Adewusi Street, Guzape, FCT Abuja, Nigeria",
    note: "The Abuja head office holds group strategy, capital and governance.",
  },
  {
    kind: "Annex office",
    city: "Uyo",
    address: "Dakkada Tower, 19th Floor, Uyo, Akwa Ibom State, Nigeria",
    note: "Home of the Global Streaming Hub: streaming headquarters, newsroom and master control.",
  },
  {
    kind: "International office",
    city: "Dubai",
    address: "Dubai, United Arab Emirates",
    note: "Licensing negotiations, distribution agreements, co-production financing and investor engagement.",
  },
];

const hubs = [
  {
    name: "Global Streaming Hub",
    place: "Dakkada Tower, Uyo, Nigeria.",
    body: "Streaming headquarters, newsroom, Streaming Dome operations and master control.",
    img: "/images/about/towers-blue.webp",
  },
  {
    name: "Production Hub",
    place: "Nairobi, Kenya.",
    body: "Production operations for news, documentary and original content across East Africa.",
    img: "/images/blog/jan-main.webp",
  },
  {
    name: "Commercial Hub",
    place: "Johannesburg, South Africa.",
    body: "Advertising, licensing and partnership operations in the continent's most developed media market.",
    img: "/images/about/towers-colour.webp",
  },
  {
    name: "Annex Commercial Hub",
    place: "Lagos, Nigeria.",
    body: "Commercial operations and market engagement in Nigeria's commercial centre.",
    img: "/images/home/photo-pyramid.webp",
  },
  {
    name: "Continental Hub",
    place: "Senegal.",
    body: "Continental affairs, francophone West Africa coverage and regional partnership engagement.",
    img: "/images/pages/csr-kano-2025.webp",
  },
  {
    name: "International Office",
    place: "Dubai, United Arab Emirates.",
    body: "Licensing negotiations, distribution agreements, co-production financing and investor engagement.",
    img: "/images/home/photo-towers-a.webp",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero panel */}
      <section className="max-w-frame px-gutter nav:pt-[120px] mx-auto pt-[80px] md:pt-[100px]">
        <div
          data-theme="dark"
          className="intro-fade relative overflow-clip rounded-[24px] bg-linear-to-b from-black from-15% to-[#4d5c00] px-5 py-14 md:px-10 lg:rounded-[32px] lg:px-16 lg:py-20"
        >
          <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 text-center lg:gap-8">
            <div className="intro-up" style={d(100)}>
              <Tag label="Contact" />
            </div>
            <h1
              className="intro-zoom type-h1 text-white lg:w-[900px]"
              style={d(200)}
            >
              Let’s talk about what we can <Lime>build together.</Lime>
            </h1>
            <p
              className="intro-up type-body-xl text-white/75 lg:w-[780px]"
              style={d(400)}
            >
              For partnerships, press, investment, and general enquiries, our
              team in Abuja will route you to the right place. Offices in Abuja,
              Uyo, and Dubai.
            </p>
            <div
              className="intro-up flex flex-wrap justify-center gap-3"
              style={d(520)}
            >
              <Button
                label="Email the Group"
                href="mailto:info@foangroup.com"
                variant="lime"
              />
              <Button
                label="Press releases"
                href="/press-releases/"
                variant="white"
                arrowSrc="/images/site/btn-arrow-yellow.svg"
              />
            </div>

            <div
              data-reveal-group
              className="mt-6 grid w-full gap-4 md:grid-cols-2 lg:mt-10 lg:gap-5"
            >
              <a href="mailto:info@foangroup.com" className={card}>
                {icons.mail}
                <span className="type-h4">Email</span>
                <span className={sub}>info@foangroup.com</span>
                <span className={`${sub} flex flex-col gap-1`}>
                  <span>partnerships@foangroup.com</span>
                  <span>investors@foangroup.com</span>
                  <span>media@foangroup.com</span>
                </span>
              </a>
              <div className={card}>
                {icons.phone}
                <span className="type-h4">Phone</span>
                <a
                  href="tel:+2348111111393"
                  className="type-body-m hover:underline"
                >
                  +234 811 111 1393
                </a>
                <a
                  href="tel:+2348164222293"
                  className="type-body-m hover:underline"
                >
                  +234 816 422 2293
                </a>
                <span className={sub}>
                  Monday - Friday: 9:00 AM - 5:00 PM (WAT)
                </span>
              </div>
              <div className={card}>
                {icons.clock}
                <span className="type-h4">Business hours</span>
                <span className={`${sub} flex flex-col gap-1.5`}>
                  <span>Monday - Friday: 9:00 AM - 5:00 PM</span>
                  <span>Saturday: 10:00 AM - 4:00 PM</span>
                  <span>Sunday: Closed</span>
                  <span>All times are West Africa Time (WAT)</span>
                </span>
              </div>
              <div className={card}>
                {icons.people}
                <span className="type-h4">Partnership opportunities</span>
                <span className={`${sub} max-w-[440px]`}>
                  Interested in strategic partnerships, investment
                  opportunities, or media inquiries? Reach out through the
                  dedicated channels below.
                </span>
                <Button
                  label="Email the Group"
                  href="mailto:partnerships@foangroup.com"
                  variant="lime"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message */}
      <section className="px-gutter py-section mx-auto flex max-w-[calc(980px+2*var(--layout-gutter))] flex-col gap-8 lg:gap-12 lg:py-[100px]">
        <div
          data-reveal
          className="flex flex-col items-center gap-4 text-center"
        >
          <h2 className="type-h1 text-primary">
            Send us a <Lime>message</Lime>
          </h2>
          <p className="type-body-l text-secondary lg:w-[640px]">
            Fill out the form below and we’ll get back to you within 24 hours.
            For urgent inquiries, please call us directly.
          </p>
        </div>
        <div data-reveal>
          <ContactForm />
        </div>
      </section>

      {/* Offices */}
      <section className="px-gutter pb-section mx-auto flex max-w-[calc(1180px+2*var(--layout-gutter))] flex-col gap-8 lg:gap-12 lg:pb-[100px]">
        <div
          data-reveal
          className="flex flex-col items-center gap-4 text-center lg:gap-6"
        >
          <Tag label="Offices" />
          <h2 className="type-h1 text-primary">
            Get in <Lime>touch</Lime>
          </h2>
          <p className="type-body-l text-secondary">
            Offices in Abuja, Uyo, and Dubai.
          </p>
        </div>
        <OfficeAccordion offices={offices} />
        <p
          data-reveal
          className="type-body-m text-secondary mx-auto max-w-[760px] text-center"
        >
          For matters concerning a specific company, our team will connect you
          with C54News, F1 Digital, FOANL, Afrixx Streams, or FutureOne Studio.
        </p>
      </section>

      {/* Operating hubs */}
      <section className="max-w-frame gap-section-gap px-gutter mx-auto flex flex-col items-center pb-16 lg:gap-10 lg:pb-20">
        <div
          data-reveal
          className="flex flex-col items-center gap-6 text-center"
        >
          <Tag label="Hubs" />
          <h2 className="type-h1 text-primary">
            Our operating <Lime>hubs.</Lime>
          </h2>
          <p className="type-body-l text-secondary lg:w-[720px]">
            Each hub carries a defined function for the whole Group rather than
            being a self-contained country business. Operations run continuously
            across time zones, so no hub is a single point of failure.
          </p>
        </div>
        <ol className="flex w-full flex-col gap-4">
          {hubs.map((h, i) => (
            <li
              key={h.name}
              data-reveal
              className={`group flex flex-col-reverse gap-4 md:min-h-[220px] lg:h-[232px] ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"}`}
            >
              <div className="border-subtle bg-surface flex flex-col justify-center gap-3.5 rounded-[20px] border px-7 py-8 md:w-[58%] md:shrink-0 lg:w-[760px] lg:px-12 lg:py-10">
                <p className="type-label-overline text-accent-text">
                  {h.place}
                </p>
                <p className="type-h1 text-primary">{h.name}</p>
                <p className="type-body-m text-secondary">{h.body}</p>
              </div>
              <div
                data-theme="dark"
                className="border-subtle relative h-[200px] overflow-clip rounded-[20px] border bg-neutral-700 md:h-auto md:flex-1"
              >
                <Image
                  src={h.img}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 544px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(29,29,29,0.25)] from-20% to-black to-[140%]" />
                <p className="outline-number font-ui absolute right-6 bottom-[-18px] text-[110px] leading-[0.9] font-extrabold tracking-[-6px] lg:right-10 lg:bottom-[-22px] lg:text-[150px] lg:tracking-[-9px]">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
