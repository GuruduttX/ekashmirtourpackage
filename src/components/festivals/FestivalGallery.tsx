"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import GalleryDialog from "@/components/experiences/GalleryDialog";
import FestivalOrnament from "@/components/festivals/FestivalOrnament";
import { galleryAlt, type GalleryImage } from "@/data/experienceGallery";

/**
 * "Festival gallery" — an infinite photo rail on the left, the heading and the
 * full-screen button on the right, both over the valley plate.
 *
 * THE SPLIT IS THE DESIGN. The rail takes ~60% of the width and the copy sits
 * in the remaining 40%, which is the clear part of gallery-bg.webp — the
 * pavilion and blossom are painted into the right of that artwork and the
 * heading is meant to land on top of them. Widen the rail past 60% and the
 * copy walks off its own background.
 *
 * That only holds where there are two columns to split. Below lg the rail goes
 * full width with the copy stacked above it, because a 60% column on a phone
 * is about 220px of photo.
 *
 * Motion reuses the shared `.animate-marquee` utility in globals.css — the
 * track is the list rendered twice and translated -50%, which is why the
 * duplicate half is hidden from screen readers below. That utility also
 * switches itself off under `prefers-reduced-motion`; when it does the strip is
 * simply static, and nothing becomes unreachable because every photo is also
 * in the dialog's thumbnail strip.
 *
 * A sibling of TravellersGallery rather than a reuse of it: that one is a
 * full-bleed arc-clipped band with a centred heading, and the two share an
 * approach, not a layout. They do share the dialog and the GalleryImage type.
 */

/**
 * The track must overflow its window for the loop to look continuous, and the
 * -50% translate halves it, so short lists are repeated before doubling.
 */
const MIN_ITEMS = 6;

export default function FestivalGallery({
  images,
  /** Seconds for one full pass. Longer list, slower scroll. */
  durationSeconds = 45,
}: {
  images: GalleryImage[];
  durationSeconds?: number;
}) {
  const [paused, setPaused] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const usable = images.filter((image) => Boolean(image.url));
  if (!usable.length) return null;

  const filled = [...usable];
  while (filled.length < MIN_ITEMS) filled.push(...usable);
  const track = [...filled, ...filled];

  const openAt = (index: number) => {
    setActiveIndex(index);
    setDialogOpen(true);
  };

  return (
    <section
      aria-labelledby="festival-gallery"
      className="relative overflow-hidden"
    >
      <Image
        src="/festival/hero/gallery-bg.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8">
        {/* COPY. First in the DOM so it is read before eight photos, but sent
            to the right-hand column on lg with `order` — the artwork's clear
            space is on that side. */}
        <div className="flex flex-col items-center text-center lg:order-2 lg:w-[38%] lg:shrink-0">
          <h2
            id="festival-gallery"
            className="font-heading text-2xl font-bold tracking-wide text-white [font-variant:small-caps] drop-shadow-[0_2px_16px_rgba(15,23,42,0.55)] sm:text-3xl lg:text-4xl"
          >
            Festival <span className="text-sky-300">gallery</span>
          </h2>

          <FestivalOrnament tone="light" className="mt-3 max-w-xs sm:mt-4" />

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85 drop-shadow-[0_1px_10px_rgba(15,23,42,0.6)] sm:text-base">
            Bonfires, blossom, silver headdresses and lantern-lit water — the
            valley&rsquo;s festival year, photograph by photograph.
          </p>

          <button
            type="button"
            onClick={() => openAt(0)}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-sky-400 to-sky-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:text-base"
          >
            <Expand className="h-4 w-4 shrink-0" aria-hidden="true" />
            View full screen
          </button>
        </div>

        {/* THE RAIL. overflow-hidden here, not on the section: the track is
            wider than the page and would otherwise stretch the document. */}
        <div
          // Mouse only: a touch "hover" would latch the strip paused after a tap.
          onPointerEnter={(event) =>
            event.pointerType === "mouse" && setPaused(true)
          }
          onPointerLeave={(event) =>
            event.pointerType === "mouse" && setPaused(false)
          }
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="-mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:order-1 lg:mx-0 lg:w-[62%] lg:px-0"
        >
          <div
            className={`animate-marquee flex w-max gap-4 py-2 sm:gap-5 ${
              paused ? "animate-marquee-paused" : ""
            }`}
            style={
              {
                "--marquee-duration": `${durationSeconds}s`,
              } as React.CSSProperties
            }
          >
            {track.map((photo, position) => {
              // Position in the ORIGINAL list — what the dialog needs, since
              // the track is padded and doubled.
              const sourceIndex = position % usable.length;
              const isDuplicate = position >= filled.length;

              return (
                <button
                  key={`${photo.id}-${position}`}
                  type="button"
                  onClick={() => openAt(sourceIndex)}
                  // Repeats are the same photo again for the loop, so only the
                  // first pass is announced; the rest are hidden to stop a
                  // screen reader hearing the strip several times over.
                  aria-hidden={isDuplicate ? "true" : undefined}
                  tabIndex={isDuplicate ? -1 : undefined}
                  aria-label={`Open gallery: ${photo.caption}`}
                  className="group relative h-[260px] w-[190px] shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-lg shadow-slate-900/20 ring-1 ring-white/25 sm:h-[320px] sm:w-[235px]"
                >
                  <Image
                    src={photo.url}
                    alt={isDuplicate ? "" : galleryAlt(photo)}
                    fill
                    sizes="(min-width: 640px) 235px, 190px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950/55 px-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-white"
                    />
                    <span className="text-sm font-medium text-white">
                      {photo.caption}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <GalleryDialog
        images={usable}
        index={activeIndex}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onIndexChange={setActiveIndex}
      />
    </section>
  );
}
