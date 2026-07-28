'use client';

import { Plus, Trash2 } from 'lucide-react';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';

export interface Testimonial {
  id: string;
  name: string;
  description: string;
  rating: string;
  location: string;
  avatar: string;
  avatarAlt: string;
  photo: string;
  photoAlt: string;
}

interface TestimonialsHandlerProps {
  testimonials: Testimonial[];
  setTestimonials: (testimonials: Testimonial[]) => void;
  /** Folder namespace for uploads (e.g. "Package", "CityHub") */
  editorType?: string;
}

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const ta = `${inp} resize-y min-h-20`;
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

const uid = () => crypto.randomUUID();

export default function TestimonialsHandler({
  testimonials,
  setTestimonials,
  editorType = 'Package',
}: TestimonialsHandlerProps) {
  const update = (id: string, patch: Partial<Testimonial>) =>
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const remove = (id: string) =>
    setTestimonials(testimonials.filter((t) => t.id !== id));

  const add = () =>
    setTestimonials([
      ...testimonials,
      {
        id: uid(), name: '', description: '', rating: '',
        location: '', avatar: '', avatarAlt: '', photo: '', photoAlt: '',
      },
    ]);

  return (
    <div className="space-y-3">
      {testimonials.length === 0 && (
        <p className="text-sm text-slate-600 text-center py-6 rounded-xl border border-dashed border-[#19315d]/40">
          No reviews yet — add your first one below
        </p>
      )}

      {testimonials.map((t) => (
        <div
          key={t.id}
          className="rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Review</span>
            <button type="button" className={removeBtn} onClick={() => remove(t.id)}>
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              className={inp}
              placeholder="Name"
              value={t.name}
              onChange={(e) => update(t.id, { name: e.target.value })}
            />
            <input
              className={inp}
              placeholder="Rating (e.g. 5)"
              value={t.rating}
              onChange={(e) => update(t.id, { rating: e.target.value })}
            />
          </div>

          <input
            className={inp}
            placeholder="Location (e.g. Pahalgam Valley)"
            value={t.location}
            onChange={(e) => update(t.id, { location: e.target.value })}
          />

          <textarea
            className={ta}
            placeholder="Review text"
            value={t.description}
            onChange={(e) => update(t.id, { description: e.target.value })}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs text-slate-500">Reviewer Photo</p>
              <CMSMediaSection
                image={t.avatar}
                alt={t.avatarAlt}
                editorType={editorType}
                onChange={(field, value) =>
                  update(t.id, field === 'image' ? { avatar: value } : { avatarAlt: value })
                }
              />
            </div>
            <div>
              <p className="mb-1 text-xs text-slate-500">Location Photo (shown on hover)</p>
              <CMSMediaSection
                image={t.photo}
                alt={t.photoAlt}
                editorType={editorType}
                onChange={(field, value) =>
                  update(t.id, field === 'image' ? { photo: value } : { photoAlt: value })
                }
              />
            </div>
          </div>
        </div>
      ))}

      <button type="button" className={addBtn} onClick={add}>
        <Plus className="w-4 h-4" /> Add Review
      </button>
    </div>
  );
}
