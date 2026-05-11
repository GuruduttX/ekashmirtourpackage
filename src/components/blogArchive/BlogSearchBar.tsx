

"use client";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

interface BlogSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogSearchBar({
  value,
  onChange,
}: BlogSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative w-full max-w-xl"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-sky-400/20 via-cyan-400/10 to-sky-400/20 blur-3xl" />

      {/* Floating Orb */}
      <div className="absolute -right-6 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[70px]" />

      {/* Search Container */}
      <motion.div
        animate={{
          borderColor: isFocused
            ? "rgba(56,189,248,0.35)"
            : "rgba(255,255,255,0.7)",
          boxShadow: isFocused
            ? "0 25px 60px rgba(14,165,233,0.16)"
            : "0 18px 45px rgba(14,165,233,0.08)",
        }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-[2rem] border bg-white/70 backdrop-blur-2xl"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-sky-50/50" />

        {/* Animated Glow */}
        <motion.div
          animate={{
            opacity: isFocused ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-r from-sky-400/10 via-cyan-400/5 to-sky-400/10"
        />

        <div className="relative z-10 flex items-center gap-4 px-4 py-1 md:px-5 md:py-4 sm:px-6">
          {/* Search Icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50/80 shadow-[0_10px_30px_rgba(14,165,233,0.06)]">
            <Search className="h-4.5 w-4.5 text-sky-500" />
          </div>

          {/* Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search Kashmir stories, guides & experiences..."
            className="w-full bg-transparent text-[15px] font-light tracking-[-0.02em] text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />

          {/* Shortcut Pill */}
          <div className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-2 backdrop-blur-xl sm:flex">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />

            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Explore
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}