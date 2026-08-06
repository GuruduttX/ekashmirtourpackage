"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import type { ITempleDistance, ITempleSeasonTimings } from "@/types/templeTypes";
import { formatDistance, getTimingsSummary } from "@/lib/templeFormat";

export interface TempleItem {
  _id: string;
  title: string;
  slug: string;
  templeType?: string;
  location?: string;
  distances?: ITempleDistance[];
  seasonalTimings?: ITempleSeasonTimings[];
  deity?: string;
  bestTimeToVisit?: string;
  image?: string;
  alt?: string;
}

const FALLBACK =
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop&q=80";

const revealEase: Easing = [0.16, 1, 0.3, 1];

export default function TempleCard({ temple }: { temple: TempleItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Mobile — compact horizontal list card */}
      <div className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] sm:hidden">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={temple.image || FALLBACK}
            alt={temple.alt || temple.title}
            fill
            unoptimized
            className="object-cover"
          />
          {temple.templeType && (
            <span className="absolute bottom-1 left-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              {temple.templeType}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <h3 className="truncate font-heading text-base font-bold text-slate-900">
              {temple.title}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-sky-500">
              {temple.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {temple.location}
                </span>
              )}
              {temple.distances?.[0] && (
                <span className="text-slate-400">
                  {formatDistance(temple.distances[0].distanceKm, temple.distances[0].from)}
                </span>
              )}
            </div>
          </div>

          <div className="mt-2 flex items-end justify-between gap-2">
            {getTimingsSummary(temple.seasonalTimings) && (
              <p className="flex items-center gap-1 text-[11px] text-slate-500">
                <Clock className="h-3 w-3 shrink-0" /> {getTimingsSummary(temple.seasonalTimings)}
              </p>
            )}
            <Link
              href={`/temples/${temple.slug}`}
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-sky-200"
            >
              View <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tablet / desktop — full-bleed photo card, more info on hover */}
      <motion.div
        onHoverStart={() => setExpanded(true)}
        onHoverEnd={() => setExpanded(false)}
        className="relative hidden h-72 w-full overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.16)] sm:block sm:h-80"
      >
        <Image
          src={temple.image || FALLBACK}
          alt={temple.alt || temple.title}
          fill
          unoptimized
          className="object-cover"
        />

        <div
          className={`absolute bottom-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            expanded
              ? "inset-x-3 mb-3 rounded-2xl border border-white/20 bg-black/30 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "inset-x-0 bg-linear-to-t from-black/85 via-black/50 to-transparent px-3 pb-3 pt-8"
          }`}
        >
          <h3 className="font-heading text-sm font-bold text-white">{temple.title}</h3>
          {temple.location && (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-white/90">
              <MapPin className="h-3 w-3 shrink-0" /> {temple.location}
            </p>
          )}

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.7, ease: revealEase }}
                className="overflow-hidden"
              >
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/20 pt-2">
                  {temple.deity && (
                    <div>
                      <p className="text-[10px] font-semibold text-white/60">Significance</p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-tight text-white">
                        {temple.deity}
                      </p>
                    </div>
                  )}
                  {temple.bestTimeToVisit && (
                    <div>
                      <p className="text-[10px] font-semibold text-white/60">Best Time</p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-tight text-white">
                        {temple.bestTimeToVisit}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-2 flex gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className="flex-1 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 py-1.5 text-[11px] font-semibold text-white"
                  >
                    Add to Yatra
                  </button>
                  <Link
                    href={`/temples/${temple.slug}`}
                    className="flex-1 rounded-full border border-white/50 py-1.5 text-center text-[11px] font-semibold text-white"
                  >
                    Explore
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
