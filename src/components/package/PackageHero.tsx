"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {
  Clock,
  MapPin,
  Users,
  Star,
  Snowflake,
  ChevronLeft,
  ChevronRight,
  Tag,
  Sparkles,
} from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
    label: "Dal Lake",
  },
  {
    src: "https://images.unsplash.com/photo-1593417376544-4c4201061e22?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
    label: "Gulmarg Slopes",
  },
  {
    src: "https://images.unsplash.com/photo-1561287437-c69a30664793?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FzaG1pciUyMHZhbGx5fGVufDB8fDB8fHww",
    label: "Pahalgam Valley",
  },
  {
    src: "https://images.unsplash.com/photo-1677123419103-785c917c4a58?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGthc2htaXIlMjB2YWxseXxlbnwwfHwwfHx8MA%3D%3D",
    label: "Shikara Sunrise",
  },
];

const pkg = {
  tag: "Premium Package",
  title: "Kashmir — Heaven on Earth",
  subtitle: `A curated journey through India's most breathtaking highland paradise.
Explore hidden trails winding through ancient forests and pristine lakes.
Reconnect with serenity while experiencing the region's raw, untouched beauty.
Step out of the ordinary and into an unforgettable elevated adventure.`,
  duration: "7 Days / 6 Nights",
  groupSize: "2 – 12 People",
  rating: "4.9",
  reviews: "340+ Reviews",
};

const marqueeItems = [
  { icon: Tag, text: "Early Bird Offer — 25% Off" },
  { icon: Sparkles, text: "Book Now & Save Big" },
  { icon: Tag, text: "Early Bird Offer — 25% Off" },
  { icon: Sparkles, text: "Limited Seats Available" },
  { icon: Tag, text: "Early Bird Offer — 25% Off" },
  { icon: Sparkles, text: "Book Now & Save Big" },
  { icon: Tag, text: "Early Bird Offer — 25% Off" },
  { icon: Sparkles, text: "Limited Seats Available" },
];

const INTERVAL = 3000;

export default function PackageHero() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === active) return;
      setPrev(active);
      setFading(true);
      setTimeout(() => {
        setActive(idx);
        setPrev(null);
        setFading(false);
      }, 700);
    },
    [active],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((active + 1) % images.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [active, goTo]);

  return (
    <div className="flex flex-col">
      <section className="relative h-[90vh] min-h-[580px] overflow-hidden font-sans flex flex-col">
        {/* ── Background images ── */}
        {images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: i === active ? 1 : i === prev && fading ? 0 : 0,
              zIndex: i === active ? 1 : i === prev ? 2 : 0,
            }}
          >
            <Image
              src={img.src}
              alt={img.label}
              fill
              className="object-cover object-center"
              priority={i === 0}
              unoptimized
            />
          </div>
        ))}

        {/* ── Overlays ── */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/80 via-slate-900/20 to-slate-950/90" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent" />


        {/* ══════════ TOP — Breadcrumb + Heading ══════════ */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 md:pt-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/45 font-light tracking-wide mb-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/packages"
              className="hover:text-white transition-colors"
            >
              Packages
            </Link>
            <span>/</span>
            <span className="text-white/75">Kashmir</span>
          </nav>

          {/* Tag badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[0.65rem] uppercase tracking-widest font-bold text-white bg-sky-500/70 backdrop-blur-sm rounded-full mb-4 border border-sky-400/30">
            <Snowflake className="w-3 h-3" />
            {pkg.tag}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] mb-3 tracking-tight max-w-3xl">
            {pkg.title}
          </h1>
          <p className="text-white/55 text-sm md:text-base font-light max-w-xl leading-relaxed">
            {pkg.subtitle}
          </p>
        </div>

        {/* ══════════ BOTTOM — Stats + Horizontal Carousel ══════════ */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 mt-auto pb-7">
          {/* Stat pills */}
          <div className="flex flex-wrap gap-2.5 mb-5">
            {[
              { icon: Clock, text: pkg.duration },
              { icon: MapPin, text: "Jammu & Kashmir, India" },
              { icon: Users, text: pkg.groupSize },
              { icon: Star, text: `${pkg.rating} · ${pkg.reviews}` },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/85 text-xs font-medium"
              >
                <Icon className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>

          {/* ── Horizontal thumbnail carousel ── */}
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            {/* Row: prev arrow + thumbnails + next arrow */}
            <div className="flex items-center gap-2 w-full">
              {/* Prev arrow */}
              <button
                onClick={() =>
                  goTo((active - 1 + images.length) % images.length)
                }
                className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/25 hover:text-white transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* ── MOBILE: overlapping stacked thumbnails ── */}
              <div className="flex md:hidden flex-1 items-center">
                <div className="relative w-full" style={{ height: "52px" }}>
                  {images.map((img, i) => {
                    const isActive = i === active;
                    // spread thumbnails evenly across full width
                    const totalWidth = 100;
                    const step = totalWidth / images.length;
                    return (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`absolute overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                          isActive
                            ? "border-sky-400 shadow-lg shadow-sky-500/40"
                            : "border-white/25 opacity-55 hover:opacity-80"
                        }`}
                        style={{
                          left: `${i * step}%`,
                          width: isActive ? "60px" : "50px",
                          height: isActive ? "52px" : "44px",
                          top: isActive ? "0px" : "4px",
                          zIndex: isActive ? 20 : i + 1,
                        }}
                      >
                        <Image
                          src={img.src}
                          alt={img.label}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-sky-400/20 rounded-lg" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── DESKTOP: equal-width thumbnails filling the full row ── */}
              <div className="hidden md:flex flex-1 items-center gap-2.5">
                {images.map((img, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`relative overflow-hidden rounded-xl border-2 flex-shrink-0 flex-1 transition-all duration-300 ${
                        isActive
                          ? "h-[4.5rem] border-sky-400 shadow-lg shadow-sky-500/40 scale-y-105"
                          : "h-14 border-white/20 opacity-55 hover:opacity-90"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {isActive && (
                        <>
                          <div className="absolute inset-0 bg-sky-400/15" />
                          <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] text-center py-0.5 font-medium truncate px-1">
                            {img.label}
                          </span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next arrow */}
              <button
                onClick={() => goTo((active + 1) % images.length)}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/25 hover:text-white transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dot indicators — centered below carousel */}
            <div className="flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-5 h-1.5 bg-sky-400"
                      : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MARQUEE STRIP ══════════ */}
      <div className="relative bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-500 overflow-hidden py-3">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-sky-600 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-sky-500 to-transparent z-10 pointer-events-none" />

        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 24s linear infinite" }}
        >
          {[...marqueeItems, ...marqueeItems].map(({ icon: Icon, text }, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-10 text-white text-sm font-semibold tracking-wide"
            >
              <Icon className="w-3.5 h-3.5 text-white/80 flex-shrink-0" />
              {text}
              <span className="ml-8 text-white/35 text-xs">✦</span>
            </span>
          ))}
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
