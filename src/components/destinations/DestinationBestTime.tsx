"use client";

import { motion } from "framer-motion";
import type { IBestTimeTable, MonthRating } from "@/types/destinationTypes";

/**
 * /destinations/[slug] "Best time to visit" — the twelve-month table.
 *
 * A colour-coded month grid rather than a paragraph: the question is
 * comparative ("is March better than October?"), and a grid answers that at a
 * glance in a way prose cannot.
 *
 * Colour is never the only signal — every cell also carries the verdict word
 * and a note, so the table still reads for colour-blind users and in print.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const RATING: Record<
  MonthRating,
  { label: string; cell: string; chip: string; bar: string }
> = {
  best: {
    label: "Best",
    cell: "border-emerald-200 bg-emerald-50/70 hover:border-emerald-300",
    chip: "bg-emerald-100 text-emerald-700",
    bar: "bg-emerald-500",
  },
  good: {
    label: "Good",
    cell: "border-sky-200 bg-sky-50/70 hover:border-sky-300",
    chip: "bg-sky-100 text-sky-700",
    bar: "bg-sky-500",
  },
  mixed: {
    label: "Mixed",
    cell: "border-amber-200 bg-amber-50/70 hover:border-amber-300",
    chip: "bg-amber-100 text-amber-700",
    bar: "bg-amber-500",
  },
  avoid: {
    label: "Avoid",
    cell: "border-rose-200 bg-rose-50/70 hover:border-rose-300",
    chip: "bg-rose-100 text-rose-700",
    bar: "bg-rose-400",
  },
};

const LEGEND: MonthRating[] = ["best", "good", "mixed", "avoid"];

export default function DestinationBestTime({
  destinationName,
  bestTimeTable,
}: {
  destinationName: string;
  bestTimeTable?: IBestTimeTable;
}) {
  // The twelve rows exist from the moment a record is created, so "has months"
  // is not the same as "has been written" — a table of empty notes says
  // nothing and is worse than no section.
  const written =
    bestTimeTable?.months.some((month) => month.note.trim()) ?? false;

  if (!bestTimeTable || bestTimeTable.months.length === 0 || !written)
    return null;

  return (
    <section
      aria-label={`Best time to visit ${destinationName}`}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="text-center font-heading text-2xl font-bold text-slate-900 sm:text-left sm:text-3xl"
      >
        Best Time To{" "}
        <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
          Visit
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.06 }}
        className="mt-3 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:text-left sm:text-base"
      >
        {bestTimeTable.overview}
      </motion.p>

      {/* ---------- legend ---------- */}

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
        {LEGEND.map((rating) => (
          <span
            key={rating}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${RATING[rating].bar}`} />
            {RATING[rating].label}
          </span>
        ))}
      </div>

      {/* ---------- month grid ---------- */}

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {bestTimeTable.months.map((entry, i) => {
          const style = RATING[entry.rating];

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.03 }}
              whileHover={{ y: -3 }}
              className={`relative overflow-hidden rounded-xl border p-3 transition-colors duration-300 ${style.cell}`}
            >
              {/* Rating bar down the left edge — a second, non-colour-only cue
                  is the verdict chip beside the month. */}
              <span
                className={`absolute inset-y-0 left-0 w-1 ${style.bar}`}
                aria-hidden="true"
              />

              <div className="flex items-center justify-between gap-2 pl-1.5">
                <span className="font-heading text-sm font-bold text-slate-900">
                  {entry.month}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide uppercase ${style.chip}`}
                >
                  {style.label}
                </span>
              </div>

              <p className="mt-1.5 pl-1.5 text-xs leading-snug text-slate-600">
                {entry.note}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
