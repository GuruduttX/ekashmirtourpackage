"use client";

import { useMemo, useRef, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

/** Matches Tailwind's `sm`. Keep in step with the grid breakpoints that use it. */
export const WIDE_QUERY = "(min-width: 640px)";

/**
 * Client-side pagination with a responsive page size.
 *
 * Extracted from ExperienceArchive when the month section needed the same
 * behaviour — the two differ only in how many cards a page holds, which is what
 * the options are for.
 *
 * The page size cannot be a CSS breakpoint because the number of *pages*
 * changes with it, so it goes through useMediaQuery. That hook's server
 * snapshot is `false`, meaning the SSR HTML carries the mobile page and wider
 * viewports fill in the rest at hydration — content appearing is a much softer
 * correction than cards vanishing, which is what the inverted query would do to
 * every phone.
 *
 * Two subtleties it handles so callers don't have to:
 *   • a page-size change (rotating a tablet) keeps the card that was at the top
 *     of the current page in view, instead of dumping the reader on page 1
 *   • `resetKey` returns to page 1 whenever the underlying set changes — a
 *     filter landing you on "page 3 of 1" is the classic bug here
 */
export default function usePagination<T>({
  items,
  mobilePageSize = 3,
  widePageSize = 6,
  resetKey,
  wideQuery = WIDE_QUERY,
}: {
  items: T[];
  /** Cards per page below the wide breakpoint. */
  mobilePageSize?: number;
  /** Cards per page from the wide breakpoint up. */
  widePageSize?: number;
  /** Change this when the item set changes to send the reader back to page 1. */
  resetKey?: string | number;
  /**
   * The breakpoint the two page sizes switch at. Defaults to `sm`.
   *
   * MUST MATCH THE BREAKPOINT THE CALLER'S LAYOUT CHANGES AT. The festival rail
   * becomes a grid at `lg` and passes that instead — left at `sm` it would trim
   * the horizontal rail to a desktop page size on a tablet, hiding cards a
   * reader could otherwise have swiped to. Keep it a `min-width` query: the
   * hook's server snapshot is `false`, so the mobile page size is what gets
   * server-rendered.
   */
  wideQuery?: string;
}) {
  const isWide = useMediaQuery(wideQuery);
  const pageSize = isWide ? widePageSize : mobilePageSize;

  const [page, setPage] = useState(0);
  /** The grid, so paging can scroll it back to its top. */
  const containerRef = useRef<HTMLDivElement>(null);

  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));

  // Both corrections below adjust state *during render* by comparing against
  // the previous value, rather than in an effect. That is React's documented
  // pattern for derived-state corrections: it re-renders before the browser
  // paints, so the reader never sees one frame of the stale page.

  // Re-anchor when the breakpoint flips: keep whatever was at the top of the
  // current page visible instead of dumping the reader back on page 1.
  const [prevPageSize, setPrevPageSize] = useState(pageSize);
  if (pageSize !== prevPageSize) {
    // `page` and `prevPageSize` are both still the pre-change values here,
    // which is exactly what makes the old first-visible index recoverable.
    const firstVisible = page * prevPageSize;
    setPrevPageSize(pageSize);
    setPage(Math.min(Math.floor(firstVisible / pageSize), pageCount - 1));
  }

  // Back to page 1 when the set changes — a filter landing you on "page 3 of 1"
  // is the classic bug here. Checked after the re-anchor so it wins when both
  // change in the same render.
  const [prevResetKey, setPrevResetKey] = useState(resetKey);
  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey);
    setPage(0);
  }

  const visible = useMemo(
    () => items.slice(page * pageSize, page * pageSize + pageSize),
    [items, page, pageSize],
  );

  const goToPage = (next: number) => {
    const clamped = Math.min(Math.max(next, 0), pageCount - 1);
    if (clamped === page) return;
    setPage(clamped);

    // Paging swaps content without moving the viewport, so scroll the grid back
    // to its top — otherwise page 2 opens halfway down its own second row.
    // Done here rather than in an effect on `page` so that only a real click
    // scrolls: a page change caused by a resize or a filter reset must not
    // yank the viewport around.
    requestAnimationFrame(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return { page, pageCount, pageSize, visible, goToPage, containerRef };
}
