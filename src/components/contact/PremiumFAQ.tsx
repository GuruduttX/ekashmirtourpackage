"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronDown,
  MessageCircle,
  PhoneCall,
  Clock,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

// --- FAQ Data ---
const faqs = [
  {
    question: "What is the best time to visit Kashmir?",
    answer:
      "Kashmir is a mesmerizing year-round destination. Spring (March to early May) offers blooming tulip gardens. Summer (May to August) is perfect for alpine meadows and pleasant weather. Autumn (September to November) transforms the valley into golden hues of Chinar leaves, while Winter (December to February) is a paradise for snow lovers and skiing in Gulmarg.",
  },
  {
    question: "Is Kashmir safe for tourists?",
    answer:
      "Absolutely. Kashmir is incredibly safe for tourists. The local hospitality, known as 'Kashmiriyat', ensures that guests are treated with the utmost respect and warmth. Our dedicated team is also available 24/7 to guarantee a secure and seamless experience.",
  },
  {
    question: "Do you offer fully customized itineraries?",
    answer:
      "Yes, every journey we craft is fully personalized. Whether you prefer a slow-paced romantic retreat or an action-packed adventure, our travel concierges will design an itinerary tailored precisely to your pace, preferences, and budget.",
  },
  {
    question: "Are luxury honeymoon packages available?",
    answer:
      "We specialize in luxury honeymoon escapes. We arrange exclusive experiences such as private shikara rides at dawn, romantic candlelight dinners on heritage houseboats, and secluded stays in premium mountain resorts.",
  },
  {
    question: "Do you have family-friendly tour options?",
    answer:
      "Yes, we offer thoughtfully designed family packages. We select child-friendly luxury accommodations, ensure safe and comfortable private transport, and include activities that guests of all ages can enjoy together without feeling rushed.",
  },
  {
    question: "What is typically included in your packages?",
    answer:
      "Our premium packages typically include handpicked luxury accommodations, private chauffeur-driven transfers, daily breakfast and dinner, verified local guides, and all necessary travel permits. Domestic flights can also be included upon request.",
  },
  {
    question: "How early should I book my Kashmir trip?",
    answer:
      "For peak seasons like Spring (Tulip Festival) and Winter (Snowfall), we highly recommend booking at least 2 to 3 months in advance to secure the finest heritage houseboats and premium mountain-view rooms before they sell out.",
  },
  {
    question: "Do you provide knowledgeable local guides?",
    answer:
      "Yes. We partner exclusively with verified, highly knowledgeable local guides who share the authentic history, culture, and hidden gems of Kashmir that you simply won't find in standard guidebooks.",
  },
  {
    question: "Can I customize the hotels and stays?",
    answer:
      "Absolutely. You have complete freedom to choose your accommodations. From 100-year-old intricately carved cedar houseboats on Dal Lake to 5-star luxury resorts in Pahalgam, we will curate the perfect mix for your stay.",
  },
  {
    question: "Do you assist with airport transfers?",
    answer:
      "Yes, all our luxury itineraries include seamless, private airport meet-and-greet services. A dedicated chauffeur will be waiting for you at Srinagar Airport to ensure a smooth transition to your first destination.",
  },
];

