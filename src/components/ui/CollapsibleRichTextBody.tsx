"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Clamped body for a CMS rich-text block, with a Read more / Read less toggle.
 *
 * Client-side only because of the toggle. The HTML arrives ALREADY SANITISED
 * from the server component that renders this (see RichText), so nothing
 * unsafe crosses the boundary.
 *
 * Collapsing is visual only — `max-height` plus `overflow-hidden`, never
 * unmounting. The full prose therefore stays in the server HTML whatever the
 * toggle is doing, which is the point: this is body copy that has to be
 * crawlable and quotable by answer engines, and content behind a React
 * conditional is neither.
 *
 * The toggle is `sticky bottom-4` while expanded: once long prose pushes it
 * past the fold, it pins to the bottom of the viewport so "Read less" stays
 * reachable instead of sitting at the far end of the content. Collapsed, it
 * sits in normal flow directly under the clamp — sticky from the start would
 * pin it to the viewport the moment the section scrolled into view.
 *
 * NOTE for anyone changing the wrapper: `sticky` needs an ancestor that is not
 * a scroll container. `overflow-x-hidden` anywhere up the tree silently makes
 * one and the button reverts to static — which is why the pages here use
 * `overflow-x-clip` instead.
 */
export default function CollapsibleRichTextBody({
  html,
  className,
  /** Clamp height while collapsed. Tailwind max-h classes. */
  clampClasses = "max-h-80 md:max-h-96",
}: {
  /** Pre-sanitised HTML. */
  html: string;
  className: string;
  clampClasses?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();

  return (
    <div>
      <div className="relative">
        <div
          id={bodyId}
          className={`${className} ${expanded ? "" : `${clampClasses} overflow-hidden`}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Fade, so the clipped line reads as "there is more" rather than as a
            sentence that got cut off. */}
        {!expanded && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white via-white/85 to-transparent"
          />
        )}
      </div>

      {/* Sticky at EVERY breakpoint while expanded, not just on mobile.
          Expanded prose is several screens tall, so a static button ends up at
          the far bottom of it — the reader has to scroll past everything they
          just chose to reveal in order to close it again. Sticky keeps
          "Read less" pinned to the bottom of the viewport the whole way down.
          Collapsed, it sits in normal flow directly under the clamp, so it
          appears exactly where the text is cut. */}
      <div
        className={`z-20 mt-3 flex justify-center md:mt-4 md:justify-end ${
          expanded ? "sticky bottom-4" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={bodyId}
          // Keeps its shadow at all sizes: while expanded this floats over live
          // text, and a flat white pill on white prose is invisible until you
          // happen to hover it.
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-600 shadow-md transition-colors hover:border-sky-300 hover:bg-sky-50"
        >
          {expanded ? "Read less" : "Read more"}
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
