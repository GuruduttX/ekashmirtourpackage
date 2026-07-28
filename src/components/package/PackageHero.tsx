"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, MapPin, Share2, Check } from "lucide-react";
import Breadcrumbs, { BreadcrumbItem } from "@/components/layout/Breadcrumbs";

interface PackageHeroProps {
  title: string;
  duration?: string;
  rating?: number;
  reviews?: number;
  destination?: string;
  heroImage: { image: string; alt: string };
  childImages: Array<{ id?: string; image: string; alt: string }>;
  breadcrumbs?: BreadcrumbItem[];
}

const FALLBACK =
  "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1600&auto=format&fit=crop&q=80";

function GridImage({
  image,
  caption,
  priority,
  className = "",
}: {
  image: string;
  caption: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-md shadow-black/10 ${className}`}
    >
      <Image
        src={image || FALLBACK}
        alt={caption}
        fill
        unoptimized
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-transparent" />
      {caption && (
        <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold leading-tight text-white drop-shadow-md">
          {caption}
        </p>
      )}
    </div>
  );
}

export default function PackageHero({
  title,
  rating = 5,
  reviews = 0,
  destination = "Kashmir, India",
  heroImage,
  childImages,
  breadcrumbs = [],
}: PackageHeroProps) {
  const [copied, setCopied] = useState(false);

  // 4 side images (top-left, top-right, bottom-left, bottom-right) + tall center.
  const sides = childImages.slice(0, 4);
  while (sides.length < 4) sides.push({ image: "", alt: "" });

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user dismissed share sheet — no-op */
    }
  };

  const roundedRating = Math.round(rating);

  return (
    <section className="w-full bg-white px-4 pt-24 pb-6 sm:px-6 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumbs — left-aligned with the grid; scrolls horizontally on mobile */}
        {breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-5" />
        )}

        {/* Image grid */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-6 md:h-96 lg:h-110">
            {/* Center — tall hero, spans both rows on desktop, full-width top on mobile */}
            <GridImage
              image={heroImage?.image}
              caption={heroImage?.alt || title}
              priority
              className="col-span-2 h-70 md:col-span-1 md:col-start-2 md:row-span-2 md:h-full"
            />

            <GridImage
              image={sides[0].image}
              caption={sides[0].alt}
              className="h-37.5 md:col-start-1 md:row-start-1 md:h-full"
            />
            <GridImage
              image={sides[1].image}
              caption={sides[1].alt}
              className="h-37.5 md:col-start-3 md:row-start-1 md:h-full"
            />
            <GridImage
              image={sides[2].image}
              caption={sides[2].alt}
              className="h-37.5 md:col-start-1 md:row-start-2 md:h-full"
            />
            <GridImage
              image={sides[3].image}
              caption={sides[3].alt}
              className="h-37.5 md:col-start-3 md:row-start-2 md:h-full"
            />
          </div>
        </div>

        {/* Title + meta + share */}
        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold leading-tight bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent sm:text-4xl">
              {title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-700">
              <span className="font-medium">
                {reviews > 0 ? `${reviews} Reviews` : "New"}
              </span>
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < roundedRating
                        ? "fill-sky-400 text-sky-400"
                        : "fill-slate-200 text-slate-200"
                    }`}
                  />
                ))}
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <MapPin className="h-4 w-4 text-sky-500" />
                {destination}
              </span>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
          >
            {copied ? "Link Copied" : "Share"}
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
