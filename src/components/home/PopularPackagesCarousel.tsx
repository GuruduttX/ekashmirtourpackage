"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ImageIcon,
  Heart,
  Star,
  CloudSun,
  ArrowRight,
  IndianRupee,
} from "lucide-react";

const ICON_GRADIENT_ID = "package-icon-gradient";

interface TourPackage {
  id: string;
  title: string;
  description: string;
  days: string;
  rating: number;
  price: string;
  image: string;
}

const PACKAGES: TourPackage[] = [
  {
    id: "1",
    title: "Shikara Ride",
    description: "Asia's highest cable car with sweeping",
    days: "2 days",
    rating: 4.9,
    price: "5000",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Gulmarg",
    description: "Asia's highest cable car with sweeping",
    days: "3 days",
    rating: 4.8,
    price: "8500",
    image:
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Kashmir Boat",
    description: "Asia's highest cable car with sweeping",
    days: "1 day",
    rating: 4.7,
    price: "3000",
    image:
      "https://images.unsplash.com/photo-1677123419103-785c917c4a58?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Pahalgam",
    description: "Asia's highest cable car with sweeping",
    days: "2 days",
    rating: 4.9,
    price: "5000",
    image:
      "https://images.unsplash.com/photo-1561287437-c69a30664793?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Sonamarg",
    description: "Meadow of gold beneath the glaciers",
    days: "2 days",
    rating: 4.8,
    price: "6500",
    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Betaab Valley",
    description: "Nature's own green canvas",
    days: "1 day",
    rating: 4.6,
    price: "2500",
    image:
      "https://images.unsplash.com/photo-1593417376544-4c4201061e22?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "7",
    title: "Dal Lake Houseboat",
    description: "Wake up to mist over the water",
    days: "3 days",
    rating: 4.9,
    price: "9000",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "8",
    title: "Aru Valley",
    description: "Pine forests and quiet meadows",
    days: "1 day",
    rating: 4.7,
    price: "2800",
    image:
      "https://images.unsplash.com/photo-1666698591954-440987ef6ba6?q=80&w=1200&auto=format&fit=crop",
  },
];

function PackageCard({ pkg }: { pkg: TourPackage }) {
  const [hovered, setHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <motion.div
      onMouseEnter={() => isDesktop && setHovered(true)}
      onMouseLeave={() => isDesktop && setHovered(false)}
      onClick={() => !isDesktop && setHovered((v) => !v)}
      className="relative h-96 w-79 shrink-0 snap-center overflow-hidden rounded-3xl shadow-lg sm:w-80"
    >
      <motion.img
        src={pkg.image}
        alt={pkg.title}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Top-right action icons */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute right-4 top-4 flex gap-2"
      >
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
          <ImageIcon
            className="h-4 w-4"
            fill={`url(#${ICON_GRADIENT_ID})`}
            stroke={`url(#${ICON_GRADIENT_ID})`}
          />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
          <Heart
            className="h-4 w-4"
            fill={`url(#${ICON_GRADIENT_ID})`}
            stroke={`url(#${ICON_GRADIENT_ID})`}
          />
        </button>
      </motion.div>

      {/* Glass info panel */}
      <motion.div
        animate={{ height: hovered ? 184 : 92 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-3 bottom-3 overflow-hidden rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-md"
      >
        <h3 className="font-heading text-lg font-bold leading-none text-white">
          {pkg.title}
        </h3>
        <p className="mt-2 text-sm text-white/80">{pkg.description}</p>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: hovered ? 0.15 : 0 }}
          className="mt-3"
        >
          <div className="flex items-center gap-4 text-xs font-medium text-white/90">
            <span className="flex items-center gap-1">
              <CloudSun className="h-3.5 w-3.5 fill-white text-white" />
              {pkg.days}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-white text-white" />
              {pkg.rating}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center text-white">
              <IndianRupee className="h-3.5 w-3.5" />
              <span className="text-base font-bold">{pkg.price}</span>
              <span className="ml-1 text-xs text-white/70">/ Person</span>
            </div>

            <motion.button
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-2 text-xs font-semibold text-white shadow-md"
            >
              <motion.span
                variants={{ rest: { x: 0 }, hover: { x: -2 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                Book Now
              </motion.span>
              <motion.span
                variants={{ rest: { x: 0, rotate: 0 }, hover: { x: 3, rotate: -40 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function PopularPackagesCarousel() {
  return (
    <section className="relative overflow-hidden bg-white py-10">
      <div className="mx-auto max-w-7xl px-3 lg:px-4">
        <div className="relative mb-8">
          <img
            src="/LittleMountainRight.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 w-25 -translate-y-[55%] md:-translate-y-[80%] select-none sm:w-30 lg:w-50 hidden"
          />
          <img
            src="/LittleMountainRight.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 w-25 -translate-y-[55%] md:-translate-y-[80%] select-none sm:w-30 lg:w-50 hidden"
          />

          <h2 className="whitespace-nowrap text-center font-heading text-2xl font-bold bg-linear-to-r from-sky-600 to-cyan-300 bg-clip-text text-transparent sm:text-2xl lg:text-4xl">
            Kashmir Popular Packages
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>

      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={ICON_GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
