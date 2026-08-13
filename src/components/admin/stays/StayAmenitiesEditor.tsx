'use client';

import { Plus, Trash2 } from 'lucide-react';
import {
  STAY_AMENITY_GROUPS,
  type IStayAmenity,
  type StayAmenityGroup,
} from '@/types/stayTypes';

const uid = () => crypto.randomUUID();

/**
 * Width lives on the wrapper elements, never on the input or select itself.
 * `inp` already carries w-full, so adding a second width utility (w-40) to the
 * same element leaves the winner up to stylesheet order rather than class
 * order — which is what previously blew the select out to full width.
 */
const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const sel = `${inp} cursor-pointer appearance-none pr-8`;
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-2 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

export default function StayAmenitiesEditor({
  amenities,
  setAmenities,
}: {
  amenities: IStayAmenity[];
  setAmenities: (amenities: IStayAmenity[]) => void;
}) {
  const patch = (id: string, field: keyof IStayAmenity, value: string) =>
    setAmenities(
      amenities.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    );

  return (
    <div className="space-y-3">
      {/* Column headers — desktop only, so each field is self-explanatory */}
      {amenities.length > 0 && (
        <div className="hidden items-center gap-3 px-1 sm:flex">
          <span className="min-w-0 flex-1 text-xs text-slate-600">Amenity</span>
          <span className="w-44 shrink-0 text-xs text-slate-600">Group</span>
          <span className="w-9 shrink-0" />
        </div>
      )}

      {amenities.map((amenity) => (
        <div
          key={amenity.id}
          className="flex flex-col gap-3 rounded-xl border border-[#19315d]/40 bg-[#07111f]/40 p-3 sm:flex-row sm:items-center sm:border-transparent sm:bg-transparent sm:p-0"
        >
          {/* min-w-0 lets the input actually shrink — flex items default to
              min-width:auto, which otherwise forces overflow on long values. */}
          <div className="min-w-0 flex-1">
            <input
              className={inp}
              placeholder="e.g. Bukhari heating"
              value={amenity.label}
              onChange={(e) => patch(amenity.id, 'label', e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-full sm:w-44">
              <select
                className={sel}
                value={amenity.group}
                onChange={(e) => patch(amenity.id, 'group', e.target.value)}
              >
                {STAY_AMENITY_GROUPS.map((group) => (
                  <option key={group} value={group} className="bg-[#0b1730]">
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              aria-label="Remove amenity"
              className={removeBtn}
              onClick={() => setAmenities(amenities.filter((a) => a.id !== amenity.id))}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        className={addBtn}
        onClick={() =>
          setAmenities([
            ...amenities,
            { id: uid(), label: '', group: 'Essentials' as StayAmenityGroup },
          ])
        }
      >
        <Plus className="h-4 w-4" /> Add Amenity
      </button>
    </div>
  );
}
