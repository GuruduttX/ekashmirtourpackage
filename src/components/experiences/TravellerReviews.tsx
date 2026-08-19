"use client";

import { useState } from "react";
import { Quote } from "lucide-react";
import {
  reviewerInitials,
  type ExperienceReview,
} from "@/data/experienceReviews";

/**
 * "What Travellers say about us" — an infinite marquee of static testimonials.
 *
 * Motion reuses the shared `.animate-marquee` utility in globals.css (the track
 * is the list rendered twice and translated -50%, so the seam never shows), the
 * same as DestinationPhotoStrip. That utility also drops the animation entirely
 * under `prefers-reduced-motion` — an infinite marquee has no end state to
 * settle into, so a slower one is not a kinder one.
 *
 * Paused on hover AND on focus-within: the second matters because the cards
 * would otherwise slide out from under a keyboard user's focus ring.
 *
 * ⚠️ The quotes are PLACEHOLDERS and carry no schema. See the header of
 * src/data/experienceReviews.ts — no Review or AggregateRating JSON-LD may be
 * emitted while that file is the source, and there are deliberately no star
 * ratings in this UI.
 */

/**
 * One full loop of the track, in seconds.
 *
 * Slow on purpose — the brief asked for a slow drift, and text has to stay
 * readable while it moves, which photographs do not. Scaled by card count so
 * adding reviews makes the loop longer rather than the cards faster.
 */
const SECONDS_PER_CARD = 9;

export default function TravellerReviews({
  reviews,
  heading = "say about us",
}: {
  reviews: ExperienceReview[];
  /** The blue half of the heading — renders as "What Travellers <heading>". */
  heading?: string;
}) {
  const [paused, setPaused] = useState(false);

  if (!reviews.length) return null;

  const durationSeconds = reviews.length * SECONDS_PER_CARD;

  // The track is the list twice over. Rendered flat, as direct children of one
  // flex row, so every card sits in an identical box.
  const track = [...reviews, ...reviews];

  const card = (review: ExperienceReview, position: number) => (
    <article
      key={`${review.id}-${position}`}
      // Spacing is a right margin rather than the row's `gap`. With `gap` the
      // track measures 2N·card + (2N−1)·gap, so half of it is half a gap short
      // of a whole card pitch and the -50% loop jumps by that much every pass.
      // As margin the pitch is uniform and the seam is exact.
      // aria-hidden on the second copy so each testimonial is read once.
      aria-hidden={position >= reviews.length ? "true" : undefined}
      className="mr-6 flex w-80 shrink-0 flex-col rounded-2xl border border-sky-100 bg-white p-6 shadow-lg shadow-sky-900/5 sm:w-96"
    >
      <Quote
        aria-hidden="true"
        className="h-8 w-8 shrink-0 rotate-180 fill-sky-400 text-sky-400"
      />

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        {review.quote}
      </p>

      {/* mt-auto pins the attribution to the bottom, so cards with shorter
          quotes still line their footers up with their neighbours'. */}
      <div className="mt-auto flex items-center gap-3 border-t border-slate-200 pt-4">
        {/* Initials, not a portrait — see the data file's header for why an
            invented quote must not carry a stock photo of a real person. */}
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 font-heading text-sm font-bold text-sky-700"
        >
          {reviewerInitials(review.name)}
        </span>

        <div className="min-w-0">
          <p className="truncate font-heading text-sm font-bold text-sky-500">
            {review.name}
          </p>
          <p className="truncate text-xs text-slate-500">{review.trip}</p>
        </div>
      </div>
    </article>
  );

  return (
    <section
      aria-labelledby="traveller-reviews-heading"
      className="relative overflow-hidden bg-linear-to-b from-sky-50 to-white pb-10"
    >
      {/* Torn-edge pattern joining the white above to the tinted section.
          Plain <img>: it is a decorative full-bleed SVG, so next/image's
          optimisation buys nothing and its layout wrapper only gets in the way.
          -top-px closes the hairline gap sub-pixel rounding can leave. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/TopDestination/TopDestinationUpPattern.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-px left-0 z-10 w-full select-none"
      />

      {/* pt clears the pattern strip, which is absolutely positioned and so
          takes no space of its own. */}
      <div className="relative z-20 pt-20 sm:pt-24">
        <h2
          id="traveller-reviews-heading"
          className="px-4 text-center font-heading text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl"
        >
          What Travellers <span className="text-sky-500">{heading}</span>
        </h2>

        {/* The viewport. Full-bleed on purpose — cards running off both edges
            is what makes a marquee read as continuous rather than as a list
            that happens to move. */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="mt-8 overflow-hidden py-4"
        >
          {/* w-max lets the track be as wide as its content instead of being
              constrained to the viewport — without it there is nothing to
              translate. */}
          <div
            className={`animate-marquee flex w-max ${
              paused ? "animate-marquee-paused" : ""
            }`}
            style={
              { "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties
            }
          >
            {track.map(card)}
          </div>
        </div>
      </div>
    </section>
  );
}
