import {
  CalendarRange,
  Clock,
  Info,
  MapPin,
  Sparkles,
  Ticket,
} from "lucide-react";
import type { Festival } from "@/data/festivals";

/**
 * SOP §2.6 "dates / at-a-glance table" — the block a featured snippet and an AI
 * Overview both lift from.
 *
 * A <dl>, not a <table>: these are label/value pairs about one subject, which
 * is exactly what a definition list describes. A real table would claim a
 * row/column relationship that does not exist and reads badly aloud. Same
 * reasoning, and the same markup, as ActivityQuickFacts on /experiences/[slug].
 *
 * Four rows come from the Festival record itself; anything specific to one
 * occasion ("Registration", "Dress code", "Fitness") arrives as `extraFacts`
 * from the detail payload, so this component never needs a per-festival branch.
 *
 * Rows with no value are dropped rather than rendered empty — a thin record
 * produces a short table, not a table full of dashes.
 */
export default function FestivalAtAGlance({
  festival,
  extraFacts = [],
}: {
  festival: Festival;
  extraFacts?: { id: string; label: string; value: string }[];
}) {
  const facts = [
    {
      id: "when",
      icon: CalendarRange,
      label: "When it falls",
      value: festival.dates.window,
    },
    {
      id: "duration",
      icon: Clock,
      label: "How long it runs",
      value: festival.dates.duration,
    },
    { id: "venue", icon: MapPin, label: "Where", value: festival.venue },
    { id: "entry", icon: Ticket, label: "Entry", value: festival.entry },
    ...extraFacts.map((fact) => ({ ...fact, icon: Sparkles })),
  ].filter((fact) => Boolean(fact.value));

  if (!facts.length) return null;

  return (
    <section
      aria-labelledby="festival-glance-heading"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
      id="at-a-glance"
    >
      <h2
        id="festival-glance-heading"
        className="text-center font-heading text-xl font-bold text-slate-900 sm:text-2xl md:text-left"
      >
        At a <span className="text-sky-500">glance</span>
      </h2>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {facts.map((fact) => {
          const Icon = fact.icon;

          return (
            <div
              key={fact.id}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                <Icon aria-hidden="true" className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-0.5 text-sm font-medium text-slate-900">
                  {fact.value}
                </dd>
              </div>
            </div>
          );
        })}
      </dl>

      {/* Restates the gate in the one place a reader is most likely to copy a
          date out of. Reads from `datesVerified`, like the hero and the schema. */}
      {!festival.datesVerified && (
        <p className="mt-4 flex items-start gap-2 rounded-2xl bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-900">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            The window above is the pattern this festival reliably falls in, not
            an announced date. We add exact dates here once they are confirmed.
          </span>
        </p>
      )}
    </section>
  );
}
