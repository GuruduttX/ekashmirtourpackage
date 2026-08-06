"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroSlideInContainer, heroSlideInLeft } from "@/components/temples/hero/heroMotion";

export interface HeroPreviewCard {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const PREVIEW_CARDS: HeroPreviewCard[] = [
  {
    title: "Jamia Masjid",
    subtitle: "20 min darshan",
    image:
      "https://images.unsplash.com/photo-1600100397608-f70cb51290b7?w=400&auto=format&fit=crop&q=70",
    href: "/temples",
  },
  {
    title: "Amarnath Cave",
    subtitle: "20 min darshan",
    image:
      "https://images.unsplash.com/photo-1600100397237-46c3f1a9e5a7?w=400&auto=format&fit=crop&q=70",
    href: "/temples",
  },
  {
    title: "Hazratbal Shrine",
    subtitle: "20 min darshan",
    image:
      "https://images.unsplash.com/photo-1580100133245-cbea28347e73?w=400&auto=format&fit=crop&q=70",
    href: "/temples",
  },
];

function PreviewCard({ card, onBookNow }: { card: HeroPreviewCard; onBookNow: () => void }) {
  return (
    <motion.div
      variants={heroSlideInLeft}
      className="w-30 shrink-0 overflow-hidden rounded-2xl border border-sky-400/40 bg-white/10 backdrop-blur-md sm:w-36"
    >
      <div className="relative h-16 w-full sm:h-20">
        <Image src={card.image} alt={card.title} fill unoptimized className="object-cover" />
      </div>
      <div className="p-2.5">
        <p className="truncate text-xs font-bold text-white sm:text-sm">{card.title}</p>
        <p className="mt-0.5 text-[10px] text-slate-300 sm:text-xs">{card.subtitle}</p>
        <button
          type="button"
          onClick={onBookNow}
          className="mt-2 flex w-full items-center justify-center gap-1 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 py-1.5 text-[11px] font-semibold text-white transition-transform hover:-translate-y-0.5 sm:text-xs"
        >
          Book Now <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}

export default function HeroPreviewCards({ onBookNow }: { onBookNow: () => void }) {
  return (
    <motion.div
      variants={heroSlideInContainer}
      custom={{ staggerChildren: 0.1, delayChildren: 0.4 }}
      initial="hidden"
      animate="visible"
      className="mt-8 hidden flex-wrap justify-center gap-3 lg:flex lg:justify-start"
    >
      {PREVIEW_CARDS.map((card) => (
        <PreviewCard key={card.title} card={card} onBookNow={onBookNow} />
      ))}
    </motion.div>
  );
}
