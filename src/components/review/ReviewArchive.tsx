  "use client";

  import { useEffect, useState, useRef } from 'react';
  import { Star, CalendarDays, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
  import { motion, Variants } from 'framer-motion';

  interface ReviewItem {
    _id: string;
    authorName: string;
    authorAvatar?: string;
    rating: number;
    title?: string;
    content: string;
    createdAt?: string;
  }

  function StarRating({ rating }: { rating: number }) {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star 
            key={index} 
            className={`w-3.5 h-3.5 ${index < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
          />
        ))}
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 40, scale: 0.95 },
    show: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      transition: { type: "spring", stiffness: 150, damping: 25 } 
    }
  };

  export default function ReviewArchive() {
    const [reviews, setReviews] = useState<ReviewItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
      const loadArchive = async () => {
        try {
          const res = await fetch('/api/reviews?all=true'); 
          const json = await res.json();
          if (!res.ok) throw new Error(json.message || 'Failed to load archive');
          setReviews(json.data ?? []);
        } catch (err: any) {
          setError(err.message || 'Could not load review archive.');
        } finally {
          setLoading(false);
        }
      };

      loadArchive();
    }, []);

    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
      }
    };

    const scroll = (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
        const scrollAmount = window.innerWidth * 0.85; 
        scrollContainerRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    };

    useEffect(() => {
      if (!loading && reviews.length > 0) {
        handleScroll();
      }
    }, [loading, reviews]);

    if (loading) {
      return (
        <div className="flex justify-center items-center py-20 text-slate-500 font-medium animate-pulse">
          Loading the archive...
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-20 text-red-500 bg-red-50 rounded-2xl border border-red-100">
          {error}
        </div>
      );
    }

    if (reviews.length === 0) {
      return (
        <div className="text-center py-20 bg-sky-50 border border-sky-100 rounded-2xl text-slate-600">
          No past reviews found in the archive.
        </div>
      );
    }

    return (
      <div className="w-full relative group">
        
        {/* Continuous Background Pulse */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[600px] bg-sky-300 rounded-full blur-[150px] pointer-events-none z-0"
        />

        {/* Grid / Carousel Container */}
        <motion.div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="
            flex sm:grid flex-nowrap sm:flex-wrap 
            overflow-x-auto sm:overflow-visible 
            snap-x snap-mandatory sm:snap-none 
            sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
            gap-5 relative z-10 
            pb-4 sm:pb-0 
            -mx-4 px-4 sm:mx-0 sm:px-0
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          "
        >
          {reviews.map((review, index) => (
            <motion.article 
              key={review._id} 
              variants={cardVariants}
              className="
                w-[85vw] sm:w-auto shrink-0 snap-center sm:snap-align-none
                group rounded-2xl border border-slate-100 bg-white 
                hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:border-sky-200 
                transition-all duration-300 cursor-pointer relative overflow-hidden
              "
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15 
                }}
                className="flex flex-col h-full p-5"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 sm:opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-16 h-16 text-amber-400 fill-amber-400" />
            </motion.div>
            </div>

                  <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-sky-50 border border-sky-100 group-hover:ring-2 group-hover:ring-sky-100 transition-all duration-300">
                    {review.authorAvatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={review.authorAvatar} alt={review.authorName} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-sky-100 text-sky-600 text-sm font-bold uppercase">
                        {review.authorName ? review.authorName.charAt(0) : '?'}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm leading-tight group-hover:text-sky-600 transition-colors">
                      {review.authorName}
                    </p>
                    <div className="mt-0.5">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                </div>

                <div className="flex-grow relative z-10">
                  {review.title && (
                    <h3 className="font-semibold text-slate-800 text-sm mb-1.5 line-clamp-1 group-hover:text-sky-700 transition-colors">
                      {review.title}
                    </h3>
                  )}
                  <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-4">
                    "{review.content}"
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-50 text-slate-400 text-xs font-medium relative z-10">
                  <CalendarDays className="w-3.5 h-3.5 group-hover:text-sky-400 transition-colors" />
                  <span className="group-hover:text-slate-500 transition-colors">
                    {review.createdAt 
                      ? new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
                      : 'Verified Guest'}
                  </span>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        {/* --- REPOSITIONED MOBILE NAVIGATION BUTTONS --- */}
        {/* Placed below the cards to prevent content overlap */}
        <div className="flex sm:hidden items-center justify-center gap-4 pt-4 relative z-20">
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-sky-500 transition-all duration-300 active:scale-95 disabled:opacity-30 disabled:pointer-events-none`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-sky-500 transition-all duration-300 active:scale-95 disabled:opacity-30 disabled:pointer-events-none`}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

      </div>
    );
  }