"use client";

import { motion } from "framer-motion";
import ThingToDoCard from "@/components/destinations/ThingToDoCard";
import type { ResolvedThingToDo } from "@/lib/thingsToDo";

/**
 * /destinations/[slug] "Things to do" section.
 *
 * Takes already-resolved items (see src/lib/thingsToDo.ts) — this component
 * never looks anything up itself, it just lays them out. "temple"/"stay" cards
 * are real internal links (SOP internal-linking); "activity"/"other" cards are
 * informational and render without one.
 *
 * Rail below lg, grid above — the same arrangement as "Where to stay" further
 * down the page, because these are 4:5 cards and stacking them one per row on
 * a phone would make the section several screens tall.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function DestinationThingsToDo({
  destinationName,
  items,
}: {
  destinationName: string;
  items: ResolvedThingToDo[];
}) {
  if (items.length === 0) return null;

  return (
    <section
      aria-label={`Things to do in ${destinationName}`}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="mb-5 text-center font-heading text-2xl font-bold text-slate-900 sm:text-left sm:text-3xl"
      >
        Things{" "}
        <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
          To Do
        </span>
      </motion.h2>

      {/* The rail's negative margin lets cards run to the screen edge while the
          section keeps its padding. */}
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-7 lg:overflow-visible lg:px-0 lg:pb-0 xl:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={`${item.type}-${item.heading}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.06 }}
            className="w-[68vw] shrink-0 snap-start sm:w-[42vw] lg:w-auto lg:shrink"
          >
            <ThingToDoCard item={item} />
          </motion.div>
        ))}

      </div>
    </section>
  );
}
