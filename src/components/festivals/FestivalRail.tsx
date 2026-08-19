"use client";

import { useEffect, useRef, useState } from "react";
import FestivalCard from "@/components/festivals/FestivalCard";
import PaginationControls from "@/components/ui/PaginationControls";
import usePagination from "@/hooks/usePagination";
import type { Festival } from "@/data/festivals";

/**
 * The card rail for "Explore Kashmir Festivals", plus its carousel indicator
 * and — on desktop only — its pagination.
 *
 * Below lg this is a snapping horizontal rail: a column of portrait cards down
 * a phone is a very long scroll, and swiping sideways keeps the whole set one
 * gesture away. From lg it becomes the 4×2 grid in the comp, and
 * `overflow-visible` goes back on — a scroll container there would clip the
 * cards' hover lift and shadow.
 *
 * TWO DIFFERENT ANSWERS TO "TOO MANY CARDS", one per breakpoint:
 *
 *   • MOBILE SHOWS EVERY FESTIVAL. The rail already solves length — swiping is
 *     cheap, and the dots say how far along you are. Paginating it as well
 *     would mean a reader had to find a button to reach cards the gesture they
 *     are already making would have reached.
 *   • DESKTOP PAGES IN EIGHT. The grid is 4×2, so eight is exactly two full
 *     rows; a ninth festival would otherwise start a ragged third row and push
 *     everything below the section off the screen.
 *
 * That is one `mobilePageSize` of "all of them" away in the hook, which is why
 * there is no branch here: on mobile the page size is the whole list, so
 * `pageCount` is 1 and PaginationControls renders nothing of its own accord.
 *
 * WHY THIS IS A CLIENT COMPONENT: the indicator and now the paging. The dots
 * have to know which card the reader is looking at, and that is a scroll
 * position — it does not exist on the server.
 *
 * The indicator is DOTS-FROM-SCROLL, not a carousel with its own state. There
 * is no "current slide" variable driving the scroller; native scroll snapping
 * stays the single source of truth and the dots are a read-out of it. That is
 * what keeps a swipe, a trackpad flick, a dot press and a keyboard scroll from
 * ever disagreeing about where the rail is.
 */

/** Matches the `lg:grid-cols-4` below — the breakpoint the layout changes at. */
const GRID_QUERY = "(min-width: 1024px)";

/** Two full rows of the 4-across grid. */
const DESKTOP_PAGE_SIZE = 8;

export default function FestivalRail({ festivals }: { festivals: Festival[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const { page, pageCount, visible, goToPage, containerRef } = usePagination({
    items: festivals,
    // The whole list below lg — see the header. Floored at 1 because a page
    // size of 0 makes `pageCount` NaN on an empty list.
    mobilePageSize: Math.max(festivals.length, 1),
    widePageSize: DESKTOP_PAGE_SIZE,
    wideQuery: GRID_QUERY,
  });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const items = Array.from(rail.children) as HTMLElement[];

    // IntersectionObserver, not a scroll handler: it fires only when a card
    // actually crosses the threshold instead of on every scroll frame, and it
    // needs no arithmetic over card widths and gaps — which would have to be
    // kept in sync with the Tailwind classes below and would silently drift.
    // Root is the rail itself, so this measures the horizontal viewport of the
    // scroller, not the page.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = items.indexOf(entry.target as HTMLElement);
          if (index !== -1) setActive(index);
        }
      },
      // 0.6 means "mostly in view". Lower and two cards claim the dot at once
      // mid-swipe; higher and a card that snapped flush can miss it entirely
      // on a narrow phone where the neighbour peeks in.
      { root: rail, threshold: 0.6 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
    // Re-observes when the rendered set changes — paging on desktop swaps the
    // children out, and a stale observer would be watching detached nodes.
  }, [visible.length, page]);

  const scrollTo = (index: number) => {
    const item = railRef.current?.children[index];
    item?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    // The paging target: goToPage scrolls this back to its top, so page 2 opens
    // at the first row rather than halfway down its own second one.
    <div ref={containerRef} className="scroll-mt-24">
      <ul
        ref={railRef}
        className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:gap-6 sm:px-6 lg:mx-0 lg:mt-7 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {visible.map((festival, index) => (
          <li
            key={festival.slug}
            className="w-[72vw] max-w-[280px] shrink-0 snap-start sm:w-[46vw] lg:w-auto lg:max-w-none"
          >
            {/* Only the first row of the first page is above the fold. */}
            <FestivalCard festival={festival} priority={page === 0 && index < 4} />
          </li>
        ))}
      </ul>

      {/* Hidden from lg up, where every card on the page is on screen at once
          and a position indicator would be pointing at nothing.

          Maps `visible` rather than `festivals` so the dot count can never
          exceed the cards actually in the rail — below lg those are the same
          list, and this is what keeps them the same list if that ever changes.

          Real <button>s, not decorative dots: they are the only non-swipe way
          to move the rail, so they have to be reachable and labelled. The hit
          area is 36px square while the dot itself is 8px — an 8px tap target
          would be unusable. */}
      <div
        className="mt-1 flex flex-wrap items-center justify-center lg:hidden"
        role="tablist"
        aria-label="Festival cards"
      >
        {visible.map((festival, index) => (
          <button
            key={festival.slug}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={festival.shortName}
            onClick={() => scrollTo(index)}
            className="flex h-9 w-6 items-center justify-center focus-visible:outline-none"
          >
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                index === active ? "w-5 bg-sky-500" : "w-2 bg-slate-400/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Desktop only, by arithmetic rather than by a CSS `hidden`: below lg the
          page holds every festival, so `pageCount` is 1 and this renders null.
          A `lg:block` wrapper would have hidden a control that still existed in
          the tab order. */}
      <PaginationControls
        page={page}
        pageCount={pageCount}
        onChange={goToPage}
        label="Festival pages"
      />
    </div>
  );
}
