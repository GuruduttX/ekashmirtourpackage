"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function CallToAction() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="relative h-[560px] lg:h-[620px] overflow-hidden">
      {/* ── Background image ── */}
      <Image
        src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1920&q=85"
        alt="Breathtaking Kashmir mountain vista"
        fill
        className="object-cover object-[center_40%]"
        sizes="100vw"
      />

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/92 via-[#0F172A]/68 to-[#1E3A5F]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/55 to-transparent" />

      {/* ── Decorative horizontal rule ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/40 to-transparent" />

      {/* ── Content ── */}
      <div ref={ref} className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-[560px]">
            {/* Overline */}
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="h-px w-8 bg-[#3B82F6]" />
              <span className="text-[#3B82F6] text-[0.72rem] font-medium tracking-[0.28em] uppercase">
                Start Your Journey
              </span>
            </div>

            {/* Heading */}
            <h2
              className={`font-heading text-[2.6rem] md:text-[3.4rem] lg:text-[4rem] font-bold text-white leading-[1.08] mb-6 transition-all duration-700 delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Plan Your Dream
              <br />
              <em className="not-italic text-gradient font-medium">
                Kashmir Trip
              </em>
            </h2>

            {/* Body */}
            <p
              className={`text-white/58 text-base font-light leading-[1.85] mb-10 transition-all duration-700 delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Let us handle every detail — from the moment you land to the
              moment you reluctantly leave.{" "}
              <span className="text-white/80">All you bring is wonder.</span>
            </p>

            {/* Buttons */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Link
                href="#packages"
                className="glow-blue glow-blue-hover bg-[#3B82F6] hover:bg-[#2563EB] text-white px-9 py-4 rounded-2xl text-[0.95rem] font-medium transition-all duration-300 hover:-translate-y-0.5 inline-block"
              >
                Book Now
              </Link>
              <button className="glass text-white px-9 py-4 rounded-2xl text-[0.95rem] font-light hover:bg-white/14 transition-all duration-300 hover:-translate-y-0.5">
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
