'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { ActivityStep } from '@/types/experienceActivityTypes';

const uid = () => crypto.randomUUID();

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const ta = `${inp} resize-y min-h-20`;
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

/**
 * The "what to expect" walk-through — one row per beat of the activity, in the
 * order it happens.
 *
 * Order is the content here: the public section numbers these as steps, so
 * "boarding" before "the ride" before "getting back" is what makes it a
 * walk-through rather than a feature list.
 */
export default function ActivityStepsEditor({
  steps,
  setSteps,
}: {
  steps: ActivityStep[];
  setSteps: (steps: ActivityStep[]) => void;
}) {
  const patch = (id: string, field: keyof ActivityStep, value: string) =>
    setSteps(steps.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  return (
    <div className="space-y-4">
      {steps.map((step, idx) => (
        <div
          key={step.id}
          className="space-y-3 rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4"
        >
          <div className="flex items-center justify-between border-b border-[#19315d]/40 pb-2">
            <span className="text-sm font-medium text-slate-400">
              Step {idx + 1}
            </span>
            <button
              type="button"
              className={removeBtn}
              onClick={() => setSteps(steps.filter((s) => s.id !== step.id))}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <input
            className={inp}
            placeholder="Step title — e.g. Boarding at the ghat"
            value={step.title}
            onChange={(e) => patch(step.id, 'title', e.target.value)}
          />

          <textarea
            className={ta}
            placeholder="What actually happens in this part — 1–2 sentences, concrete."
            value={step.body}
            onChange={(e) => patch(step.id, 'body', e.target.value)}
          />
        </div>
      ))}

      <button
        type="button"
        className={addBtn}
        onClick={() => setSteps([...steps, { id: uid(), title: '', body: '' }])}
      >
        <Plus className="h-4 w-4" /> Add Step
      </button>
    </div>
  );
}
