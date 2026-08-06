"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  Easing,
  motion,
  useReducedMotion,
  Variants,
} from "framer-motion";
import { BedDouble, MapPin, MessageCircle, Star } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

/**
 * STOCK PLACEHOLDERS so the hero renders during development — these are not
 * Kashmir photos. Replace all four with real landscape shots (~16:10) per SOP
 * B5, then delete this helper.
 */
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

const SLIDES = [
  {
    id: "houseboats",
    word: "Houseboat",
    label: "Houseboats",
    area: "Dal Lake, Srinagar",
    image: img("1566073771259-6a8506099945"),
    alt: "Carved cedar houseboats moored along Dal Lake at sunrise with shikaras alongside",
    priceFrom: 2500,
  },
  {
    id: "hotels",
    word: "Hotel",
    label: "Srinagar Hotels",
    area: "Boulevard Road",
    image: img("1578683010236-d716f9a3f461"),
    alt: "Lake-facing hotel balcony on Boulevard Road overlooking Dal Lake, Srinagar",
    priceFrom: 1800,
  },
  {
    id: "resorts",
    word: "Resort",
    label: "Mountain Resorts",
    area: "Gulmarg & Pahalgam",
    image: img("1551882547-ff40c63fe5fa"),
    alt: "Snow-covered pine-wood resort in Gulmarg with the Affarwat range behind it",
    priceFrom: 5500,
  },
  {
    id: "homestays",
    word: "Homestay",
    label: "Homestays",
    area: "Pahalgam & Aru",
    image: img("1493809842364-78817add7ffb"),
    alt: "Kashmiri family homestay courtyard in Pahalgam with a walnut-wood verandah",
    priceFrom: 1200,
  },
] as const;

/** How long each image holds — the card progress bar fills across exactly this. */
const SLIDE_MS = 5200;

const stats = [
  { value: "120+", label: "Verified stays" },
  { value: "4.5", label: "Google Rating", icon: true },
  { value: "20", label: "Years on the ground" },
];

