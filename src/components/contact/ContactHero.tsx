"use client";

import React from "react";
import { motion, Variants, TargetAndTransition } from "framer-motion";
import {
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  Users,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function ContactHero() {
  // Framer Motion Variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  const floatAnimation = (
    delay: number = 0,
    duration: number = 5,
  ): TargetAndTransition => ({
    y: [0, -15, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  });

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50">
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="https://images.unsplash.com/photo-1622308644420-b20142dfbe3c?q=80&w=2000&auto=format&fit=crop"
          alt="Dal Lake Kashmir"
          className="w-full h-full object-cover origin-center"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/45 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-900/20 z-10" />

        {/* Atmospheric Glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-[120px] z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[100px] z-10 pointer-events-none" />

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.06] mix-blend-overlay z-10 pointer-events-none" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT SIDE: Editorial Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Overline */}
            <motion.div variants={fadeUpVariant} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-100/70 bg-white/15 backdrop-blur-xl text-sky-100 uppercase tracking-[0.22em] text-xs font-bold shadow-[0_10px_30px_rgba(14,165,233,0.12)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                Luxury Kashmir Experiences
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeUpVariant}
              className="text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight mb-8 drop-shadow-lg drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
            >
              Let Kashmir <br className="hidden sm:block" />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-100">
                Craft Your Next Memory
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUpVariant}
              className="text-slate-200/90 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl font-light drop-shadow-md"
            >
              From secluded heritage houseboats on misty lakes to private
              journeys through snow-draped pine valleys. Connect with our local
              experts to curate an unforgettable, deeply personalized escape.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUpVariant}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
            >
              <button className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400 text-white font-semibold shadow-[0_20px_50px_rgba(14,165,233,0.22)] hover:shadow-[0_25px_60px_rgba(14,165,233,0.28)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                Start Planning Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/15 hover:border-sky-200/40 hover:-translate-y-1 transition-all duration-300">
                Talk to a Travel Expert
              </button>
            </motion.div>

            {/* Quick Contact Pills */}
            <motion.div
              variants={fadeUpVariant}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <span className="text-sm text-sky-100/80 font-medium mr-2 uppercase tracking-widest">
                Connect:
              </span>

              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-medium hover:bg-white/15 hover:border-sky-200/40 transition-all duration-300 group"
              >
                <MessageCircle className="w-4 h-4 text-sky-300 group-hover:scale-110 transition-transform" />{" "}
                WhatsApp
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-medium hover:bg-white/15 hover:border-sky-200/40 transition-all duration-300 group"
              >
                <Phone className="w-4 h-4 text-sky-300 group-hover:scale-110 transition-transform" />{" "}
                Call
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-medium hover:bg-white/15 hover:border-sky-200/40 transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />{" "}
                Email
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Floating Trust Elements (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-5 relative h-full min-h-[500px]">
            {/* Floating Card 1 */}
            <motion.div
              animate={floatAnimation(0, 6)}
              className="absolute top-10 right-4 w-64 p-5 rounded-3xl bg-white/12 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(14,165,233,0.16)] z-30 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-sky-400/20 text-sky-200">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">10,000+</h4>
                  <p className="text-sky-200/80 text-xs font-medium uppercase tracking-wider">
                    Happy Travelers
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={floatAnimation(1.5, 5)}
              className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-72 p-5 rounded-3xl bg-white/12 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(14,165,233,0.16)] z-20 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cyan-400/20 text-cyan-200">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    24/7 Assistance
                  </h4>
                  <p className="text-cyan-200/80 text-xs font-medium uppercase tracking-wider">
                    Always By Your Side
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 3 */}
            <motion.div
              animate={floatAnimation(0.8, 5.5)}
              className="absolute bottom-12 right-12 w-60 p-5 rounded-3xl bg-white/12 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(14,165,233,0.16)] z-10 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-sky-400/20 text-sky-200">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Local Experts
                  </h4>
                  <p className="text-cyan-200/80 text-xs font-medium uppercase tracking-wider">
                    Authentic Experiences
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs text-sky-100/70 uppercase tracking-[0.2em] font-medium">
          Scroll to Discover
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-sky-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
