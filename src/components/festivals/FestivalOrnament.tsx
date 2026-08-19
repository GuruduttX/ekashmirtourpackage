/**
 * The rule-flourish-rule divider under the festival headings.
 *
 * Two hairlines that fade out towards the page edges, with an eight-petal
 * Kashmiri-style rosette between them. Used twice in the Figma comps — under
 * the hero H1 and under the "Explore Kashmir Festivals" heading — which is why
 * it is a component and not inline markup.
 *
 * `tone` exists because the two placements sit on opposite backgrounds: the
 * hero version is over dark photography, the section version over near-white.
 * The rosette keeps its blue in both; only the rules change.
 *
 * Purely decorative — aria-hidden, and no text alternative, because it carries
 * no meaning the heading above it does not already state.
 */
export default function FestivalOrnament({
  tone = "light",
  className = "",
}: {
  /** "light" = on dark photography. "dark" = on a pale background. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const rule =
    tone === "light"
      ? "from-transparent via-white/50 to-white/70"
      : "from-transparent via-sky-300/50 to-sky-400/70";

  return (
    <div
      aria-hidden="true"
      className={`flex w-full items-center justify-center gap-3 sm:gap-4 ${className}`}
    >
      <span className={`h-px flex-1 bg-linear-to-r ${rule}`} />

      <svg
        viewBox="0 0 40 40"
        className="h-6 w-6 shrink-0 text-sky-400 sm:h-7 sm:w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      >
        {/* Eight petals, each a mirrored pair of arcs meeting at the tip. */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path
            key={angle}
            d="M20 20 C 16.5 14.5, 16.5 9.5, 20 5 C 23.5 9.5, 23.5 14.5, 20 20 Z"
            transform={`rotate(${angle} 20 20)`}
          />
        ))}
        <circle cx="20" cy="20" r="2.6" />
      </svg>

      {/* Mirrored so the fade runs outward on both sides. */}
      <span className={`h-px flex-1 bg-linear-to-l ${rule}`} />
    </div>
  );
}
