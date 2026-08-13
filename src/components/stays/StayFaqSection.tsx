"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleQuestionMark } from "lucide-react";
import type { Stay } from "@/data/stays";

/**
 * SOP §2.8 — FAQ block for the stays hub, with FAQPage schema.
 *
 * Hub-level questions only: anything specific to one stay type belongs on that
 * stay's page, so the two never compete for the same query.
 *
 * The cheapest nightly rate is read from the stay data rather than written into
 * the copy — a stale price in an FAQ answer is exactly the kind of thing that
 * gets quoted back at you on a booking call.
 */

type Faq = { question: string; answer: string };

function buildFaqs(lowestPrice: number): Faq[] {
  const from = `₹${lowestPrice.toLocaleString("en-IN")}`;

  return [
    {
      question: "Should I stay in a houseboat or a hotel in Srinagar?",
      answer:
        "Do both. A houseboat is the experience but limits your mobility after dark, while a hotel is far easier on sightseeing days. One or two nights on the water followed by the rest on land suits most itineraries, and it is what we book for our own families.",
    },
    {
      question: "How much does a stay in Kashmir cost per night?",
      answer: `Homestays start from about ${from} a night including home-cooked meals, hotels from around ₹1,800, houseboats from ₹2,500 and mountain resorts from ₹2,600. Rates rise sharply during the Tulip Festival in April and over Christmas week, so book those windows early.`,
    },
    {
      question: "Which part of Dal Lake should I book a houseboat on?",
      answer:
        "Avoid the stretch directly opposite Boulevard Road in peak season — it is the busiest and noisiest water in Srinagar. The Ghat 9 to 16 stretches are quieter, and Nigeen Lake, about 6 km further out, is calmer and cleaner again.",
    },
    {
      question: "Do stays in Kashmir have heating in winter?",
      answer:
        "Not all of them, and this is the single most important thing to confirm between December and February. Resorts in Gulmarg usually have central heating; houseboats and village homestays often rely on a bukhari wood stove or a portable heater. Ask before you pay an advance.",
    },
    {
      question: "Should I stay in Gulmarg or visit on a day trip from Srinagar?",
      answer:
        "Stay overnight if you plan to ski or want first light on Affarwat. A day trip works in summer, but in deep winter the Tangmarg–Gulmarg climb needs a snow-jeep with chains and can close without warning, which can cost you the entire day.",
    },
    {
      question: "How many nights should I split between Srinagar and the valleys?",
      answer:
        "For a typical 6-night trip: three nights in Srinagar (one of them on a houseboat), two in Pahalgam or Gulmarg, and one back in Srinagar before your flight. Sonamarg and Yusmarg work as a swap for one of the middle nights rather than an addition.",
    },
    {
      question: "Are homestays in Kashmir suitable for families?",
      answer:
        "Yes. Family homestays are common across Pahalgam, Aru and Yusmarg and the hosts usually live on the property. Confirm whether the bathroom is private before booking, as anything below ₹1,500 a night is typically shared.",
    },
  ];
}

type Props = {
  stays: Stay[];
  /**
   * Supplied FAQs — place and type pages pass their own so each page targets
   * its own queries instead of repeating the hub's. Falls back to the hub set.
   */
  faqs?: Faq[];
  heading?: string;
  intro?: string;
};

export default function StayFaqSection({
  stays,
  faqs: suppliedFaqs,
  heading,
  intro,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const lowestPrice = useMemo(
    () => Math.min(...stays.map((stay) => stay.priceFrom)),
    [stays],
  );

  // A real photo from the stay data rather than a stock file in /public.
  const image = useMemo(() => {
    const withGallery = stays.find((stay) => stay.gallery.length > 0);
    return {
      src: withGallery?.gallery[0]?.image ?? stays[0]?.image,
      alt: withGallery?.gallery[0]?.alt ?? stays[0]?.alt ?? "Stays in Kashmir",
    };
  }, [stays]);

  const faqs = useMemo(
    () =>
      suppliedFaqs?.length
        ? suppliedFaqs
        : buildFaqs(Number.isFinite(lowestPrice) ? lowestPrice : 1200),
    [suppliedFaqs, lowestPrice],
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-14">
        {/* Left — heading + photo */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
            Need help?
          </span>

          <h2 className="mt-5 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              {heading ?? "Stay questions, answered"}
            </span>
          </h2>

          <p className="mt-3 text-slate-600">
            {intro ??
              "The things travellers ask us most before booking a bed in Kashmir — answered straight, by people who live here."}
          </p>

          {image.src && (
            <div className="relative mt-6 hidden h-56 w-full overflow-hidden rounded-2xl shadow-md shadow-black/10 sm:h-72 lg:block lg:h-80">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Right — accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`rounded-2xl border bg-white shadow-sm transition-colors ${
                  isOpen ? "border-sky-400 shadow-md shadow-sky-100" : "border-slate-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center gap-3.5 px-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400 sm:px-5"
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

                  <span className="flex-1 text-sm font-semibold text-slate-800 sm:text-base">
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
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 pl-16 text-sm leading-relaxed text-slate-600 sm:px-5 sm:pl-17">
                        {faq.answer}
                      </p>
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
