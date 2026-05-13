"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Clock, MapPin, Star, Tag, Sparkles } from "lucide-react";

interface PackageHeroProps {
  title: string;
  duration: string;
  rating?: number;
  reviews?: number;
  destination?: string;
  heroImage: { image: string; alt: string };
  childImages: Array<{ id?: string; image: string; alt: string }>;
}

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

export default function PackageHero({
  title,
  duration,
  rating = 4.9,
  reviews = 0,
  destination = "Jammu & Kashmir",
  heroImage,
  childImages,
}: PackageHeroProps) {
  // Build gallery from heroImage + up to 3 childImages
  const allImages = [heroImage, ...childImages.slice(0, 3)].filter(
    (img) => img?.image
  );

  const cards = allImages.map((img) => ({
    title: img.alt || "Kashmir View",
    subtitle: "Explore Kashmir",
    image: img.image,
  }));

  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === active || cards.length <= 1) return;
      setPrev(active);
      setFading(true);
      setTimeout(() => {
        setActive(idx);
        setPrev(null);
        setFading(false);
      }, 700);
    },
    [active, cards.length]
  );

  useEffect(() => {
    if (cards.length <= 1) return;
    const timer = setInterval(() => {
      goTo((active + 1) % cards.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [active, goTo, cards.length]);

  const stats = [
    { icon: Clock, text: duration || "Custom Duration" },
    { icon: MapPin, text: destination },
    { icon: Star, text: `${rating} · ${reviews > 0 ? `${reviews}+` : "New"} Reviews` },
  ];

  const fallbackSrc =
    "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1600&auto=format&fit=crop&q=80";

  return (
    <div className="flex flex-col">
      <section className="w-full bg-white px-4 pt-24 pb-6 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          {/* LEFT — Hero Card (crossfading) */}
          <div className="relative group h-[360px] overflow-hidden rounded-3xl sm:h-[440px] lg:h-[520px]">
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
                  src={card.image || fallbackSrc}
                  alt={card.title}
                  fill
                  priority={i === 0}
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}

            {/* depth shadow */}
            <div className="absolute inset-0 z-10 shadow-[inset_0_-140px_180px_rgba(0,0,0,0.72)]" />
            <div className="absolute inset-0 z-10 rounded-3xl ring-1 ring-white/10 group-hover:ring-cyan-300/40 transition duration-500" />

            <div className="absolute inset-x-0 bottom-0 z-20 p-5 text-white sm:p-7 lg:p-8">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300 sm:mb-3 sm:text-xs sm:tracking-[0.2em]">
                eKashmir Tours Exclusive
              </p>
              <div className="inline-block rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 backdrop-blur-md sm:px-5 sm:py-3">
                <p className="text-xs font-medium sm:text-sm">
                  Premium Kashmir Experience
                </p>
              </div>
              <div className="inline-block absolute -top-91 left-5 rounded-full border border-white/10 bg-white/10 px-2 py-2 backdrop-blur-md">
                <p className="text-xs font-medium sm:text-sm">Best Seller</p>
              </div>
            </div>
          </div>

          {/* RIGHT — 2×2 Grid */}
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => goTo(index)}
                className="relative group h-[112px] min-w-[148px] snap-start cursor-pointer overflow-hidden rounded-2xl shadow-md shadow-black/10 sm:h-[132px] sm:min-w-[178px] md:h-[217px] md:min-w-0 lg:h-[250px]"
              >
                <Image
                  src={card.image || fallbackSrc}
                  alt={card.title}
                  fill
                  unoptimized
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-cyan-400/10 transition duration-500" />
                {index === active && (
                  <div className="absolute inset-0 ring-2 ring-inset ring-cyan-400/70 rounded-2xl" />
                )}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-cyan-300/40 transition duration-500" />
                <div className="absolute bottom-3 left-3 right-3 text-white sm:bottom-4 sm:left-4 sm:right-4">
                  <h3 className="text-sm font-semibold leading-tight transition duration-300 group-hover:translate-y-0 md:translate-y-2 md:text-lg">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Title + Stats */}
        <div className="mx-auto mt-6 max-w-7xl sm:mt-8">
          <h2 className="max-w-4xl text-3xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-4xl">
            {title}
          </h2>
          <div className="-mx-4 mt-5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex min-w-max flex-nowrap gap-3 pb-2 sm:pb-0">
              {stats.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-slate-700"
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
