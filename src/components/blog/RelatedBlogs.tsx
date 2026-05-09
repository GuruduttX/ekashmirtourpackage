"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Stars,
} from "lucide-react";
import BlogCard from "./BlogCard";

const dummyBlogs = [
  {
    title: "A Cinematic Journey Through The Valleys Of Kashmir",
    slug: "cinematic-journey-through-kashmir",
    category: "Travel Story",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1600&auto=format&fit=crop",
    alt: "Kashmir lake view",
    subContent:
      "Discover immersive alpine landscapes, serene lakes, cinematic valleys, and luxury travel experiences woven through the heart of Kashmir.",
    createdAt: "May 2026",
    readTime: "8 min read",
  },
  {
    title: "Luxury Houseboat Experiences On Dal Lake",
    slug: "luxury-houseboats-dal-lake",
    category: "Luxury Escape",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1600&auto=format&fit=crop",
    alt: "Luxury houseboat in Kashmir",
    subContent:
      "Experience slow travel, floating luxury stays, Kashmiri hospitality, and atmospheric mornings across Dal Lake.",
    createdAt: "April 2026",
    readTime: "6 min read",
  },
  {
    title: "Snow Adventures And Alpine Escapes In Gulmarg",
    slug: "snow-adventures-gulmarg",
    category: "Winter Experience",
    image:
      "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?q=80&w=1600&auto=format&fit=crop",
    alt: "Snow mountains in Gulmarg",
    subContent:
      "Explore snow-covered landscapes, winter sports, gondola rides, and cinematic mountain experiences in Gulmarg.",
    createdAt: "March 2026",
    readTime: "7 min read",
  },
];

export default function RelatedBlogs() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,#ffffff,#f0f9ff)] py-16 sm:py-20 lg:py-24">
      {/* Atmospheric Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10rem] top-[10%] h-[28rem] w-[28rem] rounded-full bg-sky-400/10 blur-[170px]" />

        <div className="absolute right-[-10rem] bottom-[5%] h-[26rem] w-[26rem] rounded-full bg-cyan-400/10 blur-[160px]" />

        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Editorial Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 backdrop-blur-xl shadow-[0_10px_40px_rgba(14,165,233,0.08)]">
              <Stars className="h-3.5 w-3.5 text-sky-500" />

              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-sky-700">
                Editorial Recommendations
              </span>
            </div>

            <h2 className="mt-5 text-[2rem] font-extralight leading-[1] tracking-[-0.06em] text-slate-900 sm:text-[2.8rem] lg:text-[3.5rem]">
              Continue Reading
              <span className="block bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400 bg-clip-text text-transparent font-medium">
                Kashmir Stories
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-[13px] font-light leading-6 text-slate-500 sm:text-sm">
              Curated editorial journeys and immersive travel experiences from
              the valleys of Kashmir.
            </p>
          </motion.div>

          {/* Carousel Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center gap-3"
          >
            <button className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/75 backdrop-blur-2xl shadow-[0_15px_40px_rgba(14,165,233,0.08)] transition-all duration-500 hover:border-sky-200 hover:bg-sky-50/80 hover:shadow-[0_25px_50px_rgba(14,165,233,0.14)]">
              <ArrowLeft className="h-4 w-4 text-slate-600 transition-colors duration-500 group-hover:text-sky-500" />
            </button>

            <button className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/75 backdrop-blur-2xl shadow-[0_15px_40px_rgba(14,165,233,0.08)] transition-all duration-500 hover:border-sky-200 hover:bg-sky-50/80 hover:shadow-[0_25px_50px_rgba(14,165,233,0.14)]">
              <ArrowRight className="h-4 w-4 text-slate-600 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-sky-500" />
            </button>
          </motion.div>
        </div>

        {/* Unified Cinematic Carousel */}
        <div className="mt-10">
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
            {dummyBlogs.map((blog, index) => (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="snap-start min-w-[82%] sm:min-w-[55%] lg:min-w-[24rem] xl:min-w-[26rem]"
              >
                <BlogCard {...blog} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}