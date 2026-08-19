import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MountainSnow } from "lucide-react";
import type { ExperienceActivity } from "@/data/experienceActivities";

/**
 * Card for the "Best Activities per Month" section.
 *
 * A different card from ExperienceCard on purpose — that one is a photo with
 * text over it, this one is a white card with the photo on top and a curved
 * cut where the two meet. They answer different questions ("what is this
 * activity" vs "what should I do in March"), and merging them behind a
 * `variant` prop would mean one component carrying two layouts that share
 * nothing but their data.
 *
 * Server component: no state, no interaction beyond links.
 */
export default function MonthActivityCard({
  activity,
  monthLabel,
  href,
}: {
  activity: ExperienceActivity;
  /** The active window's label, e.g. "Jan-Feb" — shown on the calendar row. */
  monthLabel: string;
  href: string;
}) {
  const cover = activity.gallery[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/15">
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={cover.image}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 92vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* The curved cut between photo and card body. An SVG in the card's own
            background colour rather than a border-radius: the shape is an S
            curve, which no combination of corner radii can describe.
            preserveAspectRatio="none" lets it stretch to any card width. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 44"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-11 w-full text-white"
        >
          <path
            fill="currentColor"
            d="M0,44 L0,20 C104,-10 196,40 300,18 C340,10 372,6 400,4 L400,44 Z"
          />
        </svg>
      </div>

      {/* -mt-1 tucks the text up under the curve's high point so the gap does
          not read as dead space. flex-1 makes every card in a row the same
          height, which pins the Book Now buttons to a single baseline. */}
      <div className="-mt-1 flex flex-1 flex-col px-5 pb-5">
        <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-slate-900">
          <MountainSnow
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-sky-500"
          />
          <span className="line-clamp-1">{activity.title}</span>
        </h3>

        <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays
            aria-hidden="true"
            className="h-4.5 w-4.5 shrink-0 text-sky-500"
          />
          {monthLabel}
        </p>

        {/* mt-auto pushes the price and CTA to the bottom, so a longer title
            never leaves one card's button sitting higher than its neighbours'. */}
        <p className="mt-auto pt-4 text-sm font-semibold text-slate-900">
          Starts from
        </p>
        <p className="mt-1 font-heading text-xl font-bold text-sky-500">
          ₹ {activity.pricePerPerson.toLocaleString("en-IN")}
          <span className="text-sm font-medium text-slate-500">/person</span>
        </p>

        <Link
          href={href}
          className="mt-4 block rounded-xl bg-linear-to-r from-sky-500 to-sky-400 px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-sky-500/25 transition-colors hover:from-sky-600 hover:to-sky-500"
        >
          Book Now
          <span className="sr-only"> — {activity.title}</span>
        </Link>
      </div>
    </article>
  );
}
