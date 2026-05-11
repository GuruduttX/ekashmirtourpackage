"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";

const floatingAnimation= {
  y: [0, -12, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 1, 0.5, 1],
    },
  }),
};

const trustCards = [
  {
    icon: Users,
    title: "10,000+ Travelers",
    subtitle: "Curated premium Kashmir journeys",
    position:
      "top-[18%] right-3 sm:right-5 md:right-8 lg:right-16",
  },
  {
    icon: Star,
    title: "4.9/5 Rated Experiences",
    subtitle: "Trusted by modern explorers",
    position:
      "top-[40%] right-2 sm:right-4 md:right-10 lg:right-24",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Local Experts",
    subtitle: "Authentic & seamless travel planning",
    position:
      "top-[62%] right-3 sm:right-5 md:right-12 lg:right-28 hidden sm:flex",
  },
];

export default function WhyKashmirHero() {
  const [isOpen, setOpen] = useState(false);
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black text-white">
      <EnquiryPopupForm isOpen={isOpen} onClose={() => setOpen(false)} />
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1715457573748-8e8a70b2c1be?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Beautiful Kashmir landscape"
          fill
          priority
          className="object-cover scale-105"
        />

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55" />

        {/* Side Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

        {/* Ambient Glow */}
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute bottom-[5%] right-[-5%] h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        {/* Fog Layer */}
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-black/10 shadow-[inset_0_0_140px_rgba(0,0,0,0.55)]" />
      </div>

      {/* Floating Blurred Orbs */}
      <motion.div
        animate={floatingAnimation}
        className="absolute left-[8%] top-[22%] hidden h-28 w-28 rounded-full bg-sky-400/20 blur-3xl md:block"
      />

      <motion.div
        animate={{
          y: [0, 14, 0],
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute bottom-[18%] right-[12%] hidden h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl lg:block"
      />

      {/* Floating Trust Cards */}
      {trustCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
            className={`absolute hidden md:block z-20 ${card.position}`}
          >
            <motion.div
              animate={floatingAnimation}
              className="flex max-w-[200px] sm:max-w-[240px] md:max-w-[260px] items-start gap-2 sm:gap-3 rounded-2xl border border-white/15 bg-white/10 px-3 py-3 sm:px-4 sm:py-4 backdrop-blur-xl"
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-sky-400/20 text-sky-300">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-1 text-[10px] sm:text-xs leading-relaxed text-white/70">
                  {card.subtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl px-6 pb-36 pt-25 sm:px-8 md:py-28 lg:px-12">
        <div className="max-w-3xl text-center md:text-left">
          {/* Overline */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-white/10 px-5 py-2 backdrop-blur-xl"
          >
            <MapPin className="h-4 w-4 text-sky-300" />
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-sky-100/90">
              The Paradise of India
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-[92px]"
          >
            Discover the
            <br />
            <span className="bg-gradient-to-r from-sky-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              Soul of Kashmir
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.35}
            className="mt-8 max-w-2xl text-base leading-6 md:leading-8 text-white/75 sm:text-lg md:text-xl"
          >
            Drift through the timeless beauty of Dal Lake, wander beneath
            pine-covered valleys, and experience a land where snow mountains,
            culture, and unforgettable moments come together in extraordinary
            harmony.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="mt-6 md:mt-10 flex flex-col items-center gap-4 sm:flex-row md:items-start"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/package"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 px-7 py-4 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(56,189,248,0.35)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(34,211,238,0.5)] sm:text-base"
              >
                Explore Kashmir Packages
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-sky-300/40 hover:bg-white/15 sm:text-base"
              >
                Plan a Custom Trip
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/30 p-1">
            <motion.div
              animate={{
                y: [0, 14, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-2 w-2 rounded-full bg-white"
            />
          </div>

          <ChevronDown className="h-4 w-4 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}