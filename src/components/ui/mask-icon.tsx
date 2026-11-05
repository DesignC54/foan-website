import type { CSSProperties } from "react";

/**
 * A single-colour Figma icon painted with the current text colour, so it
 * follows the theme (see the `icon` utility in globals.css).
 * Size it with className, e.g. "size-11 text-primary".
 */
export function MaskIcon({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`icon ${className}`}
      style={{ "--icon": `url(${src})` } as CSSProperties}
    />
  );
}
