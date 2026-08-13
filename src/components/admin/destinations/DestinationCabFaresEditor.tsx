'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { IDestinationCabFare } from '@/types/destinationTypes';

const uid = () => crypto.randomUUID();

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

/**
 * Cab fare rows.
 *
 * Only the slug and the route price live here — the vehicle's name, photo,
 * type and seat count come from its Taxi record at render time. Leave the
 * whole list empty and the table shows the published fleet at base rate,
 * labelled as a starting price; that is usually the right default.
 *
 * Leave the fare blank to use the vehicle's base price. A blank is not zero:
 * saving 0 would advertise a free cab.
 */
export default function DestinationCabFaresEditor({
  fares,
  setFares,
}: {
  fares: IDestinationCabFare[];
  setFares: (fares: IDestinationCabFare[]) => void;
}) {
  const patch = (id: string, values: Partial<IDestinationCabFare>) =>
    setFares(fares.map((f) => (f.id === id ? { ...f, ...values } : f)));

  return (
    <div className="space-y-3">
      {fares.map((fare) => (
        <div key={fare.id} className="flex items-start gap-2">
          <input
            className={`${inp} min-w-0 flex-[2]`}
            placeholder="Taxi slug — e.g. innova-crysta"
            value={fare.slug}
            onChange={(e) => patch(fare.id, { slug: e.target.value.trim() })}
          />
          <input
            type="number"
            min={0}
            className={`${inp} min-w-0 flex-1`}
            placeholder="Fare ₹ (blank = base)"
            value={fare.price === undefined ? '' : String(fare.price)}
            onChange={(e) =>
              patch(fare.id, {
                price: e.target.value === '' ? undefined : Number(e.target.value),
              })
            }
          />
          <input
            className={`${inp} min-w-0 flex-[2]`}
            placeholder="Note — e.g. Round trip, same day"
            value={fare.note ?? ''}
            onChange={(e) => patch(fare.id, { note: e.target.value })}
          />
          <button
            type="button"
            className={removeBtn}
            onClick={() => setFares(fares.filter((f) => f.id !== fare.id))}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}

      <button
        type="button"
        className={addBtn}
        onClick={() => setFares([...fares, { id: uid(), slug: '', note: '' }])}
      >
        <Plus className="h-4 w-4" /> Add Cab Row
      </button>
    </div>
  );
}
