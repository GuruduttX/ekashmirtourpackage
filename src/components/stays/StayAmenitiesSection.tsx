"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Accessibility,
  Armchair,
  Bath,
  Car,
  Check,
  Coffee,
  Flame,
  LayoutGrid,
  Mountain,
  Refrigerator,
  Ship,
  ShowerHead,
  Snowflake,
  Sofa,
  Sparkles,
  Trees,
  Tv,
  Utensils,
  Waves,
  WashingMachine,
  Wifi,
  Wind,
} from "lucide-react";
import type { StayAmenityGroup } from "@/types/stayTypes";

type Amenity = { id: string; label: string; group: StayAmenityGroup };
type Icon = typeof Check;

/** Icon per group — the fallback when a label matches nothing specific. */
const GROUP_ICON: Record<StayAmenityGroup, Icon> = {
  Essentials: Sparkles,
  Comfort: Sofa,
  Food: Utensils,
  Outdoor: Mountain,
  Transport: Car,
  Accessibility: Accessibility,
};

/**
 * Keyword → icon. Amenity labels are free text from the CMS ("bukhari heating",
 * "shikara transfer"), so the icon is inferred rather than stored. First match
 * wins, so put the more specific keywords first.
 */
const LABEL_ICONS: Array<[RegExp, Icon]> = [
  [/wi-?fi|internet/i, Wifi],
  [/bukhari|heat|fireplace|kangri/i, Flame],
  [/a\/?c\b|air.?condition/i, Snowflake],
  [/geyser|hot water|shower/i, ShowerHead],
  [/bath|tub|toilet/i, Bath],
  [/tv|television|netflix/i, Tv],
  [/breakfast|tea|coffee/i, Coffee],
  [/kitchen|dining|restaurant|meal|dinner/i, Utensils],
  [/fridge|refrigerat|mini.?bar/i, Refrigerator],
  [/laundry|washing/i, WashingMachine],
  [/shikara|boat|ferry|dock/i, Ship],
  [/lake|water|river/i, Waves],
  [/garden|lawn|orchard|tree/i, Trees],
  [/deck|balcony|terrace|verandah|seating|lounge/i, Armchair],
  [/parking|cab|transfer|pickup|airport/i, Car],
  [/view|mountain|trek|bonfire/i, Mountain],
  [/fan|ventilat|air/i, Wind],
];

function iconFor(amenity: Amenity): Icon {
  const match = LABEL_ICONS.find(([pattern]) => pattern.test(amenity.label));
  return match ? match[1] : GROUP_ICON[amenity.group] ?? Check;
}

/**
 * Amenities — filterable by group.
 *
 * Interactive rather than a flat list because a Kashmiri property's
 * differentiators sit in specific groups (a houseboat's Outdoor, a Gulmarg
 * hotel's Comfort), and a traveller usually arrives with one of them in mind.
 *
 * The default tab is "Everything", so every amenity is in the server-rendered
 * HTML — filtering is a user action, nothing is hidden from crawlers. The
 * moving tab indicator is a shared `layoutId`; the tiles use a staggered spring
 * on mount and on every filter change.
 */
export default function StayAmenitiesSection({ amenities }: { amenities: Amenity[] }) {
  const groups = useMemo(() => {
    const order = new Map<StayAmenityGroup, number>();
    amenities.forEach((amenity) => {
      order.set(amenity.group, (order.get(amenity.group) ?? 0) + 1);
    });
    return Array.from(order.entries()).map(([group, count]) => ({ group, count }));
  }, [amenities]);

  const [active, setActive] = useState<StayAmenityGroup | "All">("All");

  const visible = useMemo(
    () => (active === "All" ? amenities : amenities.filter((a) => a.group === active)),
    [amenities, active],
  );

  if (!amenities.length) return null;

  const tabs: Array<{ key: StayAmenityGroup | "All"; label: string; count: number; icon: Icon }> = [
    { key: "All", label: "Everything", count: amenities.length, icon: LayoutGrid },
    ...groups.map(({ group, count }) => ({
      key: group,
      label: group,
      count,
      icon: GROUP_ICON[group],
    })),
  ];

  return (
    <section id="amenities" className="scroll-mt-24">
      <div className="text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          Amenities
        </p>

        <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          What this stay comes with
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {amenities.length} amenities across {groups.length}{" "}
          {groups.length === 1 ? "category" : "categories"}.
        </p>
      </div>

      {/* ---------- Group tabs ---------- */}
      {/* Scrolls inside its own box — no negative margins, which pushed the
          rail past the viewport edge on mobile. */}
      <div className="mt-5 max-w-full overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {tabs.map(({ key, label, count, icon: Icon }) => {
            const isActive = active === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                aria-pressed={isActive}
                className={`relative inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-transparent text-white"
                    : "border-slate-200 text-slate-600 hover:border-sky-200 hover:text-sky-700"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="stay-amenity-tab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 shadow-sm shadow-sky-500/30"
                  />
                )}
                <Icon className="h-4 w-4" />
                {label}
                <span
                  className={`text-xs font-semibold ${isActive ? "text-white/80" : "text-slate-400"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- Amenity tiles ---------- */}
      {/* Wrapping flex, not a grid: each tile is only as wide as its label, so
          "Wi-Fi" doesn't get the same box as "Shikara transfer on request".
          `min-w-0` + `max-w-full` keep a very long label wrapping inside the
          column instead of overflowing the page on mobile. */}
      <motion.ul layout className="mt-4 flex flex-wrap gap-2.5">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((amenity, index) => {
            const Icon = iconFor(amenity);

            return (
              <motion.li
                key={amenity.id || amenity.label}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{
                  type: "spring",
                  stiffness: 360,
                  damping: 28,
                  // Cap the stagger so a 30-amenity list still settles fast.
                  delay: Math.min(index, 12) * 0.025,
                }}
                whileHover={{ y: -3 }}
                className="group relative max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white px-3 py-2.5 transition-colors duration-300 hover:border-sky-200 hover:shadow-md hover:shadow-sky-500/5"
              >
                {/* Wash that fills in on hover — cheaper than animating a
                    gradient background, and it keeps the text contrast. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-y-full bg-linear-to-b from-sky-50 to-transparent transition-transform duration-500 group-hover:translate-y-0"
                />

                <div className="relative flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="min-w-0 text-sm font-medium leading-snug text-slate-700">
                    {amenity.label}
                  </span>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
