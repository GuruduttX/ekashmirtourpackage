'use client';

import { Plus, Trash2 } from 'lucide-react';
import {
  ACTIVITY_BOOKING_REQUIREMENTS,
  WEEKDAYS,
  type ActivityBookingRequirement,
  type ActivitySchedule,
  type ActivitySlot,
  type ActivityTiming,
  type WeekdayId,
} from '@/types/experienceActivityTypes';

const uid = () => crypto.randomUUID();

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const sel = `${inp} cursor-pointer appearance-none`;
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';
const label = 'text-sm text-slate-400';
const hint = 'mt-1.5 text-xs text-slate-600';

const BOOKING_LABEL: Record<ActivityBookingRequirement, string> = {
  required: 'Booking required — turn up without one and you may not get on',
  recommended: 'Booking recommended — fine off-season, book in peak',
  'walk-in': 'Walk-in — no booking needed',
};

/** A row of day toggles. Used for the weekly off and both per-schedule lists. */
function DayChips({
  selected,
  onToggle,
  tone,
}: {
  selected: WeekdayId[];
  onToggle: (day: WeekdayId) => void;
  tone: 'open' | 'closed';
}) {
  const on =
    tone === 'open'
      ? 'border-emerald-600/30 bg-emerald-600/15 text-emerald-300'
      : 'border-rose-600/30 bg-rose-600/15 text-rose-300';

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {WEEKDAYS.map((day) => (
        <button
          key={day.id}
          type="button"
          onClick={() => onToggle(day.id)}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
            selected.includes(day.id)
              ? on
              : 'border-[#19315d]/60 bg-[#07111f] text-slate-500 hover:border-[#244278] hover:text-slate-300'
          }`}
        >
          {day.short}
        </button>
      ))}
    </div>
  );
}

/**
 * Everything about when an activity runs.
 *
 * This section is the one that decides whether a reader turns up to a closed
 * gate, which is why it is structured rather than a paragraph:
 *
 *   • SCHEDULES are seasonal. Kashmir's winter hours are not its summer hours,
 *     and one opens/closes pair would be wrong for half the year. An activity
 *     that never varies simply gets one schedule with no season name.
 *   • LAST ENTRY is the number that actually turns people away — fill it
 *     whenever boarding stops before closing.
 *   • WEEKLY OFF is year-round; a schedule's own closed days are for a closure
 *     that applies to that season alone. Repeating the year-round one inside
 *     every schedule is how the two drift apart.
 *   • VERIFIED gates both the visible caveat and the OpeningHoursSpecification
 *     structured data. Leave it off until someone has checked on the ground:
 *     publishing no hours is better than publishing wrong ones.
 *
 * A schedule with no time slots is dropped on save, and the whole section
 * disappears from the public page when no schedule survives.
 */
export default function ActivityTimingEditor({
  timing,
  setTiming,
}: {
  timing: ActivityTiming;
  setTiming: (timing: ActivityTiming) => void;
}) {
  const patch = (values: Partial<ActivityTiming>) =>
    setTiming({ ...timing, ...values });

  const schedules = timing.schedules ?? [];
  const weeklyOff = timing.weeklyOff ?? [];
  const closedDates = timing.closedDates ?? [];

  const patchSchedule = (id: string, values: Partial<ActivitySchedule>) =>
    patch({
      schedules: schedules.map((s) => (s.id === id ? { ...s, ...values } : s)),
    });

  const patchSlot = (
    scheduleId: string,
    slotId: string,
    values: Partial<ActivitySlot>,
  ) => {
    const schedule = schedules.find((s) => s.id === scheduleId);
    if (!schedule) return;
    patchSchedule(scheduleId, {
      slots: schedule.slots.map((slot) =>
        slot.id === slotId ? { ...slot, ...values } : slot,
      ),
    });
  };

  const toggleDay = (
    scheduleId: string,
    field: 'days' | 'closedDays',
    day: WeekdayId,
  ) => {
    const schedule = schedules.find((s) => s.id === scheduleId);
    if (!schedule) return;
    const current = schedule[field] ?? [];
    patchSchedule(scheduleId, {
      [field]: current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day],
    });
  };

  return (
    <div className="space-y-6">
      {/* ── Booking ── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={label}>How much notice</label>
          <select
            className={`mt-2 ${sel}`}
            value={timing.booking ?? ''}
            onChange={(e) =>
              patch({
                booking:
                  (e.target.value as ActivityBookingRequirement) || undefined,
              })
            }
          >
            <option value="" className="bg-[#0b1730]">
              Not stated
            </option>
            {ACTIVITY_BOOKING_REQUIREMENTS.map((requirement) => (
              <option
                key={requirement}
                value={requirement}
                className="bg-[#0b1730]"
              >
                {BOOKING_LABEL[requirement]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label}>Lead time</label>
          <input
            className={`mt-2 ${inp}`}
            placeholder="e.g. A day ahead in Dec–Feb"
            value={timing.bookingLeadTime ?? ''}
            onChange={(e) => patch({ bookingLeadTime: e.target.value })}
          />
        </div>
      </div>

      {/* ── Weather ── */}
      <div className="rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-300">
          <input
            type="checkbox"
            className="h-4 w-4 accent-blue-500"
            checked={timing.weatherDependent ?? false}
            onChange={(e) => patch({ weatherDependent: e.target.checked })}
          />
          A session can be called off on the day
        </label>

        {timing.weatherDependent && (
          <div className="mt-3">
            <input
              className={inp}
              placeholder="What actually stops it — e.g. wind or poor visibility"
              value={timing.weatherNote ?? ''}
              onChange={(e) => patch({ weatherNote: e.target.value })}
            />
            <p className={hint}>
              Name the real condition. “Bad weather” tells a reader nothing they
              can plan around.
            </p>
          </div>
        )}
      </div>

      {/* ── Weekly off ── */}
      <div>
        <label className={label}>Weekly off — days it never runs, in any season</label>
        <DayChips
          selected={weeklyOff}
          tone="closed"
          onToggle={(day) =>
            patch({
              weeklyOff: weeklyOff.includes(day)
                ? weeklyOff.filter((d) => d !== day)
                : [...weeklyOff, day],
            })
          }
        />
        <p className={hint}>
          Leave all off when there is no weekly closure — the page shows this row
          only when something is selected. A closure that applies to one season
          only belongs on that schedule instead.
        </p>
      </div>

      {/* ── Schedules ── */}
      <div>
        <label className={label}>
          Operating hours{schedules.length > 1 ? ', by season' : ''}
        </label>
        <p className={hint}>
          One schedule is enough when the hours never change — leave its season
          name empty. Add a second only when the hours genuinely differ.
        </p>

        <div className="mt-3 space-y-4">
          {schedules.map((schedule, idx) => (
            <div
              key={schedule.id}
              className="space-y-4 rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4"
            >
              <div className="flex items-center justify-between border-b border-[#19315d]/40 pb-2">
                <span className="text-sm font-medium text-slate-400">
                  Schedule {idx + 1}
                </span>
                <button
                  type="button"
                  className={removeBtn}
                  onClick={() =>
                    patch({
                      schedules: schedules.filter((s) => s.id !== schedule.id),
                    })
                  }
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <input
                className={inp}
                placeholder="Season — e.g. Summer (Apr–Oct). Leave empty if it runs the same year round."
                value={schedule.season ?? ''}
                onChange={(e) =>
                  patchSchedule(schedule.id, { season: e.target.value })
                }
              />

              {/* Slots */}
              <div className="space-y-3">
                {schedule.slots.map((slot, slotIdx) => (
                  <div
                    key={slot.id}
                    className="space-y-2 rounded-lg border border-[#19315d]/30 bg-[#0b1730]/60 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Time window {slotIdx + 1}
                      </span>
                      <button
                        type="button"
                        className={removeBtn}
                        onClick={() =>
                          patchSchedule(schedule.id, {
                            slots: schedule.slots.filter((s) => s.id !== slot.id),
                          })
                        }
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <input
                      className={inp}
                      placeholder="Window name (only if there is more than one) — e.g. Phase 1"
                      value={slot.label ?? ''}
                      onChange={(e) =>
                        patchSlot(schedule.id, slot.id, { label: e.target.value })
                      }
                    />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div>
                        <span className="text-xs text-slate-500">Opens</span>
                        <input
                          type="time"
                          className={`mt-1 ${inp}`}
                          value={slot.opens}
                          onChange={(e) =>
                            patchSlot(schedule.id, slot.id, {
                              opens: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">Closes</span>
                        <input
                          type="time"
                          className={`mt-1 ${inp}`}
                          value={slot.closes}
                          onChange={(e) =>
                            patchSlot(schedule.id, slot.id, {
                              closes: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">Last entry</span>
                        <input
                          type="time"
                          className={`mt-1 ${inp}`}
                          value={slot.lastEntry ?? ''}
                          onChange={(e) =>
                            patchSlot(schedule.id, slot.id, {
                              lastEntry: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <p className="text-xs text-slate-600">
                      Fill last entry whenever boarding stops before closing —
                      it is the number that decides whether someone arriving at
                      ten to five gets on.
                    </p>
                  </div>
                ))}

                <button
                  type="button"
                  className={addBtn}
                  onClick={() =>
                    patchSchedule(schedule.id, {
                      slots: [
                        ...schedule.slots,
                        {
                          id: uid(),
                          label: '',
                          opens: '',
                          closes: '',
                          lastEntry: '',
                        },
                      ],
                    })
                  }
                >
                  <Plus className="h-4 w-4" /> Add Time Window
                </button>
              </div>

              <div>
                <span className="text-xs text-slate-500">
                  Runs on these days only — leave all off for every day
                </span>
                <DayChips
                  selected={schedule.days ?? []}
                  tone="open"
                  onToggle={(day) => toggleDay(schedule.id, 'days', day)}
                />
              </div>

              <div>
                <span className="text-xs text-slate-500">
                  Closed in this season only — e.g. a maintenance day
                </span>
                <DayChips
                  selected={schedule.closedDays ?? []}
                  tone="closed"
                  onToggle={(day) => toggleDay(schedule.id, 'closedDays', day)}
                />
              </div>

              <input
                className={inp}
                placeholder="Qualifier shown under the times — e.g. Boats run on demand, not to a timetable"
                value={schedule.note ?? ''}
                onChange={(e) =>
                  patchSchedule(schedule.id, { note: e.target.value })
                }
              />
            </div>
          ))}

          <button
            type="button"
            className={addBtn}
            onClick={() =>
              patch({
                schedules: [
                  ...schedules,
                  {
                    id: uid(),
                    season: '',
                    days: [],
                    closedDays: [],
                    note: '',
                    slots: [
                      { id: uid(), label: '', opens: '', closes: '', lastEntry: '' },
                    ],
                  },
                ],
              })
            }
          >
            <Plus className="h-4 w-4" /> Add Schedule
          </button>
        </div>
      </div>

      {/* ── Dated closures ── */}
      <div>
        <label className={label}>Dated closures</label>
        <p className={hint}>
          Specific dates it is shut, beyond the weekly pattern. Rows without a
          date are dropped on save.
        </p>

        <div className="mt-3 space-y-3">
          {closedDates.map((closure) => (
            <div key={closure.id} className="flex items-center gap-3">
              <input
                type="date"
                className={`${inp} min-w-0 flex-1`}
                value={closure.date}
                onChange={(e) =>
                  patch({
                    closedDates: closedDates.map((c) =>
                      c.id === closure.id ? { ...c, date: e.target.value } : c,
                    ),
                  })
                }
              />
              <input
                className={`${inp} min-w-0 flex-1`}
                placeholder="Reason — e.g. Annual maintenance"
                value={closure.reason ?? ''}
                onChange={(e) =>
                  patch({
                    closedDates: closedDates.map((c) =>
                      c.id === closure.id ? { ...c, reason: e.target.value } : c,
                    ),
                  })
                }
              />
              <button
                type="button"
                className={removeBtn}
                onClick={() =>
                  patch({
                    closedDates: closedDates.filter((c) => c.id !== closure.id),
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
              patch({
                closedDates: [
                  ...closedDates,
                  { id: uid(), date: '', reason: '' },
                ],
              })
            }
          >
            <Plus className="h-4 w-4" /> Add Closure
          </button>
        </div>
      </div>

      {/* ── Verification ── */}
      <div className="rounded-xl border border-amber-600/25 bg-amber-600/5 p-4">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-300">
          <input
            type="checkbox"
            className="h-4 w-4 accent-amber-500"
            checked={timing.verified ?? false}
            onChange={(e) => patch({ verified: e.target.checked })}
          />
          These hours have been checked on the ground
        </label>
        <p className={hint}>
          Only tick this when someone has actually confirmed them. It swaps the
          “confirm before you travel” caveat for a verified date AND publishes
          the hours as structured data — hours that turn out to be wrong send
          someone to a closed gate, which is worse than publishing none.
        </p>

        {timing.verified && (
          <div className="mt-3">
            <span className="text-xs text-slate-500">Checked on</span>
            <input
              type="date"
              className={`mt-1 ${inp}`}
              value={timing.verifiedOn ?? ''}
              onChange={(e) => patch({ verifiedOn: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
