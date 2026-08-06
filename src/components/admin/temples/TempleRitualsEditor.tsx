'use client';

import { Dispatch, SetStateAction } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ITempleRitual } from '@/types/templeTypes';

const uid = () => crypto.randomUUID();

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';
const label = 'block text-[11px] uppercase tracking-wide text-slate-500 mb-1';

export default function TempleRitualsEditor({
  rituals,
  setRituals,
}: {
  rituals: ITempleRitual[];
  setRituals: Dispatch<SetStateAction<ITempleRitual[]>>;
}) {
  const update = (id: string, patch: Partial<ITempleRitual>) =>
    setRituals((p) => p.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <div className="space-y-3">
      {rituals.map((r, idx) => (
        <div
          key={r.id}
          className="rounded-xl border border-[#19315d]/40 bg-[#0b1626] p-3 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className={label}>Ritual {idx + 1}</label>
              <input
                className={inp}
                placeholder="e.g. Mangal Aarti"
                value={r.name}
                onChange={(e) => update(r.id, { name: e.target.value })}
              />
            </div>
            <button
              type="button"
              className={`${removeBtn} mt-5`}
              onClick={() => setRituals((p) => p.filter((i) => i.id !== r.id))}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Start Time</label>
              <input
                className={inp}
                placeholder="3:00 AM"
                value={r.startTime}
                onChange={(e) => update(r.id, { startTime: e.target.value })}
              />
            </div>
            <div>
              <label className={label}>End Time</label>
              <input
                className={inp}
                placeholder="11:00 PM — leave blank for a single time"
                value={r.endTime}
                onChange={(e) => update(r.id, { endTime: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className={addBtn}
        onClick={() =>
          setRituals((p) => [...p, { id: uid(), name: '', startTime: '', endTime: '' }])
        }
      >
        <Plus className="h-4 w-4" /> Add Ritual
      </button>
    </div>
  );
}
