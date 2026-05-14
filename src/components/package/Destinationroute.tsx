"use client";

import { useState } from "react";
import { ChevronDown, Navigation, Route, Flag, MapPin } from "lucide-react";

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

  return (
    <div className="w-full max-w-3xl px-4 sm:px-5">
      {/* MAIN PREMIUM HEADER CARD */}
      <button
        onClick={() => setOpen(!open)}
        className={`group relative w-full flex items-center justify-between rounded-[2rem] px-2 py-2 sm:px-8 sm:py-6 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-sky-500/20
        ${
          open
            ? "bg-gradient-to-r from-sky-500 to-cyan-500 border-transparent shadow-[0_20px_50px_rgba(14,165,233,0.25)] text-white"
            : "bg-slate-50/80 border border-slate-200/60 shadow-sm hover:border-sky-300 hover:shadow-md hover:bg-white"
        }`}
      >
        {/* LEFT SIDE: Icon & Typography */}
        <div className="flex items-center gap-5 sm:gap-6">
          {/* Icon Container */}
          <div
            className={`flex h-10 w-10 p-2 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl transition-all duration-500
            ${
              open
                ? "bg-white/20 backdrop-blur-md shadow-inner text-white"
                : "bg-gradient-to-br from-sky-400 to-cyan-500 text-white shadow-md group-hover:scale-105"
            }`}
          >
            <Route strokeWidth={2.5} className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>

          <div className="flex flex-col justify-center">
            <p
              className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] mb-1 sm:mb-1.5 transition-colors
              ${open ? "text-white/80" : "text-sky-500"}`}
            >
              Journey Route
            </p>
            <p
              className={`text-md sm:text-xl font-bold tracking-tight transition-colors
              ${open ? "text-white" : "text-slate-800"}`}
            >
              {mainRoute}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Animated Chevron */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 ${
            open ? "bg-white/10" : "bg-transparent"
          }`}
        >
          <ChevronDown
            className={`h-6 w-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
        <div className="rounded-[2rem] border border-slate-100 bg-white p-6 sm:p-10 shadow-[0_15px_60px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col">
            {routeData.segments.map((segment, index) => (
              <div
                key={segment.id}
                className="group relative flex gap-6 pb-5 sm:pb-6"
              >
                {/* Vertical Connector Line (Stretches to next item via padding) */}
                <div className="absolute left-[19px] top-10 h-full w-[2px] bg-sky-100 group-hover:bg-sky-200 transition-colors duration-300" />

                {/* Circular Marker */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-sky-200 bg-white text-sky-500 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:border-sky-300">
                  <MapPin
                    size={16}
                    strokeWidth={2.5}
                    className="mt-[2px] ml-[2px]"
                  />
                </div>

                {/* Segment Text Content */}
                <div className="flex flex-col pt-1.5">
                  <p className="mb-1 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
                    Stop {index + 1}
                  </p>
                  <p className="text-[12px] sm:text-[15px] font-semibold text-slate-800 leading-tight">
                    {segment.from}{" "}
                    <span className="text-slate-300 mx-1">→</span> {segment.to}
                  </p>
                </div>
              </div>
            ))}

            {/* Final Destination Marker */}
            {routeData.segments.length > 0 && (
              <div className="group relative flex gap-6">
                {/* Filled Circular Marker */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-200 transition-transform duration-300 group-hover:scale-110">
                  <Flag size={18} strokeWidth={2.5} />
                </div>

                {/* Final Segment Text */}
                <div className="flex flex-col pt-1.5">
                  <p className="mb-1 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-sky-500">
                    Final Arrival
                  </p>
                  <p className="text-[16px] sm:text-[18px] font-bold text-sky-600 leading-tight">
                    {routeData.destination}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
