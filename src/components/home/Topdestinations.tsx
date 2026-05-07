"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  MapPin,
  Star,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface Destination {
  id: number;
  name: string;
  tagline: string;
  image: string;
  location: string;
  rating: number;
  href?: string;
  featured?: boolean;
}

/* ─────────────────────────────────────────
   Dummy Data
───────────────────────────────────────── */
const destinations: Destination[] = [
  {
    id: 1,
    name: "Srinagar",
    tagline: "City of Lakes",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&auto=format&fit=crop&q=80",
    location: "Central Kashmir",
    rating: 4.9,
    href: "/destinations/srinagar",
    featured: true,
  },
  {
    id: 2,
    name: "Gulmarg",
    tagline: "Snow Paradise",
    image:
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=900&auto=format&fit=crop&q=80",
    location: "Baramulla District",
    rating: 4.8,
    href: "/destinations/gulmarg",
  },
  {
    id: 3,
    name: "Pahalgam",
    tagline: "Valley of Shepherds",
    image:
      "https://images.unsplash.com/photo-1561287437-c69a30664793?w=900&auto=format&fit=crop&q=80",
    location: "Anantnag District",
    rating: 4.8,
    href: "/destinations/pahalgam",
  },
  {
    id: 4,
    name: "Sonamarg",
    tagline: "Meadow of Gold",
    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=900&auto=format&fit=crop&q=80",
    location: "Ganderbal District",
    rating: 4.7,
    href: "/destinations/sonamarg",
  },
  {
    id: 5,
    name: "Dal Lake",
    tagline: "Jewel of Kashmir",
    image:
      "https://images.unsplash.com/photo-1677123419103-785c917c4a58?w=900&auto=format&fit=crop&q=80",
    location: "Srinagar",
    rating: 4.9,
    href: "/destinations/dal-lake",
  },
  {
    id: 6,
    name: "Betab Valley",
    tagline: "Nature's Canvas",
    image:
      "https://images.unsplash.com/photo-1593417376544-4c4201061e22?w=900&auto=format&fit=crop&q=80",
    location: "Pahalgam",
    rating: 4.6,
    href: "/destinations/betab-valley",
  },
];

/* ─────────────────────────────────────────
   Animation Variants
───────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

/* ─────────────────────────────────────────
   DestinationCard
───────────────────────────────────────── */
function DestinationCard({
  destination,
  index,
  inView,
  className = "",
}: {
  destination: Destination;
  index: number;
  inView: boolean;
  className?: string;
}) {
  return (
    <motion.div
      custom={0.05 + index * 0.08}
      variants={cardReveal}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{
        y: -6,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      className={`group relative overflow-hidden rounded-3xl cursor-pointer flex-shrink-0 ${className}`}
      style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.14)" }}
    >
      <Link
        href={destination.href ?? "#"}
        className="absolute inset-0 z-20"
        aria-label={destination.name}
      />

      {/* ── Background image ── */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          unoptimized
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* ── Base overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-400" />

      {/* ── Hover cyan glow ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-sky-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* ── Rating pill — top right ── */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-full">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          {destination.rating}
        </span>
      </div>

      {/* ── Bottom content ── */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
        {/* Location row */}
        <div className="flex items-center gap-1.5 mb-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-400 opacity-70 group-hover:opacity-90">
          <MapPin className="w-3 h-3 text-sky-300 flex-shrink-0" />
          <span className="text-white/70 text-[11px] font-medium tracking-wide">
            {destination.location}
          </span>
        </div>

        {/* Name + tagline */}
        <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
          <h3
            className="text-white text-2xl font-bold leading-none tracking-tight mb-1"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {destination.name}
          </h3>
          <p className="text-white/55 text-xs font-light tracking-wider uppercase">
            {destination.tagline}
          </p>
        </div>

        {/* Hover CTA — fades up */}
        <div className="mt-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-350">
          <span className="inline-flex items-center gap-2 bg-white/15 hover:bg-sky-500 backdrop-blur-md border border-white/25 hover:border-sky-400 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-300">
            Explore
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* ── Border glow on hover ── */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5 group-hover:ring-sky-400/25 transition-all duration-500" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function TopDestinations() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const featured = destinations[0];
  const rest = destinations.slice(1);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden bg-white"
    >
      {/* ── Background atmosphere ── */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 65%)",
        }}
      />
      {/* Top hairline */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-200/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* ══ SECTION HEADER ══ */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 lg:mb-14">
          <div>
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="inline-flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-sky-500 mb-3"
            >
              <span className="w-5 h-px bg-sky-400" />
              Top Destinations
            </motion.p>

            <motion.h2
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Explore Kashmir's
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 70%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Most Beautiful Places
              </span>
            </motion.h2>
          </div>

          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-4 sm:items-end"
          >
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs sm:text-right font-light">
              From serene lakes to snow-covered valleys, discover the most
              breathtaking destinations in Kashmir.
            </p>
            {/* Desktop arrow controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full bg-white border border-sky-100 shadow-sm flex items-center justify-center text-sky-500 hover:bg-sky-50 hover:border-sky-200 transition-all duration-200 hover:-translate-y-0.5"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full bg-sky-500 shadow-md shadow-sky-200 flex items-center justify-center text-white hover:bg-sky-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ══ DESKTOP — ASYMMETRIC GRID ══ */}
        <div className="hidden lg:grid grid-cols-3 gap-5">
          {/* Featured — tall card left, spans 1 col × 2 rows */}
          <div className="row-span-2">
            <DestinationCard
              destination={featured}
              index={0}
              inView={isInView}
              className="w-full h-full min-h-[580px]"
            />
          </div>

          {/* Top-right two cards */}
          <DestinationCard
            destination={rest[0]}
            index={1}
            inView={isInView}
            className="w-full h-[280px]"
          />
          <DestinationCard
            destination={rest[1]}
            index={2}
            inView={isInView}
            className="w-full h-[280px]"
          />

          {/* Bottom-right two cards */}
          <DestinationCard
            destination={rest[2]}
            index={3}
            inView={isInView}
            className="w-full h-[280px]"
          />
          <DestinationCard
            destination={rest[3]}
            index={4}
            inView={isInView}
            className="w-full h-[280px]"
          />
        </div>

        {/* ══ MOBILE / TABLET — HORIZONTAL SCROLL ══ */}
        <div className="lg:hidden relative">
          {/* Edge fades */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-20"
            style={{
              background: "linear-gradient(to right, white, transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-20"
            style={{
              background: "linear-gradient(to left, white, transparent)",
            }}
          />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {destinations.map((dest, i) => (
              <div key={dest.id} className="snap-start flex-shrink-0">
                <DestinationCard
                  destination={dest}
                  index={i}
                  inView={isInView}
                  className="w-[270px] sm:w-[300px] h-[380px]"
                />
              </div>
            ))}
            {/* Trailing spacer */}
            <div className="flex-shrink-0 w-2" />
          </div>

          {/* Mobile arrow + dot row */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-white border border-sky-100 shadow-sm flex items-center justify-center text-sky-500 hover:bg-sky-50 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {destinations.slice(0, 5).map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full bg-sky-200 transition-all"
                  style={{ width: i === 0 ? 20 : 8 }}
                />
              ))}
            </div>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-sky-500 shadow-md shadow-sky-200 flex items-center justify-center text-white hover:bg-sky-600 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ══ VIEW ALL LINK ══ */}
        <motion.div
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 lg:mt-12 flex justify-center"
        >
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors border-b border-dashed border-sky-300 hover:border-sky-500 pb-0.5"
          >
            View all destinations
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>

      <style>{`
        .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
