"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Shield } from "lucide-react";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  text: string;
  rating: number;
  trip: string;
}

/* ─────────────────────────────────────────
   Dummy Data
───────────────────────────────────────── */
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi, India",
    image: "https://i.pravatar.cc/150?img=47",
    text: "The houseboat stay on Dal Lake was a dream I never knew I had. Waking up to mist over the mountains was unlike anything I've ever experienced.",
    rating: 5,
    trip: "7-Day Kashmir Classic",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    location: "Mumbai, India",
    image: "https://i.pravatar.cc/150?img=12",
    text: "Gulmarg in winter is pure magic. The Gondola ride left us speechless. Every detail of the trip was handled perfectly — we didn't worry about a thing.",
    rating: 5,
    trip: "Gulmarg Snow Retreat",
  },
  {
    id: 3,
    name: "Ananya Iyer",
    location: "Bengaluru, India",
    image: "https://i.pravatar.cc/150?img=32",
    text: "Pahalgam's meadows are something from another world. The team went above and beyond to make our anniversary trip truly special and seamless.",
    rating: 5,
    trip: "Pahalgam Couples Escape",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur, India",
    image: "https://i.pravatar.cc/150?img=8",
    text: "Kashmir exceeded every expectation. The local food experiences and the Mughal Gardens were highlights we'll talk about for years. Highly recommend.",
    rating: 4.5,
    trip: "Heritage & Culture Tour",
  },
  {
    id: 5,
    name: "Sneha Kulkarni",
    location: "Pune, India",
    image: "https://i.pravatar.cc/150?img=44",
    text: "Our family of five had the most organised, stress-free holiday. The kids loved the shikara ride and the guides were incredibly knowledgeable and warm.",
    rating: 5,
    trip: "Kashmir Family Package",
  },
  {
    id: 6,
    name: "Arjun Nair",
    location: "Kochi, India",
    image: "https://i.pravatar.cc/150?img=15",
    text: "Sonamarg blew us away. The drive itself was a highlight. Booking was smooth, communication was excellent, and the experience was worth every rupee.",
    rating: 5,
    trip: "Sonamarg Expedition",
  },
  {
    id: 7,
    name: "Kavita Patel",
    location: "Ahmedabad, India",
    image: "https://i.pravatar.cc/150?img=39",
    text: "The photography tour was the best decision I made. Golden hour at Dal Lake produced images I've printed and framed. The guides knew every perfect angle.",
    rating: 5,
    trip: "Photography Tour",
  },
  {
    id: 8,
    name: "Rohan Das",
    location: "Kolkata, India",
    image: "https://i.pravatar.cc/150?img=6",
    text: "A truly personalised experience — they listened to what we wanted and delivered something far beyond what we'd planned. Kashmir is unmissable.",
    rating: 4.5,
    trip: "Custom Kashmir Tour",
  },
];

const SCROLL_SPEED = 0.45; // px per frame
const MANUAL_PAUSE_DURATION = 2500; // ms

