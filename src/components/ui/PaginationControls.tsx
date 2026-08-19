"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Numbered pagination with prev/next arrows.
 *
 * Presentational — it owns no page state. Pair it with usePagination, which
 * owns the state and the scroll behaviour.
 *
 * Renders nothing for a single page: one disabled "1" button communicates
 * nothing and just adds noise under a short list.
 */
export default function PaginationControls({
  page,
  pageCount,
  onChange,
  label = "Pages",
}: {
  /** Zero-based. */
  page: number;
  pageCount: number;
  onChange: (next: number) => void;
  /** Names the nav for assistive tech, e.g. "Activity pages". */
  label?: string;
}) {
  if (pageCount <= 1) return null;

  const arrowClasses =
    "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600";

  return (
    <>
      <nav
        aria-label={label}
        className="mt-8 flex items-center justify-center gap-2"
      >
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page === 0}
          aria-label="Previous page"
          className={arrowClasses}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {Array.from({ length: pageCount }, (_, index) => {
          const isCurrent = index === page;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onChange(index)}
              // aria-current is what tells AT which page it is on; the colour
              // change alone communicates nothing.
              aria-current={isCurrent ? "page" : undefined}
              aria-label={`Page ${index + 1}`}
              className={`inline-flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors ${
                isCurrent
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                  : "border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600"
              }`}
            >
              {index + 1}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page === pageCount - 1}
          aria-label="Next page"
          className={arrowClasses}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </nav>

      {/* Page changes are otherwise silent for a screen reader — the grid swaps
          with no focus move and no announcement. */}
      <p aria-live="polite" className="sr-only">
        Page {page + 1} of {pageCount}
      </p>
    </>
  );
}
