"use client";

import { Check, X } from "lucide-react";

const inclusions = [
  "Premium AC Accommodation (Hotel / Houseboat)",
  "Daily Breakfast & Dinner",
  "Dedicated Air-conditioned Transport",
  "Expert Local Guide Throughout",
  "Airport & Railway Station Transfers",
  "All Toll Taxes & Parking Charges",
  "Shikara Ride on Dal Lake (1 hr)",
  "Gondola Ticket at Gulmarg (Phase 1)",
];

const exclusions = [
  "Airfare or Train Tickets",
  "Lunch & Personal Meals",
  "Entry Fees to Monuments & Parks",
  "Gondola Phase 2 (Apharwat Peak)",
  "Pony / Horse Rides at Pahalgam",
  "Personal Travel Insurance",
  "Tips, Porterage & Laundry",
  "Anything Not Mentioned in Inclusions",
];

export default function InclusionsExclusions() {
  return (
    <div className="w-full">
      {/* Section header */}
      <div className="mb-8">
        <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-sky-500 mb-1.5 block">
          Package Details
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Inclusions &amp; Exclusions
        </h2>
      </div>

      {/* Two column layout on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── INCLUSIONS ── */}
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          {/* Column header */}
          <div className="flex items-center gap-2.5 px-5 py-3.5 bg-emerald-50 border-b border-emerald-100">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-sm font-semibold text-emerald-700 tracking-wide">
              Inclusions
            </span>
          </div>

          {/* Items */}
          <ul className="divide-y divide-slate-50">
            {inclusions.map((item, i) => (
              <li
                key={i}
                className="group flex items-center gap-3.5 px-5 py-3.5 hover:bg-emerald-50/50 transition-colors duration-200 cursor-default"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-emerald-200 flex items-center justify-center transition-all duration-200 group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:shadow-md group-hover:shadow-emerald-200">
                  <Check
                    className="w-3 h-3 text-emerald-400 transition-colors duration-200 group-hover:text-white"
                    strokeWidth={3}
                  />
                </div>
                <span className="text-sm text-slate-600 font-medium group-hover:text-slate-800 transition-colors duration-200">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── EXCLUSIONS ── */}
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          {/* Column header */}
          <div className="flex items-center gap-2.5 px-5 py-3.5 bg-rose-50 border-b border-rose-100">
            <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0">
              <X className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-sm font-semibold text-rose-700 tracking-wide">
              Exclusions
            </span>
          </div>

          {/* Items */}
          <ul className="divide-y divide-slate-50">
            {exclusions.map((item, i) => (
              <li
                key={i}
                className="group flex items-center gap-3.5 px-5 py-3.5 hover:bg-rose-50/50 transition-colors duration-200 cursor-default"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-rose-200 flex items-center justify-center transition-all duration-200 group-hover:border-rose-500 group-hover:bg-rose-500 group-hover:shadow-md group-hover:shadow-rose-200">
                  <X
                    className="w-3 h-3 text-rose-400 transition-colors duration-200 group-hover:text-white"
                    strokeWidth={3}
                  />
                </div>
                <span className="text-sm text-slate-600 font-medium group-hover:text-slate-800 transition-colors duration-200">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
