"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Search, FileText, PhoneCall, Plane } from "lucide-react";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: "top" | "bottom";
}

/* ─────────────────────────────────────────
   Steps Data
───────────────────────────────────────── */
const steps: Step[] = [
  {
    id: 1,
    number: "01",
    title: "Explore Packages",
    description: "Browse curated Kashmir tours and activities tailored to every kind of traveller.",
    icon: <Search className="w-5 h-5" />,
    position: "top",
  },
  {
    id: 2,
    number: "02",
    title: "Submit Your Details",
    description: "Fill out a quick form with your travel dates, group size, and preferences.",
    icon: <FileText className="w-5 h-5" />,
    position: "bottom",
  },
  {
    id: 3,
    number: "03",
    title: "We Plan & Contact You",
    description: "Our team crafts your ideal itinerary and reaches out with a personalised plan.",
    icon: <PhoneCall className="w-5 h-5" />,
    position: "top",
  },
  {
    id: 4,
    number: "04",
    title: "Travel & Enjoy",
    description: "Confirm your trip and experience Kashmir seamlessly from arrival to farewell.",
    icon: <Plane className="w-5 h-5" />,
    position: "bottom",
  },
];

/* ─────────────────────────────────────────
   Animation Variants
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.95 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (d: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

/* ─────────────────────────────────────────
   StepCard
───────────────────────────────────────── */
function StepCard({
  step,
  index,
  inView,
}: {
  step: Step;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      custom={0.1 + index * 0.12}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative w-full"
    >
      {/* Ghost step number — background */}
      <span
        className="absolute -top-4 -left-2 text-[5.5rem] font-black leading-none select-none pointer-events-none"
        style={{
          color: "rgba(14,165,233,0.07)",
          fontFamily: "'Georgia', serif",
          letterSpacing: "-0.04em",
        }}
      >
        {step.number}
      </span>

      {/* Glass card */}
      <div
        className="relative rounded-3xl border border-white/70 bg-white/60 backdrop-blur-xl px-6 py-7 shadow-xl shadow-sky-100/60 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-sky-200/70 group-hover:bg-white/80 group-hover:border-sky-200/60"
        style={{ boxShadow: "0 8px 32px -8px rgba(14,165,233,0.12), 0 0 0 1px rgba(255,255,255,0.8) inset" }}
      >
        {/* Icon container */}
        <motion.div
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="relative w-12 h-12 rounded-2xl mb-5 flex items-center justify-center text-white overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
            boxShadow: "0 8px 20px -4px rgba(14,165,233,0.45)",
          }}
        >
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          <span className="relative z-10">{step.icon}</span>
        </motion.div>

        {/* Step number badge */}
        <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-bold tracking-[0.25em] uppercase text-sky-400 mb-2">
          <span className="w-3 h-px bg-sky-300" />
          Step {step.number}
        </span>

        {/* Title */}
        <h3 className="text-gray-900 text-base font-bold leading-snug mb-2 tracking-tight">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed font-light">
          {step.description}
        </p>

        {/* Bottom accent line — grows on hover */}
        <div
          className="absolute bottom-0 left-6 right-6 h-px rounded-full overflow-hidden"
          style={{ background: "rgba(14,165,233,0.08)" }}
        >
          <div
            className="h-full w-0 group-hover:w-full transition-all duration-500 ease-out rounded-full"
            style={{
              background: "linear-gradient(90deg, #0ea5e9, #06b6d4)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(170deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)",
      }}
    >
      {/* ── Background atmosphere ── */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 65%)",
        }}
      />

      {/* Fine dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(14,165,233,0.15) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 20% 80%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 20% 80%, black 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* ══ SECTION HEADER ══════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 lg:mb-20">

          {/* Left */}
          <div>
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex justify-center md:justify-start items-center gap-2 text-[0.65rem] font-bold tracking-[0.3em] uppercase text-sky-500 mb-3"
            >
              <span className="w-5 h-px bg-sky-400" />
              How It Works
            </motion.p>

            <motion.h2
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-3xl text-center md:text-start sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Plan Your Kashmir Trip
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 70%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                in 4 Simple Steps
              </span>
            </motion.h2>
          </div>

          {/* Right */}
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-gray-400 text-sm text-center md:text-start leading-relaxed max-w-xs sm:text-right font-light"
          >
            From discovery to travel, we make your journey seamless and
            stress-free — every step of the way.
          </motion.p>
        </div>

        {/* ══ DESKTOP ZIG-ZAG TIMELINE ═════════════════════════ */}
        <div className="hidden lg:block">

          {/* Timeline track */}
          <div className="relative">

            {/* ── Animated connecting line ── */}
            <div
              ref={lineRef}
              className="absolute top-1/2 left-[6%] right-[6%] h-px -translate-y-1/2 z-0 overflow-hidden"
            >
              {/* Dashed base line */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(14,165,233,0.2) 0px, rgba(14,165,233,0.2) 8px, transparent 8px, transparent 16px)",
                }}
              />
              {/* Animated fill line */}
              <motion.div
                className="absolute inset-0 origin-left"
                style={{
                  scaleX: lineScaleX,
                  background:
                    "linear-gradient(90deg, #0ea5e9, #06b6d4, #0ea5e9)",
                }}
              />
            </div>

            {/* 4-column grid */}
            <div className="grid grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col ${
                    step.position === "top"
                      ? "justify-start pt-0 pb-16"
                      : "justify-end pt-16 pb-0"
                  }`}
                >
                  <StepCard step={step} index={index} inView={isInView} />

                  {/* Connector dot on the line */}
                  <motion.div
                    custom={0.2 + index * 0.12}
                    variants={dotVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className={`relative flex items-center justify-center mx-auto ${
                      step.position === "top" ? "mt-6" : "mb-6 order-first"
                    }`}
                  >
                    {/* Outer glow ring */}
                    <div className="absolute w-7 h-7 rounded-full bg-sky-400/20 animate-ping" style={{ animationDuration: "2.5s" }} />
                    {/* Mid ring */}
                    <div className="absolute w-5 h-5 rounded-full bg-sky-400/30" />
                    {/* Core dot */}
                    <div
                      className="relative w-3.5 h-3.5 rounded-full border-2 border-white"
                      style={{
                        background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                        boxShadow: "0 0 10px rgba(14,165,233,0.5)",
                      }}
                    />
                    {/* Step number above/below dot */}
                    <span
                      className={`absolute text-[10px] font-bold text-sky-400 tracking-wide ${
                        step.position === "top" ? "-bottom-5" : "-top-5"
                      }`}
                    >
                      {step.number}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ MOBILE / TABLET VERTICAL STACK ══════════════════ */}
        <div className="lg:hidden flex flex-col gap-0">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex gap-5">

              {/* Left spine */}
              <div className="flex flex-col items-center flex-shrink-0">
                {/* Dot */}
                <motion.div
                  custom={0.1 + index * 0.1}
                  variants={dotVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="relative flex items-center justify-center mt-8"
                >
                  <div className="absolute w-6 h-6 rounded-full bg-sky-400/20 animate-ping" style={{ animationDuration: "2.5s" }} />
                  <div
                    className="relative w-3.5 h-3.5 rounded-full border-2 border-white z-10"
                    style={{
                      background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                      boxShadow: "0 0 8px rgba(14,165,233,0.5)",
                    }}
                  />
                </motion.div>

                {/* Vertical line segment */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="flex-1 w-px mt-2"
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: "linear-gradient(180deg, #0ea5e9, rgba(6,182,212,0.3))",
                    }}
                  />
                )}
              </div>

              {/* Card */}
              <div className="flex-1 pb-6">
                <StepCard step={step} index={index} inView={isInView} />
              </div>
            </div>
          ))}
        </div>

        {/* ══ BOTTOM CTA STRIP ════════════════════════ */}
        <motion.div
          custom={0.6}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-14 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div
            className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-sky-100 bg-white/70 backdrop-blur-md"
            style={{ boxShadow: "0 4px 20px -4px rgba(14,165,233,0.10)" }}
          >
            {/* Step dots */}
            <div className="flex items-center gap-1.5">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all"
                  style={{
                    width: i === 0 ? 20 : 8,
                    height: 8,
                    background:
                      "linear-gradient(90deg, #0ea5e9, #06b6d4)",
                    opacity: i === 0 ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-medium">
              4 steps to your dream Kashmir trip
            </span>
          </div>

          <motion.a
            href="#packages"
            whileHover={{ y: -3, boxShadow: "0 20px 40px -8px rgba(14,165,233,0.40)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white text-sm font-semibold cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
              boxShadow: "0 8px 24px -4px rgba(14,165,233,0.30)",
            }}
          >
            Start Planning
            <Search className="w-4 h-4" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}