import { CalendarCheck, CalendarX, CloudSun, Clock, Info } from "lucide-react";
import {
  WEEKDAYS,
  type ActivityBookingRequirement,
  type ActivitySchedule,
  type ActivityTiming,
  type WeekdayId,
} from "@/data/experienceActivities";

/**
 * Booking requirements and operating hours.
 *
 * The question this answers is "if I turn up, will it be running?" — which
 * needs four separate things, and is why the data behind it is structured
 * rather than a paragraph:
 *
 *   1. WHEN in the year   — schedules, because Kashmir's winter hours are not
 *                            its summer hours
 *   2. WHICH DAYS         — a maintenance day closure is invisible in a plain
 *                            opens/closes pair
 *   3. WHAT TIME          — including `lastEntry`, which is the number that
 *                            actually decides whether someone gets turned away
 *   4. HOW MUCH NOTICE    — required / recommended / walk-in
 *
 * Plus the honest fifth: whether weather can cancel it on the day, which for
 * half of Kashmir's activities is the real answer.
 *
 * Returns null with no timing data. Publishing no hours is better than
 * publishing hours nobody has checked — someone sent to a closed gate is a
 * worse outcome than someone who had to ask.
 */

/** "16:30" → "4:30 PM". Times are wall-clock strings; see ActivitySlot. */
function formatTime(value: string): string {
  const [rawHours, rawMinutes] = value.split(":");
  const hours = Number(rawHours);
  if (Number.isNaN(hours)) return value;

  const period = hours >= 12 ? "PM" : "AM";
  // 0 → 12 AM, 13 → 1 PM.
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${rawMinutes ?? "00"} ${period}`;
}

const BOOKING_COPY: Record<
  ActivityBookingRequirement,
  { label: string; tone: string }
> = {
  required: {
    label: "Booking required",
    tone: "border-amber-200 bg-amber-50 text-amber-800",
  },
  recommended: {
    label: "Booking recommended",
    tone: "border-sky-200 bg-sky-50 text-sky-700",
  },
  "walk-in": {
    label: "Walk-in, no booking needed",
    tone: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
};

/**
 * Which days a schedule actually runs.
 *
 * Resolved from three inputs so the chips, the "closed" line and the JSON-LD
 * all agree: the schedule's own `days` allowlist, its season-specific
 * `closedDays`, and the activity-wide `weeklyOff`.
 */
function openDays(schedule: ActivitySchedule, weeklyOff: WeekdayId[]) {
  const allowed = schedule.days ?? WEEKDAYS.map((day) => day.id);
  const closed = [...(schedule.closedDays ?? []), ...weeklyOff];
  return WEEKDAYS.map((day) => ({
    ...day,
    open: allowed.includes(day.id) && !closed.includes(day.id),
  }));
}

export default function ActivityBookingTiming({
  timing,
}: {
  timing?: ActivityTiming;
}) {
  if (!timing?.schedules?.length) return null;

  const booking = timing.booking ? BOOKING_COPY[timing.booking] : null;

  const weeklyOff = timing.weeklyOff ?? [];
  const weeklyOffLabels = WEEKDAYS.filter((day) =>
    weeklyOff.includes(day.id),
  ).map((day) => day.label);

  // Day chips only earn their space when something is actually closed —
  // otherwise seven identical "open" pills say "open every day" the long way.
  const showDayChips =
    weeklyOff.length > 0 ||
    timing.schedules.some(
      (schedule) => schedule.closedDays?.length || schedule.days?.length,
    );

  return (
    <section
      id="timings"
      aria-labelledby="timings-heading"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <h2
        id="timings-heading"
        className="text-center font-heading text-xl font-bold text-slate-900 sm:text-2xl md:text-left"
      >
        Booking &amp; <span className="text-sky-500">timings</span>
      </h2>

      {(booking || timing.bookingLeadTime) && (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          {booking && (
            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${booking.tone}`}
            >
              <CalendarCheck aria-hidden="true" className="h-3.5 w-3.5" />
              {booking.label}
            </span>
          )}
          {timing.bookingLeadTime && (
            <p className="text-sm text-slate-600">{timing.bookingLeadTime}</p>
          )}
        </div>
      )}

      {/* Weekly off — rendered ONLY when the record actually has one. A page
          with no weekly closure says nothing here rather than "open every day",
          which is a claim the data does not necessarily support. */}
      {weeklyOffLabels.length > 0 && (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-800">
          <CalendarX
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-rose-500"
          />
          <span>
            <span className="font-semibold">Weekly off:</span>{" "}
            {weeklyOffLabels.join(", ")} — closed all day.
          </span>
        </p>
      )}

      {/* ---------- schedules ---------- */}
      <div className="mt-5 space-y-4">
        {timing.schedules.map((schedule) => {
          const days = openDays(schedule, weeklyOff);
          const closedLabels = days.filter((day) => !day.open);

          return (
            <div
              key={schedule.id}
              className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
            >
              {schedule.season && (
                <p className="font-heading text-sm font-bold text-slate-900">
                  {schedule.season}
                </p>
              )}

              <ul className={schedule.season ? "mt-3 space-y-2.5" : "space-y-2.5"}>
                {schedule.slots.map((slot) => (
                  <li key={slot.id} className="flex items-start gap-2.5">
                    <Clock
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-sky-500"
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-slate-900">
                        {slot.label && (
                          <span className="font-semibold">{slot.label}: </span>
                        )}
                        <span className="tabular-nums">
                          {formatTime(slot.opens)} – {formatTime(slot.closes)}
                        </span>
                      </p>
                      {slot.lastEntry && (
                        <p className="mt-0.5 text-xs text-amber-700">
                          Last entry {formatTime(slot.lastEntry)}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {showDayChips && (
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {days.map((day) => (
                    <span
                      key={day.id}
                      // The visual state is colour plus a line-through; the
                      // sr-only text is what carries it to a screen reader,
                      // which cannot see either.
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        day.open
                          ? "bg-sky-100 text-sky-700"
                          : "bg-slate-200 text-slate-400 line-through"
                      }`}
                    >
                      {day.short}
                      <span className="sr-only">
                        {day.open ? " open" : " closed"}
                      </span>
                    </span>
                  ))}
                </div>
              )}

              {closedLabels.length > 0 && (
                <p className="mt-2.5 flex items-start gap-1.5 text-xs text-slate-600">
                  <CalendarX
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400"
                  />
                  Closed{" "}
                  {closedLabels.map((day) => day.label).join(", ")}
                </p>
              )}

              {schedule.note && (
                <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                  {schedule.note}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* ---------- closed dates ---------- */}
      {timing.closedDates?.length ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
          <p className="font-heading text-sm font-bold text-slate-900">
            Closed dates
          </p>
          <ul className="mt-2 space-y-1.5">
            {timing.closedDates.map((entry) => (
              <li key={entry.id} className="text-sm text-slate-600">
                <span className="font-medium text-slate-900">{entry.date}</span>
                {entry.reason ? ` — ${entry.reason}` : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* ---------- weather ---------- */}
      {timing.weatherDependent && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <CloudSun
            aria-hidden="true"
            className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber-600"
          />
          <div>
            <p className="text-sm font-semibold text-amber-900">
              Weather-dependent
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-amber-800">
              {timing.weatherNote ??
                "This can be called off on the day if conditions turn. Build a spare day into your plans."}
            </p>
          </div>
        </div>
      )}

      {/* ---------- verification ----------
          Mirrors the price caveat: the same flag that withholds the
          OpeningHoursSpecification JSON-LD also shows this line, so what a
          reader sees and what a crawler is told cannot disagree. */}
      <p className="mt-4 flex items-start gap-1.5 text-xs text-slate-500">
        <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        {timing.verified && timing.verifiedOn
          ? `Timings checked on the ground on ${timing.verifiedOn}.`
          : "Timings shift with the season and the weather — we confirm the current ones before you travel."}
      </p>
    </section>
  );
}
