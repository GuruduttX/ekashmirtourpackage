"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, HelpCircle, ChevronDown, MapPin } from "lucide-react";

// --- Types & Data ---

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "When is the absolute best time to visit Kashmir?",
    answer:
      "Spring (March to early May) offers blooming tulip gardens, while Autumn (September to November) provides stunning golden Chinar landscapes. Winter (December to February) is the go-to for snow lovers and skiing in Gulmarg.",
  },
  {
    id: 2,
    question: "Do I need a special travel permit to visit?",
    answer:
      "Indian nationals do not require permits for major tourist hubs like Srinagar, Gulmarg, and Pahalgam. Foreign nationals must register upon arrival. Areas near the border (like Gurez or Teetwal) may require a pass from local authorities.",
  },
  {
    id: 3,
    question: "What should I pack for a winter expedition?",
    answer:
      "Pack heavy thermals, fleece-lined waterproof jackets, snow boots with good grip, and insulated gloves. Temperatures regularly drop below freezing in higher altitudes, so layered clothing is critical.",
  },
  {
    id: 4,
    question: "Is altitude sickness common in Kashmir?",
    answer:
      "Most of the main valley, including Srinagar, is at a moderate altitude where sickness is rare. However, if you travel up to Gulmarg's Phase 2 or Sonamarg, take it slow, stay hydrated, and allow your body a day to acclimatize.",
  },
];

// --- Animation Variants ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
};

// --- Components ---

export default function KashmirFAQ() {
  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const [expandedMobileId, setExpandedMobileId] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModalId]);

  const handleCardClick = (faq: FAQ) => {
    if (window.innerWidth >= 1024) {
      // Desktop: Open Modal
      setActiveModalId(faq.id);
    } else {
      // Mobile: Toggle Accordion
      setExpandedMobileId((prev) => (prev === faq.id ? null : faq.id));
    }
  };

  const activeFAQ = faqs.find((f) => f.id === activeModalId);

  return (
    <section className="relative overflow-hidden py-10 md:py-20 lg:py-32 px-6 lg:px-12 bg-sky-50 font-sans">
      {/* --- SVG Wave Background (Desktop Only) --- */}
      <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none opacity-40">
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          className="w-[120%] h-64 text-sky-300 drop-shadow-sm"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            d="M -100 150 C 200 50, 400 250, 720 150 C 1040 50, 1200 250, 1540 150"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
            d="M -100 170 C 250 80, 350 220, 720 170 C 1090 120, 1200 280, 1540 170"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
        </svg>
      </div>

      {/* --- Header --- */}
      <div className="relative z-10 max-w-2xl mx-auto text-center mb-16 lg:mb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100/80 text-sky-700 font-medium text-sm mb-6 border border-sky-200"
        >
          <MapPin size={16} />
          <span>Plan Your Journey</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight"
        >
          Frequently Asked Questions
        </motion.h2>
      </div>

      {/* --- FAQ Container --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6 lg:gap-8 w-full max-w-7xl mx-auto"
      >
        {faqs.map((faq, index) => {
          const isExpanded = expandedMobileId === faq.id;
          const isDesktopActive = activeModalId === faq.id;

          return (
            <motion.div
              key={faq.id}
              variants={cardVariants}
              className={`w-full max-w-xl lg:max-w-none lg:w-72 flex-shrink-0 transition-transform duration-700 ease-out 
                ${index % 2 === 0 ? "lg:-translate-y-12" : "lg:translate-y-12"}
              `}
            >
              <div
                onClick={() => handleCardClick(faq)}
                className={`
                  relative group cursor-pointer overflow-hidden
                  bg-white/70 backdrop-blur-xl border 
                  rounded-3xl p-6 lg:p-8 transition-all duration-300
                  ${
                    isDesktopActive
                      ? "border-sky-400 shadow-[0_10px_40px_rgba(56,189,248,0.4)] scale-[1.02]"
                      : "border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(56,189,248,0.3)] hover:border-sky-200"
                  }
                `}
              >
                {/* Index Background Number */}
                <div className="absolute -top-4 -right-2 text-[80px] font-black text-sky-100 opacity-40 group-hover:text-sky-200 transition-colors pointer-events-none select-none">
                  0{index + 1}
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div className="bg-sky-100 text-sky-500 p-2 rounded-xl mb-4 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                      <HelpCircle size={20} strokeWidth={2.5} />
                    </div>
                    {/* Mobile toggle icon */}
                    <div className="lg:hidden text-sky-400">
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={24} />
                      </motion.div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-sky-900 transition-colors">
                    {faq.question}
                  </h3>

                  {/* Desktop visual prompt */}
                  <div className="hidden lg:block mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-semibold text-sky-500 flex items-center gap-2">
                      Read answer{" "}
                      <ChevronDown size={16} className="-rotate-90" />
                    </span>
                  </div>

                  {/* Mobile Answer Accordion */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden overflow-hidden"
                      >
                        <p className="mt-4 text-sm text-slate-600 leading-relaxed pb-2 border-t border-sky-100 pt-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* --- Desktop Modal --- */}
      <AnimatePresence>
        {activeModalId !== null && activeFAQ && (
          <div className="fixed inset-0 z-50 hidden lg:flex items-center justify-center p-6">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalId(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            >
              <button
                onClick={() => setActiveModalId(null)}
                className="absolute top-6 right-6 p-2.5 bg-sky-50/50 hover:bg-sky-100 rounded-full text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-sky-100 text-sky-500 rounded-2xl">
                <HelpCircle size={24} strokeWidth={2.5} />
              </div>

              <h3 className="text-2xl font-extrabold text-slate-800 mb-4 leading-tight">
                {activeFAQ.question}
              </h3>

              <p className="text-lg text-slate-600 leading-relaxed">
                {activeFAQ.answer}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
