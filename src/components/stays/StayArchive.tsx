"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StayCard from "@/components/stays/StayCard";
import type { Stay, StayCategory } from "@/data/stays";

const ALL = "All stays" as const;

/**
 * One page = two rows, so the grid never leaves a ragged half-row.
 * Keep these in sync with the grid's column classes below.
 */
const PAGE_SIZES = [
  { query: "(min-width: 1280px)", size: 8 }, // xl — 4 columns × 2 rows
  { query: "(min-width: 1024px)", size: 6 }, // lg — 3 columns × 2 rows
] as const;

/** Below lg the cards sit in a 2-row rail that scrolls sideways, 8 per page. */
const MOBILE_PAGE_SIZE = 8;

function resolvePageSize() {
  if (typeof window === "undefined") return MOBILE_PAGE_SIZE;
  return (
    PAGE_SIZES.find(({ query }) => window.matchMedia(query).matches)?.size ??
    MOBILE_PAGE_SIZE
  );
}

export default function StayArchive({ stays }: { stays: Stay[] }) {
  const [filter, setFilter] = useState<StayCategory | typeof ALL>(ALL);
  const [page, setPage] = useState(1);
  // Server renders the mobile page size; the effect corrects it on mount so the
  // markup matches on hydration.
  const [pageSize, setPageSize] = useState(MOBILE_PAGE_SIZE);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => setPageSize(resolvePageSize());
    update();

    const lists = PAGE_SIZES.map(({ query }) => window.matchMedia(query));
    lists.forEach((list) => list.addEventListener("change", update));
    return () =>
      lists.forEach((list) => list.removeEventListener("change", update));
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(stays.map((stay) => stay.category)));
    return [ALL, ...unique];
  }, [stays]);

  const matching = useMemo(
    () =>
      filter === ALL ? stays : stays.filter((stay) => stay.category === filter),
    [stays, filter],
  );

  const totalPages = Math.max(1, Math.ceil(matching.length / pageSize));

  // Derived, not stored: if the filter narrows the list or the viewport drops to
  // a smaller page size, the stored page may now be out of range.
  const currentPage = Math.min(page, totalPages);

  const visible = useMemo(
    () => matching.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [matching, currentPage, pageSize],
  );

  const goToPage = (next: number) => {
    const clamped = Math.min(Math.max(next, 1), totalPages);
    if (clamped === currentPage) return;
    setPage(clamped);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Below lg the page splits into two rows that scroll independently. From lg
  // the row wrappers become `display: contents`, so the cards drop straight
  // into the parent grid and the desktop layout is unaffected.
  const rows = useMemo(() => {
    const half = Math.ceil(visible.length / 2);
    return [visible.slice(0, half), visible.slice(half)].filter(
      (row) => row.length > 0,
    );
  }, [visible]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
            Every kind of stay in Kashmir
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Houseboats, hotels, mountain resorts and family homestays — with the
            real starting price for each, not a teaser rate.
          </p>
        </div>
      </div>

      {/* Category filter — no layout shift, the grid just re-flows (SOP B4) */}
      <div
        role="tablist"
        aria-label="Filter stays by type"
        className="no-scrollbar mt-8 flex snap-x gap-2 overflow-x-auto pb-1"
      >
        {categories.map((category) => {
          const isActive = category === filter;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setFilter(category);
                setPage(1);
              }}
              className={`shrink-0 snap-start whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-transparent bg-linear-to-r from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-600"
              }`}
            >
              {category}
              {category !== ALL && (
                <span
                  className={
                    isActive ? "ml-1.5 text-white/80" : "ml-1.5 text-slate-400"
                  }
                >
                  {stays.filter((stay) => stay.category === category).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* scroll-mt clears the fixed header when paging jumps back up here */}
      <div
        ref={gridRef}
        className="mt-8 scroll-mt-28 space-y-4 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0 xl:grid-cols-4"
      >
        {rows.map((row, rowIndex) => (
          // Each row is its own scroller below lg; `lg:contents` dissolves the
          // wrapper so cards become direct children of the grid above.
          <div
            key={rowIndex}
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:contents"
          >
            {row.map((stay, index) => (
              <motion.div
                key={stay.slug}
                className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min((rowIndex * row.length + index) * 0.06, 0.3),
                }}
              >
                <StayCard stay={stay} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Scroll affordance for the rail */}
      <p className="mt-3 text-center text-xs text-slate-400 lg:hidden">
        Swipe to see more stays
      </p>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          No stays in this category yet — try another filter.
        </p>
      )}

      {/* ---------- Pagination ---------- */}
      {totalPages > 1 && (
        <nav
          aria-label="Stays pagination"
          className="mt-8 flex items-center justify-center gap-2"
        >
          <button
            type="button"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-sky-200 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => {
              const isActive = pageNumber === currentPage;
              return (
                <button
                  key={pageNumber}
                  type="button"
                  aria-label={`Page ${pageNumber}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => goToPage(pageNumber)}
                  className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-linear-to-r from-sky-500 to-cyan-400 text-white shadow-md shadow-sky-200"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-600"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            },
          )}

          <button
            type="button"
            aria-label="Next page"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-sky-200 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </section>
  );
}
