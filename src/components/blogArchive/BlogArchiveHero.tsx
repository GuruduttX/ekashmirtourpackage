"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Feather, BookOpen, Clock, Sparkles, MapPin } from "lucide-react";

export default function BlogArchiveHero() {
  // Framer Motion Variants for smooth, cinematic transitions (no bounce)
  const easeOutExpo = [0.16, 1, 0.3, 1];

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: easeOutExpo },
    },
  };

  const blurReveal: Variants = {
    hidden: { opacity: 0, filter: "blur(12px)", scale: 0.95 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 1.5, ease: easeOutExpo },
    },
  };

  const floatAnimation: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-sky-50 pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-20">
      {/* 🌌 Atmospheric Details - Subtle floating orbs and glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-sky-400/20 blur-[120px]" />
        <div className="absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-cyan-400/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[400px] w-[500px] rounded-full bg-sky-300/20 blur-[120px]" />
        {/* Subtle noise/texture overlay for cinematic feel */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-20">
          {/* ================================================== */}
          {/* LEFT SIDE: EDITORIAL CONTENT                         */}
          {/* ================================================== */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            {/* 1. Editorial Badge */}
            <motion.div
              variants={fadeUp}
              className="mb-8 flex items-center gap-2 rounded-full border border-sky-200/50 bg-white/40 px-4 py-1.5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] backdrop-blur-md"
            >
              <Feather className="h-3.5 w-3.5 text-sky-500" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-700">
                The Journal
              </span>
            </motion.div>

            {/* 2. Heading */}
            <motion.h1
              variants={fadeUp}
              className="mb-8 font-serif text-[2.8rem] font-extralight leading-[1.1] tracking-tight text-slate-900 md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]"
            >
              Discover <br />
              <span className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text font-normal text-transparent drop-shadow-sm">
                Kashmir Stories
              </span>
            </motion.h1>

            {/* 3. Metadata Pills Row */}
            <motion.div
              variants={fadeUp}
              className="mb-8 flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-3.5 py-1.5 backdrop-blur-md">
                <BookOpen className="h-3.5 w-3.5 text-sky-500" />
                <span className="text-[13px] font-medium text-slate-700">
                  120+ Stories
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-3.5 py-1.5 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                <span className="text-[13px] font-medium text-slate-700">
                  Cinematic Guides
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-3.5 py-1.5 backdrop-blur-md">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-[13px] font-medium text-slate-600">
                  Updated Weekly
                </span>
              </div>
            </motion.div>

            {/* 4. Subtext */}
            <motion.p
              variants={fadeUp}
              className="max-w-md text-lg font-light leading-relaxed text-slate-600 md:text-xl"
            >
              Immerse yourself in a curated archive of untamed valleys, serene
              lake waters, and the quiet poetry of alpine life.
            </motion.p>
          </motion.div>

          {/* ================================================== */}
          {/* RIGHT SIDE: CINEMATIC IMAGE COMPOSITION              */}
          {/* ================================================== */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative w-full"
          >
            {/* Aspect Ratio Container for Main Image */}
            <motion.div
              variants={blurReveal}
              className="relative aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-[2rem] border border-white/40 bg-slate-100 shadow-[0_20px_60px_-15px_rgba(14,165,233,0.2)] md:aspect-[3/4] lg:ml-auto lg:aspect-[4/5]"
            >
              {/* Image Inner Wrapper for Zoom Effect */}
              <div className="group h-full w-full">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: easeOutExpo }}
                  src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=2000&auto=format&fit=crop"
                  alt="Cinematic view of Dal Lake in Kashmir"
                  className="h-full w-full object-cover object-center"
                />
                {/* Soft gradient overlay on primary image for premium feel */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-40" />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20" />
              </div>
            </motion.div>

            {/* Floating Secondary Image/Card */}
            <motion.div
              variants={blurReveal}
              className="absolute -bottom-6 -left-4 z-20 md:-left-12 lg:-left-16 lg:bottom-12"
            >
              <motion.div
                variants={floatAnimation}
                animate="animate"
                className="flex items-center gap-4 rounded-2xl border border-white/50 bg-white/70 p-3 pr-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl"
              >
                <div className="h-16 w-16 overflow-hidden rounded-xl border border-white/60">
                  <img
                    src="https://images.unsplash.com/photo-1615525983637-295e87a9ca8b?q=80&w=600&auto=format&fit=crop"
                    alt="Snowy valleys of Gulmarg"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-sky-500">
                    <MapPin className="h-3 w-3" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                  <span className="mt-0.5 font-serif text-sm font-medium text-slate-800">
                    Winter in Gulmarg
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Glow behind the images */}
            <div className="pointer-events-none absolute -right-8 top-1/2 h-[60%] w-[40%] -translate-y-1/2 rounded-full bg-cyan-300/20 blur-[80px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
