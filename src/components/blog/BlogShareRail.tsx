"use client";

import { motion } from "framer-motion";
import { Copy, Heart, Link2, Share2 } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const shareItems = [
  { label: "Instagram", icon: FaInstagram },
  { label: "Twitter", icon: FaXTwitter },
  { label: "Facebook", icon: FaFacebook },
  { label: "Copy Link", icon: Link2 },
];

export default function BlogShareRail() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      // Cleaned up classes since page.tsx handles the sticky wrapper now
      className="relative w-fit"
    >
      <div className="relative overflow-hidden rounded-[1.7rem] border border-white/70 bg-white/65 p-3 shadow-[0_20px_60px_rgba(14,165,233,0.1)] backdrop-blur-2xl">
        {/* Atmospheric Glow */}
        <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-sky-400/10 blur-[70px]" />
        <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-[60px]" />

        <div className="relative z-10 flex flex-col items-center gap-3">
          {/* Header */}
          <div className="flex h-11 w-11 items-center justify-center rounded-[1.1rem] border border-sky-100 bg-sky-50/80 shadow-[0_8px_24px_rgba(14,165,233,0.06)]">
            <Share2 className="h-4.5 w-4.5 text-sky-500" />
          </div>

          {/* Vertical Divider */}
          <div className="h-8 w-px bg-gradient-to-b from-sky-200 via-cyan-200 to-transparent" />

          {/* Share Buttons */}
          <div className="flex flex-col gap-3">
            {shareItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative"
                >
                  {/* Tooltip */}
                  <div className="pointer-events-none absolute left-[calc(100%+1rem)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-600 opacity-0 shadow-[0_10px_30px_rgba(14,165,233,0.08)] backdrop-blur-xl transition-all duration-300 group-hover:flex group-hover:opacity-100">
                    {item.label}
                  </div>

                  <div className="relative overflow-hidden rounded-[1.1rem] border border-white/70 bg-white/80 p-3 shadow-[0_8px_24px_rgba(14,165,233,0.05)] backdrop-blur-xl transition-all duration-500 group-hover:border-sky-200 group-hover:bg-sky-50/70">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative z-10">
                      <Icon className="h-4 w-4 text-slate-600 transition-colors duration-500 group-hover:text-sky-500" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Bottom Divider */}
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-sky-200 to-cyan-200" />

          {/* Save Button */}
          <motion.button
            whileHover={{ y: -4, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group relative"
          >
            <div className="pointer-events-none absolute left-[calc(100%+1rem)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-600 opacity-0 shadow-[0_10px_30px_rgba(14,165,233,0.08)] backdrop-blur-xl transition-all duration-300 group-hover:flex group-hover:opacity-100">
              Save Article
            </div>
            <div className="relative overflow-hidden rounded-[1.1rem] border border-white/70 bg-white/80 p-3 shadow-[0_8px_24px_rgba(14,165,233,0.05)] backdrop-blur-xl transition-all duration-500 group-hover:border-sky-200 group-hover:bg-sky-50/70">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <Heart className="h-4 w-4 text-slate-600 transition-colors duration-500 group-hover:text-sky-500" />
              </div>
            </div>
          </motion.button>

          {/* Copy Floating Action */}
          <motion.button
            whileHover={{ y: -4, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group relative mt-2"
          >
            <div className="pointer-events-none absolute left-[calc(100%+1rem)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-600 opacity-0 shadow-[0_10px_30px_rgba(14,165,233,0.08)] backdrop-blur-xl transition-all duration-300 group-hover:flex group-hover:opacity-100">
              Quick Copy
            </div>
            <div className="relative overflow-hidden rounded-full border border-sky-100 bg-gradient-to-r from-sky-400 to-cyan-400 p-3 shadow-[0_12px_30px_rgba(14,165,233,0.22)] transition-all duration-500 group-hover:shadow-[0_18px_40px_rgba(14,165,233,0.3)]">
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <Copy className="h-4 w-4 text-white" />
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
