"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  MapPin,
  Star,
  Quote,
  Camera,
  Compass,
  CalendarDays,
} from "lucide-react";

// --- Types & Scalable Data Structure ---

type ReviewType = "social" | "image" | "journal";

interface TravelerReview {
  id: string;
  type: ReviewType;
  name: string;
  avatar?: string;
  location?: string;
  tripType?: string;
  review: string;
  rating?: number;
  image?: string;
  date?: string;
  tags?: string[];
}

// 12 Authentic, varied dummy reviews for the ecosystem
const reviewsData: TravelerReview[] = [
  {
    id: "rev-01",
    type: "social",
    name: "Arjun Desai",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    location: "Mumbai, India",
    review:
      "Waking up to the floating flower markets on Dal Lake is an experience I will never forget. The warmth of the locals makes the freezing mornings feel cozy.",
    rating: 5,
    date: "2 days ago",
  },
  {
    id: "rev-02",
    type: "image",
    name: "Priya & Rohan",
    location: "Gulmarg",
    review: "Skiing through powder that felt like clouds. Absolutely surreal.",
    image:
      "https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=800&auto=format&fit=crop",
    tags: ["First Snowfall"],
  },
  {
    id: "rev-03",
    type: "journal",
    name: "Sarah Jenkins",
    tripType: "Solo Backpacking",
    review:
      "I was hesitant traveling alone, but Kashmir embraced me. I was invited into a local home for Wazwan, and sitting on the floor sharing meals and stories became the absolute highlight of my entire month in India.",
    date: "October 2023",
  },
  {
    id: "rev-04",
    type: "social",
    name: "Vikram Sharma",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    location: "Bangalore",
    review:
      "The sheer silence of Pahalgam's valleys is therapeutic. Escaped the city noise and found absolute peace among the endless pine forests.",
    rating: 5,
    date: "1 week ago",
  },
  {
    id: "rev-05",
    type: "image",
    name: "The Kapoor Family",
    location: "Dal Lake",
    review: "Golden hour reflections on tranquil waters.",
    image:
      "https://images.unsplash.com/photo-1623194017326-0e1ce47d79b9?q=80&w=800&auto=format&fit=crop",
    tags: ["Shikara Ride"],
  },
  {
    id: "rev-06",
    type: "journal",
    name: "Elena & Marcus",
    tripType: "Anniversary Retreat",
    review:
      "Sleeping in an intricately carved 100-year-old cedar houseboat. The smell of the wood, the gentle rocking of the lake, and the misty mornings sipping saffron Kahwa. Time simply stops here.",
    date: "Winter 2023",
  },
  {
    id: "rev-07",
    type: "social",
    name: "Ananya Patel",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    location: "Ahmedabad",
    review:
      "Gondola phase 2 took our breath away. Literally and figuratively! Standing above the clouds looking at the Apharwat peak is a core memory now.",
    rating: 5,
    date: "3 weeks ago",
  },
  {
    id: "rev-08",
    type: "image",
    name: "David M.",
    location: "Sonmarg",
    review: "The meadow of gold lives up to its name.",
    image:
      "https://images.unsplash.com/photo-1626249150774-325b740523e0?q=80&w=800&auto=format&fit=crop",
    tags: ["Alpine Trek"],
  },
  {
    id: "rev-09",
    type: "journal",
    name: "Meera Reddy",
    tripType: "Photography Tour",
    review:
      "Every corner of this valley is a painting. But beyond the landscapes, it's the deeply etched smiles of the shepherds in Aru Valley that captured my heart and my lens.",
    date: "Summer 2023",
  },
  {
    id: "rev-10",
    type: "social",
    name: "Rahul Verma",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    location: "Delhi",
    review:
      "Everything was coordinated perfectly. From the airport pickup to the hidden cafes we were shown in Srinagar. Felt like we were traveling with local friends.",
    rating: 5,
    date: "1 month ago",
  },
];

// Split reviews into two columns for the Masonry effect
const col1Reviews = reviewsData.filter((_, i) => i % 2 === 0);
const col2Reviews = reviewsData.filter((_, i) => i % 2 !== 0);

