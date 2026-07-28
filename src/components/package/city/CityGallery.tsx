"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";

interface CityGalleryProps {
  images: string[];
  cityName?: string;
}

/**
 * Infinite horizontally-scrolling image marquee — click any frame to open it
 * full-size in a lightbox with prev/next navigation. Renders nothing when
 * there are no images.
 */
export default function CityGallery({ images, cityName = "Kashmir" }: CityGalleryProps) {
  const gallery = images.filter(Boolean);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length));

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, gallery.length]);

  if (gallery.length === 0) return null;

  // Duplicated so the marquee can loop seamlessly at -50% translation.
  const track = [...gallery, ...gallery];

  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-10">
      <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2.5 mb-3 sm:justify-start">
          <div className="h-px w-8 bg-sky-500" />
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-sky-500">
            Photo Gallery
          </span>
        </div>
        <h2
          className="text-center font-heading font-bold leading-tight text-slate-900 sm:text-left"
          style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.4rem)" }}
        >
          Kashmir Through{" "}
          <span
            style={{
              background: "linear-gradient(120deg, #0284C7 0%, #0EA5E9 45%, #38BDF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Lens
          </span>
        </h2>
      </div>

      {/* Marquee track */}
      <div className="city-gallery-viewport">
        <div className="city-gallery-track">
          {track.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setLightboxIndex(i % gallery.length)}
              className="group relative h-44 w-64 shrink-0 cursor-pointer overflow-hidden rounded-2xl sm:h-56 sm:w-80"
              style={{ boxShadow: "0 8px 24px -8px rgba(14,165,233,0.18)" }}
            >
              <Image
                src={src}
                alt={`${cityName} — Kashmir gallery photo ${(i % gallery.length) + 1}`}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/25 group-hover:opacity-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900">
                  <Images className="h-4 w-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); showPrev(); }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); showNext(); }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[80vh] w-[92vw] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[lightboxIndex]}
                alt={`${cityName} — Kashmir gallery photo ${lightboxIndex + 1}`}
                fill
                unoptimized
                className="object-contain"
                priority
              />
            </motion.div>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              {lightboxIndex + 1} / {gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .city-gallery-viewport {
          width: 100%;
          overflow: hidden;
        }
        .city-gallery-track {
          display: flex;
          width: max-content;
          gap: 1.25rem;
          padding: 0 1.25rem;
          animation: city-gallery-scroll 40s linear infinite;
        }
        .city-gallery-track:hover {
          animation-play-state: paused;
        }
        @keyframes city-gallery-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
