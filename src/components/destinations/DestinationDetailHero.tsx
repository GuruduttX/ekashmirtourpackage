"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Mountain, Route } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import type { DestinationPageData } from "@/types/destinationTypes";

/**
 * /destinations/[slug] hero.
 *
 * Layout: breadcrumbs, then H1 + answer block + two CTAs + a stat row on the
 * left, and a photo carousel on the right. The active carousel photo is also the
 * page background, blurred behind a black scrim, so the two stay locked together
 * — one `index` drives both, which is why they can never disagree.
 *
 * Content comes from the Destination CMS record (src/lib/destinationPage.ts),
 * which falls back to src/data/destinations.ts for un-migrated slugs.
 */

/** Slide hold. */
const ROTATE_MS = 4000;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function DestinationDetailHero({
  destination,
}: {
  destination: DestinationPageData;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  // A CMS record can be saved before its hero carousel is filled in, so the
  // card photo stands in rather than leaving `active` undefined and taking the
  // whole hero down with it.
  const photos = destination.heroImages.length
    ? destination.heroImages
    : [
        {
          id: `${destination.slug}-hero-fallback`,
          image: destination.image,
          alt: destination.imageAlt,
        },
      ];
  const count = photos.length;
  const active = photos[index] ?? photos[0];

  useEffect(() => {
    // A single photo has nothing to rotate to, and reduced-motion readers opted
    // out.
    if (reduceMotion || paused || count < 2) return;

    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % count),
      ROTATE_MS,
    );

    return () => window.clearInterval(timer);
  }, [reduceMotion, paused, count]);

  // Reset when navigating between destinations, so slide 4 of Srinagar does not
  // become an out-of-range index on a one-photo place.
  useEffect(() => {
    setIndex(0);
  }, [destination.slug]);

  const stats = [
    { icon: Mountain, label: "Altitude", value: destination.altitude },
    {
      icon: Route,
      label: "From Srinagar",
      // Srinagar has no drive from itself.
      value: destination.fromSrinagar || "Base city — valley gateway",
    },
    { icon: CalendarDays, label: "Best season", value: destination.bestTime },
    { icon: Clock, label: "Time to give it", value: destination.idealDays },
  ];

  return (
    <section
      aria-label={`${destination.name}, Kashmir`}
      className="relative w-full overflow-hidden bg-slate-950"
    >
      {/* ---------- background: the active photo, blurred ---------- */}

      <div aria-hidden="true" className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={active.image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            {/* scale-110 hides the transparent edge that `blur` leaves around a
                filtered element — without it the frame gets a soft grey border. */}
            <Image
              src={active.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="scale-110 object-cover object-center blur-md"
            />
          </motion.div>
        </AnimatePresence>

        {/* Black scrim over the blur. Heavy enough that white body copy clears
            AA on any photo, since we cannot know what the CMS will upload. */}
        <div className="absolute inset-0 bg-slate-950/45" />
      </div>

      {/* ---------- content ---------- */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {/* The shared component is styled for light backgrounds, so its
              palette is overridden here rather than forked. */}
          <Breadcrumbs
            items={[
              { label: "Destinations", href: "/destinations/" },
              { label: destination.name },
            ]}
            className="**:aria-[current]:text-sky-300 **:aria-[hidden]:text-white/40 [&_a]:text-white/70 [&_a:hover]:text-white"
          />
        </motion.div>

        <div className="mt-7 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ---- left: heading, answer, CTAs, stats ---- */}

          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="text-xs font-semibold tracking-[0.2em] text-sky-300 uppercase"
            >
              Kashmir destination
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 }}
              className="mt-2 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              {destination.name},{" "}
              <span className="bg-linear-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                Kashmir
              </span>
            </motion.h1>

            {/* SOP answer-first block. */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.16 }}
              className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base sm:leading-7 lg:mx-0"
            >
              {destination.quickAnswer}
            </motion.p>

            {/* Two CTAs, one row. Both targets verified to resolve — the cab
                route pages (/cab-service/srinagar-to-<slug>/) 404 today, so the
                secondary points at the package hub until those exist. */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.24 }}
              className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <Link
                href="/contact/"
                className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/40 transition-transform hover:-translate-y-0.5"
              >
                Plan {destination.name} trip
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/kashmir-tour-packages/"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                See packages
              </Link>
            </motion.div>

            {/* Stat row. 2 across on mobile, 4 on desktop. */}
            <motion.dl
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.32 }}
              className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/15 bg-white/8 p-3 text-left backdrop-blur-md"
                >
                  <dt className="flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-[0.12em] text-sky-200 uppercase">
                    <stat.icon className="h-3.5 w-3.5" />
                    {stat.label}
                  </dt>
                  <dd className="mt-1.5 text-xs leading-snug font-semibold text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---- right: carousel ---- */}

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
            // Pausing on hover lets a reader actually look at a slide, which a
            // 1.3s rotation otherwise makes impossible.
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl ring-1 ring-white/15 ring-inset sm:aspect-16/10 lg:aspect-4/3">
              {/* mode="sync": the outgoing photo stays mounted and fades out
                  under the incoming one. mode="wait" would blank the frame
                  between slides, which at 1.3s would read as flicker. */}
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={active.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.7, ease: "easeInOut" },
                    scale: { duration: 1.8, ease: "linear" },
                  }}
                >
                  <Image
                    src={active.image}
                    alt={active.alt}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots double as manual controls — with a single photo there is
                nothing to choose between, so they are hidden entirely. */}
            {count > 1 && (
              <div className="mt-3 flex items-center justify-center gap-2">
                {photos.map((photo, position) => {
                  const isActive = position === index;

                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setIndex(position)}
                      aria-label={`Show photo ${position + 1} of ${count}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-7 bg-linear-to-r from-sky-400 to-cyan-300"
                          : "w-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
