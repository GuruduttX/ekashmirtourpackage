"use client";

import { useRef } from "react";
import { Sparkles, ChevronRight } from "lucide-react";

interface HighlightItem {
  id?: string;
  description: string;
}

interface Props {
  PackageData?: { highlights: HighlightItem[] };
}

const defaultPackageData: { highlights: HighlightItem[] } = {
  highlights: [
    {
      description:
        "Sunrise shikara ride on the glassy waters of Dal Lake with views of the surrounding mountains.",
    },
    {
      description:
        "Gondola ride at Gulmarg — one of Asia's highest cable cars with sweeping Himalayan panoramas.",
    },
    {
      description:
        "Stroll through the royal Mughal Gardens — Nishat Bagh, Shalimar Bagh, and Chashme Shahi.",
    },
    {
      description:
        "Explore the lush meadows of Pahalgam and the scenic Betab Valley on a guided walk.",
    },
    {
      description:
        "Enjoy an authentic Wazwan dinner — a traditional Kashmiri multi-course feast.",
    },
    {
      description:
        "Stay aboard a heritage houseboat on Dal Lake for a truly one-of-a-kind overnight experience.",
    },
  ],
};

const ITEMS_PER_SLIDE = 5;

/* ── Shared pill ──────────────────────────────────────────── */
function HighlightPill({ description }: { description: string }) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-linear-to-r from-sky-500 to-sky-400 px-5 py-3.5 text-white shadow-md ring-2 ring-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-sky-600">
      <Sparkles className="h-5 w-5 shrink-0" />
      <p className="text-sm font-medium leading-snug sm:text-base">{description}</p>
    </div>
  );
}

export default function PackageHighlights({
  PackageData = defaultPackageData,
}: Props) {
  const highlights = PackageData.highlights ?? [];
  if (highlights.length === 0) return null;

  const scrollRef = useRef<HTMLDivElement>(null);

  // Chunk into slides of five for the mobile carousel.
  const slides: HighlightItem[][] = [];
  for (let i = 0; i < highlights.length; i += ITEMS_PER_SLIDE) {
    slides.push(highlights.slice(i, i + ITEMS_PER_SLIDE));
  }
  const isScrollable = slides.length > 1;

  // Advance to the next slide, looping back to the first at the end.
  const goNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const stride = el.scrollWidth / slides.length;
    const current = Math.round(el.scrollLeft / stride);
    const next = (current + 1) % slides.length;
    el.scrollTo({ left: stride * next, behavior: "smooth" });
  };

  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
          Trip Highlights
        </h2>

        {/* Right arrow — advances the slides (mobile only) */}
        {isScrollable && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next highlights"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sky-600 shadow-md ring-1 ring-sky-200 transition-all hover:bg-sky-50 hover:ring-sky-300 active:scale-95 sm:hidden"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* ── Desktop / tablet: two-column grid ── */}
      <div className="mt-6 hidden gap-4 sm:grid sm:grid-cols-2">
        {highlights.map((item, index) => (
          <HighlightPill key={item.id ?? index} description={item.description} />
        ))}
      </div>

      {/* ── Mobile: horizontal slides of five, centered snap-scrolling ── */}
      <div className="mt-6 sm:hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              className="flex w-full shrink-0 snap-center flex-col gap-4"
            >
              {slide.map((item, index) => (
                <HighlightPill
                  key={item.id ?? `${slideIndex}-${index}`}
                  description={item.description}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
