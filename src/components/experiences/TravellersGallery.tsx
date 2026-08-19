"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import GalleryDialog from "@/components/experiences/GalleryDialog";
import { galleryAlt, type GalleryImage } from "@/data/experienceGallery";

/**
 * "Travellers Gallery" — an infinite photo marquee that opens a lightbox.
 *
 * A sibling of DestinationPhotoStrip rather than a reuse of it: this one
 * carries captions, is clickable, and owns a dialog, none of which that
 * component has any business growing. They share the approach, not the code.
 *
 * The curve is a clip-path on the WINDOW, not on the items — the arc has to stay
 * put while the photos travel under it, so putting the shape on each image would
 * send the bend scrolling off with them.
 *
 * Motion reuses the shared `.animate-marquee` utility in globals.css, which also
 * disables itself under `prefers-reduced-motion`. When it does, the strip is
 * static — and because every photo is also reachable from the dialog's
 * thumbnails, nothing becomes unreachable by sitting still.
 *
 * CAPTIONS sit centred over the photo on hover, not along its bottom edge: the
 * arc clips up to ~12% off the top and bottom of the middle of the strip, which
 * would slice a bottom-aligned caption in half.
 */

/** Unique per component — the id is referenced by a CSS url(). */
const CLIP_ID = "travellers-gallery-arc";

/**
 * The track must overflow the viewport for the loop to look continuous, and it
 * is halved by the -50% translate, so short lists are repeated before doubling.
 */
const MIN_ITEMS = 6;

export default function TravellersGallery({
  images,
  heading = "Gallery",
  /** Seconds for one full pass. Longer list, slower scroll. */
  durationSeconds = 55,
}: {
  images: GalleryImage[];
  /** The blue half of the heading — renders as "Travellers <heading>". */
  heading?: string;
  durationSeconds?: number;
}) {
  const [paused, setPaused] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const usable = images.filter((image) => Boolean(image.url));
  if (!usable.length) return null;

  // Repeat short lists so the strip fills the screen, then double for the loop.
  const filled = [...usable];
  while (filled.length < MIN_ITEMS) filled.push(...usable);
  const track = [...filled, ...filled];

  const openAt = (index: number) => {
    setActiveIndex(index);
    setDialogOpen(true);
  };

  return (
    <section
      aria-labelledby="travellers-gallery-heading"
      className="w-full overflow-hidden bg-white py-10"
    >
      <h2
        id="travellers-gallery-heading"
        className="px-4 text-center font-heading text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl"
      >
        Travellers <span className="text-sky-500">{heading}</span>
      </h2>

      {/* objectBoundingBox units so the arc stretches with the container
          instead of needing a pixel path per breakpoint. */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
            <path d="M0,0 Q0.5,0.12 1,0 L1,1 Q0.5,0.88 0,1 Z" />
          </clipPath>
        </defs>
      </svg>

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
        className="mt-8"
        style={{ clipPath: `url(#${CLIP_ID})` }}
      >
        <div
          className={`animate-marquee flex w-max ${
            paused ? "animate-marquee-paused" : ""
          }`}
          style={
            { "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties
          }
        >
          {track.map((photo, position) => {
            // Position in the ORIGINAL list — what the dialog needs, since the
            // track is padded and doubled.
            const sourceIndex = position % usable.length;
            const isDuplicate = position >= filled.length;

            return (
              <button
                key={`${photo.id}-${position}`}
                type="button"
                onClick={() => openAt(sourceIndex)}
                // Repeats are the same photo again for the loop, so only the
                // first pass is announced; the rest are hidden to stop a screen
                // reader hearing the strip several times over.
                aria-hidden={isDuplicate ? "true" : undefined}
                tabIndex={isDuplicate ? -1 : undefined}
                aria-label={`Open gallery: ${photo.caption}`}
                className="group relative mr-4 h-[220px] w-[300px] shrink-0 cursor-pointer overflow-hidden sm:mr-5 sm:h-[280px] sm:w-[380px] lg:h-[320px] lg:w-[440px]"
              >
                <Image
                  src={photo.url}
                  alt={isDuplicate ? "" : galleryAlt(photo)}
                  fill
                  sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 300px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Caption, centred so the arc cannot clip it. */}
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950/55 px-5 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 text-white"
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

      <div className="mt-8 flex justify-center px-4">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="cursor-pointer rounded-full bg-linear-to-r from-sky-400 to-sky-500 px-9 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform hover:-translate-y-0.5"
        >
          Open Gallery
        </button>
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
