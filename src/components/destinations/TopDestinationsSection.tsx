"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Destination } from "@/data/destinations";

/**
 * Top Kashmir destinations — four tall 9:16 cards, one row on desktop.
 *
 * Resting state is deliberately bare: photo, and the name bottom-left. Nothing
 * else. On hover the name lifts, the summary fades in beneath it, and the photo
 * crossfades to a second angle (or slow-zooms when only one photo exists). That
 * restraint is the "premium and minimal" part — the card earns its detail only
 * when the reader points at it.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * True only on devices that actually hover. Touch screens fire a synthetic
 * hover on tap that then sticks, so they get an explicit tap-to-reveal instead:
 * first tap opens the card, second tap follows the link.
 */
function useCanHover() {
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return canHover;
}

function DestinationCard({
  destination,
  canHover,
  reduceMotion,
  revealed,
  onReveal,
  onConceal,
}: {
  destination: Destination;
  canHover: boolean;
  reduceMotion: boolean | null;
  revealed: boolean;
  onReveal: () => void;
  onConceal: () => void;
}) {
  const hovered = revealed;
  const animateZoom = !reduceMotion;

  /**
   * The card body is NOT a link — only the "Explore …" line is.
   *
   * When the whole card was an <a>, any tap navigated, so on touch the reveal
   * was never seen: the page changed out from under it. Intercepting the first
   * tap fixed that only as long as the hover-capability sniff was right, and
   * plenty of mobile browsers report `(hover: hover)` regardless. Making the
   * card inert and putting navigation on one explicit control removes the sniff
   * from the click path entirely, so the behaviour is the same everywhere.
   */
  const toggle = () => (revealed ? onConceal() : onReveal());

  return (
    <div
      onMouseEnter={() => canHover && onReveal()}
      onMouseLeave={() => canHover && onConceal()}
      // Capture, so focusing the Explore link inside opens the card first —
      // otherwise a keyboard user would be tabbing into a collapsed, invisible
      // control.
      onFocusCapture={onReveal}
      onBlurCapture={onConceal}
      onClick={toggle}
      className="group relative block aspect-9/16 cursor-pointer overflow-hidden rounded-3xl bg-slate-900 shadow-lg shadow-slate-900/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-slate-900/25 focus-within:ring-2 focus-within:ring-sky-400 focus-within:ring-offset-2"
    >
      {/* Primary photo. Fades out only when there is a second one to fade to. */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: animateZoom && hovered ? 1.08 : 1,
          opacity: destination.hoverImage && hovered ? 0 : 1,
        }}
        transition={{
          scale: { duration: 0.9, ease: EASE_OUT },
          opacity: { duration: 0.7, ease: "easeInOut" },
        }}
      >
        <Image
          src={destination.image}
          alt={destination.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover object-center"
        />
      </motion.div>

      {destination.hoverImage && (
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            scale: animateZoom && hovered ? 1.08 : 1.12,
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            scale: { duration: 0.9, ease: EASE_OUT },
            opacity: { duration: 0.7, ease: "easeInOut" },
          }}
        >
          <Image
            src={destination.hoverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover object-center"
          />
        </motion.div>
      )}

      {/* Legibility gradient, deepening on hover so the revealed summary has a
          base to sit on without dimming the whole photo at rest. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black via-black/25 to-transparent"
        animate={{ opacity: revealed ? 0.9 : 0.65 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Hairline inner edge — catches the light and stops the photo meeting the
          rounded corner flat. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 ring-inset"
      />

      {/* Bottom-left content block. */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-left sm:p-5">
        <motion.h3
          className="font-heading text-lg font-bold text-white drop-shadow-sm sm:text-xl"
          animate={{ y: revealed ? -4 : 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          {destination.name}
        </motion.h3>

        {/* height:auto animation, so the name genuinely lifts to make room
            rather than the text overlapping it. */}
        <motion.div
          initial={false}
          animate={{
            height: revealed ? "auto" : 0,
            opacity: revealed ? 1 : 0,
          }}
          transition={{
            height: { duration: 0.45, ease: EASE_OUT },
            opacity: { duration: 0.35, ease: "easeOut" },
          }}
          className="overflow-hidden"
        >
          <p className="pt-1.5 text-xs leading-relaxed text-white/80 sm:text-[0.8rem]">
            {destination.summary}
          </p>

          {/* The only navigation in the card. stopPropagation so the tap that
              follows the link doesn't also run the card's collapse toggle. */}
          <Link
            href={`/destinations/${destination.slug}/`}
            onClick={(event) => event.stopPropagation()}
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-full text-xs font-semibold text-sky-300 transition-colors hover:text-sky-200 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:outline-none"
          >
            Explore {destination.name}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function TopDestinationsSection({
  destinations,
}: {
  destinations: Destination[];
}) {
  const canHover = useCanHover();
  const reduceMotion = useReducedMotion();
  // One slug, not a flag per card: revealing a card closes whichever was open,
  // so a phone never ends up with four expanded cards at once.
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  if (!destinations.length) return null;

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-sky-600 uppercase">
            Where to go
          </p>

          <h2 className="mt-2 font-heading text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            Top Kashmir{" "}
            {/* Gradient-clipped accent word, matching the site's other headings. */}
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              destinations
            </span>
          </h2>
        </div>

        {/* Four across from lg, two on smaller screens — four 9:16 cards in one
            row below ~1024px would each be too narrow to read. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mt-7 grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-4"
        >
          {destinations.slice(0, 4).map((destination) => (
            <DestinationCard
              key={destination.slug}
              destination={destination}
              canHover={canHover}
              reduceMotion={reduceMotion}
              revealed={activeSlug === destination.slug}
              onReveal={() => setActiveSlug(destination.slug)}
              onConceal={() => setActiveSlug(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
