import Link from "next/link";
import { ArrowRight, CalendarRange } from "lucide-react";
import FestivalOrnament from "@/components/festivals/FestivalOrnament";
import type { Festival } from "@/data/festivals";

/**
 * Closing CTA — SOP §2.6's "book the package that catches this festival".
 *
 * Points at the PACKAGE HUB, not at a guessed seasonal slug. A "spring Kashmir
 * package" URL invented per festival would 404 for most of the eight, and the
 * SOP's first rule is no thin or broken pages — so the funnel goes through the
 * hub, which is where the real packages live and stays correct as they change.
 *
 * The secondary link runs sideways into the destination hub, giving the page
 * its SOP B3 outward links: hub (up), destination (across), quote (into).
 */
export default function FestivalDetailCta({
  festival,
  destinationLabel,
}: {
  festival: Festival;
  destinationLabel: string;
}) {
  return (
    <section className="w-full bg-slate-900 py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.2em] text-sky-400 uppercase">
          <CalendarRange className="h-3.5 w-3.5" aria-hidden="true" />
          {festival.dates.short}
        </p>

        <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
          Build the trip around{" "}
          <span className="bg-linear-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            {festival.shortName}
          </span>
        </h2>

        <FestivalOrnament tone="light" className="mt-3 max-w-xs" />

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
          Tell us the dates you can travel and we will tell you honestly whether
          they land in the window — and build the stays, cabs and days around it
          if they do.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/kashmir-tour-packages/"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-400 to-sky-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition-transform hover:-translate-y-0.5 sm:text-base"
          >
            See Kashmir tour packages
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </Link>

          <Link
            href={`/destinations/${festival.destinationSlug}/`}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:text-base"
          >
            Explore {destinationLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
