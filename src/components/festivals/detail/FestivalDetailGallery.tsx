"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import GalleryDialog from "@/components/experiences/GalleryDialog";
import { galleryAlt, type GalleryImage } from "@/data/experienceGallery";

/**
 * SOP §2.6 gallery — a static grid on the detail page, not the marquee.
 *
 * NOT A REUSE OF <FestivalGallery />. That one is the hub's full-bleed rail
 * over the valley plate, sized for a landing strip; this sits inside the
 * detail page's content column, where a scrolling rail would compete with the
 * reading. They share the lightbox and the GalleryImage type, which is the part
 * worth sharing.
 *
 * THE ONLY CLIENT COMPONENT ON THE PAGE, and it sits below the fold on purpose:
 * the hero, the facts and the prose are all server-rendered, so the lightbox JS
 * never lands on the critical path. Nothing here is required to read the page —
 * with JS off, the grid is still eight photos with correct alt text.
 *
 * CAPTIONS ARE A HONESTY SURFACE. While the photography is stock placeholder,
 * the captions describe the KIND of photo each slot holds. Captioning a stock
 * crowd as a named festival is the exact failure src/data/festivals.ts warns
 * about — rewrite both caption and alt against the real image when it lands.
 */
export default function FestivalDetailGallery({
  name,
  images,
}: {
  name: string;
  images: GalleryImage[];
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const usable = images.filter((image) => Boolean(image.url));
  if (!usable.length) return null;

  const openAt = (next: number) => {
    setIndex(next);
    setOpen(true);
  };

  return (
    <section
      aria-labelledby="festival-photos-heading"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
      id="gallery"
    >
      <h2
        id="festival-photos-heading"
        className="text-center font-heading text-xl font-bold text-slate-900 sm:text-2xl md:text-left"
      >
        {name} in <span className="text-sky-500">photographs</span>
      </h2>

      {/* Two up on a phone, three from sm. Square crops so a mixed set of
          portrait and landscape sources still tiles evenly. */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {usable.map((photo, position) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => openAt(position)}
            aria-label={`Open photo: ${photo.caption}`}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-slate-100"
          >
            <Image
              src={photo.url}
              alt={galleryAlt(photo)}
              fill
              sizes="(min-width: 640px) 240px, 45vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-slate-950/55 px-3 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand aria-hidden="true" className="h-4 w-4 shrink-0 text-white" />
              <span className="text-xs font-medium text-white">
                {photo.caption}
              </span>
            </span>
          </button>
        ))}
      </div>

      <GalleryDialog
        images={usable}
        index={index}
        open={open}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </section>
  );
}
