"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Info, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Destination } from "@/data/destinations";

/**
 * "How many days do you need?" — how the four destinations combine into a trip.
 *
 * This is the one section a hub can carry that no individual destination page
 * can: an /destinations/gulmarg/ page has no reason to explain how Gulmarg fits
 * around Pahalgam. It is the hub's information-gain angle (SOP A4) and the
 * natural feeder into the duration package pages.
 *
 * NOTE on links: duration hubs (/kashmir-tour-packages/6-days-5-nights/) are
 * Mongo-backed and only resolve when a DurationHub doc is published, so each
 * itinerary points at the package hub rather than a slug that may 404. Once
 * those hubs are live, give an itinerary a `packageSlug` and the button follows
 * it — one field, no other change.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Itinerary = {
  id: string;
  /** Tab label. */
  label: string;
  /** Full name, SOP duration-page phrasing. */
  title: string;
  bestFor: string;
  /** Slugs must exist in DESTINATIONS — the stop resolves its name from there. */
  stops: Array<{ slug: string; nights: number }>;
  /** Optional duration-hub slug; falls back to the package hub while unset. */
  packageSlug?: string;
};

/**
 * Night counts per stop sum to the nights in each title — worth keeping true if
 * these are edited, since a 6-days-5-nights route that adds up to 4 is exactly
 * the kind of detail a reader checks.
 */
const ITINERARIES: Itinerary[] = [
  {
    id: "4d3n",
    label: "4 days",
    title: "4 days, 3 nights",
    bestFor:
      "A first look at the valley — the lake, the gardens and one day in the snow.",
    stops: [
      { slug: "srinagar", nights: 2 },
      { slug: "gulmarg", nights: 1 },
    ],
  },
  {
    id: "6d5n",
    label: "6 days",
    title: "6 days, 5 nights",
    bestFor:
      "The route most honeymoon and family trips take. Nothing feels rushed.",
    stops: [
      { slug: "srinagar", nights: 2 },
      { slug: "gulmarg", nights: 1 },
      { slug: "pahalgam", nights: 2 },
    ],
  },
  {
    id: "8d7n",
    label: "8 days",
    title: "8 days, 7 nights",
    bestFor:
      "Adds Sonamarg and a spare day in each valley for weather and rest.",
    stops: [
      { slug: "srinagar", nights: 3 },
      { slug: "gulmarg", nights: 1 },
      { slug: "pahalgam", nights: 2 },
      { slug: "sonamarg", nights: 1 },
    ],
  },
  {
    id: "10d9n",
    label: "10 days",
    title: "10 days, 9 nights",
    bestFor:
      "All four places plus the day trips most itineraries skip — Doodhpathri, Yusmarg, the temples.",
    stops: [
      { slug: "srinagar", nights: 4 },
      { slug: "gulmarg", nights: 2 },
      { slug: "pahalgam", nights: 2 },
      { slug: "sonamarg", nights: 1 },
    ],
  },
];

