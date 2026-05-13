'use client';

import { useState, useRef } from 'react';
import { ImageIcon, UploadCloud, X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface CMSMediaSectionProps {
  image: string;
  alt: string;
  editorType?: string;
  onChange: (field: 'image' | 'alt', value: string) => void;
}

const inp = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-[#07111f] text-white
  placeholder-slate-600
  border border-[#19315d]/60
  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50
  transition text-sm
`;

export default function CMSMediaSection({
  image,
  alt,
  editorType = 'ekashmir-blog',
  onChange,
}: CMSMediaSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; msg: string } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const flash = (type: 'error' | 'success', msg: string) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback(null), 4000);
  };

  const upload = async (file: File) => {
    if (file.type !== 'image/webp') {
      flash('error', 'Only .webp images are allowed');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      flash('error', 'Image must be under 2 MB');
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const body = new FormData();
      body.append('file', file);
      body.append('folder', `ekashmir-${editorType.toLowerCase()}`);

      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const data = await res.json();

      if (!data.success) {
        flash('error', data.error ?? 'Upload failed');
        return;
      }

      onChange('image', data.url);
      flash('success', 'Image uploaded successfully');
    } catch {
      flash('error', 'Upload failed — please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    // Reset so same file can be re-selected
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  return (
    <div className="space-y-5">
      {/* Drop zone / preview */}
      <div>
        <label className="text-sm text-slate-400">Featured Image</label>

        <div
          className={`relative mt-2 rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
            ${dragOver ? 'border-blue-500/60 bg-blue-500/5' : 'border-[#19315d]/60 hover:border-blue-500/40 hover:bg-blue-500/5'}
          `}
          onClick={() => !loading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#07111f]/70 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
            </div>
          )}

          {image ? (
            <div className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={alt || 'Preview'}
                className="w-full h-56 object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#07111f]/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2 text-white">
                <UploadCloud className="w-7 h-7 text-blue-400" />
                <p className="text-sm font-medium">Click to replace</p>
                <p className="text-xs text-slate-400">WebP only · max 2 MB</p>
              </div>
              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onChange('image', ''); }}
                className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-[#07111f]/80 border border-[#19315d]/60
                  flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/40 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center gap-3 text-slate-600 select-none">
              <div className="w-14 h-14 rounded-2xl bg-[#0b1730] border border-[#19315d]/50 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-slate-600" />
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">
                  <span className="text-blue-400 font-medium">Click to upload</span>{' '}
                  or drag & drop
                </p>
                <p className="text-xs mt-1">WebP only · max 2 MB</p>
              </div>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/webp"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        {/* Inline feedback */}
        {feedback && (
          <div
            className={`mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border ${
              feedback.type === 'success'
                ? 'bg-emerald-900/30 border-emerald-500/20 text-emerald-300'
                : 'bg-red-900/30 border-red-500/20 text-red-300'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            )}
            {feedback.msg}
          </div>
        )}
      </div>

      {/* Alt text */}
      <div>
        <label className="text-sm text-slate-400">Alt Text</label>
        <input
          value={alt}
          placeholder="Descriptive alt text for SEO &amp; accessibility"
          className={inp}
          onChange={(e) => onChange('alt', e.target.value)}
        />
      </div>
    </div>
  );
}
