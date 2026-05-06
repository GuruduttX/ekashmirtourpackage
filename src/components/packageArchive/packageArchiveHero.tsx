"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MapPin, Compass } from "lucide-react";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface PackageStat {
  value: string;
  label: string;
}

interface ArchiveHeroProps {
  title?: string;
  titleAccent?: string;
  subtitle?: string;
  description?: string;
  images?: string[];
  stats?: PackageStat[];
  totalPackages?: number;
  ctaHref?: string;
}

/* ─────────────────────────────────────────
   Default Data
───────────────────────────────────────── */
const defaultData: Required<ArchiveHeroProps> = {
  title: "Every Corner of",
  titleAccent: "Kashmir Awaits",
  subtitle: "48 handpicked journeys across the valley",
  description:
    "From the silent mornings on Dal Lake to the electric air of Gulmarg's slopes — we've mapped Kashmir's soul into journeys that stay with you long after you return.",
  images: [
    "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&auto=format&fit=crop&q=80", // Dal Lake
    "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=900&auto=format&fit=crop&q=80", // Gulmarg snow
    "https://images.unsplash.com/photo-1561287437-c69a30664793?w=900&auto=format&fit=crop&q=80", // Pahalgam valley
    "https://images.unsplash.com/photo-1677123419103-785c917c4a58?w=900&auto=format&fit=crop&q=80", // Shikara
    "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=900&auto=format&fit=crop&q=80", // Mountain pass
  ],
  stats: [
    { value: "48+", label: "Packages" },
    { value: "12K+", label: "Travellers" },
    { value: "4.9", label: "Avg Rating" },
    { value: "7", label: "Regions" },
  ],
  totalPackages: 48,
  ctaHref: "#packages",
};

