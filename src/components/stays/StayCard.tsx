"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Users } from "lucide-react";
import type { Stay } from "@/data/stays";

/**
 * Archive card for the /stays hub.
 *
 * The image fills the whole card; everything else sits over it. A black
 * gradient covers the bottom half and carries the info text, so the text stays
 * readable on any photo without a glass panel.
 *
 * Photo paging differs by breakpoint:
 *   • below lg — swipe across the photo (no arrows; the cards sit in a
 *     horizontally-scrolling row, so arrows would crowd a narrow card)
 *   • lg and up — glass arrows, revealed on hover
 * The dots show position and are tappable at every size.
 *
 * The card is one link (whole surface); the arrows, dots and a completed
 * swipe all suppress the click so paging never navigates.
 */
export default function StayCard({ stay }: { stay: Stay }) {
  const slides = stay.gallery.length
    ? stay.gallery
    : [{ id: "fallback", image: stay.image, alt: stay.alt }];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();

  const paginate = (step: number) => {
    setDirection(step);
    setIndex((prev) => (prev + step + slides.length) % slides.length);
  };

  // --- Touch swipe over the photo (mobile) -------------------------------
  // The swipe surface carries `touch-pan-y`, which tells the browser only
  // vertical panning may scroll an ancestor. That stops a horizontal drag on
  // the photo from also dragging the row this card sits in — the row is still
  // scrolled by dragging the info panel or the gaps between cards.
  const router = useRouter();
  const href = `/stays/${stay.slug}/`;
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
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.5)
      return;

    didSwipe.current = true;
    paginate(dx < 0 ? 1 : -1);
  };

  // The surface sits above the card-wide <Link>, so it owns its own taps. The
  // real <Link> stays in the DOM underneath for crawlers and keyboard users.
  const handleSurfaceClick = () => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }
    router.push(href);
  };

  const slide = slides[index];
  const offset = reduceMotion ? 0 : 40;

  return (
    <article className="group relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-sky-100 shadow-md shadow-sky-100/70 transition-shadow duration-300 hover:shadow-xl hover:shadow-sky-200/70 sm:rounded-3xl">
      {/* ---------- Image layer ---------- */}
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
            {failed[slide.id] ? (
              // Fallback until the real photo lands in /public/stays/<slug>/
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-sky-200 via-sky-100 to-cyan-100">
                <span className="px-6 text-center font-heading text-2xl font-bold text-sky-700/70">
                  {stay.title}
                </span>
              </div>
            ) : (
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                unoptimized
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() =>
                  setFailed((prev) => ({ ...prev, [slide.id]: true }))
                }
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Light top scrim so the category chip and dots stay legible */}
        <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-slate-950/45 to-transparent" />

        {/* Solid black backdrop across the bottom half — carries the info text
            on any photo, so the panel itself needs no glass. */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      {/* Whole-card link sits under the controls so the card is one tap target */}
      <Link
        href={href}
        className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 sm:rounded-3xl"
      >
        <span className="sr-only">View {stay.title}</span>
      </Link>

      {/* Swipe surface — photo area only, mobile only. touch-pan-y keeps the
          horizontal gesture here instead of scrolling the row behind it. */}
      <div
        aria-hidden="true"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleSurfaceClick}
        className="absolute inset-x-0 top-0 z-15 h-1/2 touch-pan-y lg:hidden"
      />

      {/* ---------- Category chip ---------- */}
      <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
        {stay.category}
      </span>

      {/* ---------- Carousel arrows (glass) ---------- */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.preventDefault();
              paginate(-1);
            }}
            className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/15 p-2 text-white opacity-100 shadow-sm backdrop-blur-md transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:block lg:opacity-0 lg:group-hover:opacity-100"
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
            className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/15 p-2 text-white opacity-100 shadow-sm backdrop-blur-md transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:block lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Slide dots */}
          <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5">
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
                className={`h-1.5 rounded-full transition-all ${
                  dotIndex === index
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* ---------- Bottom info panel ----------
          No glass box — the text sits straight on the black gradient above, so
          it stays readable over any photo. */}
      {/* Cards are wide at every breakpoint now — ~78vw in the mobile rail,
          ~300px+ in the desktop grid — so one type scale works throughout. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4">
        <div>
          <h3 className="line-clamp-2 font-heading text-lg font-bold leading-snug text-white">
            {stay.title}
          </h3>

          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-200">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{stay.area}</span>
          </p>

          {/* Highlights — scroll sideways, never wrap to a second line */}
          <div className="no-scrollbar pointer-events-auto mt-3 flex snap-x flex-nowrap items-center gap-1.5 overflow-x-auto">
            <span className="inline-flex shrink-0 snap-start items-center gap-1 whitespace-nowrap rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white">
              <Users className="h-3.5 w-3.5" /> Sleeps {stay.sleeps}
            </span>
            {stay.highlights.map((highlight) => (
              <span
                key={highlight}
                className="shrink-0 snap-start whitespace-nowrap rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white"
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="mt-3 flex items-end justify-between gap-2 border-t border-white/20 pt-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-slate-300">
                From
              </p>
              <p className="font-heading text-xl font-bold leading-none text-white">
                ₹{stay.priceFrom.toLocaleString("en-IN")}
                <span className="ml-1 text-xs font-medium text-slate-300">
                  /night
                </span>
              </p>
            </div>

            <Link
              href={`/stays/${stay.slug}/`}
              className="pointer-events-auto relative z-30 inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition-transform hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
