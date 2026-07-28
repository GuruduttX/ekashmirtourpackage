"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";

interface Testimonial {
  id?: string | number;
  name?: string;
  location?: string;
  rating?: number | string;
  description?: string;
  avatar?: string;
  photo?: string;
}

const FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=900&auto=format&fit=crop&q=80";

const defaultPackageData = {
  testimonials: [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Dal Lake, Srinagar",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=47",
      photo:
        "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&auto=format&fit=crop&q=80",
      description:
        "Absolutely magical experience! The houseboat stay on Dal Lake was a dream. Every detail was perfectly arranged — from the shikara ride to the Wazwan dinner.",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      location: "Gulmarg",
      rating: 4.5,
      avatar: "https://i.pravatar.cc/150?img=12",
      photo:
        "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=900&auto=format&fit=crop&q=80",
      description:
        "Gulmarg was breathtaking. The Gondola ride gave us views we'll never forget. The team was responsive and made sure everything ran smoothly.",
    },
    {
      id: 3,
      name: "Ananya Iyer",
      location: "Pahalgam Valley",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=32",
      photo:
        "https://images.unsplash.com/photo-1561287437-c69a30664793?w=900&auto=format&fit=crop&q=80",
      description:
        "Kashmir surpassed all our expectations. Pahalgam's meadows, the Mughal Gardens, the food — it was a flawless 7-day trip. Highly recommend this package!",
    },
    {
      id: 4,
      name: "Sneha Kulkarni",
      location: "Sonamarg",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=51",
      photo: FALLBACK_PHOTO,
      description:
        "The houseboat experience alone is worth the trip. Our guide was knowledgeable and friendly. We came back already planning our next Kashmir visit!",
    },
  ],
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

const CARD_PADDING = 20; // px — matches p-5
const PHOTO_COLLAPSED_HEIGHT = 96;
const PHOTO_EXPANDED_HEIGHT = 300;
const READ_MORE_THRESHOLD = 140;

function TestimonialCard({ t }: { t: Testimonial }) {
  const [hovered, setHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const rating = Number(t.rating || 0);
  const avatar = t.avatar || `https://i.pravatar.cc/150?u=${encodeURIComponent(t.name || "guest")}`;
  const photo = t.photo || FALLBACK_PHOTO;
  const description = t.description || "Amazing experience.";
  const isLong = description.length > READ_MORE_THRESHOLD;

  return (
    <div className="relative flex h-96 w-75 shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-[#F7F7F4] p-5 sm:w-85">
      {/* Header — avatar + name, blurs but stays visible on hover */}
      <motion.div
        animate={{
          opacity: hovered ? 0.35 : 1,
          filter: hovered ? "blur(3px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex shrink-0 items-center gap-3"
      >
        <img
          src={avatar}
          alt={t.name || "Guest"}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
        <h3 className="text-lg font-bold text-slate-900">{t.name || "Guest"}</h3>
      </motion.div>

      {/* Quote + rating — fade away on hover; scrolls internally if expanded */}
      <AnimatePresence>
        {!hovered && (
          <motion.div
            key="quote"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 mt-4 flex min-h-0 flex-1 flex-col"
            style={{ paddingBottom: PHOTO_COLLAPSED_HEIGHT + 16 }}
          >
            <div
              className={`min-h-0 flex-1 ${
                expanded ? "testimonial-scroll overflow-y-auto pr-1" : "overflow-hidden"
              }`}
            >
              <p className="flex gap-1.5 text-[15px] leading-relaxed text-slate-700">
                <Quote className="h-4 w-4 shrink-0 -scale-x-100 text-sky-400" />
                <span className={expanded ? "" : "line-clamp-3"}>{description}</span>
              </p>
            </div>

            {isLong && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded((v) => !v);
                }}
                className="mt-1 self-start shrink-0 text-xs font-semibold text-sky-500 hover:text-sky-600"
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            )}

            <div className="mt-2 flex shrink-0 items-center gap-2">
              <StarRating rating={rating} />
              <span className="text-sm text-slate-500">({rating.toFixed(1)}/5)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo — pinned to the bottom with fixed left/right/bottom padding; only
          its height animates, so it grows straight up in place with no zoom/bleed.
          Hover/tap is scoped to the photo itself so it doesn't block Read More. */}
      <motion.div
        onMouseEnter={() => isDesktop && setHovered(true)}
        onMouseLeave={() => isDesktop && setHovered(false)}
        onClick={() => !isDesktop && setHovered((v) => !v)}
        initial={false}
        animate={{
          height: hovered ? PHOTO_EXPANDED_HEIGHT : PHOTO_COLLAPSED_HEIGHT,
        }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ left: CARD_PADDING, right: CARD_PADDING, bottom: CARD_PADDING }}
        className="absolute z-20 cursor-pointer overflow-hidden rounded-2xl"
      >
        <img
          src={photo}
          alt={t.location || t.name || ""}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, delay: hovered ? 0.35 : 0 }}
          className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/20 to-transparent p-4 text-white"
        >
          <p className="font-bold">{t.name}</p>
          {t.location && (
            <p className="mt-1 flex items-center gap-1 text-sm text-white/90">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {t.location}
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function PackageTestimonials({
  PackageData = defaultPackageData,
}: {
  PackageData?: { testimonials: Testimonial[] };
}) {
  const testimonials: Testimonial[] = PackageData?.testimonials || [];
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <h2 className="mb-8 font-heading text-2xl font-extrabold leading-tight bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent sm:text-3xl">
        What our travellers say
      </h2>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2">
        {testimonials.map((t, index) => (
          <TestimonialCard key={t.id ?? index} t={t} />
        ))}
      </div>

      <style jsx global>{`
        .testimonial-scroll {
          scrollbar-width: thin;
          scrollbar-color: #38bdf8 transparent;
        }
        .testimonial-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .testimonial-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .testimonial-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #38bdf8, #0ea5e9);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}
