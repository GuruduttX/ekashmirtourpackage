
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Mountain,
  Sparkles,
  Stars,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface BlogFAQProps {
  faqs?: FAQItem[];
}

const dummyFaqs: FAQItem[] = [
  {
    id: "1",
    question: "What is the best time to visit Kashmir?",
    answer:
      "Kashmir offers unique experiences throughout the year. Spring brings tulip gardens and blooming valleys, summer offers lush green landscapes, autumn transforms the region with golden chinar trees, and winter creates a snow-covered alpine paradise ideal for skiing and winter travel.",
  },
  {
    id: "2",
    question: "How many days are ideal for a Kashmir trip?",
    answer:
      "A 5 to 7 day itinerary is generally ideal for experiencing Srinagar, Gulmarg, Pahalgam, and Sonamarg comfortably while also enjoying immersive local experiences and slow travel moments.",
  },
  {
    id: "3",
    question: "Is Kashmir suitable for family vacations?",
    answer:
      "Yes, Kashmir is an excellent destination for families. The region offers scenic landscapes, peaceful lakes, luxury stays, nature excursions, cultural experiences, and comfortable travel options suitable for all age groups.",
  },
  {
    id: "4",
    question: "Which destinations should not be missed in Kashmir?",
    answer:
      "Dal Lake, Gulmarg, Pahalgam, Sonamarg, Betaab Valley, Mughal Gardens, and the alpine meadows surrounding Srinagar are among the most immersive and visually stunning experiences in Kashmir.",
  },
];

export default function BlogFAQ({ faqs = dummyFaqs }: BlogFAQProps) {
  const [activeFAQ, setActiveFAQ] = useState<string | null>(faqs[0]?.id);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,#f0f9ff,#ffffff)] py-10 sm:py-24 lg:py-32">
      {/* Atmospheric Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[10%] h-[24rem] w-[24rem] rounded-full bg-sky-400/10 blur-[150px]" />

        <div className="absolute right-[-8rem] bottom-[10%] h-[22rem] w-[22rem] rounded-full bg-cyan-400/10 blur-[140px]" />

        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-5 py-2.5 backdrop-blur-xl shadow-[0_10px_40px_rgba(14,165,233,0.08)]">
            <Stars className="h-4 w-4 text-sky-500" />

            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-sky-700">
              Kashmir Travel Insights
            </span>
          </div>

          <h2 className="mt-8 text-4xl font-extralight leading-[1.05] tracking-[-0.06em] text-slate-900 sm:text-5xl lg:text-7xl">
            Questions Before Your
            <span className="block bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400 bg-clip-text text-transparent font-medium">
              Kashmir Journey
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-8 text-slate-600 sm:text-lg font-light">
            Discover travel insights, planning recommendations, seasonal guidance,
            and immersive experiences to help you prepare for an unforgettable
            Kashmir escape.
          </p>
        </motion.div>

        {/* FAQ Layout */}
        <div className="mt-16 grid gap-6  lg:gap-10 xl:gap-14">
          {/* FAQ Accordion */}
          <div className="flex flex-col gap-5">
            {faqs.map((faq, index) => {
              const isActive = activeFAQ === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 backdrop-blur-2xl shadow-[0_20px_60px_rgba(14,165,233,0.06)]"
                >
                  {/* Ambient Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.08),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <button
                    onClick={() =>
                      setActiveFAQ(isActive ? null : faq.id)
                    }
                    className="relative z-10 flex w-full items-center justify-between gap-2 px-2 md:px-6 py-2 md:py-6 text-left sm:px-8 sm:py-7"
                  >
                    <div className="flex items-start gap-5">
                      <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50/80 shadow-[0_10px_30px_rgba(14,165,233,0.06)]">
                        <span className="text-sm font-medium text-sky-600">
                          0{index + 1}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-md md:text-lg leading-5 tracking-[-0.03em] md:font-medium text-slate-900 sm:text-xl">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <motion.div
                      animate={{
                        rotate: isActive ? 90 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-100 bg-white/80 shadow-[0_10px_30px_rgba(14,165,233,0.05)]"
                    >
                      <ChevronRight className="h-5 w-5 text-sky-500" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="relative z-10 md:px-6 pb-7 md:pl-[5.7rem] md:pr-8 sm:pb-8 sm:pr-10 text-center md:text-start">
                          <div className="rounded-[1.5rem] border border-sky-100/70 bg-sky-50/50 p-5 backdrop-blur-xl">
                            <p className="text-[15px] leading-8 text-slate-600 font-light sm:text-base">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}