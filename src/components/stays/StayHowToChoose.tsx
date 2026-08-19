"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Home,
  Hotel,
  MessageCircle,
  Mountain,
  Ship,
  Sparkles,
  Users,
} from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import type { LucideIcon } from "lucide-react";
import type { Stay, StayCategory } from "@/data/stays";

/**
 * SOP §2.8 — the "how to choose" block for the stays hub.
 *
 * Two-pane selector: a narrow rail of stay types on the left (a horizontal
 * scroller on mobile), and a photo panel on the right carrying the full detail
 * for whichever type is selected. The photo, price and link all come from the
 * stay data, so this section can never contradict the cards above it.
 */

type Guide = {
  category: StayCategory;
  icon: LucideIcon;
  summary: string;
  bestFor: string;
  take: string;
};

const GUIDES: Guide[] = [
  {
    category: "Houseboat",
    icon: Ship,
    summary:
      "Carved cedar boats moored on Dal and Nigeen, with private decks opening straight onto the water.",
    bestFor: "Couples & first-timers",
    take: "Book one or two nights, not five. The magic is real, but everything ashore needs a shikara.",
  },
  {
    category: "Hotel",
    icon: Hotel,
    summary:
      "Lake-facing and city hotels in Srinagar, Pahalgam and Sonamarg with full service and easy access.",
    bestFor: "Families & busy itineraries",
    take: "The right call for sightseeing days. Insist on a lake-facing room in writing, not a lake-facing hotel.",
  },
  {
    category: "Resort",
    icon: Mountain,
    summary:
      "Pine-wood mountain resorts in Gulmarg and hillside luxury above Dal Lake, built for slow mornings.",
    bestFor: "Honeymooners & skiers",
    take: "Stay up in Gulmarg, never Tangmarg. In January that 13 km climb closes without warning.",
  },
  {
    category: "Homestay",
    icon: Home,
    summary:
      "Family-run walnut-wood homes in Pahalgam, Aru and Yusmarg, with meals cooked by your hosts.",
    bestFor: "Budget & slow travellers",
    take: "The only way to eat proper Wazwan outside a wedding. Below ₹1,500, expect a shared bathroom.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function StayHowToChoose({ stays }: { stays: Stay[] }) {
  const [active, setActive] = useState<StayCategory>(GUIDES[0].category);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();

  /** Cheapest price, lead photo and target page for each category. */
  const meta = useMemo(() => {
    const map = new Map<
      StayCategory,
      { price: number; image: string; alt: string; slug: string }
    >();

    for (const stay of stays) {
      const existing = map.get(stay.category);
      if (!existing) {
        map.set(stay.category, {
          price: stay.priceFrom,
          image: stay.gallery[0]?.image ?? stay.image,
          alt: stay.gallery[0]?.alt ?? stay.alt,
          slug: stay.slug,
        });
      } else if (stay.priceFrom < existing.price) {
        existing.price = stay.priceFrom;
        existing.slug = stay.slug;
      }
    }

    return map;
  }, [stays]);

  const guides = GUIDES.filter((guide) => meta.has(guide.category));
  const current = guides.find((guide) => guide.category === active) ?? guides[0];
  const currentMeta = meta.get(current.category)!;

  return (
    <section className="bg-sky-50/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------- Heading ---------- */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 shadow-sm">
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

        {/* ---------- Two-pane selector ---------- */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row">
          {/* Left rail — 30% on desktop, a scroller on mobile */}
          <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:w-[30%] lg:shrink-0 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-0">
            {guides.map((guide) => {
              const Icon = guide.icon;
              const isActive = guide.category === active;
              const price = meta.get(guide.category)!.price;

              return (
                <button
                  key={guide.category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(guide.category)}
                  onMouseEnter={() => setActive(guide.category)}
                  className={`group relative w-44 shrink-0 snap-start overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 lg:w-auto lg:flex-1 ${
                    isActive
                      ? "border-sky-300 bg-white shadow-md shadow-sky-100"
                      : "border-slate-200 bg-white/70 hover:border-sky-200 hover:bg-white"
                  }`}
                >
                  {/* Active marker slides between cards */}
                  {isActive && (
                    <motion.span
                      layoutId="stay-choice-marker"
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-linear-to-b from-sky-500 to-cyan-400"
                    />
                  )}

                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isActive
                          ? "bg-linear-to-br from-sky-500 to-cyan-400 shadow-md shadow-sky-200"
                          : "bg-sky-50 group-hover:bg-sky-100"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${isActive ? "text-white" : "text-sky-500"}`}
                      />
                    </span>

                    <span className="min-w-0">
                      <span className="block font-heading text-base font-bold text-slate-900">
                        {guide.category}
                      </span>
                      <span className="block text-xs text-slate-500">
                        from ₹{price.toLocaleString("en-IN")}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right pane — photo + full detail for the selected type.
              `flex-1` is lg-only on purpose: in the mobile column layout its
              0% flex-basis would override the height and collapse the panel. */}
          <div className="relative h-125 w-full overflow-hidden rounded-3xl bg-sky-100 shadow-lg shadow-sky-100 sm:h-112 lg:h-112 lg:flex-1">
            {/* Background photo */}
            <AnimatePresence initial={false}>
              <motion.div
                key={current.category}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0"
              >
                {failed[current.category] ? (
                  <div className="h-full w-full bg-linear-to-br from-sky-300 via-sky-200 to-cyan-100" />
                ) : (
                  <Image
                    src={currentMeta.image}
                    alt={currentMeta.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover"
                    onError={() =>
                      setFailed((prev) => ({ ...prev, [current.category]: true }))
                    }
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Black backdrop so the copy reads on any photo */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/75 to-slate-950/25" />

            {/* Price badge */}
            <div className="absolute right-5 top-5 z-10 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-sky-600 shadow-md backdrop-blur-md">
              from ₹{currentMeta.price.toLocaleString("en-IN")}
              <span className="text-xs font-medium text-slate-500"> /night</span>
            </div>

            {/* Detail */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.category}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <Users className="h-3.5 w-3.5" />
                    {current.bestFor}
                  </span>

                  <h3 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl">
                    {current.category}
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
                    {current.summary}
                  </p>

                  <p className="mt-4 max-w-xl border-l-2 border-sky-400 pl-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
                    <span className="font-semibold text-white">Sartaj&rsquo;s take — </span>
                    {current.take}
                  </p>

                  <Link
                    href={`/stays/${currentMeta.slug}/`}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition-transform hover:-translate-y-0.5"
                  >
                    Explore {current.category.toLowerCase()} stays
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
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
              <a
                href={whatsappLink("Hi! I'd like help choosing a place to stay in Kashmir.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/60 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15 sm:px-7"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
