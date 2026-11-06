"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";

// Figma: Contact › Message (2169:1124) form and Offices (2369:5358) accordion
// (component set "Accordion / Office" 2366:90).

/* ---------------------------------------------------------------- */
/* Form: posts to /api/contact (Resend). If email sending isn't configured
   or fails, it falls back to opening the visitor's email app. */

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
  const [state, setState] = useState<
    "idle" | "sending" | "sent" | "mailto" | "error"
  >("idle");
  const [error, setError] = useState("");

  const mailto = (g: (k: string) => string) => {
    const body = [
      g("message"),
      "",
      "—",
      `${g("name")}${g("company") ? `, ${g("company")}` : ""}`,
      g("email"),
      g("phone"),
    ]
      .filter((l, i) => l || i < 3)
      .join("
");
    window.location.href = `mailto:info@foangroup.com?subject=${encodeURIComponent(g("subject"))}&body=${encodeURIComponent(body)}`;
    setState("mailto");
  };

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const g = (k: string) => String(f.get(k) ?? "").trim();
    setState("sending");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(f)),
      });
      if (res.ok) {
        form.reset();
        setState("sent");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (data.fallback === "mailto") return mailto(g);
      setError(data.error ?? "Something went wrong. Please try again.");
      setState("error");
    } catch {
      mailto(g);
    }
  };

  if (state === "sent") {
    return (
      <div
        data-theme="dark"
        role="status"
        className="bg-surface flex flex-col items-center gap-4 rounded-[24px] px-6 py-16 text-center"
      >
        <span className="grid size-14 place-items-center rounded-full bg-lime-500 text-black">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <p className="type-h3 text-white">Message sent</p>
        <p className="type-body-m max-w-[440px] text-white/70">
          Thank you. Our team will get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="type-label-button mt-2 cursor-pointer text-lime-500 underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={send}
      data-theme="dark"
      className="bg-surface relative grid gap-5 rounded-[24px] p-6 md:grid-cols-2 md:p-10 lg:p-12"
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
      {/* Honeypot for spam bots: hidden from people and screen readers */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] size-px opacity-0"
      />
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="cursor-pointer rounded-full transition-opacity disabled:cursor-wait disabled:opacity-60"
        >
          <Button
            label={state === "sending" ? "Sending…" : "Send Message"}
            variant="lime"
          />
        </button>
        {state === "mailto" && (
          <p className="type-body-s text-white/70" role="status">
            Your email app should open with the message ready to send.
          </p>
        )}
        {state === "error" && (
          <p className="type-body-s text-afrixx-orange" role="alert">
            {error}
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
