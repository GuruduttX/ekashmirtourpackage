import { Sparkles } from "lucide-react";

/**
 * "What happens" — the intro paragraph plus the moments the occasion is
 * actually made of.
 *
 * Sits directly under the at-a-glance table because the SOP blueprint runs
 * answer → dates/glance → what happens: a reader who has just learned WHEN
 * asks WHAT next, and an answer engine looking for a description of the
 * festival finds prose here rather than a bullet list on its own.
 *
 * `highlights` is deliberately concrete — things a reader can picture and a
 * photographer can plan around, not adjectives. Renders nothing at all when
 * both halves are empty, so a half-filled record still produces a valid page.
 */
export default function FestivalWhatHappens({
  name,
  intro,
  highlights = [],
}: {
  /** Festival name, used in the heading so the H2 carries the entity. */
  name: string;
  intro?: string;
  highlights?: string[];
}) {
  if (!intro && !highlights.length) return null;

  return (
    <section
      aria-labelledby="what-happens-heading"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
      id="what-happens"
    >
      <h2
        id="what-happens-heading"
        className="text-center font-heading text-xl font-bold text-slate-900 sm:text-2xl md:text-left"
      >
        What happens at{" "}
        <span className="text-sky-500">{name}</span>
      </h2>

      {intro && (
        <p className="mt-4 text-center text-sm leading-relaxed text-slate-600 sm:text-base md:text-left">
          {intro}
        </p>
      )}

      {highlights.length > 0 && (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-sm leading-relaxed text-slate-700"
            >
              <Sparkles
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-sky-500"
              />
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
