"use client";

import { useState } from "react";

const ITINERARY_DATA = [
  {
    day: 1,
    title: "Arrival in Srinagar & Houseboat Stay",
    description:
      "Welcome to the Venice of the East. Upon arrival at Srinagar airport, our representative will greet you. Transfer to your premium cedar-wood houseboat on Dal Lake. In the late afternoon, enjoy a peaceful Shikara ride as the sun sets over the Pir Panjal range.",
  },
  {
    day: 2,
    title: "Srinagar Local Sightseeing",
    description:
      "After breakfast, explore the famous Mughal Gardens — Nishat Bagh (The Garden of Pleasure) and Shalimar Bagh (Abode of Love). Visit the Shankaracharya Temple and take a stroll through the old city's bustling markets. Return to the houseboat for dinner.",
  },
  {
    day: 3,
    title: "Day Trip to Gulmarg",
    description:
      "Drive to Gulmarg, the Meadow of Flowers. Experience the world-highest cable car, the Gulmarg Gondola, reaching Phase 1 and Phase 2 (weather permitting). Enjoy the breathtaking snowscapes and return to Srinagar in the evening.",
  },
  {
    day: 4,
    title: "Pahalgam Valley Excursion",
    description:
      "Embark on a scenic drive to Pahalgam, the Valley of Shepherds. En route, visit the saffron fields of Pampore. Spend the day exploring Betaab Valley and Aru Valley. Enjoy the serene Lidder river before heading back to your accommodation.",
  },
  {
    day: 5,
    title: "Departure with Memories",
    description:
      "Enjoy your final Kashmiri breakfast. Depending on your flight schedule, you may have time for some last-minute shopping for Pashmina shawls and walnut wood crafts. Transfer to the airport for your onward journey.",
  },
];

export default function PackageItinerary() {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-8 font-heading">
        Itinerary Highlights
      </h2>
      <div className="space-y-4">
        {ITINERARY_DATA.map((item) => {
          const isExpanded = expandedDay === item.day;

          return (
            <div
              key={item.day}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? "border-sky-200 bg-white shadow-[0_8px_30px_rgba(14,165,233,0.06)]"
                  : "border-slate-100 bg-slate-50/50 hover:bg-slate-50"
              }`}
            >
              <button
                onClick={() => toggleDay(item.day)}
                className="w-full flex items-center gap-4 sm:gap-6 p-5 sm:p-6 text-left focus:outline-none"
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-colors duration-300 ${
                    isExpanded
                      ? "bg-gradient-to-tr from-[#0EA5E9] to-[#38BDF8] text-white shadow-md shadow-sky-200"
                      : "bg-white text-slate-400 border border-slate-200"
                  }`}
                >
                  {item.day}
                </div>
                <div className="flex-grow">
                  <span
                    className={`block text-xs font-semibold tracking-wider uppercase mb-1 transition-colors ${
                      isExpanded ? "text-sky-500" : "text-slate-400"
                    }`}
                  >
                    Day {item.day}
                  </span>
                  <h3
                    className={`text-lg sm:text-xl font-bold transition-colors ${
                      isExpanded ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    isExpanded
                      ? "rotate-180 bg-sky-50 text-sky-500"
                      : "bg-white text-slate-400 border border-slate-200"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isExpanded
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-5 sm:p-6 pt-0 sm:pt-0 pl-[4.5rem] sm:pl-[5.5rem]">
                    <p className="text-slate-600 leading-relaxed font-light text-[0.95rem] sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
