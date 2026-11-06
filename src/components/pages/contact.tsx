"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";

// Figma: Contact › Message (2169:1124) form and Offices (2369:5358) accordion
// (component set "Accordion / Office" 2366:90).

/* ---------------------------------------------------------------- */
/* Form. Static hosting has no server yet, so Send opens the visitor's
   email app with the message filled in (to info@). Swap `send` for the
   Namecheap PHP endpoint at launch. */

const field =
  "type-body-m w-full rounded-[8px] border border-white/10 bg-neutral-700 px-4 py-3 text-white placeholder:text-white/35 transition-colors outline-none focus:border-lime-500";

function Field({
  label,
  name,
  required,
  type = "text",
  textarea,
  className = "",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="type-body-s text-white/75">
        {label}
        {required && <span className="text-lime-500"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          className={`${field} min-h-[140px] resize-y`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          autoComplete={
            name === "name"
              ? "name"
              : name === "email"
                ? "email"
                : name === "phone"
                  ? "tel"
                  : name === "company"
                    ? "organization"
                    : "off"
          }
          className={field}
        />
      )}
    </label>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "").trim();
    const body = [
      g("message"),
      "",
      "—",
      `${g("name")}${g("company") ? `, ${g("company")}` : ""}`,
      g("email"),
      g("phone"),
    ]
      .filter((l, i) => l || i < 3)
      .join("\n");
    window.location.href = `mailto:info@foangroup.com?subject=${encodeURIComponent(g("subject"))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={send}
      data-theme="dark"
      className="bg-surface grid gap-5 rounded-[24px] p-6 md:grid-cols-2 md:p-10 lg:p-12"
    >
      <Field label="Full Name" name="name" required />
      <Field label="Email Address" name="email" type="email" required />
      <Field label="Phone Number" name="phone" type="tel" />
      <Field label="Company" name="company" />
      <Field
        label="Subject"
        name="subject"
        required
        className="md:col-span-2"
      />
      <Field
        label="Message"
        name="message"
        required
        textarea
        className="md:col-span-2"
      />
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <button type="submit" className="cursor-pointer rounded-full">
          <Button label="Send Message" variant="lime" />
        </button>
        {sent && (
          <p className="type-body-s text-white/70" role="status">
            Your email app should open with the message ready to send.
          </p>
        )}
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------- */

export type Office = {
  kind: string;
  city: string;
  address: string;
  note: string;
};

export function OfficeAccordion({ offices }: { offices: Office[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div data-theme="dark" className="flex flex-col gap-3">
      {offices.map((o, i) => {
        const on = open === i;
        return (
          <div
            key={o.city}
            data-reveal
            className={`overflow-clip rounded-[20px] border transition-colors ${on ? "border-lime-500 bg-neutral-700" : "bg-surface border-transparent hover:border-white/15"}`}
          >
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(on ? -1 : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left lg:px-8 lg:py-6"
            >
              <span className="flex flex-col gap-1.5">
                <span
                  className={`type-label-overline ${on ? "text-lime-500" : "text-white/60"}`}
                >
                  {o.kind}
                </span>
                <span className="type-h3 text-white">{o.city}</span>
              </span>
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-full transition-colors ${on ? "bg-lime-500 text-black" : "bg-white/10 text-white"}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`size-4 transition-transform duration-300 ${on ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mx-6 flex flex-col gap-3 border-t border-white/10 pt-5 pb-6 lg:mx-8 lg:pb-7">
                    <p className="type-h4 text-white">{o.address}</p>
                    <p className="type-body-s text-white/70">{o.note}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
