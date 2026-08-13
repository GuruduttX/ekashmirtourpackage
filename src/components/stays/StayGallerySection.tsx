"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Images, X } from "lucide-react";
import type { StayDetailImage } from "@/lib/stayDetailPage";

/**
 * Gallery — a bento grid that opens into a full-screen viewer.
 *
 * The grid deliberately breaks the uniform-thumbnail rhythm: every fourth pair
 * of photos gets a tall/wide cell, so a houseboat's deck shot reads as the
 * feature it is. Spans come from the index (see BENTO), which keeps the layout
 * stable for any photo count without the CMS having to tag "hero" images.
 *
 * The viewer is a client-side lightbox: arrow keys and Escape, prev/next
 * buttons, a thumbnail selector row, and a scroll lock on the body while open.
 * All images are in the server HTML as grid cells, so the lightbox adds no SEO
 * cost — it only re-presents what is already on the page.
 */

/**
 * The grid is a preview, not the whole set: 5 cells on desktop, 4 on mobile,
 * with the rest reachable through the viewer. Both counts tile exactly —
 * desktop is a 4-column bento (one 2×2 feature + four squares, two full rows),
 * mobile is a plain 2×2.
 */
const DESKTOP_TILES = 5;
const MOBILE_TILES = 4;

export default function StayGallerySection({
  photos,
  title,
}: {
  photos: StayDetailImage[];
  title: string;
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const isOpen = openAt !== null;
  const thumbsRef = useRef<HTMLDivElement>(null);

  const step = useCallback(
    (delta: number) => {
      setOpenAt((current) => {
        if (current === null) return current;
        // Wrap, so the viewer never dead-ends on the first or last photo.
        return (current + delta + photos.length) % photos.length;
      });
    },
    [photos.length],
  );

  // Keyboard control + scroll lock, both only while the viewer is open.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenAt(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, step]);

  // Keep the active thumbnail in view as the reader arrows through.
  useEffect(() => {
    if (openAt === null) return;
    thumbsRef.current
      ?.querySelector<HTMLElement>(`[data-index="${openAt}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [openAt]);

  if (!photos.length) return null;

  const active = openAt === null ? null : photos[openAt];

  const tiles = photos.slice(0, DESKTOP_TILES);
  const hiddenOnMobile = photos.length - MOBILE_TILES;
  const hiddenOnDesktop = photos.length - DESKTOP_TILES;

  return (
    <section id="gallery" className="scroll-mt-24">
      <div className="text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Gallery</p>

        <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          A look around
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {photos.length} {photos.length === 1 ? "photo" : "photos"} — tap any one to open the
          full-screen viewer.
        </p>
      </div>

      {/* ---------- Bento grid ---------- */}
      <div className="mt-5 grid auto-rows-[8.5rem] grid-cols-2 gap-2.5 sm:auto-rows-[9.5rem] sm:grid-cols-4">
        {tiles.map((photo, index) => (
          <motion.button
            key={photo.id || index}
            type="button"
            onClick={() => setOpenAt(index)}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04 }}
            aria-label={`Open photo ${index + 1} of ${photos.length}`}
            className={`group relative overflow-hidden rounded-2xl bg-sky-100 ${
              index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
            } ${
              // The 5th tile is desktop-only — mobile shows a 2×2 of four.
              index >= MOBILE_TILES ? "hidden sm:block" : ""
            }`}
          >
            <Image
              src={photo.image}
              alt={photo.alt || title}
              fill
              unoptimized
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Scrim + expand affordance, revealed on hover/focus. */}
            <span className="absolute inset-0 bg-slate-950/0 transition-colors duration-300 group-hover:bg-slate-950/25 group-focus-visible:bg-slate-950/25" />

            <span className="absolute right-2.5 top-2.5 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-white/90 text-slate-800 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <Expand className="h-4 w-4" />
            </span>

            {/* "+N more" sits on the last *visible* tile, which differs by
                breakpoint — 4th on mobile, 5th on desktop. */}
            {index === MOBILE_TILES - 1 && hiddenOnMobile > 0 && (
              <span className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/55 text-white sm:hidden">
                <span className="font-heading text-2xl font-bold">+{hiddenOnMobile}</span>
                <span className="text-xs font-medium">more photos</span>
              </span>
            )}

            {index === DESKTOP_TILES - 1 && hiddenOnDesktop > 0 && (
              <span className="absolute inset-0 hidden flex-col items-center justify-center bg-slate-950/55 text-white sm:flex">
                <span className="font-heading text-2xl font-bold">+{hiddenOnDesktop}</span>
                <span className="text-xs font-medium">more photos</span>
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {photos.length > MOBILE_TILES && (
        <div className="mt-3.5 flex justify-center md:justify-end">
          <button
            type="button"
            onClick={() => setOpenAt(0)}
            className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-600 transition-colors hover:border-sky-300 hover:bg-sky-50"
          >
            <Images className="h-4 w-4" />
            View all {photos.length} photos
          </button>
        </div>
      )}

      {/* ---------- Full-screen viewer ---------- */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — photo viewer`}
            className="fixed inset-0 z-[300] flex flex-col bg-slate-950/95 backdrop-blur-sm"
          >
            {/* Top bar */}
            <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                <Images className="h-3.5 w-3.5" />
                {(openAt ?? 0) + 1} / {photos.length}
              </span>

              <button
                type="button"
                onClick={() => setOpenAt(null)}
                aria-label="Close gallery"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Stage. Clicking the backdrop closes; the image itself doesn't. */}
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-16"
              onClick={() => setOpenAt(null)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={openAt}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  onClick={(event) => event.stopPropagation()}
                  className="relative h-full w-full"
                >
                  <Image
                    src={active.image}
                    alt={active.alt || title}
                    fill
                    unoptimized
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      step(-1);
                    }}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/25 sm:left-5"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      step(1);
                    }}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/25 sm:right-5"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Caption + thumbnail selector row */}
            <div className="shrink-0 px-4 pb-4 pt-2 sm:px-6">
              {active.alt && (
                <p className="mb-2.5 truncate text-center text-sm text-white/70">{active.alt}</p>
              )}

              <div
                ref={thumbsRef}
                className="mx-auto flex max-w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden"
              >
                {photos.map((photo, index) => (
                  <button
                    key={photo.id || index}
                    type="button"
                    data-index={index}
                    onClick={() => setOpenAt(index)}
                    aria-label={`Show photo ${index + 1}`}
                    aria-current={index === openAt}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                      index === openAt
                        ? "ring-2 ring-sky-400"
                        : "opacity-50 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={photo.image}
                      alt=""
                      fill
                      unoptimized
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
