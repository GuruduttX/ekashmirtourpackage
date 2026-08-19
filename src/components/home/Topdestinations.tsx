"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getDestinationBySlug } from "@/data/destinations";

/** Animated <Link>, so the cards keep client-side navigation. */
const MotionLink = motion.create(Link);

/**
 * The four destinations this section promotes, in display order. Name, photo
 * and alt text all come from src/data/destinations.ts so the card can never
 * drift from the /destinations/[slug] page it links to.
 */
const FEATURED_SLUGS = ["srinagar", "gulmarg", "pahalgam", "sonamarg"] as const;

const DESTINATIONS = FEATURED_SLUGS.map((slug) => {
  const destination = getDestinationBySlug(slug);
  if (!destination) {
    throw new Error(
      `TopDestinations: no destination found for "${slug}" in src/data/destinations.ts`,
    );
  }
  return {
    slug,
    name: destination.name,
    image: destination.image,
    imageAlt: destination.imageAlt,
  };
});

const BASE_WIDTH = 230;
const HOVER_WIDTH = 460;
const MOBILE_BASE_HEIGHT = 110;
const MOBILE_ACTIVE_HEIGHT = 260;

export default function TopDestinations() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-20 lg:py-10">
      <h2 className="mb-2 text-center font-heading text-3xl font-bold bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent sm:text-4xl lg:mb-3 lg:text-5xl">
        Top Destinations
      </h2>

      <div className="relative">
        <img
          src="/TopDestination/TopDestinationUpPattern.svg"
          alt=""
          aria-hidden="true"
          className="absolute -top-px left-0 z-10 w-full select-none"
        />

        <div className="bg-sky-100 py-24 sm:py-32">
          {/*
            justify-between pins the first card's left edge and the last card's
            right edge to the row. When a card grows the slack between cards is
            what shrinks, so siblings slide over to make room while the outer
            two never leave their spot. The gap is the minimum spacing, sized so
            the widest state (3 x BASE_WIDTH + HOVER_WIDTH) still fits the row.
          */}
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 overflow-hidden px-4 sm:flex-row sm:justify-between sm:gap-4 sm:px-8">
            {DESTINATIONS.map((dest) => {
              const isActive = activeId === dest.slug;

              return (
                <MotionLink
                  key={dest.slug}
                  href={`/destinations/${dest.slug}/`}
                  aria-label={`Visit ${dest.name}`}
                  onMouseEnter={() => isDesktop && setActiveId(dest.slug)}
                  onMouseLeave={() => isDesktop && setActiveId(null)}
                  onClick={(event) => {
                    // On touch the first tap only opens the card — the label it
                    // reveals is the destination name, so navigating before the
                    // user has seen it would be a blind jump. Second tap follows.
                    if (!isDesktop && !isActive) {
                      event.preventDefault();
                      setActiveId(dest.slug);
                    }
                  }}
                  animate={
                    isDesktop
                      ? { width: isActive ? HOVER_WIDTH : BASE_WIDTH }
                      : {
                          width: "100%",
                          height: isActive
                            ? MOBILE_ACTIVE_HEIGHT
                            : MOBILE_BASE_HEIGHT,
                        }
                  }
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative block w-full shrink-0 cursor-pointer overflow-hidden rounded-[2.5rem] shadow-lg sm:h-85 sm:w-auto lg:h-105"
                  style={{
                    width: isDesktop ? BASE_WIDTH : "100%",
                    height: isDesktop ? undefined : MOBILE_BASE_HEIGHT,
                  }}
                >
                  <motion.img
                    src={dest.image}
                    alt={dest.imageAlt}
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 12,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-x-4 bottom-4 flex items-center justify-center rounded-full border border-white/30 bg-white/15 px-5 py-3 text-center font-heading text-lg font-bold text-white shadow-lg backdrop-blur-md"
                  >
                    {dest.name}
                  </motion.div>
                </MotionLink>
              );
            })}
          </div>
        </div>

        <img
          src="/TopDestination/TopDestinationBottomPattern.svg"
          alt=""
          aria-hidden="true"
          className="absolute -bottom-px left-0 z-10 w-full select-none"
        />
      </div>

      <div className="mt-10 flex justify-center lg:mt-0">
        <Link
          href="/destinations/"
          className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-8 py-4 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
        >
          Visit Destinations
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
