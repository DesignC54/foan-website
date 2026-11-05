"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Scroll reveals without wrapper elements, so Figma layouts stay intact:
//   data-reveal          → the element fades up when it enters the viewport
//   data-reveal-group    → each direct child reveals, 80ms after the previous
//                          (="zoom-in" etc. passes that variant to the children)
//   data-reveal-img      → the photo inside settles from a slight zoom
// Styles live in globals.css (they only hide content once JS is running, and
// switch off for prefers-reduced-motion).

export function ScrollReveal() {
  const path = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");

    document
      .querySelectorAll<HTMLElement>("[data-reveal-group]")
      .forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          const el = child as HTMLElement;
          if (!el.hasAttribute("data-reveal"))
            el.setAttribute("data-reveal", group.dataset.revealGroup ?? "");
          el.style.setProperty("--reveal-delay", `${i * 80}ms`);
        });
      });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document
      .querySelectorAll(
        "[data-reveal]:not(.is-in), [data-reveal-img]:not(.is-in)",
      )
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  return null;
}
