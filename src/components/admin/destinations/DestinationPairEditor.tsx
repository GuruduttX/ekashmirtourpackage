'use client';

import { Plus, Trash2 } from 'lucide-react';

const uid = () => crypto.randomUUID();

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

/**
 * One editor for every "list of label + value rows" on a destination — extra
 * quick facts (label/value) and map landmarks (name/detail). The two field
 * names are passed in so each list keeps its own, the way SimpleListEditor
 * does for single-field lists in the stays silo.
 */
export default function DestinationPairEditor<T extends { id: string }>({
  items,
  setItems,
  fieldA,
  fieldB,
  placeholderA,
  placeholderB,
  addLabel,
}: {
  items: T[];
  setItems: (items: T[]) => void;
  fieldA: keyof T & string;
  fieldB: keyof T & string;
  placeholderA: string;
  placeholderB: string;
  addLabel: string;
}) {
  const patch = (id: string, field: string, value: string) =>
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          {/* min-w-0: inputs carry an intrinsic width that would otherwise push
              the remove button out of the row. */}
          <input
            className={`${inp} min-w-0 flex-1`}
            placeholder={placeholderA}
            value={(item[fieldA] as string) ?? ''}
            onChange={(e) => patch(item.id, fieldA, e.target.value)}
          />
          <input
            className={`${inp} min-w-0 flex-1`}
            placeholder={placeholderB}
            value={(item[fieldB] as string) ?? ''}
            onChange={(e) => patch(item.id, fieldB, e.target.value)}
          />
          <button
            type="button"
            className={removeBtn}
            onClick={() => setItems(items.filter((i) => i.id !== item.id))}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}

      <button
        type="button"
        className={addBtn}
        onClick={() =>
          setItems([
            ...items,
            { id: uid(), [fieldA]: '', [fieldB]: '' } as unknown as T,
          ])
        }
      >
        <Plus className="h-4 w-4" /> {addLabel}
      </button>
    </div>
  );
}
