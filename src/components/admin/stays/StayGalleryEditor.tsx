'use client';

import { Plus, Trash2 } from 'lucide-react';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';
import type { IStayGalleryImage } from '@/types/stayTypes';

const uid = () => crypto.randomUUID();

const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

/**
 * Gallery images for a stay. Order here is the order shown in the card
 * carousel and on the detail page, so the first image is the lead photo.
 */
export default function StayGalleryEditor({
  gallery,
  setGallery,
}: {
  gallery: IStayGalleryImage[];
  setGallery: (gallery: IStayGalleryImage[]) => void;
}) {
  return (
    <div className="space-y-4 mt-1">
      {gallery.map((img, idx) => (
        <div
          key={img.id}
          className="rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#19315d]/40 pb-2">
            <span className="text-sm font-medium text-slate-400">
              Image {idx + 1}
              {idx === 0 && (
                <span className="ml-2 rounded-full border border-blue-600/25 bg-blue-600/15 px-2 py-0.5 text-[10px] text-blue-400">
                  Lead photo
                </span>
              )}
            </span>
            <button
              type="button"
              className={removeBtn}
              onClick={() => setGallery(gallery.filter((i) => i.id !== img.id))}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <CMSMediaSection
            image={img.image}
            alt={img.alt}
            editorType="stay"
            onChange={(field, value) =>
              setGallery(
                gallery.map((i) => (i.id === img.id ? { ...i, [field]: value } : i)),
              )
            }
          />
        </div>
      ))}

      <button
        type="button"
        className={addBtn}
        onClick={() => setGallery([...gallery, { id: uid(), image: '', alt: '' }])}
      >
        <Plus className="h-4 w-4" /> Add Gallery Image
      </button>
    </div>
  );
}
