import { Activity, CalendarRange, Clock, MapPin, Users } from "lucide-react";
import type { ExperienceActivity } from "@/data/experienceActivities";

/**
 * SOP §2.9 facts table — location · duration · price-from · season · difficulty.
 *
 * Built as a definition list, not a <table>: these are label/value pairs about
 * one subject, which is exactly what <dl> describes. A real table would claim a
 * row/column relationship that does not exist here, and reads badly aloud.
 *
 * Rows with no data are dropped rather than rendered empty, so a thin CMS
 * record produces a short table instead of a table full of dashes.
 */

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Easy",
  moderate: "Moderate",
  challenging: "Challenging",
  expert: "Expert",
};

export default function ActivityQuickFacts({
  activity,
}: {
  activity: ExperienceActivity;
}) {
  const facts = [
    { id: "location", icon: MapPin, label: "Location", value: activity.location },
    { id: "duration", icon: Clock, label: "Duration", value: activity.duration },
    { id: "season", icon: CalendarRange, label: "Season", value: activity.season },
    {
      id: "difficulty",
      icon: Activity,
      label: "Difficulty",
      value: activity.difficulty
        ? DIFFICULTY_LABEL[activity.difficulty]
        : undefined,
    },
    { id: "suited", icon: Users, label: "Suited for", value: activity.suitedFor },
    ...(activity.extraFacts ?? []).map((fact) => ({
      id: fact.id,
      icon: Activity,
      label: fact.label,
      value: fact.value,
    })),
  ].filter((fact): fact is typeof fact & { value: string } => Boolean(fact.value));

  if (!facts.length) return null;

  return (
    // A card, not a full-width band: this now lives in the left column of the
    // detail layout, so the page owns the container and the spacing.
    <section
      aria-labelledby="quick-facts-heading"
      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <div>
        <h2
          id="quick-facts-heading"
          className="text-center font-heading text-xl font-bold text-slate-900 sm:text-2xl md:text-left"
        >
          At a <span className="text-sky-500">glance</span>
        </h2>

        {/* Two columns at most — the left column is narrower than a full-width
            band, and three would squeeze each fact to a single word per line. */}
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
      </div>
    </section>
  );
}
