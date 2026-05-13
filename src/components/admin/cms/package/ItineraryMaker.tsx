'use client';

import { Plus, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(
  () => import('@/components/admin/shared/RichTextEditor'),
  { ssr: false, loading: () => <div className="mt-2 h-48 rounded-xl bg-[#07111f] border border-[#19315d]/60 animate-pulse" /> }
);

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';

const uid = () => crypto.randomUUID();

export interface ItineraryItem { id: string; day: number; title: string; description: string }

interface Props {
  itinerary: ItineraryItem[];
  setItinerary: (items: ItineraryItem[]) => void;
}

export default function ItineraryMaker({ itinerary, setItinerary }: Props) {
  const update = <K extends keyof ItineraryItem>(id: string, field: K, value: ItineraryItem[K]) =>
    setItinerary(itinerary.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  return (
    <div className="space-y-4">
      {itinerary.map((item) => (
        <div key={item.id}
          className="rounded-xl border border-[#19315d]/50 bg-[#07111f]/60 p-5 space-y-4">

          {/* Day + Title row */}
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <label className="text-xs text-slate-500 font-medium">Day</label>
              <input type="number" className={`mt-1.5 ${inp} w-20`} placeholder="1"
                value={item.day}
                onChange={(e) => update(item.id, 'day', Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-500 font-medium">Title</label>
              <input className={`mt-1.5 ${inp}`} placeholder="e.g. Arrival in Srinagar"
                value={item.title}
                onChange={(e) => update(item.id, 'title', e.target.value)} />
            </div>
            <button type="button"
              onClick={() => setItinerary(itinerary.filter((i) => i.id !== item.id))}
              className="mt-6 p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Description — Rich Text */}
          <div>
            <label className="text-xs text-slate-500 font-medium">Description</label>
            <RichTextEditor
              value={item.description}
              onChange={(html) => update(item.id, 'description', html)}
              minHeight="220px"
              maxHeight="380px"
            />
          </div>
        </div>
      ))}

      <button type="button"
        onClick={() => setItinerary([...itinerary, { id: uid(), day: itinerary.length + 1, title: '', description: '' }])}
        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all">
        <Plus className="w-4 h-4" /> Add Day
      </button>
    </div>
  );
}
