"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  PhoneCall,
  Clock,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const faqs = [
  {
    question: "What is the best time to visit Kashmir?",
    answer: "Kashmir is a mesmerizing year-round destination. Spring (March to early May) offers blooming tulip gardens. Summer (May to August) is perfect for alpine meadows and pleasant weather. Autumn (September to November) transforms the valley into golden hues of Chinar leaves, while Winter (December to February) is a paradise for snow lovers and skiing in Gulmarg.",
  },
  {
    question: "Is Kashmir safe for tourists?",
    answer: "Absolutely. Kashmir is incredibly safe for tourists. The local hospitality, known as 'Kashmiriyat', ensures that guests are treated with the utmost respect and warmth. Our dedicated team is also available 24/7 to guarantee a secure and seamless experience.",
  },
  {
    question: "Do you offer fully customized itineraries?",
    answer: "Yes, every journey we craft is fully personalized. Whether you prefer a slow-paced romantic retreat or an action-packed adventure, our travel concierges will design an itinerary tailored precisely to your pace, preferences, and budget.",
  },
  {
    question: "Are luxury honeymoon packages available?",
    answer: "We specialize in luxury honeymoon escapes. We arrange exclusive experiences such as private shikara rides at dawn, romantic candlelight dinners on heritage houseboats, and secluded stays in premium mountain resorts.",
  },
  {
    question: "Do you have family-friendly tour options?",
    answer: "Yes, we offer thoughtfully designed family packages. We select child-friendly luxury accommodations, ensure safe and comfortable private transport, and include activities that guests of all ages can enjoy together without feeling rushed.",
  },
  {
    question: "What is typically included in your packages?",
    answer: "Our premium packages typically include handpicked luxury accommodations, private chauffeur-driven transfers, daily breakfast and dinner, verified local guides, and all necessary travel permits. Domestic flights can also be included upon request.",
  },
  {
    question: "How early should I book my Kashmir trip?",
    answer: "For peak seasons like Spring (Tulip Festival) and Winter (Snowfall), we highly recommend booking at least 2 to 3 months in advance to secure the finest heritage houseboats and premium mountain-view rooms before they sell out.",
  },
  {
    question: "Do you provide knowledgeable local guides?",
    answer: "Yes. We partner exclusively with verified, highly knowledgeable local guides who share the authentic history, culture, and hidden gems of Kashmir that you simply won't find in standard guidebooks.",
  },
  {
    question: "Can I customize the hotels and stays?",
    answer: "Absolutely. You have complete freedom to choose your accommodations. From 100-year-old intricately carved cedar houseboats on Dal Lake to 5-star luxury resorts in Pahalgam, we will curate the perfect mix for your stay.",
  },
  {
    question: "Do you assist with airport transfers?",
    answer: "Yes, all our luxury itineraries include seamless, private airport meet-and-greet services. A dedicated chauffeur will be waiting for you at Srinagar Airport to ensure a smooth transition to your first destination.",
  },
];

export default function PremiumFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } },
  };

  return (
    <section className="relative w-full py-2 lg:py-6 bg-white overflow-hidden">
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
              <HelpCircle className="w-3.5 h-3.5" />
              Travel Guidance & Support
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariant}
            className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-6"
          >
            Everything You Need Before <br className="hidden md:block" />
            <span className="text-sky-500">Your Kashmir Journey</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* FAQ Accordions */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-8 flex flex-col gap-4"
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  variants={fadeUpVariant}
                  className={`group rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? "bg-white border-sky-300 shadow-sm" : "bg-white border-slate-200 hover:border-sky-300"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <h3 className={`text-base md:text-lg font-bold transition-colors duration-300 pr-8 ${isOpen ? "text-sky-500" : "text-slate-900"}`}>
                      {faq.question}
                    </h3>
                    <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded border transition-all duration-300 ${isOpen ? "bg-sky-50 border-sky-200 text-sky-500" : "bg-slate-50 border-slate-200 text-slate-400 group-hover:border-sky-200 group-hover:text-sky-500"}`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-0 text-slate-600 font-light leading-relaxed text-sm">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Premium Support Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm"
            >
              <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                Still Have <span className="text-sky-500">Questions?</span>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-light mb-8">
                Our luxury travel concierges are ready to assist you. Let's
                discuss your preferences and start crafting your perfect
                Kashmir escape.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                <button className="flex items-center justify-between w-full p-4 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-all duration-300 group/btn shadow-md hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-bold text-sm">Chat on WhatsApp</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                </button>

                <button className="flex items-center justify-between w-full p-4 rounded-xl bg-white border border-slate-200 text-slate-900 hover:border-sky-500 hover:text-sky-500 transition-all duration-300 group/btn hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-5 h-5 text-sky-500" />
                    <span className="font-bold text-sm">Request a Call</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-500 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                </button>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <Clock className="w-5 h-5 text-sky-500 shrink-0" />
                <p className="text-slate-700 text-xs font-light">
                  Premium Support Promise: We aim to respond to all inquiries within{" "}
                  <span className="font-bold text-sky-500">30 minutes</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}