/* ─────────────────────────────────────────
   Framer Motion Variants
───────────────────────────────────────── */
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const scaleIn = (delay: number): Variants => ({
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as any, delay },
  },
});

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */
function ImageCard({
  src,
  alt,
  className,
  style,
  delay,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  delay: number;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute overflow-hidden rounded-2xl shadow-xl ${className}`}
      style={style}
      variants={scaleIn(delay)}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.03,
        zIndex: 50,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className="object-cover object-center transition-transform duration-700 hover:scale-105"
      />
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function PackagesArchiveHero({
  title = defaultData.title,
  titleAccent = defaultData.titleAccent,
  subtitle = defaultData.subtitle,
  description = defaultData.description,
  images = defaultData.images,
  stats = defaultData.stats,
  totalPackages = defaultData.totalPackages,
  ctaHref = defaultData.ctaHref,
}: ArchiveHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const imgs = [...images, ...defaultData.images].slice(0, 5);

  // Subtle parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <>
      <style>{`
        /* Scrollbar hide */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Gentle float keyframe */
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50%       { transform: translateY(-8px) rotate(var(--r, 0deg)); }
        }
        .float-slow { animation: gentleFloat 6s ease-in-out infinite; }
        .float-slow-delay { animation: gentleFloat 8s ease-in-out 1.5s infinite; }
        .float-slow-delay-2 { animation: gentleFloat 7s ease-in-out 3s infinite; }
      `}</style>

      <section
        ref={containerRef}
        className="relative w-full overflow-hidden bg-white"
      >
        {/* ══════════ BACKGROUND ATMOSPHERE ══════════ */}

        {/* Giant sky radial — top right */}
        <div
          className="pointer-events-none absolute -top-48 -right-48 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 65%)",
          }}
        />
        {/* Cyan radial — bottom left */}
        <div
          className="pointer-events-none absolute -bottom-32 -left-32 w-[560px] h-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 65%)",
          }}
        />
        {/* Sky radial — centre */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(186,230,253,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Fine dot texture — right half only */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(14,165,233,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 55% 90% at 88% 40%, black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 55% 90% at 88% 40%, black 0%, transparent 100%)",
          }}
        />

        {/* Top hairline gradient */}
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

        {/* ══════════ HERO CONTENT GRID ══════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 pt-24 sm:pt-28 pb-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-6 items-start">
          {/* ────── LEFT — Editorial text block ────── */}
          <motion.div
            className="flex flex-col text-center lg:text-left pt-4 lg:pt-10"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center lg:justify-start gap-3 mb-7"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200">
                <Compass className="w-3 h-3 text-sky-500" />
                <span className="text-[0.6rem] font-semibold tracking-[0.28em] uppercase text-sky-600">
                  Tour Packages
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <div className="w-4 h-px bg-gray-300" />
                <span className="text-[0.6rem] tracking-widest uppercase font-medium">
                  Kashmir, India
                </span>
                <MapPin className="w-3 h-3" />
              </div>
            </motion.div>

            {/* Display heading — editorial large */}
            <motion.div variants={fadeUp} className="mb-5">
              <h1 className="text-[2.5rem] font-semibold leading-[1.0] text-gray-900 sm:text-[4rem] lg:text-[4.4rem]">
                {title}
                <br />
                <span
                  className="font-medium italic"
                  style={{
                    background:
                      "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 60%, #0ea5e9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {titleAccent}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle pill */}
            <motion.p
              variants={fadeUp}
              className="mb-6 text-base font-normal italic leading-relaxed text-gray-400 sm:text-lg"
            >
              — {subtitle}
            </motion.p>

            {/* Horizontal rule */}
            <motion.div
              className="w-10 h-px bg-gradient-to-r from-sky-400 to-cyan-400 mb-7 mx-auto lg:mx-0"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 40, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mx-auto lg:mx-0 text-gray-500 text-[0.97rem] leading-[1.9] font-light max-w-[460px] mb-10"
            >
              {description}
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-14"
            >
              <motion.a
                href={ctaHref}
                whileHover={{
                  y: -3,
                  boxShadow: "0 20px 40px -8px rgba(14,165,233,0.40)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-2xl text-white text-sm font-semibold cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                  boxShadow: "0 8px 24px -4px rgba(14,165,233,0.28)",
                }}
              >
                Explore All Packages
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <Link
                href="/contact"
                className="text-sm text-gray-400 hover:text-sky-500 font-medium transition-colors border-b border-dashed border-gray-200 hover:border-sky-300 pb-0.5"
              >
                Need help choosing?
              </Link>
            </motion.div>

            {/* Stat bar */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-4 divide-x divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center py-4 px-2 hover:bg-sky-50/60 transition-colors"
                >
                  <span className="text-xl font-semibold text-gray-900 sm:text-2xl">
                    {stat.value}
                  </span>
                  <span className="text-[0.6rem] tracking-widest uppercase text-gray-400 font-medium mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ────── RIGHT — Image collage ────── */}
          <motion.div style={{ y: parallaxY }}>
            <div className="hidden md:relative h-[520px] sm:h-[600px] lg:h-[680px] w-full">
              {/* ── 1. Tall hero image — center-right, dominant ── */}
              <ImageCard
                src={imgs[0]}
                alt="Dal Lake Kashmir"
                delay={0.15}
                className="z-10 float-slow"
                style={{
                  top: "0%",
                  left: "18%",
                  width: "52%",
                  height: "70%",
                  boxShadow: "0 40px 80px -20px rgba(0,0,0,0.20)",
                  borderRadius: "24px",
                  ["--r" as string]: "-1deg",
                }}
              >
                {/* Destination tag inside image */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/15">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-white text-[10px] font-medium tracking-wide">
                    Dal Lake, Srinagar
                  </span>
                </div>
              </ImageCard>

              {/* ── 2. Portrait card — far right, top ── */}
              <ImageCard
                src={imgs[1]}
                alt="Gulmarg Snow"
                delay={0.3}
                className="z-20 float-slow-delay"
                style={{
                  top: "5%",
                  right: "0%",
                  width: "35%",
                  height: "46%",
                  boxShadow:
                    "0 24px 48px -12px rgba(14,165,233,0.18), 0 0 0 1px rgba(14,165,233,0.07)",
                  borderRadius: "20px",
                  ["--r" as string]: "1.5deg",
                }}
              />

              {/* ── 3. Wide card — bottom left, slightly overlapping ── */}
              <ImageCard
                src={imgs[2]}
                alt="Pahalgam Valley"
                delay={0.42}
                className="z-30 float-slow-delay-2"
                style={{
                  bottom: "0%",
                  left: "0%",
                  width: "44%",
                  height: "36%",
                  border: "3px solid white",
                  boxShadow: "0 20px 40px -8px rgba(0,0,0,0.16)",
                  borderRadius: "20px",
                  ["--r" as string]: "1deg",
                }}
              />

              {/* ── 4. Square card — bottom right ── */}
              <ImageCard
                src={imgs[3]}
                alt="Shikara Ride"
                delay={0.54}
                className="z-30"
                style={{
                  bottom: "2%",
                  right: "1%",
                  width: "32%",
                  height: "32%",
                  border: "3px solid white",
                  boxShadow: "0 16px 32px -8px rgba(14,165,233,0.22)",
                  borderRadius: "20px",
                  ["--r" as string]: "-1.5deg",
                }}
              />

              {/* ── 5. Tiny accent card — far left, middle ── */}
              <ImageCard
                src={imgs[4]}
                alt="Mountain pass"
                delay={0.65}
                className="z-20"
                style={{
                  top: "38%",
                  left: "0%",
                  width: "22%",
                  height: "28%",
                  border: "3px solid white",
                  boxShadow: "0 12px 24px -6px rgba(0,0,0,0.14)",
                  borderRadius: "18px",
                  ["--r" as string]: "2deg",
                }}
              />

              {/* ── Floating package count pill ── */}
              <motion.div
                className="absolute z-40 bottom-[36%] left-[15%]"
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.85,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white"
                  style={{
                    boxShadow:
                      "0 12px 32px -4px rgba(14,165,233,0.22), 0 0 0 1px rgba(14,165,233,0.08)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                    }}
                  >
                    <Compass className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      {totalPackages}+ Packages
                    </p>
                    <p className="text-[10px] text-gray-400">Ready to book</p>
                  </div>
                </div>
              </motion.div>

              {/* ── Decorative ring behind main image ── */}
              <div
                className="pointer-events-none absolute z-0"
                style={{
                  top: "-5%",
                  left: "14%",
                  width: "56%",
                  height: "72%",
                  borderRadius: "28px",
                  border: "1.5px dashed rgba(14,165,233,0.18)",
                  transform: "rotate(-2deg)",
                }}
              />

              {/* ── Decorative dot cluster — top left of collage ── */}
              <div
                className="pointer-events-none absolute z-0 top-[12%] left-[4%]"
                style={{
                  width: 64,
                  height: 64,
                  backgroundImage:
                    "radial-gradient(circle, rgba(14,165,233,0.28) 1.5px, transparent 1.5px)",
                  backgroundSize: "10px 10px",
                }}
              />

              {/* ── Decorative dot cluster — bottom right ── */}
              <div
                className="pointer-events-none absolute z-0 bottom-[8%] right-[33%]"
                style={{
                  width: 56,
                  height: 56,
                  backgroundImage:
                    "radial-gradient(circle, rgba(34,211,238,0.28) 1.5px, transparent 1.5px)",
                  backgroundSize: "10px 10px",
                }}
              />

              {/* ── Subtle cyan glow behind right side ── */}
              <div
                className="pointer-events-none absolute z-0 top-1/3 right-0 w-64 h-64 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* ══════════ BOTTOM SCROLL INDICATOR ══════════ */}
        <motion.div
          className="hidden md:relative z-10 flex flex-col items-center pb-3 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-gray-300 font-medium">
            Scroll to browse
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-sky-300 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Bottom page transition fade */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
      </section>
    </>
  );
}
