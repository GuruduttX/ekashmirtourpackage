"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Mountain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import DestinationEnquiryModal from "@/components/destinations/DestinationEnquiryModal";
import type { Destination } from "@/data/destinations";

/**
 * Kashmir destinations at a glance — SOP §2.4's quick-facts box in its hub form.
 *
 * The per-place spec gives each destination page a quick-facts box (altitude ·
 * distance from Srinagar · best time · famous for). A hub has no single altitude,
 * so those four fields become one comparison row per place.
 *
 * It stays a real <table> with a <thead>, <caption> and row headers even though
 * it is now interactive: that markup is what wins the table featured snippet,
 * and a client component still server-renders, so the whole table is in the
 * initial HTML. The JS only adds the hover/enquire behaviour on top.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Per-row accent, taken by index so a fifth destination still gets a colour
 * instead of falling off the end of a slug lookup. Written as whole literal
 * class strings because Tailwind scans source text — interpolated names like
 * `bg-${hue}-500` would never be generated.
 */
const ACCENTS = [
  {
    bar: "bg-sky-500",
    chip: "bg-sky-50 text-sky-700 ring-sky-200",
    rowHover: "hover:bg-sky-50/60",
    dot: "text-sky-500",
  },
  {
    bar: "bg-cyan-500",
    chip: "bg-cyan-50 text-cyan-700 ring-cyan-200",
    rowHover: "hover:bg-cyan-50/60",
    dot: "text-cyan-500",
  },
  {
    bar: "bg-teal-500",
    chip: "bg-teal-50 text-teal-700 ring-teal-200",
    rowHover: "hover:bg-teal-50/60",
    dot: "text-teal-500",
  },
  {
    bar: "bg-indigo-500",
    chip: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    rowHover: "hover:bg-indigo-50/60",
    dot: "text-indigo-500",
  },
];

const CELL = "px-4 py-4 align-middle text-sm";

export default function DestinationComparisonTable({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [enquirySlug, setEnquirySlug] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (!destinations.length) return null;

  const openEnquiry = (slug?: string) => {
    setEnquirySlug(slug ?? null);
    setModalOpen(true);
  };

  return (
    <section id="compare" className="w-full scroll-mt-24 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-sky-600 uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            At a glance
          </p>

          <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
            Kashmir destinations{" "}
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              compared
            </span>
          </h2>

          {/* SOP answer-first block, 40–60 words. */}
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            Kashmir&apos;s trip is built around four places: Srinagar for Dal
            Lake and the gardens, Gulmarg for snow and the gondola, Pahalgam for
            river valleys, and Sonamarg for glacier drives. Most travellers base
            in Srinagar and day-trip to the rest — the table below is the
            fastest way to see which ones fit your dates.
          </p>
        </div>

        {/* The scroll container, not the page, absorbs the overflow — six
            columns cannot fit a phone, and a body that scrolls sideways is worse
            than a table that does. */}
        <div className="mt-6 overflow-x-auto overflow-y-hidden rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-216 border-collapse text-left">
            <caption className="sr-only">
              Kashmir destinations compared by altitude, distance from Srinagar,
              best season and what each place is known for.
            </caption>

            <thead>
              <tr className="bg-linear-to-r from-slate-900 to-slate-800 text-white">
                <th scope="col" className={`${CELL} font-semibold`}>
                  Destination
                </th>
                <th scope="col" className={`${CELL} font-semibold`}>
                  <span className="inline-flex items-center gap-1.5">
                    <Mountain className="h-3.5 w-3.5 text-sky-300" />
                    Altitude
                  </span>
                </th>
                <th scope="col" className={`${CELL} font-semibold`}>
                  From Srinagar
                </th>
                <th scope="col" className={`${CELL} font-semibold`}>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-sky-300" />
                    Best time to go
                  </span>
                </th>
                <th scope="col" className={`${CELL} font-semibold`}>
                  Famous for
                </th>
                <th scope="col" className={`${CELL} font-semibold`}>
                  <span className="sr-only">Enquire</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {destinations.map((destination, index) => {
                const accent = ACCENTS[index % ACCENTS.length];

                return (
                  <motion.tr
                    key={destination.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_OUT,
                      delay: index * 0.07,
                    }}
                    className={`group border-t border-slate-100 transition-colors ${accent.rowHover}`}
                  >
                    {/* scope="row" so a screen reader announces which place each
                        cell belongs to. */}
                    <th scope="row" className={`${CELL} font-semibold`}>
                      <span className="flex items-center gap-3">
                        {/* Accent bar grows on row hover — the cheapest way to
                            tie a wide row together as the eye tracks across. */}
                        <span
                          aria-hidden="true"
                          className={`h-6 w-1 shrink-0 rounded-full transition-all duration-300 group-hover:h-9 ${accent.bar}`}
                        />
                        <Link
                          href={`/destinations/${destination.slug}/`}
                          className="inline-flex items-center gap-1.5 whitespace-nowrap text-slate-900 transition-colors hover:text-sky-700"
                        >
                          {destination.name}
                          <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-sky-500" />
                        </Link>
                      </span>
                    </th>

                    <td className={`${CELL} whitespace-nowrap`}>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${accent.chip}`}
                      >
                        {destination.altitude}
                      </span>
                    </td>

                    {/* Srinagar is the base, so it has no drive from itself —
                        an em dash reads better than a fabricated "0 km". */}
                    <td className={`${CELL} whitespace-nowrap text-slate-600`}>
                      {destination.fromSrinagar ?? (
                        <span className="text-slate-400">— base city</span>
                      )}
                    </td>

                    <td className={`${CELL} text-slate-600`}>
                      {destination.bestTime}
                    </td>

                    <td className={`${CELL} text-slate-600`}>
                      {destination.famousFor}
                    </td>

                    <td className={`${CELL} text-right`}>
                      {/* Opens the popup already set to this row's destination,
                          so the reader never re-picks what they just clicked. */}
                      <button
                        type="button"
                        onClick={() => openEnquiry(destination.slug)}
                        className="cursor-pointer rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                      >
                        Enquire
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Data-honesty note (SOP): distances and seasons are the volatile
            values here, so they are qualified rather than stated flat. */}
        <p className="mt-3 text-center text-xs text-slate-500 md:text-left">
          Distances are road distances from Srinagar and vary with the route
          taken. Seasons shift year to year — Sonamarg in particular depends on
          when the road opens.{" "}
          <span className="font-medium text-slate-600">[VERIFY 2026-27]</span>
        </p>

        {/* ---------- CTA ---------- */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="relative mt-8 overflow-hidden rounded-2xl bg-linear-to-r from-sky-600 via-sky-500 to-cyan-400 px-6 py-7 sm:px-8"
        >
          {/* Soft light bloom, top-right — keeps a flat gradient band from
              looking like a plain coloured rectangle. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-white/15 blur-2xl"
          />

          <div className="relative flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                Still deciding between them?
              </h3>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/90">
                Tell us which places you like and Sartaj will send a route with
                real prices — 20 years of planning these exact trips.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openEnquiry()}
              className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-sky-700 shadow-lg shadow-sky-900/20 transition-transform hover:-translate-y-0.5"
            >
              Get a free quote
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>

      <DestinationEnquiryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        destinations={destinations}
        initialSlug={enquirySlug ?? undefined}
      />
    </section>
  );
}
