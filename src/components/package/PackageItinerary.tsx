"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  stops?: string[];
}

interface PackageItineraryProps {
  PackageData?: { itinerary: ItineraryDay[] };
}

const defaultPackageData: { itinerary: ItineraryDay[] } = {
  itinerary: [
    {
      day: 1,
      title: "Arrival in Srinagar",
      description: `<p>Arrive at Sheikh ul-Alam International Airport and transfer to your houseboat on Dal Lake. Settle in and enjoy a welcome Kahwa tea as you take in the lake views.</p><p>In the evening, take a leisurely shikara ride to watch the sun set over the Zabarwan mountains.</p>`,
      stops: ["Srinagar Airport", "Dal Lake", "Shikara ride"],
    },
    {
      day: 2,
      title: "Srinagar City & Mughal Gardens",
      description: `<p>After breakfast, visit the stunning Mughal Gardens — Nishat Bagh, Shalimar Bagh, and Chashme Shahi. Each garden offers terraced lawns, fountains, and breathtaking views of the Dal Lake.</p><p>Afternoon visit to the old city, Jama Masjid, and the famous Shah Hamdan shrine.</p>`,
      stops: ["Nishat Bagh", "Shalimar Bagh", "Chashme Shahi", "Jama Masjid", "Shah Hamdan shrine"],
    },
    {
      day: 3,
      title: "Day Trip to Gulmarg",
      description: `<p>Drive to Gulmarg, the 'Meadow of Flowers', around 50 km from Srinagar. Board the Gondola — one of Asia's highest cable cars — for panoramic Himalayan views.</p><p>Enjoy the snow-covered slopes and crisp mountain air before returning to Srinagar by evening.</p>`,
      stops: ["Gulmarg", "Gondola ride"],
    },
    {
      day: 4,
      title: "Pahalgam — Valley of Shepherds",
      description: `<p>Head to Pahalgam, a scenic valley town set along the Lidder River. Explore Betab Valley and Aru Valley, famous for their lush meadows and pine forests.</p><p>Optional pony ride to Baisaran meadow for sweeping views of the surrounding peaks.</p>`,
      stops: ["Pahalgam", "Betab Valley", "Aru Valley", "Baisaran meadow"],
    },
    {
      day: 5,
      title: "Sonamarg Excursion",
      description: `<p>Full-day excursion to Sonamarg, the 'Meadow of Gold'. The drive itself is spectacular, winding through pine forests and glacier-fed streams.</p><p>Visit the Thajiwas Glacier and enjoy a packed lunch surrounded by alpine scenery.</p>`,
      stops: ["Sonamarg", "Thajiwas Glacier"],
    },
    {
      day: 6,
      title: "Leisure Day & Wazwan Dinner",
      description: `<p>A relaxed morning at your own pace — browse the local markets for Pashmina shawls, saffron, and dry fruits. Visit the Hazratbal Shrine overlooking Dal Lake.</p><p>In the evening, enjoy a traditional Wazwan dinner — a royal Kashmiri multi-course feast featuring Rogan Josh, Dum Aloo, and Gushtaba.</p>`,
      stops: ["Local markets", "Hazratbal Shrine", "Wazwan dinner"],
    },
    {
      day: 7,
      title: "Departure",
      description: `<p>After a final breakfast on the houseboat, check out and transfer to Srinagar Airport for your onward journey. Depart with memories of Kashmir's timeless beauty.</p>`,
      stops: ["Srinagar Airport"],
    },
  ],
};

/**
 * Builds a key-free Google Maps directions embed URL from a day's stops.
 * Uses the classic maps.google.com "output=embed" iframe (no Maps Embed
 * API key required) — origin is the first stop, destination is the last,
 * with everything in between chained as waypoints via "+to:".
 * Returns null when there are fewer than two stops (no route to draw).
 */
function buildDirectionsEmbedUrl(stops: string[] | undefined): string | null {
  const clean = (stops ?? []).map((s) => s.trim()).filter(Boolean);
  if (clean.length < 2) return null;

  const [origin, ...rest] = clean;
  const daddr = rest.map((stop) => encodeURIComponent(stop)).join("+to:");

  return `https://maps.google.com/maps?saddr=${encodeURIComponent(origin)}&daddr=${daddr}&output=embed`;
}

