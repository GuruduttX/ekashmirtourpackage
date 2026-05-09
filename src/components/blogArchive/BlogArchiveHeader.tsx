"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Feather, Sparkles } from "lucide-react";
import BlogSearchBar from "./BlogSearchBar";

interface BlogArchiveHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function BlogArchiveHeader({
  searchQuery,
  onSearchChange,
}: BlogArchiveHeaderProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
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

  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-14 pb-10 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-sky-400/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-1/4 h-[300px] w-[500px] rounded-full bg-cyan-400/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[200px] w-[300px] rounded-full bg-sky-300/5 blur-[100px]" />
      </div>

      <div className="relative z-10  max-w-3xl px-5 sm:px-8 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 md:gap-8"
        >
          {/* Editorial Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 rounded-full border border-white/40 bg-white/30 px-4 py-1.5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] backdrop-blur-md w-fit"
          >
            <Feather className="h-3.5 w-3.5 text-sky-500" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600">
              Editorial Archive
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="font-serif text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
          >
            Explore{" "}
            <span className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text font-normal text-transparent">
              Kashmir Stories
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base font-light leading-relaxed text-slate-600 sm:text-lg"
          >
            Immerse yourself in curated tales, luxury travel guides, and the
            hidden poetry of the valley. A cinematic journal for the mindful
            explorer.
          </motion.p>

          {/* Results Count */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 text-sm font-light text-slate-500"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/50 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-cyan-500" />
            </div>
            <p>
              Showing <span className="font-medium text-slate-700">32</span>{" "}
              cinematic travel stories
            </p>
          </motion.div>

          {/* Search Bar — now flows naturally below content */}
          <motion.div variants={itemVariants} className="w-full">
            <BlogSearchBar value={searchQuery} onChange={onSearchChange} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