const easeOutExpo: Easing = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export default function StayHubHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setActive(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  // The image only advances once the active card's progress bar has filled.
  useEffect(() => {
    if (paused || reduceMotion) return;
    timerRef.current = setTimeout(() => goTo(active + 1), SLIDE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, paused, reduceMotion, goTo]);

  const slide = SLIDES[active];

  return (
    <section
      className="relative w-full overflow-hidden bg-sky-50 pt-28 pb-10 sm:pt-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft light-theme backdrop — gradient orbs + faint dotted grid */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-105 w-105 rounded-full bg-sky-400/20 blur-[120px]" />
        <div className="absolute -right-16 top-[10%] h-115 w-115 rounded-full bg-cyan-400/15 blur-[130px]" />
        <div className="absolute bottom-[-15%] left-1/2 h-90 w-130 -translate-x-1/2 rounded-full bg-sky-300/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(14,165,233,0.12) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Breadcrumbs — scroll horizontally on mobile rather than wrapping
          (SOP B3: breadcrumb on every deep page). */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Stays" }]} />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        {/* ---------------- Left: copy, stats, CTAs, stay-type cards ---------------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.span
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 shadow-sm backdrop-blur-md"
          >
            <BedDouble className="h-3.5 w-3.5" /> Kashmir stays &amp; houseboats
          </motion.span>

          {/* H1 is one stable string for SEO; only the stay-type word swaps. */}
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl"
          >
            Find your{" "}
            <span className="relative inline-block align-bottom">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={slide.id}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -18 }}
                  transition={{ duration: 0.45, ease: easeOutExpo }}
                  className="inline-block bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent"
                >
                  {slide.word}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            in Kashmir
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg"
          >
            Houseboats on Dal Lake, hotels in Srinagar, mountain resorts and
            family homestays — honest price ranges, what each one is actually
            like, and which ones a local would avoid.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex w-fit items-center justify-center divide-x divide-slate-200"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-5 text-center first:pl-0 last:pr-0"
              >
                <p className="flex items-center justify-center gap-1 text-xl font-bold text-sky-600 sm:text-2xl">
                  {stat.icon && (
                    <Star className="h-4 w-4 fill-sky-500 text-sky-500" />
                  )}
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Both CTAs stay on a single row on mobile — tighter padding and no
              wrapping, so they sit side by side down to the narrowest screens. */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex w-full flex-nowrap items-center justify-center gap-2.5 sm:gap-3 lg:justify-start"
          >
            <Link
              href="/contact/"
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5 sm:gap-2 sm:px-7 sm:py-3.5 sm:text-base"
            >
              <BedDouble className="h-4 w-4 shrink-0" /> Get Stay Quote
            </Link>
            <Link
              href="/contact/"
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-sky-200 bg-white px-4 py-3 text-sm font-semibold text-sky-600 transition-colors hover:bg-sky-50 sm:gap-2 sm:px-7 sm:py-3.5 sm:text-base"
            >
              <MessageCircle className="h-4 w-4 shrink-0" /> WhatsApp Us
            </Link>
          </motion.div>
        </motion.div>

        {/* ------- Right: the image, with the four stay-type cards beneath ------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div variants={fadeUp} className="relative">
            {/* Decorative offset frame behind the photo */}
            <div className="absolute -inset-3 -z-10 rounded-4xl bg-linear-to-br from-sky-200/60 to-cyan-100/40" />

            <div className="relative aspect-16/10 w-full overflow-hidden rounded-4xl bg-sky-100 shadow-xl shadow-sky-100">
              <AnimatePresence initial={false}>
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.08 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      opacity: { duration: 0.8, ease: "easeInOut" },
                      scale: {
                        duration: reduceMotion ? 0 : SLIDE_MS / 1000 + 1,
                        ease: "linear",
                      },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.8, ease: "easeInOut" },
                  }}
                  className="absolute inset-0"
                >
                  {failedImages[slide.id] ? (
                    // Fallback until the real photo is added to /public/stays-hub/
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-sky-200 via-sky-100 to-cyan-100">
                      <span className="px-6 text-center font-heading text-2xl font-bold text-sky-700/70">
                        {slide.label}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      unoptimized
                      priority={active === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [slide.id]: true,
                        }))
                      }
                    />
                  )}
                  {/* Bottom scrim so the caption stays readable on any photo */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-slate-900/70 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Caption — which stay type is on screen right now */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                  >
                    <p className="font-heading text-xl font-bold text-white sm:text-2xl">
                      {slide.label}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-200">
                      <MapPin className="h-3.5 w-3.5" /> {slide.area}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Price badge */}
              <div className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-sky-600 shadow-md backdrop-blur-md">
                from ₹{slide.priceFrom.toLocaleString("en-IN")}
              </div>
            </div>
          </motion.div>

          {/* Four stay-type cards — the active one advances automatically the
              moment its progress bar finishes, taking its image with it. */}
          <motion.div
            variants={fadeUp}
            role="tablist"
            aria-label="Kashmir stay types"
            className="mt-4 grid w-full grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {SLIDES.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => goTo(index)}
                  className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition-colors ${
                    isActive
                      ? "border-sky-300 bg-white shadow-md shadow-sky-100"
                      : "border-slate-200 bg-white/70 hover:border-sky-200 hover:bg-white"
                  }`}
                >
                  <span className="block text-sm font-semibold text-slate-900">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    from ₹{item.priceFrom.toLocaleString("en-IN")}
                  </span>

                  {/* Progress bar — fills across SLIDE_MS, then the next card
                      becomes active and its image crossfades in. */}
                  <span className="mt-3 block h-1 w-full overflow-hidden rounded-full bg-slate-200">
                    {isActive && (
                      <motion.span
                        key={`${item.id}-${active}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration:
                            reduceMotion || paused ? 0 : SLIDE_MS / 1000,
                          ease: "linear",
                        }}
                        className="block h-full origin-left bg-linear-to-r from-sky-500 to-cyan-400"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
