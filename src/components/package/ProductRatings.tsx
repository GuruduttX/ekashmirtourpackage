"use client";

import { Heart, Star, PhoneCall, Users } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "10,000+",
    desc: "Happy travelers from 70+ countries across the globe.",
  },
  {
    icon: Star,
    title: "4.8 / 5",
    desc: "Top-rated experiences across Google & TripAdvisor.",
  },
  {
    icon: Heart,
    title: "Curated with Love",
    desc: "Thoughtfully designed Indian-friendly itineraries.",
  },
  {
    icon: PhoneCall,
    title: "24/7 Assistance",
    desc: "Support before, during & after your journey.",
  },
];

export default function ProductRatings() {
  return (
    <section className="relative w-full bg-sky-50/40 py-6 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* ── Desktop: 4-col grid ── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group relative isolate rounded-3xl bg-white p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-100 cursor-pointer overflow-hidden border border-transparent hover:border-cyan-50"
              >
                <span className="pointer-events-none absolute inset-0 rounded-3xl bg-cyan-50/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10" />
                <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 text-white shadow-md shadow-sky-200 transition-transform duration-500 group-hover:scale-110">
                  <Icon size={28} />
                </div>
                <h3 className="relative z-10 mb-3 text-2xl font-extrabold text-gray-900">
                  {item.title}
                </h3>
                <p className="relative z-10 text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Mobile: horizontal scroll strip ── */}
        <div
          className="flex md:hidden gap-4 overflow-x-auto pb-3 -mx-6 px-6"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group relative isolate flex-shrink-0 w-[72vw] max-w-[260px] rounded-3xl bg-white p-6 text-center shadow-sm border border-sky-50 cursor-pointer overflow-hidden"
                style={{ scrollSnapAlign: "start" }}
              >
                <span className="pointer-events-none absolute inset-0 rounded-3xl bg-cyan-50/50 opacity-0 -z-10" />
                <div className="relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 text-white shadow-md shadow-sky-200">
                  <Icon size={24} />
                </div>
                <h3 className="relative z-10 mb-2 text-xl font-extrabold text-gray-900">
                  {item.title}
                </h3>
                <p className="relative z-10 text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Scroll dots — mobile only */}
        <div className="flex md:hidden justify-center gap-1.5 mt-3">
          {features.map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-sky-200" />
          ))}
        </div>
      </div>
    </section>
  );
}
