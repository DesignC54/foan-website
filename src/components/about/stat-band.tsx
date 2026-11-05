// Figma: About › At a glance / Infrastructure "Stats" bands.
// The first card is white: that's the hover state (design convention).
// Live: the white card follows the pointer; with no hover the first stays lit.
// Styling lives in globals.css (.stat-band) so the CSS :has() logic stays tidy.

export type Stat = { n: string; title?: string; body: string };

export function StatBand({
  stats,
  tone = "glass",
}: {
  stats: Stat[];
  tone?: "glass" | "raised";
}) {
  return (
    <div
      data-reveal
      className={`stat-band flex flex-col items-stretch gap-4 overflow-clip lg:flex-row ${
        tone === "glass"
          ? "light:bg-surface-raised bg-[rgba(39,39,39,0.5)] backdrop-blur-[10px]"
          : "bg-surface-raised"
      }`}
    >
      {stats.map((s, i) => (
        <div key={s.n + i} className="contents">
          {i > 0 && <span aria-hidden className="stat-divider" />}
          <div className="stat-card flex flex-1 flex-col gap-5 rounded-[20px] px-7 py-8">
            <span className="stat-num font-display grid size-[70px] place-items-center rounded-full text-[40.79px] leading-[0.92] font-semibold tracking-[-1.22px]">
              {s.n}
            </span>
            {s.title && <p className="stat-title type-h4">{s.title}</p>}
            <p className="stat-body type-body-m">{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
