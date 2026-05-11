"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  MessageCircle,
  FileText,
  PhoneCall,
  Sparkles,
  Clock,
  Map,
  Users,
} from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";

export default function PremiumTravelAssistance() {
  const [isOpen, setOpen] = useState(false)
  // Framer Motion Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  const floatAnimation: any = {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-sky-50 py-20 px-6 sm:px-12 lg:px-24">
      <EnquiryPopupForm isOpen={isOpen} onClose={() => setOpen(false)} />
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-300/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-300/20 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <motion.div
        className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* LEFT SIDE: Content & Trust */}
        <motion.div variants={itemVariants} className="flex flex-col space-y-8">
          <div className="space-y-4 text-center md:text-start">
            <span className="inline-block text-sky-500 uppercase tracking-widest text-sm font-bold">
              Need Something More Personal?
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 leading-tight">
              Didn’t Find the <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
                Perfect Kashmir Package?
              </span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
              Whether you're dreaming of a secluded honeymoon, a lively family
              adventure, or a specialized group tour, our travel concierges are
              here to handcraft an itinerary perfectly suited to your pace and
              budget.
            </p>
          </div>

          {/* Trust Row */}
          <div className="flex justify-center flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-sm">
              <Clock className="w-4 h-4 text-cyan-500" />
              <span className="text-sm text-slate-700 font-medium">
                Quick responses
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-sm">
              <Users className="w-4 h-4 text-sky-500" />
              <span className="text-sm text-slate-700 font-medium">
                Local travel experts
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-sm">
              <Map className="w-4 h-4 text-sky-500" />
              <span className="text-sm text-slate-700 font-medium">
                Personalized itineraries
              </span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Floating Cards Container */}
        <motion.div
          variants={itemVariants}
          className="relative w-full h-auto lg:h-[580px] flex flex-col gap-5 lg:block"
        >
          {/* Card 1: WhatsApp (Hero Card) */}
          <motion.div
            animate={floatAnimation}
            className="w-full lg:w-[400px] bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 lg:absolute lg:top-0 lg:left-0 z-20 lg:-rotate-2 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(56,189,248,0.2)] hover:-translate-y-2 lg:hover:rotate-0 group cursor-pointer"
          >
            <div className="flex items-start gap-5">
              <div className="relative">
                <div className="bg-gradient-to-br from-sky-400 to-cyan-400 text-white p-4 rounded-2xl shadow-lg shadow-sky-400/30 group-hover:scale-105 transition-transform duration-300">
                  <MessageCircle className="w-7 h-7" />
                </div>
                {/* Pulsing Online Dot */}
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full">
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-slate-800">
                    Chat on WhatsApp
                  </h3>
                </div>
                <p className="text-slate-500 text-sm mb-4">
                  Talk directly with a Kashmir expert right now.
                </p>
                <div className="flex items-center gap-2 bg-sky-50/80 px-3 py-1.5 rounded-full w-fit border border-sky-100">
                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                  <span className="text-xs font-semibold text-sky-700">
                    Usually replies within minutes
                  </span>
                </div>
                <div className="mt-5">
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-400/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(56,189,248,0.35)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Connect Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Query Form */}
          <motion.div
            animate={{
              ...floatAnimation,
              transition: { ...floatAnimation.transition, delay: 1 },
            }}
            className="w-full lg:w-[360px] bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-5 lg:absolute lg:top-58 lg:right-0 z-30 lg:rotate-2 transition-all duration-300 shadow-[0_8px_25px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_35px_rgba(34,211,238,0.15)] hover:-translate-y-2 lg:hover:rotate-0 group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="bg-white text-cyan-500 p-3.5 rounded-2xl shadow-sm border border-cyan-50 group-hover:bg-cyan-50 transition-colors duration-300">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-md font-bold text-slate-800 mb-1">
                  Fill Travel Form
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">
                  Share your preferences, and we'll create a package tailored to
                  your exact needs.
                </p>
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-cyan-600 border border-cyan-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-50 hover:shadow-[0_10px_25px_rgba(34,211,238,0.15)]"
                >
                  Open Travel Form
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Phone Call */}
          <motion.div
            animate={{
              ...floatAnimation,
              transition: { ...floatAnimation.transition, delay: 2 },
            }}
            className="w-full lg:w-[320px] bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl p-5 lg:absolute lg:bottom-0 lg:left-10 z-10 lg:-rotate-1 transition-all duration-300 shadow-[0_8px_25px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_35px_rgba(56,189,248,0.15)] hover:-translate-y-2 lg:hover:rotate-0 group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white text-sky-500 p-3.5 rounded-2xl shadow-sm border border-sky-50 group-hover:bg-sky-50 transition-colors duration-300">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-md font-bold text-slate-800 mb-0.5">
                  Talk to Our Team
                </h3>
                <p className="text-slate-500 text-sm">
                  Prefer speaking? Call us.
                </p>
                <a
                  href="tel:+919999999999"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-400/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(56,189,248,0.35)]"
                >
                  <PhoneCall className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
