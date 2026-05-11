"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Map,
  ShieldCheck,
  Clock,
  Users,
  Compass,
  Star,
} from "lucide-react";

// --- Types & Data ---

interface TrustMetric {
  id: string;
  value: string;
  label: string;
  Icon: React.ElementType;
}

interface ExperiencePanel {
  id: string;
  image: string;
  title: string;
  description: string;
  features: string[];
}

const trustMetrics: TrustMetric[] = [
  { id: "m1", value: "10,000+", label: "Happy Travelers", Icon: Users },
  { id: "m2", value: "4.9/5", label: "Average Rating", Icon: Star },
  { id: "m3", value: "100%", label: "Local Experts", Icon: Map },
  { id: "m4", value: "24/7", label: "On-Trip Support", Icon: Clock },
];

const experiencePanels: ExperiencePanel[] = [
  {
    id: "p1",
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1600&auto=format&fit=crop",
    title: "Every Journey Designed Around You",
    description:
      "No two travelers are the same, and your itinerary shouldn't be either. We craft flexible, fully personalized plans that move at your exact pace.",
    features: ["Flexible Plans", "Private Transfers", "Custom Pacing"],
  },
  {
    id: "p2",
    image:
      "https://imgs.search.brave.com/fZN0Be1HfEO75D6tOSiVRGO2TxIo_obIIvNClDOQE6w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nby1r/YXNobWlyLW5leHQu/dmVyY2VsLmFwcC9p/bWcvSGVyb2NhcmRz/L2N1bHR1cmUuanBn",
    title: "Rest in Unmatched Comfort",
    description:
      "From intricately carved heritage houseboats on Dal Lake to secluded luxury mountain resorts, we handpick stays that offer supreme comfort and authentic charm.",
    features: ["Luxury Houseboats", "Premium Resorts", "Mountain Retreats"],
  },
  {
    id: "p3",
    image:
      "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=1600&auto=format&fit=crop",
    title: "See Kashmir Through Local Eyes",
    description:
      "Experience the real Kashmir. Our verified, deeply knowledgeable local guides take you beyond the tourist traps to discover hidden gems and authentic culture.",
    features: ["Verified Guides", "Hidden Gems", "Cultural Immersion"],
  },
  {
    id: "p4",
    image:
      "https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=1600&auto=format&fit=crop",
    title: "Zero Stress, Pure Experience",
    description:
      "Leave the logistics to us. We handle every permit, transfer, and booking so you can focus entirely on making unforgettable memories.",
    features: ["Seamless Logistics", "Permit Handling", "Secure Travel"],
  },
];

export default function WhyTravelWithUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic for the unified Carousel (3 seconds)
  useEffect(() => {
    if (isHovered) return; // Pause on hover/touch for better UX

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % experiencePanels.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered]);

  // Entrance Animation Variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <section className="relative w-full overflow-hidden bg-sky-50 py-10 lg:py-32">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-sky-300/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-300/15 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* --- LEFT SIDE: Storytelling & Trust Metrics --- */}
          <div className="lg:col-span-5">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col max-w-xl mx-auto lg:mx-0 text-center md:text-start"
            >
              <motion.div variants={fadeUpVariant} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-200/60 bg-white/50 backdrop-blur-md text-sky-600 uppercase tracking-[0.2em] text-xs font-bold shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Why Travel With Us
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUpVariant}
                className="text-4xl md:text-5xl lg:text-5xl font-light text-slate-800 leading-[1.15] tracking-tight mb-8"
              >
                More Than a Tour. <br /> A Carefully{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 drop-shadow-sm">
                  Crafted Kashmir Experience.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUpVariant}
                className="text-slate-600 text-lg leading-relaxed mb-12 font-light"
              >
                We believe your journey should be as tranquil as the Dal Lake
                itself. By blending deep local expertise with premium service,
                we remove the friction of travel. From hidden culinary gems to
                seamless private transfers, we orchestrate every detail so you
                can simply arrive and fall in love with Kashmir.
              </motion.p>

              {/* Trust Metrics Grid */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4"
              >
                {trustMetrics.map((metric) => (
                  <motion.div
                    key={metric.id}
                    variants={fadeUpVariant}
                    className="bg-white/40 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:bg-white/60 hover:shadow-[0_8px_30px_rgba(56,189,248,0.1)] transition-all duration-300"
                  >
                    <div className="bg-sky-100 text-sky-500 w-fit p-2.5 rounded-xl mb-4">
                      <metric.Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">
                      {metric.value}
                    </h4>
                    <p className="text-slate-500 text-sm font-medium">
                      {metric.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* --- RIGHT SIDE: Unified Auto-Scrolling Cinematic Carousel --- */}
          <div className="lg:col-span-7 w-full mt-8 lg:mt-0">
            <div
              className="relative w-full h-[550px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setIsHovered(false)}
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <ExperienceCard
                    panel={experiencePanels[activeIndex]}
                    index={(activeIndex + 1).toString().padStart(2, "0")}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-12 right-6 lg:right-12 flex justify-center items-center gap-3 z-30">
                {experiencePanels.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all duration-500 ${
                      activeIndex === idx
                        ? "w-10 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Reusable Panel Component ---

function ExperienceCard({
  panel,
  index,
}: {
  panel: ExperiencePanel;
  index: string;
}) {
  return (
    <div className="group relative w-full h-full transition-all duration-500">
      {/* Immersive Image */}
      <img
        src={panel.image}
        alt={panel.title}
        className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
      <div className="absolute inset-0 bg-sky-900/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />

      {/* Content Container */}
      <div className="absolute inset-0 p-8 pb-16 lg:p-12 lg:pb-20 flex flex-col justify-between z-10">
        {/* Top: Index Label */}
        <div className="flex justify-between items-start">
          <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-white text-[10px] lg:text-xs uppercase tracking-[0.15em] font-bold shadow-lg">
            <Compass className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-cyan-300" />
            {index} — Feature
          </span>
        </div>

        {/* Bottom: Details & Pills */}
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 lg:mb-4 tracking-tight leading-tight drop-shadow-md">
            {panel.title}
          </h3>
          <p className="text-slate-200 text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 opacity-90 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3 sm:line-clamp-none">
            {panel.description}
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 lg:gap-2.5">
            {panel.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 lg:px-3.5 lg:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] lg:text-[11px] font-medium tracking-wide group-hover:border-sky-300/40 transition-colors duration-300 shadow-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
