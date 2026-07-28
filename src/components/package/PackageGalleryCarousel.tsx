"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
  image: string;
  alt: string;
}

const FALLBACK =
  "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1600&auto=format&fit=crop&q=80";

export default function PackageGalleryCarousel({
  images,
}: {
  images: GalleryImage[];
}) {
  const [paused, setPaused] = useState(false);

  const gallery = images.filter((img) => img?.image);
  if (gallery.length === 0) return null;

  // Duplicate the track so it can loop seamlessly at -50% translate.
  const track = [...gallery, ...gallery];

  return (
    <section className="w-full py-0 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          Gallery
        </h2>
        <p className="mt-1 text-slate-600">
          A glimpse of the sights and experiences on this trip.
        </p>
      </div>

      <div
        className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={`flex w-max gap-4 sm:gap-6 animate-marquee ${
            paused ? "animate-marquee-paused" : ""
          }`}
          style={{ "--marquee-duration": `${gallery.length * 6}s` } as React.CSSProperties}
        >
          {track.map((img, i) => (
            <div
              key={i}
              className="relative h-48 w-64 shrink-0 overflow-hidden rounded-2xl shadow-md shadow-black/10 sm:h-56 sm:w-80"
            >
              <Image
                src={img.image || FALLBACK}
                alt={img.alt || "Kashmir tour gallery image"}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
