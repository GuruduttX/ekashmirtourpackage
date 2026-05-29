"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  HelpCircle,
  MapPin,
} from "lucide-react";

export default function FAQPreview() {
  const [openId, setOpenId] = React.useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqs = [
    {
      id: 1,
      question: "What is the LNAT and why is it important?",
      answer:
        "The LNAT (Law National Aptitude Test) is a standardized admissions test used by several UK universities to assess aptitude for law studies. It tests critical thinking, comprehension, and argumentative skills.",
    },
    {
      id: 2,
      question: "When should I start preparing for Oxbridge law applications?",
      answer:
        "Begin your preparation at least a year in advance. This includes practicing LNAT questions, refining your personal statement, and preparing for interviews.",
    },
    {
      id: 3,
      question: "How does the UCAS application timeline work?",
      answer:
        "UCAS applications for law courses typically open in September and close by mid-October for Oxbridge and medicine. Early preparation is crucial to meet these deadlines.",
    },
    {
      id: 4,
      question: "Are there specific essay tips for the LNAT?",
      answer:
        "Yes, focus on structuring your essay clearly, presenting balanced arguments, and demonstrating critical analysis rather than memorized facts.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="relative overflow-hidden py-14 md:py-20 lg:py-28 px-6 lg:px-12 bg-[#FDFBF7] border-y border-[#0D1B3E]/6">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 h-[420px] w-[420px] rounded-full bg-[#C9A84C]/6 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-[#0D1B3E]/5 blur-3xl" />
      </div>

      {/* Editorial Wave Accent */}
      <div className="absolute inset-0 hidden lg:flex items-center justify-center opacity-30 pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-[120%] h-72 text-[#C9A84C]/50"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
            d="M -100 160 C 220 80, 420 260, 720 160 C 1020 60, 1210 260, 1540 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 0.9, opacity: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.3 }}
            d="M -100 190 C 260 110, 380 240, 720 190 C 1060 140, 1230 280, 1540 190"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="8 10"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#F7F3EC] px-4 py-2 text-sm font-medium text-[#8C6A1F] mb-6"
          >
            <MapPin size={16} />
            <span>Admissions Guidance</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[3.4rem] font-serif tracking-[-0.04em] text-[#0D1B3E] leading-[0.95]"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-[15px] md:text-base text-[#44506B] leading-8 max-w-2xl mx-auto"
          >
            Clear, structured answers covering the LNAT, UCAS applications,
            Oxbridge admissions timelines, and the broader UK law school
            application process for Indian students.
          </motion.p>
        </div>

        {/* FAQ Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-5 md:gap-6"
        >
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="group"
              >
                <div
                  className={`relative overflow-hidden rounded-[28px] border backdrop-blur-xl transition-all duration-500 ${
                    isOpen
                      ? "border-[#C9A84C]/35 bg-white shadow-[0_20px_60px_rgba(13,27,62,0.08)]"
                      : "border-[#0D1B3E]/8 bg-white/90 hover:border-[#C9A84C]/25 hover:shadow-[0_15px_50px_rgba(13,27,62,0.06)]"
                  }`}
                >
                  {/* Decorative Number */}
                  <div className="absolute -top-5 right-2 text-[88px] md:text-[110px] font-black leading-none text-[#C9A84C]/6 select-none pointer-events-none transition-colors duration-500 group-hover:text-[#C9A84C]/10">
                    {faq.id}
                  </div>

                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="relative z-10 w-full text-left px-6 md:px-8 py-6 md:py-8"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-start gap-5 md:gap-6 max-w-4xl">
                        <div
                          className={`shrink-0 rounded-2xl p-3 transition-all duration-300 ${
                            isOpen
                              ? "bg-[#0D1B3E] text-white"
                              : "bg-[#F7F3EC] text-[#C9A84C] group-hover:bg-[#0D1B3E] group-hover:text-white"
                          }`}
                        >
                          <HelpCircle size={22} strokeWidth={2.2} />
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#8C6A1F]">
                              FAQ {faq.id}
                            </span>
                          </div>

                          <h3
                            className={`text-lg md:text-[1.45rem] font-serif leading-snug tracking-[-0.02em] transition-colors duration-300 ${
                              isOpen
                                ? "text-[#0D1B3E]"
                                : "text-[#132445] group-hover:text-[#0D1B3E]"
                            }`}
                          >
                            {faq.question}
                          </h3>
                        </div>
                      </div>

                      <div className="shrink-0 pt-1">
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.35 }}
                          className={`rounded-full border p-2.5 transition-all duration-300 ${
                            isOpen
                              ? "border-[#C9A84C]/30 bg-[#F7F3EC] text-[#8C6A1F]"
                              : "border-[#0D1B3E]/10 text-[#44506B] group-hover:border-[#C9A84C]/30"
                          }`}
                        >
                          <ChevronDown size={18} />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="relative z-10 border-t border-[#0D1B3E]/6 px-6 md:px-8 pb-7 md:pb-8 pt-6 md:pt-7">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                            <div className="lg:col-span-8">
                              <p className="text-[15px] md:text-base text-[#44506B] leading-8">
                                {faq.answer}
                              </p>
                            </div>

                            <div className="lg:col-span-4">
                              <div className="rounded-2xl border border-[#C9A84C]/15 bg-[#F7F3EC] p-5 md:p-6 h-full">
                                <p className="text-[10px] uppercase tracking-[0.22em] text-[#8C6A1F] font-semibold mb-3">
                                  Guidance Note
                                </p>

                                <p className="text-sm text-[#5A647B] leading-7">
                                  Elite UK law admissions evaluate reasoning,
                                  intellectual depth, consistency of preparation,
                                  and academic potential rather than memorized
                                  legal knowledge.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 md:mt-16 flex justify-center"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-full border border-[#0D1B3E]/10 bg-white px-6 py-3 text-sm font-medium text-[#0D1B3E] transition-all duration-300 hover:border-[#C9A84C]/30 hover:shadow-[0_10px_30px_rgba(13,27,62,0.06)]"
          >
            Explore More Questions
            <ArrowRight className="w-4 h-4 text-[#C9A84C] transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
