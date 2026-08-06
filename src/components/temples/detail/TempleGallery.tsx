"use client";

import { useState } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import SectionCard from "./SectionCard";
import GalleryLightbox, { type LightboxImage } from "@/components/temples/GalleryLightbox";
import type { ITempleGalleryImage } from "@/types/templeTypes";

/** Only the first six photos are tiled — the rest are reachable via the lightbox. */
const TILE_COUNT = 6;

export default function TempleGallery({
  images = [],
  templeName,
}: {
  images?: ITempleGalleryImage[];
  templeName: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const gallery: LightboxImage[] = images
    .filter((img) => img.image?.trim())
    .map((img, i) => ({
      id: img.id ?? `${templeName}-${i}`,
      src: img.image,
      alt: img.alt?.trim() || `${templeName} — photo ${i + 1}`,
    }));

  if (gallery.length === 0) return null;

  const tiles = gallery.slice(0, TILE_COUNT);

  return (
    <SectionCard icon={Images} title="Temple Gallery">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {tiles.map((image, i) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open ${image.alt}`}
            className="group relative aspect-4/3 overflow-hidden rounded-xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setLightboxIndex(0)}
        className="mt-4 w-full rounded-2xl bg-linear-to-r from-sky-500 to-cyan-400 py-3 font-heading text-2xl font-extrabold leading-none text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
      >
        Gallery
      </button>

      <GalleryLightbox
        images={gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        label={`${templeName} photo gallery`}
      />
    </SectionCard>
  );
}
