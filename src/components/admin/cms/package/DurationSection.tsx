'use client';

import { Plus, Trash2 } from 'lucide-react';

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';

const uid = () => crypto.randomUUID();

interface BreakdownItem { id: string; days: string; place: string }

interface Props {
  days: string;
  nights: string;
  breakdown: BreakdownItem[];
  onChange: (field: string, value: string) => void;
  setBreakdown: (items: BreakdownItem[]) => void;
}

export default function DurationSection({ days, nights, breakdown, onChange, setBreakdown }: Props) {
  return (
    <div className="space-y-5">
      {/* Days / Nights */}
      <div className="rounded-xl border border-[#19315d]/50 bg-[#07111f]/60 p-5 space-y-4">
        <h4 className="text-sm font-semibold text-slate-300">
          Package Duration
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-400">Days</label>
            <input
              type="number"
              className={`mt-2 ${inp}`}
              placeholder="8"
              value={days}
              onChange={(e) => onChange("days", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-slate-400">Nights</label>
            <input
              type="number"
              className={`mt-2 ${inp}`}
              placeholder="7"
              value={nights}
              onChange={(e) => onChange("nights", e.target.value)}
            />
          </div>
        </div>

        {(days || nights) && (
          <p className="text-xs text-slate-500">
            Preview:{" "}
            <span className="text-blue-400 font-medium">
              {days || "0"} Days / {nights || "0"} Nights
            </span>
          </p>
        )}
      </div>

      {/* Breakdown */}
      <div className="rounded-xl border border-[#19315d]/50 bg-[#07111f]/60 p-5 space-y-4">
        <h4 className="text-sm font-semibold text-slate-300">
          Duration Breakdown
        </h4>

        <div className="space-y-3">
          {breakdown.map((item, idx) => (
            <div
              key={item.id}
              className="flex flex-col  gap-3 rounded-xl border border-[#19315d]/40 bg-[#0b1730]/60 p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs ml-4 text-slate-600 w-5 shrink-0">
                  {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setBreakdown(breakdown.filter((i) => i.id !== item.id))
                  }
                  className="p-1.5 ml-4 p-2 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="number"
                className={`${inp} w-24 shrink-0`}
                placeholder="Days"
                value={item.days}
                onChange={(e) =>
                  setBreakdown(
                    breakdown.map((i) =>
                      i.id === item.id ? { ...i, days: e.target.value } : i,
                    ),
                  )
                }
              />
              <input
                className={`${inp} flex-1`}
                placeholder="Place (e.g. Gulmarg)"
                value={item.place}
                onChange={(e) =>
                  setBreakdown(
                    breakdown.map((i) =>
                      i.id === item.id ? { ...i, place: e.target.value } : i,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            setBreakdown([...breakdown, { id: uid(), days: "1", place: "" }])
          }
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all"
        >
          <Plus className="w-4 h-4" /> Add Breakdown
        </button>
      </div>
    </div>
  );
}
