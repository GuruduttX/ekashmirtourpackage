"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";
import { whatsappLink } from "./whatsapp";

/**
 * CTA style 3 — a centered glass card floating over a scenic Kashmir
 * background image. Fully responsive.
 */
export default function CtaGlassOverlay() {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="bg-white px-5 py-10 sm:px-8 lg:px-12">
      <EnquiryPopupForm isOpen={isOpen} onClose={() => setOpen(false)} />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1600&auto=format&fit=crop&q=80"
          alt="Snow-capped Kashmir mountains"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-sky-900/70 via-sky-800/50 to-cyan-900/60" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center px-6 py-16 text-center sm:px-12 sm:py-24"
        >
          <div className="w-full max-w-2xl rounded-3xl border border-white/25 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
              Your journey starts here
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              Let&apos;s build your perfect Kashmir escape
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
              From Srinagar houseboats to Gulmarg snow — tell us what you have in
              mind and we&apos;ll handle the rest.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => setOpen(true)}
                className="group flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-8 py-4 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Start Planning
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-white/60 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
