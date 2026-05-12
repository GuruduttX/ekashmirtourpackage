"use client";

import EnquiryPopupForm from "@/utils/EnquiryPopupForm";
import {
  motion,
  Variants,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { Sparkles, Search, Compass } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface HeroStat {
  value: number;
  suffix?: string;
  label: string;
}

interface ServiceCategory {
  label: string;
  icon?: string;
}

interface ServicesArchiveHeroData {
  badge?: string;
  title: string;
  highlightedWord?: string;
  description: string;
  images: string[];
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  stats?: HeroStat[];
  categories?: ServiceCategory[];
}

interface ServicesArchiveHeroProps {
  data?: ServicesArchiveHeroData;
}

const defaultData: ServicesArchiveHeroData = {
  badge: "Curated Kashmir Experiences",
  title: "Discover Every Way to Explore Kashmir",
  highlightedWord: "Kashmir",
  description:
    "From luxury shikara rides on Dal Lake to thrilling ski adventures in Gulmarg — explore our handpicked collection of premium services designed to make your Kashmir journey truly unforgettable.",
  images: [
    "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=900&q=80",
    "https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=900&q=80",
    "https://images.unsplash.com/photo-1599661046827-dacde6976549?w=900&q=80",
    "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=900&q=80",
  ],
  primaryCtaLabel: "Browse All Services",
  secondaryCtaLabel: "Plan My Trip",
  stats: [
    { value: 25, suffix: "+", label: "Services" },
    { value: 4.9, suffix: "★", label: "Avg. rating" },
    { value: 5000, suffix: "+", label: "Happy guests" },
  ],
  categories: [
    { label: "Transport", icon: "🚗" },
    { label: "Shikara Rides", icon: "🛶" },
    { label: "Photography", icon: "📸" },
    { label: "Ski & Snow", icon: "⛷️" },
    { label: "Cuisine", icon: "🍲" },
  ],
};

// ---------- Count Up ----------
function CountUp({
  to,
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);

  const isDecimal = to % 1 !== 0;

  const rounded = useTransform(count, (latest) => {
    if (isDecimal) return latest.toFixed(1);
    if (to >= 1000) {
      const k = latest / 1000;
      return k >= 1
        ? `${k.toFixed(k < 10 ? 1 : 0)}k`
        : Math.round(latest).toString();
    }
    return Math.round(latest).toString();
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [inView, to, duration, count]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

// ---------- Variants ----------
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServicesArchiveHero({
  data,
}: ServicesArchiveHeroProps) {
  const merged: ServicesArchiveHeroData = { ...defaultData, ...data };
  const {
    badge,
    title,
    highlightedWord,
    description,
    primaryCtaLabel,
    secondaryCtaLabel,
    onPrimaryCtaClick,
    onSecondaryCtaClick = ()=> setOpen(true),
    stats,
    categories,
  } = merged;

  const [isOpen, setOpen] = useState(false);

  // Highlight a specific word in the title (gradient text)
  const renderTitle = () => {
    if (!highlightedWord) return title;
    const parts = title.split(new RegExp(`(${highlightedWord})`, "i"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlightedWord.toLowerCase() ? (
        <span
          key={i}
          className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent"
        >
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-white pt-10 sm:pt-12 md:pt-16">
      <EnquiryPopupForm isOpen={isOpen} onClose={()=>setOpen(false)}/>
      {/* --- BACKGROUND ARTWORK & EFFECTS --- */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Soft background blobs */}
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute top-1/4 -right-32 h-[420px] w-[420px] rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-sky-100/60 blur-3xl" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* 1. SCENIC CABLE CARS (Top) */}
        <svg
          viewBox="0 0 1440 400"
          className="absolute top-0 left-0 w-full min-w-[1200px] h-[300px] sm:h-[400px] text-sky-200/80"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <g id="gondola">
              {/* Connector */}
              <line
                x1="20"
                y1="0"
                x2="20"
                y2="25"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M10,25 L30,25 L34,32 L6,32 Z" fill="currentColor" />
              {/* Cabin */}
              <rect
                x="0"
                y="32"
                width="40"
                height="35"
                rx="6"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x="5"
                y="37"
                width="12"
                height="15"
                rx="2"
                fill="currentColor"
                opacity="0.4"
              />
              <rect
                x="23"
                y="37"
                width="12"
                height="15"
                rx="2"
                fill="currentColor"
                opacity="0.4"
              />
            </g>
          </defs>

          {/* The Cable Line */}
          <line
            x1="0"
            y1="60"
            x2="1440"
            y2="280"
            stroke="currentColor"
            strokeWidth="1.5"
          />

          {/* Gondola 1 (Left) */}
          <g transform="translate(250, 98.2)">
            <motion.g
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              style={{ transformOrigin: "20px 0px" }}
            >
              <use href="#gondola" />
            </motion.g>
          </g>

          {/* Gondola 2 (Middle) */}
          <g transform="translate(750, 174.6)">
            <motion.g
              animate={{ rotate: [2, -2, 2] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{ transformOrigin: "20px 0px" }}
            >
              <use href="#gondola" />
            </motion.g>
          </g>

          {/* Gondola 3 (Right) */}
          <g transform="translate(1200, 243.3)">
            <motion.g
              animate={{ rotate: [-4, 4, -4] }}
              transition={{
                repeat: Infinity,
                duration: 7,
                ease: "easeInOut",
                delay: 2,
              }}
              style={{ transformOrigin: "20px 0px" }}
            >
              <use href="#gondola" />
            </motion.g>
          </g>
        </svg>

        {/* 2. MOUNTAIN SILHOUETTES (Bottom) */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0 w-full min-w-[1000px] h-[150px] sm:h-[250px]"
          preserveAspectRatio="none"
        >
          {/* Back Mountains (Lighter) */}
          <path
            d="M0 320 L0 150 L120 100 L320 250 L580 80 L820 280 L1080 120 L1320 250 L1440 180 L1440 320 Z"
            className="fill-sky-100/60"
          />
          {/* Front Mountains (Slightly darker, overlay) */}
          <path
            d="M0 320 L0 220 L220 120 L480 300 L720 160 L980 320 L1220 180 L1440 260 L1440 320 Z"
            className="fill-sky-200/40"
          />
        </svg>
      </div>
      {/* --- END BACKGROUND ARTWORK --- */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-10 sm:py-16 md:py-20">
        {/* CENTERED CONTENT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          {badge && (
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-4 py-1.5 text-xs font-medium text-sky-700 backdrop-blur-sm shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className="mt-5 sm:mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05]"
          >
            {renderTitle()}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 max-w-2xl bg-white/40 rounded-xl sm:bg-transparent"
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <button
              onClick={onPrimaryCtaClick}
              className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/40"
            >
              <Search className="h-4 w-4" />
              {primaryCtaLabel}
            </button>

            {secondaryCtaLabel && (
              <button
                onClick={onSecondaryCtaClick}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur-md transition-all duration-300 hover:border-sky-300 hover:text-sky-700"
              >
                <Compass className="h-4 w-4" />
                {secondaryCtaLabel}
              </button>
            )}
          </motion.div>

          {/* Category chips */}
          {categories && categories.length > 0 && (
            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
              {categories.map((cat, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -2 }}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                >
                  {cat.icon && <span>{cat.icon}</span>}
                  {cat.label}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Stats row */}
          {stats && stats.length > 0 && (
            <motion.div
              variants={fadeUp}
              className="mt-10 sm:mt-12 flex items-center justify-center gap-6 sm:gap-10 border-t border-slate-100/80 pt-6 sm:pt-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-6 sm:gap-10">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="h-10 w-px bg-slate-200/80" />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
