import { CircleCheck, X } from "lucide-react";

/**
 * Inclusions / exclusions block (SOP §2.3, applied to an activity).
 *
 * The exclusions column is the point of this section, not a footnote to it. The
 * SOP's differentiation thesis is that the aggregators hide what is not covered
 * until the day — so naming the real ones (gondola tickets, pony rides, gear
 * hire) is the trust signal. A page listing eight inclusions and no exclusions
 * is the pattern this exists to replace. Giving the two lists equal width says
 * the same thing in layout.
 *
 * Both live in ONE card rather than facing red and green panels: coloured boxes
 * frame the exclusions as a warning, where the same facts read as
 * straightforward disclosure when they simply sit beside the inclusions on one
 * surface.
 *
 * Either list may be absent. With only one, it takes the full width rather than
 * leaving a hole where its pair would be.
 */
export default function ActivityInclusions({
  inclusions,
  exclusions,
}: {
  inclusions?: string[];
  exclusions?: string[];
}) {
  const hasInclusions = Boolean(inclusions?.length);
  const hasExclusions = Boolean(exclusions?.length);
  if (!hasInclusions && !hasExclusions) return null;

  const bothPresent = hasInclusions && hasExclusions;

  /** One column: accent rule, heading, then a single vertical list. */
  const column = (
    heading: string,
    items: string[],
    tone: "included" | "excluded",
  ) => (
    // The accent bar is an absolutely positioned rounded rule rather than a
    // border-left, so it keeps its rounded ends and can be inset from the text.
    <div className="relative pl-5">
      <span
        aria-hidden="true"
        className="absolute top-1 left-0 h-[calc(100%-0.5rem)] w-1.5 rounded-full bg-sky-400"
      />

      <h3 className="font-heading text-lg font-bold text-sky-500 sm:text-xl">
        {heading}
      </h3>

      <ul className="mt-4 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            {tone === "included" ? (
              <CircleCheck
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-sky-400"
              />
            ) : (
              <X
                aria-hidden="true"
                strokeWidth={2.5}
                className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
              />
            )}
            <span className="text-sm leading-snug text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section
      aria-labelledby="inclusions-heading"
      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      {/* The two visible headings are peers, so the section takes its own name
          here rather than promoting one of them above the other. */}
      <h2 id="inclusions-heading" className="sr-only">
        Inclusions and exclusions
      </h2>

      {/* Side by side from sm. Stacked below that, where two columns of full
          phrases would each be a few words wide. */}
      <div className={`grid gap-6 ${bothPresent ? "sm:grid-cols-2" : ""}`}>
        {hasInclusions && column("Inclusions", inclusions!, "included")}
        {hasExclusions && column("Exclusions", exclusions!, "excluded")}
      </div>
    </section>
  );
}
