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
 * One editor for every "list of one-line strings" field on a stay —
 * highlights (label), inclusions/exclusions (description) and house rules
 * (rule). The text key is passed in so each keeps its own field name.
 */
export default function SimpleListEditor<T extends { id: string }>({
  items,
  setItems,
  field,
  placeholder,
  addLabel,
}: {
  items: T[];
  setItems: (items: T[]) => void;
  field: keyof T & string;
  placeholder: string;
  addLabel: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={item.id} className="flex items-center gap-3">
          {/* min-w-0: flex items default to min-width:auto, and an input's
              intrinsic width would otherwise push the remove button out. */}
          <input
            className={`${inp} min-w-0 flex-1`}
            placeholder={`${placeholder} ${idx + 1}`}
            value={(item[field] as string) ?? ''}
            onChange={(e) =>
              setItems(
                items.map((i) =>
                  i.id === item.id ? { ...i, [field]: e.target.value } : i,
                ),
              )
            }
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
        onClick={() => setItems([...items, { id: uid(), [field]: '' } as unknown as T])}
      >
        <Plus className="h-4 w-4" /> {addLabel}
      </button>
    </div>
  );
}
