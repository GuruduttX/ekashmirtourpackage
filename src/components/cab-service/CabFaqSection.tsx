"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleQuestionMark } from "lucide-react";

import { CAB_FAQS as FAQS } from "@/data/cabFaqs";

export default function CabFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-14">
        {/* Left — heading + image */}
        <div>
          <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>

          <div className="relative mt-6 h-56 w-full overflow-hidden rounded-2xl shadow-md shadow-black/10 sm:h-72 lg:h-80">
            <Image
              src="/cab-faq.webp"
              alt="Taxi pickup at Jammu Airport"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right — accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border bg-white shadow-md shadow-black/5 transition-colors ${
                  isOpen ? "border-sky-500" : "border-transparent"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-sky-500 text-white">
                    <CircleQuestionMark className="h-5 w-5" />
                  </span>
                  <span className="flex-1 font-medium text-slate-800">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pl-19 sm:px-6 sm:pb-6">
                        <p className="text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
