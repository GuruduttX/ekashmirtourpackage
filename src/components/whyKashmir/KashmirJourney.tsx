"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Mountain,
  Trees,
  Waves,
  Heart,
  Camera,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// --- Types & Extended Data ---

interface Destination {
  id: string;
  title: string;
  image: string;
  description: string;
  tag: string;
  Icon: React.ElementType;
  // New Editorial Fields
  editorialHeading: string;
  immersiveDescription: string;
  experienceTags: string[];
  travelInfo: {
    bestTime: string;
    idealFor: string;
    signature: string;
  };
}

const destinations: Destination[] = [
  {
    id: "srinagar",
    title: "Srinagar",
    image:
      "https://media.gettyimages.com/id/172599256/photo/trees-in-a-garden-shalimar-bagh-srinagar-jammu-and-kashmir-india.jpg?s=612x612&w=0&k=20&c=8FThWOQILunJLOIzoxUQvAk0J7NeaTeFGOi5OHbAw0M=",
    description:
      "The crown jewel of Kashmir, famous for historic gardens, rich heritage, and serene shikara rides at dusk.",
    tag: "Cultural Heart",
    Icon: Camera,
    editorialHeading: "Where Kashmir Begins",
    immersiveDescription:
      "Wake up to floating markets, misty lakes, and reflections of snow-covered peaks painted across tranquil waters. A city that breathes poetry through its grand Mughal gardens and ancient wooden shrines.",
    experienceTags: ["Houseboats", "Shikara Ride", "Mughal Gardens"],
    travelInfo: {
      bestTime: "April - October",
      idealFor: "Couples & Families",
      signature: "Floating Market",
    },
  },
  {
    id: "gulmarg",
    title: "Gulmarg",
    image:
      "https://images.unsplash.com/photo-1615478649193-db68b2836697?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A pristine winter wonderland offering the world's highest gondola ride and world-class skiing slopes.",
    tag: "Adventure Paradise",
    Icon: Mountain,
    editorialHeading: "The Winter Wonderland",
    immersiveDescription:
      "Step into a pristine alpine paradise. Whether carving through fresh powder on world-class slopes or floating above the clouds in the legendary gondola, Gulmarg is an experience of pure exhilaration.",
    experienceTags: ["Gondola Ride", "Skiing", "Pine Forests"],
    travelInfo: {
      bestTime: "Dec - March",
      idealFor: "Adventure Seekers",
      signature: "Phase 2 Gondola",
    },
  },
  {
    id: "pahalgam",
    title: "Pahalgam",
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1600&auto=format&fit=crop",
    description:
      "The valley of shepherds, characterized by lush meadows, pine forests, and the sparkling Lidder River.",
    tag: "Nature Escape",
    Icon: Trees,
    editorialHeading: "The Valley of Shepherds",
    immersiveDescription:
      "Lose yourself in the melodic rush of the Lidder River. Wrapped in fragrant, endless pine forests and lush rolling meadows, Pahalgam is where time simply stands still.",
    experienceTags: ["Aru Valley", "River Rafting", "Lidder River"],
    travelInfo: {
      bestTime: "March - November",
      idealFor: "Nature Lovers",
      signature: "Betaab Valley Trek",
    },
  },
  {
    id: "dal-lake",
    title: "Dal Lake",
    image:
      "https://images.unsplash.com/photo-1600845747913-e33543f94892?q=80&w=2144&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Experience the unique floating markets and luxurious stays in beautifully carved wooden houseboats.",
    tag: "Romantic Retreat",
    Icon: Waves,
    editorialHeading: "A Floating Universe",
    immersiveDescription:
      "Experience life entirely on the water. Glide past blooming lotus gardens at golden hour, bargain with floating flower vendors, and sleep in intricately carved cedar houseboats.",
    experienceTags: ["Luxury Houseboats", "Lotus Gardens", "Golden Hour"],
    travelInfo: {
      bestTime: "Year-round",
      idealFor: "Romantic Retreats",
      signature: "Sunrise Shikara",
    },
  },
  {
    id: "sonmarg",
    title: "Sonmarg",
    image:
      "https://images.unsplash.com/photo-1666698596924-7b89c514441d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "The meadow of gold, wrapped by magnificent glaciers and alpine flowers, acting as the gateway to Ladakh.",
    tag: "High Altitude",
    Icon: MapPin,
    editorialHeading: "The Meadow of Gold",
    immersiveDescription:
      "Surrounded by majestic glaciers and rare alpine flowers, Sonmarg is the thrilling gateway to Ladakh. The golden hour here turns the towering rocky peaks into glittering, breathtaking monuments.",
    experienceTags: ["Thajiwas Glacier", "Alpine Treks", "High Altitude"],
    travelInfo: {
      bestTime: "May - October",
      idealFor: "Explorers",
      signature: "Glacier Trekking",
    },
  },
  {
    id: "betaab",
    title: "Betaab Valley",
    image:
      "https://plus.unsplash.com/premium_photo-1663946069854-24f3d7cf6b8a?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A breathtaking cinematic valley surrounded by snow-clad mountains and dense greenery, perfect for relaxing.",
    tag: "Perfect for Honeymoon",
    Icon: Heart,
    editorialHeading: "Cinematic Perfection",
    immersiveDescription:
      "Named after a Bollywood classic, this valley offers surreal landscapes. Crystal clear turquoise streams cut through incredibly green meadows under the watchful gaze of snow-capped mountains.",
    experienceTags: ["Cinematic Views", "River Streams", "Photography"],
    travelInfo: {
      bestTime: "April - September",
      idealFor: "Honeymooners",
      signature: "Riverside Picnic",
    },
  },
];

