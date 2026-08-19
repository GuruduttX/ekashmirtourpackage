"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Images, MapPin, Star } from "lucide-react";
import type { ExperienceActivity } from "@/data/experienceActivities";

/**
 * Activity card for the /experiences/ archive.
 *
 * Prop-driven and holds no data source of its own — anything matching
 * `ExperienceActivity` renders, which is what lets the dummy list in
 * src/data/experienceActivities.ts become a Mongo read without this file
 * changing.
 *
 * Composition: the gallery fills the whole card, a rounded glass panel floats
 * inset along the bottom carrying the text, and badges sit top-left with the
 * carousel indicator top-right. The panel keeps a dark gradient underneath it
 * because it lands on unpredictable photography — blur alone does not guarantee
 * contrast over a bright sky.
 *
 * Photo paging differs by breakpoint, following the StayCard pattern:
 *   • below lg — swipe across the photo; no arrows, which would crowd a narrow
 *     card and sit under the reader's thumb
 *   • lg and up — glass arrows, revealed on hover
 * The indicator dots show position and are tappable at every size.
 *
 * DESKTOP HOVER CHOREOGRAPHY (lg and up) — the card has two hover zones that
 * deliberately exclude each other:
 *   • panel hovered   → the panel expands to reveal location, rating and
 *                       duration; arrows hide and the photo zoom releases, so
 *                       nothing moves underneath the text being read
 *   • photo hovered   → arrows appear and the photo zooms; the panel stays
 *                       collapsed to just title + price + CTA
 * At rest the panel shows only the title and the price row.
 *
 * Below lg none of this applies: there is no hover, so the panel renders fully
 * expanded. That is why the reveal is driven by CSS (`lg:` variants on a
 * grid-rows transition) rather than by the `panelHover` state — state would
 * leave touch devices stuck on the collapsed layout forever. The state exists
 * only to suppress the arrows and zoom, which are desktop-only anyway.
 *
 * The whole card is one link. The arrows, dots, Book Now button and a completed
 * swipe all suppress that navigation, so paging photos never opens the page.
 *
 * `rating` is rendered as plain text and is NEVER emitted as AggregateRating
 * JSON-LD — see the data file's header for why that matters.
 */
