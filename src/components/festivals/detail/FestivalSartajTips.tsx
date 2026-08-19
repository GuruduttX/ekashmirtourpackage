import { Lightbulb } from "lucide-react";

/**
 * Sartaj's on-ground tips.
 *
 * The SOP A4/A8 information-gain payload — the part of the page a national
 * aggregator cannot restate, and the reason this URL can outrank one. Styled as
 * the loudest block on the page for exactly that reason, matching ActivityTips
 * on /experiences/[slug] so the voice reads as one person across the site.
 *
 * Keep these SPECIFIC. "Go early to avoid crowds" is not a tip; "gates open at
 * 9, the first hour is empty, and the upper terrace is the photograph everyone
 * misses" is. Generic advice here dilutes the one section that is doing the
 * differentiating work.
 */
export default function FestivalSartajTips({ tips = [] }: { tips?: string[] }) {
  if (!tips.length) return null;

  return (
    <section aria-labelledby="sartaj-tips-heading" className="scroll-mt-24" id="tips">
      <div className="rounded-2xl border border-sky-200 bg-linear-to-br from-sky-500 to-cyan-500 p-6 shadow-lg shadow-sky-500/20">
        <h2
          id="sartaj-tips-heading"
          className="flex flex-col items-center gap-2.5 text-center font-heading text-xl font-bold text-white sm:text-2xl md:flex-row md:text-left"
        >
          <Lightbulb aria-hidden="true" className="h-5 w-5 shrink-0" />
          Sartaj&apos;s on-ground tips
        </h2>

        <p className="mt-1.5 text-center text-xs text-sky-50/90 md:text-left">
          Born and raised in Kashmir · 20 years planning these trips
        </p>

        <ul className="mt-4 space-y-3">
          {tips.map((tip) => (
            <li
              key={tip}
              className="border-l-2 border-white/40 pl-3 text-sm leading-relaxed text-white/95"
            >
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
