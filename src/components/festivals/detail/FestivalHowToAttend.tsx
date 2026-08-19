import Link from "next/link";
import { ArrowRight, BedDouble, Car, MapPinned } from "lucide-react";
import type { FestivalAttendStep } from "@/types/festivalTypes";

/**
 * SOP §2.6 "how to attend + where to stay + cab" — the practical spine of the
 * page, and the section that decides whether this ranks for the how-to queries
 * ("how to attend the tulip festival", "amarnath registration").
 *
 * NUMBERED, because these are steps in an order — register before you travel,
 * then choose a route, then prepare. An unordered list would lose that, and the
 * ordering is the useful part for the pilgrimage pages especially.
 *
 * THE THREE LINKS AT THE FOOT ARE THE SOP B3 REQUIREMENT: every supporting page
 * links INTO its destination hub, its cab hub and the package hub with varied
 * anchor text. They point at hubs rather than at guessed deep slugs, so this
 * section cannot generate a 404 for a festival whose seasonal package does not
 * exist yet.
 */
export default function FestivalHowToAttend({
  name,
  steps = [],
  /** Destination hub this festival routes into, e.g. "srinagar". */
  destinationSlug,
  /** Human name for that hub, used as the link's anchor text. */
  destinationLabel,
}: {
  name: string;
  steps?: FestivalAttendStep[];
  destinationSlug: string;
  destinationLabel: string;
}) {
  if (!steps.length) return null;

  const links = [
    {
      id: "destination",
      href: `/destinations/${destinationSlug}/`,
      icon: MapPinned,
      label: `Plan your days in ${destinationLabel}`,
      note: "Where to go, how long to stay, what it costs",
    },
    {
      id: "stays",
      href: "/stays/",
      icon: BedDouble,
      label: "Find a houseboat or hotel",
      note: "Book early for any festival window",
    },
    {
      id: "cabs",
      href: "/cab-service/",
      icon: Car,
      label: "Cab fares and routes",
      note: "Srinagar cabs, airport transfers, full-day sightseeing",
    },
  ];

  return (
    <section
      aria-labelledby="how-to-attend-heading"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
      id="how-to-attend"
    >
      <h2
        id="how-to-attend-heading"
        className="text-center font-heading text-xl font-bold text-slate-900 sm:text-2xl md:text-left"
      >
        How to attend{" "}
        <span className="text-sky-500">{name}</span>
      </h2>

      <ol className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-sky-500 to-cyan-400 text-sm font-bold text-white"
            >
              {index + 1}
            </span>
            <div className="min-w-0">
              <h3 className="font-heading text-base font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Where to stay and how to get around, as links rather than as copy that
          would go stale — the hubs own those answers. */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.id}
              href={link.href}
              className="group flex flex-col gap-2 rounded-2xl border border-slate-200 p-4 transition-colors hover:border-sky-300 hover:bg-sky-50/60"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                <Icon aria-hidden="true" className="h-4.5 w-4.5" />
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 group-hover:text-sky-700">
                {link.label}
                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                />
              </span>
              <span className="text-xs leading-relaxed text-slate-500">
                {link.note}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
