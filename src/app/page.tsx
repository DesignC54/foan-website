// TEMPORARY token preview. It's replaced when we build the Home page.
// It's here to check the tokens against the Figma Design System sheets.

const ramps = {
  lime: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  olive: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  yellow: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  neutral: [0, 50, 100, 200, 300, 400, 500, 700, 800, 850, 900, 950, 1000],
};

const houses = [
  "c54-red",
  "c54-navy",
  "afrixx-orange",
  "f1-purple",
  "f1-magenta",
];

const textStyles = [
  ["type-display-xl", "Display/XL"],
  ["type-display", "Display"],
  ["type-h1", "Heading/H1"],
  ["type-h2", "Heading/H2"],
  ["type-h3", "Heading/H3"],
  ["type-h4", "Heading/H4"],
  ["type-stat", "Stat"],
  ["type-lead", "Lead"],
  ["type-body-xl", "Body/XL"],
  ["type-body-l", "Body/L"],
  ["type-body-m", "Body/M"],
  ["type-body-s", "Body/S"],
  ["type-label-tag", "Label/Tag"],
  ["type-label-nav", "Label/Nav"],
  ["type-label-button", "Label/Button"],
  ["type-label-small", "Label/Small"],
  ["type-label-overline", "Label/Overline"],
];

function Semantic() {
  return (
    <div className="border-default bg-page grid gap-4 rounded-md border p-6">
      <div className="flex flex-wrap gap-3">
        {[
          "page",
          "surface",
          "surface-raised",
          "inverse",
          "footer",
          "glass",
          "accent",
          "highlight",
          "disabled",
        ].map((t) => (
          <div key={t} className="grid gap-1">
            <div
              className="border-subtle h-12 w-20 rounded-xs border"
              style={{ background: `var(--bg-${t})` }}
            />
            <span className="type-label-small text-tertiary">bg/{t}</span>
          </div>
        ))}
      </div>
      <p className="type-body-m text-primary">text/primary</p>
      <p className="type-body-m text-secondary">text/secondary</p>
      <p className="type-body-m text-tertiary">text/tertiary</p>
      <p className="type-body-m text-accent-text">text/accent</p>
      <div className="flex gap-3">
        <span className="bg-accent type-label-button text-on-accent rounded-full px-6 py-3">
          On accent
        </span>
        <span className="border-strong type-label-button rounded-full border px-6 py-3">
          Border strong
        </span>
      </div>
    </div>
  );
}

export default function TokenPreview() {
  return (
    <main className="max-w-frame gap-section-gap px-gutter pb-section mx-auto grid pt-32">
      <header className="grid gap-2">
        <span className="type-label-overline text-accent-text">
          Design tokens · preview
        </span>
        <h1 className="type-display">FOAN design system</h1>
        <p className="type-lead text-secondary">
          Resize below 1024px to see Mobile mode values.
        </p>
      </header>

      <section className="grid gap-6">
        <h2 className="type-h2">Primitives</h2>
        {Object.entries(ramps).map(([name, steps]) => (
          <div key={name} className="flex flex-wrap gap-2">
            {steps.map((s) => (
              <div key={s} className="grid gap-1">
                <div
                  className="border-subtle h-12 w-16 rounded-xs border"
                  style={{ background: `var(--color-${name}-${s})` }}
                />
                <span className="type-label-small text-tertiary">
                  {name}/{s}
                </span>
              </div>
            ))}
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          {houses.map((h) => (
            <div key={h} className="grid gap-1">
              <div
                className="h-12 w-28 rounded-xs"
                style={{ background: `var(--color-${h})` }}
              />
              <span className="type-label-small text-tertiary">house/{h}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6">
        <h2 className="type-h2">Color · Dark and Light</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div data-theme="dark">
            <Semantic />
          </div>
          <div data-theme="light">
            <Semantic />
          </div>
        </div>
      </section>

      <section className="grid gap-6">
        <h2 className="type-h2">Typography</h2>
        <div className="grid gap-6">
          {textStyles.map(([cls, label]) => (
            <div key={cls} className="border-subtle grid gap-1 border-b pb-4">
              <span className="type-label-small text-tertiary">{label}</span>
              <span className={`${cls} overflow-hidden`}>FOAN Group</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6">
        <h2 className="type-h2">Radius and elevation</h2>
        <div className="flex flex-wrap gap-4">
          {/* Tailwind only sees full class names, so never build them like `rounded-${r}`. */}
          {[
            ["xs", "rounded-xs"],
            ["sm", "rounded-sm"],
            ["md", "rounded-md"],
            ["lg", "rounded-lg"],
            ["full", "rounded-full"],
          ].map(([r, cls]) => (
            <div
              key={r}
              className={`bg-surface-raised grid size-24 place-items-center ${cls}`}
            >
              <span className="type-label-small">{r}</span>
            </div>
          ))}
          <div className="bg-surface shadow-glass grid size-24 place-items-center rounded-sm">
            <span className="type-label-small">glass</span>
          </div>
        </div>
      </section>
    </main>
  );
}
