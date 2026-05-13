"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  HeartHandshake,
  Compass,
  Users,
  Sparkles,
  Award,
  Heart,
} from "lucide-react";

export default function TrustShowcase() {
  // Framer Motion Variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const fadeUpVariant:Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  const glassCardClasses =
    "group relative rounded-3xl bg-white/65 backdrop-blur-2xl border border-sky-100 shadow-[0_20px_60px_rgba(14,165,233,0.14)] overflow-hidden transition-all duration-500 hover:border-sky-200 hover:shadow-[0_0_50px_rgba(14,165,233,0.10)] hover:-translate-y-1 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/15 before:to-transparent before:pointer-events-none";

  return (
    <section className="relative w-full py-24 lg:py-32 bg-gradient-to-b from-sky-50 via-white to-cyan-50 overflow-hidden">
      {/* --- CINEMATIC BACKGROUND ATMOSPHERE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Ambient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-[140px] -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[120px] translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-sky-300/10 rounded-full blur-[180px] -translate-x-1/2 -translate-y-1/2" />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* --- SECTION HEADER --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          <motion.div variants={fadeUpVariant} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-100 bg-sky-100/50 text-sky-600 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Trusted By Modern Travelers
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariant}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.15] tracking-tight mb-6 drop-shadow-sm drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          >
            Crafting Unforgettable <br className="hidden md:block" />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400">
              Kashmir Experiences
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariant}
            className="text-slate-600 text-base sm:text-lg leading-relaxed font-light"
          >
            We blend deep local expertise with premium planning to deliver
            journeys that are seamless, authentic, and uniquely yours. Your
            peace of mind is our highest priority.
          </motion.p>
        </motion.div>

        {/* --- MINI SOCIAL PROOF PILLS --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-sky-100 text-slate-700 text-xs font-medium backdrop-blur-xl shadow-[0_6px_25px_rgba(14,165,233,0.06)] hover:shadow-[0_0_25px_rgba(14,165,233,0.08)] transition-all duration-300">
            <Heart className="w-3.5 h-3.5 text-rose-400" /> 500+ Honeymoon Trips
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-sky-100 text-slate-700 text-xs font-medium backdrop-blur-xl shadow-[0_6px_25px_rgba(14,165,233,0.06)] hover:shadow-[0_0_25px_rgba(14,165,233,0.08)] transition-all duration-300">
            <Users className="w-3.5 h-3.5 text-sky-500" /> Family Friendly Tours
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-sky-100 text-slate-700 text-xs font-medium backdrop-blur-xl shadow-[0_6px_25px_rgba(14,165,233,0.06)] hover:shadow-[0_0_25px_rgba(14,165,233,0.08)] transition-all duration-300">
            <Award className="w-3.5 h-3.5 text-cyan-400" /> Custom Luxury
            Packages
          </span>
        </motion.div>

        {/* --- MAIN TRUST GRID --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8"
        >
          {/* FEATURED LARGE CARD (Spans 7 columns on Desktop) */}
          <motion.div
            variants={fadeUpVariant}
            className={`lg:col-span-7 ${glassCardClasses} min-h-[350px] sm:min-h-[400px] flex flex-col justify-end p-8 sm:p-10`}
          >
            {/* Cinematic Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1600&auto=format&fit=crop"
                alt="Kashmir Landscape"
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent" />
              <div className="absolute inset-0 bg-sky-900/20 mix-blend-overlay" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-xl border border-white/15 mb-6">
                <Users className="w-4 h-4 text-cyan-300" />
                <span className="text-sky-100 text-xs font-semibold uppercase tracking-wider">
                  The Community
                </span>
              </div>
              <h3 className="text-4xl sm:text-5xl font-light text-white mb-4 tracking-tight">
                10,000+{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-200">
                  Travelers
                </span>
              </h3>
              <p className="text-slate-200 text-base sm:text-lg font-light max-w-md">
                Trusted by travelers from across India and beyond to craft safe,
                immersive, and luxurious Kashmir escapes.
              </p>
            </div>
          </motion.div>

          {/* RATING CARD (Spans 5 columns on Desktop) */}
          <motion.div
            variants={fadeUpVariant}
            className={`lg:col-span-5 ${glassCardClasses} p-8 sm:p-10 flex flex-col justify-center`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-cyan-300 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]"
                />
              ))}
            </div>
            <h3 className="text-4xl sm:text-5xl font-semibold text-slate-900 mb-4 tracking-tight">
              4.9/5
            </h3>
            <p className="text-slate-600 text-base sm:text-lg font-light">
              Average rating based on hundreds of verified reviews. Excellence
              isn't just a goal; it's our standard.
            </p>
          </motion.div>

          {/* LOCAL EXPERTS CARD (Spans 4 columns) */}
          <motion.div
            variants={fadeUpVariant}
            className={`lg:col-span-4 ${glassCardClasses} p-8`}
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-400/15 border border-sky-100 flex items-center justify-center mb-6 group-hover:bg-sky-400/25 transition-colors duration-300">
              <MapPin className="w-6 h-6 text-cyan-500" />
            </div>
            <h4 className="text-xl font-semibold text-slate-900 mb-3">
              Local Kashmir Experts
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              Born and raised in the valley. We know the hidden trails, the best
              local artisans, and the secrets of real Kashmiri hospitality.
            </p>
          </motion.div>

          {/* 24/7 SUPPORT CARD (Spans 4 columns) */}
          <motion.div
            variants={fadeUpVariant}
            className={`lg:col-span-4 ${glassCardClasses} p-8`}
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/15 border border-sky-100 flex items-center justify-center mb-6 group-hover:bg-cyan-400/25 transition-colors duration-300">
              <Clock className="w-6 h-6 text-cyan-500" />
            </div>
            <h4 className="text-xl font-semibold text-slate-900 mb-3">
              24/7 Travel Support
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              From the moment you land to your departure, our dedicated
              concierge team is always available to ensure a frictionless
              journey.
            </p>
          </motion.div>

          {/* HANDPICKED EXPERIENCES CARD (Spans 4 columns) */}
          <motion.div
            variants={fadeUpVariant}
            className={`lg:col-span-4 ${glassCardClasses} p-8`}
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-400/15 border border-sky-100 flex items-center justify-center mb-6 group-hover:bg-sky-400/25 transition-colors duration-300">
              <Sparkles className="w-6 h-6 text-sky-500" />
            </div>
            <h4 className="text-xl font-semibold text-slate-900 mb-3">
              Handpicked Stays
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              We personally verify every luxury houseboat, boutique hotel, and
              premium resort before adding it to your personalized itinerary.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
