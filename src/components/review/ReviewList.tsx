"use client";

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface ReviewItem {
  _id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  title?: string;
  content: string;
  packageId?: string;
  status?: string;
  createdAt?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star 
          key={index} 
          // Changed empty stars to a light slate color
          className={index < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} 
        />
      ))}
    </div>
  );
}

export default function ReviewList() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/reviews?all=true');
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || 'Failed to load reviews');
        setReviews(json.data ?? []);
      } catch (err: any) {
        setError(err.message || 'Could not load reviews.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Updated text colors for states
  if (loading) return <div className="text-slate-600 font-medium">Loading reviews...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  
  // Updated empty state background to sky-50
  if (reviews.length === 0) return (
    <div className="rounded-3xl border border-slate-200 bg-sky-50 p-8 text-slate-600 text-center shadow-sm">
      No approved reviews are available yet.
    </div>
  );

  return (
    <div className="grid gap-6">
      {reviews.map((review) => (
        <article 
          key={review._id} 
          // Replaced dark classes with white bg, light border, and soft shadow
          className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-sky-50 border border-sky-100">
                {review.authorAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={review.authorAvatar} alt={review.authorName} className="h-full w-full object-cover" />
                ) : (
                  // Nice sky blue placeholder with the author's first initial
                  <div className="flex h-full w-full items-center justify-center bg-sky-100 text-sky-600 text-xl font-bold uppercase">
                    {review.authorName ? review.authorName.charAt(0) : '?'}
                  </div>
                )}
              </div>
              <div>
                {/* Changed to text-slate-900 */}
                <p className="text-lg font-bold text-slate-900">{review.authorName}</p>
                <p className="text-slate-500 text-sm">
                  {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <StarRating rating={review.rating} />
              {/* Updated badge to match the white/blue theme */}
              <span className="rounded-lg bg-sky-50 border border-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-600 shadow-sm">
                Approved
              </span>
            </div>
          </div>
          <div className="mt-6">
            {/* Changed to text-slate-900 */}
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {review.title || 'Customer review'}
            </h2>
            {/* Changed to text-slate-600 and made font-light to match earlier cards */}
            <p className="mt-3 text-slate-600 leading-relaxed font-light">
              {review.content}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}   