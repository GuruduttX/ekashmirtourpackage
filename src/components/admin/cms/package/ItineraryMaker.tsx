'use client';

import { useState } from 'react';
import { GripVertical, Plus, Trash2, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(
  () => import('@/components/admin/shared/RichTextEditor'),
  { ssr: false, loading: () => <div className="mt-2 h-48 rounded-xl bg-[#07111f] border border-[#19315d]/60 animate-pulse" /> }
);

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';

const uid = () => crypto.randomUUID();

export interface ItineraryDay {
  id: string;
  day: number;
  title: string;
  description: string;
  stops: string[];
}

interface Props {
  itineraryDays: ItineraryDay[];
  setItineraryDays: (days: ItineraryDay[]) => void;
}

export default function ItineraryMaker({ itineraryDays, setItineraryDays }: Props) {
  const update = <K extends keyof ItineraryDay>(id: string, field: K, value: ItineraryDay[K]) =>
    setItineraryDays(itineraryDays.map((d) => (d.id === id ? { ...d, [field]: value } : d)));

  return (
    <div className="space-y-4">
      {itineraryDays.map((item) => (
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
              onClick={() => setItineraryDays(itineraryDays.filter((d) => d.id !== item.id))}
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

          {/* Stops */}
          <div>
            <label className="text-xs text-slate-500 font-medium">Stops</label>
            <StopsInput
              stops={item.stops ?? []}
              onChange={(stops) => update(item.id, 'stops', stops)}
            />
          </div>
        </div>
      ))}

      <button type="button"
        onClick={() => setItineraryDays([...itineraryDays, { id: uid(), day: itineraryDays.length + 1, title: '', description: '', stops: [] }])}
        className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all">
        <Plus className="w-4 h-4" /> Add Day
      </button>
    </div>
  );
}

function StopsInput({ stops, onChange }: { stops: string[]; onChange: (stops: string[]) => void }) {
  const [draft, setDraft] = useState('');
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const addStop = () => {
    const value = draft.trim();
    if (!value) return;
    onChange([...stops, value]);
    setDraft('');
  };

  const reorder = (from: number, to: number) => {
    if (from === to) return;
    const next = [...stops];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <div className="mt-1.5 space-y-2">
      {stops.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {stops.map((stop, i) => (
            <span key={`${stop}-${i}`}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragEnter={() => setOverIndex(i)}
              onDragEnd={() => {
                setDragIndex(null);
                setOverIndex(null);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIndex !== null) reorder(dragIndex, i);
                setDragIndex(null);
                setOverIndex(null);
              }}
              className={`flex cursor-grab items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-blue-300 transition-colors active:cursor-grabbing ${
                overIndex === i && dragIndex !== null && dragIndex !== i
                  ? 'border-blue-400 bg-blue-500/20'
                  : 'border-blue-500/30 bg-blue-500/10'
              } ${dragIndex === i ? 'opacity-40' : ''}`}>
              <GripVertical className="w-3 h-3 text-blue-500/60" />
              {stop}
              <button type="button" onClick={() => onChange(stops.filter((_, idx) => idx !== i))}
                className="text-blue-400 hover:text-red-400 transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          className={inp}
          placeholder="e.g. Somnath temple — press Enter to add"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); addStop(); }
          }}
        />
        <button type="button" onClick={addStop}
          className="shrink-0 px-4 rounded-xl border border-dashed border-blue-600/30 text-blue-400 hover:text-blue-300 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all text-sm">
          Add
        </button>
      </div>
    </div>
  );
}
