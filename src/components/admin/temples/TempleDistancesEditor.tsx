'use client';

import { Dispatch, SetStateAction } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ITempleDistance } from '@/types/templeTypes';

const uid = () => crypto.randomUUID();

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

export default function TempleDistancesEditor({
  distances,
  setDistances,
}: {
  distances: ITempleDistance[];
  setDistances: Dispatch<SetStateAction<ITempleDistance[]>>;
}) {
  return (
    <div className="space-y-3">
      {distances.map((d, idx) => (
        <div key={d.id} className="flex items-center gap-3">
          <input
            className={`${inp} flex-1`}
            placeholder={`From (e.g. Srinagar Airport) ${idx + 1}`}
            value={d.from}
            onChange={(e) =>
              setDistances((p) => p.map((i) => (i.id === d.id ? { ...i, from: e.target.value } : i)))
            }
          />
          <input
            type="number"
            min={0}
            step="0.1"
            className={`${inp} w-32 shrink-0`}
            placeholder="Distance (km)"
            value={d.distanceKm || ''}
            onChange={(e) =>
              setDistances((p) =>
                p.map((i) => (i.id === d.id ? { ...i, distanceKm: Number(e.target.value) || 0 } : i)),
              )
            }
          />
          <button
            type="button"
            className={removeBtn}
            onClick={() => setDistances((p) => p.filter((i) => i.id !== d.id))}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        className={addBtn}
        onClick={() => setDistances((p) => [...p, { id: uid(), from: '', distanceKm: 0 }])}
      >
        <Plus className="h-4 w-4" /> Add Distance
      </button>
    </div>
  );
}
