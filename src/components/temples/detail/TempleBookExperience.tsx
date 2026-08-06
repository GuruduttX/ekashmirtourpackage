"use client";

import { BookOpen, Flame, Gift, Ticket } from "lucide-react";
import SectionCard from "./SectionCard";

/**
 * Static — these are enquiry entry points, not real bookings, so there are no
 * CMS fields behind them. Every button opens the shared travel enquiry popup.
 */
const EXPERIENCES = [
  { icon: Ticket, title: "Darshan Booking", subtitle: "From 0- Free" },
  { icon: Flame, title: "Pooja Booking", subtitle: "Personalized Rituals" },
  { icon: Gift, title: "Chadava ( Offerings )", subtitle: "From 0- Free" },
];

export default function TempleBookExperience({ onEnquire }: { onEnquire: () => void }) {
  return (
    <SectionCard icon={BookOpen} title="Book your experience">
      <div className="space-y-3">
        {EXPERIENCES.map(({ icon: Icon, title, subtitle }) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50/40 p-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-sky-500 shadow-sm">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold leading-tight text-slate-900">{title}</p>
              <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
            </div>
            <button
              type="button"
              onClick={onEnquire}
              className="shrink-0 self-center rounded-lg bg-linear-to-r from-sky-500 to-cyan-400 px-2.5 py-1.5 text-[11px] font-semibold text-white"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
