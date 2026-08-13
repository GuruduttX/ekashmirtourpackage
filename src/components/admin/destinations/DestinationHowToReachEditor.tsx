'use client';

import { Plus, Trash2 } from 'lucide-react';
import {
  TRANSPORT_MODES,
  type ITransportMode,
  type TransportModeName,
} from '@/types/destinationTypes';

const uid = () => crypto.randomUUID();

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const ta = `${inp} resize-y min-h-20`;
const sel = `${inp} cursor-pointer appearance-none`;
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';
const hint = 'mt-1.5 text-xs text-slate-600';

/**
 * "How to reach" — one block per mode, each with its own hub connections.
 *
 * The public section renders these as tabs, so the order here is the tab
 * order and the first mode is the one a reader lands on. Carriers, services
 * and journey times change every season: treat everything below as content to
 * re-check, not as fixed geography.
 */
export default function DestinationHowToReachEditor({
  modes,
  setModes,
}: {
  modes: ITransportMode[];
  setModes: (modes: ITransportMode[]) => void;
}) {
  const patch = (id: string, values: Partial<ITransportMode>) =>
    setModes(modes.map((m) => (m.id === id ? { ...m, ...values } : m)));

  return (
    <div className="space-y-4">
      {modes.map((mode, idx) => (
        <div
          key={mode.id}
          className="space-y-3 rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4"
        >
          <div className="flex items-center justify-between border-b border-[#19315d]/40 pb-2">
            <span className="text-sm font-medium text-slate-400">
              Mode {idx + 1}
              {idx === 0 && (
                <span className="ml-2 rounded-full border border-blue-600/25 bg-blue-600/15 px-2 py-0.5 text-[10px] text-blue-400">
                  Opens first
                </span>
              )}
            </span>
            <button
              type="button"
              className={removeBtn}
              onClick={() => setModes(modes.filter((m) => m.id !== mode.id))}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div>
              <label className="text-xs text-slate-500">Mode</label>
              <select
                className={`mt-1.5 ${sel}`}
                value={mode.mode}
                onChange={(e) =>
                  patch(mode.id, { mode: e.target.value as TransportModeName })
                }
              >
                {TRANSPORT_MODES.map((name) => (
                  <option key={name} value={name} className="bg-[#0b1730]">
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-slate-500">Nearest terminal</label>
              <input
                className={`mt-1.5 ${inp}`}
                placeholder="e.g. Srinagar International Airport (SXR)"
                value={mode.nearestTerminal}
                onChange={(e) => patch(mode.id, { nearestTerminal: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-500">
              Road distance from that terminal (km)
            </label>
            <input
              type="number"
              min={0}
              className={`mt-1.5 ${inp}`}
              placeholder="50"
              value={Number.isFinite(mode.distance) ? String(mode.distance) : ''}
              onChange={(e) =>
                patch(mode.id, { distance: Number(e.target.value) || 0 })
              }
            />
          </div>

          <div>
            <label className="text-xs text-slate-500">On arrival</label>
            <textarea
              className={`mt-1.5 ${ta}`}
              placeholder="Onward transport from the terminal, and anything seasonal about it."
              value={mode.description}
              onChange={(e) => patch(mode.id, { description: e.target.value })}
            />
          </div>

          {/* ── hub connections ── */}
          <div className="rounded-xl border border-[#19315d]/40 bg-[#0b1730]/40 p-3">
            <p className="text-xs font-medium text-slate-400">
              Common routes — where people travel from
            </p>
            <p className={hint}>
              Duration is this leg alone, not door to door.
            </p>

            <div className="mt-3 space-y-3">
              {mode.commonRoutes.map((route) => (
                <div key={route.id} className="flex items-start gap-2">
                  <input
                    className={`${inp} min-w-0 flex-1`}
                    placeholder="Origin — Delhi"
                    value={route.origin}
                    onChange={(e) =>
                      patch(mode.id, {
                        commonRoutes: mode.commonRoutes.map((r) =>
                          r.id === route.id ? { ...r, origin: e.target.value } : r,
                        ),
                      })
                    }
                  />
                  <input
                    className={`${inp} min-w-0 flex-1`}
                    placeholder="Duration — ~1 h 30 m"
                    value={route.duration}
                    onChange={(e) =>
                      patch(mode.id, {
                        commonRoutes: mode.commonRoutes.map((r) =>
                          r.id === route.id ? { ...r, duration: e.target.value } : r,
                        ),
                      })
                    }
                  />
                  <input
                    className={`${inp} min-w-0 flex-[2]`}
                    placeholder="What runs on this route, in one line"
                    value={route.details}
                    onChange={(e) =>
                      patch(mode.id, {
                        commonRoutes: mode.commonRoutes.map((r) =>
                          r.id === route.id ? { ...r, details: e.target.value } : r,
                        ),
                      })
                    }
                  />
                  <button
                    type="button"
                    className={removeBtn}
                    onClick={() =>
                      patch(mode.id, {
                        commonRoutes: mode.commonRoutes.filter(
                          (r) => r.id !== route.id,
                        ),
                      })
                    }
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className={addBtn}
                onClick={() =>
                  patch(mode.id, {
                    commonRoutes: [
                      ...mode.commonRoutes,
                      { id: uid(), origin: '', duration: '', details: '' },
                    ],
                  })
                }
              >
                <Plus className="h-4 w-4" /> Add Route
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className={addBtn}
        onClick={() =>
          setModes([
            ...modes,
            {
              id: uid(),
              mode: 'Air',
              nearestTerminal: '',
              distance: 0,
              description: '',
              commonRoutes: [],
            },
          ])
        }
      >
        <Plus className="h-4 w-4" /> Add Transport Mode
      </button>
    </div>
  );
}
