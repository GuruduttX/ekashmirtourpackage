"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Phone, ArrowRight, BadgeCheck } from "lucide-react";
import { WHATSAPP_TEL, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&auto=format&fit=crop&q=80";
const INSET_IMAGE =
  "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&auto=format&fit=crop&q=80";

/** Placeholder faces, matching the seeded reviews. Swap for real guest photos. */
const FACES = [47, 12, 32, 51].map((id) => `https://i.pravatar.cc/80?img=${id}`);

const TRUST_POINTS = [
  "Verified reviews from real bookings",
  "No hidden costs, itemised quotes",
  "One person owns your trip end to end",
];

export default function CTASection() {
  return (
    <section className="px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group relative mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-2"
      >
        {/* ── Image panel — sharp, no blur. Order flips so it sits on top on
            mobile and to the left from lg up. ── */}
        <div className="relative order-first min-h-64 overflow-hidden lg:min-h-125">
          <motion.img
            src={HERO_IMAGE}
            alt="Houseboats moored on Dal Lake at first light"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* A single light scrim so the badge stays readable — the photo itself
              is left unblurred. */}
          <div className="absolute inset-0 bg-linear-to-t from-sky-950/45 via-sky-950/5 to-transparent" />

          {/* Floating rating badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg"
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold leading-none text-slate-900">4.8 / 5</p>
              <p className="mt-1 text-xs text-slate-500">from verified guests</p>
            </div>
          </motion.div>

          {/* Second photo, tucked into the seam between the panels */}
          <motion.img
            src={INSET_IMAGE}
            alt="Snow-covered slopes at Gulmarg"
            initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.45 }}
            whileHover={{ rotate: 0, scale: 1.04 }}
            className="absolute right-5 top-5 hidden h-28 w-28 rounded-2xl border-4 border-white object-cover shadow-xl sm:block"
          />
        </div>

        {/* ── Content panel ── */}
        <div className="relative flex flex-col justify-center px-6 py-10 text-center sm:px-10 lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600 lg:mx-0"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Locally run, Srinagar based
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl"
          >
            Ready to experience it yourself?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-3 text-base font-light leading-relaxed text-slate-600"
          >
            Tell us the dates you have in mind and we will send back a plan with
            real prices — no deposit, no pressure to book.
          </motion.p>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.34 } } }}
            className="mx-auto mt-6 space-y-2.5 text-left lg:mx-0"
          >
            {TRUST_POINTS.map((point) => (
              <motion.li
                key={point}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  show: { opacity: 1, x: 0 },
                }}
                className="flex items-start gap-2.5 text-sm text-slate-700"
              >
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 fill-sky-500 text-white" />
                {point}
              </motion.li>
            ))}
          </motion.ul>

          {/* Face pile + social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-7 flex items-center justify-center gap-3 lg:justify-start"
          >
            <div className="flex -space-x-3">
              {FACES.map((face, index) => (
                <motion.img
                  key={face}
                  src={face}
                  alt=""
                  aria-hidden
                  whileHover={{ y: -4, scale: 1.1, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 320, damping: 16 }}
                  className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  style={{ zIndex: FACES.length - index }}
                />
              ))}
            </div>
            <p className="text-sm text-slate-500">
              Join the travellers reviewed above
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.68 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="group/cta inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition-colors hover:bg-sky-600 sm:w-auto"
              >
                Plan my trip
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <a
                href={`tel:${WHATSAPP_TEL}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-600 sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                {WHATSAPP_DISPLAY}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
