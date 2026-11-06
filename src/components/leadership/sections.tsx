import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import { chairman, directors } from "@/lib/board";
import { BoardGrid } from "./board-grid";

// Figma: Leadership — Desktop (2164:14) / Leadership — Mobile (2164:254).
// Copy verbatim from the design (sourced from foangroup.com/leadership).

const Lime = ({ children }: { children: React.ReactNode }) => (
  <span className="text-accent-text">{children}</span>
);

export function LeadershipHero() {
  return (
    <section className="relative overflow-clip">
      {/* eslint-disable-next-line @next/next/no-img-element -- glow */}
      <img
        src="/images/about/hero-glow.svg"
        alt=""
        className="intro-fade light:opacity-40 pointer-events-none absolute top-[-260px] left-1/2 h-[700px] w-[1200px] max-w-none -translate-x-1/2"
      />
      <div className="max-w-frame px-gutter nav:pt-[184px] relative mx-auto flex flex-col items-center gap-6 pt-[96px] pb-16 text-center lg:gap-12 lg:pb-[112px]">
        <div
          className="intro-up"
          style={{ "--d": "100ms" } as React.CSSProperties}
        >
          <Tag label="Leadership" />
        </div>
        <h1
          className="intro-zoom type-h1 text-primary lg:w-[1000px]"
          style={{ "--d": "200ms" } as React.CSSProperties}
        >
          Governance is a precondition of <Lime>growth</Lime>, not a consequence
          of it.
        </h1>
        <p
          className="intro-up type-body-xl text-secondary lg:w-[780px]"
          style={{ "--d": "420ms" } as React.CSSProperties}
        >
          The FOAN Group Board of Directors was inaugurated on 31 March 2026
          under the chairmanship of Professor Pat Utomi. It is the Group’s
          principal board and the forum in which strategy, capital, risk and
          appointments are decided.
        </p>
      </div>
    </section>
  );
}

export function Chairman() {
  return (
    <section
      id="patrick-utomi"
      className="max-w-frame px-gutter mx-auto scroll-mt-28"
    >
      <div
        data-reveal="zoom-in"
        className="border-subtle bg-surface flex flex-col gap-6 rounded-md border p-4 lg:h-[665px] lg:flex-row lg:items-center lg:gap-14 lg:p-6"
      >
        <div
          data-theme="dark"
          className="relative flex h-[420px] shrink-0 items-end justify-center overflow-clip rounded-sm bg-neutral-700 lg:h-[620px] lg:w-[560px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- glow */}
          <img
            src="/images/leadership/chairman-glow.svg"
            alt=""
            className="absolute top-20 left-[-120px] size-[800px] max-w-none"
          />
          <div
            data-reveal-img
            className="relative h-[380px] w-[352px] lg:h-[560px] lg:w-[520px]"
          >
            <Image
              src="/images/leadership/utomi-cutout.webp"
              alt={chairman.name}
              fill
              sizes="520px"
              className="object-contain object-bottom"
            />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-5 p-2 lg:py-6 lg:pr-6">
          <Tag label="Board Chairman" />
          <h2 className="type-h2 text-primary">{chairman.name}</h2>
          <p className="type-body-m text-secondary">{chairman.bio[0]}</p>
        </div>
      </div>
    </section>
  );
}

export function Board() {
  return (
    <section className="max-w-frame gap-section-gap px-gutter mx-auto flex flex-col py-16 lg:gap-12 lg:py-20">
      <h2 data-reveal className="type-h2 text-primary lg:w-[820px]">
        The people guiding our leadership and <Lime>long-term vision.</Lime>
      </h2>
      <BoardGrid members={directors} />
    </section>
  );
}

const reserved = [
  "Approval of group strategy, annual plans and capital allocation.",
  "Appointment, evaluation and removal of executive leadership.",
  "Oversight of financial reporting, audit, internal control and risk.",
  "Protection of editorial independence within the news business.",
  "Approval of material transactions, partnerships and related party arrangements.",
  "Oversight of regulatory compliance across every market in which the Group operates.",
];

