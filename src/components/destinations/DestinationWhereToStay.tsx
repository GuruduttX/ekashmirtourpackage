"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import StayCard, { type StayCardData } from "@/components/stays/StayCard";

/**
 * /destinations/[slug] "Where to stay" section.
 *
 * Reuses the hub's <StayCard /> rather than restyling a second card: the two
 * are the same object in the same product, and a destination-only variant
 * would drift from the hub the first time either is touched.
 *
 * Layout follows the hub too — a snap rail below lg, where 4:5 cards would
 * otherwise stack into a very tall column, and a grid above it.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function DestinationWhereToStay({
  destinationName,
  stays,
}: {
  destinationName: string;
  stays: StayCardData[];
}) {
  if (stays.length === 0) return null;

  return (
    <section
      aria-label={`Where to stay in ${destinationName}`}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="text-center font-heading text-2xl font-bold text-slate-900 sm:text-left sm:text-3xl"
          >
            Where To{" "}
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Stay
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.06 }}
            className="mt-3 text-center text-sm leading-relaxed text-slate-600 sm:text-left"
          >
            Houseboats, hotels and homestays in and around {destinationName},
            with the real starting price for each.
          </motion.p>
        </div>

        <Link
          href="/stays/"
          className="group inline-flex shrink-0 items-center justify-center gap-1.5 self-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-200 hover:text-sky-600 sm:self-auto"
        >
          All Kashmir stays
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Rail below lg, grid above. The rail's negative margin lets cards run
          to the screen edge while the section keeps its padding. */}
      <div className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 xl:grid-cols-4">
        {stays.map((stay, i) => (
          <motion.div
            key={stay.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.06 }}
            className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto lg:shrink"
          >
            <StayCard stay={stay} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
