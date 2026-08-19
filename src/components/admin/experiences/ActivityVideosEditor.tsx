'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { ActivityVideo } from '@/types/experienceActivityTypes';

const uid = () => crypto.randomUUID();

const inp =
  'w-full bg-[#07111f] border border-[#19315d]/60 rounded-xl px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all';
const addBtn =
  'flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 px-4 py-2.5 rounded-xl border border-dashed border-blue-600/30 hover:border-blue-500/50 hover:bg-blue-600/5 w-full justify-center transition-all';
const removeBtn =
  'p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0';

/**
 * Videos behind the hero's "Watch Videos" control.
 *
 * The button is hidden entirely when this list is empty, and a row with no URL
 * is dropped on save — so an empty row can never produce a button that goes
 * nowhere. Paste the EMBED form of the URL (youtube.com/embed/…), not the
 * watch page.
 */
export default function ActivityVideosEditor({
  videos,
  setVideos,
}: {
  videos: ActivityVideo[];
  setVideos: (videos: ActivityVideo[]) => void;
}) {
  const patch = (id: string, field: keyof ActivityVideo, value: string) =>
    setVideos(videos.map((v) => (v.id === id ? { ...v, [field]: value } : v)));

  return (
    <div className="space-y-4">
      {videos.map((video, idx) => (
        <div
          key={video.id}
          className="space-y-3 rounded-xl border border-[#19315d]/40 bg-[#07111f]/60 p-4"
        >
          <div className="flex items-center justify-between border-b border-[#19315d]/40 pb-2">
            <span className="text-sm font-medium text-slate-400">
              Video {idx + 1}
            </span>
            <button
              type="button"
              className={removeBtn}
              onClick={() => setVideos(videos.filter((v) => v.id !== video.id))}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <input
            className={inp}
            placeholder="Embed URL — e.g. https://www.youtube.com/embed/xxxxxxxxxxx"
            value={video.url}
            onChange={(e) => patch(video.id, 'url', e.target.value)}
          />
          <input
            className={inp}
            placeholder="Title — what the video actually shows"
            value={video.title}
            onChange={(e) => patch(video.id, 'title', e.target.value)}
          />
          <input
            className={inp}
            placeholder="Poster image URL (optional — falls back to the cover photo)"
            value={video.thumbnail ?? ''}
            onChange={(e) => patch(video.id, 'thumbnail', e.target.value)}
          />
        </div>
      ))}

      <button
        type="button"
        className={addBtn}
        onClick={() =>
          setVideos([...videos, { id: uid(), url: '', title: '', thumbnail: '' }])
        }
      >
        <Plus className="h-4 w-4" /> Add Video
      </button>
    </div>
  );
}
