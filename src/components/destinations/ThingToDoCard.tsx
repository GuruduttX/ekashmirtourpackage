"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Landmark,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { ResolvedThingToDo } from "@/lib/thingsToDo";

/**
 * One "thing to do" card, built to the same rules as the stays <StayCard />:
 * portrait 4:5, photo filling the whole card, everything else sitting over a
 * black gradient rather than in a white panel below it.
 *
 * Photo paging matches the stays card too, because the two sit on the same
 * page and a second set of gestures would be a second thing to learn:
 *   • below lg — swipe across the photo
 *   • lg and up — glass arrows, revealed on hover
 * Dots show position and are tappable at every size.
 *
 * The description is always visible on touch (there is no hover there to
 * reveal it) and slides up on hover from lg. It animates `grid-template-rows`
 * rather than height, so the row collapses to exactly the text's height
 * without anyone having to guess a max-height that clips long copy.
 */

const TYPE_LABEL: Record<ResolvedThingToDo["type"], string> = {
  temple: "Temple",
  stay: "Where to stay",
  activity: "Activity",
  other: "Worth doing",
};

const TYPE_ICON: Record<ResolvedThingToDo["type"], typeof Landmark> = {
  temple: Landmark,
  stay: MapPin,
  activity: Sparkles,
  other: Sparkles,
};

const SWIPE_MIN_PX = 40;

export default function ThingToDoCard({ item }: { item: ResolvedThingToDo }) {
  const Icon = TYPE_ICON[item.type];
  const slides = item.images;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();

  const router = useRouter();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);

  const paginate = (step: number) => {
    if (slides.length < 2) return;
    setDirection(step);
    setIndex((prev) => (prev + step + slides.length) % slides.length);
  };

  // --- Touch swipe over the photo (mobile) -------------------------------
  // `touch-pan-y` on the surface tells the browser only vertical panning may
  // scroll an ancestor, so a horizontal drag pages photos instead of dragging
  // the rail this card sits in.
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

  // The surface sits above the card-wide <Link>, so it owns its own taps. The
  // real <Link> stays in the DOM underneath for crawlers and keyboard users.
  // Unlinked cards ("activity"/"other") have nowhere to go, so a tap there
  // only ever pages the photo.
  const handleSurfaceClick = () => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }
    if (item.href) router.push(item.href);
  };

  const slide = slides[index];
  const offset = reduceMotion ? 0 : 40;

  return (
    <article className="group relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-sky-100 shadow-md shadow-sky-100/70 transition-shadow duration-300 hover:shadow-xl hover:shadow-sky-200/70 sm:rounded-3xl">
      {/* ---------- Image layer ---------- */}
      <div className="absolute inset-0">
        {slide && !failed[slide.id] ? (
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
                unoptimized
                sizes="(max-width: 640px) 68vw, (max-width: 1024px) 42vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                onError={() =>
                  setFailed((prev) => ({ ...prev, [slide.id]: true }))
                }
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          // No usable photo — a tinted panel carrying the type icon, rather
          // than a broken image or a stock shot of somewhere else.
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-sky-200 via-sky-100 to-cyan-100">
            <Icon className="h-10 w-10 text-sky-500/70" />
          </div>
        )}

        {/* Light top scrim so the chip and dots stay legible */}
        <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-slate-950/45 to-transparent" />

        {/* Black gradient across the bottom — carries the text on any photo */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-slate-950 via-slate-950/75 to-transparent" />
      </div>

      {/* Whole-card link, under the controls so the card is one tap target */}
      {item.href && (
        <Link
          href={item.href}
          className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 sm:rounded-3xl"
        >
          <span className="sr-only">{item.heading}</span>
        </Link>
      )}

      {/* Swipe surface — photo area only, mobile only */}
      <div
        aria-hidden="true"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleSurfaceClick}
        className="absolute inset-x-0 top-0 z-15 h-1/2 touch-pan-y lg:hidden"
      />

      {/* ---------- Type chip ---------- */}
      <span className="pointer-events-none absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
        <Icon className="h-3.5 w-3.5" />
        {TYPE_LABEL[item.type]}
      </span>

      {/* ---------- Carousel controls ---------- */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.preventDefault();
              paginate(-1);
            }}
            className="absolute top-1/2 left-3 z-20 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/15 p-2 text-white shadow-sm backdrop-blur-md transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:block lg:opacity-0 lg:group-hover:opacity-100"
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
            className="absolute top-1/2 right-3 z-20 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/15 p-2 text-white shadow-sm backdrop-blur-md transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:block lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
            {slides.map((photo, dotIndex) => (
              <button
                key={photo.id}
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

      {/* ---------- Bottom-left text ---------- */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
        <h3 className="line-clamp-2 font-heading text-lg leading-snug font-bold text-white sm:text-xl">
          {item.heading}
        </h3>

        {item.description && (
          <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-200">
                {item.description}
              </p>
            </div>
          </div>
        )}

        {item.href && (
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-transform duration-300 lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
            View details
            <ArrowUpRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </article>
  );
}
