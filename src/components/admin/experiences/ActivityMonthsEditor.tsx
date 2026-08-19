'use client';

import { Check } from 'lucide-react';
import {
  MONTH_WINDOWS,
  type MonthWindowId,
} from '@/types/experienceActivityTypes';

/**
 * Which of the eleven two-month windows this activity is genuinely worth doing
 * in — the filter behind the hub's "Best Activities per Month" tabs.
 *
 * Toggles rather than a multi-select list: the whole year fits on screen, and
 * the windows overlap (Jan–Feb, Feb–Mar …), so an activity that runs across a
 * season boundary has to tick several. Ticking a window it does not really run
 * in is the one thing that makes that section worse than useless — keep these
 * honest against the Season field above.
 */
export default function ActivityMonthsEditor({
  months,
  setMonths,
}: {
  months: MonthWindowId[];
  setMonths: (months: MonthWindowId[]) => void;
}) {
  const toggle = (id: MonthWindowId) =>
    setMonths(
      months.includes(id)
        ? months.filter((month) => month !== id)
        : // Kept in MONTH_WINDOWS order rather than click order, so the stored
          // array reads as a calendar.
          MONTH_WINDOWS.map((window) => window.id).filter(
            (window) => window === id || months.includes(window),
          ),
    );

  return (
    <div className="flex flex-wrap gap-2">
      {MONTH_WINDOWS.map((window) => {
        const on = months.includes(window.id);
        return (
          <button
            key={window.id}
            type="button"
            onClick={() => toggle(window.id)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
              on
                ? 'border-emerald-600/30 bg-emerald-600/15 text-emerald-300'
                : 'border-[#19315d]/60 bg-[#07111f] text-slate-500 hover:border-[#244278] hover:text-slate-300'
            }`}
          >
            {on && <Check className="h-3 w-3" />}
            {window.label}
          </button>
        );
      })}
    </div>
  );
}
