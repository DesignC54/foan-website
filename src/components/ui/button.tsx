import { SmartLink } from "./smart-link";

// Figma: Button (2043:202). Pill with label + 32px arrow badge.
// Colours are primitives in Figma, so buttons look the same in both themes.
export type ButtonVariant =
  | "lime"
  | "yellow"
  | "white"
  | "dark"
  | "outline"
  | "glass"
  | "disabled"
  | "back";

const styles: Record<ButtonVariant, { box: string; arrow: string }> = {
  lime: { box: "bg-lime-500 text-neutral-900", arrow: "btn-arrow-dark" },
  yellow: { box: "bg-yellow-500 text-black", arrow: "btn-arrow-yellow" },
  // On a Light page a white pill vanishes, so it gets the Outline look
  // (drawn inside, so the size doesn't change between themes).
  white: {
    box: "bg-white text-neutral-900 light:shadow-[inset_0_0_0_1.5px_#0e0f0c]",
    arrow: "btn-arrow-white",
  },
  dark: { box: "bg-neutral-900 text-white", arrow: "btn-arrow-lime" },
  outline: {
    box: "border-[1.5px] border-neutral-900 bg-white text-neutral-900",
    arrow: "btn-arrow-dark",
  },
  glass: {
    box: "bg-white/90 text-neutral-900 shadow-glass",
    arrow: "btn-arrow-lime",
  },
  disabled: { box: "bg-neutral-300 text-black", arrow: "btn-arrow-disabled" },
  back: {
    box: "border-[1.5px] border-neutral-900 bg-white text-neutral-900",
    arrow: "btn-arrow-back",
  },
};

type Props = {
  label: string;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
};

export function Button({
  label,
  variant = "lime",
  href,
  className = "",
}: Props) {
  const s = styles[variant];
  const isBack = variant === "back";
  const arrow = (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size SVG badge
    <img
      src={`/images/site/${s.arrow}.svg`}
      alt=""
      width={32}
      height={32}
      className={`size-8 shrink-0 transition-transform duration-300 ${isBack ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`}
    />
  );
  const classes = `group inline-flex items-center gap-4 rounded-full py-2 whitespace-nowrap type-label-button ${isBack ? "pr-6 pl-2" : "pr-2 pl-6"} ${s.box} ${className}`;
  const content = isBack ? (
    <>
      {arrow}
      {label}
    </>
  ) : (
    <>
      {label}
      {arrow}
    </>
  );

  if (variant === "disabled" || !href) {
    return (
      <span
        className={classes}
        aria-disabled={variant === "disabled" || undefined}
      >
        {content}
      </span>
    );
  }
  return (
    <SmartLink href={href} className={classes}>
      {content}
    </SmartLink>
  );
}