/* ─────────────────────────────────────────
   StarDisplay
───────────────────────────────────────── */
function StarDisplay({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const dim =
    size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1);
        return (
          <div key={i} className={`relative ${dim}`}>
            <Star className={`absolute inset-0 text-gray-200 ${dim}`} />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className={`${dim} fill-amber-400 text-amber-400`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────
   RatingBar
───────────────────────────────────────── */
function RatingBar({
  star,
  percent,
  delay,
}: {
  star: number;
  percent: number;
  delay: number;
}) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-4 text-right font-semibold text-gray-600">{star}</span>
      <Star className="w-3 h-3 fill-amber-400 text-amber-400 flex-shrink-0" />
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #0ea5e9, #06b6d4)" }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
        />
      </div>
      <span className="w-8 text-right text-gray-400">{percent}%</span>
    </div>
  );
}

/* ─────────────────────────────────────────
   ReviewCard
───────────────────────────────────────── */
function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative flex-shrink-0 w-[270px] sm:w-[300px] rounded-3xl cursor-grab active:cursor-grabbing"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow:
          "0 4px 24px -4px rgba(14,165,233,0.08), 0 0 0 1px rgba(255,255,255,0.7) inset",
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(186,230,253,0.25) 0%, transparent 100%)",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(14,165,233,0.5), rgba(34,211,238,0.5), transparent)",
        }}
      />

      <div className="relative z-10 p-6 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative w-14 h-14 rounded-full overflow-hidden mb-4 ring-2 ring-white shadow-lg shadow-sky-100/60">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Quote icon */}
        <Quote
          className="w-6 h-6 text-sky-200 mb-3 flex-shrink-0"
          style={{ transform: "scaleX(-1)" }}
        />

        {/* Review text */}
        <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
          {testimonial.text}
        </p>

        {/* Divider */}
        <div
          className="w-8 h-px mb-4"
          style={{ background: "linear-gradient(90deg, #0ea5e9, #06b6d4)" }}
        />

        {/* Name + location */}
        <p className="font-bold text-gray-900 text-sm leading-tight">
          {testimonial.name}
        </p>
        <p className="text-gray-400 text-[11px] mb-3">{testimonial.location}</p>

        {/* Trip tag */}
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-[10px] font-semibold tracking-wide mb-4">
          {testimonial.trip}
        </span>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarDisplay rating={testimonial.rating} />
          <span className="text-xs font-bold text-gray-700">
            {testimonial.rating}/5
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function CustomerReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isPausedRef = useRef(false);
  const isTouchingRef = useRef(false);
  const manualPauseTimer = useRef<ReturnType<typeof setTimeout>>();

  const isInView = useInView(sectionRef, { once: true });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollState, setScrollState] = useState<"scrolling" | "paused">(
    "scrolling",
  );

  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  /* ── Auto-scroll RAF loop ── */
  const tick = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isPausedRef.current || isTouchingRef.current) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    el.scrollLeft += SCROLL_SPEED;
    if (el.scrollLeft >= el.scrollWidth / 2) {
      el.scrollLeft = 0;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  /* ── Hover pause (desktop) ── */
  const handleMouseEnter = () => {
    isPausedRef.current = true;
    setIsHovered(true);
    setScrollState("paused");
  };
  const handleMouseLeave = () => {
    isPausedRef.current = false;
    setIsHovered(false);
    setScrollState("scrolling");
  };

  /* ── Touch handlers (mobile) ── */
  const handleTouchStart = () => {
    isTouchingRef.current = true;
    setScrollState("paused");
  };
  const handleTouchEnd = () => {
    // Delay lets momentum scrolling settle before RAF resumes
    setTimeout(() => {
      isTouchingRef.current = false;
      setScrollState("scrolling");
    }, 1000);
  };

  /* ── Manual scroll ── */
  const manualScroll = (dir: "left" | "right") => {
    isPausedRef.current = true;
    setScrollState("paused");
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
    clearTimeout(manualPauseTimer.current);
    manualPauseTimer.current = setTimeout(() => {
      isPausedRef.current = false;
      setScrollState("scrolling");
    }, MANUAL_PAUSE_DURATION);
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as any,
        delay: d,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdff 100%)",
      }}
    >
      {/* ── Background blobs ── */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
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
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-200/60 to-transparent" />

      {/* ── Two-column wrapper ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
        {/* ══ LEFT — Rating panel ══ */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-24"
        >
          <div
            className="relative rounded-3xl overflow-hidden p-7"
            style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.85)",
              boxShadow:
                "0 12px 40px -8px rgba(14,165,233,0.10), 0 0 0 1px rgba(255,255,255,0.7) inset",
            }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(14,165,233,0.5), rgba(34,211,238,0.4), transparent)",
              }}
            />

            {/* Overline */}
            <p className="text-[0.65rem] font-bold tracking-[0.28em] uppercase text-sky-500 mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-sky-400" />
              Reviews
            </p>

            {/* Average rating */}
            <div className="flex items-end gap-3 mb-2">
              <span
                className="text-6xl font-black text-gray-900 leading-none"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                4.9
              </span>
              <div className="pb-1">
                <p className="text-gray-400 text-xs font-medium">out of 5</p>
              </div>
            </div>

            <div className="mb-4">
              <StarDisplay rating={4.9} size="md" />
            </div>

            {/* Trust label */}
            <div className="flex items-start gap-2 mb-7 pb-7 border-b border-sky-100/60">
              <Shield className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-400 text-xs leading-relaxed">
                Based on{" "}
                <span className="font-semibold text-gray-600">10,000+</span>{" "}
                reviews from real travellers
              </p>
            </div>

            {/* Rating breakdown */}
            <div className="space-y-3">
              {[
                { star: 5, percent: 82, delay: 0.3 },
                { star: 4, percent: 13, delay: 0.4 },
                { star: 3, percent: 3, delay: 0.5 },
                { star: 2, percent: 1, delay: 0.6 },
                { star: 1, percent: 1, delay: 0.7 },
              ].map((row) => (
                <RatingBar
                  key={row.star}
                  star={row.star}
                  percent={row.percent}
                  delay={isInView ? row.delay : 999}
                />
              ))}
            </div>

            {/* Desktop arrow controls */}
            <div className="hidden lg:flex items-center gap-2 mt-8 pt-6 border-t border-sky-100/60">
              <button
                onClick={() => manualScroll("left")}
                aria-label="Scroll left"
                className="w-9 h-9 rounded-full bg-white border border-sky-100 flex items-center justify-center text-sky-500 hover:bg-sky-50 hover:border-sky-200 transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => manualScroll("right")}
                aria-label="Scroll right"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:-translate-y-0.5 transition-all shadow-md"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                  boxShadow: "0 4px 12px -2px rgba(14,165,233,0.35)",
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-gray-400 ml-1">
                {scrollState === "paused" ? "Paused" : "Auto-scrolling"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ══ RIGHT — Infinite carousel ══ */}
        {/*
          KEY FIX: was "flex-1 overflow-hidden min-w-0"
          overflow-hidden clips the mobile arrow row and blocks touch events.
          Use min-w-0 only — the scroll track handles its own overflow internally.
        */}
        <div className="flex-1 min-w-0">
          {/* Section heading */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-8"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              What Our{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Travellers Say
              </span>
            </h2>
            <p className="text-gray-400 text-sm mt-2 font-light">
              Hover to pause · Swipe or use arrows to browse
            </p>
          </motion.div>

          {/* Carousel wrapper — no overflow-hidden here */}
          <div className="relative">
            {/* Left edge fade — desktop only */}
            <div
              className="hidden lg:block pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-20"
              style={{
                background: "linear-gradient(to right, #e0f2fe, transparent)",
              }}
            />
            {/* Right edge fade — desktop only */}
            <div
              className="hidden lg:block pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-20"
              style={{
                background: "linear-gradient(to left, #f0fdff, transparent)",
              }}
            />

            {/* Scroll track */}
            <div
              ref={scrollRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="flex gap-5 overflow-x-auto pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {doubled.map((t, i) => (
                <ReviewCard key={`${t.id}-${i}`} testimonial={t} />
              ))}
            </div>

            {/* Mobile arrow row */}
            {/*
              KEY FIX: added "relative z-10" so this renders above the scroll
              track in paint order and isn't clipped by any ancestor.
              Added active:scale-95 for tactile press feedback on touch devices.
            */}
            <div className="flex lg:hidden items-center justify-center gap-3 mt-5 relative z-10">
              <button
                onClick={() => manualScroll("left")}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full bg-white border border-sky-100 shadow-sm flex items-center justify-center text-sky-500 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-gray-400 tracking-widest uppercase min-w-[60px] text-center">
                {scrollState === "paused" ? "Paused" : "Scrolling"}
              </span>
              <button
                onClick={() => manualScroll("right")}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-all"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}