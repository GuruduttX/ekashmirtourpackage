"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Calendar,
  Clock,
  PenLine,
  ArrowDownRight,
  BookOpen,
  Mountain,
} from "lucide-react";
import { useEffect, useState } from "react";

// ============================================================================
// Types & Interfaces
// ============================================================================
interface Blog {
  title: string;
  category: string;
  author: string;
  image: string;
  alt: string;
  subContent: string;
  createdAt: string;
  readTime: string;
}

// Dummy data as requested
const dummyBlog: Blog = {
  title: "The Silent Echoes of Dal Lake",
  category: "Experiential Journey",
  author: "Aria Sterling",
  image:
    "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=2070&auto=format&fit=crop",
  alt: "Misty morning on Dal Lake with Shikaras in Kashmir",
  subContent:
    "As the morning mist lifts off the mirrored surface of the lake, a timeless world awakens. Discover the unspoken poetry of Kashmir's aquatic heart and the souls who navigate its serene waters.",
  createdAt: "October 12, 2024",
  readTime: "8 min read",
};

// ============================================================================
// Animation Variants
// ============================================================================
const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function CinematicBlogHero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_30%),linear-gradient(to_bottom,#f0f9ff,#ffffff)] selection:bg-sky-500/20">
      <div className="relative mx-auto max-w-[92rem]  pb-5 pt-20 sm:px-8 lg:px-10 lg:pb-10 lg:pt-28">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-sky-100/80 bg-white/70 backdrop-blur-2xl shadow-[0_30px_120px_rgba(14,165,233,0.12)]">
          {/* Ambient Glow Layers */}
          <div className="absolute -left-24 top-0 h-[22rem] w-[22rem] rounded-full bg-sky-400/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[18rem] w-[18rem] rounded-full bg-cyan-400/20 blur-[100px]" />

          <div className="relative grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-14 p-5 sm:p-8 md:p-10 xl:p-12 items-start xl:items-center">
            {/* LEFT CONTENT */}
            <motion.div
              initial="hidden"
              animate="visible"
              className="xl:col-span-5 flex flex-col"
            >
              {/* Category */}
              <motion.div
                variants={fadeUpVariants}
                className="mb-8 flex items-center gap-3"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/80 px-4 py-2 backdrop-blur-xl shadow-[0_10px_30px_rgba(14,165,233,0.08)]">
                  <BookOpen className="h-4 w-4 text-sky-500" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-sky-700">
                    {dummyBlog.category}
                  </span>
                </div>
              </motion.div>

              {/* Editorial Heading */}
              <motion.div variants={fadeUpVariants}>
                <h1 className="max-w-2xl text-[2.1rem] sm:text-[3rem] lg:text-[3rem] leading-[1] tracking-[-0.055em] font-extralight text-slate-900 text-balance">
                  The Silent
                  <br />
                  Journey Across
                  <span className="block bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400 bg-clip-text text-transparent font-medium">
                    Dal Lake
                  </span>
                </h1>
              </motion.div>

              {/* Editorial Metadata */}
              <motion.div
                variants={fadeUpVariants}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                <div className="flex items-center gap-2 rounded-full border border-sky-100/80 bg-white/80 px-4 py-2 backdrop-blur-xl shadow-[0_10px_30px_rgba(14,165,233,0.05)]">
                  <PenLine className="h-3.5 w-3.5 text-sky-500" />
                  <span className="text-[12px] font-light tracking-[-0.01em] text-slate-700">
                    {dummyBlog.author}
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-sky-100/80 bg-white/80 px-4 py-2 backdrop-blur-xl shadow-[0_10px_30px_rgba(14,165,233,0.05)]">
                  <Calendar className="h-3.5 w-3.5 text-sky-500" />
                  <span className="text-[12px] font-light tracking-[-0.01em] text-slate-700">
                    {dummyBlog.createdAt}
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-sky-100/80 bg-white/80 px-4 py-2 backdrop-blur-xl shadow-[0_10px_30px_rgba(14,165,233,0.05)]">
                  <Clock className="h-3.5 w-3.5 text-sky-500" />
                  <span className="text-[12px] font-light tracking-[-0.01em] text-slate-700">
                    {dummyBlog.readTime}
                  </span>
                </div>
              </motion.div>

              {/* Accent Line */}
              <motion.div
                variants={fadeUpVariants}
                className="mt-7 h-px w-20 bg-gradient-to-r from-sky-400 to-cyan-300"
              />
            </motion.div>

            {/* RIGHT VISUAL AREA */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="xl:col-span-7 pb-10 sm:pb-14 xl:pb-0"
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_30px_80px_rgba(15,23,42,0.18)] aspect-[1/1.02] sm:aspect-[1.08/1] lg:aspect-[1.35/1]">
                  <Image
                    src={dummyBlog.image}
                    alt={dummyBlog.alt}
                    fill
                    priority
                    className="object-cover transition-transform duration-[8s] hover:scale-105"
                    sizes="(max-width: 1280px) 100vw, 50vw"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                  {/* Floating Label */}
                  <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl text-white text-xs tracking-[0.2em] uppercase">
                    Kashmir Story Journal
                  </div>

                  {/* Bottom Overlay Content */}
                  <div className="hidden md:block absolute -bottom-5 left-4 sm:left-10 inset-x-auto p-6 sm:p-8">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/10 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(15,23,42,0.3)]">
                      <div className="flex items-center justify-between gap-6">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                            Featured Destination
                          </p>
                          <h3 className="mt-2 text-2xl font-light text-white">
                            Dal Lake, Srinagar
                          </h3>
                        </div>

                        <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-xl">
                          <Mountain className="h-6 w-6 text-sky-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* MOBILE + SHARED BOTTOM CONTENT */}
            <div className="xl:col-span-12 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-10 xl:gap-16">
             

              {/* CTA */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="flex flex-wrap items-center gap-5 xl:justify-end"
              >
                <button className="group inline-flex items-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-medium text-white transition-all duration-500 hover:-translate-y-1 hover:bg-sky-500 shadow-[0_20px_50px_rgba(15,23,42,0.2)]">
                  Begin Reading
                  <ArrowDownRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                </button>

                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Kashmir Editorial
                  </span>
                  <span className="text-sm text-slate-600">
                    Stories woven through mountains and mist
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
