"use client";

import { motion, Variants } from "framer-motion";
import {
  Clock3,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import BlogInquiryForm from "./BlogInquiryForm";

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Verified Local Experiences",
    description:
      "Curated stays, trusted guides, and immersive Kashmir journeys.",
  },
  {
    icon: Clock3,
    title: "Quick Planning Support",
    description:
      "Personalized itinerary assistance with rapid response times.",
  },
  {
    icon: Headphones,
    title: "Dedicated Travel Assistance",
    description:
      "Travel experts available before and throughout your journey.",
  },
];

export default function BlogSidebar() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUpVariants}
      className="relative flex flex-col gap-6"
    >

      {/* Premium Inquiry Form */}
      <BlogInquiryForm />

      {/* Trust Experience Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {trustPoints.map((point, index) => {
          const Icon = point.icon;

          return (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/70 p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(14,165,233,0.06)] transition-all duration-500 hover:border-sky-200"
            >
              {/* Ambient Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.08),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50/80 shadow-[0_10px_30px_rgba(14,165,233,0.08)]">
                  <Icon className="h-5 w-5 text-sky-500" />
                </div>

                <div>
                  <h4 className="text-base font-medium tracking-[-0.02em] text-slate-900">
                    {point.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600 font-light">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    
    </motion.div>
  );
}