export default function ExperienceCard({
  activity,
  href,
  priority = false,
}: {
  activity: ExperienceActivity;
  /** Where the card and its Book Now button point. Resolved by the caller. */
  href: string;
  /** Set on the first row only — above-the-fold images shouldn't lazy-load. */
  priority?: boolean;
}) {
  const slides = activity.gallery;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  /** True while the pointer is over the info panel — see the hover notes above. */
  const [panelHover, setPanelHover] = useState(false);
  const reduceMotion = useReducedMotion();
  const router = useRouter();

  const paginate = (step: number) => {
    setDirection(step);
    setIndex((prev) => (prev + step + slides.length) % slides.length);
  };

  // --- Touch swipe over the photo (mobile) -------------------------------
  // The swipe surface carries `touch-pan-y`: only vertical panning may scroll
  // an ancestor, so a horizontal drag pages photos instead of scrolling the
  // page behind the card.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);
  const SWIPE_MIN_PX = 40;

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (slides.length < 2) return;
    // Horizontal intent only, so a vertical page scroll never pages photos.
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;

    didSwipe.current = true;
    paginate(dx < 0 ? 1 : -1);
  };

  // The swipe surface sits above the card-wide <Link>, so it owns its own taps.
  // The real <Link> stays in the DOM underneath for crawlers and keyboard users.
  const handleSurfaceClick = () => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }
    router.push(href);
  };

  // The panel sits above the card-wide <Link> and takes pointer events (it has
  // to, to receive hover), so it forwards its own clicks to the same href.
  // Clicks that landed on a real link inside it — Book Now — are left alone.
  const handlePanelClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest("a")) return;
    router.push(href);
  };

  const slide = slides[index];
  const offset = reduceMotion ? 0 : 40;

  return (
    <article className="group relative aspect-17/20 w-full overflow-hidden rounded-2xl bg-slate-900 shadow-lg shadow-slate-900/10">
      {/* ---------- image layer ---------- */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -offset }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              // Matches the archive's max-w-5xl / 3-column grid — roughly a
              // fixed 330px per card once the grid stops growing.
              sizes="(min-width: 1024px) 330px, (min-width: 640px) 45vw, 92vw"
              // Only the first slide of an above-the-fold card preloads; the
              // rest are fetched as the reader pages to them.
              priority={priority && index === 0}
              // The zoom releases while the panel is hovered, so the photo is
              // never drifting under text the reader has stopped to read.
              className={`object-cover transition-transform duration-700 ${
                panelHover ? "" : "group-hover:scale-105"
              }`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Top scrim keeps the badges and dots legible on a bright sky. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-black/45 to-transparent"
        />
        {/* Bottom scrim sits under the glass panel so its text keeps contrast
            whatever the photo does. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/80 via-black/30 to-transparent"
        />
      </div>

      {/* Whole-card link, under the controls so the card is one tap target. */}
      <Link
        href={href}
        className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
      >
        <span className="sr-only">View {activity.title}</span>
      </Link>

      {/* Swipe surface — photo area only, below lg. */}
      {slides.length > 1 && (
        <div
          aria-hidden="true"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleSurfaceClick}
          className="absolute inset-x-0 top-0 z-15 h-1/2 touch-pan-y lg:hidden"
        />
      )}

      {/* ---------- badges, top-left ---------- */}
      <div className="pointer-events-none absolute left-3 top-3 z-20 flex items-center gap-2">
        {activity.featured && (
          <span className="rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
            Featured
          </span>
        )}

        {/* Count comes from the gallery itself, so it can never overstate. */}
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/25 px-3 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-md">
          <Images aria-hidden="true" className="h-3.5 w-3.5" />
          {slides.length}
          <span className="sr-only">photos</span>
        </span>
      </div>

      {/* ---------- carousel indicator, top-right ---------- */}
      {slides.length > 1 && (
        <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5">
          {slides.map((item, dotIndex) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Photo ${dotIndex + 1} of ${slides.length}`}
              aria-current={dotIndex === index}
              onClick={(event) => {
                event.preventDefault();
                setDirection(dotIndex > index ? 1 : -1);
                setIndex(dotIndex);
              }}
              className={`h-1.5 cursor-pointer rounded-full transition-all ${
                dotIndex === index
                  ? "w-5 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}

      {/* ---------- carousel arrows (desktop only) ----------
          Shown on card hover, hidden again the moment the pointer moves onto
          the info panel. `lg:focus-visible:opacity-100` keeps them reachable by
          keyboard, where there is no hover to trigger them. */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.preventDefault();
              paginate(-1);
            }}
            className={`absolute left-3 top-[38%] z-20 hidden -translate-y-1/2 cursor-pointer rounded-full border border-white/30 bg-white/15 p-2 text-white shadow-sm backdrop-blur-md transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:block lg:opacity-0 lg:focus-visible:opacity-100 ${
              panelHover ? "" : "lg:group-hover:opacity-100"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.preventDefault();
              paginate(1);
            }}
            className={`absolute right-3 top-[38%] z-20 hidden -translate-y-1/2 cursor-pointer rounded-full border border-white/30 bg-white/15 p-2 text-white shadow-sm backdrop-blur-md transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:block lg:opacity-0 lg:focus-visible:opacity-100 ${
              panelHover ? "" : "lg:group-hover:opacity-100"
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* ---------- glass info panel ----------
          Inset from the card edges and rounded to match the card's own corner
          radius, so it reads as a panel floating on the photo rather than a bar
          welded to the bottom.
          It is pointer-events-AUTO and handles its own clicks: it has to
          receive hover to drive the reveal, and an element that receives hover
          necessarily swallows clicks, so it forwards them to the card's href
          itself rather than letting them fall through. */}
      <div
        onMouseEnter={() => setPanelHover(true)}
        onMouseLeave={() => setPanelHover(false)}
        onClick={handlePanelClick}
        className="group/panel absolute inset-x-3 bottom-3 z-20 cursor-pointer rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
      >
        <h3 className="line-clamp-2 font-heading text-lg font-bold leading-snug text-white">
          {activity.title}
        </h3>

        {/* Collapsible meta — location, rating, duration.
            The 0fr → 1fr grid-rows trick animates to the content's natural
            height without anyone measuring it in JS, which is what makes this
            work with a line-wrapping location string.
            Expanded by default; only `lg:` collapses it, so touch devices —
            which have no hover to open it with — always see the full panel. */}
        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out lg:grid-rows-[0fr] lg:group-hover/panel:grid-rows-[1fr] lg:group-focus-within/panel:grid-rows-[1fr]">
          <div className="overflow-hidden">
            {/* Fades slightly behind the height change so the text does not
                appear while it is still clipped. */}
            <div className="pt-1.5 transition-opacity duration-300 lg:opacity-0 lg:group-hover/panel:opacity-100 lg:group-focus-within/panel:opacity-100">
              <div className="flex items-start justify-between gap-3">
                <p className="inline-flex items-center gap-1.5 text-sm text-white/90">
                  <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <span className="truncate">{activity.location}</span>
                </p>

                {typeof activity.rating === "number" && (
                  <p className="inline-flex shrink-0 items-center gap-1.5 text-sm text-white/90">
                    <Star
                      aria-hidden="true"
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                    ({activity.rating})
                    <span className="sr-only">out of 5</span>
                  </p>
                )}
              </div>

              <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-white/85">
                <Clock aria-hidden="true" className="h-4 w-4 shrink-0" />
                {activity.duration}
              </p>
            </div>
          </div>
        </div>

        {/* Price + CTA row — always visible, divided off from the text above. */}
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/20 pt-3">
          <p className="text-base font-semibold text-white">
            ₹ {activity.pricePerPerson.toLocaleString("en-IN")}
            <span className="text-xs font-normal text-white/80">/person</span>
          </p>

          {/* Goes to the same place as the card today, but it is what a reader
              aims at — and handlePanelClick leaves real links alone, so this
              navigates once rather than racing the panel's own handler. */}
          <Link
            href={href}
            className="relative z-30 shrink-0 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
          >
            Book Now
            <span className="sr-only"> — {activity.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
