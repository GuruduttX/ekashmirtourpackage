"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

export default function PackageCTA() {
  return (
    <section className="relative overflow-hidden rounded-3xl my-5">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1600&q=80"
        alt="Kashmir landscape"
        fill
        className="object-cover object-center"
        unoptimized
      />

      {/* Cyan color wash over image — left strong, right fades to show photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-sky-500/90 to-cyan-400/60" />

      {/* Content */}
      <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-14 lg:px-16">
        <div className="max-w-xl">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            Bigger Group? Get special offers{" "}
            <span className="text-yellow-300">up to 50% Off!</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-white/80 font-light">
            Experience Kashmir & beyond with your group.
          </p>

          {/* CTA Button */}
          <Link
            href="tel:+919876543210"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-sky-600 transition-all duration-200 hover:bg-sky-50 hover:shadow-lg"
          >
            <Phone className="h-4 w-4" />
            Get A Callback
          </Link>
        </div>
      </div>
    </section>
  );
}