export default function PackageItinerary({
  PackageData = defaultPackageData,
}: PackageItineraryProps) {
  const days = PackageData.itinerary;
  const [activeIndex, setActiveIndex] = useState(0);

  if (days.length === 0) return null;

  const activeDay = days[Math.min(activeIndex, days.length - 1)];
  const mapSrc = buildDirectionsEmbedUrl(activeDay.stops);

  return (
    <section className="w-full space-y-5 sm:space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 md:text-2xl">Itinerary</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
        {/* ── Map — below on mobile, left column on desktop ── */}
        <div className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-3xl border border-sky-100/60 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3.5">
              <Navigation className="h-4 w-4 shrink-0 text-sky-500" />
              <p className="text-sm font-semibold text-slate-800">
                Day {activeDay.day} route
                {activeDay.stops && activeDay.stops.length > 0 && (
                  <span className="ml-1 font-normal text-slate-400">
                    · {activeDay.stops.length} {activeDay.stops.length === 1 ? "stop" : "stops"}
                  </span>
                )}
              </p>
            </div>

            {mapSrc ? (
              <iframe
                key={mapSrc}
                src={mapSrc}
                title={`Route map for Day ${activeDay.day}`}
                className="h-72 w-full border-0 sm:h-96 lg:h-105"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-72 w-full flex-col items-center justify-center gap-2 bg-sky-50/60 px-6 text-center sm:h-96 lg:h-105">
                <MapPin className="h-6 w-6 text-sky-300" />
                <p className="text-sm text-slate-400">
                  Add at least two stops to this day to preview its route.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Day pills + details — on top on mobile, right column on desktop ── */}
        <div className="order-1 flex flex-col gap-4 lg:order-2">
          {/* Day pills */}
          <div className="-mx-4 overflow-x-auto scroll-hide px-4 pb-1 lg:mx-0 lg:overflow-visible lg:px-0">
            <div className="flex gap-2 lg:flex-wrap">
              {days.map((day, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={day.day}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                      active
                        ? "bg-slate-900 text-white shadow-md"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-slate-900"
                    }`}
                  >
                    Day {day.day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active day details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex shrink-0 items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-500 px-4 py-1 text-xs font-bold text-white shadow md:text-sm">
                <span>Day</span>
                {activeDay.day}
              </span>
              <h3 className="text-sm font-semibold text-gray-900 md:text-lg">{activeDay.title}</h3>
            </div>

            <div className="no-scrollbar mt-4 max-h-56 overflow-y-auto pr-3 sm:max-h-72">
              <div
                className="itinerary-content"
                dangerouslySetInnerHTML={{ __html: activeDay.description ?? "" }}
              />
            </div>

            {activeDay.stops && activeDay.stops.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {activeDay.stops.map((stop, i) => (
                  <span
                    key={`${stop}-${i}`}
                    className="flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700"
                  >
                    <MapPin size={12} className="shrink-0" />
                    {stop}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 h-1 w-24 rounded-full bg-linear-to-r from-sky-400 to-cyan-500" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .itinerary-content {
          color: rgb(51 65 85);
        }

        .itinerary-content > *:first-child {
          margin-top: 0;
        }
        .itinerary-content > *:last-child {
          margin-bottom: 0;
        }

        .itinerary-content p {
          font-size: 0.95rem;
          line-height: 1.75;
          color: rgb(51 65 85);
          margin: 0 0 0.9rem;
        }

        .itinerary-content h1,
        .itinerary-content h2,
        .itinerary-content h3,
        .itinerary-content h4 {
          font-family: var(--font-heading);
          font-weight: 700;
          color: rgb(15 23 42);
          margin: 1.25rem 0 0.5rem;
        }
        .itinerary-content h1 {
          font-size: 1.25rem;
        }
        .itinerary-content h2 {
          font-size: 1.15rem;
        }
        .itinerary-content h3 {
          font-size: 1.05rem;
        }
        .itinerary-content h4 {
          font-size: 1rem;
        }

        .itinerary-content strong,
        .itinerary-content b {
          font-weight: 600;
          color: rgb(15 23 42);
        }

        .itinerary-content em,
        .itinerary-content i {
          font-style: italic;
        }

        .itinerary-content a {
          color: rgb(2 132 199);
          text-decoration: underline;
          text-decoration-color: rgba(56, 189, 248, 0.5);
          text-underline-offset: 2px;
        }
        .itinerary-content a:hover {
          color: rgb(3 105 161);
        }

        .itinerary-content ul,
        .itinerary-content ol {
          margin: 0 0 0.9rem;
          padding-left: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .itinerary-content li {
          line-height: 1.65;
          color: rgb(51 65 85);
        }

        .itinerary-content ul {
          list-style: none;
          padding-left: 0.2rem;
        }
        .itinerary-content ul li {
          position: relative;
          padding-left: 1.3rem;
        }
        .itinerary-content ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #22d3ee);
        }

        .itinerary-content ol {
          list-style: decimal;
          padding-left: 1.2rem;
        }
        .itinerary-content ol li::marker {
          color: rgb(14 165 233);
          font-weight: 600;
        }

        .itinerary-content blockquote {
          margin: 1rem 0;
          padding: 0.75rem 1rem;
          border-left: 4px solid rgb(125 211 252);
          background: rgba(240, 249, 255, 0.7);
          border-radius: 0 0.6rem 0.6rem 0;
          color: rgb(51 65 85);
          font-style: italic;
        }
        .itinerary-content blockquote p {
          margin: 0;
        }

        .itinerary-content hr {
          border: none;
          height: 1px;
          margin: 1.25rem 0;
          background: linear-gradient(
            to right,
            transparent,
            rgba(14, 165, 233, 0.25),
            transparent
          );
        }

        .itinerary-content code {
          background: rgb(240 249 255);
          color: rgb(3 105 161);
          padding: 0.15rem 0.4rem;
          border-radius: 0.35rem;
          font-size: 0.9em;
        }

        .itinerary-content img {
          width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1rem 0;
        }

        .itinerary-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.25rem 0;
          border-radius: 0.6rem;
          overflow: hidden;
          border: 1px solid rgb(224 242 254);
        }

        .itinerary-content thead {
          background: linear-gradient(120deg, #0284c7 0%, #0ea5e9 45%, #38bdf8 100%);
        }

        .itinerary-content th {
          padding: 0.6rem 0.85rem;
          text-align: left;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
        }

        .itinerary-content td {
          padding: 0.6rem 0.85rem;
          border-top: 1px solid rgb(224 242 254);
          color: rgb(51 65 85);
        }

        .itinerary-content tr:nth-child(even) td {
          background: rgba(240, 249, 255, 0.5);
        }

        @media (max-width: 640px) {
          .itinerary-content table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
        }
      `}</style>
    </section>
  );
}
