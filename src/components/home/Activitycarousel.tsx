"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Clock,
  MapPin,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Waves,
  Mountain,
  Camera,
  Utensils,
  Tent,
  Wind,
} from "lucide-react";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface Activity {
  id: number;
  title: string;
  description: string;
  duration: string;
  location: string;
  rating: number;
  tag: string;
  tagIcon: React.ReactNode;
  image: string;
  href?: string;
}

/* ─────────────────────────────────────────
   Dummy Data
───────────────────────────────────────── */
const activities: Activity[] = [
  {
    id: 1,
    title: "Shikara Ride",
    description: "Glide across the mirror-still waters of Dal Lake at sunrise.",
    duration: "2–3 Hours",
    location: "Dal Lake",
    rating: 4.9,
    tag: "Relaxation",
    tagIcon: <Waves className="w-3 h-3" />,
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Gondola Ride",
    description: "Asia's highest cable car with sweeping Himalayan panoramas.",
    duration: "1–2 Hours",
    location: "Gulmarg",
    rating: 4.8,
    tag: "Adventure",
    tagIcon: <Mountain className="w-3 h-3" />,
    image:
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Snow Skiing",
    description: "World-class slopes across Gulmarg's legendary powder snow.",
    duration: "Half Day",
    location: "Gulmarg",
    rating: 4.7,
    tag: "Adventure",
    tagIcon: <Wind className="w-3 h-3" />,
    image:
      "https://images.unsplash.com/photo-1561287437-c69a30664793?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Houseboat Stay",
    description:
      "Spend a night aboard a heritage carved houseboat on Dal Lake.",
    duration: "Overnight",
    location: "Dal Lake",
    rating: 4.9,
    tag: "Cultural",
    tagIcon: <Tent className="w-3 h-3" />,
    image:
      "https://images.unsplash.com/photo-1677123419103-785c917c4a58?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Valley Trekking",
    description: "Trek through pine forests and alpine meadows in Pahalgam.",
    duration: "Full Day",
    location: "Pahalgam",
    rating: 4.8,
    tag: "Adventure",
    tagIcon: <Mountain className="w-3 h-3" />,
    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Photography Tour",
    description: "Golden-hour shoots across Kashmir's most iconic landscapes.",
    duration: "3–4 Hours",
    location: "Srinagar",
    rating: 4.9,
    tag: "Cultural",
    tagIcon: <Camera className="w-3 h-3" />,
    image:
      "https://images.unsplash.com/photo-1593417376544-4c4201061e22?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    title: "Wazwan Dining",
    description:
      "A royal multi-course Kashmiri feast in a traditional setting.",
    duration: "2 Hours",
    location: "Srinagar",
    rating: 4.8,
    tag: "Culinary",
    tagIcon: <Utensils className="w-3 h-3" />,
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=80",
  },
];

/* ─────────────────────────────────────────
   Tag color map
───────────────────────────────────────── */
const tagColors: Record<string, string> = {
  Adventure: "bg-sky-500/80",
  Relaxation: "bg-cyan-500/80",
  Cultural: "bg-blue-500/80",
  Culinary: "bg-teal-500/80",
};

/* ─────────────────────────────────────────
   Framer Motion Variants
───────────────────────────────────────── */
const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

