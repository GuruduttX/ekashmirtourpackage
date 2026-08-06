'use client';

import { Dispatch, SetStateAction } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ITempleSeasonTimings, ITempleTimingEntry } from '@/types/templeTypes';

const uid = () => crypto.randomUUID();

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

interface Props {
  seasonalTimings: ITempleSeasonTimings[];
  setSeasonalTimings: Dispatch<SetStateAction<ITempleSeasonTimings[]>>;
}

export default function TempleTimingsEditor({ seasonalTimings, setSeasonalTimings }: Props) {
  const addSeason = () =>
    setSeasonalTimings((prev) => [...prev, { id: uid(), season: '', periods: [] }]);

  const removeSeason = (seasonId: string) =>
    setSeasonalTimings((prev) => prev.filter((s) => s.id !== seasonId));

  const updateSeason = (seasonId: string, season: string) =>
    setSeasonalTimings((prev) => prev.map((s) => (s.id === seasonId ? { ...s, season } : s)));

  const addPeriod = (seasonId: string) =>
    setSeasonalTimings((prev) =>
      prev.map((s) =>
        s.id === seasonId
          ? { ...s, periods: [...s.periods, { id: uid(), label: '', entries: [] }] }
          : s,
      ),
    );

  const removePeriod = (seasonId: string, periodId: string) =>
    setSeasonalTimings((prev) =>
      prev.map((s) =>
        s.id === seasonId ? { ...s, periods: s.periods.filter((p) => p.id !== periodId) } : s,
      ),
    );

  const updatePeriodLabel = (seasonId: string, periodId: string, value: string) =>
    setSeasonalTimings((prev) =>
      prev.map((s) =>
        s.id === seasonId
          ? { ...s, periods: s.periods.map((p) => (p.id === periodId ? { ...p, label: value } : p)) }
          : s,
      ),
    );

  const addEntry = (seasonId: string, periodId: string) =>
    setSeasonalTimings((prev) =>
      prev.map((s) =>
        s.id === seasonId
          ? {
              ...s,
              periods: s.periods.map((p) =>
                p.id === periodId
                  ? { ...p, entries: [...p.entries, { id: uid(), name: '', startTime: '', endTime: '' }] }
                  : p,
              ),
            }
          : s,
      ),
    );

  const removeEntry = (seasonId: string, periodId: string, entryId: string) =>
    setSeasonalTimings((prev) =>
      prev.map((s) =>
        s.id === seasonId
          ? {
              ...s,
              periods: s.periods.map((p) =>
                p.id === periodId ? { ...p, entries: p.entries.filter((e) => e.id !== entryId) } : p,
              ),
            }
          : s,
      ),
    );

  const updateEntry = (
    seasonId: string,
    periodId: string,
    entryId: string,
    field: keyof ITempleTimingEntry,
    value: string,
  ) =>
    setSeasonalTimings((prev) =>
      prev.map((s) =>
        s.id === seasonId
          ? {
              ...s,
              periods: s.periods.map((p) =>
                p.id === periodId
                  ? { ...p, entries: p.entries.map((e) => (e.id === entryId ? { ...e, [field]: value } : e)) }
                  : p,
              ),
            }
          : s,
      ),
    );

  return (
    <div className="space-y-4">
      {seasonalTimings.map((season) => (
        <div key={season.id} className="space-y-3 rounded-xl border border-[#19315d]/50 bg-[#07111f]/40 p-4">
          <div className="flex items-center gap-3">
            <input
              className={`${inp} flex-1 font-semibold`}
              placeholder="Season name (e.g. Summer)"
              value={season.season}
              onChange={(e) => updateSeason(season.id, e.target.value)}
            />
            <button type="button" className={removeBtn} onClick={() => removeSeason(season.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3 border-l-2 border-[#19315d]/40 pl-3">
            {season.periods.map((period) => (
              <div key={period.id} className="space-y-2.5 rounded-lg bg-[#0b1730] p-3">
                <div className="flex items-center gap-3">
                  <input
                    className={`${inp} flex-1`}
                    placeholder="Period (e.g. Morning, Evening)"
                    value={period.label}
                    onChange={(e) => updatePeriodLabel(season.id, period.id, e.target.value)}
                  />
                  <button type="button" className={removeBtn} onClick={() => removePeriod(season.id, period.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {period.entries.map((entry) => (
                  <div key={entry.id} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
                    <input
                      className={inp}
                      placeholder="Name (e.g. Darshan)"
                      value={entry.name}
                      onChange={(e) => updateEntry(season.id, period.id, entry.id, 'name', e.target.value)}
                    />
                    <input
                      className={inp}
                      placeholder="Start (e.g. 05:00 AM)"
                      value={entry.startTime}
                      onChange={(e) => updateEntry(season.id, period.id, entry.id, 'startTime', e.target.value)}
                    />
                    <input
                      className={inp}
                      placeholder="End (optional)"
                      value={entry.endTime}
                      onChange={(e) => updateEntry(season.id, period.id, entry.id, 'endTime', e.target.value)}
                    />
                    <button
                      type="button"
                      className={removeBtn}
                      onClick={() => removeEntry(season.id, period.id, entry.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}

                <button type="button" className={addBtn} onClick={() => addEntry(season.id, period.id)}>
                  <Plus className="h-4 w-4" /> Add Timing Entry
                </button>
              </div>
            ))}

            <button type="button" className={addBtn} onClick={() => addPeriod(season.id)}>
              <Plus className="h-4 w-4" /> Add Period
            </button>
          </div>
        </div>
      ))}

      <button type="button" className={addBtn} onClick={addSeason}>
        <Plus className="h-4 w-4" /> Add Season
      </button>
    </div>
  );
}
