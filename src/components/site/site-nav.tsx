"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { houses, impactLinks, navItems, type NavItem } from "@/lib/site";
import { SmartLink } from "@/components/ui/smart-link";
import { HouseTile } from "./house-tile";
import { ThemeToggle } from "./theme-toggle";

// Figma: Site / Nav (2163:165), Nav / Dropdown (2343:5058), Nav / Mobile menu (2342:4998).

type Menu = "businesses" | "impact";

const iconStyle = (file: string) =>
  ({ "--icon": `url(/images/site/${file})` }) as CSSProperties;
const fade = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};

function isActive(item: NavItem, path: string) {
  if (item.menu === "businesses") return false;
  if (item.menu === "impact")
    return impactLinks.some((l) => path.startsWith(l.href));
  const href = item.href ?? "";
  // "/about/#investors" should not light up on /about/, only exact page links do.
  if (href.includes("#")) return false;
  return href === "/" ? path === "/" : path.startsWith(href);
}

function Logo() {
  return (
    <Link
      href="/"
      aria-label="FOAN Group home"
      className="block h-[46px] w-[76px] shrink-0"
    >
      <Image
        src="/images/site/foan-logo.webp"
        alt="FOAN Group"
        width={240}
        height={146}
        priority
        className="size-full object-contain"
      />
    </Link>
  );
}

/* ---------------------------------------------------------------- */
/* Desktop dropdowns                                                 */
/* ---------------------------------------------------------------- */

function BusinessesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex items-stretch gap-8 p-6">
      <Link
        href="/about/#brands"
        onClick={onNavigate}
        className="bg-accent text-on-accent flex min-w-0 flex-1 flex-col justify-between overflow-clip rounded-[20px] p-7"
      >
        <div className="flex flex-col gap-3">
          <p className="type-label-overline">Businesses</p>
          <p className="type-h2">Five houses, one group</p>
          <p className="type-body-s">
            Five companies, one standard for how information is gathered,
            verified, produced and distributed.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size SVG badge */}
        <img
          src="/images/site/dd-arrow-intro.svg"
          alt=""
          width={48}
          height={48}
          className="size-12"
        />
      </Link>
      <ul className="flex gap-3">
        {houses.map((h) => (
          <li key={h.key} className="flex">
            <SmartLink
              href={h.href}
              onClick={onNavigate}
              className="group hover:border-accent-text hover:bg-surface-raised focus-visible:border-accent-text focus-visible:bg-surface-raised relative flex w-[184px] flex-col gap-3.5 overflow-clip rounded-[20px] border border-transparent px-2 pt-2 pb-4 transition-colors"
            >
              <HouseTile house={h.key} size="lg" />
              <div className="flex flex-col gap-1.5 px-2">
                <p className="type-h4 text-primary group-hover:text-accent-text transition-colors">
                  {h.name}
                </p>
                <p className="type-label-small text-secondary">
                  {h.meta[0]}
                  <br />
                  {h.meta[1]}
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element -- hover badge */}
              <img
                src="/images/site/dd-arrow-hover.svg"
                alt=""
                width={32}
                height={32}
                className="absolute top-[15px] left-[135px] size-8 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ImpactPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex items-stretch gap-4 p-4">
      <div className="relative flex w-[220px] shrink-0 flex-col justify-end overflow-clip rounded-[20px] p-5">
        <Image
          src="/images/site/impact-menu.webp"
          alt=""
          fill
          sizes="220px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70" />
        <p className="type-h3 relative text-white">Impact</p>
      </div>
      <ul className="flex w-[380px] flex-col gap-2">
        {impactLinks.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={onNavigate}
              className="group bg-surface-raised hover:bg-accent focus-visible:bg-accent flex items-center gap-4 rounded-[20px] py-5 pr-5 pl-6 transition-colors"
            >
              <span className="type-h3 text-primary group-hover:text-on-accent group-focus-visible:text-on-accent min-w-0 flex-1">
                {l.label}
              </span>
              <span className="relative size-10 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element -- badge */}
                <img
                  src="/images/site/dd-link-arrow.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="badge-invert absolute inset-0 group-hover:opacity-0 group-focus-visible:opacity-0"
                />
                {/* eslint-disable-next-line @next/next/no-img-element -- hover badge */}
                <img
                  src="/images/site/dd-link-arrow-hover.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Mobile menu                                                       */
/* ---------------------------------------------------------------- */

function MobileMenu({ path, onClose }: { path: string; onClose: () => void }) {
  const [expanded, setExpanded] = useState<Menu | null>(
    path.startsWith("/blog") ||
      path.startsWith("/gallery") ||
      path.startsWith("/video")
      ? "impact"
      : null,
  );

  const row =
    "flex w-full items-center gap-3 border-b border-subtle py-[18px] text-left";
  return (
    <motion.div
      {...fade}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="bg-page nav:hidden fixed inset-0 z-[60] overflow-y-auto overscroll-contain"
    >
      <div className="relative flex min-h-full flex-col gap-5 overflow-clip pb-8">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative glow */}
        <img
          src="/images/site/mm-glow.svg"
          alt=""
          className="pointer-events-none absolute top-[-260px] left-[-60px] size-[520px] max-w-none"
        />
        <div className="relative flex h-14 items-center justify-between px-5 py-1">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="size-12 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- badge */}
            <img
              src="/images/site/mm-close.svg"
              alt=""
              width={48}
              height={48}
              className="badge-invert size-12"
            />
          </button>
        </div>

        <nav className="relative flex flex-col px-5" aria-label="Main">
          {navItems.map((item) => {
            if (!item.menu) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`${row} type-h2 ${isActive(item, path) ? "text-accent-text" : "text-primary"}`}
                >
                  {item.label}
                </Link>
              );
            }
            const open = expanded === item.menu;
            return (
              <div key={item.label}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setExpanded(open ? null : item.menu)}
                  className={`${row} cursor-pointer`}
                >
                  <span
                    className={`type-h2 min-w-0 flex-1 ${open ? "text-accent-text" : "text-primary"}`}
                  >
                    {item.label}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element -- chevron badge */}
                  <img
                    src={
                      open
                        ? "/images/site/mm-chevron-open.svg"
                        : "/images/site/mm-chevron-closed.svg"
                    }
                    alt=""
                    width={36}
                    height={36}
                    className={`size-9 shrink-0 ${open ? "" : "badge-invert"}`}
                  />
                </button>
                {open && (
                  <ul className="border-subtle flex flex-col gap-2 border-b py-3">
                    {item.menu === "businesses"
                      ? houses.map((h) => (
                          <li key={h.key}>
                            <SmartLink
                              href={h.href}
                              onClick={onClose}
                              className="group hover:bg-surface-raised flex items-center gap-3.5 rounded-[16px] py-2 pr-3 pl-2 transition-colors"
                            >
                              <HouseTile house={h.key} size="sm" />
                              <span className="flex min-w-0 flex-1 flex-col gap-0.5 whitespace-nowrap">
                                <span className="type-h4 text-primary group-hover:text-accent-text">
                                  {h.name}
                                </span>
                                <span className="type-label-small text-secondary">
                                  {h.meta[0]}
                                </span>
                              </span>
                              <MobileArrow />
                            </SmartLink>
                          </li>
                        ))
                      : impactLinks.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={onClose}
                              className="group hover:bg-surface-raised flex items-center gap-3.5 rounded-[16px] py-3 pr-3 pl-4 transition-colors"
                            >
                              <span
                                className={`type-h4 group-hover:text-accent-text min-w-0 flex-1 ${path.startsWith(l.href) ? "text-accent-text" : "text-primary"}`}
                              >
                                {l.label}
                              </span>
                              <MobileArrow />
                            </Link>
                          </li>
                        ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="relative px-5 pt-2">
          <Link
            href="/contact/"
            onClick={onClose}
            className="type-label-button flex w-full items-center gap-4 rounded-full bg-lime-500 py-2 pr-2 pl-6 text-neutral-900"
          >
            Contact Us
            {/* eslint-disable-next-line @next/next/no-img-element -- badge */}
            <img
              src="/images/site/btn-arrow-dark.svg"
              alt=""
              width={32}
              height={32}
              className="size-8"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function MobileArrow() {
  return (
    <span className="relative size-8 shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element -- badge */}
      <img
        src="/images/site/mm-arrow.svg"
        alt=""
        width={32}
        height={32}
        className="badge-invert absolute inset-0 group-hover:opacity-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- hover badge */}
      <img
        src="/images/site/mm-arrow-hover.svg"
        alt=""
        width={32}
        height={32}
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
      />
    </span>
  );
}

/* ---------------------------------------------------------------- */
/* Header                                                            */
/* ---------------------------------------------------------------- */

export function SiteNav() {
  const path = usePathname() || "/";
  const isHome = path === "/";
  const [menu, setMenu] = useState<Menu | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (m: Menu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(m);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMenu(null), 150);
  };
  const close = () => setMenu(null);

  // Close on Escape and on scroll; lock page scroll while the mobile menu is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    const onScroll = () => setMenu(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`absolute inset-x-0 top-0 z-50 pt-4 ${isHome ? "nav:pt-10" : ""}`}
        onMouseLeave={scheduleClose}
      >
        <div className="max-w-frame px-gutter nav:h-14 relative mx-auto flex h-12 items-center justify-between">
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop pill */}
          <nav
            aria-label="Main"
            className="bg-surface-raised nav:flex hidden h-14 items-center gap-9 rounded-full px-10"
          >
            {navItems.map((item) => {
              const active = isActive(item, path);
              const color = active
                ? "text-accent-text"
                : "text-primary hover:text-accent-text";
              if (!item.menu) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onMouseEnter={close}
                    className={`type-label-nav whitespace-nowrap transition-colors ${color}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              }
              const isOpen = menu === item.menu;
              return (
                <button
                  key={item.label}
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onMouseEnter={() => open(item.menu)}
                  onClick={() => (isOpen ? close() : open(item.menu))}
                  className={`type-label-nav flex cursor-pointer items-center gap-2 whitespace-nowrap transition-colors ${isOpen ? "text-accent-text" : color}`}
                >
                  {item.label}
                  <span
                    className={`icon size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    style={iconStyle("icon-chevron-down.svg")}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="nav:block hidden">
              <ThemeToggle device="desktop" />
            </div>
            <div className="nav:hidden">
              <ThemeToggle device="mobile" />
            </div>
            <Link
              href="/about/"
              className="group bg-highlight type-label-button text-on-accent nav:flex hidden items-center gap-4 rounded-full py-2 pr-2 pl-6 whitespace-nowrap"
            >
              About us
              <span className="bg-inverse text-inverse-text grid size-8 place-items-center rounded-full">
                <span
                  className="icon size-6 transition-transform group-hover:translate-x-0.5"
                  style={iconStyle("icon-arrow-right.svg")}
                />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="bg-surface nav:hidden flex size-12 cursor-pointer flex-col items-center justify-center gap-1 rounded-full"
            >
              <span className="bg-inverse h-0.5 w-[18px] rounded-[1px]" />
              <span className="bg-inverse h-0.5 w-[18px] rounded-[1px]" />
              <span className="bg-inverse h-0.5 w-[18px] rounded-[1px]" />
            </button>
          </div>

          {/* Desktop dropdown */}
          <AnimatePresence>
            {menu && (
              <motion.div
                key={menu}
                {...fade}
                onMouseEnter={() => open(menu)}
                className={`border-subtle bg-surface nav:block absolute top-full mt-3 hidden overflow-clip rounded-[28px] border shadow-[0_24px_32px_rgba(0,0,0,0.5)] backdrop-blur-[12px] ${
                  menu === "businesses"
                    ? "inset-x-[var(--layout-gutter)]"
                    : "right-[var(--layout-gutter)]"
                }`}
              >
                {menu === "businesses" ? (
                  <BusinessesPanel onNavigate={close} />
                ) : (
                  <ImpactPanel onNavigate={close} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Scrim under the open dropdown (Figma: black 60%, from the bottom of the nav) */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            aria-hidden
            className={`nav:block fixed inset-x-0 bottom-0 z-40 hidden bg-black/60 ${isHome ? "top-24" : "top-[72px]"}`}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu path={path} onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
