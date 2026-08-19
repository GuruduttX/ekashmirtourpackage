"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { Festival } from "@/data/festivals";

/**
 * One festival card in the "Explore Kashmir Festivals" grid.
 *
 * A portrait photo with a frosted caption bar floated over its lower edge,
 * inset from the card's sides rather than flush to them — that inset is what
 * makes it read as a glass panel sitting ON the photo instead of a footer
 * strip below it, and it is the detail the comp lives or dies on.
 *
 * ONLY "Learn more" NAVIGATES. The card itself is not a link: pressing the
 * photo toggles the panel open and shut, and the single <Link> inside the
 * panel is the way to the festival page. (It used to be a link-wrapped card,
 * which meant a touch device could not open the panel without also arming a
 * navigation — the two gestures were fighting over the same tap.)
 *
 * Three things open the panel, all landing on the same state: pointer hover,
 * keyboard focus reaching the "Learn more" link, and a press on the card.
 *
 * CLIENT COMPONENT for that press state and nothing else.
 *
 * DATE HONESTY: the chip shows `dates.short` — a MONTH WINDOW ("Mar–Apr"),
 * never a date. Most of these festivals do not have a fixed date; see the
 * header of src/data/festivals.ts before putting anything more precise here.
 */
export default function FestivalCard({
  festival,
  /** Only the first row is above the fold — the rest can lazy-load. */
  priority = false,
}: {
  festival: Festival;
  priority?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  // HEIGHT. Tall enough that the expanded panel never swallows the whole photo.
  // Mobile runs a shorter 4:5 so the card fits the viewport inside the
  // horizontal rail; from sm the 3:4 comp ratio returns; on lg the two rows
  // still have to share one screen with the heading, so height comes from the
  // viewport, clamped at both ends.
  return (
    <div
      onClick={() => setExpanded((open) => !open)}
      data-expanded={expanded ? "true" : undefined}
      className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20 hover:ring-2 hover:ring-violet-500 focus-within:ring-2 focus-within:ring-violet-500 sm:aspect-[3/4] lg:aspect-auto lg:h-[clamp(300px,calc((100vh-17rem)/2),400px)]"
    >
      <Image
        src={festival.image}
        alt={festival.imageAlt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 70vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Keeps the caption legible over a bright photo (the tulip beds) without
          greying down the whole image. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/50 to-transparent"
      />

      {/* The panel is anchored to the bottom, so anything revealed inside it
          grows the box upward over the photo — that is the whole move. */}
      <div className="absolute inset-x-2 bottom-2 rounded-xl border border-white/20 bg-black/35 px-4 py-3 backdrop-blur-md transition-colors duration-300 group-hover:bg-black/45 group-focus-within:bg-black/45 group-data-[expanded=true]:bg-black/45 sm:inset-x-2.5 sm:bottom-2.5">
        <h3 className="truncate text-base font-medium text-white sm:text-lg">
          {festival.shortName}
        </h3>
        <p className="mt-1 flex items-center gap-2 text-sm text-white/85">
          <CalendarDays
            className="h-4 w-4 shrink-0 text-sky-400"
            aria-hidden="true"
          />
          {/* Spelled out for screen readers — "Mar–Apr" alone is ambiguous. */}
          <span className="sr-only">Runs in </span>
          {festival.dates.short}
        </p>

        {/* HEIGHT ANIMATES VIA grid-template-rows 0fr → 1fr, not max-height.
            `auto` height is not animatable and a max-height guess either clips
            a long summary or leaves dead easing time on a short one; the grid
            row resolves to the content's real height and interpolates cleanly.
            The inner div MUST keep overflow-hidden or the 0fr row still paints. */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] group-data-[expanded=true]:grid-rows-[1fr] motion-reduce:transition-none">
          <div className="overflow-hidden">
            <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-white/85">
              {festival.summary}
            </p>

            {/* The only navigation on the card. stopPropagation keeps the tap
                from also reaching the card's toggle — without it the panel
                would start collapsing under the finger mid-navigation.

                While collapsed the link is inert and out of the tab order:
                `tabIndex -1` would strand keyboard users, so instead the panel
                opens on focus-within, and a hidden-but-focusable link is fine
                because reaching it is exactly what opens the panel. */}
            <Link
              href={`/festivals/${festival.slug}/`}
              onClick={(event) => event.stopPropagation()}
              className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-400 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              {/* Eight identical "Learn more" links on one page is unusable
                  in a screen reader's link list, hence the sr-only suffix. */}
              Learn more
              <span className="sr-only"> about {festival.shortName}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
