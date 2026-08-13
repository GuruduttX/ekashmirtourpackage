"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bus, MapPin, Plane, Train } from "lucide-react";
import type { IHowToReach, TransportModeName } from "@/types/destinationTypes";

/**
 * /destinations/[slug] "How to reach" section.
 *
 * Tabbed by mode rather than stacked: air/train/road are alternatives, not
 * steps, and a reader has already decided which one they care about before
 * they get here. Showing all three at once buries the one they want under two
 * they don't.
 *
 * Data comes from the destination's `howToReach` block in the CMS.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const MODE_ICON: Record<TransportModeName, typeof Plane> = {
  Air: Plane,
  Train: Train,
  Road: Bus,
};

export default function DestinationHowToReach({
  destinationName,
  howToReach,
}: {
  destinationName: string;
  howToReach?: IHowToReach;
}) {
  const modes = howToReach?.transportModes ?? [];
  const [activeMode, setActiveMode] = useState(0);

  if (!howToReach || modes.length === 0) return null;

  // Guards against a CMS edit that drops the mode a reader had selected.
  const active = modes[activeMode] ?? modes[0];

  return (
    <section
      aria-label={`How to reach ${destinationName}`}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="text-center font-heading text-2xl font-bold text-slate-900 sm:text-left sm:text-3xl"
      >
        How To{" "}
        <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
          Reach
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.06 }}
        className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:mx-0 sm:text-left sm:text-base"
      >
        {howToReach.overview}
      </motion.p>

      {/* ---------- mode tabs ---------- */}

      <div
        role="tablist"
        aria-label="Transport mode"
        className="no-scrollbar mt-6 flex justify-center gap-2 overflow-x-auto sm:justify-start"
      >
        {modes.map((mode, i) => {
          const Icon = MODE_ICON[mode.mode];
          const isActive = i === activeMode;

          return (
            <button
              key={mode.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveMode(i)}
              className={`relative inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                isActive
                  ? "text-white"
                  : "border border-slate-200 text-slate-600 hover:border-sky-200 hover:text-sky-600"
              }`}
            >
              {/* Shared layoutId slides the pill between tabs instead of
                  popping, so the eye tracks which one took over. */}
              {isActive && (
                <motion.span
                  layoutId="how-to-reach-tab"
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="absolute inset-0 rounded-full bg-linear-to-r from-sky-500 to-cyan-400"
                />
              )}
              <Icon className="relative h-4 w-4" />
              <span className="relative">By {mode.mode}</span>
            </button>
          );
        })}
      </div>

      {/* ---------- active mode panel ---------- */}

      <AnimatePresence mode="wait">
        <motion.div
          key={active.mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          role="tabpanel"
          className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <p className="text-[0.7rem] font-semibold tracking-widest text-slate-400 uppercase">
              Nearest {active.mode === "Road" ? "road hub" : "terminal"}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="font-heading text-base font-semibold text-slate-900 sm:text-lg">
                {active.nearestTerminal}
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
                <MapPin className="h-3 w-3" />
                {active.distance} km to {destinationName}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {active.description}
            </p>
          </div>

          {/* Hub connections. Same label/value row rhythm as the quick-facts
              table so the two sections read as one system. */}
          <dl>
            {active.commonRoutes.map((route, i) => (
              <div
                key={route.id}
                className={`group relative flex flex-col gap-1 px-4 py-4 transition-colors duration-300 hover:bg-sky-50/60 sm:flex-row sm:items-center sm:gap-4 sm:px-5 ${
                  i !== 0 ? "border-t border-slate-100" : ""
                }`}
              >
                <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-linear-to-b from-sky-400 to-cyan-300 transition-transform duration-300 group-hover:scale-y-100" />

                <dt className="flex w-full shrink-0 items-center gap-2 sm:w-56">
                  <span className="font-heading text-sm font-semibold text-slate-900">
                    {route.origin}
                  </span>
                  <span className="text-slate-300">→</span>
                  <span className="text-xs font-semibold text-sky-600">
                    {route.duration}
                  </span>
                </dt>
                <dd className="text-sm leading-relaxed text-slate-600">
                  {route.details}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
