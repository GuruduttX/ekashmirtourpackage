'use client';

import { useRef, useState } from 'react';
import { ImageIcon, UploadCloud, X, AlertCircle, Loader2 } from 'lucide-react';

interface GalleryHandlerProps {
  images: string[];
  setImages: (images: string[]) => void;
  editorType?: string;
}

export default function GalleryHandler({
  images,
  setImages,
  editorType = 'gallery',
}: GalleryHandlerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const flashError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 4000);
  };

  const uploadOne = async (file: File): Promise<string | null> => {
    if (file.type !== 'image/webp') {
      flashError('Only .webp images are allowed');
      return null;
    }
    if (file.size > 2 * 1024 * 1024) {
      flashError('Each image must be under 2 MB');
      return null;
    }

    const body = new FormData();
    body.append('file', file);
    body.append('folder', `ekashmir-${editorType.toLowerCase()}`);

    const res = await fetch('/api/admin/upload', { method: 'POST', body });
    const data = await res.json();
    if (!data.success) {
      flashError(data.error ?? 'Upload failed');
      return null;
    }
    return data.url as string;
  };

  const uploadFiles = async (files: FileList | File[]) => {
    const list = Array.from(files);
    if (list.length === 0) return;

    setUploading(list.length);
    try {
      const uploaded: string[] = [];
      for (const file of list) {
        const url = await uploadOne(file);
        if (url) uploaded.push(url);
      }
      if (uploaded.length) setImages([...images, ...uploaded]);
    } finally {
      setUploading(0);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) uploadFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
  };

  const remove = (url: string) => setImages(images.filter((i) => i !== url));

  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img) => (
            <div
              key={img}
              className="relative group rounded-xl overflow-hidden border border-[#19315d]/60 bg-[#07111f]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="w-full h-28 object-cover" />
              <button
                type="button"
                onClick={() => remove(img)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-lg bg-[#07111f]/80 border border-[#19315d]/60
                  flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/40 transition
                  opacity-0 group-hover:opacity-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        className={`relative rounded-xl border-2 border-dashed transition-all cursor-pointer
          ${dragOver ? 'border-blue-500/60 bg-blue-500/5' : 'border-[#19315d]/60 hover:border-blue-500/40 hover:bg-blue-500/5'}
        `}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="py-8 flex flex-col items-center gap-2 text-slate-600 select-none">
          {uploading > 0 ? (
            <>
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
              <p className="text-sm text-slate-400">Uploading {uploading} image{uploading > 1 ? 's' : ''}...</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-[#0b1730] border border-[#19315d]/50 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-slate-600" />
              </div>
              <p className="text-sm text-slate-400 flex items-center gap-1.5">
                <UploadCloud className="w-4 h-4" />
                <span className="text-blue-400 font-medium">Click to upload</span> or drag & drop
              </p>
              <p className="text-xs">WebP only · max 2 MB each · multiple allowed</p>
            </>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/webp"
          multiple
          className="hidden"
          onChange={handleFileInput}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border bg-red-900/30 border-red-500/20 text-red-300">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}