export default function DestinationItinerariesSection({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [activeId, setActiveId] = useState(ITINERARIES[1].id);

  const active =
    ITINERARIES.find((itinerary) => itinerary.id === activeId) ?? ITINERARIES[0];

  const nameFor = (slug: string) =>
    destinations.find((destination) => destination.slug === slug)?.name ?? slug;

  const totalNights = active.stops.reduce((sum, stop) => sum + stop.nights, 0);

  return (
    <section id="itineraries" className="w-full scroll-mt-24 bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold tracking-[0.2em] text-sky-600 uppercase">
            Putting it together
          </p>

          <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
            How many{" "}
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              days
            </span>{" "}
            do you need?
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            Srinagar is the base and everything else is a drive from it, so the
            question is really how many valleys you add. Pick a length to see the
            route that fits.
          </p>
        </div>

        {/* Tabs. Horizontal scroll on narrow screens with the track sized to its
            content — w-max inside an overflow-x-auto parent, so the rail scrolls
            instead of stretching the section past the viewport. */}
        <div className="no-scrollbar mt-6 overflow-x-auto pb-1">
          <div
            role="tablist"
            aria-label="Trip length"
            className="flex w-max gap-2 sm:w-auto sm:flex-wrap"
          >
            {ITINERARIES.map((itinerary) => {
              const isActive = itinerary.id === active.id;

              return (
                <button
                  key={itinerary.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`itinerary-${itinerary.id}`}
                  onClick={() => setActiveId(itinerary.id)}
                  className={`relative cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {/* One pill that slides between tabs rather than four that
                      fade — layoutId is what makes it read as a single marker. */}
                  {isActive && (
                    <motion.span
                      layoutId="itinerary-tab"
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                      className="absolute inset-0 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 shadow-md shadow-sky-500/25"
                    />
                  )}
                  <span className="relative">{itinerary.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* mode="wait" so the outgoing route clears before the next arrives —
              two overlapping timelines read as a glitch, not a transition. */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`itinerary-${active.id}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-baseline sm:justify-between sm:text-left">
                <h3 className="font-heading text-lg font-bold text-slate-900 sm:text-xl">
                  {active.title}
                </h3>

                <p className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Moon className="h-3.5 w-3.5 text-sky-500" />
                  {totalNights} nights across {active.stops.length}{" "}
                  {active.stops.length === 1 ? "base" : "bases"}
                </p>
              </div>

              <p className="mt-2 text-center text-sm leading-relaxed text-slate-600 sm:text-left">
                {active.bestFor}
              </p>

              {/* Route: stacked on mobile, a single line with arrows on desktop. */}
              <ol className="mt-5 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:gap-0">
                {active.stops.map((stop, index) => (
                  <li
                    key={`${stop.slug}-${index}`}
                    className="flex items-center gap-2.5 sm:flex-1"
                  >
                    <Link
                      href={`/destinations/${stop.slug}/`}
                      className="group flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:shadow-md hover:shadow-sky-500/5"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-sky-500 to-cyan-400 text-[0.7rem] font-bold text-white">
                          {index + 1}
                        </span>

                        <span className="font-heading text-sm font-bold text-slate-900 transition-colors group-hover:text-sky-700">
                          {nameFor(stop.slug)}
                        </span>
                      </span>

                      <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[0.7rem] font-semibold text-slate-500 ring-1 ring-slate-200 ring-inset">
                        {stop.nights}N
                      </span>
                    </Link>

                    {/* Connector, desktop only — vertical stacking already
                        implies the order on mobile. */}
                    {index < active.stops.length - 1 && (
                      <ArrowRight
                        aria-hidden="true"
                        className="hidden h-4 w-4 shrink-0 text-slate-300 sm:mx-2 sm:block"
                      />
                    )}
                  </li>
                ))}
              </ol>

              {/* On-ground truth (SOP A4/A7) — the kind of thing the OTAs leave
                  out and the reason a reader trusts the rest of the page. */}
              <div className="mt-5 flex gap-2.5 rounded-xl bg-sky-50/70 p-3.5 ring-1 ring-sky-100 ring-inset">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                <p className="text-xs leading-relaxed text-slate-600">
                  <span className="font-semibold text-slate-800">
                    Sartaj&apos;s note:
                  </span>{" "}
                  a Srinagar cab drops you at Gulmarg and Pahalgam but cannot do
                  the local sightseeing there — those run on separate union
                  taxis, paid locally. Budget for both, and in winter expect a
                  snow-jeep beyond Tangmarg.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={
                    active.packageSlug
                      ? `/kashmir-tour-packages/${active.packageSlug}/`
                      : "/kashmir-tour-packages/"
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform hover:-translate-y-0.5"
                >
                  See {active.label} packages
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-200 hover:text-sky-700"
                >
                  Get this route priced
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
