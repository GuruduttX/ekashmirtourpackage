"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants, Easing } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";

const FALLBACK =
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&auto=format&fit=crop&q=80";

const easeOutExpo: Easing = [0.16, 1, 0.3, 1];

const overlayContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const overlayItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
};

export interface TempleHeroImage {
  id?: string;
  image: string;
  alt?: string;
}

interface TempleDetailHeroProps {
  title: string;
  templeType?: string;
  location?: string;
  image?: string;
  alt?: string;
  galleryImages?: TempleHeroImage[];
}

/**
 * Title / type / location overlaid on the bottom-left of the main hero image.
 *
 * Both the desktop and mobile grids stay in the DOM (they're only CSS-hidden),
 * so exactly one of them renders the real <h1> — the other repeats the title as
 * a <p> to keep the page to a single top-level heading.
 */
function HeroOverlay({
  title,
  templeType,
  location,
  heading = false,
}: Pick<TempleDetailHeroProps, "title" | "templeType" | "location"> & { heading?: boolean }) {
  const Title = heading ? motion.h1 : motion.p;

  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
      <motion.div
        variants={overlayContainer}
        initial="hidden"
        animate="visible"
        className="absolute inset-x-0 bottom-0 p-5 text-left sm:p-6 lg:p-7"
      >
        <Title
          variants={overlayItem}
          className="font-heading text-2xl font-bold leading-tight text-white drop-shadow-lg sm:text-3xl lg:text-4xl"
        >
          {title}
        </Title>
        <motion.div
          variants={overlayItem}
          className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm"
        >
          {templeType && (
            <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 font-medium text-white backdrop-blur-sm">
              {templeType}
            </span>
          )}
          {location && (
            <span className="flex items-center gap-1.5 font-medium text-white/90 drop-shadow">
              <MapPin className="h-4 w-4 text-sky-300" /> {location}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

export default function TempleDetailHero({
  title,
  templeType,
  location,
  image,
  alt,
  galleryImages = [],
}: TempleDetailHeroProps) {
  const uploaded = galleryImages.filter((g) => g.image?.trim());
  const galleryCells: TempleHeroImage[] = Array.from(
    { length: 4 },
    (_, i) => uploaded[i] ?? { image: FALLBACK, alt: title }
  );

  const heroImage = (
    <Image
      src={image || FALLBACK}
      alt={alt || title}
      fill
      unoptimized
      priority
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );

  return (
    <section className="w-full bg-white px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb — aligned with the grid's left edge */}
        <nav aria-label="Breadcrumb" className="no-scrollbar mb-4 overflow-x-auto">
          <ol className="flex w-max items-center gap-1.5 whitespace-nowrap text-sm sm:w-auto">
            <li className="shrink-0">
              <Link href="/" className="text-slate-500 transition-colors hover:text-sky-600">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden />
            <li className="shrink-0">
              <Link href="/temples" className="text-slate-500 transition-colors hover:text-sky-600">
                Temples &amp; Shrines
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden />
            <li aria-current="page" className="shrink-0">
              <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text font-semibold text-transparent">
                {title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Desktop — 4 cols x 2 rows, hero spans 2x2 on the left */}
        <div className="hidden h-105 grid-cols-4 grid-rows-2 gap-3 lg:grid">
          <div className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl">
            {heroImage}
            <HeroOverlay title={title} templeType={templeType} location={location} heading />
          </div>
          {galleryCells.map((img, i) => (
            <div key={img.id ?? i} className="group relative overflow-hidden rounded-xl">
              <Image
                src={img.image}
                alt={img.alt || title}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Mobile / tablet — 2 cols x 4 rows, hero spans 2x2 on top */}
        <div className="grid h-105 grid-cols-2 grid-rows-4 gap-2.5 sm:h-130 lg:hidden">
          <div className="group relative col-span-2 row-span-2 overflow-hidden rounded-2xl">
            {heroImage}
            <HeroOverlay title={title} templeType={templeType} location={location} />
          </div>
          {galleryCells.map((img, i) => (
            <div key={img.id ?? i} className="group relative overflow-hidden rounded-xl">
              <Image
                src={img.image}
                alt={img.alt || title}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
