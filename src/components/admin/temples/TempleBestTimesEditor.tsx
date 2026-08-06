'use client';

import { Dispatch, SetStateAction } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ITempleBestTime, TempleSeasonLabel } from '@/types/templeTypes';

const uid = () => crypto.randomUUID();

const SEASON_LABELS: TempleSeasonLabel[] = ['Best', 'Hot', 'Monsoon'];

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

export default function TempleBestTimesEditor({
  bestTimes,
  setBestTimes,
}: {
  bestTimes: ITempleBestTime[];
  setBestTimes: Dispatch<SetStateAction<ITempleBestTime[]>>;
}) {
  const update = (id: string, patch: Partial<ITempleBestTime>) =>
    setBestTimes((p) => p.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  return (
    <div className="space-y-3">
      {bestTimes.map((b, idx) => (
        <div key={b.id} className="flex items-center gap-3">
          <input
            className={`${inp} flex-1`}
            placeholder={`Period ${idx + 1} — e.g. Oct-Mar`}
            value={b.period}
            onChange={(e) => update(b.id, { period: e.target.value })}
          />
          <select
            className={`${inp} w-36 shrink-0`}
            value={b.type}
            onChange={(e) => update(b.id, { type: e.target.value as TempleSeasonLabel })}
          >
            {SEASON_LABELS.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
          <button
            type="button"
            className={removeBtn}
            onClick={() => setBestTimes((p) => p.filter((i) => i.id !== b.id))}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}

      <button
        type="button"
        className={addBtn}
        onClick={() => setBestTimes((p) => [...p, { id: uid(), period: '', type: 'Best' }])}
      >
        <Plus className="h-4 w-4" /> Add Period
      </button>
    </div>
  );
}
