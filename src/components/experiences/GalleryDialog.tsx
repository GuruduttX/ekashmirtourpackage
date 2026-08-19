"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryAlt, type GalleryImage } from "@/data/experienceGallery";

/**
 * Full-view gallery lightbox.
 *
 * Built on the native <dialog> element rather than a hand-rolled overlay. That
 * is not a stylistic preference — `showModal()` gives focus trapping, focus
 * restore to the trigger on close, Escape-to-close, and inert background
 * content, all correct, from the platform. Reimplementing those in React is
 * where accessible modals usually go wrong.
 *
 * What still has to be done by hand:
 *   • arrow-key paging (the platform has no opinion on gallery semantics)
 *   • background scroll lock — `showModal` makes the page inert but does not
 *     reliably stop it scrolling behind the dialog
 *   • the backdrop click-to-close, since a click on ::backdrop lands on the
 *     dialog element itself
 */
export default function GalleryDialog({
  images,
  index,
  open,
  onClose,
  onIndexChange,
}: {
  images: GalleryImage[];
  /** Index of the visible slide. Owned by the parent so the strip can set it. */
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const paginate = useCallback(
    (step: number) => {
      onIndexChange((index + step + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  // Drive the real dialog from the `open` prop. showModal() throws if called on
  // an already-open dialog, hence the guards.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Escape and the backdrop's own close both fire the dialog's `close` event
  // rather than our handler, so state is synced from the element outward.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  // Background scroll lock.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const image = images[index];
  if (!image) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Travellers gallery"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          paginate(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          paginate(-1);
        }
      }}
      // A click landing on the dialog element itself is a click on the padding
      // around the figure — i.e. the backdrop as far as the reader is concerned.
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="m-auto max-h-dvh w-full max-w-5xl bg-transparent p-4 backdrop:bg-slate-950/85 backdrop:backdrop-blur-sm"
    >
      <div className="relative w-full">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute -top-1 right-0 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-5 w-5" />
        </button>

        <figure className="mt-12">
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-slate-900">
            <Image
              src={image.url}
              alt={galleryAlt(image)}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              // contain, not cover: a lightbox exists to show the whole frame.
              className="object-contain"
              priority
            />
          </div>

          <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-white">
            <span>{image.caption}</span>
            <span className="shrink-0 text-white/60">
              {index + 1} / {images.length}
            </span>
          </figcaption>
        </figure>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-2 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-2 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Thumbnails — the fastest way to a specific photo, and the only cue
            that says how much more there is. */}
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
          {images.map((thumb, thumbIndex) => (
            <button
              key={thumb.id}
              type="button"
              onClick={() => onIndexChange(thumbIndex)}
              aria-label={`Show photo ${thumbIndex + 1}: ${thumb.caption}`}
              aria-current={thumbIndex === index}
              className={`relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg transition ${
                thumbIndex === index
                  ? "ring-2 ring-sky-400"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={thumb.url}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
}
