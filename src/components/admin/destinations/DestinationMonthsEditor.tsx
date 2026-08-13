'use client';

import { RotateCcw } from 'lucide-react';
import {
  MONTH_LABELS,
  MONTH_RATINGS,
  type IMonthEntry,
  type MonthRating,
} from '@/types/destinationTypes';

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const sel = `${inp} cursor-pointer appearance-none`;

/** Matches the colour coding the public month grid uses. */
const RATING_CLASS: Record<MonthRating, string> = {
  best: 'border-emerald-600/30 bg-emerald-600/10 text-emerald-300',
  good: 'border-sky-600/30 bg-sky-600/10 text-sky-300',
  mixed: 'border-amber-600/30 bg-amber-600/10 text-amber-300',
  avoid: 'border-rose-600/30 bg-rose-600/10 text-rose-300',
};

/** Twelve blank rows, January first, so the table is never partly filled. */
export const emptyMonths = (): IMonthEntry[] =>
  MONTH_LABELS.map((month) => ({
    id: `month-${month.toLowerCase()}`,
    month,
    rating: 'good' as MonthRating,
    note: '',
  }));

/**
 * The twelve-month table.
 *
 * Fixed twelve rows, not an add/remove list — the year does not have a
 * variable number of months, and a table missing March is a bug rather than an
 * editorial choice. The rating drives the cell colour on the public page, and
 * every cell also shows the verdict word, so the table still reads without
 * colour.
 */
export default function DestinationMonthsEditor({
  months,
  setMonths,
}: {
  months: IMonthEntry[];
  setMonths: (months: IMonthEntry[]) => void;
}) {
  // A record saved before this section existed, or one seeded short, gets the
  // full year back rather than rendering a partial table.
  const rows = months.length === 12 ? months : emptyMonths();

  const patch = (id: string, values: Partial<IMonthEntry>) =>
    setMonths(rows.map((m) => (m.id === id ? { ...m, ...values } : m)));

  return (
    <div className="space-y-2">
      {rows.map((entry) => (
        <div key={entry.id} className="flex items-center gap-2">
          <span
            className={`w-14 shrink-0 rounded-lg border px-2 py-2 text-center text-xs font-semibold ${
              RATING_CLASS[entry.rating]
            }`}
          >
            {entry.month}
          </span>

          <select
            className={`${sel} w-28 shrink-0`}
            value={entry.rating}
            onChange={(e) =>
              patch(entry.id, { rating: e.target.value as MonthRating })
            }
          >
            {MONTH_RATINGS.map((rating) => (
              <option key={rating} value={rating} className="bg-[#0b1730]">
                {rating}
              </option>
            ))}
          </select>

          <input
            className={`${inp} min-w-0 flex-1`}
            placeholder="Why — e.g. Deep snow, gondola running"
            value={entry.note}
            onChange={(e) => patch(entry.id, { note: e.target.value })}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => setMonths(emptyMonths())}
        className="flex items-center gap-2 rounded-xl border border-[#19315d]/60 px-4 py-2 text-xs text-slate-500 transition-all hover:border-[#244278] hover:text-slate-300"
      >
        <RotateCcw className="h-3.5 w-3.5" /> Reset all twelve rows
      </button>
    </div>
  );
}
