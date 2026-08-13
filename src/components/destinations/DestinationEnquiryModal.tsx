"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MapPin, Phone, User, X } from "lucide-react";
import type { Destination } from "@/data/destinations";

/**
 * Enquiry popup — name, phone, destination. Nothing else.
 *
 * Deliberately a custom dialog rather than a headless-UI dependency: the project
 * has no dialog primitive, and the behaviours that actually matter here are
 * small enough to own — Escape to close, backdrop click, body scroll lock,
 * initial focus, focus restored to whatever opened it.
 *
 * NOTE: submission is UI-only, matching the hero form and CabBookingSection.
 * There is no leads API route or model in this project, so there is nowhere to
 * POST. The success state is real; the delivery is not. Wire handleSubmit before
 * launch or these enquiries are lost.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const FIELD =
  "flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 transition-colors focus-within:border-sky-400 focus-within:bg-white";
const INPUT =
  "w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none";

export default function DestinationEnquiryModal({
  open,
  onClose,
  destinations,
  /** Pre-selected destination — set when opened from a specific table row. */
  initialSlug,
}: {
  open: boolean;
  onClose: () => void;
  destinations: Destination[];
  initialSlug?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [slug, setSlug] = useState(initialSlug ?? destinations[0]?.slug ?? "");
  const [sent, setSent] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  // Whatever had focus before the dialog opened, so it can be handed back.
  const openerRef = useRef<Element | null>(null);

  // Follow the row that opened the dialog, and reset the form for a fresh open.
  useEffect(() => {
    if (!open) return;
    if (initialSlug) setSlug(initialSlug);
    setSent(false);
  }, [open, initialSlug]);

  useEffect(() => {
    if (!open) return;

    openerRef.current = document.activeElement;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    // Lock the page behind the dialog, restoring whatever overflow was there
    // rather than assuming it was "visible".
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // After the entry animation starts, not before, or the browser scrolls the
    // half-positioned dialog into view.
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 120);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      (openerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  const selected = destinations.find((destination) => destination.slug === slug);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // TODO: POST to a leads endpoint. Logged so it is obvious in dev that
    // nothing is persisted yet.
    console.log("Destination enquiry:", {
      name,
      phone,
      destination: selected?.name ?? slug,
    });
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-300 flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop is its own element so clicking it closes, while clicks
              inside the card don't bubble out to it. */}
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/30"
          >
            {/* Gradient header carries the brand colour so the card doesn't read
                as a bare system dialog. */}
            <div className="flex items-start justify-between gap-3 bg-linear-to-r from-sky-500 to-cyan-400 px-5 py-4 text-white">
              <div>
                <p id="enquiry-title" className="font-heading text-base font-bold">
                  Plan your Kashmir trip
                </p>
                <p className="mt-0.5 text-xs text-white/85">
                  Sartaj replies with real prices — no spam.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close enquiry form"
                className="-mt-1 -mr-1 shrink-0 cursor-pointer rounded-full p-1.5 text-white/85 transition-colors hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="py-2 text-center"
                  >
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Check className="h-5 w-5" />
                    </span>

                    <p className="mt-3 font-heading text-base font-bold text-slate-900">
                      Thanks{name ? `, ${name.split(" ")[0]}` : ""}!
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      We&apos;ll call you about{" "}
                      <span className="font-semibold text-slate-800">
                        {selected?.name ?? "your trip"}
                      </span>
                      .
                    </p>

                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-4 cursor-pointer text-sm font-semibold text-sky-600 hover:text-sky-700"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    <div className={FIELD}>
                      <User aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-500" />
                      <input
                        ref={nameRef}
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        autoComplete="name"
                        aria-label="Your name"
                        placeholder="Your name"
                        className={INPUT}
                      />
                    </div>

                    <div className={FIELD}>
                      <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-500" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        aria-label="Phone number"
                        placeholder="Phone number"
                        className={INPUT}
                      />
                    </div>

                    <div className={FIELD}>
                      <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-500" />
                      <select
                        value={slug}
                        onChange={(event) => setSlug(event.target.value)}
                        aria-label="Destination you are interested in"
                        className={`${INPUT} cursor-pointer`}
                      >
                        {destinations.map((destination) => (
                          <option key={destination.slug} value={destination.slug}>
                            {destination.name}
                          </option>
                        ))}
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full cursor-pointer rounded-xl bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform hover:-translate-y-0.5"
                    >
                      Get my quote
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
