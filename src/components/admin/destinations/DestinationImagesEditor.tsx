'use client';

import { Plus, Trash2 } from 'lucide-react';
import CMSMediaSection from '@/components/admin/cms/CMSMediaSection';
import type { IDestinationImage } from '@/types/destinationTypes';

const uid = () => crypto.randomUUID();

const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

/**
 * Every {image, alt} list on a destination — the hero carousel, the photo
 * strip, and the photos on a self-contained "thing to do" card.
 *
 * Order is what the page shows: the hero starts on the first slide, and the
 * strip scrolls in this order. The alt field is not optional dressing — the
 * hero photo is the only description of that image on the page, and the strip
 * describes the first pass of each photo.
 */
export default function DestinationImagesEditor({
  images,
  setImages,
  addLabel = 'Add Image',
  leadLabel,
  altHint,
  editorType = 'destination',
}: {
  images: IDestinationImage[];
  setImages: (images: IDestinationImage[]) => void;
  addLabel?: string;
  /** Badge on the first row, e.g. "First slide". Omit for unordered lists. */
  leadLabel?: string;
  altHint?: string;
  /** Upload folder suffix — the activity editor reuses this list. */
  editorType?: string;
}) {
  return (
    <div className="mt-1 space-y-4">
      {images.map((img, idx) => (
        <div
          key={img.id}
          className="space-y-4 rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4"
        >
          <div className="flex items-center justify-between border-b border-[#19315d]/40 pb-2">
            <span className="text-sm font-medium text-slate-400">
              Image {idx + 1}
              {idx === 0 && leadLabel && (
                <span className="ml-2 rounded-full border border-blue-600/25 bg-blue-600/15 px-2 py-0.5 text-[10px] text-blue-400">
                  {leadLabel}
                </span>
              )}
            </span>
            <button
              type="button"
              className={removeBtn}
              onClick={() => setImages(images.filter((i) => i.id !== img.id))}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <CMSMediaSection
            image={img.image}
            alt={img.alt}
            editorType={editorType}
            onChange={(field, value) =>
              setImages(
                images.map((i) => (i.id === img.id ? { ...i, [field]: value } : i)),
              )
            }
          />
        </div>
      ))}

      {altHint && images.length > 0 && (
        <p className="text-xs text-slate-600">{altHint}</p>
      )}

      <button
        type="button"
        className={addBtn}
        onClick={() => setImages([...images, { id: uid(), image: '', alt: '' }])}
      >
        <Plus className="h-4 w-4" /> {addLabel}
      </button>
    </div>
  );
}
