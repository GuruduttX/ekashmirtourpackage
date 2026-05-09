"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Coffee,
  Wind,
  Quote,
  Home,
  Sun,
} from "lucide-react";

export default function RealKashmirExperience() {
  // Entrance Animation Variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  // Continuous Floating Animation
  const floatAnimation = (delay: number, duration: number = 4) => ({
    y: [0, -12, 0],
    rotate: [0, 1, -1, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  });

  return (
    <section className="relative w-full overflow-hidden bg-sky-50 py-24 lg:py-32">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Blurred Orbs */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-300/20 rounded-full blur-[120px] -translate-y-1/4" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-300/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-amber-400/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* LEFT SIDE: Emotional Story Panel */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col max-w-2xl"
          >
            <motion.div
              variants={fadeUpVariant}
              className="mb-6 mx-auto md:mx-0"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-200/60 bg-white/40 backdrop-blur-md text-sky-600 uppercase tracking-[0.2em] text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Beyond the Mountains
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUpVariant}
              className="text-4xl text-center md:text-start md:text-5xl lg:text-6xl font-light text-slate-800 leading-[1.1] tracking-tight mb-8"
            >
              What{" "}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 drop-shadow-sm">
                Real Kashmir
              </span>{" "}
              <br /> Feels Like
            </motion.h2>

            <motion.p
              variants={fadeUpVariant}
              className="text-slate-600 text-center md:text-start text-lg leading-relaxed mb-10 font-light"
            >
              It’s more than picturesque landscapes; it’s an atmosphere you
              breathe in. It's the warmth of a morning Kahwa handed to you by a
              smiling local, the fragrant scent of cedar wood in ancient
              houseboats, and the echoing silence of snow-draped valleys at
              dawn.
              <br />
              <br />
              Kashmir isn't just a place you visit. It's a feeling that quietly
              settles into your soul, woven from peaceful shikara rides,
              blooming saffron fields, and a hospitality that feels like coming
              home.
            </motion.p>

            {/* Cinematic Quote Block */}
            <motion.div
              variants={fadeUpVariant}
              className="relative p-8 rounded-3xl bg-white/30 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-10 group"
            >
              <div className="absolute -top-3 -left-2 text-sky-200/50 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <Quote className="w-12 h-12 fill-current" />
              </div>
              <p className="relative z-10 text-xl md:text-2xl font-serif italic text-slate-700 leading-snug">
                “People may visit Kashmir for the mountains, but they remember
                it for the feeling.”
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUpVariant}>
              <div className="group flex items-center gap-3 text-sky-600 font-semibold cursor-pointer w-fit">
                <span className="relative overflow-hidden pb-1">
                  Experience Kashmir Beyond Tourism
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </span>
                <div className="p-2 rounded-full bg-sky-100 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Desktop Floating Memory Collage (Hidden on Mobile) */}
          <div className="hidden lg:block relative w-full h-[700px]">
            {/* Card 1: Large Image */}
            <motion.div
              animate={floatAnimation(0, 5)}
              className="absolute left-4 top-12 w-64 h-80 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-[6px] border-white/80 z-20 -rotate-3 hover:rotate-0 hover:z-50 hover:scale-105 transition-all duration-500 group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1735993807544-9a5ea42405ab?q=80&w=2166&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Shikara Ride"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </motion.div>

            {/* Card 2: Mini Story Card */}
            <motion.div
              animate={floatAnimation(1.5, 4.5)}
              className="absolute right-8 top-8 w-60 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-xl z-30 rotate-3 hover:rotate-0 hover:z-50 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              <Wind className="w-6 h-6 text-cyan-500 mb-4" />
              <p className="text-slate-700 font-medium italic leading-relaxed text-sm">
                "The golden silence near Dal Lake at sunrise feels entirely
                unreal."
              </p>
            </motion.div>

            {/* Card 3: Large Secondary Image */}
            <motion.div
              animate={floatAnimation(0.8, 6)}
              className="absolute right-12 bottom-12 w-72 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 z-10 rotate-6 hover:rotate-0 hover:z-50 hover:scale-105 transition-all duration-500 group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=800&auto=format&fit=crop"
                alt="Kashmiri Culture"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay" />
            </motion.div>

            {/* Card 4: Culture Detail (Kahwa) */}
            <motion.div
              animate={floatAnimation(2.2, 5.5)}
              className="absolute left-16 bottom-24 w-52 p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-lg z-40 -rotate-6 hover:rotate-0 hover:z-50 hover:-translate-y-2 transition-all duration-500 flex items-center gap-4 cursor-pointer"
            >
              <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-slate-800 font-bold text-sm">
                  Kashmiri Kahwa
                </h4>
                <p className="text-slate-500 text-xs">Warm saffron notes</p>
              </div>
            </motion.div>

            {/* Card 5: Ambient Detail (Houseboat) */}
            <motion.div
              animate={floatAnimation(3, 4)}
              className="absolute left-[40%] top-[45%] w-48 p-4 rounded-2xl bg-sky-900/80 backdrop-blur-xl border border-sky-400/30 shadow-[0_0_30px_rgba(14,165,233,0.2)] z-30 rotate-2 hover:rotate-0 hover:z-50 hover:scale-105 transition-all duration-500 flex flex-col items-start cursor-pointer group"
            >
              <Home className="w-5 h-5 text-sky-300 mb-2" />
              <p className="text-sky-50 text-xs font-medium leading-snug">
                Waking up to the scent of ancient cedar wood homes.
              </p>
            </motion.div>
          </div>
        </div>

        {/* --- MOBILE CAROUSEL (Hidden on Desktop) --- */}
        <div className="lg:hidden mt-16 -ml-6 w-[100vw] no-scrollbar">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 px-6 pb-12 scrollbar-hide">
            {/* Mobile Card 1 */}
            <div className="w-[85vw] max-w-[320px] shrink-0 snap-center">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1735993807544-9a5ea42405ab?q=80&w=2166&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Shikara"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Quote className="w-5 h-5 text-sky-300 mb-2" />
                  <p className="text-white font-medium italic text-sm">
                    "The golden silence near Dal Lake at sunrise feels entirely
                    unreal."
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Card 2 (Text Card - Fixed) */}
            <div className="w-[85vw] max-w-[320px] shrink-0 snap-center">
              <div className="h-80 p-6 sm:p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-lg flex flex-col justify-center items-center text-center">
                <Coffee className="w-8 h-8 text-amber-500 mb-5" />
                <h4 className="text-xl font-bold text-slate-800 mb-3">
                  Warm Hospitality
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Sipping hot saffron Kahwa as locals welcome you into their
                  homes like family.
                </p>
              </div>
            </div>

            {/* Mobile Card 3 */}
            <div className="w-[85vw] max-w-[320px] shrink-0 snap-center">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=800&auto=format&fit=crop"
                  alt="Culture"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Sun className="w-5 h-5 text-amber-300 mb-2" />
                  <p className="text-white font-medium text-sm">
                    Wandering through vibrant markets wrapped in the colors of
                    real Kashmiri culture.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Card 4 (Text Card - Fixed) */}
            <div className="w-[85vw] max-w-[320px] shrink-0 snap-center">
              <div className="h-80 p-6 sm:p-8 rounded-3xl bg-sky-900/80 backdrop-blur-xl border border-sky-400/30 shadow-lg flex flex-col justify-center items-center text-center">
                <Home className="w-8 h-8 text-sky-300 mb-5" />
                <h4 className="text-xl font-bold text-white mb-3">
                  Cedar Homes
                </h4>
                <p className="text-sky-100 text-sm leading-relaxed">
                  Waking up to the gentle rocking of ancient carved wood
                  houseboats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
