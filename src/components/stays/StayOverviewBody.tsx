"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Collapsible body for the overview.
 *
 * Client-side only because of the toggle; the HTML arrives already sanitised
 * from the server component, so nothing unsafe crosses the boundary and the
 * full prose is still in the initial server HTML (collapsing is visual only —
 * the text is present for crawlers either way).
 *
 * The toggle is `sticky bottom-4` on mobile: once the expanded prose pushes it
 * past the fold it pins to the bottom of the viewport, so "Read less" stays
 * reachable instead of sitting at the far end of the content. On desktop it
 * reverts to a static button in the bottom-right.
 */
export default function StayOverviewBody({
  html,
  className,
}: {
  html: string;
  className: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="relative">
        <div
          className={`${className} ${expanded ? "" : "max-h-80 overflow-hidden md:max-h-96"}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Fade so the clipped line reads as "there is more", not a cut-off. */}
        {!expanded && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white via-white/80 to-transparent"
          />
        )}
      </div>

      {/* Sticky only while expanded. Collapsed, it sits in normal flow right
          below the clamped box, so it scrolls into view exactly when the reader
          reaches the cut — sticky from the start would pin it to the bottom of
          the viewport the instant the section appeared. */}
      <div
        className={`z-10 mt-3 flex justify-center md:static md:mt-4 md:justify-end ${
          expanded ? "sticky bottom-4" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white/95 px-4 py-2 text-sm font-semibold text-sky-600 shadow-sm backdrop-blur-md transition-colors hover:border-sky-300 hover:bg-sky-50 md:shadow-none"
        >
          {expanded ? "Read less" : "Read more"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
