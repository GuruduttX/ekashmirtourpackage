"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";

type ShakeControls = ReturnType<typeof useAnimationControls>;

/**
 * One carousel entry. Built on the server from the same source /experiences and
 * /experiences/[slug] use, so a card can never link at an activity that has no
 * page — see buildHomeActivities() in src/lib/homeActivities.ts.
 */
export interface Activity {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

/** Animated <Link>, so the card CTA keeps client-side navigation. */
const MotionLink = motion.create(Link);

const BASE_TILT = 8; // matches the slight clockwise tilt in the design

function ActivityCard({ activity, controls }: { activity: Activity; controls: ShakeControls }) {
  return (
    <motion.div
      initial={{ rotate: BASE_TILT }}
      animate={controls}
      className="relative h-80 w-64 overflow-hidden rounded-3xl shadow-2xl sm:h-96 sm:w-72"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activity.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={activity.image}
            alt={activity.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

          {/* Glass info box */}
          <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-md">
            <h3 className="font-heading text-lg font-bold leading-none text-white">
              {activity.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-white/80">
              {activity.description}
            </p>

            <MotionLink
              href={`/experiences/${activity.slug}/`}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="mt-3 flex w-fit items-center gap-1.5 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-2 text-xs font-semibold text-white shadow-md"
            >
              <motion.span
                variants={{ rest: { x: 0 }, hover: { x: -2 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                Book Now
              </motion.span>
              <motion.span
                variants={{ rest: { x: 0, rotate: 0 }, hover: { x: 3, rotate: -40 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.span>
            </MotionLink>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

const SHAKE_DURATION = 1.2; // seconds

export default function ActivityCarousel({
  activities,
}: {
  activities: Activity[];
}) {
  const [active, setActive] = useState(0); // drives the list highlight (instant)
  const [cardIndex, setCardIndex] = useState(0); // drives the card (synced to shake)
  const controls = useAnimationControls();
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const select = (index: number) => {
    if (index === active) return;
    setActive(index);

    // Gentle, slow shake around the resting tilt.
    controls.start({
      rotate: [BASE_TILT, BASE_TILT - 4, BASE_TILT + 4, BASE_TILT - 2.5, BASE_TILT + 2.5, BASE_TILT],
      transition: { duration: SHAKE_DURATION, ease: "easeInOut" },
    });

    // Swap the card content at the midpoint of the shake so the change
    // feels part of the motion instead of happening instantly.
    if (swapTimer.current) clearTimeout(swapTimer.current);
    swapTimer.current = setTimeout(
      () => setCardIndex(index),
      (SHAKE_DURATION / 2) * 1000
    );
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-sky-50 py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <h2 className="mb-8 text-center font-heading text-3xl font-bold bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent sm:text-4xl lg:mb-12">
          Best Kashmir Activities
        </h2>

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* LEFT — Activity list */}
          <div className="w-full lg:flex-1">
            <ul className="divide-y divide-sky-100">
              {activities.map((activity, i) => {
                const isActive = i === active;
                return (
                  <li key={activity.slug}>
                    <button
                      onMouseEnter={() => select(i)}
                      onClick={() => select(i)}
                      className="group flex w-full items-center justify-between py-4 text-left transition-colors"
                    >
                      <span
                        className={`text-lg font-medium transition-colors sm:text-xl ${
                          isActive ? "text-sky-500" : "text-slate-800"
                        }`}
                      >
                        {activity.title}
                      </span>
                      <ChevronRight
                        className={`h-5 w-5 transition-all ${
                          isActive
                            ? "translate-x-1 text-sky-500"
                            : "text-sky-400 group-hover:translate-x-1"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT — Rotating card */}
          <div className="flex w-full justify-center lg:flex-1">
            <ActivityCard activity={activities[cardIndex]} controls={controls} />
          </div>
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <Link
            href="/experiences/"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-8 py-4 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
          >
            Activities
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
