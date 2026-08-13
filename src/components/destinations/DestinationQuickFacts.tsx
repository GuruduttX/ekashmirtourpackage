"use client";

import { motion } from "framer-motion";
import { CalendarDays, Info, Mountain, Route, Sparkles } from "lucide-react";
import type { DestinationPageData } from "@/types/destinationTypes";

/**
 * /destinations/[slug] quick-facts table.
 *
 * Reads straight off the same `Destination` record the hero uses — altitude,
 * fromSrinagar, bestTime, famousFor already exist there, so this is a second
 * view of existing fields, not a new data source.
 *
 * Row table rather than a card grid on purpose: `extraFacts` lets a CMS editor
 * append rows this component knows nothing about (permits required, nearest
 * ATM, network coverage), and a table absorbs an arbitrary row count by just
 * getting taller — a 4-up card grid would need a layout rewrite the moment row
 * 5 arrives.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function DestinationQuickFacts({
  destination,
}: {
  destination: DestinationPageData;
}) {
  const facts = [
    {
      icon: Mountain,
      label: "Altitude",
      value: destination.altitude,
    },
    {
      icon: Route,
      label: "From Srinagar",
      value: destination.fromSrinagar || "Base city — valley gateway",
    },
    {
      icon: CalendarDays,
      label: "Best time",
      value: destination.bestTime,
    },
    {
      icon: Sparkles,
      label: "Famous for",
      value: destination.famousFor,
    },
    // Whatever else this destination has been given. Same row shape, so they
    // scroll with the rest instead of forming a second block.
    ...destination.extraFacts.map((fact) => ({
      icon: Info,
      label: fact.label,
      value: fact.value,
    })),
  ].filter((fact) => Boolean(fact.value));

  return (
    <section
      aria-label={`${destination.name} quick facts`}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="mb-5 text-center font-heading text-2xl font-bold text-slate-900 sm:text-left sm:text-3xl"
      >
        Quick{" "}
        <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
          Facts
        </span>
      </motion.h2>

      <dl className="h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm no-scrollbar">
        {facts.map((fact, i) => (
          <motion.div
            key={`${fact.label}-${i}`}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: i * 0.06 }}
            whileHover={{ x: 4 }}
            className={`group relative flex items-center gap-4 px-4 py-4 transition-colors duration-300 hover:bg-sky-50/60 sm:px-6 ${
              i !== 0 ? "border-t border-slate-100" : ""
            }`}
          >
            {/* Accent bar that grows in from the left on hover, marking the
                active row without disturbing row height/alignment. */}
            <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-linear-to-b from-sky-400 to-cyan-300 transition-transform duration-300 group-hover:scale-y-100" />

            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white">
              <fact.icon className="h-4.5 w-4.5" />
            </span>

            <dt className="w-32 shrink-0 text-[0.7rem] font-semibold tracking-widest text-slate-400 uppercase sm:w-40 sm:text-xs">
              {fact.label}
            </dt>
            <dd className="text-sm leading-snug font-semibold text-slate-800 sm:text-base">
              {fact.value}
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}
