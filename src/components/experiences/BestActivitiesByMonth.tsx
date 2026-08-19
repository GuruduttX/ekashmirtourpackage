"use client";

import { useRef, useState } from "react";
import { MountainSnow } from "lucide-react";
import usePagination from "@/hooks/usePagination";
import PaginationControls from "@/components/ui/PaginationControls";
import MonthActivityCard from "@/components/experiences/MonthActivityCard";
import {
  MONTH_WINDOWS,
  activityHref,
  getActivitiesByMonth,
  type ExperienceActivity,
  type MonthWindowId,
} from "@/data/experienceActivities";

/**
 * "Best Activities per Month" — a month window picker over the activity list.
 *
 * Answers the question the SOP's seasonality section (A1) says drives the whole
 * category: people book Kashmir around *when* they can travel, not around what
 * they want to do. So the tabs are the primary control and the cards follow.
 *
 * The filtering is client-side over a list passed in as a prop. That is the
 * right trade here — the full catalogue is small, every window is one click
 * away with no round trip, and the section still server-renders its default
 * window's cards for the crawler.
 *
 * ARIA: a real tablist, because that is what this is. Roving focus with arrow
 * keys, Home/End, and a single tab stop into the strip — the keyboard contract
 * readers already expect from tabs, and the reason this is not just a row of
 * buttons.
 */
export default function BestActivitiesByMonth({
  activities,
  defaultWindow = "jan-feb",
}: {
  activities: ExperienceActivity[];
  /** Which window opens first. */
  defaultWindow?: MonthWindowId;
}) {
  const [active, setActive] = useState<MonthWindowId>(defaultWindow);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = MONTH_WINDOWS.findIndex((window) => window.id === active);
  const activeLabel = MONTH_WINDOWS[activeIndex]?.label ?? "";
  const matches = getActivitiesByMonth(active, activities);

  // Four per page from `sm` up — one full row of the 4-column grid, and two
  // clean rows of the 2-column one. `resetKey` sends the reader back to page 1
  // whenever they pick a different month, which is the whole reason it exists.
  const { page, pageCount, visible, goToPage, containerRef } = usePagination({
    items: matches,
    mobilePageSize: 3,
    widePageSize: 4,
    resetKey: active,
  });

  /** Moves selection AND focus together — the expected tablist behaviour. */
  const focusTab = (index: number) => {
    const clamped = (index + MONTH_WINDOWS.length) % MONTH_WINDOWS.length;
    setActive(MONTH_WINDOWS[clamped].id);
    const tab = tabRefs.current[clamped];
    tab?.focus();
    // Keeps the newly-selected tab on screen in the mobile scroll strip.
    tab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(MONTH_WINDOWS.length - 1);
        break;
    }
  };

  return (
    <section
      aria-labelledby="best-by-month-heading"
      className="overflow-x-clip bg-white py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="best-by-month-heading"
          className="flex items-center justify-center gap-2.5 text-center font-heading text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          <MountainSnow
            aria-hidden="true"
            className="h-7 w-7 shrink-0 text-sky-500 sm:h-8 sm:w-8"
          />
          <span>
            Best Activities <span className="text-sky-500">per Month</span>
          </span>
        </h2>

        {/* ---------- month tabs ----------
            Below lg the strip scrolls horizontally — eleven windows never fit a
            phone, and the blue bar is the scroll container itself so the active
            pill can sit anywhere along it without the bar clipping oddly.
            From lg it becomes an 11-column grid instead: equal cells sized by
            the container rather than by their text, which is what guarantees
            all eleven land in view with no scrolling and no measuring. */}
        <div
          role="tablist"
          aria-label="Month"
          onKeyDown={handleKeyDown}
          className="no-scrollbar mt-8 flex snap-x items-center gap-1 overflow-x-auto rounded-2xl bg-linear-to-r from-sky-500 to-sky-400 p-2 lg:grid lg:grid-cols-11 lg:overflow-visible"
        >
          {MONTH_WINDOWS.map((window, index) => {
            const isActive = window.id === active;

            return (
              <button
                key={window.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`month-tab-${window.id}`}
                aria-selected={isActive}
                aria-controls="month-activities-panel"
                // Roving tabindex: one tab stop for the whole strip, then
                // arrow keys move within it.
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(window.id)}
                // Tighter padding and type at lg so the longest label
                // ("July-Agst") clears an eleventh of the container.
                className={`shrink-0 cursor-pointer snap-center rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors sm:px-5 sm:text-base lg:px-2 lg:text-sm xl:px-3 ${
                  isActive
                    ? "bg-white text-sky-500 shadow-sm"
                    : "text-white hover:bg-white/15"
                }`}
              >
                {window.label}
              </button>
            );
          })}
        </div>

        {/* ---------- cards ---------- */}
        <div
          role="tabpanel"
          id="month-activities-panel"
          aria-labelledby={`month-tab-${active}`}
          className="mt-8"
        >
          {matches.length ? (
            <>
              {/* scroll-mt clears the fixed navbar when paging scrolls this in. */}
              <div
                ref={containerRef}
                className="grid scroll-mt-24 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {visible.map((activity) => (
                  <MonthActivityCard
                    // Keyed by window as well as activity: without it React
                    // reuses the DOM node across windows and the new photo
                    // fades in over the old card's layout.
                    key={`${active}-${activity.id}`}
                    activity={activity}
                    monthLabel={activeLabel}
                    href={activityHref(activity)}
                  />
                ))}
              </div>

              <PaginationControls
                page={page}
                pageCount={pageCount}
                onChange={goToPage}
                label={`Activity pages for ${activeLabel}`}
              />
            </>
          ) : (
            // A window with nothing in it is a real answer, not an error —
            // deep winter genuinely closes most of the valley's activities.
            <p className="rounded-2xl bg-slate-50 px-6 py-10 text-center text-sm text-slate-600">
              Nothing runs reliably in {activeLabel}. Tell us your dates and
              we&apos;ll plan around what is actually open —{" "}
              <a href="/contact/" className="font-semibold text-sky-600 underline">
                get in touch
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
