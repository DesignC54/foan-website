// Figma: Tag (2136:18). Section eyebrow / category label:
// 5px orange bar + glass box (Elevation/Tag: 4px glass blur + soft drop shadow).
// Colours are semantic tokens, so the same tag works in Dark and Light.

export function Tag({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="bg-afrixx-orange h-9 w-[5px] shrink-0" aria-hidden />
      <span className="border-strong bg-glass type-label-tag text-primary shadow-tag border p-1 whitespace-nowrap backdrop-blur-[4px]">
        {label}
      </span>
    </div>
  );
}
