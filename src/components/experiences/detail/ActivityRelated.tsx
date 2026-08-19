import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import MonthActivityCard from "@/components/experiences/MonthActivityCard";
import {
  activityHref,
  type ExperienceActivity,
} from "@/data/experienceActivities";
import { getAllDestinations } from "@/data/destinations";

/**
 * Closing internal-link block (SOP B3).
 *
 * Carries the two links the per-page checklist requires of every deep page:
 * ACROSS to at least two genuine siblings, and UP/INTO the destination hub this
 * activity belongs to. The sibling list is chosen by shared destination and
 * shared season — see getRelatedActivities — rather than being the next few in
 * the array, so the links are relevant rather than a footer dump.
 *
 * The destination link is resolved against the real destinations list and
 * dropped if the slug does not exist, so a CMS typo produces no link rather
 * than a 404. Anchors vary by destination name rather than repeating one
 * exact-match phrase sitewide, per the SOP anchor policy.
 */
export default function ActivityRelated({
  activity,
  related,
}: {
  activity: ExperienceActivity;
  related: ExperienceActivity[];
}) {
  const destination = activity.destinationSlug
    ? getAllDestinations().find((item) => item.slug === activity.destinationSlug)
    : undefined;

  if (!related.length && !destination) return null;

  return (
    <section aria-labelledby="related-heading" className="bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="related-heading"
          className="text-center font-heading text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          More to do <span className="text-sky-500">in Kashmir</span>
        </h2>

        {related.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <MonthActivityCard
                key={item.id}
                activity={item}
                // On this page the label is the activity's own season rather
                // than a selected month window — there is no month picker here.
                monthLabel={item.season ?? item.duration}
                href={activityHref(item)}
              />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {destination && (
            <Link
              href={`/destinations/${destination.slug}/`}
              className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-600"
            >
              <MapPin aria-hidden="true" className="h-4 w-4 text-sky-500" />
              Things to do in {destination.name}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}

          <Link
            href="/experiences/"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-600"
          >
            Browse every Kashmir activity
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
