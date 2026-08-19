"use client";

import { MountainSnow } from "lucide-react";
import usePagination from "@/hooks/usePagination";
import PaginationControls from "@/components/ui/PaginationControls";
import ExperienceCard from "@/components/experiences/ExperienceCard";
import { activityHref, type ExperienceActivity } from "@/data/experienceActivities";

/**
 * Cards per page.
 *
 * Three on mobile, where the grid is one column and three stacked cards are
 * already a full screen of scrolling. Six from `sm` up, which is also where the
 * grid becomes two columns — pairing 6 with the 2-col and 3-col grids gives
 * whole rows (3×2 and 2×3), where 3 cards in a 2-col grid would leave an orphan
 * hanging on its own row.
 */
const PAGE_SIZE_MOBILE = 3;
const PAGE_SIZE_WIDE = 6;

/**
 * Paginated activity archive for /experiences/.
 *
 * Takes its list as a prop and never fetches — the hub page decides where the
 * records come from, so today's dummy array and tomorrow's Mongo query are the
 * same call site.
 *
 * Page state, the responsive page size and the scroll-back-to-top behaviour all
 * live in usePagination; see that hook for why the page size cannot be a CSS
 * breakpoint.
 *
 * Client component only because pagination is state. The cards manage their own
 * carousel state independently.
 */
export default function ExperienceArchive({
  activities,
  heading = "Activities",
}: {
  activities: ExperienceActivity[];
  /**
   * The blue half of the heading — it always renders as "Kashmir <heading>".
   * Overridable so the same archive can be reused under a different title.
   */
  heading?: string;
}) {
  const { page, pageCount, visible, goToPage, containerRef } = usePagination({
    items: activities,
    mobilePageSize: PAGE_SIZE_MOBILE,
    widePageSize: PAGE_SIZE_WIDE,
  });

  if (!activities.length) return null;

  return (
    <section
      id="all-experiences"
      aria-labelledby="experiences-archive-heading"
      className="bg-white py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="experiences-archive-heading"
          className="flex items-center justify-center gap-2.5 text-center font-heading text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          <MountainSnow
            aria-hidden="true"
            className="h-7 w-7 shrink-0 text-sky-500 sm:h-8 sm:w-8"
          />
          <span>
            Kashmir <span className="text-sky-500">{heading}</span>
          </span>
        </h2>

        {/* max-w-5xl, not the section's 7xl: three cards across the full 7xl
            gutter come out too wide and the tall aspect ratio makes them
            towering. Narrowing the grid alone shrinks the cards without
            touching the card component or the column count.
            scroll-mt clears the fixed navbar when paging scrolls this in. */}
        <div
          ref={containerRef}
          className="mx-auto mt-8 grid max-w-5xl scroll-mt-24 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((activity, index) => (
            <ExperienceCard
              key={activity.id}
              activity={activity}
              href={activityHref(activity)}
              // Only the first row of the first page is above the fold.
              priority={page === 0 && index < 3}
            />
          ))}
        </div>

        <PaginationControls
          page={page}
          pageCount={pageCount}
          onChange={goToPage}
          label="Activity pages"
        />
      </div>
    </section>
  );
}
