"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";
import { whatsappLink } from "./whatsapp";

/**
 * CTA style 1 — a bold full-width gradient banner.
 * Primary action opens the enquiry form; secondary opens WhatsApp.
 *
 * Copy is overridable so pages that close on a specific subject (a
 * destination, a cab route) can name it instead of repeating the generic
 * home-page pitch. Defaults are the home-page wording, so `<CtaGradientBanner />`
 * keeps working unchanged.
 */
export default function CtaGradientBanner({
  eyebrow = "Plan with a local expert",
  heading = "Ready to plan your dream Kashmir trip?",
  blurb = "Tell us your dates and we'll craft a transparent, paced itinerary — packages, cabs, stays and sightseeing, all in one place.",
  whatsappMessage,
}: {
  eyebrow?: string;
  heading?: string;
  blurb?: string;
  /** Prefilled WhatsApp text. Falls back to the shared default message. */
  whatsappMessage?: string;
} = {}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="bg-white px-5 py-10 sm:px-8 lg:px-12">
      <EnquiryPopupForm isOpen={isOpen} onClose={() => setOpen(false)} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-br from-sky-500 to-cyan-400 px-6 py-12 shadow-xl shadow-sky-200 sm:px-12 sm:py-16"
      >
        {/* Decorative blurred orbs */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-cyan-200/25 blur-3xl" />

        <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              {eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              {blurb}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button
              onClick={() => setOpen(true)}
              className="group flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-sky-600 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={whatsappLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-white/70 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
