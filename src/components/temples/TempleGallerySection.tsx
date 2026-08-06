"use client";

import { useState } from "react";
import Image from "next/image";
import GalleryLightbox, { type LightboxImage } from "@/components/temples/GalleryLightbox";
import { TEMPLE_GALLERY, TEMPLE_GALLERY_FEATURED } from "@/data/templeGallery";

const LIGHTBOX_IMAGES: LightboxImage[] = TEMPLE_GALLERY.map((img) => ({
  id: img.id,
  src: img.src,
  alt: img.alt,
  caption: img.caption,
}));

/**
 * Desktop placement for the six featured tiles. The grid is 3 columns x 12 rows;
 * the middle column gives up its last two rows to the "Gallery" button, which is
 * why its photos are shorter than the outer columns'.
 */
const TILE_POSITIONS = [
  "col-start-1 row-start-1 row-span-7",
  "col-start-2 row-start-1 row-span-5",
  "col-start-3 row-start-1 row-span-7",
  "col-start-1 row-start-8 row-span-5",
  "col-start-2 row-start-6 row-span-6",
  "col-start-3 row-start-8 row-span-5",
];

function Tile({
  index,
  onOpen,
  className = "",
}: {
  index: number;
  onOpen: (i: number) => void;
  className?: string;
}) {
  const image = TEMPLE_GALLERY_FEATURED[index];

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`group relative overflow-hidden rounded-2xl shadow-lg shadow-black/10 ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        unoptimized
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
      <p className="absolute inset-x-0 bottom-0 px-4 pb-3 text-left font-heading text-lg font-bold text-white sm:text-xl">
        {image.caption}
      </p>
    </button>
  );
}

export default function TempleGallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white px-4 py-10 sm:px-6 lg:flex lg:h-dvh lg:flex-col lg:px-8">
      <div className="mx-auto w-full max-w-6xl lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <h2 className="mb-8 text-center font-heading text-2xl font-extrabold sm:text-3xl lg:mb-6 lg:text-4xl">
          <span className="text-slate-900">Embark most enlighten </span>
          <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
            Temples and Shrines
          </span>
          <span className="text-slate-900"> of Kashmir</span>
        </h2>

        {/* Desktop — mosaic grid with the Gallery button tucked into the middle column */}
        <div className="hidden grid-cols-3 grid-rows-12 gap-4 lg:grid lg:min-h-0 lg:flex-1">
          {TILE_POSITIONS.map((position, i) => (
            <Tile
              key={TEMPLE_GALLERY_FEATURED[i].id}
              index={i}
              onOpen={setLightboxIndex}
              className={position}
            />
          ))}
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="col-start-2 row-start-12 row-span-1 rounded-2xl bg-linear-to-r from-sky-500 to-cyan-400 font-heading text-2xl font-extrabold leading-none text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
          >
            Gallery
          </button>
        </div>

        {/* Mobile / tablet — even grid with the button below */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
          {TEMPLE_GALLERY_FEATURED.map((image, i) => (
            <Tile key={image.id} index={i} onOpen={setLightboxIndex} className="h-44 sm:h-56" />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="mt-4 w-full rounded-2xl bg-linear-to-r from-sky-500 to-cyan-400 py-3 font-heading text-2xl font-extrabold leading-none text-white shadow-lg shadow-sky-200 lg:hidden"
        >
          Gallery
        </button>
      </div>

      <GalleryLightbox
        images={LIGHTBOX_IMAGES}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        label="Temple photo gallery"
      />
    </section>
  );
}
