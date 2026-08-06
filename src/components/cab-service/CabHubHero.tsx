"use client";

import Image from "next/image";
import Link from "next/link";
import { Easing, motion, Variants } from "framer-motion";
import { Car, Phone, Star } from "lucide-react";

const HERO_IMAGE = "/cabHub-Hero/cabHub-hero.webp";

const stats = [
  { value: "50,000+", label: "Pilgrims served" },
  { value: "4.5", label: "Google Rating", icon: true },
  { value: "8+", label: "Years of Experience" },
];

const easeOutExpo: Easing = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
};

const floatAnimation: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 7, ease: "easeInOut", repeat: Infinity },
  },
};

export default function CabHubHero() {
  return (
    <section className="relative w-full overflow-hidden bg-sky-50 pt-28 pb-16 sm:pt-32 md:pb-10">
      {/* Mobile background — animated gradient orbs + subtle grid, no photo */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden md:hidden">
        <motion.div
          variants={floatAnimation}
          animate="animate"
          className="absolute -left-24 -top-24 h-105 w-105 rounded-full bg-sky-400/20 blur-[120px]"
        />
        <motion.div
          variants={floatAnimation}
          animate="animate"
          className="absolute -right-16 top-[10%] h-115 w-115 rounded-full bg-cyan-400/15 blur-[130px]"
        />
        <div className="absolute bottom-[-15%] left-1/2 h-90 w-130 -translate-x-1/2 rounded-full bg-sky-300/20 blur-[120px]" />
        {/* Faint dotted grid */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(14,165,233,0.12) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Desktop background — full-bleed photo, no fade */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src={HERO_IMAGE}
          alt="Yellow and white taxi cabs parked by a lake with snow-capped Kashmir mountains in the background"
          fill
          unoptimized
          priority
          className="object-cover object-[62%_55%]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center md:max-w-xl md:items-start md:py-14 md:text-left"
        >
          {/* Eyebrow pill */}
          <motion.span
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 shadow-sm backdrop-blur-md"
          >
            <Car className="h-3.5 w-3.5" /> Kashmir cab &amp; taxi service
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
          >
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Jammu &amp; Kashmir Taxi Service
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg"
          >
            Budget-Friendly cars for every ride. Book in minutes and hit the road!
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex w-fit items-center justify-center divide-x divide-slate-200"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="px-5 text-center first:pl-0 last:pr-0">
                <p className="flex items-center justify-center gap-1 text-xl font-bold text-sky-600 sm:text-2xl">
                  {stat.icon && <Star className="h-4 w-4 fill-sky-500 text-sky-500" />}
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-600 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-7 py-3.5 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
            >
              <Car className="h-4 w-4" /> Book Taxi
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-7 py-3.5 font-semibold text-sky-600 transition-colors hover:bg-sky-50"
            >
              <Phone className="h-4 w-4" /> Enquiry Now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
