"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";
import { whatsappLink } from "@/components/home/cta/whatsapp";

export default function CabServiceCTA() {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden rounded-3xl my-5">
      <EnquiryPopupForm isOpen={isOpen} onClose={() => setOpen(false)} />

      {/* Background image */}
      <Image
        src="/cab-service-CTA.webp"
        alt="Taxi parked on a Kashmir mountain road"
        fill
        className="object-cover object-center"
        unoptimized
      />

      {/* Cyan color wash — left strong, right fades to reveal photo */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-sky-500/90 to-cyan-400/60" /> */}

      {/* Black backdrop — right side, for legibility against the photo */}
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-14 lg:px-16">
        <div className="max-w-xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-white/95 text-sky-600 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-md border border-sky-100 mb-5 ml-10 md:ml-0">
            🚕 Verified Local Cabs
          </span>

          {/* Heading */}
          <h2 className="text-2xl text-center md:text-start sm:text-3xl font-bold text-white leading-snug">
            Need a cab for your Kashmir trip?{" "}
            <span className="text-yellow-300">Book in minutes.</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-sm text-center md:text-start sm:text-base text-white/80 font-light">
            Tell us your pickup, drop and dates — we&apos;ll confirm the best cab for you.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              href={whatsappLink("Hi! I'd like to book a cab in Kashmir. Can you help?")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-green-600 transition-all duration-200 hover:bg-sky-50 hover:shadow-lg"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-sky-600 transition-all duration-200 hover:bg-sky-50 hover:shadow-lg"
            >
              <Send className="h-4 w-4" />
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
