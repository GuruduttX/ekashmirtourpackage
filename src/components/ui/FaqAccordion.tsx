"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { motion } from "framer-motion";
import type { DestinationFaq } from "@/data/destinationFaqs";

/**
 * FAQ accordion — the closing section every hub and detail page ends on
 * (the SOP blueprint runs FAQ → CTA).
 *
 * Generic and content-free: it renders whatever questions it is handed. Started
 * life as DestinationFaqSection, which is now a thin wrapper supplying the
 * destination defaults; the /experiences hub uses this directly.
 *
 * Whatever is passed here is also what that page must emit as FAQPage JSON-LD —
 * the schema is emitted by the PAGE, not here, because there is one FAQPage
 * block per URL and page.tsx already owns its structured data. Keep the two
 * fed from the same array so the markup can never disagree with the text.
 *
 * Answers stay MOUNTED when collapsed — height animates to 0 but the text is
 * never removed from the DOM. Unmounting them would hide the answers from
 * crawlers and from the AI answer engines this section exists to feed, and would
 * also make the visible content disagree with the emitted schema.
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** The shape every FAQ list on the site uses. */
export type FaqItem = DestinationFaq;

export default function FaqAccordion({
  faqs,
  eyebrow = "Before you book",
  /** Plain part of the heading; `headingAccent` is the gradient half. */
  headingLead,
  headingAccent = "questions",
  /**
   * Anchor id. One FAQ section per page, so the default is fine — override only
   * if a page ever carries two.
   */
  id = "faq",
}: {
  faqs: FaqItem[];
  eyebrow?: string;
  headingLead: string;
  headingAccent?: string;
  id?: string;
}) {
  // First answer open: the section reads as answered rather than as a wall of
  // closed rows, and it is the question most readers arrive with.
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (!faqs.length) return null;

  return (
    <section id={id} className="w-full scroll-mt-24 bg-white py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-sky-600 uppercase">
            <MessageCircleQuestion className="h-3.5 w-3.5" />
            {eyebrow}
          </p>

          <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
            {headingLead}{" "}
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              {headingAccent}
            </span>
          </h2>
        </div>

        <div className="mt-7 space-y-2.5">
          {faqs.map((faq) => {
            const isOpen = faq.id === openId;

            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-sky-200 bg-sky-50/50"
                    : "border-slate-200 bg-white hover:border-sky-200"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    // Toggle rather than force-open, so a reader can collapse
                    // the one they have finished with.
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className={`font-heading text-sm font-bold transition-colors sm:text-base ${
                        isOpen ? "text-sky-800" : "text-slate-900"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-linear-to-r from-sky-500 to-cyan-400 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>

                <motion.div
                  id={`faq-answer-${faq.id}`}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Closing nudge. Not another form — the page already has three enquiry
            entry points; this just catches the reader whose question wasn't
            here. */}
        <p className="mt-7 text-center text-sm text-slate-600">
          Still have a question?{" "}
          <Link
            href="/contact/"
            className="font-semibold text-sky-600 underline decoration-sky-300 decoration-2 underline-offset-2 transition-colors hover:text-sky-700"
          >
            Ask Sartaj directly
          </Link>{" "}
          — born and raised in Kashmir, 20 years of planning these trips.
        </p>
      </div>
    </section>
  );
}
