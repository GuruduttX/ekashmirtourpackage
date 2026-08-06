"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroSlideInContainer, heroSlideInLeft } from "@/components/temples/hero/heroMotion";

export default function HeroContent({ onBookNow }: { onBookNow: () => void }) {
  return (
    <motion.div
      variants={heroSlideInContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center lg:items-start lg:text-left"
    >
      <motion.h1
        variants={heroSlideInLeft}
        className="font-heading text-3xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
      >
        <span className="bg-linear-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
          Stone temples.
        </span>{" "}
        <span className="text-white">Wooden shrines.</span>
        <br />
        <span className="text-white">One valley&apos;s faith.</span>
      </motion.h1>

      <motion.p
        variants={heroSlideInLeft}
        className="mt-5 max-w-lg text-base leading-relaxed text-slate-200/90 sm:text-lg"
      >
        Explore Kashmir&apos;s most historic temples and mosques and explore the
        journey with us.
      </motion.p>

      <motion.div
        variants={heroSlideInLeft}
        className="mt-8 flex w-full flex-col items-stretch gap-3 lg:w-auto lg:flex-row lg:items-center lg:justify-start"
      >
        <Link
          href="/kashmir-tour-packages"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-7 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/30 transition-transform hover:-translate-y-0.5 lg:w-auto"
        >
          Explore Packages <ArrowRight className="h-4 w-4" />
        </Link>
        <button
          type="button"
          onClick={onBookNow}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 lg:w-auto"
        >
          Book Now <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}
