"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TestimonialCard, Testimonial } from "@/components/package/PackageTestimonial";
import usePagination from "@/hooks/usePagination";
import PaginationControls from "@/components/ui/PaginationControls";

interface ReviewItem {
  _id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  title?: string;
  content: string;
  createdAt?: string;
  images?: Array<{ id?: string; url?: string; alt?: string }>;
}

function toTestimonial(review: ReviewItem): Testimonial {
  return {
    id: review._id,
    name: review.authorName,
    avatar: review.authorAvatar || undefined,
    rating: review.rating,
    description: review.title ? `${review.title} — ${review.content}` : review.content,
    // Optional: absent for text-only reviews, which render the taller variant.
    photo: review.images?.find((image) => image?.url)?.url,
  };
}

export default function ReviewArchive() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Page size matches the layout: a short swipe rail on mobile, two clean rows
  // of three from `sm` up, where the fixed-width cards fit three per row.
  const { page, pageCount, visible, goToPage, containerRef } = usePagination({
    items: reviews,
    mobilePageSize: 3,
    widePageSize: 6,
    resetKey: reviews.length,
  });

  useEffect(() => {
    const loadArchive = async () => {
      try {
        const res = await fetch("/api/reviews?all=true");
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Failed to load archive");
        setReviews(json.data ?? []);
      } catch (err: any) {
        setError(err.message || "Could not load review archive.");
      } finally {
        setLoading(false);
      }
    };

    loadArchive();
  }, []);

  if (loading) {
    return (
      <div className="flex animate-pulse items-center justify-center py-10 font-medium text-slate-500">
        Loading the archive...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 py-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-sky-100 bg-sky-50 py-10 text-center text-slate-600">
        No past reviews found in the archive.
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Soft ambient glow behind the cards */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.12, 0.24, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-150 w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300 blur-[150px]"
      />

      {/* Cards keep their own fixed width from TestimonialCard: a horizontal
          snap row on mobile, wrapping into rows from sm up. */}
      <div
        ref={containerRef}
        className="no-scrollbar relative z-10 -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
      >
        {visible.map((review) => (
          <TestimonialCard key={review._id} t={toTestimonial(review)} />
        ))}
      </div>

      <div className="relative z-20">
        <PaginationControls
          page={page}
          pageCount={pageCount}
          onChange={goToPage}
          label="Review pages"
        />
      </div>
    </div>
  );
}
