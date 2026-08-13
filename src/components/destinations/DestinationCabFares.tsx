"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Armchair, ArrowUpRight } from "lucide-react";
import { whatsappLink } from "@/components/home/cta/whatsapp";
import type { ResolvedCabFare } from "@/lib/cabFares";

/**
 * /destinations/[slug] cab fare table.
 *
 * Rows are resolved in src/lib/cabFares.ts — this only renders. The vehicle
 * name and photo link out to /cab-service/[slug]; "Enquire now" opens
 * WhatsApp with the vehicle and destination already in the message, so the
 * enquiry arrives with the context instead of as a bare "hi".
 */

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const FALLBACK =
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&auto=format&fit=crop&q=80";

export default function DestinationCabFares({
  destinationName,
  fares,
}: {
  destinationName: string;
  fares: ResolvedCabFare[];
}) {
  if (fares.length === 0) return null;

  // One "from" note under the table beats repeating a caveat on every row.
  const hasBaseRate = fares.some((fare) => fare.isBaseRate);

  return (
    <section
      aria-label={`Cab fares for ${destinationName}`}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="text-center font-heading text-2xl font-bold text-slate-900 sm:text-left sm:text-3xl"
      >
        Cab{" "}
        <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
          Fares
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.06 }}
        className="mt-3 text-center text-sm leading-relaxed text-slate-600 sm:text-left"
      >
        Vehicles we run to {destinationName}, with what each one seats and costs.
      </motion.p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Column headers — desktop only. On mobile each row becomes a stacked
            card, where headers would be repeated noise. */}
        <div className="hidden border-b border-slate-100 bg-slate-50/60 px-5 py-3 sm:grid sm:grid-cols-[minmax(0,1.7fr)_1fr_0.7fr_1fr_auto] sm:items-center sm:gap-4">
          {["Cab", "Type", "Seats", "Fare", ""].map((heading, i) => (
            <span
              key={heading || i}
              className="text-[0.7rem] font-semibold tracking-widest text-slate-400 uppercase"
            >
              {heading}
            </span>
          ))}
        </div>

        {fares.map((fare, i) => (
          <motion.div
            key={fare.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: i * 0.05 }}
            className={`group relative grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 p-4 transition-colors duration-300 hover:bg-sky-50/60 sm:grid-cols-[minmax(0,1.7fr)_1fr_0.7fr_1fr_auto] sm:gap-y-0 sm:px-5 ${
              i !== 0 ? "border-t border-slate-100" : ""
            }`}
          >
            <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-linear-to-b from-sky-400 to-cyan-300 transition-transform duration-300 group-hover:scale-y-100" />

            {/* Exactly five in-flow children, one per column — the button
                previously sat in a wrapper with `sm:contents`, which emitted
                six items into five columns and pushed it onto its own row.
                Mobile drops the type/seats columns and stacks instead. */}

            {/* ---- 1. cab: photo + name ---- */}
            <div className="col-span-2 flex min-w-0 items-center gap-3 sm:col-span-1">
              <Link
                href={`/cab-service/${fare.slug}`}
                className="relative block h-14 w-20 shrink-0 overflow-hidden rounded-xl"
              >
                <Image
                  src={fare.image || FALLBACK}
                  alt={fare.alt || fare.title}
                  fill
                  unoptimized
                  sizes="80px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className="min-w-0">
                <Link
                  href={`/cab-service/${fare.slug}`}
                  className="inline-flex items-center gap-1 font-heading text-base font-semibold text-slate-900 transition-colors hover:text-sky-600"
                >
                  {fare.title}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
                {/* Type and seats have their own columns from sm up. */}
                <p className="mt-0.5 text-xs text-slate-500 sm:hidden">
                  {fare.cabType}
                  {!!fare.seats && ` · ${fare.seats} seats`}
                </p>
                {fare.note && (
                  <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                    {fare.note}
                  </p>
                )}
              </div>
            </div>

            {/* ---- 2. type ---- */}
            <span className="hidden text-sm text-slate-600 sm:block">
              {fare.cabType || "—"}
            </span>

            {/* ---- 3. seats ---- */}
            <span className="hidden items-center gap-1.5 text-sm text-slate-600 sm:flex">
              <Armchair className="h-4 w-4 text-sky-500" />
              {fare.seats || "—"}
            </span>

            {/* ---- 4. fare ---- */}
            <div>
              {fare.price ? (
                <p className="font-heading text-lg font-bold text-sky-600">
                  {fare.isBaseRate && (
                    <span className="mr-1 text-xs font-medium text-slate-400">
                      from
                    </span>
                  )}
                  ₹{fare.price.toLocaleString("en-IN")}
                </p>
              ) : (
                <p className="text-sm font-semibold text-slate-500">
                  On request
                </p>
              )}
              <p className="text-[11px] text-slate-400">per trip</p>
            </div>

            {/* ---- 5. enquire ---- */}
            <a
              href={whatsappLink(
                `Hi! I'd like to enquire about a ${fare.title} for ${destinationName}, Kashmir.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center justify-self-end rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap text-white shadow-sm shadow-sky-200 transition-transform hover:-translate-y-0.5"
            >
              Enquire now
            </a>
          </motion.div>
        ))}
      </div>

      {hasBaseRate && (
        <p className="mt-3 text-center text-xs text-slate-400 sm:text-left">
          Fares marked &ldquo;from&rdquo; are starting rates and vary with
          season, pickup point and waiting time. Confirm on enquiry.
        </p>
      )}
    </section>
  );
}
