"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Sun, Moon, CloudSun } from "lucide-react";
import type { ITempleSeasonTimings } from "@/types/templeTypes";
import { formatTimeRange } from "@/lib/templeFormat";

function periodIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("morning")) {
    return { Icon: Sun, iconBg: "bg-sky-50", iconColor: "text-sky-500" };
  }
  if (l.includes("evening") || l.includes("night")) {
    return { Icon: Moon, iconBg: "bg-cyan-50", iconColor: "text-cyan-500" };
  }
  return { Icon: CloudSun, iconBg: "bg-sky-50", iconColor: "text-sky-500" };
}

export default function TempleTimingsCard({
  name,
  location,
  seasonalTimings,
}: {
  name: string;
  location?: string;
  seasonalTimings: ITempleSeasonTimings[];
}) {
  const [activeSeasonId, setActiveSeasonId] = useState(seasonalTimings[0]?.id);

  if (!seasonalTimings.length) return null;

  const activeSeason =
    seasonalTimings.find((s) => s.id === activeSeasonId) ?? seasonalTimings[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-sky-100 px-6 py-5">
        <div>
          <h3 className="font-heading text-xl font-bold sm:text-2xl">
            <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              {name}
            </span>
          </h3>
          {location && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin className="h-4 w-4" /> {location}
            </p>
          )}
        </div>

        {seasonalTimings.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {seasonalTimings.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSeasonId(s.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  activeSeason.id === s.id
                    ? "bg-linear-to-r from-sky-500 to-cyan-400 text-white shadow-sm shadow-sky-200"
                    : "border border-sky-200 text-sky-600"
                }`}
              >
                {s.season}
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSeason.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 divide-y divide-sky-100 px-6 py-5 sm:grid-cols-2 sm:gap-x-8 sm:divide-x sm:divide-y-0"
        >
          {activeSeason.periods.map((period) => {
            const { Icon, iconBg, iconColor } = periodIcon(period.label);
            return (
              <div key={period.id} className="py-4 first:pt-0 sm:px-6 sm:py-0 sm:first:pl-0">
                <div className="flex items-center gap-2.5">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}>
                    <Icon className={`h-4 w-4 ${iconColor}`} />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    {period.label}
                  </p>
                </div>

                <div className="mt-3 space-y-2">
                  {period.entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between gap-3 rounded-xl bg-sky-50/60 px-4 py-3"
                    >
                      <span className="text-sm font-medium text-slate-700">{entry.name}</span>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-sky-600">
                        <Clock className="h-3.5 w-3.5" />{" "}
                        {formatTimeRange(entry.startTime, entry.endTime)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <p className="border-t border-sky-100 px-6 py-4 text-xs italic text-slate-400">
        * Timings may vary on festivals and special occasions. Verify locally before visiting.
      </p>
    </div>
  );
}
