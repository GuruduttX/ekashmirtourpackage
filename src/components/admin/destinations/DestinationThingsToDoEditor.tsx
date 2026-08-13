'use client';

import { Plus, Trash2 } from 'lucide-react';
import DestinationImagesEditor from '@/components/admin/destinations/DestinationImagesEditor';
import {
  THING_TO_DO_TYPES,
  type IThingToDo,
  type ThingToDoType,
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

/** What each type asks the editor for. */
const TYPE_HELP: Record<ThingToDoType, string> = {
  temple:
    'Links to /temples/[slug]. The temple record supplies the photo and the description — only the heading is written here.',
  stay: 'Links to /stays/[slug]. The stay record supplies the photo, summary and price.',
  activity:
    'No activities collection exists yet, so write this one out in full like “Other”. It renders without a link.',
  other:
    'Self-contained — a viewpoint, a market street, a specific trek. Renders without a link.',
};

/** Types that link out to another record, and so want a slug and nothing else. */
const LINKED: ThingToDoType[] = ['temple', 'stay'];

/**
 * "Things to do" rows.
 *
 * The form changes with the type on purpose: a linked row asks only for a
 * heading and a slug, because filling in a description and a photo there would
 * be writing a copy of the temple or stay record that then drifts from it. An
 * unlinked row asks for everything, since nothing else holds it.
 */
export default function DestinationThingsToDoEditor({
  items,
  setItems,
}: {
  items: IThingToDo[];
  setItems: (items: IThingToDo[]) => void;
}) {
  const patch = (id: string, patchValues: Partial<IThingToDo>) =>
    setItems(items.map((i) => (i.id === id ? { ...i, ...patchValues } : i)));

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isLinked = LINKED.includes(item.type);

        return (
          <div
            key={item.id}
            className="space-y-3 rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4"
          >
            <div className="flex items-center justify-between border-b border-[#19315d]/40 pb-2">
              <span className="text-sm font-medium text-slate-400">
                Thing to do {idx + 1}
              </span>
              <button
                type="button"
                className={removeBtn}
                onClick={() => setItems(items.filter((i) => i.id !== item.id))}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs text-slate-500">Type</label>
                <select
                  className={`mt-1.5 ${sel}`}
                  value={item.type}
                  onChange={(e) =>
                    patch(item.id, { type: e.target.value as ThingToDoType })
                  }
                >
                  {THING_TO_DO_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-[#0b1730]">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500">Card heading</label>
                <input
                  className={`mt-1.5 ${inp}`}
                  placeholder="e.g. Stay on a Dal Lake houseboat"
                  value={item.heading}
                  onChange={(e) => patch(item.id, { heading: e.target.value })}
                />
              </div>
            </div>

            <p className={hint}>{TYPE_HELP[item.type]}</p>

            {isLinked ? (
              <div>
                <label className="text-xs text-slate-500">
                  {item.type === 'temple' ? 'Temple slug' : 'Stay slug'}
                </label>
                <input
                  className={`mt-1.5 ${inp}`}
                  placeholder={
                    item.type === 'temple'
                      ? 'kheer-bhawani'
                      : 'dal-lake-deluxe-houseboat'
                  }
                  value={item.slug ?? ''}
                  onChange={(e) => patch(item.id, { slug: e.target.value.trim() })}
                />
                <p className={hint}>
                  Must match a published record exactly. A slug that no longer
                  resolves drops the card rather than shipping a dead link.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label className="text-xs text-slate-500">Description</label>
                  <textarea
                    className={`mt-1.5 ${ta}`}
                    placeholder="One or two sentences — what it is and why it is worth the time."
                    value={item.description ?? ''}
                    onChange={(e) => patch(item.id, { description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-500">
                    Photo — only the first is shown on the card
                  </label>
                  <DestinationImagesEditor
                    images={item.images ?? []}
                    setImages={(images) => patch(item.id, { images })}
                    addLabel="Add Photo"
                  />
                </div>
              </>
            )}
          </div>
        );
      })}

      <button
        type="button"
        className={addBtn}
        onClick={() =>
          setItems([
            ...items,
            {
              id: uid(),
              type: 'other',
              heading: '',
              slug: '',
              description: '',
              images: [],
            },
          ])
        }
      >
        <Plus className="h-4 w-4" /> Add Thing To Do
      </button>
    </div>
  );
}
