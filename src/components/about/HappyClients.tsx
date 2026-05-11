"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Star,
  X,
} from "lucide-react";

const CLIENT_MEMORIES = [
  {
    src: "https://images.unsplash.com/photo-1593417376544-4c4201061e22?w=1400&auto=format&fit=crop&q=80",
    alt: "Travelers enjoying a scenic Kashmir valley stop",
    caption: "Golden-hour valley halt with our guests in Srinagar.",
  },
  {
    src: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1400&auto=format&fit=crop&q=80",
    alt: "Guests on a peaceful Kashmir lakeside experience",
    caption: "Quiet houseboat moments and lake reflections in Kashmir.",
  },
  {
    src: "https://images.unsplash.com/photo-1677123419103-785c917c4a58?w=1400&auto=format&fit=crop&q=80",
    alt: "Visitors taking in mountain views during their Kashmir tour",
    caption: "Snowy mountain memories captured during a day excursion.",
  },
  {
    src: "https://images.unsplash.com/photo-1561287437-c69a30664793?w=1400&auto=format&fit=crop&q=80",
    alt: "Client group enjoying a Kashmir countryside journey",
    caption: "Curated countryside stops with space to slow down and enjoy.",
  },
] as const;

export default function HappyClients() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const total = CLIENT_MEMORIES.length;

  const goNext = () => setActiveIndex((current) => (current + 1) % total);
  const goPrev = () =>
    setActiveIndex((current) => (current - 1 + total) % total);

  const openFullscreen = (index: number) => setFullscreenIndex(index);
  const closeFullscreen = () => setFullscreenIndex(null);

  useEffect(() => {
    if (fullscreenIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeFullscreen();
      }
      if (event.key === "ArrowRight") {
        setFullscreenIndex((current) =>
          current === null ? 0 : (current + 1) % total
        );
      }
      if (event.key === "ArrowLeft") {
        setFullscreenIndex((current) =>
          current === null ? 0 : (current - 1 + total) % total
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [fullscreenIndex, total]);

  const handleTouchStart = (clientX: number) => {
    setTouchStartX(clientX);
  };

  const handleTouchEnd = (clientX: number, onNext: () => void, onPrev: () => void) => {
    if (touchStartX === null) return;

    const delta = clientX - touchStartX;
    if (Math.abs(delta) > 50) {
      if (delta < 0) onNext();
      else onPrev();
    }

    setTouchStartX(null);
  };

  const activeImage = CLIENT_MEMORIES[activeIndex];
  const fullscreenImage =
    fullscreenIndex === null ? null : CLIENT_MEMORIES[fullscreenIndex];

  return (
    <>
      <section className="bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-sky-500" />
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sky-500">
                Happy Clients
              </span>
              <div className="h-px w-10 bg-sky-500" />
            </div>

            <h2 className="font-heading text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Real moments from our travelers in Kashmir
            </h2>

            <p className="mt-5 text-sm font-light leading-7 text-slate-500 sm:text-base sm:leading-8">
              A glimpse into the smiles, stillness, and mountain memories our
              guests take home after exploring Kashmir with us.
            </p>
          </div>

          <div className="mt-12 rounded-[2rem] border border-sky-100 bg-gradient-to-br from-white via-sky-50/60 to-cyan-50/70 md:p-4 shadow-[0_18px_50px_rgba(14,165,233,0.08)] sm:p-6 lg:p-8">
            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
              <div className="min-w-0">
                <div
                  className="group relative overflow-hidden rounded-[1.75rem] bg-slate-200"
                  onTouchStart={(event) =>
                    handleTouchStart(event.changedTouches[0].clientX)
                  }
                  onTouchEnd={(event) =>
                    handleTouchEnd(
                      event.changedTouches[0].clientX,
                      goNext,
                      goPrev
                    )
                  }
                >
                  <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[5/4]">
                    <Image
                      src={activeImage.src}
                      alt={activeImage.alt}
                      fill
                      unoptimized
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/14 to-transparent" />

                  <button
                    type="button"
                    onClick={() => openFullscreen(activeIndex)}
                    className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-2 text-xs font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/18"
                  >
                    <Expand className="h-4 w-4" />
                    Fullscreen
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                      <Star className="h-3.5 w-3.5 fill-cyan-300 text-cyan-300" />
                      Guest Story {activeIndex + 1}
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/88 sm:text-base">
                      {activeImage.caption}
                    </p>
                  </div>

                  <div className="absolute left-4 top-1/2 right-4 flex -translate-y-1/2 items-center justify-between">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/18"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/18"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1">
                {CLIENT_MEMORIES.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group overflow-hidden rounded-[1.4rem] border text-left transition-all duration-300 ${
                      index === activeIndex
                        ? "border-sky-300 bg-white shadow-[0_16px_36px_rgba(14,165,233,0.14)]"
                        : "border-sky-100 bg-white/80 hover:border-sky-200 hover:bg-white"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-col lg:flex-row">
                      <div className="relative aspect-[4/3] w-full overflow-hidden lg:w-40 lg:shrink-0">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                          sizes="(max-width: 1024px) 50vw, 220px"
                        />
                      </div>
                      <div className="p-3.5 sm:p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-500">
                          Memory {index + 1}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center sm:mt-10">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-white/40 bg-sky-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_14px_34px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-600 sm:px-8 sm:text-[0.95rem]"
              >
                Creat Your Memory
              </button>
            </div>
          </div>
        </div>
      </section>

      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/94 backdrop-blur-sm"
          onClick={closeFullscreen}
        >
          <div
            className="relative flex h-full w-full items-center justify-center p-3 sm:p-6"
            onTouchStart={(event) =>
              handleTouchStart(event.changedTouches[0].clientX)
            }
            onTouchEnd={(event) =>
              handleTouchEnd(
                event.changedTouches[0].clientX,
                () =>
                  setFullscreenIndex((current) =>
                    current === null ? 0 : (current + 1) % total
                  ),
                () =>
                  setFullscreenIndex((current) =>
                    current === null ? 0 : (current - 1 + total) % total
                  )
              )
            }
          >
            <button
              type="button"
              onClick={closeFullscreen}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/16 sm:right-6 sm:top-6"
              aria-label="Close fullscreen gallery"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setFullscreenIndex((current) =>
                  current === null ? 0 : (current - 1 + total) % total
                );
              }}
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/16 sm:left-6 sm:h-12 sm:w-12"
              aria-label="Previous fullscreen image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setFullscreenIndex((current) =>
                  current === null ? 0 : (current + 1) % total
                );
              }}
              className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/16 sm:right-6 sm:h-12 sm:w-12"
              aria-label="Next fullscreen image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              className="relative h-full w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={fullscreenImage.src}
                alt={fullscreenImage.alt}
                fill
                unoptimized
                className="object-contain"
                sizes="100vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/82 to-transparent px-5 pb-6 pt-16 text-center sm:px-8">
                <p className="text-sm font-medium text-white sm:text-base">
                  {fullscreenImage.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