export default function TravelerReviewsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-sky-50 py-24 lg:py-32 overflow-hidden"
    >
      {/* --- Cinematic Background Atmosphere --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-sky-300/20 rounded-full blur-[140px] -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-300/15 rounded-full blur-[120px]" />
        {/* Soft radial overlay to focus center */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-50/50 to-sky-50 pointer-events-none z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* --- LEFT SIDE: Sticky Emotional Anchor --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-200/60 bg-white/50 backdrop-blur-md text-sky-600 uppercase tracking-[0.2em] text-xs font-bold shadow-sm mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Traveler Stories
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 leading-[1.15] tracking-tight mb-8">
                Moments Travelers{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 drop-shadow-sm">
                  Took Back From Kashmir
                </span>
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed font-light mb-12 max-w-md">
                Every journey leaves a mark. Discover the quiet reflections,
                unforgettable sunrises, and genuine human connections
                experienced by our community of travelers.
              </p>

              {/* Featured Anchor Card */}
              <div className="relative w-full h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/40 group cursor-pointer hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=1200&auto=format&fit=crop"
                  alt="Featured Memory"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <Quote className="w-8 h-8 text-sky-300/70 mb-4" />
                  <h3 className="text-2xl font-serif italic text-white mb-4 leading-snug">
                    "Watching the sunrise over Dal Lake felt like time had
                    stopped entirely."
                  </h3>
                  <div>
                    <p className="text-white font-semibold tracking-wide">
                      David & Emma, UK
                    </p>
                    <p className="text-sky-200 text-sm font-medium">
                      Honeymoon Escape
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT SIDE: Desktop Auto-Scrolling Masonry Wall --- */}
          <div className="hidden lg:grid col-span-7 grid-cols-2 gap-6 h-[850px] relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]">
            {/* Column 1: Slower Scroll */}
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
              className="flex flex-col gap-6"
            >
              {/* Duplicate array for seamless infinite scroll */}
              {[...col1Reviews, ...col1Reviews].map((review, idx) => (
                <ReviewCard key={`${review.id}-col1-${idx}`} review={review} />
              ))}
            </motion.div>

            {/* Column 2: Slightly Faster Scroll, Starts Offset */}
            <motion.div
              animate={{ y: ["-50%", "0%"] }} // Reverse direction or different speed for organic feel
              transition={{ repeat: Infinity, ease: "linear", duration: 55 }}
              className="flex flex-col gap-6 pt-12"
            >
              {[...col2Reviews, ...col2Reviews].map((review, idx) => (
                <ReviewCard key={`${review.id}-col2-${idx}`} review={review} />
              ))}
            </motion.div>
          </div>

          {/* --- MOBILE SIDE: Immersive Vertical Story Feed --- */}
          <div className="lg:hidden col-span-1 flex flex-col gap-6 w-full">
            {reviewsData.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Dynamic Review Card Component ---

function ReviewCard({ review }: { review: TravelerReview }) {
  const baseClasses =
    "group relative w-full rounded-[2rem] overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-[0_20px_40px_rgba(56,189,248,0.15)] hover:-translate-y-1";

  switch (review.type) {
    case "social":
      return (
        <div
          className={`${baseClasses} bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl p-6 lg:p-8`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-sky-100"
              />
              <div>
                <p className="text-slate-800 font-bold text-sm">
                  {review.name}
                </p>
                <p className="text-slate-500 text-xs">
                  {review.location} • {review.date}
                </p>
              </div>
            </div>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">
            {review.review}
          </p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100/60">
            <div className="flex text-amber-400">
              {[...Array(review.rating || 5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[10px] uppercase tracking-widest text-sky-500 font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Read More
            </span>
          </div>
        </div>
      );

    case "image":
      // Randomize height slightly for masonry organic feel
      const isTall = review.id.includes("02") || review.id.includes("08");

      return (
        <div
          className={`${baseClasses} ${isTall ? "h-[400px]" : "h-[320px]"} shadow-2xl border-2 border-white/80`}
        >
          <img
            src={review.image}
            alt={review.location}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            {review.tags && (
              <span className="bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-full text-white text-[10px] uppercase tracking-widest font-bold mb-3 shadow-sm transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <Camera className="w-3 h-3 inline-block mr-1" />
                {review.tags[0]}
              </span>
            )}
            <p className="text-white font-medium text-lg leading-snug mb-2 drop-shadow-md">
              "{review.review}"
            </p>
            <div className="flex items-center gap-2 text-sky-200 text-xs font-semibold tracking-wide">
              <MapPin className="w-3.5 h-3.5" />
              {review.location} — {review.name}
            </div>
          </div>
        </div>
      );

    case "journal":
      return (
        <div
          className={`${baseClasses} bg-slate-900/90 backdrop-blur-2xl border border-sky-400/20 shadow-2xl p-6 lg:p-8 hover:bg-slate-900 transition-colors`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-sky-300/70" />
              <span className="text-sky-300/70 text-xs font-medium tracking-widest uppercase">
                {review.date}
              </span>
            </div>
            <Compass className="w-5 h-5 text-sky-400/30" />
          </div>
          <p className="text-sky-50 font-serif italic text-lg lg:text-xl leading-relaxed mb-6">
            "{review.review}"
          </p>
          <div className="flex items-center justify-between border-t border-slate-700/50 pt-4">
            <div>
              <p className="text-white font-bold text-sm">{review.name}</p>
              <p className="text-sky-400 text-xs">{review.tripType}</p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
