"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface ItineraryStripProps {
  durationbreakdown?: Array<{ id?: string; days: number; place: string }>;
  duration?: string;
}

function ordinal(n: number): { num: string; suffix: string } {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return {
    num: String(n),
    suffix: s[(v - 20) % 10] || s[v] || s[0],
  };
}

const defaultBreakdown = [
  { id: "1", days: 1, place: "Srinagar & Dal Lake" },
  { id: "2", days: 2, place: "Gulmarg & Pahalgam" },
  { id: "3", days: 3, place: "Sonamarg" },
  { id: "4", days: 4, place: "Pahalgam & Betaab" },
  { id: "5", days: 5, place: "Departure" },
];

export default function ItineraryStrip({
  durationbreakdown = defaultBreakdown,
  duration = "Custom Tour",
}: ItineraryStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const items = durationbreakdown.length > 0 ? durationbreakdown : defaultBreakdown;

  return (
    <div className="w-full">
      {/* ── DESKTOP ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex items-stretch gap-0 overflow-x-auto overflow-y-hidden no-scrollbar rounded-xl border border-sky-100 bg-white shadow-sm w-full"
      >
        {/* Duration badge */}
        <div className="flex items-center shrink-0 px-5 py-4 border-r border-sky-100 bg-sky-50">
          <span
            className="inline-flex items-center rounded-full text-white px-4 py-1.5 text-sm font-bold tracking-wide whitespace-nowrap shadow-md shadow-sky-200"
            style={{
              background: "linear-gradient(120deg, #0284C7 0%, #0EA5E9 45%, #38BDF8 100%)",
            }}
          >
            {duration}
          </span>
        </div>

        {/* Day stop cells */}
        {items.map((item, index) => {
          const { num, suffix } = ordinal(index + 1);
          return (
            <motion.div
              key={item.id ?? index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.35) }}
              className="flex items-center shrink-0 gap-3 px-5 py-4 border-r border-sky-100 last:border-r-0 hover:bg-sky-50/60 transition-colors duration-150 group cursor-pointer"
            >
              <div className="flex items-start leading-none">
                <span className="text-3xl font-extrabold text-sky-500 group-hover:text-sky-600 transition-colors leading-none tabular-nums">
                  {num}
                </span>
                <span className="text-sm font-bold text-sky-500 group-hover:text-sky-600 mt-0.5">
                  {suffix}
                </span>
              </div>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-[10px] uppercase tracking-widest text-sky-400 font-medium">
                  Day in
                </span>
                <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">
                  {item.place}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── MOBILE ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:hidden rounded-2xl border border-sky-100/80 bg-white shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-sky-50 border-b border-sky-100/80">
          <span
            className="inline-flex items-center rounded-full text-white px-3.5 py-1 text-xs font-bold tracking-wide shadow-sm shadow-sky-200/60"
            style={{
              background: "linear-gradient(120deg, #0284C7 0%, #0EA5E9 45%, #38BDF8 100%)",
            }}
          >
            {duration}
          </span>
          <span className="text-[11px] text-sky-600 font-medium">
            {items.length} stops &nbsp;→ swipe
          </span>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {items.map((item, index) => {
              const { num, suffix } = ordinal(index + 1);
              return (
                <motion.div
                  key={item.id ?? index}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: Math.min(index * 0.05, 0.3),
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="flex flex-col items-center justify-center gap-0.5 flex-shrink-0 snap-start px-5 py-3 border-r border-sky-100/80 last:border-r-0 w-max min-w-[88px] cursor-pointer active:bg-sky-50 transition-colors"
                >
                  <div className="flex items-baseline gap-px">
                    <span className="text-[22px] font-extrabold text-sky-500 leading-none tabular-nums">
                      {num}
                    </span>
                    <span className="text-[9px] font-bold text-sky-600 leading-none mb-0.5">
                      {suffix}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight whitespace-nowrap">
                    {item.place}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent" />
        </div>

        <div className="flex items-center gap-1.5 px-3.5 py-2 border-t border-sky-100/80 bg-sky-50/40">
          <svg
            className="w-3 h-3 text-sky-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="text-[10px] text-sky-700 font-medium">
            Swipe to see all stops
          </span>
        </div>
      </motion.div>
    </div>
  );
}