export default function PremiumFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Framer Motion Variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  return (
    <section className="relative w-full py-24 lg:py-32 bg-gradient-to-b from-sky-50 via-white to-cyan-50 overflow-hidden">
      {/* --- CINEMATIC BACKGROUND ATMOSPHERE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Ambient Orbs */}
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-[150px] -translate-x-1/3" />
        <div className="absolute bottom-1/4 right-0 w-[700px] h-[700px] bg-cyan-400/20 rounded-full blur-[150px] translate-x-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-sky-400/20 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2" />
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
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-24"
        >
          <motion.div variants={fadeUpVariant} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-100 bg-sky-100/40 backdrop-blur-xl text-sky-600 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold shadow-sm">
              <HelpCircle className="w-3.5 h-3.5" />
              Travel Guidance & Support
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariant}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.15] tracking-tight mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          >
            Everything You Need Before <br className="hidden md:block" />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400">
              Your Kashmir Journey
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariant}
            className="text-slate-600 text-base sm:text-lg leading-relaxed font-light"
          >
            We believe in complete transparency and seamless planning. Explore
            answers to common questions, or connect with our luxury concierges
            for personalized guidance.
          </motion.p>
        </motion.div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT SIDE: FAQ Accordions */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-8 flex flex-col gap-4 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/15 before:to-transparent before:pointer-events-none relative"
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  variants={fadeUpVariant}
                  className={`group rounded-3xl backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
                    isOpen
                      ? "bg-white/75 border-sky-200 shadow-[0_10px_45px_rgba(14,165,233,0.12)]"
                      : "bg-white/70 border-sky-100 hover:bg-white/80 hover:border-sky-200 hover:shadow-[0_0_35px_rgba(14,165,233,0.08)]"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
                  >
                    <h3
                      className={`text-xl sm:text-2xl font-medium tracking-tight transition-colors duration-300 pr-8 ${
                        isOpen
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-400 font-semibold"
                          : "text-slate-800 group-hover:text-slate-900"
                      }`}
                    >
                      {faq.question}
                    </h3>
                    <div
                      className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 ${
                        isOpen
                          ? "bg-sky-100 border-sky-200 text-sky-500 shadow-[0_0_25px_rgba(14,165,233,0.14)]"
                          : "bg-white/80 border-sky-100 text-slate-400 group-hover:bg-white/90 group-hover:text-slate-800 group-hover:border-sky-200"
                      }`}
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      >
                        <div className="px-6 sm:px-8 pb-8 pt-0 text-slate-700 font-light leading-relaxed text-sm sm:text-base">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* RIGHT SIDE: Premium Support Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-white/90 to-sky-50/80 backdrop-blur-2xl border border-sky-100 shadow-[0_20px_60px_rgba(14,165,233,0.14)] overflow-hidden group before:absolute before:inset-0 before:rounded-[2.5rem] before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none"
            >
              {/* Atmospheric background within card */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-400/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

              <div className="relative z-10">
                <h3 className="text-3xl font-light text-slate-900 mb-4 tracking-tight">
                  Still Have{" "}
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400">
                    Questions?
                  </span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-light mb-8">
                  Our luxury travel concierges are ready to assist you. Let's
                  discuss your preferences and start crafting your perfect
                  Kashmir escape.
                </p>

                <div className="flex flex-col gap-4 mb-8">
                  <button className="flex items-center justify-between w-full p-4 rounded-2xl bg-sky-500/10 border border-sky-200 hover:bg-sky-500/15 hover:border-sky-300 shadow-[0_0_20px_rgba(14,165,233,0.08)] transition-all duration-300 group/btn hover:-translate-y-1">
                    <div className="flex items-center gap-3 text-cyan-500">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium text-sm tracking-wide">
                        Chat on WhatsApp
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-sky-500 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                  </button>

                  <button className="flex items-center justify-between w-full p-4 rounded-2xl bg-sky-100/40 border border-sky-100 hover:bg-sky-100/60 hover:border-sky-200 transition-all duration-300 group/btn hover:-translate-y-1">
                    <div className="flex items-center gap-3 text-cyan-500">
                      <PhoneCall className="w-5 h-5" />
                      <span className="font-medium text-sm tracking-wide">
                        Request a Call
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-sky-400 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                  </button>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/75 border border-sky-50 backdrop-blur-xl shadow-[0_6px_25px_rgba(14,165,233,0.06)]">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <p className="text-slate-700 text-xs font-light">
                    Premium Support Promise: We aim to respond to all inquiries
                    within{" "}
                    <span className="font-medium text-sky-500">30 minutes</span>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
