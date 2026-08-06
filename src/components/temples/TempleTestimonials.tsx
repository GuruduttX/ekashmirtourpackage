"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Arjun Mehta",
    text: "The darshan timings and dress code notes were spot on. We reached Shankaracharya well before the morning aarti and never once felt rushed.",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Priya Nair",
    text: "Our Kheer Bhawani visit was arranged beautifully. The team handled the cab, the prasad and even the steps assistance for my mother.",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Ritu Kapoor",
    text: "We did Hazratbal and Jamia Masjid in a single morning without any chaos. The local guide explained the history at every stop.",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Aman Verma",
    text: "Booked the Amarnath yatra transfer through them. Every checkpoint, every halt and the return cab were sorted before we even asked.",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Sana Malik",
    text: "The satvik food counters and the rest lounge made a long pilgrimage day genuinely comfortable. Would book this again without hesitation.",
    image: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Vikram Rao",
    text: "Charar-e-Sharief was on our list and they built the whole day around it. Clear timings, honest pricing and a driver who knew the route.",
    image: "https://i.pravatar.cc/150?img=15",
  },
];

const ANIMATION_DURATION = 55; // seconds for one full loop — slow, ambient scroll

function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  const [firstName, ...rest] = testimonial.name.split(" ");

  return (
    <div className="w-72 shrink-0 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm sm:w-80">
      <Quote className="h-6 w-6 fill-sky-500 text-sky-500" />
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{testimonial.text}</p>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="font-bold text-slate-800">
            {firstName} <span className="text-sky-500">{rest.join(" ")}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TempleTestimonials() {
  // Hover and touch are tracked separately: touch devices emit compatibility
  // mouse events after a tap, so a shared flag would get re-paused by the
  // synthetic mouseenter and never released (no mouseleave ever follows).
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const isPaused = isHovered || isTouched;
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative w-full overflow-hidden bg-sky-50 py-10">
      <style>{`
        @keyframes temple-testimonial-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .temple-testimonial-track {
          animation: temple-testimonial-marquee ${ANIMATION_DURATION}s linear infinite;
        }
        .temple-testimonial-track.paused {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .temple-testimonial-track { animation: none; }
        }
      `}</style>

      <h2 className="text-center font-heading text-3xl font-extrabold sm:text-4xl">
        <span className="text-slate-900">What Travellers </span>
        <span className="bg-linear-to-r from-sky-500 to-cyan-300 bg-clip-text text-transparent">
          say about us
        </span>
      </h2>

      <div className="no-scrollbar mt-10 overflow-x-hidden">
        <div
          onPointerEnter={(e) => e.pointerType === "mouse" && setIsHovered(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setIsHovered(false)}
          onPointerDown={(e) => e.pointerType !== "mouse" && setIsTouched(true)}
          onPointerUp={() => setIsTouched(false)}
          onPointerCancel={() => setIsTouched(false)}
          className={`temple-testimonial-track flex w-max gap-6 px-4 ${isPaused ? "paused" : ""}`}
        >
          {doubled.map((testimonial, i) => (
            <ReviewCard key={`${testimonial.name}-${i}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
