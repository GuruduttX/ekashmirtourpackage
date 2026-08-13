'use client';

import { Dispatch, SetStateAction } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { IStayPlaceTip } from '@/types/stayPlaceTypes';

const uid = () => crypto.randomUUID();

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const ta = `${inp} resize-y min-h-20`;
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

export default function StayPlaceTipsEditor({
  tips,
  setTips,
}: {
  tips: IStayPlaceTip[];
  setTips: Dispatch<SetStateAction<IStayPlaceTip[]>>;
}) {
  const patch = (id: string, field: keyof IStayPlaceTip, value: string) =>
    setTips((p) => p.map((t) => (t.id === id ? { ...t, [field]: value } : t)));

  return (
    <div className="space-y-4">
      {tips.map((tip, idx) => (
        <div
          key={tip.id}
          className="rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4 space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#19315d]/40">
            <span className="text-sm text-slate-400 font-medium">Tip {idx + 1}</span>
            <button
              type="button"
              className={removeBtn}
              onClick={() => setTips((p) => p.filter((t) => t.id !== tip.id))}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <input
            className={inp}
            placeholder="Card title — e.g. Pick your ghat carefully"
            value={tip.title}
            onChange={(e) => patch(tip.id, 'title', e.target.value)}
          />

          <textarea
            className={ta}
            placeholder="The tip itself — something only someone who lives here would know. 1–2 sentences."
            value={tip.tip}
            onChange={(e) => patch(tip.id, 'tip', e.target.value)}
          />
        </div>
      ))}

      <button
        type="button"
        className={addBtn}
        onClick={() => setTips((p) => [...p, { id: uid(), title: '', tip: '' }])}
      >
        <Plus className="h-4 w-4" /> Add Tip
      </button>
    </div>
  );
}
