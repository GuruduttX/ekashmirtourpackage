"use client";

import React, { useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  Variants,
} from "framer-motion";
import { ShieldCheck, Gem, Headset, Route, ArrowUpRight } from "lucide-react";

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  stat: string;
}

const benefits: Benefit[] = [
  {
    icon: ShieldCheck,
    title: "Trusted by thousands",
    description:
      "Every review on this page comes from a traveller who actually booked with us — nothing bought, nothing staged.",
    stat: "4.8 average rating",
  },
  {
    icon: Gem,
    title: "Quality you can count on",
    description:
      "Hand-picked houseboats, hotels and drivers we have travelled with ourselves before putting them in a single itinerary.",
    stat: "Vetted stays only",
  },
  {
    icon: Headset,
    title: "Dedicated support",
    description:
      "One person owns your trip from enquiry to airport drop, reachable on WhatsApp through the whole journey.",
    stat: "On call 24/7",
  },
  {
    icon: Route,
    title: "Hassle-free experience",
    description:
      "Permits, gondola slots, pony fees and transfers are all arranged in advance so you never negotiate at a counter.",
    stat: "Zero hidden costs",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

function BenefitCard({ benefit }: { benefit: Benefit }) {
  const Icon = benefit.icon;
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  // Cursor-tracked spotlight. Motion values are written outside React state on
  // purpose: a setState per mousemove would re-render the whole card ~60x/sec.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(14,165,233,0.10), transparent 70%)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={reduceMotion ? undefined : handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-200/60"
    >
      {/* Spotlight — sits under the content, fades in only while hovered */}
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0"
      />

      {/* Accent rail that draws itself down the left edge on hover */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
        className="absolute inset-y-0 left-0 w-0.5 bg-linear-to-b from-sky-400 to-cyan-300"
      />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : { rotate: hovered ? -8 : 0, scale: hovered ? 1.08 : 1 }
          }
          transition={{ type: "spring", stiffness: 320, damping: 14 }}
          className="shrink-0 rounded-2xl bg-sky-50 p-3 text-sky-500 transition-colors duration-300 group-hover:bg-sky-100"
        >
          <Icon className="h-6 w-6" strokeWidth={2} />
        </motion.div>

        <div className="min-w-0">
          <h3 className="flex items-center justify-center gap-1 text-base font-semibold text-slate-900 transition-colors duration-300 group-hover:text-sky-700 sm:justify-start sm:text-lg">
            {benefit.title}
            <motion.span
              aria-hidden
              animate={{
                opacity: hovered ? 1 : 0,
                x: hovered ? 0 : -4,
                y: hovered ? 0 : 4,
              }}
              transition={{ duration: 0.25 }}
              className="text-sky-400"
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          </h3>

          <p className="mt-2 text-sm font-light leading-relaxed text-slate-600">
            {benefit.description}
          </p>

          <span className="mt-3 inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold tracking-wide text-slate-500 transition-colors duration-300 group-hover:bg-sky-50 group-hover:text-sky-600">
            {benefit.stat}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BenefitsSection() {
  return (
    <section className="mt-16 overflow-hidden bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Why Customers Choose Us
          </h2>
          <p className="text-base font-light text-slate-600">
            The reasons that show up again and again in the reviews above.
          </p>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-sky-500" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} benefit={benefit} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
