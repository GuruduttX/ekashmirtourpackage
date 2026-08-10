"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Users,
  Award,
  Heart,
} from "lucide-react";

export default function TrustShowcase() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } },
  };

  const cardClasses =
    "group rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:border-sky-300 hover:shadow-md hover:-translate-y-1";

  return (
    <section className="relative w-full py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={fadeUpVariant} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-100 bg-sky-50 text-sky-600 uppercase tracking-[0.1em] text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Trusted By Modern Travelers
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariant}
            className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-6"
          >
            Crafting Unforgettable <br className="hidden md:block" />
            <span className="text-sky-500">Kashmir Experiences</span>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold">
            <Heart className="w-4 h-4 text-sky-500" /> 500+ Honeymoon Trips
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold">
            <Users className="w-4 h-4 text-sky-500" /> Family Friendly Tours
          </span>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold">
            <Award className="w-4 h-4 text-sky-500" /> Custom Luxury Packages
          </span>
        </motion.div>

        <motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  /* Mobile: flex + scroll snap | Desktop (md+): grid layout */
  className="flex md:grid overflow-x-auto snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-6 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
>
  {/* COMMUNITY CARD */}
  <motion.div
    variants={fadeUpVariant}
    /* Mobile: takes needed space (up to 380px) | Desktop: follows grid */
    className={`flex-none w-[85vw] max-w-[380px] md:w-auto md:max-w-none snap-start lg:col-span-7 ${cardClasses} min-h-[350px] flex flex-col justify-end p-8 sm:p-10 bg-sky-50`}
  >
    <div className="relative z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 mb-6 shadow-sm">
        <Users className="w-4 h-4 text-sky-500" />
        <span className="text-slate-800 text-xs font-bold uppercase tracking-wider">
          The Community
        </span>
      </div>
      <h3 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
        10,000+ <br/> <span className="text-sky-500">Travelers</span>
      </h3>
      <p className="text-slate-600 text-base sm:text-lg font-light max-w-md">
        Trusted by travelers from across India and beyond to craft safe,
        immersive, and luxurious Kashmir escapes.
      </p>
    </div>
  </motion.div>

  {/* RATING CARD */}
  <motion.div
    variants={fadeUpVariant}
    className={`flex-none w-[85vw] max-w-[350px] md:w-auto md:max-w-none snap-start lg:col-span-5 ${cardClasses} p-8 sm:p-10 flex flex-col justify-center`}
  >
    <div className="flex items-center gap-2 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-6 h-6 fill-sky-400 text-sky-400" />
      ))}
    </div>
    <h3 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
      4.9/5
    </h3>
    <p className="text-slate-600 text-base sm:text-lg font-light">
      Average rating based on hundreds of verified reviews. Excellence
      isn't just a goal; it's our standard.
    </p>
  </motion.div>

  {/* LOCAL EXPERTS CARD */}
  <motion.div 
    variants={fadeUpVariant} 
    className={`flex-none w-[85vw] max-w-[300px] md:w-auto md:max-w-none snap-start lg:col-span-4 ${cardClasses} p-8`}
  >
    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-6 group-hover:bg-sky-100 transition-colors duration-300">
      <MapPin className="w-6 h-6 text-sky-500" />
    </div>
    <h4 className="text-xl font-bold text-slate-900 mb-3">Local Kashmir Experts</h4>
    <p className="text-slate-600 text-sm leading-relaxed font-light">
      Born and raised in the valley. We know the hidden trails, the best
      local artisans, and the secrets of real Kashmiri hospitality.
    </p>
  </motion.div>

  {/* 24/7 SUPPORT CARD */}
  <motion.div 
    variants={fadeUpVariant} 
    className={`flex-none w-[85vw] max-w-[300px] md:w-auto md:max-w-none snap-start lg:col-span-4 ${cardClasses} p-8`}
  >
    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-6 group-hover:bg-sky-100 transition-colors duration-300">
      <Clock className="w-6 h-6 text-sky-500" />
    </div>
    <h4 className="text-xl font-bold text-slate-900 mb-3">24/7 Travel Support</h4>
    <p className="text-slate-600 text-sm leading-relaxed font-light">
      From the moment you land to your departure, our dedicated
      concierge team is always available to ensure a frictionless journey.
    </p>
  </motion.div>

  {/* HANDPICKED EXPERIENCES CARD */}
  <motion.div 
    variants={fadeUpVariant} 
    className={`flex-none w-[85vw] max-w-[300px] md:w-auto md:max-w-none snap-start lg:col-span-4 ${cardClasses} p-8`}
  >
    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-6 group-hover:bg-sky-100 transition-colors duration-300">
      <Sparkles className="w-6 h-6 text-sky-500" />
    </div>
    <h4 className="text-xl font-bold text-slate-900 mb-3">Handpicked Stays</h4>
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