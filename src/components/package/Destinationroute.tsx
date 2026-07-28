"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Route, Flag, MapPin } from "lucide-react";

const defaultRouteData = {
  source: "Srinagar",
  destination: "Gulmarg",
  segments: [
    { id: "1", from: "Srinagar", to: "Tangmarg" },
    { id: "2", from: "Tangmarg", to: "Gulmarg" },
  ],
};

export default function DestinationRoute({ routeData = defaultRouteData }) {
  const [open, setOpen] = useState(false);

  const mainRoute = `${routeData.source} → ${routeData.destination}`;

  // Flatten the segment chain into a single ordered list of stop names —
  // source, then each segment's endpoint — for the horizontal timeline.
  const places =
    routeData.segments.length > 0
      ? [routeData.source, ...routeData.segments.map((s) => s.to)]
      : [routeData.source, routeData.destination];

  return (
    <div className="w-full max-w-3xl px-4 sm:px-5">
      {/* MAIN PREMIUM HEADER CARD */}
      <button
        onClick={() => setOpen(!open)}
        className={`group relative w-full flex items-center justify-between rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3.5 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-sky-500/20
        ${
          open
            ? "bg-gradient-to-r from-sky-500 to-cyan-500 border-transparent shadow-[0_12px_30px_rgba(14,165,233,0.25)] text-white"
            : "bg-slate-50/80 border border-slate-200/60 shadow-sm hover:border-sky-300 hover:shadow-md hover:bg-white"
        }`}
      >
        {/* LEFT SIDE: Icon & Typography */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Icon Container */}
          <div
            className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-500
            ${
              open
                ? "bg-white/20 backdrop-blur-md shadow-inner text-white"
                : "bg-gradient-to-br from-sky-400 to-cyan-500 text-white shadow-md group-hover:scale-105"
            }`}
          >
            <Route strokeWidth={2.5} className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
          </div>

          <div className="flex flex-col justify-center">
            <p
              className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5 transition-colors
              ${open ? "text-white/80" : "text-sky-500"}`}
            >
              Journey Route
            </p>
            <p
              className={`text-sm sm:text-base font-bold tracking-tight transition-colors
              ${open ? "text-white" : "text-slate-800"}`}
            >
              {mainRoute}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Animated Chevron */}
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-500 ${
            open ? "bg-white/10" : "bg-transparent"
          }`}
        >
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? "rotate-180 text-white" : "text-sky-500"
            }`}
          />
        </div>
      </button>

      {/* DROPDOWN TIMELINE PANEL */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="rounded-[2rem] border border-slate-100 bg-white px-0 py-6 sm:p-10 shadow-[0_15px_60px_rgba(0,0,0,0.05)]">
          <div className="flex flex-wrap items-start justify-center gap-y-6">
            {places.map((place, index) => {
              const isLast = index === places.length - 1;
              return (
                <div key={`${place}-${index}`} className="flex items-start">
                  <div className="flex w-16 flex-col items-center gap-2 px-1 sm:w-20">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 ${
                        isLast
                          ? "bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-200"
                          : "border-2 border-sky-200 bg-white text-sky-500 shadow-sm hover:border-sky-300"
                      }`}
                    >
                      {isLast ? (
                        <Flag size={18} strokeWidth={2.5} />
                      ) : (
                        <MapPin size={16} strokeWidth={2.5} />
                      )}
                    </div>
                    <p
                      className={`w-full truncate text-center text-[12px] sm:text-[13px] font-semibold leading-tight ${
                        isLast ? "text-sky-600" : "text-slate-800"
                      }`}
                      title={place}
                    >
                      {place}
                    </p>
                  </div>

                  {!isLast && (
                    <div className="flex h-10 items-center px-1">
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
