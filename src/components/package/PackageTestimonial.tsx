"use client";

import { useRef } from "react";
import { Star, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id?: string | number;
  name?: string;
  location?: string;
  rating?: number | string;
  description?: string;
}

const defaultPackageData = {
  testimonials: [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Delhi, India",
      rating: 5,
      description:
        "Absolutely magical experience! The houseboat stay on Dal Lake was a dream. Every detail was perfectly arranged — from the shikara ride to the Wazwan dinner.",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      location: "Mumbai, India",
      rating: 4.5,
      description:
        "Gulmarg was breathtaking. The Gondola ride gave us views we'll never forget. The team was responsive and made sure everything ran smoothly.",
    },
    {
      id: 3,
      name: "Ananya Iyer",
      location: "Bengaluru, India",
      rating: 5,
      description:
        "Kashmir surpassed all our expectations. Pahalgam's meadows, the Mughal Gardens, the food — it was a flawless 7-day trip. Highly recommend this package!",
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Jaipur, India",
      rating: 4,
      description:
        "Great itinerary and comfortable stays throughout. Sonamarg was the highlight for us. Would have loved slightly more free time in Srinagar.",
    },
    {
      id: 5,
      name: "Sneha Kulkarni",
      location: "Pune, India",
      rating: 5,
      description:
        "The houseboat experience alone is worth the trip. Our guide was knowledgeable and friendly. We came back already planning our next Kashmir visit!",
    },
  ],
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        let fill = Math.min(Math.max(rating - i, 0), 1);
        if (fill < 0.3 && fill !== 0) fill = 0.4;
        const percent = fill * 100;
        return (
          <div key={i} className="relative h-5 w-5">
            <Star className="absolute text-gray-300 h-5 w-5" />
            <div
              className="absolute overflow-hidden"
              style={{ width: `${percent}%` }}
            >
              <Star className="text-sky-500 fill-sky-500 h-5 w-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PackageTestimonials({
  PackageData = defaultPackageData,
}: {
  PackageData?: any;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const testimonials: Testimonial[] = PackageData?.testimonials || [];

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.offsetWidth * 0.8;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const avgRating =
    testimonials.length > 0
      ? (
          testimonials.reduce(
            (sum: number, t: Testimonial) => sum + Number(t.rating || 0),
            0,
          ) / testimonials.length
        ).toFixed(1)
      : "0.0";

  function ratingPercentage(star: number) {
    const total = testimonials.length;
    if (total === 0) return 0;
    const count = testimonials.filter(
      (item: Testimonial) => Math.floor(Number(item.rating)) === star,
    ).length;
    return Math.round((count / total) * 100);
  }

  return (
    <section className="py-8 bg-gradient-to-br from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {/* LEFT PANEL */}
        <div className="rounded-3xl bg-gradient-to-br from-white to-sky-50 p-7 shadow-xl border border-sky-100">
          <p className="text-sm font-semibold text-sky-600 tracking-wide">
            Guest Reviews
          </p>

          {/* AVG RATING */}
          <div className="flex items-center gap-4 mt-3">
            <h3 className="text-5xl font-bold text-gray-900">{avgRating}</h3>
            <div className="flex flex-col">
              <StarRating rating={Number(avgRating)} />
              <p className="text-xs text-gray-500 mt-1">
                Based on {testimonials.length}+ reviews
              </p>
            </div>
          </div>

          {/* RATING BARS */}
          <div className="mt-6 space-y-3">
            {[5, 4, 3, 2, 1].map((star) => {
              const percent = ratingPercentage(star);
              return (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <span className="w-5 font-medium text-gray-700">{star}</span>
                  <div className="h-2 flex-1 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-cyan-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-gray-600">
                    {percent}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT – TESTIMONIAL CAROUSEL */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6">
            Real feedback from guests
          </h2>

          <div className="relative">
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
              {testimonials.map((t: Testimonial, index: number) => {
                const rating = Number(t.rating || 0);
                return (
                  <div
                    key={t.id || index}
                    className="snap-start shrink-0 w-[92%] sm:w-[75%] md:w-[60%] lg:w-[420px] rounded-3xl bg-white border border-sky-100 shadow-xl p-7"
                  >
                    {/* HEADER */}
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-white flex items-center justify-center font-semibold text-lg">
                          {t.name?.charAt(0) || "G"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {t.name || "Guest"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {t.location || "India"}
                          </p>
                        </div>
                      </div>
                      <BadgeCheck className="text-sky-500 h-5 w-5" />
                    </div>

                    {/* RATING */}
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-xl font-bold">
                        {rating.toFixed(1)}
                      </span>
                      <StarRating rating={rating} />
                    </div>

                    {/* REVIEW */}
                    <p className="mt-4 text-sm text-gray-700">
                      "{t.description || "Amazing experience."}"
                    </p>
                  </div>
                );
              })}
            </div>

            {/* ARROWS */}
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow border border-sky-100 items-center justify-center text-sky-500 hover:bg-sky-50 transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow border border-sky-100 items-center justify-center text-sky-500 hover:bg-sky-50 transition"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
