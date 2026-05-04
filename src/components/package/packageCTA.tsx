"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, ShieldCheck, Snowflake } from "lucide-react";

export default function PackageCTA() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-slate-950">
      <Image
        src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80"
        alt="Snow-covered Kashmir mountain landscape"
        fill
        className="object-cover object-center"
        unoptimized
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/88 to-slate-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />

      <div className="relative z-10 px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-sky-400" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sky-300">
              Ready To Go
            </span>
          </div>

          <h2 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Let’s turn this Kashmir package into your next unforgettable trip.
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
            Share your travel dates, group size, and preferences. We will help
            you shape the right stay, transport, and sightseeing plan without
            the usual back-and-forth.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#enquiry-form"
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-600"
            >
              Send Enquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
            >
              <MessageCircle className="h-4 w-4" />
              Talk To Our Expert
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/75 sm:text-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-sky-300" />
              Personalised trip assistance
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 backdrop-blur-sm">
              <Snowflake className="h-4 w-4 text-sky-300" />
              Fast response for Kashmir departures
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
