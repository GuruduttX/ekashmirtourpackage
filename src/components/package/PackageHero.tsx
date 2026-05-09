"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import {
  Clock,
  MapPin,
  Users,
  Star,
  Tag,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */

const heroImage = {
  src: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1600&auto=format&fit=crop&q=80",
  alt: "Dal Lake Kashmir",
};

const cards = [
  {
    title: "Dal Lake",
    subtitle: "Iconic shikaras at dawn",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&auto=format&fit=crop&q=60",
  },
  {
    title: "Gulmarg Slopes",
    subtitle: "World-class ski terrain",
    image:
      "https://images.unsplash.com/photo-1593417376544-4c4201061e22?w=900&auto=format&fit=crop&q=60",
  },
  {
    title: "Pahalgam Valley",
    subtitle: "Emerald highland meadows",
    image:
      "https://images.unsplash.com/photo-1561287437-c69a30664793?w=900&auto=format&fit=crop&q=60",
  },
  {
    title: "Shikara Sunrise",
    subtitle: "Golden-hour lake magic",
    image:
      "https://images.unsplash.com/photo-1677123419103-785c917c4a58?w=900&auto=format&fit=crop&q=60",
  },
];

const stats = [
  { icon: Clock, text: "7 Days / 6 Nights" },
  { icon: MapPin, text: "Jammu & Kashmir" },
  { icon: Users, text: "2 – 12 People" },
  { icon: Star, text: "4.9 · 340+ Reviews" },
];

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

const INTERVAL = 3500;

/* ─── Component ─────────────────────────────────────────── */

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
      goTo((active + 1) % cards.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [active, goTo]);

  return (
    <div className="flex flex-col">
      {/* ══ HERO SECTION ══════════════════════════════════════ */}
      <section className="w-full bg-white px-4 pt-24 pb-6 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          {/* ── LEFT — Hero Card ────────────────────────────── */}
          <div className="relative group h-[360px] overflow-hidden rounded-3xl sm:h-[440px] lg:h-[520px]">
            {/* Crossfading background images */}
            {cards.map((card, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  opacity: i === active ? 1 : i === prev && fading ? 0 : 0,
                  zIndex: i === active ? 1 : i === prev ? 2 : 0,
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  priority={i === 0}
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}

            {/* Depth shadow */}
            <div className="absolute inset-0 z-10 shadow-[inset_0_-140px_180px_rgba(0,0,0,0.72)]" />

            {/* Glow border */}
            <div className="absolute inset-0 z-10 rounded-3xl ring-1 ring-white/10 group-hover:ring-cyan-300/40 transition duration-500" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-5 text-white sm:p-7 lg:p-8">
              {/* Badge */}
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300 sm:mb-3 sm:text-xs sm:tracking-[0.2em]">
                Experience My India Exclusive
              </p>
              {/* Offer pill */}
              <div className="inline-block rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 backdrop-blur-md sm:px-5 sm:py-3">
                <p className="text-xs font-medium sm:text-sm">
                  Save ₹15,000 · Free Upgrade · 25% Early Bird
                </p>
              </div>

              <div className="inline-block absolute -top-91 left-5 rounded-full border border-white/10 bg-white/10 px-2 py-2 backdrop-blur-md sm:px-2 sm:py-2">
                <p className="text-xs font-medium sm:text-sm">
                  Best Seller
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT — 2×2 Grid ────────────────────────────── */}
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => goTo(index)}
                className="relative group h-[112px] min-w-[148px] snap-start cursor-pointer overflow-hidden rounded-2xl shadow-md shadow-black/10 sm:h-[132px] sm:min-w-[178px] md:h-[217px] md:min-w-0 lg:h-[250px]"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  unoptimized
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Hover cyan glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-cyan-400/10 transition duration-500" />

                {/* Active indicator */}
                {index === active && (
                  <div className="absolute inset-0 ring-2 ring-inset ring-cyan-400/70 rounded-2xl" />
                )}

                {/* Border glow */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-cyan-300/40 transition duration-500" />

                {/* Content */}
                <div className="absolute bottom-3 left-3 right-3 text-white sm:bottom-4 sm:left-4 sm:right-4">
                  <h3 className="text-sm font-semibold leading-tight transition duration-300 group-hover:translate-y-0 md:translate-y-2 md:text-lg">
                    {card.title}
                  </h3>
                  <p className="hidden md:block text-[11px] text-white/60 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-7xl sm:mt-8">
          <h2 className="max-w-4xl text-3xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-4xl">
            Kashmir — Heaven on Earth 5 Day Tour
          </h2>
          <div className="-mx-4 mt-5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex min-w-max flex-nowrap gap-3 pb-2 sm:pb-0">
              {stats.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex shrink-0 items-center gap-2 rounded-full  px-4 py-2.5 text-sm font-medium text-slate-700"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sky-600 shadow-sm">
                    <Icon className="h-4 w-4 shrink-0" />
                  </span>
                  <span className="whitespace-nowrap">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
