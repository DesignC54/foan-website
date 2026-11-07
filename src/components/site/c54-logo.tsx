import Image from "next/image";

// The real C54NEWS logo (Figma: "C54NEWS Logo"). It ships with its own blue
// background, so every container it sits in uses `bg-c54-blue` to match.
// The logo is fitted (object-contain) inside the box given by `className`.

export function C54Logo({
  className,
  sizes,
}: {
  className: string;
  sizes: string;
}) {
  return (
    <div className={`absolute ${className}`}>
      <Image
        src="/images/site/c54news-logo.png"
        alt="C54News"
        fill
        sizes={sizes}
        className="object-contain"
      />
    </div>
  );
}
