"use client";

import React from "react";
import { motion, Easing} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface BlogPaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function BlogPaginationControls({
  currentPage,
  totalPages,
  onNext,
  onPrev,
}: BlogPaginationControlsProps) {
  // Format numbers to have leading zeros (e.g., 01, 02)
  const formatPageNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  // Custom cinematic easing
  const easeOutExpo:Easing = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: easeOutExpo }}
      className="flex w-full justify-center py-12 md:py-16"
    >
      <div className="relative group">
        {/* 🌌 Atmospheric Glow - Hidden by default, reveals softly on hover */}
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-sky-400/20 via-cyan-400/20 to-sky-400/20 blur-xl opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />

        {/* 💊 Floating Editorial Capsule */}
        <div className="relative flex items-center justify-between gap-4 rounded-full border border-white/60 bg-white/65 p-2 shadow-[0_18px_50px_rgba(14,165,233,0.10)] backdrop-blur-xl md:gap-8 md:px-3">
          {/* ← Previous Button */}
          <motion.button
            whileHover={!isFirstPage ? { y: -1 } : {}}
            whileTap={!isFirstPage ? { y: 0 } : {}}
            onClick={onPrev}
            disabled={isFirstPage}
            className={`flex h-10 items-center justify-center gap-2 rounded-full px-4 transition-all duration-500 ease-out md:px-5 ${
              isFirstPage
                ? "cursor-not-allowed opacity-40 grayscale"
                : "cursor-pointer hover:bg-white/50 hover:shadow-sm"
            }`}
          >
            <ArrowLeft
              className={`h-4 w-4 transition-colors duration-500 ${
                isFirstPage ? "text-slate-400" : "text-sky-500"
              }`}
              strokeWidth={1.5}
            />
            <span
              className={`hidden text-[13px] font-medium tracking-wide md:block ${
                isFirstPage ? "text-slate-400" : "text-slate-700"
              }`}
            >
              Previous
            </span>
          </motion.button>

          {/* 📖 Editorial Page Indicator */}
          <div className="flex items-center justify-center gap-3 px-2 text-[11px] font-medium uppercase tracking-[0.2em] md:px-4">
            <span className="text-slate-800">
              {formatPageNumber(currentPage)}
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">
              {formatPageNumber(totalPages)}
            </span>
          </div>

          {/* Next → Button */}
          <motion.button
            whileHover={!isLastPage ? { y: -1 } : {}}
            whileTap={!isLastPage ? { y: 0 } : {}}
            onClick={onNext}
            disabled={isLastPage}
            className={`flex h-10 items-center justify-center gap-2 rounded-full px-4 transition-all duration-500 ease-out md:px-5 ${
              isLastPage
                ? "cursor-not-allowed opacity-40 grayscale"
                : "cursor-pointer hover:bg-white/50 hover:shadow-sm"
            }`}
          >
            <span
              className={`hidden text-[13px] font-medium tracking-wide md:block ${
                isLastPage ? "text-slate-400" : "text-slate-700"
              }`}
            >
              Next
            </span>
            <ArrowRight
              className={`h-4 w-4 transition-colors duration-500 ${
                isLastPage ? "text-slate-400" : "text-sky-500"
              }`}
              strokeWidth={1.5}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
