'use client';

import { Dispatch, SetStateAction } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { IStayPlaceLink, StayPlaceLinkType } from '@/types/stayPlaceTypes';

const uid = () => crypto.randomUUID();

/**
 * Slug is stored WITHOUT the section prefix — the public renderer builds the
 * href from type + slug. These previews show the editor exactly what URL each
 * row will produce.
 */
const LINK_TYPES: Array<{ value: StayPlaceLinkType; label: string; prefix: string }> = [
  { value: 'cab', label: 'Cab route', prefix: '/cab-service/' },
  { value: 'package', label: 'Package', prefix: '/kashmir-tour-packages/' },
  { value: 'destination', label: 'Destination', prefix: '/destinations/' },
  { value: 'temple', label: 'Temple', prefix: '/temples/' },
  { value: 'experience', label: 'Experience', prefix: '/experiences/' },
  { value: 'activity', label: 'Activity', prefix: '/experiences/' },
  { value: 'blog', label: 'Blog post', prefix: '/blog/' },
  { value: 'stayType', label: 'Stay type', prefix: '/stays/' },
];

const prefixFor = (type: StayPlaceLinkType) =>
  LINK_TYPES.find((t) => t.value === type)?.prefix ?? '/';

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const sel = `${inp} cursor-pointer appearance-none`;
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';
const label = 'text-xs text-slate-500';

export default function StayPlaceLinksEditor({
  links,
  setLinks,
}: {
  links: IStayPlaceLink[];
  setLinks: Dispatch<SetStateAction<IStayPlaceLink[]>>;
}) {
  const patch = (id: string, field: keyof IStayPlaceLink, value: string) =>
    setLinks((p) => p.map((l) => (l.id === id ? { ...l, [field]: value } : l)));

  return (
    <div className="space-y-4">
      {links.map((link, idx) => (
        <div
          key={link.id}
          className="rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4 space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#19315d]/40">
            <span className="text-sm text-slate-400 font-medium">Link {idx + 1}</span>
            <button
              type="button"
              className={removeBtn}
              onClick={() => setLinks((p) => p.filter((l) => l.id !== link.id))}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className={label}>Type</label>
              <select
                className={`mt-1.5 ${sel}`}
                value={link.type}
                onChange={(e) => patch(link.id, 'type', e.target.value)}
              >
                {LINK_TYPES.map((t) => (
                  <option key={t.value} value={t.value} className="bg-[#0b1730]">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={label}>
                Anchor text — vary it, never &quot;click here&quot;
              </label>
              <input
                className={`mt-1.5 ${inp}`}
                placeholder="e.g. Srinagar to Gulmarg taxi fare"
                value={link.label}
                onChange={(e) => patch(link.id, 'label', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={label}>Slug (no leading slash)</label>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="shrink-0 text-xs text-slate-600 font-mono">
                {prefixFor(link.type)}
              </span>
              <input
                className={`${inp} min-w-0`}
                placeholder="srinagar-to-gulmarg"
                value={link.slug}
                onChange={(e) => patch(link.id, 'slug', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={label}>Description (optional)</label>
            <input
              className={`mt-1.5 ${inp}`}
              placeholder="One line shown under the anchor on card-style link blocks"
              value={link.description}
              onChange={(e) => patch(link.id, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        className={addBtn}
        onClick={() =>
          setLinks((p) => [
            ...p,
            { id: uid(), type: 'cab', label: '', slug: '', description: '' },
          ])
        }
      >
        <Plus className="h-4 w-4" /> Add Internal Link
      </button>
    </div>
  );
}
