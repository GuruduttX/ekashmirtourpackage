"use client";

import React, { useState } from "react";
import { motion, Variants, TargetAndTransition } from "framer-motion";
import {
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
  Users,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";
import { whatsappLink, WHATSAPP_TEL } from "@/lib/whatsapp";
import { mailtoLink } from "@/lib/contact";

/** Shared styling for the three "Connect:" chips. */
const chipClass =
  "flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 text-sm font-semibold hover:border-sky-300 hover:text-sky-500 transition-all duration-300";

export default function ContactHero() {
  const [isEnquiryOpen, setEnquiryOpen] = useState(false);
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
    y: [0, -10, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  });

  return (
    <>
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white">
      
      {/* BACKGROUND MOUNTAINS SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0 pointer-events-none flex items-end">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto min-h-[250px] object-cover opacity-80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Back Mountain Layer (sky-50) */}
          <path
            fill="#f0f9ff"
            fillOpacity="1"
            d="M0,256L144,224L288,288L432,160L576,224L720,128L864,192L1008,96L1152,160L1296,64L1440,128L1440,320L1296,320L1152,320L1008,320L864,320L720,320L576,320L432,320L288,320L144,320L0,320Z"
          ></path>
          {/* Front Mountain Layer (sky-100) */}
          <path
            fill="#e0f2fe"
            fillOpacity="0.7"
            d="M0,320L144,256L288,320L432,192L576,256L720,160L864,224L1008,128L1152,192L1296,96L1440,160L1440,320L1296,320L1152,320L1008,320L864,320L720,320L576,320L432,320L288,320L144,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.div variants={fadeUpVariant} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-100 bg-white/80 backdrop-blur-sm text-sky-600 uppercase tracking-[0.1em] text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                Luxury Kashmir Experiences
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariant}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-8"
            >
              Let Kashmir <br className="hidden sm:block" />
              <span className="text-sky-500">
                Craft Your Next Memory
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariant}
              className="text-slate-600 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl font-light"
            >
              From secluded heritage houseboats on misty lakes to private
              journeys through snow-draped pine valleys. Connect with our local
              experts to curate an unforgettable, deeply personalized escape.
            </motion.p>

            <motion.div
              variants={fadeUpVariant}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
            >
              <button
                type="button"
                onClick={() => setEnquiryOpen(true)}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sky-500 text-white font-bold shadow-md hover:bg-sky-600 hover:-translate-y-1 transition-all duration-300"
              >
                Start Planning Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              variants={fadeUpVariant}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <span className="text-sm text-slate-500 font-bold mr-2 uppercase tracking-widest">
                Connect:
              </span>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={chipClass}
              >
                <MessageCircle className="w-4 h-4 text-sky-500" /> WhatsApp
              </a>
              <a href={`tel:${WHATSAPP_TEL}`} className={chipClass}>
                <Phone className="w-4 h-4 text-sky-500" /> Call
              </a>
              <a
                href={mailtoLink("Kashmir trip enquiry")}
                className={chipClass}
              >
                <Mail className="w-4 h-4 text-sky-500" /> Email
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Floating Trust Elements */}
          <div className="hidden lg:block lg:col-span-5 relative h-full min-h-[500px]">
            <motion.div
              animate={floatAnimation(0, 6)}
              className="absolute top-10 right-4 w-64 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-lg z-30"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-sky-50 text-sky-500">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg">10,000+</h4>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    Happy Travelers
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={floatAnimation(1.5, 5)}
              className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-72 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-lg z-20"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-sky-50 text-sky-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg">
                    24/7 Assistance
                  </h4>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    Always By Your Side
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={floatAnimation(0.8, 5.5)}
              className="absolute bottom-12 right-12 w-60 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-lg z-10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-sky-50 text-sky-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg">
                    Local Experts
                  </h4>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                    Authentic Experiences
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    {/* Outside the overflow-hidden section so the fixed overlay is never clipped. */}
    <EnquiryPopupForm
      isOpen={isEnquiryOpen}
      onClose={() => setEnquiryOpen(false)}
    />
    </>
  );
}