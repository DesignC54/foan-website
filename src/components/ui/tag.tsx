// Figma: Tag (2136:18). Section eyebrow / category label:
// 5px orange bar + glass box (Elevation/Tag: 4px glass blur + soft drop shadow).
// Colours are semantic tokens, so the same tag works in Dark and Light.
// tone="dark" is for light/accent surfaces (e.g. the lime Five houses band):
// the label turns black.

export function Tag({
  label,
  tone = "light",
  className = "",
}: {
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="bg-afrixx-orange h-9 w-[5px] shrink-0" aria-hidden />
      <span
        className={`border-strong bg-glass type-label-tag shadow-tag border p-1 whitespace-nowrap backdrop-blur-[4px] ${
          tone === "dark" ? "text-neutral-950" : "text-primary"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
