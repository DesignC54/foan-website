"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BoardCard } from "@/components/site/board-card";
import type { BoardMember } from "@/lib/board";

// Board grid + "Modal / Board bio" (Figma 2218:2685). The + opens the bio;
// /leadership/#<slug> opens it directly (links from the About page).
// Closes on Escape, the close button or a click on the backdrop.

export function BoardGrid({ members }: { members: BoardMember[] }) {
  const [open, setOpen] = useState<BoardMember | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const show = useCallback((m: BoardMember) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(m);
    history.replaceState(null, "", `#${m.slug}`);
  }, []);
  const close = useCallback(() => {
    setOpen(null);
    history.replaceState(null, "", location.pathname);
    lastFocus.current?.focus();
  }, []);

  // Deep link: open the member named in the URL hash.
  useEffect(() => {
    const fromHash = () => {
      const m = members.find((x) => `#${x.slug}` === location.hash);
      if (m) setOpen(m);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [members]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <div
        data-reveal-group
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {members.map((m) => (
          <div key={m.slug} id={m.slug} className="scroll-mt-28">
            <BoardCard member={m} onOpen={() => show(m)} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            data-theme="dark"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-black/72 px-5 py-6 backdrop-blur-[8px] lg:px-[100px] lg:py-[120px]"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="bio-name"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="border-subtle bg-surface mx-auto max-w-[1240px] overflow-clip rounded-lg border shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 50% 50% at 70% 50%, rgba(115,128,13,0.22), rgba(115,128,13,0))",
              }}
            >
              {/* Header */}
              <div className="border-subtle flex items-start gap-6 border-b p-6 lg:p-10">
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <p className="type-label-overline text-accent-text">
                    {open.title}
                  </p>
                  <h2 id="bio-name" className="type-h2 text-primary">
                    {open.name}
                  </h2>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close biography"
                  className="size-11 shrink-0 cursor-pointer rounded-full transition-transform hover:rotate-90"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- close badge */}
                  <img
                    src="/images/leadership/modal-close.svg"
                    alt=""
                    width={44}
                    height={44}
                    className="size-11"
                  />
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-6 p-6 lg:flex-row lg:gap-10 lg:p-10">
                <div className="bg-surface-raised relative flex h-[420px] shrink-0 flex-col justify-end overflow-clip rounded-sm p-6 lg:h-[600px] lg:w-[440px]">
                  <Image
                    src={open.photo}
                    alt={open.name}
                    fill
                    sizes="440px"
                    className="object-cover"
                    style={{ objectPosition: open.position }}
                  />
                  <div className="border-subtle relative flex flex-col gap-2 rounded-tl-sm rounded-tr-xs rounded-br-xs rounded-bl-sm border bg-[rgba(39,39,39,0.5)] px-8 py-3 backdrop-blur-[10px]">
                    <p className="type-h4 text-primary">{open.name}</p>
                    <p className="type-label-button text-secondary">
                      {open.title}
                    </p>
                  </div>
                </div>
                <div className="border-subtle flex min-w-0 flex-1 flex-col gap-6 rounded-sm border bg-[rgba(39,39,39,0.6)] p-6 backdrop-blur-[10px] lg:p-8">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element -- info icon */}
                    <img
                      src="/images/leadership/icon-info.svg"
                      alt=""
                      width={28}
                      height={28}
                      className="size-7"
                    />
                    <p className="type-h4 text-primary">Biography</p>
                  </div>
                  <div className="type-body-l text-secondary flex flex-col gap-4">
                    {open.bio.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
