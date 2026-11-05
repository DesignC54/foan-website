"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { MaskIcon } from "./mask-icon";

// Horizontal snap scroller with simple pagination: dots + previous/next.
// Swipe/scroll still works; the controls follow the scroll position.

export function Carousel({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const count = Children.count(children);
  const [active, setActive] = useState(0);

  const step = useCallback(() => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 0;
    return (
      first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0")
    );
  }, []);

  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setActive(atEnd ? count - 1 : Math.round(el.scrollLeft / (step() || 1)));
  }, [count, step]);

  useEffect(() => {
    const el = track.current;
    el?.addEventListener("scroll", onScroll, { passive: true });
    return () => el?.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const go = (i: number) => {
    const idx = Math.max(0, Math.min(count - 1, i));
    track.current?.scrollTo({ left: idx * step(), behavior: "smooth" });
  };

  const arrow =
    "grid size-12 cursor-pointer place-items-center rounded-full border border-strong text-primary transition-colors hover:border-transparent hover:bg-accent hover:text-on-accent disabled:cursor-default disabled:opacity-30 disabled:hover:border-strong disabled:hover:bg-transparent disabled:hover:text-primary";

  return (
    <div
      className="flex flex-col gap-6 lg:gap-8"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 lg:scroll-px-[60px] lg:gap-10 lg:px-[60px]"
      >
        {children}
      </div>

      <div className="flex items-center justify-between px-5 lg:px-[60px]">
        <div className="flex items-center gap-2">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to story ${i + 1}`}
              aria-current={i === active || undefined}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${i === active ? "bg-accent w-6" : "bg-tertiary hover:bg-secondary w-2"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={arrow}
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous story"
          >
            <MaskIcon
              src="/images/site/icon-arrow-right.svg"
              className="size-6 rotate-180"
            />
          </button>
          <button
            type="button"
            className={arrow}
            onClick={() => go(active + 1)}
            disabled={active === count - 1}
            aria-label="Next story"
          >
            <MaskIcon
              src="/images/site/icon-arrow-right.svg"
              className="size-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
