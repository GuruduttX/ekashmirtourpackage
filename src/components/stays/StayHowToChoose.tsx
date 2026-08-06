"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Home,
  Hotel,
  MessageCircle,
  Mountain,
  Plus,
  Ship,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Stay, StayCategory } from "@/data/stays";

/**
 * SOP §2.8 — the "how to choose" block for the stays hub.
 *
 * An expanding bento: collapsed panels show only icon, title and price; the
 * active one grows to reveal the description, who it suits, and Sartaj's take.
 * Desktop expands sideways on hover, mobile expands downwards on tap.
 *
 * Prices are read from the stay data, never hard-coded, so this section can
 * never contradict the cards above it.
 */

type Accent = {
  /** Gradient for the icon tile. */
  icon: string;
  /** Soft tag pill. */
  chip: string;
  /** Border + glow when the panel is active. */
  active: string;
  /** Tint behind the "local's take" note. */
  take: string;
};

type Guide = {
  category: StayCategory;
  slug: string;
  icon: LucideIcon;
  summary: string;
  bestFor: string;
  take: string;
  accent: Accent;
};

const GUIDES: Guide[] = [
  {
    category: "Houseboat",
    slug: "dal-lake-houseboats",
    icon: Ship,
    summary:
      "Carved cedar boats moored on Dal and Nigeen, with private decks on the water.",
    bestFor: "Couples & first-timers",
    take: "Book one or two nights, not five. The magic is real, but everything ashore needs a shikara.",
    accent: {
      icon: "from-sky-400 to-sky-500 shadow-sky-200/60",
      chip: "bg-sky-50 text-sky-700 ring-sky-100",
      active: "border-sky-200 shadow-sky-100",
      take: "bg-sky-50/70 text-sky-900/80",
    },
  },
  {
    category: "Hotel",
    slug: "srinagar-hotels",
    icon: Hotel,
    summary:
      "Lake-facing and city hotels in Srinagar, Pahalgam and Sonamarg with full service.",
    bestFor: "Families & busy itineraries",
    take: "The right call for sightseeing days. Insist on a lake-facing room in writing, not a lake-facing hotel.",
    accent: {
      icon: "from-teal-400 to-teal-500 shadow-teal-200/60",
      chip: "bg-teal-50 text-teal-700 ring-teal-100",
      active: "border-teal-200 shadow-teal-100",
      take: "bg-teal-50/70 text-teal-900/80",
    },
  },
  {
    category: "Resort",
    slug: "gulmarg-resorts",
    icon: Mountain,
    summary:
      "Pine-wood mountain resorts in Gulmarg and hillside luxury above Dal Lake.",
    bestFor: "Honeymooners & skiers",
    take: "Stay up in Gulmarg, never Tangmarg. In January that 13 km climb closes without warning.",
    accent: {
      icon: "from-violet-400 to-violet-500 shadow-violet-200/60",
      chip: "bg-violet-50 text-violet-700 ring-violet-100",
      active: "border-violet-200 shadow-violet-100",
      take: "bg-violet-50/70 text-violet-900/80",
    },
  },
  {
    category: "Homestay",
    slug: "kashmir-homestays",
    icon: Home,
    summary:
      "Family-run walnut-wood homes in Pahalgam, Aru and Yusmarg with home-cooked meals.",
    bestFor: "Budget & slow travellers",
    take: "The only way to eat proper Wazwan outside a wedding. Below ₹1,500, expect a shared bathroom.",
    accent: {
      icon: "from-emerald-400 to-emerald-500 shadow-emerald-200/60",
      chip: "bg-emerald-50 text-emerald-700 ring-emerald-100",
      active: "border-emerald-200 shadow-emerald-100",
      take: "bg-emerald-50/70 text-emerald-900/80",
    },
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* Panel                                                               */
/* ------------------------------------------------------------------ */

function ChoicePanel({
  guide,
  price,
  isActive,
  onActivate,
  onToggle,
}: {
  guide: Guide;
  price?: number;
  isActive: boolean;
  onActivate: () => void;
  onToggle: () => void;
}) {
  const Icon = guide.icon;
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      layout={!reduceMotion}
      transition={{ duration: 0.45, ease: EASE }}
      onMouseEnter={onActivate}
      onFocusCapture={onActivate}
      className={`group relative overflow-hidden rounded-2xl border bg-white transition-colors duration-300 lg:min-h-80 ${
        isActive
          ? `shadow-lg ${guide.accent.active}`
          : "border-slate-200 shadow-sm hover:border-slate-300"
      } ${isActive ? "lg:flex-[2.4]" : "lg:flex-1"}`}
    >
      {/* The whole collapsed panel is the toggle — one target, no clutter */}
      <button
        type="button"
        aria-expanded={isActive}
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400 lg:flex-col lg:items-start lg:gap-0"
      >
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br shadow-md transition-transform duration-300 group-hover:scale-105 ${guide.accent.icon}`}
        >
          <Icon className="h-6 w-6 text-white" />
        </span>

        <span className="min-w-0 flex-1 lg:mt-5 lg:w-full">
          <span className="block font-heading text-xl font-bold text-slate-900">
            {guide.category}
          </span>
          {price !== undefined && (
            <span className="mt-0.5 block text-sm text-slate-500">
              from{" "}
              <span className="font-semibold text-slate-900">
                ₹{price.toLocaleString("en-IN")}
              </span>{" "}
              /night
            </span>
          )}
        </span>

        {/* Affordance — rotates into a cross when open */}
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 lg:absolute lg:right-5 lg:top-5"
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>

      {/* Revealed detail */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 lg:max-w-md">
              <p className="text-sm leading-relaxed text-slate-600">
                {guide.summary}
              </p>

              <span
                className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${guide.accent.chip}`}
              >
                <Users className="h-3.5 w-3.5" />
                {guide.bestFor}
              </span>

              <p
                className={`mt-4 rounded-xl px-4 py-3 text-xs leading-relaxed ${guide.accent.take}`}
              >
                <span className="font-semibold">Sartaj&rsquo;s take — </span>
                {guide.take}
              </p>

              <Link
                href={`/stays/${guide.slug}/`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors hover:text-sky-600"
              >
                Explore {guide.category.toLowerCase()} stays
                <ArrowRight className="h-4 w-4 transition-transform duration-300 hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function StayHowToChoose({ stays }: { stays: Stay[] }) {
  // Open the first panel by default so the section never reads as empty.
  const [active, setActive] = useState<string | null>(GUIDES[0].category);

  const priceByCategory = new Map<StayCategory, number>();
  for (const stay of stays) {
    const current = priceByCategory.get(stay.category);
    if (current === undefined || stay.priceFrom < current) {
      priceByCategory.set(stay.category, stay.priceFrom);
    }
  }

  return (
    <section className="bg-slate-50/70 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------- Heading ---------- */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 shadow-sm">
            <Compass className="h-3.5 w-3.5" /> How to choose
          </span>

          <h2 className="mt-5 font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
            Four ways to stay in Kashmir
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Each one suits a different kind of traveller. Here is what they are, who they are
            for, and what a local would tell you before you book.
          </p>
        </div>

        {/* ---------- Expanding bento ---------- */}
        <div
          onMouseLeave={() => setActive(GUIDES[0].category)}
          className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-4"
        >
          {GUIDES.map((guide) => (
            <ChoicePanel
              key={guide.category}
              guide={guide}
              price={priceByCategory.get(guide.category)}
              isActive={active === guide.category}
              onActivate={() => setActive(guide.category)}
              onToggle={() =>
                setActive((current) =>
                  current === guide.category ? null : guide.category,
                )
              }
            />
          ))}
        </div>

        {/* ---------- Enquiry CTA ---------- */}
        <div className="relative mt-8 overflow-hidden rounded-3xl bg-linear-to-r from-sky-600 via-sky-500 to-cyan-400 px-6 py-8 shadow-xl shadow-sky-200 sm:px-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 -top-16 h-52 w-52 rounded-full bg-white/15 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 right-0 h-56 w-56 rounded-full bg-cyan-200/25 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" /> Free advice
              </span>

              <p className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
                Still not sure how to split your nights?
              </p>
              <p className="mt-2 max-w-xl text-sm text-sky-50 sm:text-base">
                Tell us your dates and group size. Sartaj will map out the exact mix of
                houseboat, hotel and resort nights he would book for his own family.
              </p>
            </div>

            <div className="flex w-full flex-nowrap items-center justify-center gap-3 lg:w-auto">
              <Link
                href="/contact/"
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-3 text-sm font-bold text-sky-600 shadow-lg shadow-sky-900/20 transition-transform hover:-translate-y-0.5 sm:px-7"
              >
                Get a stay plan
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact/"
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/60 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15 sm:px-7"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
