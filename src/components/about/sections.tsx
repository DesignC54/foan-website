import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { BoardCard } from "@/components/site/board-card";
import { board } from "@/lib/board";
import { StatBand } from "./stat-band";

// Figma: About — Desktop (2297:4696) / About — Mobile (2303:4915).
// Copy is verbatim from the design (sourced from foangroup.com/about).

const Lime = ({ children }: { children: React.ReactNode }) => (
  <span className="text-accent-text">{children}</span>
);

/* ---------------------------------------------------------------- */

export function AboutHero() {
  const avatars = ["avatar-1", "avatar-2", "avatar-3", "avatar-4"];
  return (
    <section className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element -- glow */}
      <img
        src="/images/about/hero-glow.svg"
        alt=""
        className="light:opacity-40 pointer-events-none absolute top-[-260px] left-[-200px] h-[700px] w-[1200px] max-w-none"
      />
      <div className="max-w-frame px-gutter pb-section nav:pt-[168px] relative mx-auto flex flex-col gap-5 pt-[84px] lg:gap-7 lg:pb-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div
            data-reveal
            className="flex flex-col gap-5 lg:max-w-[880px] lg:gap-7"
          >
            <Tag label="About FOAN Group" />
            <h1 className="type-display text-primary">
              Where measurement, journalism, and distribution{" "}
              <Lime>converge.</Lime>
            </h1>
            <p className="type-body-l text-secondary">
              FOAN Group is a media, technology and data holding company
              headquartered in Abuja, built to occupy the layer between
              Africa&apos;s information and the value its attention generates.
            </p>
          </div>
          <div
            data-reveal
            className="flex flex-row-reverse items-center justify-between gap-5 lg:flex-col lg:items-end"
          >
            <div className="flex">
              {avatars.map((a, i) => (
                <span
                  key={a}
                  className={`border-page relative size-14 overflow-clip rounded-full border-3 ${i < 3 ? "-mr-3.5" : ""}`}
                >
                  <Image
                    src={`/images/about/${a}.webp`}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
            <Button label="Our companies" href="#five-houses" variant="lime" />
          </div>
        </div>
      </div>

      {/* Hero image: bleeds off the right edge, rounded on the left */}
      <div className="max-w-frame relative mx-auto">
        <div className="relative ml-5 h-80 lg:ml-[150px] lg:h-[480px]">
          <div
            data-theme="dark"
            className="absolute inset-0 overflow-clip rounded-l-[16px] lg:rounded-l-[40px]"
          >
            <Image
              src="/images/home/photo-pyramid.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <Link
            href="/contact/"
            aria-label="Contact us"
            className="absolute top-1/2 left-0 size-[66px] -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-105 lg:top-[137px] lg:left-[-70px] lg:size-[163px] lg:translate-x-0 lg:translate-y-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- glass arrow */}
            <img
              src="/images/about/hero-arrow.svg"
              alt=""
              className="size-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function SingleView() {
  return (
    <section
      id="single-view"
      className="max-w-frame gap-section-gap px-gutter py-section mx-auto flex scroll-mt-24 flex-col items-center md:flex-row md:gap-10 lg:gap-24 lg:py-10"
    >
      {/* Visual drawn at 520px, scaled to the mobile column (362px) */}
      <div
        data-reveal
        className="relative size-[362px] shrink-0 md:size-[300px] lg:size-[520px]"
      >
        <div className="absolute top-0 left-0 size-[520px] origin-top-left scale-[0.696] md:scale-[0.577] lg:scale-100">
          <div className="absolute top-10 left-0 size-[480px] overflow-clip rounded-full">
            <Image
              src="/images/about/towers-blue.webp"
              alt=""
              fill
              sizes="480px"
              className="object-cover"
            />
          </div>
          <div className="absolute top-0 left-[336px] flex size-[184px] flex-col items-center justify-center gap-0.5 rounded-full bg-lime-500 text-center text-black">
            <p className="type-stat">5</p>
            <p className="type-label-small w-[120px]">Countries of operation</p>
          </div>
        </div>
      </div>
      <div data-reveal className="flex min-w-0 flex-1 flex-col gap-5 lg:gap-7">
        <h2 className="type-h1 text-primary">
          A single view of how information becomes <Lime>value.</Lime>
        </h2>
        <p className="type-body-l text-secondary">
          FOAN Group is a media, technology and data holding company registered
          and headquartered in Nigeria. It sets strategy, allocates capital,
          appoints leadership, holds governance and risk oversight, and owns the
          Group&apos;s shared technology, data and brand assets. It does not run
          its five subsidiaries day to day: each carries its own mandate,
          management and commercial accountability. Read together, they cover
          the full path information travels in a modern media economy, from the
          point at which it is gathered to the point at which it is verified,
          produced, distributed and paid for.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function AtAGlance() {
  return (
    <section className="max-w-frame gap-section-gap px-gutter py-section mx-auto flex flex-col lg:gap-10 lg:py-10">
      <div
        data-reveal
        className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
      >
        <h2 className="type-h2 text-primary">
          The Group <Lime>at a glance.</Lime>
        </h2>
        <p className="type-body-l text-secondary lg:w-[563px]">
          Corporate offices in Abuja, Uyo and Dubai, with continental production
          and commercial hubs operating continuously across time zones.
        </p>
      </div>
      <StatBand
        stats={[
          {
            n: "3",
            body: "Corporate offices: the Abuja head office, the Uyo annex at Dakkada Tower, and an international office in Dubai.",
          },
          {
            n: "5",
            body: "C54News hubs across Uyo, Nairobi, Johannesburg, Lagos and Senegal, each carrying a defined function for the whole Group.",
          },
          {
            n: "5",
            body: "Countries of operation: Nigeria, Kenya, South Africa, Senegal and the United Arab Emirates.",
          },
          {
            n: "8",
            body: "Revenue lines spanning advertising, subscription, transactional, licensing, advisory, technology, communications retainers and creator monetisation.",
          },
        ]}
      />
    </section>
  );
}

/* ---------------------------------------------------------------- */

const milestones = [
  {
    label: "Delivered",
    title: "Technology platforms built and in service",
    body: "Streaming, mobile applications and web publishing systems delivered and operating ahead of the network launch.",
  },
  {
    label: "Scheduled · 14 October 2026",
    title: "C54News shadow launch",
    body: "Brings the newsroom, distribution and Streaming Dome operations into live service under controlled conditions.",
  },
  {
    label: "Scheduled · August 2027",
    title: "C54News commercial launch",
    body: "Opens full commercial operation across advertising, subscription, licensing and enterprise revenue lines.",
  },
];

export function WhereTheGroupStands() {
  return (
    <section data-theme="dark" className="relative overflow-clip">
      <Image
        src="/images/about/towers-colour.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/80 via-60% to-black/96" />
      <div className="max-w-frame px-gutter pb-section relative mx-auto flex flex-col items-center gap-16 pt-24 lg:gap-40 lg:pt-[180px] lg:pb-16">
        <div
          data-reveal
          className="flex flex-col items-center gap-6 text-center"
        >
          <h2 className="type-h1 text-primary lg:w-[1000px]">
            Where the Group <Lime>stands.</Lime>
          </h2>
          <p className="type-body-l text-secondary lg:w-[620px]">
            Work already delivered and work committed to a date are stated
            separately, so that neither is read as the other.
          </p>
        </div>
        <ol
          data-reveal-group
          className="grid w-full gap-8 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {milestones.map((m) => (
            <li
              key={m.title}
              className="border-default flex flex-col gap-3 border-t pt-7"
            >
              <p className="type-label-overline text-accent-text">{m.label}</p>
              <p className="type-h3 text-primary">{m.title}</p>
              <p className="type-body-s text-secondary">{m.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function Governance() {
  return (
    <section data-theme="dark" className="bg-accent relative overflow-clip">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative stripes */}
      <img
        src="/images/about/governance-stripes.svg"
        alt=""
        className="pointer-events-none absolute top-0 left-0 h-[1712px] w-[1472px] max-w-none"
      />
      <div
        data-reveal
        className="max-w-frame px-gutter relative mx-auto flex flex-col gap-5 py-16 md:flex-row md:items-start md:gap-10 lg:gap-24 lg:py-[120px]"
      >
        <div className="flex shrink-0 flex-col gap-6 md:w-[40%] lg:w-[560px]">
          <Tag label="Governance" tone="dark" />
          <h2 className="type-h1 text-black">Governance precedes scale.</h2>
        </div>
        <p className="type-body-xl text-black lg:w-[664px]">
          The FOAN Group Board of Directors was inaugurated on 31 March 2026
          under the chairmanship of Professor Pat Utomi, supported by a company
          secretariat. C54News Channel Limited holds National Broadcasting
          Commission approval for free-to-air carriage in Nigeria and is
          separately registered in Kenya. Reporting lines, decision rights and
          financial controls were put in place before the flagship network
          entered service, not retrofitted under growth pressure.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

const glowCard =
  "relative flex flex-col gap-6 rounded-sm border border-subtle bg-surface p-7 shadow-[inset_-19px_6px_33px_0_rgba(255,122,4,0.4)] lg:p-9";

export function VisionMissionValues() {
  const cards = [
    {
      t: "Vision",
      b: "To be the media, technology and data group through which Africa is accurately understood, credibly represented and commercially engaged by the world.",
    },
    {
      t: "Mission",
      b: "We gather, verify and interpret information about African markets and societies, and we build the platforms, content and intelligence products that carry it to the audiences and decision makers who need it, retaining ownership of the assets we create.",
    },
    {
      t: "Values",
      b: "Six values govern how the Group operates. They are applied in hiring, in editorial decisions, in commercial negotiation and in how performance is assessed.",
    },
  ];
  return (
    <section className="max-w-frame gap-section-gap px-gutter py-section mx-auto flex flex-col lg:gap-12 lg:pt-[140px] lg:pb-10">
      <h2 data-reveal className="type-h2 text-primary">
        Vision, mission, and <Lime>values.</Lime>
      </h2>
      <div
        data-reveal-group
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 [&>*:last-child]:md:col-span-2 [&>*:last-child]:lg:col-span-1"
      >
        {cards.map((c) => (
          <div key={c.t} className={glowCard}>
            <p className="type-stat text-primary">{c.t}</p>
            <p className="type-body-m text-secondary">{c.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

const values = [
  {
    t: "Verification first",
    b: "Nothing is published, reported or advised on before it has been checked against primary evidence. Speed is subordinate to accuracy.",
    img: "verification",
  },
  {
    t: "Independence",
    b: "Editorial and analytical judgement is protected from commercial, political and shareholder pressure by written standards the Board enforces.",
    img: "independence",
  },
  {
    t: "Discipline",
    b: "Plans carry dates, owners and measurable outputs. Reporting is accurate, including when the outcome is poor.",
    img: "discipline",
  },
  {
    t: "Craft",
    b: "Production, writing, design and analysis are held to an international standard. Work that is merely adequate is not published.",
    img: "craft",
  },
  {
    t: "Ownership",
    b: "The Group retains rights to the content, data and technology it creates, and builds catalogue value instead of trading it away.",
    img: "ownership",
  },
  {
    t: "Legacy",
    b: "Decisions are tested against a long horizon. The objective is a company that outlives its founding generation.",
    img: "legacy",
  },
];

export function SixValues() {
  return (
    <section className="max-w-frame gap-section-gap px-gutter py-section mx-auto flex flex-col items-center lg:gap-10 lg:py-10">
      <div data-reveal className="flex flex-col items-center gap-6 text-center">
        <Tag label="Values" />
        <h2 className="type-h1 text-primary lg:w-[900px]">
          The six values we are <Lime>measured against.</Lime>
        </h2>
        <p className="type-body-l text-secondary lg:w-[600px]">
          Stated so they can be tested, in hiring, in editorial decisions and in
          commercial negotiation.
        </p>
      </div>
      <ol className="flex w-full flex-col gap-4">
        {values.map((v, i) => (
          <li
            key={v.t}
            data-reveal
            className={`group flex flex-col-reverse gap-4 md:min-h-[220px] lg:h-[232px] ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"}`}
          >
            <div className="border-subtle bg-surface flex flex-col justify-center gap-3.5 rounded-[20px] border px-7 py-8 md:w-[58%] md:shrink-0 lg:w-[760px] lg:px-12 lg:py-10">
              <p className="type-h1 text-primary">{v.t}</p>
              <p className="type-body-m text-secondary">{v.b}</p>
            </div>
            <div
              data-theme="dark"
              className="border-subtle relative h-[200px] overflow-clip rounded-[20px] border bg-neutral-700 md:h-auto md:flex-1"
            >
              <Image
                src={`/images/about/value-${v.img}.webp`}
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
  );
}

/* ---------------------------------------------------------------- */

export function Infrastructure() {
  return (
    <section className="max-w-frame gap-section-gap px-gutter py-section mx-auto flex flex-col lg:gap-14 lg:pt-10 lg:pb-[140px]">
      <div
        data-reveal
        className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
      >
        <h2 className="type-h1 text-primary lg:w-[720px]">
          Africa’s information infrastructure, <Lime>held in one company.</Lime>
        </h2>
        <p className="type-body-l text-secondary lg:w-[520px]">
          Infrastructure is normally discussed as towers, fibre and data
          centres. The layer above it is discussed far less and is just as
          load-bearing: the systems that gather information, verify it, produce
          it and distribute it. Africa&apos;s connectivity layer is being
          financed at scale. The information layer above it is not, and that is
          where the Group has concentrated.
        </p>
      </div>
      <StatBand
        tone="raised"
        stats={[
          {
            n: "1",
            title: "Collection",
            body: "Field networks, local knowledge, quality control and the ability to operate where records are weak. Primary data collected in the market, not modelled from a distance.",
          },
          {
            n: "2",
            title: "Verification",
            body: "Documented editorial standards, forensic tooling and accountable human judgement. Verification is becoming an enterprise procurement category, not editorial hygiene.",
          },
          {
            n: "3",
            title: "Production",
            body: "Newsroom capacity, studios, crews and international-standard post-production, from daily journalism to long-form factual work built for global licensing.",
          },
          {
            n: "4",
            title: "Distribution",
            body: "Owned platforms, carriage rights, payment rails and audience data, so the audience relationship and its economics stay inside the Group.",
          },
        ]}
      />
      <div
        data-reveal
        className={`${glowCard} !gap-6 rounded-lg p-7 md:flex-row md:items-center md:gap-10 md:p-10 lg:gap-24 lg:p-16`}
      >
        <h3 className="type-h1 text-primary lg:w-[520px] lg:shrink-0">
          Held together, not bought <Lime>separately.</Lime>
        </h3>
        <p className="type-body-l text-secondary">
          Each component can be bought on the open market, at three costs: a
          margin at every handover, the surrender of the asset created at each
          stage, and components that rarely align. Holding all four inside one
          company removes those costs. The same field research funds an advisory
          mandate, informs a documentary commission, supplies a data journalism
          series and shapes programming strategy. The marginal cost of each
          further use is close to zero, and the assets stay on one balance
          sheet.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function People() {
  return (
    <section className="max-w-frame gap-section-gap px-gutter py-section mx-auto flex flex-col lg:gap-14 lg:py-[140px]">
      <div
        data-reveal
        className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
      >
        <h2 className="type-h1 text-primary lg:w-[860px]">
          The people guiding our leadership and <Lime>long-term vision.</Lime>
        </h2>
        <Button
          label="See the full board and leadership framework"
          href="/leadership/"
          variant="lime"
          className="self-start whitespace-normal lg:self-auto"
        />
      </div>
      <div
        data-reveal-group
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {board.map((m) => (
          <BoardCard key={m.slug} member={m} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function Statement() {
  return (
    <section data-theme="dark" className="relative overflow-clip">
      <Image
        src="/images/about/towers-colour.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="max-w-frame px-gutter relative mx-auto flex justify-center py-16 lg:py-[140px]">
        <div
          data-reveal
          className="border-subtle flex w-full max-w-[1000px] flex-col items-center gap-7 rounded-lg border bg-[rgba(39,39,39,0.5)] px-6 py-10 text-center backdrop-blur-[15px] lg:px-20 lg:py-[72px]"
        >
          <h2 className="type-h1 text-primary">
            Africa produces the information.{" "}
            <Lime>
              The infrastructure that interprets it is owned elsewhere.
            </Lime>
          </h2>
          <p className="type-body-l text-secondary lg:w-[760px]">
            African markets are reported through intermediaries, priced with
            incomplete data and represented through narratives assembled
            elsewhere. That gap is a business, and FOAN Group was built to
            occupy it: verification before publication, governance before scale,
            and ownership of the assets, rights and data the work creates.
          </p>
        </div>
      </div>
    </section>
  );
}
