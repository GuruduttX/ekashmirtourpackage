"use client";

import { useState } from "react";
import Image from "next/image";
import type { IDestinationImage } from "@/types/destinationTypes";

/**
 * /destinations/[slug] photo strip — an infinite horizontal marquee.
 *
 * The curve is a clip-path on the WINDOW, not on the images: the arc has to
 * stay put while the photos travel under it, so putting the shape on each item
 * would send the bend scrolling off with them. Edges are full height and the
 * middle is ~12% shorter, which reads as the strip bending away from you.
 *
 * Motion reuses the shared `.animate-marquee` utility in globals.css (track is
 * duplicated content, translated -50%), so this behaves like the testimonial
 * rails elsewhere in the app and honours prefers-reduced-motion.
 */

/** One clip-path per page is enough; the id is referenced by CSS url(). */
const CLIP_ID = "destination-photo-strip-arc";

/**
 * The track must overflow the viewport for the loop to look continuous, and
 * it is halved by the -50% translate — so a short CMS list is repeated up to
 * this count before being doubled.
 */
const MIN_ITEMS = 6;

export default function DestinationPhotoStrip({
  destinationName,
  images,
  /** Seconds for one full pass. Longer list, slower scroll. */
  durationSeconds = 40,
}: {
  destinationName: string;
  images?: IDestinationImage[];
  durationSeconds?: number;
}) {
  const [paused, setPaused] = useState(false);

  // A CMS row can exist with its photo not yet uploaded; an empty src would
  // throw inside next/image rather than degrade.
  const usable = (images ?? []).filter((photo) => Boolean(photo.image));
  if (usable.length === 0) return null;

  // Repeat short lists so the strip fills the screen, then double for the loop.
  const filled = [...usable];
  while (filled.length < MIN_ITEMS) filled.push(...usable);
  const track = [...filled, ...filled];

  return (
    <section
      aria-label={`Photos of ${destinationName}`}
      className="w-full overflow-hidden py-10"
    >
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
        onPointerEnter={(event) =>
          event.pointerType === "mouse" && setPaused(true)
        }
        onPointerLeave={(event) =>
          event.pointerType === "mouse" && setPaused(false)
        }
        style={{ clipPath: `url(#${CLIP_ID})` }}
      >
        <div
          className={`animate-marquee flex w-max gap-4 sm:gap-5 ${
            paused ? "animate-marquee-paused" : ""
          }`}
          style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
        >
          {track.map((photo, i) => (
            <div
              key={`${photo.id}-${i}`}
              className="relative h-[220px] w-[300px] shrink-0 overflow-hidden sm:h-[280px] sm:w-[380px] lg:h-[320px] lg:w-[440px]"
            >
              <Image
                src={photo.image}
                // Repeats are the same photo shown twice for the loop, so only
                // the first pass is described; the rest are decorative to keep
                // a screen reader from hearing the strip four times over.
                alt={i < usable.length ? photo.alt : ""}
                fill
                unoptimized
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 300px"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
