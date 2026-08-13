"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { DESTINATION_GALLERY } from "@/data/destinationGallery";
import type { Destination } from "@/data/destinations";

/**
 * Kashmir in photos — the page's visual break between two data-heavy sections.
 *
 * Filter chips narrow by destination; clicking a tile opens a lightbox with
 * arrow/keyboard navigation. Photos come from src/data/destinationGallery.ts,
 * where an item either carries its own `src` or reuses a destination's image.
 *
 * On a soft sky-to-cyan wash rather than a dark band: it still separates this
 * section from the plain white above it, but stays in the site's palette. The
 * per-tile caption scrim is the one thing that remains dark — it sits ON the
 * photo, where white text needs a dark base whatever the page around it does.
 *
 * No Review/AggregateRating anywhere near this — the SOP forbids rating markup
 * without genuine on-page reviews, and a photo wall is not a review.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function DestinationGallerySection({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [activePlace, setActivePlace] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /**
   * Resolve each item's photo once: its own `src`, or the referenced
   * destination's image. Items whose reference cannot be resolved are dropped
   * rather than rendered as a broken tile.
   */
  const photos = useMemo(
    () =>
      DESTINATION_GALLERY.map((item) => {
        const src =
          item.src ??
          destinations.find(
            (destination) => destination.slug === item.fromDestination,
          )?.image;

        return src ? { ...item, src } : null;
      }).filter((item): item is (typeof DESTINATION_GALLERY)[number] & { src: string } =>
        Boolean(item),
      ),
    [destinations],
  );

  // Only offer a chip for a place that actually has photos.
  const places = useMemo(() => {
    const withPhotos = new Set(photos.map((photo) => photo.place));
    return destinations.filter((destination) => withPhotos.has(destination.slug));
  }, [photos, destinations]);

  const visible = useMemo(
    () =>
      activePlace === "all"
        ? photos
        : photos.filter((photo) => photo.place === activePlace),
    [photos, activePlace],
  );

  const nameFor = (slug: string) =>
    destinations.find((destination) => destination.slug === slug)?.name ?? slug;

  /** Wraps in both directions, so the arrows never dead-end. */
  const step = useCallback(
    (delta: number) =>
      setLightboxIndex((current) => {
        if (current === null) return current;
        const count = visible.length;
        return (current + delta + count) % count;
      }),
    [visible.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    // Restore whatever overflow was there rather than assuming "visible".
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, step]);

  if (!photos.length) return null;

  const current = lightboxIndex === null ? null : visible[lightboxIndex];

  return (
    <section id="gallery" className="w-full scroll-mt-24 bg-linear-to-br from-sky-50 via-white to-cyan-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold tracking-[0.2em] text-sky-600 uppercase">
            The valley itself
          </p>

          <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
            Kashmir{" "}
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              in photos
            </span>
          </h2>
        </div>

        {/* Filter chips. The rail scrolls on narrow screens — w-max inside an
            overflow-x-auto parent, so it never stretches the section. */}
        <div className="no-scrollbar mt-5 overflow-x-auto pb-1">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {[{ slug: "all", name: "All" }, ...places].map((place) => {
              const isActive = place.slug === activePlace;

              return (
                <button
                  key={place.slug}
                  type="button"
                  onClick={() => {
                    setActivePlace(place.slug);
                    // The old index would point into a different list.
                    setLightboxIndex(null);
                  }}
                  aria-pressed={isActive}
                  className={`relative cursor-pointer rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                    isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-chip"
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                      className="absolute inset-0 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 shadow-md shadow-sky-500/25"
                    />
                  )}
                  <span className="relative">{place.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* layout on the grid + each tile lets framer move survivors into their
            new slots when the filter changes, instead of everything snapping. */}
        <motion.div
          layout
          className="mt-5 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((photo, index) => (
              <motion.button
                key={photo.id}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                onClick={() => setLightboxIndex(index)}
                aria-label={`Open photo: ${photo.caption}`}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-sky-100 ring-1 ring-slate-900/5 ring-inset focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none ${
                  // The lead tile earns extra room, but only in the unfiltered
                  // view and only where there is a 4-column grid to spend it in.
                  index === 0 && activePlace === "all"
                    ? "row-span-2 lg:col-span-2"
                    : ""
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Caption gradient — only as tall as it needs to be, so the
                    photo is not dimmed across the whole tile. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent"
                />

                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-left">
                  <span>
                    <span className="block text-[0.65rem] font-semibold tracking-[0.14em] text-sky-200 uppercase">
                      {nameFor(photo.place)}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug font-medium text-white">
                      {photo.caption}
                    </span>
                  </span>

                  <span className="shrink-0 rounded-full bg-white/15 p-1.5 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <Expand className="h-3.5 w-3.5" />
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ---------- lightbox ---------- */}

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-300 flex flex-col bg-white/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <div className="flex items-center justify-between px-4 py-3 text-slate-700 sm:px-6">
              <p className="text-xs font-medium text-slate-500">
                {(lightboxIndex ?? 0) + 1} / {visible.length}
              </p>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close photo viewer"
                className="cursor-pointer rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* contain, not cover: in a viewer the whole frame matters. */}
                  <Image
                    src={current.src}
                    alt={current.caption}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer rounded-full bg-linear-to-r from-sky-500 to-cyan-400 p-2.5 text-white shadow-lg shadow-sky-500/30 transition-transform hover:scale-105 sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full bg-linear-to-r from-sky-500 to-cyan-400 p-2.5 text-white shadow-lg shadow-sky-500/30 transition-transform hover:scale-105 sm:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="px-4 py-4 text-center sm:px-6">
              <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-sky-600 uppercase">
                {nameFor(current.place)}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-700">{current.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
