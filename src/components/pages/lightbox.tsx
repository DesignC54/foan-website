"use client";

import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MaskIcon } from "@/components/ui/mask-icon";

// Full-screen photo viewer shared by the article gallery and /gallery/.
// Esc closes, arrow keys step, backdrop click closes.

export type LightboxItem = { src: string; caption?: string };

export function Lightbox({
  items,
  index,
  onChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const open = index !== null;
  const step = (d: number) =>
    index !== null && onChange((index + d + items.length) % items.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  const item = index !== null ? items[index] : null;
  const ctrl =
    "grid size-12 cursor-pointer place-items-center rounded-full bg-white/10 text-white backdrop-blur-[8px] transition-colors hover:bg-lime-500 hover:text-black";

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          data-theme="dark"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={item.caption ?? "Photo"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => onChange(null)}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-5 bg-black/88 p-5 backdrop-blur-[8px] lg:p-16"
        >
          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[70vh] w-full max-w-[1200px]"
          >
            <Image
              src={item.src}
              alt={item.caption ?? ""}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </motion.div>
          <div
            className="flex w-full max-w-[1200px] items-center justify-between gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="type-body-s text-white/80">
              {item.caption}
              <span className="text-white/40">
                {"  ·  "}
                {index! + 1} / {items.length}
              </span>
            </p>
            {items.length > 1 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => step(-1)}
                  className={ctrl}
                >
                  <MaskIcon
                    src="/images/site/icon-arrow-right.svg"
                    className="size-5 rotate-180"
                  />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => step(1)}
                  className={ctrl}
                >
                  <MaskIcon
                    src="/images/site/icon-arrow-right.svg"
                    className="size-5"
                  />
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => onChange(null)}
            className={`${ctrl} absolute top-5 right-5 lg:top-8 lg:right-8`}
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
