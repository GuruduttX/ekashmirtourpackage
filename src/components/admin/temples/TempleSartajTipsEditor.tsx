'use client';

import { Dispatch, SetStateAction } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ITempleSartajTip } from '@/types/templeTypes';

const uid = () => crypto.randomUUID();

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

export default function TempleSartajTipsEditor({
  tips,
  setTips,
}: {
  tips: ITempleSartajTip[];
  setTips: Dispatch<SetStateAction<ITempleSartajTip[]>>;
}) {
  return (
    <div className="space-y-3">
      {tips.map((t, idx) => (
        <div key={t.id} className="flex items-center gap-3">
          <input
            className={`${inp} flex-1`}
            placeholder={`Tip ${idx + 1} — an on-ground verified tip only a local would know`}
            value={t.tip}
            onChange={(e) => setTips((p) => p.map((i) => (i.id === t.id ? { ...i, tip: e.target.value } : i)))}
          />
          <button
            type="button"
            className={removeBtn}
            onClick={() => setTips((p) => p.filter((i) => i.id !== t.id))}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        className={addBtn}
        onClick={() => setTips((p) => [...p, { id: uid(), tip: '' }])}
      >
        <Plus className="h-4 w-4" /> Add Tip
      </button>
    </div>
  );
}
