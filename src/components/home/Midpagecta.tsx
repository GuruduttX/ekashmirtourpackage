"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Compass, Sparkles, ShieldCheck } from "lucide-react";
import { useRef } from "react";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface CTAProps {
  headline?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  trustPoints?: string[];
}

/* ─────────────────────────────────────────
   Default Content
───────────────────────────────────────── */
const defaultProps: Required<CTAProps> = {
  headline: "Not Sure Which Kashmir Trip is Right for You?",
  subtext:
    "Tell us your preferences and our travel experts will craft a personalised itinerary just for you — completely free.",
  primaryLabel: "Get Free Travel Plan",
  primaryHref: "#enquiry",
  secondaryLabel: "Explore Packages",
  secondaryHref: "/packages",
  trustPoints: [
    "No commitment required",
    "Response within 2 hours",
    "100% personalised",
  ],
};

/* ─────────────────────────────────────────
   Animation Variants
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};

const containerVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* ─────────────────────────────────────────
   Reusable Button
───────────────────────────────────────── */
function CTAButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
}) {
  const isPrimary = variant === "primary";

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="w-full sm:w-auto"
    >
      <Link
        href={href}
        className={`
          relative inline-flex w-full sm:w-auto items-center justify-center gap-2.5
          px-7 py-4 rounded-2xl text-sm font-semibold tracking-wide
          transition-shadow duration-300 overflow-hidden
          ${
            isPrimary
              ? "text-white"
              : "text-sky-600 bg-white/70 backdrop-blur-md border border-sky-200/80 hover:bg-white hover:border-sky-300"
          }
        `}
        style={
          isPrimary
            ? {
                background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                boxShadow:
                  "0 8px 24px -4px rgba(14,165,233,0.35), 0 0 0 1px rgba(255,255,255,0.15) inset",
              }
            : {
                boxShadow: "0 4px 16px -4px rgba(14,165,233,0.12)",
              }
        }
      >
        {/* Primary shimmer */}
        {isPrimary && (
          <span
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
            }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2.5">
          {children}
        </span>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export default function MidPageCTA({
  headline = defaultProps.headline,
  subtext = defaultProps.subtext,
  primaryLabel = defaultProps.primaryLabel,
  primaryHref = defaultProps.primaryHref,
  secondaryLabel = defaultProps.secondaryLabel,
  secondaryHref = defaultProps.secondaryHref,
  trustPoints = defaultProps.trustPoints,
}: CTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full py-16 lg:py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdff 100%)",
      }}
    >
      {/* ── Layered background atmosphere ── */}

      {/* Blob 1 — top left */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />
      {/* Blob 2 — bottom right */}
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-[420px] h-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 65%)",
          filter: "blur(36px)",
        }}
      />
      {/* Blob 3 — center glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(186,230,253,0.25) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      {/* Fine dot texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(14,165,233,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      {/* ── CTA container ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="will-change-transform"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative max-w-3xl mx-auto rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.75)",
              boxShadow:
                "0 32px 64px -16px rgba(14,165,233,0.12), 0 0 0 1px rgba(14,165,233,0.06), 0 0 0 1px rgba(255,255,255,0.8) inset",
            }}
          >
            {/* Top gradient bar */}
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(14,165,233,0.5), rgba(34,211,238,0.5), transparent)",
              }}
            />

            {/* Inner glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(186,230,253,0.20) 0%, transparent 100%)",
              }}
            />

            {/* Card content */}
            <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-14 text-center">
              {/* Overline badge */}
              <motion.div
                custom={0.15}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200/70 mb-7"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-sky-500">
                  Free Travel Planning
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                custom={0.25}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-5"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                Not Sure Which Kashmir Trip
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
                  is Right for You?
                </span>
              </motion.h2>

              {/* Subtext */}
              <motion.p
                custom={0.35}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-gray-500 text-sm sm:text-base leading-relaxed font-light max-w-xl mx-auto mb-9"
              >
                {subtext}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                custom={0.45}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-9"
              >
                <CTAButton href={primaryHref} variant="primary">
                  {primaryLabel}
                  <ArrowRight className="w-4 h-4" />
                </CTAButton>

                <CTAButton href={secondaryHref} variant="secondary">
                  <Compass className="w-4 h-4 text-sky-500" />
                  {secondaryLabel}
                </CTAButton>
              </motion.div>

              {/* Trust points */}
              <motion.div
                custom={0.55}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
              >
                {trustPoints.map((point, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                    {point}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Bottom gradient bar */}
            <div
              className="absolute bottom-0 inset-x-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(34,211,238,0.3), rgba(14,165,233,0.3), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
