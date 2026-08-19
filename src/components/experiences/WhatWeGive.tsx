"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bookmark,
  Compass,
  MountainSnow,
  Ship,
  SquareCheckBig,
  type LucideIcon,
} from "lucide-react";

/**
 * "What we Give" — the four-benefit trust block on /experiences/.
 *
 * Layout is one element that changes mode at the breakpoint rather than two
 * rendered twice:
 *   • below lg — a snap-scrolling rail, one full-width card per screen, with
 *     tappable position dots underneath
 *   • lg and up — a plain four-column grid; the rail's scroll props go inert
 *     and the dots are hidden, because there is nothing left to scroll
 * Rendering the list once keeps the DOM (and the copy) single-source.
 *
 * Client component only because the dots track scroll position. Nothing else
 * here needs JS — the snapping itself is CSS.
 */

export type WhatWeGiveItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

/**
 * NOTE: the Figma comp carries lorem ipsum in these four slots. Real copy is
 * written here instead, drawn from the SOP A8 positioning ("plans your whole
 * trip like a local who's done it for 20 years") — shipping lorem risks it
 * surviving to production, and placeholder text tells a reviewer nothing about
 * whether the card is the right size for its content. Reword freely; the
 * lengths are what the layout is built around.
 */
const DEFAULT_ITEMS: WhatWeGiveItem[] = [
  {
    id: "choices",
    icon: SquareCheckBig,
    title: "Lot of Choices",
    description:
      "Shikara rides to Apharwat powder, day walks to week-long treks — every activity in the valley in one place, with the season each one actually runs in.",
  },
  {
    id: "activities",
    icon: Compass,
    title: "Best Activities",
    description:
      "Only operators we have been out with ourselves. Helmets and life jackets on the water, certified pilots in the air, instructors who teach from zero.",
  },
  {
    id: "guide",
    icon: Ship,
    title: "Best Tour Guide",
    description:
      "Sartaj was born here and has planned Kashmir trips for 20 years. On-ground timings, honest weather calls and the routes the aggregators miss.",
  },
  {
    id: "booking",
    icon: Bookmark,
    title: "Easy Booking",
    description:
      "Tell us the dates and we come back with a plan and a price. No deposit to get a quote, and every exclusion named up front rather than on the day.",
  },
];

export default function WhatWeGive({
  items = DEFAULT_ITEMS,
  heading = "What we Give",
}: {
  items?: WhatWeGiveItem[];
  heading?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /**
   * Which card is under the middle of the rail.
   *
   * Measured from the children's real offsets rather than
   * `scrollLeft / cardWidth`, so it stays correct regardless of gap, padding or
   * a partially-visible neighbour — and it does not care that the card width is
   * a viewport calc.
   */
  const syncActive = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const centre = scroller.scrollLeft + scroller.clientWidth / 2;
    const cards = Array.from(scroller.children) as HTMLElement[];

    const index = cards.findIndex(
      (card) => centre >= card.offsetLeft && centre < card.offsetLeft + card.offsetWidth,
    );
    if (index !== -1) setActive(index);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // rAF-throttled: scroll fires far more often than the dots can usefully
    // change, and this runs on every frame of a flick otherwise.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        syncActive();
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [syncActive]);

  const goTo = (index: number) => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !card) return;

    scroller.scrollTo({
      left: card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-labelledby="what-we-give-heading"
      className="overflow-x-clip bg-white py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="what-we-give-heading"
          className="flex items-center justify-center gap-2.5 text-center font-heading text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          <MountainSnow
            aria-hidden="true"
            className="h-7 w-7 shrink-0 text-sky-500 sm:h-8 sm:w-8"
          />
          {heading}
        </h2>

        {/* The rail. `-mx-4 px-4` lets the first and last cards sit flush with
            the page gutter while still scrolling edge to edge; snap-mandatory
            is what parks exactly one card per screen. All of it is neutralised
            at lg, where this becomes a static grid. */}
        <div
          ref={scrollerRef}
          className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.id}
                // min-w-full = one card per screen on the rail; lg:min-w-0 lets
                // the grid take over sizing again.
                className="group min-w-full snap-center rounded-2xl bg-linear-to-br from-sky-500 to-sky-400 p-6 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-500/35 lg:min-w-0"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon aria-hidden="true" className="h-7 w-7 text-sky-500" />
                </span>

                <h3 className="mt-5 font-heading text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-white/90">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* ---------- position dots (rail only) ---------- */}
        <div className="mt-5 flex items-center justify-center gap-2 lg:hidden">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${item.title}`}
              // aria-current carries the state; the width change alone says
              // nothing to a screen reader.
              aria-current={index === active}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                index === active
                  ? "w-6 bg-sky-500"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