/* ─────────────────────────────────────────
   ActivityCard
───────────────────────────────────────── */
function ActivityCard({
  activity,
  index,
}: {
  activity: Activity;
  index: number;
}) {
  const tagBg = tagColors[activity.tag] ?? "bg-sky-500/80";

  return (
    <motion.div
      custom={index * 0.07}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group relative flex-shrink-0 w-[260px] sm:w-[290px] lg:w-[300px] h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-lg shadow-sky-900/10"
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          unoptimized
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

      {/* ── Subtle cyan glow on hover ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* ── Tag pill — top left ── */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className={`inline-flex items-center gap-1.5 ${tagBg} backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full border border-white/20`}
        >
          {activity.tagIcon}
          {activity.tag}
        </span>
      </div>

      {/* ── Rating pill — top right ── */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-full border border-white/20">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          {activity.rating}
        </span>
      </div>

      {/* ── Bottom content ── */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        {/* Info row */}
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center gap-1 text-white/60 text-[11px]">
            <Clock className="w-3 h-3 text-sky-300 flex-shrink-0" />
            {activity.duration}
          </span>
          <span className="w-px h-3 bg-white/20" />
          <span className="inline-flex items-center gap-1 text-white/60 text-[11px]">
            <MapPin className="w-3 h-3 text-sky-300 flex-shrink-0" />
            {activity.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-bold leading-tight mb-1.5 tracking-tight">
          {activity.title}
        </h3>

        {/* Description */}
        <p className="text-white/55 text-xs leading-relaxed mb-4 line-clamp-1">
          {activity.description}
        </p>

        {/* CTA */}
        <motion.button
          whileHover={{
            y: -2,
            boxShadow: "0 8px 24px -4px rgba(14,165,233,0.5)",
          }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 bg-white/15 hover:bg-sky-500 backdrop-blur-md border border-white/25 hover:border-sky-400 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-300"
        >
          Explore
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function ActivityCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 40%, #f0fdff 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(14,165,233,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 90% 20%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 90% 20%, black 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ══ SECTION HEADER ══════════════════════════ */}
        <div className="px-6 lg:px-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 lg:mb-12">
          {/* Left — Heading */}
          <div>
            <motion.p
              custom={0}
              variants={headerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-sky-500 mb-3 flex items-center justify-center md:justify-start gap-2"
            >
              <span className="w-5 h-px bg-sky-400 " />
              Experiences
            </motion.p>

            <motion.h2
              custom={0.1}
              variants={headerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-3xl text-center md:text-start sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 60%, #0284c7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Things to Do
              </span>
              <br />
              <span className="text-gray-900">in Kashmir</span>
            </motion.h2>
          </div>

          {/* Right — Description + Arrow buttons */}
          <motion.div
            custom={0.2}
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-4 sm:items-end"
          >
            <p className="text-gray-500 text-sm text-center md:text-start leading-relaxed max-w-xs sm:text-right font-light">
              From serene lakes to thrilling adventures, discover unforgettable
              experiences across Kashmir.
            </p>

            {/* Desktop arrow controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full bg-white border border-sky-100 shadow-sm flex items-center justify-center text-sky-500 hover:bg-sky-50 hover:border-sky-300 transition-all duration-200 hover:-translate-y-0.5"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full bg-sky-500 border border-sky-500 shadow-md shadow-sky-200 flex items-center justify-center text-white hover:bg-sky-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ══ CAROUSEL ════════════════════════════════ */}
        <div className="relative">
          {/* Left edge fade — desktop */}
          <div
            className="hidden lg:block pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-20"
            style={{
              background: "linear-gradient(to right, #e0f2fe, transparent)",
            }}
          />
          {/* Right edge fade — desktop */}
          <div
            className="hidden lg:block pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-20"
            style={{
              background: "linear-gradient(to left, #f0fdff, transparent)",
            }}
          />

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 lg:px-12 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {activities.map((activity, index) => (
              <div key={activity.id} className="snap-start">
                <ActivityCard activity={activity} index={index} />
              </div>
            ))}

            {/* Ghost trailing space */}
            <div className="flex-shrink-0 w-2 lg:w-4" />
          </div>
        </div>

        {/* ══ MOBILE ARROW ROW ════════════════════════ */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-6 px-6">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full bg-white border border-sky-100 shadow-sm flex items-center justify-center text-sky-500 hover:bg-sky-50 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scroll hint dots */}
          <div className="flex gap-1.5">
            {activities.slice(0, 5).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === 0 ? "w-5 bg-sky-500" : "w-1.5 bg-sky-200"
                }`}
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

      {/* Scrollbar hide style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