export function Reserved() {
  return (
    <section data-theme="light" className="relative overflow-clip bg-lime-500">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative stripes */}
      <img
        src="/images/leadership/reserved-stripes.svg"
        alt=""
        className="pointer-events-none absolute top-0 left-0 h-[1464px] w-[1472px] max-w-none"
      />
      <div className="max-w-frame px-gutter relative mx-auto flex flex-col gap-10 py-16 lg:flex-row lg:gap-16 lg:py-20">
        <div data-reveal className="flex shrink-0 flex-col gap-5 lg:w-[420px]">
          <Tag label="Reserved responsibilities" tone="dark" />
          <h2 className="type-h2 text-neutral-950">
            What the Board <span className="text-olive-500">decides.</span>
          </h2>
        </div>
        <ol data-reveal-group="right" className="flex min-w-0 flex-1 flex-col">
          {reserved.map((r, i) => (
            <li
              key={r}
              className="flex gap-6 border-t border-black/12 py-6 lg:gap-8"
            >
              <span className="type-h2 text-afrixx-orange opacity-70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="type-h3 text-neutral-950 opacity-90">{r}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const principles = [
  {
    t: "Structure before scale",
    b: "Reporting lines, decision rights, financial controls and statutory obligations are in place before a business is expanded.",
  },
  {
    t: "Protected editorial independence",
    b: "Journalistic judgement is insulated from commercial and shareholder influence by written standards and separate oversight.",
  },
  {
    t: "Documented decisions",
    b: "Material decisions, approvals and expenditures are recorded with owners and dates, so performance can be audited later.",
  },
  {
    t: "Segregation of duties",
    b: "Authorisation, execution and review of expenditure and commitments are held by different offices, with thresholds set by the Board.",
  },
  {
    t: "Delegation with measurement",
    b: "Authority is pushed down to the office accountable for the outcome and paired with reporting the Board can inspect.",
  },
];

export function Principles() {
  return (
    <section className="max-w-frame px-gutter mx-auto flex flex-col gap-6 py-16 lg:py-10">
      <div data-reveal className="flex flex-col gap-5">
        <Tag label="Principles" />
        <h2 className="type-h2 text-primary lg:w-[900px]">
          How governance is <Lime>applied.</Lime>
        </h2>
        <p className="type-body-l text-secondary lg:w-[760px]">
          Applied consistently, these produce a company that can be examined.
          Investors can verify what has been approved and spent. Partners can
          identify who holds a decision. Regulators can inspect records kept
          properly at the time.
        </p>
      </div>
      <div
        data-reveal-group="zoom-in"
        className="grid gap-5 lg:grid-cols-2 lg:gap-6"
      >
        {principles.map((p, i) => (
          <div
            key={p.t}
            className={`border-subtle bg-surface relative flex flex-col gap-6 rounded-sm border p-7 shadow-[inset_-19px_6px_33px_0_rgba(255,122,4,0.4)] lg:h-[260px] lg:p-9 ${
              i === principles.length - 1 ? "lg:col-span-2" : ""
            }`}
          >
            <p className="type-stat text-primary">{p.t}</p>
            <p className="type-body-m text-secondary">{p.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const offices = [
  {
    t: "Founder and Group Chief Executive Officer",
    b: "Group strategy, capital raising, executive appointments and overall performance.",
  },
  {
    t: "Group Chief Financial Officer",
    b: "Financial control, reporting, treasury, audit liaison and capital structure.",
  },
  {
    t: "Company Secretary",
    b: "Board procedure, statutory compliance, corporate records and governance administration.",
  },
  {
    t: "Subsidiary executive leadership",
    b: "Operating performance, commercial delivery and compliance within each company.",
  },
  {
    t: "Editorial standards oversight",
    b: "Application of the editorial code within the news business, exercised independently of commercial management.",
  },
];

export function Offices() {
  return (
    <section className="max-w-frame px-gutter mx-auto flex flex-col gap-10 py-16 lg:py-10">
      <div data-reveal className="flex flex-col items-center gap-5 text-center">
        <Tag label="Executive" />
        <h2 className="type-h1 text-primary">
          Leadership <Lime>offices.</Lime>
        </h2>
        <p className="type-body-l text-secondary lg:w-[760px]">
          Executive authority is exercised through defined offices, and
          management reports to the Board against plans that carry dates and
          owners.
        </p>
      </div>
      <ul data-reveal-group="left" className="flex flex-col gap-4">
        {offices.map((o) => (
          <li
            key={o.t}
            className="group border-subtle bg-surface-raised flex flex-col overflow-clip rounded-sm border lg:h-[160px] lg:flex-row lg:items-center lg:gap-[104px]"
          >
            {/* Orange chevron label (Figma Row / Office) */}
            <div
              data-theme="dark"
              className="relative h-[120px] shrink-0 overflow-clip lg:h-[158px] lg:w-[513px] lg:overflow-visible"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- chevron shape */}
              <img
                src="/images/leadership/office-shape.svg"
                alt=""
                className="absolute top-[-24px] left-[-53px] h-[215px] w-[667px] max-w-none transition-transform duration-500 group-hover:translate-x-2 lg:top-[-24px]"
              />
              <p className="type-h2 relative px-6 pt-6 text-white lg:absolute lg:top-[29px] lg:left-[33px] lg:w-[420px] lg:p-0">
                {o.t}
              </p>
            </div>
            <p className="type-h3 text-secondary relative px-6 py-6 lg:w-[726px] lg:p-0 lg:pr-6">
              {o.b}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
