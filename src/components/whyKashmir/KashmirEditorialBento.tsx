"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Mountain,
  Waves,
  Heart,
  Coffee,
  Users,
  Snowflake,
  Sparkles,
} from "lucide-react";

export default function KashmirEditorialBento() {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-sky-50 py-10 lg:py-32 px-6 sm:px-12 lg:px-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-300/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-300/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col space-y-16">
        {/* EDITORIAL HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-200/50 bg-white/60 backdrop-blur-md text-sky-600 uppercase tracking-widest text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Why Kashmir Feels Magical
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 leading-tight tracking-tight"
          >
            Why People Fall in{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
              Love with Kashmir
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-slate-600 text-lg md:text-xl leading-relaxed font-light"
          >
            Beyond the snow-capped mountains and tranquil lakes lies a feeling
            you can't quite describe. A perfect blend of luxurious peace, warm
            culture, and unforgettable valleys that stay with you forever.
          </motion.p>
        </motion.div>

        {/* EDITORIAL BENTO GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:auto-rows-[220px] lg:auto-rows-[280px] gap-4 sm:gap-5 md:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 sm:pb-0"
        >
          {/* BLOCK 1: Heaven-like Landscapes (Featured Card - 2x2) */}
          <motion.div
            variants={itemVariants}
            className="group relative min-w-[88vw] sm:min-w-0 sm:col-span-2 md:col-span-2 lg:row-span-2 min-h-[420px] sm:min-h-[420px] lg:min-h-0 overflow-hidden rounded-[28px] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-500 isolate snap-center shrink-0"
          >
            <img
              src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=2000&auto=format&fit=crop"
              alt="Kashmir Valley"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/90 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-sky-900/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />

            {/* Content */}
            <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between z-10">
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl text-white">
                  <Mountain className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-[1.75rem] sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-[1.1] max-w-[90%]">
                  Nature That Feels Unreal
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm lg:text-base leading-relaxed opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-sm">
                  Lose yourself in endless meadows, towering pines, and majestic
                  peaks that look like a cinematic masterpiece painted by nature
                  itself.
                </p>
              </div>
            </div>
          </motion.div>

          {/* BLOCK 2: Dal Lake & Houseboats (1x1) */}
          <motion.div
            variants={itemVariants}
            className="group relative min-w-[72vw] sm:min-w-0 min-h-[240px] sm:min-h-[220px] overflow-hidden rounded-[24px] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 isolate snap-center shrink-0"
          >
            <img
              src="https://imgs.search.brave.com/OzlBKLwPVCum5D6ChLxmuYC1xsyV3Xb95PkwqSd-SCY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly95b3Vu/Z3NoYWh6YWRhaG91/c2Vib2F0cy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjUv/MDQvTHV4dXJ5LWhv/dXNlYm9hdC1pbi1T/cmluYWdhci5qcGc"
              alt="Dal Lake Shikara"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-10">
              <div className="flex justify-end">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-white text-xs font-medium flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5" />
                  Dal Lake
                </span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 leading-tight">
                  Tranquil Waters
                </h3>
                <p className="text-slate-300 text-sm line-clamp-2">
                  Golden hour shikara rides and luxurious floating houseboats.
                </p>
              </div>
            </div>
          </motion.div>

          {/* BLOCK 4: Culture & Hospitality (Tall - 1x2) */}
          <motion.div
            variants={itemVariants}
            className="group relative min-w-[80vw] sm:min-w-0 sm:row-span-2 min-h-[360px] sm:min-h-[460px] lg:min-h-0 overflow-hidden rounded-[28px] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 md:order-last lg:order-none isolate snap-center shrink-0"
          >
            <img
              src="https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=1000&auto=format&fit=crop"
              alt="Kashmiri Culture"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/40 to-slate-900/90" />

            {/* Amber Warm Glow Overlay */}
            <div className="absolute inset-0 bg-amber-900/20 mix-blend-overlay group-hover:bg-amber-900/10 transition-colors duration-500" />

            <div className="absolute inset-0 p-5 sm:p-6 lg:p-8 flex flex-col justify-between z-10">
              <div className="bg-amber-500/20 backdrop-blur-md border border-amber-500/30 w-fit p-3 rounded-2xl text-amber-50">
                <Coffee className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight">
                  Warmth & Culture
                </h3>
                <p className="text-amber-50/90 text-sm leading-relaxed">
                  Experience true Kashmiri hospitality. From the fragrant
                  saffron Kahwa to intricate handicrafts, the local culture
                  feels like a warm embrace.
                </p>
              </div>
            </div>
          </motion.div>

          {/* BLOCK 3: Romantic Escapes (1x1) */}
          <motion.div
            variants={itemVariants}
            className="group relative min-w-[72vw] sm:min-w-0 min-h-[240px] sm:min-h-[220px] overflow-hidden rounded-[24px] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-500 isolate snap-center shrink-0"
          >
            <img
              src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=1000&auto=format&fit=crop"
              alt="Romantic Escapes"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

            {/* Floating Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full text-white text-[10px] uppercase tracking-wider font-semibold shadow-xl">
                Perfect for Honeymoons
              </span>
            </div>

            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end z-10">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-rose-300" />
                <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight">
                  Romantic Escapes
                </h3>
              </div>
              <p className="text-slate-300 text-sm line-clamp-2">
                Cozy retreats and secluded corners for unforgettable moments.
              </p>
            </div>
          </motion.div>

          {/* BLOCK 6: Adventure & Snow (Wide - 2x1) */}
          <motion.div
            variants={itemVariants}
            className="group relative min-w-[88vw] sm:min-w-0 sm:col-span-2 md:col-span-2 lg:row-span-1 min-h-[280px] sm:min-h-[260px] overflow-hidden rounded-[28px] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-sky-500/30 transition-all duration-500 isolate snap-center shrink-0"
          >
            <img
              src="https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=1500&auto=format&fit=crop"
              alt="Snow Adventure"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent md:hidden" />

            <div className="absolute inset-0 p-5 sm:p-6 lg:p-8 flex flex-col justify-end sm:justify-center z-10 w-full md:w-2/3">
              <div className="bg-sky-500/20 backdrop-blur-md border border-sky-400/30 w-fit p-2.5 rounded-xl text-sky-100 mb-4">
                <Snowflake className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 leading-tight">
                Thrill & Snow
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                From skiing the powdery slopes of Gulmarg to high-altitude
                treks, satisfy your craving for pure mountain adventure.
              </p>
            </div>
          </motion.div>

          {/* BLOCK 5: Family Experiences (Wide - 2x1) */}
          <motion.div
            variants={itemVariants}
            className="group relative min-w-[88vw] sm:min-w-0 sm:col-span-2 md:col-span-2 lg:row-span-1 min-h-[280px] sm:min-h-[260px] overflow-hidden rounded-[28px] cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-sky-400/20 transition-all duration-500 isolate snap-center shrink-0"
          >
            <img
              src="https://www.easeindiatrip.com/blog/wp-content/uploads/2024/12/Kashmir-trip-with-Family-1024x585.jpg"
              alt="Family Vacations"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

            <div className="absolute inset-0 p-5 sm:p-6 lg:p-8 flex flex-col justify-end z-10">
              <div className="flex items-center gap-3 mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Users className="w-5 h-5 text-sky-300" />
                <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight">
                  Family Joy
                </h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm opacity-100 sm:opacity-0 h-auto sm:h-0 sm:group-hover:opacity-100 sm:group-hover:h-auto transition-all duration-300 ease-out">
                Create lifelong memories with safe, comfortable, and tailored
                experiences that every generation will cherish.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
