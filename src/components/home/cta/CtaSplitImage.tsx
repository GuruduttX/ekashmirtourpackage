"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, MapPin, Clock, ShieldCheck } from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";
import { whatsappLink } from "./whatsapp";

const PERKS = [
  { icon: MapPin, label: "Local on-ground planning" },
  { icon: Clock, label: "Replies within a few hours" },
  { icon: ShieldCheck, label: "Transparent price tables" },
];

/**
 * CTA style 2 — a split card: content on the left, a scenic image panel
 * on the right. Stacks vertically on mobile.
 */
export default function CtaSplitImage() {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="bg-white px-5 py-10 sm:px-8 lg:px-12">
      <EnquiryPopupForm isOpen={isOpen} onClose={() => setOpen(false)} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-sky-100 bg-sky-50 shadow-lg lg:grid-cols-2"
      >
        {/* Left — content */}
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
            Let&apos;s talk
          </p>
          <h2 className="font-heading text-3xl font-bold leading-tight bg-linear-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent sm:text-4xl">
            Have questions before you book?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Share your plans and get a custom Kashmir itinerary with clear
            inclusions, exclusions and pricing — no guesswork.
          </p>

          <ul className="mt-6 space-y-3">
            {PERKS.map((perk) => (
              <li key={perk.label} className="flex items-center gap-3 text-sm text-slate-700">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                  <perk.icon className="h-4 w-4 text-sky-500" />
                </span>
                {perk.label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setOpen(true)}
              className="group flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-8 py-4 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
            >
              Enquire Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border-2 border-sky-300 bg-white px-8 py-4 font-semibold text-sky-600 transition-colors hover:bg-sky-50"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Right — image panel */}
        <div className="relative min-h-[240px] lg:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200&auto=format&fit=crop&q=80"
            alt="Shikara on Dal Lake, Kashmir"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-sky-900/40 to-transparent lg:bg-linear-to-r lg:from-sky-50/40 lg:to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
