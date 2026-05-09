"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Feather } from "lucide-react";
import BlogCard from "../blog/BlogCard";


// ==================================================
// 🧱 TYPES
// ==================================================
export interface IBlog {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  alt: string;
  subContent: string;
  createdAt?: string;
  readTime?: string;
  featured?: boolean;
}

export interface BlogGridProps {
  blogs: IBlog[];
}

// ==================================================
// ✨ ANIMATION VARIANTS
// ==================================================
const easeOutExpo = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Smooth, staggered reveal
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: easeOutExpo },
  },
};

export default function BlogGrid({ blogs }: BlogGridProps) {
  // ==================================================
  // 🌌 EMPTY STATE (Cinematic & Editorial)
  // ==================================================
  if (!blogs || blogs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: easeOutExpo }}
        className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/40 p-12 text-center shadow-[0_12px_40px_rgba(14,165,233,0.06)] backdrop-blur-2xl"
      >
        {/* Soft background glow for empty state */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="h-[200px] w-[200px] rounded-full bg-sky-300/20 blur-[80px]" />
        </div>

        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/60 shadow-sm backdrop-blur-md mb-6 border border-white/80">
          <Feather
            className="h-6 w-6 text-sky-400 opacity-80"
            strokeWidth={1.5}
          />
        </div>

        <h3 className="mb-3 font-serif text-2xl font-light tracking-tight text-slate-800 md:text-3xl">
          No stories matched your journey.
        </h3>
        <p className="max-w-sm text-sm font-light leading-relaxed text-slate-500 md:text-base">
          Try adjusting your search to discover cinematic guides, hidden
          valleys, and premium Kashmir experiences.
        </p>
      </motion.div>
    );
  }

  // ==================================================
  // 📐 GRID LAYOUT
  // ==================================================
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // gap-5 to gap-6 ensures a compact, balanced, and premium spacing rhythm
      className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
    >
      {blogs.map((blog) => (
        <motion.div
          key={blog.id}
          variants={itemVariants}
          // Ensures the motion wrapper doesn't break card dimensions
          className="flex w-full h-full"
        >
          <BlogCard {...blog} />
        </motion.div>
      ))}
    </motion.div>
  );
}
