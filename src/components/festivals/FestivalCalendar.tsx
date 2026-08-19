import Link from "next/link";
import FestivalOrnament from "@/components/festivals/FestivalOrnament";

/**
 * "Festival calendar" — the year as one horizontal timeline.
 *
 * Twelve months on a dashed axis, with the months that carry a festival raised
 * into a blue pill and dropping a dashed leader down to the festival's name.
 *
 * ONE LAYOUT AT EVERY WIDTH. The comp's horizontal year is kept intact on a
 * phone rather than reflowing to a vertical list — twelve legible columns need
 * roughly 900px, so the row holds that width and the container scrolls
 * sideways underneath it.
 *
 * DATE HONESTY (see the header of src/data/festivals.ts): a festival is pinned
 * to the month it *usually* falls in, and several of these move every year.
 * That is why the axis is months and never dates, and why `window` prose lives
 * on the detail pages rather than here.
 *
 * Server component — static, no state.
 */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

type CalendarEntry = {
  /** 0-based index into MONTHS — the month the pill sits on. */
  month: number;
  name: string;
  /**
   * Slug of the festival page this routes into, when one exists.
   *
   * Optional on purpose: Herath has no page of its own yet, and a link to a
   * 404 is worse than plain text. Add the slug here the day the page lands.
   */
  slug?: string;
};

const ENTRIES: CalendarEntry[] = [
  { month: 1, name: "Herath (Maha Shivaratri)" },
  { month: 2, name: "Navreh", slug: "eid-and-navroz" },
  { month: 3, name: "Tulip Festival", slug: "tulip-festival" },
  { month: 5, name: "Kheer Bhawani Mela", slug: "kheer-bhawani-mela" },
  { month: 6, name: "Amarnath Yatra", slug: "amarnath-yatra" },
  { month: 9, name: "Saffron Festival", slug: "saffron-festival" },
  { month: 11, name: "Urs of Shah-e-Hamdan", slug: "sufi-festivals" },
];

/** The festival on a given month, if any. */
const entryFor = (month: number) =>
  ENTRIES.find((entry) => entry.month === month);

/**
 * The festival's name — a link where there is somewhere to go, plain text
 * where there is not. Same type either way so the two layouts stay identical.
 */
function EntryName({
  entry,
  className,
}: {
  entry: CalendarEntry;
  className: string;
}) {
  return entry.slug ? (
    <Link
      href={`/festivals/${entry.slug}/`}
      className={`${className} rounded-sm transition-colors hover:text-sky-600 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none`}
    >
      {entry.name}
    </Link>
  ) : (
    <span className={className}>{entry.name}</span>
  );
}

export default function FestivalCalendar() {
  return (
    <section
      aria-labelledby="festival-calendar"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col items-center text-center">
        <p className="text-sm text-slate-600 sm:text-base">Plan your journey</p>

        <h2
          id="festival-calendar"
          className="mt-2 font-heading text-2xl font-bold tracking-wide text-slate-900 [font-variant:small-caps] sm:text-3xl lg:text-4xl"
        >
          Festival <span className="text-sky-500">calendar</span>
        </h2>

        <FestivalOrnament tone="dark" className="mt-3 max-w-md sm:mt-4" />
      </div>

      {/* ── THE AXIS ───────────────────────────────────────────────────────
          One layout at every width — the comp's horizontal year, unchanged on
          a phone. Twelve columns need about 900px to stay legible ("Tulip
          Festival" alone is wider than a twelfth of a phone screen), so below
          that the row keeps its width and the container scrolls sideways
          instead of the layout reflowing.

          The negative margins let the rail bleed to the screen edge while the
          first month still lines up with the section's gutter, and they are
          cancelled at lg where nothing scrolls.

          The dashed line is one absolutely-positioned border behind the row,
          not a border per month: twelve separate segments would show a seam at
          every column boundary and would not survive the pills sitting on it.
          The pills are `relative` so they paint over that line and mask it. */}
      <div className="-mx-4 mt-12 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
        <ol className="relative grid min-w-[900px] grid-cols-12 lg:min-w-0">
          <li
            aria-hidden="true"
            className="absolute inset-x-0 top-5 border-t border-dashed border-sky-300"
          />

          {MONTHS.map((month, index) => {
            const entry = entryFor(index);

            return (
              <li key={month} className="flex flex-col items-center">
                {entry ? (
                  <span className="relative flex h-10 items-center rounded-full bg-sky-400 px-5 text-sm font-medium text-white shadow-sm">
                    {month}
                  </span>
                ) : (
                  // Same 40px box as a pill so every month's baseline lines up
                  // on the axis whether it carries a festival or not.
                  <span className="relative flex h-10 items-center bg-white px-2 text-sm text-slate-700">
                    {month}
                  </span>
                )}

                {entry && (
                  <>
                    {/* Leader from the pill down to the dot. */}
                    <span
                      aria-hidden="true"
                      className="h-12 border-l border-dashed border-sky-300"
                    />
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-sky-400"
                    />
                    <EntryName
                      entry={entry}
                      className="mt-3 px-1 text-center text-sm leading-snug text-slate-800"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
