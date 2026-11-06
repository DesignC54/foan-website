"use client";

import Image from "next/image";
import { useState } from "react";
import { MaskIcon } from "@/components/ui/mask-icon";
import { Lightbox, type LightboxItem } from "./lightbox";

// Figma: Blog article › Gallery (4015:5450). 4-up square grid; hover gives the
// lime border + arrow badge the first tile shows in the design. Opens the
// lightbox.

export function PhotoGrid({ items }: { items: LightboxItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div
        data-reveal-group
        className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4"
      >
        {items.map((it, i) => (
          <button
            key={it.src + i}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open photo ${i + 1}: ${it.caption ?? ""}`}
            className="group bg-surface-raised relative aspect-square cursor-zoom-in overflow-clip rounded-[16px] outline-2 -outline-offset-2 outline-transparent transition-[outline-color] hover:outline-lime-500 lg:rounded-[20px]"
          >
            <Image
              src={it.src}
              alt={it.caption ?? ""}
              fill
              sizes="(min-width: 1024px) 330px, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <span className="absolute top-3 right-3 grid size-9 scale-75 place-items-center rounded-full bg-lime-500 text-black opacity-0 transition-[opacity,scale] duration-300 group-hover:scale-100 group-hover:opacity-100">
              <MaskIcon
                src="/images/site/icon-arrow-right.svg"
                className="size-4 -rotate-45"
              />
            </span>
          </button>
        ))}
      </div>
      <Lightbox items={items} index={open} onChange={setOpen} />
    </>
  );
}
