"use client";

import { useState } from "react";
import { ChevronDown, MapPin, Clock } from "lucide-react";

const defaultPackageData = {
  itinerary: [
    {
      day: 1,
      title: "Arrival in Srinagar",
      description: `<p>Arrive at Sheikh ul-Alam International Airport and transfer to your houseboat on Dal Lake. Settle in and enjoy a welcome Kahwa tea as you take in the lake views.</p><p>In the evening, take a leisurely shikara ride to watch the sun set over the Zabarwan mountains.</p>`,
    },
    {
      day: 2,
      title: "Srinagar City & Mughal Gardens",
      description: `<p>After breakfast, visit the stunning Mughal Gardens — Nishat Bagh, Shalimar Bagh, and Chashme Shahi. Each garden offers terraced lawns, fountains, and breathtaking views of the Dal Lake.</p><p>Afternoon visit to the old city, Jama Masjid, and the famous Shah Hamdan shrine.</p>`,
    },
    {
      day: 3,
      title: "Day Trip to Gulmarg",
      description: `<p>Drive to Gulmarg, the 'Meadow of Flowers', around 50 km from Srinagar. Board the Gondola — one of Asia's highest cable cars — for panoramic Himalayan views.</p><p>Enjoy the snow-covered slopes and crisp mountain air before returning to Srinagar by evening.</p>`,
    },
    {
      day: 4,
      title: "Pahalgam — Valley of Shepherds",
      description: `<p>Head to Pahalgam, a scenic valley town set along the Lidder River. Explore Betab Valley and Aru Valley, famous for their lush meadows and pine forests.</p><p>Optional pony ride to Baisaran meadow for sweeping views of the surrounding peaks.</p>`,
    },
    {
      day: 5,
      title: "Sonamarg Excursion",
      description: `<p>Full-day excursion to Sonamarg, the 'Meadow of Gold'. The drive itself is spectacular, winding through pine forests and glacier-fed streams.</p><p>Visit the Thajiwas Glacier and enjoy a packed lunch surrounded by alpine scenery.</p>`,
    },
    {
      day: 6,
      title: "Leisure Day & Wazwan Dinner",
      description: `<p>A relaxed morning at your own pace — browse the local markets for Pashmina shawls, saffron, and dry fruits. Visit the Hazratbal Shrine overlooking Dal Lake.</p><p>In the evening, enjoy a traditional Wazwan dinner — a royal Kashmiri multi-course feast featuring Rogan Josh, Dum Aloo, and Gushtaba.</p>`,
    },
    {
      day: 7,
      title: "Departure",
      description: `<p>After a final breakfast on the houseboat, check out and transfer to Srinagar Airport for your onward journey. Depart with memories of Kashmir's timeless beauty.</p>`,
    },
  ],
};

export default function ItineraryAccordion({
  PackageData = defaultPackageData,
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="w-full max-w-4xl px-5 space-y-3 sm:space-y-4">
      <h2 className="text-2xl font-bold">Itinerary</h2>

      {PackageData.itinerary.map((item, index) => {
        const isOpen = active === index;

        return (
          <div
            key={index}
            className={`group rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "border-cyan-500 bg-sky-50 shadow-lg shadow-cyan-100"
                : "border-gray-200 bg-white hover:border-cyan-300"
            }`}
          >
            {/* Header */}
            <button
              onClick={() => setActive(isOpen ? null : index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Day Badge */}
                <span className="flex gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-1 text-xs md:text-sm font-bold text-white shadow">
                  <span>Day</span>
                  {item.day}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>

              {/* Arrow */}
              <ChevronDown
                className={`h-6 w-6 text-cyan-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 pt-2 text-gray-700 space-y-4">
                {/* Meta Info */}
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>Full Day</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Guided Experience</span>
                  </div>
                </div>

                {/* Description */}
                <section className="mx-auto px-4 py-4">
                  <div
                    className="ItineraryContent
                      prose prose-slate max-w-none
                      prose-ul:list-disc prose-ul:pl-6
                      prose-ol:list-decimal prose-ol:pl-6
                      prose-li:my-1
                      prose-li:marker:text-slate-500
                      prose-p:leading-7
                    "
                    dangerouslySetInnerHTML={{
                      __html: item?.description ?? "",
                    }}
                  />
                </section>

                {/* Accent Line */}
                <div className="h-1 w-24 rounded-full bg-gradient-to-r from-sky-400 to-cyan-500" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
