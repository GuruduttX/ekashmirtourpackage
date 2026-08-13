"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Images } from "lucide-react";

type Photo = { id: string; image: string; alt?: string };

/**
 * Mobile gallery: a snap-scrolling swipe track with dot indicators.
 *
 * Desktop keeps the static grid in StayDetailHero, so this only renders below
 * `lg`. The active dot is derived from scrollLeft rather than IntersectionObserver
 * — one slide per viewport width makes the maths exact and cheap.
 */
export default function StayGallerySwiper({
  photos,
  title,
}: {
  photos: Photo[];
  title: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActive(Math.min(Math.max(index, 0), photos.length - 1));
  }

  return (
    <div className="relative lg:hidden">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-2xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="relative aspect-4/3 w-full shrink-0 snap-center bg-sky-100"
          >
            {photo.image && (
              <Image
                src={photo.image}
                alt={photo.alt || title}
                fill
                unoptimized
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {photos.length > 1 && (
        <>
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            <Images className="h-3.5 w-3.5" />
            {photos.length} photos
          </span>

          {/* Scroll indicator — bottom centre, above the photo */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-slate-950/50 px-2.5 py-1.5 backdrop-blur-md">
            {photos.map((photo, i) => (
              <span
                key={photo.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
