"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Sparkles,
} from "lucide-react";

interface BlogCardProps {
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

export default function BlogCard({
  title,
  slug,
  category,
  image,
  alt,
  subContent,
  createdAt = "May 2026",
  readTime = "8 min read",
  featured = false,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      className="group relative h-full"
    >
      <Link href={`/blog/${slug}`} className="block h-full">
        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(240,249,255,0.72))] backdrop-blur-2xl shadow-[0_25px_80px_rgba(14,165,233,0.08)] transition-all duration-700 group-hover:border-sky-200/80 group-hover:shadow-[0_35px_100px_rgba(14,165,233,0.16)] ${
            featured ? "lg:min-h-[32rem]" : "lg:min-h-[26rem]"
          }`}
        >
          {/* Atmospheric Glow Layers */}
          <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-sky-400/10 blur-[80px] transition-opacity duration-700 group-hover:opacity-100" />

          <div className="absolute bottom-0 right-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-[70px] opacity-80" />

          {/* Cinematic Image */}
          <div
            className={`relative overflow-hidden ${
              featured
                ? "aspect-[1.5/1] sm:aspect-[1.7/1]"
                : "aspect-[1.7/1]"
            }`}
          >
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
            />

            {/* Cinematic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/10 to-transparent" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_35%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100" />

            {/* Floating Category Pill */}
            <div className="absolute left-4 top-4 z-10">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
                <Sparkles className="h-3.5 w-3.5 text-white" />

                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white">
                  {category}
                </span>
              </div>
            </div>

            {/* Floating CTA */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="absolute bottom-4 right-4 z-10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-xl shadow-[0_8px_28px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:bg-sky-400/90">
                <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          </div>

          {/* Editorial Content */}
          <div className="relative z-10 flex flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-5">
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-100 bg-white/80 shadow-[0_8px_20px_rgba(14,165,233,0.05)]">
                  <CalendarDays className="h-3.5 w-3.5 text-sky-500" />
                </div>

                <span className="text-[13px] font-light tracking-[0.01em]">
                  {createdAt}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-100 bg-white/80 shadow-[0_8px_20px_rgba(14,165,233,0.05)]">
                  <Clock3 className="h-3.5 w-3.5 text-sky-500" />
                </div>

                <span className="text-[13px] font-light tracking-[0.01em]">
                  {readTime}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3
              className={`mt-4 tracking-[-0.05em] text-slate-900 transition-colors duration-500 group-hover:text-sky-600 ${
                featured
                  ? "text-[1.7rem] leading-[1.05] font-extralight sm:text-[2rem]"
                  : "text-[1.45rem] leading-[1.1] font-extralight"
              }`}
            >
              {title}
            </h3>

            {/* Excerpt */}
            <p
              className={`mt-3 text-slate-600 font-light leading-7 ${
                featured ? "text-[14px] sm:text-[15px]" : "text-[14px]"
              } line-clamp-3`}
            >
              {subContent}
            </p>

            {/* Bottom Experience Strip */}
            <div className="mt-3 pt-5">
              <div className="flex items-center justify-between rounded-[1.2rem] border border-white/70 bg-white/65 px-4 py-3 backdrop-blur-xl shadow-[0_8px_24px_rgba(14,165,233,0.04)] transition-all duration-500 group-hover:border-sky-100 group-hover:bg-sky-50/60">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    Editorial Experience
                  </p>

                  <h4 className="mt-1 text-[13px] tracking-[-0.02em] text-slate-800">
                    Discover Kashmir Through Stories
                  </h4>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-100 bg-sky-50/80 shadow-[0_8px_20px_rgba(14,165,233,0.05)] transition-all duration-500 group-hover:bg-sky-400 group-hover:shadow-[0_12px_28px_rgba(14,165,233,0.14)]">
                  <ArrowUpRight className="h-4 w-4 text-sky-500 transition-all duration-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}