export default function KashmirJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section className="relative w-full overflow-hidden bg-sky-50 py-24 lg:py-10">
      {/* Background Atmosphere */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-cyan-300/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-sky-400/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto mb-20 lg:mb-32"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-200/60 bg-white/50 backdrop-blur-md text-sky-600 uppercase tracking-[0.2em] text-xs font-bold shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            Explore the Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 leading-tight">
            Journey{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
              Through Kashmir
            </span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Follow the winding roads through emerald valleys, silent mountains,
            and mirror-like lakes. Every stop is a memory waiting to unfold.
          </p>
        </motion.div>

        {/* --- DESKTOP TIMELINE (Editorial Zig-Zag) --- */}
        <div
          className="hidden md:block relative max-w-6xl mx-auto"
          ref={containerRef}
        >
          {/* Animated Curving SVG Path */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-48 pointer-events-none z-0">
            <svg
              className="w-full h-full drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 50 0 C 90 15, 90 25, 50 33.3 C 10 41.6, 10 58.3, 50 66.6 C 90 75, 90 90, 50 100"
                fill="none"
                stroke="rgba(56, 189, 248, 0.1)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d="M 50 0 C 90 15, 90 25, 50 33.3 C 10 41.6, 10 58.3, 50 66.6 C 90 75, 90 90, 50 100"
                fill="none"
                stroke="url(#gradientStroke)"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength, opacity }}
              />
              <defs>
                <linearGradient
                  id="gradientStroke"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Timeline Nodes & Editorial Panels */}
          <div className="relative z-10 flex flex-col space-y-32 py-10">
            {destinations.map((dest, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={dest.id}
                  className="group/row relative flex items-center justify-between w-full"
                >
                  {/* Central Node Indicator */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
                  >
                    <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20 group-hover/row:scale-125 group-hover/row:bg-sky-400 transition-all duration-300" />
                    <div className="absolute w-10 h-10 border border-cyan-300/40 rounded-full animate-ping opacity-20" />
                  </motion.div>

                  {/* Left Side (Card or Panel) */}
                  <motion.div
                    initial={{ opacity: 0, x: -50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.8,
                      delay: isEven ? 0 : 0.2,
                      ease: "easeOut",
                    }}
                    className="w-[42%]"
                  >
                    {isEven ? (
                      <DestinationCard destination={dest} />
                    ) : (
                      <DestinationStoryPanel destination={dest} index={index} />
                    )}
                  </motion.div>

                  {/* Right Side (Panel or Card) */}
                  <motion.div
                    initial={{ opacity: 0, x: 50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.8,
                      delay: isEven ? 0.2 : 0,
                      ease: "easeOut",
                    }}
                    className="w-[42%]"
                  >
                    {isEven ? (
                      <DestinationStoryPanel destination={dest} index={index} />
                    ) : (
                      <DestinationCard destination={dest} />
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- MOBILE CAROUSEL (Unchanged) --- */}
        <div className="md:hidden relative w-[100vw] -ml-6 pb-12">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-sky-400/10 via-cyan-400/40 to-sky-400/10 z-0" />
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 scrollbar-hide relative z-10">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="min-w-[85vw] sm:min-w-[60vw] snap-center"
              >
                <DestinationCard destination={dest} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Reusable Sub-components ---

function DestinationCard({ destination }: { destination: Destination }) {
  // Uses group/card for mobile (where group/row doesn't exist),
  // and syncs perfectly with group/row on desktop for cross-triggering.
  return (
    <div className="group/card relative w-full h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl group-hover/row:shadow-2xl hover:shadow-sky-500/20 group-hover/row:shadow-sky-500/20 transition-all duration-500">
      <img
        src={destination.image}
        alt={destination.title}
        className="absolute inset-0 w-full h-full object-cover transform group-hover/card:scale-105 group-hover/row:scale-105 transition-transform duration-700 ease-out"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/30 to-slate-900/90 transition-opacity duration-500" />
      <div className="absolute inset-0 border-2 border-white/0 group-hover/card:border-white/10 group-hover/row:border-white/10 rounded-3xl transition-colors duration-500" />

      <div className="absolute top-5 left-5">
        <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full text-white text-[11px] uppercase tracking-wider font-semibold shadow-xl">
          <destination.Icon className="w-3.5 h-3.5 text-cyan-200" />
          {destination.tag}
        </span>
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
        <div className="transform translate-y-2 group-hover/card:translate-y-0 group-hover/row:translate-y-0 transition-transform duration-500">
          <h3 className="text-3xl font-semibold text-white mb-2 tracking-tight drop-shadow-md">
            {destination.title}
          </h3>
          <p className="text-slate-200 text-sm leading-relaxed line-clamp-2 md:line-clamp-none opacity-90 group-hover/card:opacity-100 group-hover/row:opacity-100 transition-opacity duration-500">
            {destination.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function DestinationStoryPanel({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  const indexString = (index + 1).toString().padStart(2, "0");

  return (
    <div className="flex flex-col justify-center h-full px-4 lg:px-8 py-6 transition-all duration-500 border border-transparent rounded-3xl group-hover/row:border-sky-200/40 group-hover/row:bg-white/40 group-hover/row:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      {/* Index Label */}
      <span className="text-sky-500 font-bold tracking-[0.2em] text-sm uppercase mb-3 drop-shadow-sm flex items-center gap-2">
        {indexString} <span className="w-6 h-[1px] bg-sky-300"></span>{" "}
        {destination.title}
      </span>

      {/* Editorial Heading */}
      <h3 className="text-3xl lg:text-4xl font-light text-slate-800 mb-5 leading-tight">
        {destination.editorialHeading}
      </h3>

      {/* Immersive Description */}
      <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-8">
        {destination.immersiveDescription}
      </p>

      {/* Experience Tags */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {destination.experienceTags.map((tag) => (
          <span
            key={tag}
            className="px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/60 text-slate-700 text-sm shadow-sm group-hover/row:border-sky-300/40 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-4 border-t border-slate-200/60 pt-6 mb-8">
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            Best Time
          </span>
          <span className="text-sm text-slate-800 font-medium">
            {destination.travelInfo.bestTime}
          </span>
        </div>
        <div className="flex flex-col space-y-1 border-l border-slate-200/60 pl-4">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            Ideal For
          </span>
          <span className="text-sm text-slate-800 font-medium">
            {destination.travelInfo.idealFor}
          </span>
        </div>
        <div className="flex flex-col space-y-1 border-l border-slate-200/60 pl-4">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            Signature
          </span>
          <span className="text-sm text-slate-800 font-medium">
            {destination.travelInfo.signature}
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex items-center text-sky-600 font-semibold cursor-pointer w-fit group/cta">
        <span className="group-hover/row:text-sky-500 transition-colors">
          Explore {destination.title}
        </span>
        <ArrowRight className="w-4 h-4 ml-2 transform group-hover/row:translate-x-1.5 transition-transform duration-300" />
      </div>
    </div>
  );
}
