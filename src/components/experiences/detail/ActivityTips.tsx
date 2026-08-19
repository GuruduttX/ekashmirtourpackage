import { CalendarCheck, Lightbulb } from "lucide-react";

/**
 * Loose booking advice and Sartaj's on-ground tips.
 *
 * The STRUCTURED part of booking and timing — hours, closed days, last entry,
 * how much notice — moved to ActivityBookingTiming, which renders it from a
 * real schedule type. What is left here is the advice that genuinely is prose
 * and cannot be tabulated ("take the first slot, cloud builds through the
 * afternoon").
 *
 * The Sartaj block is the SOP A4/A8 information-gain payload — the part a
 * reader cannot get from an aggregator, and the reason this page can outrank
 * one. It is styled as the loudest thing on the page for that reason.
 */
export default function ActivityTips({
  bookingTips,
  sartajTips,
}: {
  bookingTips?: string[];
  sartajTips?: string[];
}) {
  const hasBooking = Boolean(bookingTips?.length);
  const hasSartaj = Boolean(sartajTips?.length);
  if (!hasBooking && !hasSartaj) return null;

  return (
    <section aria-labelledby="tips-heading">
      <div>
        <h2 id="tips-heading" className="sr-only">
          Booking and on-ground tips
        </h2>

        {/* Stacked inside the left column — two tip lists side by side there
            would be two narrow columns of prose. */}
        <div className="grid gap-5">
          {hasBooking && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="flex items-center gap-2.5 font-heading text-lg font-bold text-slate-900">
                <CalendarCheck
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-sky-500"
                />
                know before you book
              </h3>
              <ul className="mt-4 space-y-3">
                {bookingTips!.map((tip) => (
                  <li
                    key={tip}
                    className="border-l-2 border-sky-200 pl-3 text-sm leading-relaxed text-slate-600"
                  >
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasSartaj && (
            <div className="rounded-2xl border border-sky-200 bg-linear-to-br from-sky-500 to-cyan-500 p-6 shadow-lg shadow-sky-500/20">
              <h3 className="flex items-center gap-2.5 font-heading text-lg font-bold text-white">
                <Lightbulb
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-white"
                />
                Sartaj&apos;s on-ground tips
              </h3>
              <p className="mt-1 text-xs text-sky-50/90">
                Born and raised in Kashmir · 20 years planning these trips
              </p>
              <ul className="mt-4 space-y-3">
                {sartajTips!.map((tip) => (
                  <li
                    key={tip}
                    className="border-l-2 border-white/40 pl-3 text-sm leading-relaxed text-white/95"
                  >
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
