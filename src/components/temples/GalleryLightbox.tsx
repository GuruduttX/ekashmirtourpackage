"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxImage {
  id: string;
  src: string;
  alt: string;
  /** Optional label shown under the opened image. */
  caption?: string;
}

/**
 * Full-screen image viewer: the opened photo in the large area, every image as a
 * thumbnail strip below, and prev/next controls. Shared by the temples hub
 * gallery and the per-temple gallery on the detail page.
 */
export default function GalleryLightbox({
  images,
  index,
  onClose,
  onIndexChange,
  label = "Photo gallery",
}: {
  images: LightboxImage[];
  /** `null` closes the lightbox. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  label?: string;
}) {
  const total = images.length;

  const showPrev = useCallback(() => {
    if (index === null || total === 0) return;
    onIndexChange((index - 1 + total) % total);
  }, [index, total, onIndexChange]);

  const showNext = useCallback(() => {
    if (index === null || total === 0) return;
    onIndexChange((index + 1) % total);
  }, [index, total, onIndexChange]);

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index, onClose, showPrev, showNext]);

  const active = index === null ? null : images[index];

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-4 bg-black/90 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Opened image */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[58vh] w-full max-w-4xl sm:h-[64vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              unoptimized
              priority
              className="object-contain"
            />
          </motion.div>

          <p
            className="font-heading text-lg font-bold text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {active.caption}
            <span className={active.caption ? "ml-3 text-sm font-medium text-white/60" : "text-sm font-medium text-white/60"}>
              {index! + 1} / {total}
            </span>
          </p>

          {/* All images — thumbnail strip */}
          <div
            className="no-scrollbar flex w-full max-w-4xl gap-2.5 overflow-x-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((image, i) => (
              <button
                key={image.id}
                type="button"
                onClick={() => onIndexChange(i)}
                aria-label={`View ${image.caption ?? image.alt}`}
                aria-current={i === index}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition ${
                  i === index ? "ring-2 ring-sky-400" : "opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={image.src} alt={image.alt} fill unoptimized className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
