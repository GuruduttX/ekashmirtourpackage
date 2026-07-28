"use client";

import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ArrowRight, Compass, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/layout/Breadcrumbs";

interface HeroStat {
  value: string;
  label: string;
}

interface CityHeroProps {
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  titleAccent?: string;
  subtitle?: string;
  images: string[];
  stats?: HeroStat[];
  totalPackages?: number;
  rating?: number;
  reviewsCount?: number;
  ctaHref?: string;
  locationLabel?: string;
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * City hub hero — breadcrumbs, H1, and (optional) stats on the left; a
 * dynamic auto-advancing image carousel built from the hub's hero image +
 * gallery on the right. Renders gracefully with 0–5 images and collapses to
 * a single stacked column on mobile.
 */
export default function CityHero({
  breadcrumbItems,
  title,
  titleAccent,
  subtitle,
  images,
  stats,
  totalPackages,
  rating,
  reviewsCount,
  ctaHref = "#tour-categories",
  locationLabel = "Kashmir, India",
}: CityHeroProps) {
  const imgs = images.filter(Boolean).slice(0, 5);
  const hasImages = imgs.length > 0;
  const hasStats = Boolean(stats?.length);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (imgs.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % imgs.length);
    }, 4500);
    return () => clearInterval(id);
  }, [imgs.length]);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Decorative background glow — matches site's sky/cyan accent */}
      <div
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)" }}
      />

      <div
        className={`relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pt-24 pb-10 sm:px-6 sm:pt-28 lg:gap-8 lg:px-8 lg:pb-14 ${
          hasImages ? "lg:grid-cols-[1fr_0.95fr] lg:items-center" : ""
        }`}
      >
        {/* ────── LEFT — breadcrumbs, H1, quick answer, stats ────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          <motion.div variants={fadeUp} className="mb-5">
            <Breadcrumbs items={breadcrumbItems} />
          </motion.div>

          <motion.div variants={fadeUp} className="mb-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <div className="flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5">
              <Compass className="h-3 w-3 text-sky-500" />
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-sky-600">
                Tour Packages
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <div className="h-px w-4 bg-gray-300" />
              <span className="text-[0.6rem] font-medium uppercase tracking-widest">
                {locationLabel}
              </span>
              <MapPin className="h-3 w-3" />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mb-4 text-center text-[2.1rem] font-semibold leading-[1.2] text-gray-900 sm:text-left sm:text-[2.9rem] lg:text-[3.3rem]"
          >
            {title}{" "}
            {titleAccent && (
              <span
                className="inline-block pr-1 font-medium italic"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 60%, #0ea5e9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {titleAccent}
              </span>
            )}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={fadeUp}
              className="mb-6 text-center text-base font-normal italic leading-relaxed text-gray-400 sm:text-left sm:text-lg"
            >
              — {subtitle}
            </motion.p>
          )}

          {hasStats && (
            <motion.div variants={fadeUp} className="-mx-4 mb-8 px-4 sm:mx-0 sm:px-0">
              <div
                className="flex gap-3 overflow-x-auto scroll-hide pb-1 sm:grid sm:overflow-visible sm:pb-0"
                style={{ gridTemplateColumns: `repeat(${Math.min(stats!.length, 4)}, minmax(0,1fr))` }}
              >
                {stats!.slice(0, 4).map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -4, boxShadow: "0 14px 28px -8px rgba(14,165,233,0.28)" }}
                    className="flex min-w-28 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border border-sky-100 bg-linear-to-br from-sky-50 via-white to-cyan-50/70 px-4 py-4 shadow-sm sm:min-w-0"
                  >
                    <span
                      className="text-2xl font-extrabold leading-none sm:text-[1.7rem]"
                      style={{
                        background: "linear-gradient(135deg, #0284C7, #06b6d4)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-center text-[0.62rem] font-semibold uppercase tracking-widest text-slate-500">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            variants={fadeUp}
            className="mb-8 flex w-full flex-col items-center justify-center gap-4 text-center sm:w-auto sm:flex-row sm:justify-start sm:text-left"
          >
            <motion.a
              href={ctaHref}
              whileHover={{ y: -3, boxShadow: "0 20px 40px -8px rgba(14,165,233,0.40)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white sm:inline-flex sm:w-auto"
              style={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                boxShadow: "0 8px 24px -4px rgba(14,165,233,0.28)",
              }}
            >
              Explore Packages
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            {typeof totalPackages === "number" && totalPackages > 0 && (
              <span className="text-sm font-medium text-slate-500">
                {totalPackages}+ packages available
              </span>
            )}
          </motion.div>
        </motion.div>

        {/* ────── RIGHT — auto-advancing image carousel ────── */}
        {hasImages && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="relative">
            {/* Soft ambient glow behind the collage */}
            <div
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem]"
              style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)" }}
            />

            {/* Floating mountain glyph — top-right, outside the image */}
            <motion.svg
              viewBox="0 0 48 48"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute -top-8 -right-7 hidden h-12 w-12 opacity-70 sm:block lg:h-14 lg:w-14"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M4 38 L17 16 L25 28 L32 17 L44 38 Z" />
              <path d="M13.5 23.5 L17 16 L20.5 23.5" />
              <path d="M28.5 25 L32 17 L35.5 25" />
            </motion.svg>

            {/* Spinning snowflake — bottom-left, outside the image */}
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="pointer-events-none absolute -bottom-7 -left-7 hidden h-10 w-10 opacity-70 sm:block"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            >
              <path d="M12 2v20M4.2 6.5l15.6 11M19.8 6.5L4.2 17.5" />
              <path d="M12 2l-1.6 1.9M12 2l1.6 1.9M12 22l-1.6-1.9M12 22l1.6-1.9" />
              <path d="M4.2 6.5l.6 2.5M4.2 6.5l2.4-1M19.8 6.5l-.6 2.5M19.8 6.5l-2.4-1" />
              <path d="M4.2 17.5l.6-2.5M4.2 17.5l2.4 1M19.8 17.5l-.6-2.5M19.8 17.5l-2.4 1" />
            </motion.svg>

            {/* Swaying chinar leaf — mid-left edge, large screens only */}
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute top-1/2 -left-9 hidden h-9 w-9 -translate-y-1/2 opacity-70 lg:block"
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M12 2C7 6 4 10 4 14a8 8 0 0 0 16 0c0-4-3-8-8-12z" />
              <path d="M12 6v14M9 12h6M9 16h6" />
            </motion.svg>

            <div
              className="relative h-65 overflow-hidden rounded-3xl sm:h-90 lg:h-120"
              style={{ boxShadow: "0 30px 60px -16px rgba(2,132,199,0.22)" }}
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={imgs[active]}
                    alt={title}
                    fill
                    unoptimized
                    priority={active === 0}
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Bottom gradient for legibility of overlays */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/35 to-transparent" />

              {typeof totalPackages === "number" && totalPackages > 0 && (
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)" }}
                  >
                    <Compass className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-900">{totalPackages}+ Packages</span>
                </div>
              )}

              {/* Dot indicators */}
              {imgs.length > 1 && (
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show image ${i + 1}`}
                      onClick={() => setActive(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === active ? "18px" : "6px",
                        height: "6px",
                        background: i === active ? "#fff" : "rgba(255,255,255,0.5)",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Floating rating badge — spills over the top-left corner */}
            {typeof rating === "number" && rating > 0 && (
              <motion.div
                className="absolute -top-5 -left-5 z-20 hidden items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl sm:flex"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.5 },
                  scale: { duration: 0.6, delay: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
                }}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }}
                >
                  <Star className="h-4 w-4 fill-white text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-none text-gray-900">{rating.toFixed(1)}</p>
                  <p className="mt-0.5 text-[0.58rem] text-gray-400">
                    {reviewsCount ? `${reviewsCount}+ reviews` : "Rating"}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Floating tagline badge — spills over the bottom-right corner */}
            <motion.div
              className="absolute -bottom-5 -right-5 z-20 hidden items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-xl sm:flex"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.65 },
                scale: { duration: 0.6, delay: 0.65 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
              }}
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)" }}
              >
                <Compass className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold leading-none text-gray-900">Kashmir Experts</p>
                <p className="mt-0.5 text-[0.58rem] text-gray-400">Handpicked journeys</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
