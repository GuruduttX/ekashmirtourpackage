"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleQuestionMark } from "lucide-react";

/**
 * FAQs for the stay page's content column.
 *
 * Deliberately NOT the hub's StayFaqSection: that one is a full-bleed
 * two-column band with a photo, needs the whole `stays` array to compute a
 * price, and emits its own FAQPage script — which would collide with the one
 * StayDetailView already emits from `stay.faqs`. Schema stays in the view; this
 * component is presentation only.
 *
 * The first answer is open by default — one visible answer signals the block is
 * expandable, and the rest are one tap away.
 */
export default function StayDetailFaqs({
  faqs,
  heading,
  intro,
}: {
  faqs: Array<{ id: string; question: string; answer: string }>;
  heading?: string;
  intro?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs.length) return null;

  return (
    <section id="faqs" className="scroll-mt-24">
      <div className="text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">FAQs</p>

        <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          {heading ?? "Questions guests ask about this stay"}
        </h2>

        {intro && <p className="mt-2 text-sm text-slate-500">{intro}</p>}
      </div>

      <div className="mt-5 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.id || faq.question}
              className={`rounded-2xl border bg-white transition-colors ${
                isOpen ? "border-sky-400 shadow-md shadow-sky-100" : "border-slate-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-${index}`}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400 sm:px-5"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isOpen
                      ? "bg-linear-to-br from-sky-500 to-cyan-400 text-white"
                      : "bg-sky-50 text-sky-500"
                  }`}
                >
                  <CircleQuestionMark className="h-5 w-5" />
                </span>

                <span className="min-w-0 flex-1 text-sm font-semibold text-slate-800 sm:text-base">
                  {faq.question}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 text-slate-400"
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-${index}`}
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 pl-15 text-sm leading-relaxed text-slate-600 sm:px-5 sm:pl-17">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
