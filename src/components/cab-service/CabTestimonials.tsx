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
    text: "Booking was quick and the driver arrived right on time. The cab was spotless and the AC worked perfectly throughout our Srinagar to Gulmarg drive.",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Priya Nair",
    text: "Fixed pricing meant no haggling and no surprises. Our driver knew the mountain roads well and made the whole trip feel safe and comfortable.",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Ritu Kapoor",
    text: "We booked a tempo traveller for our family of eight and it was perfect — clean, spacious, and the driver was courteous throughout our week in Kashmir.",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Aman Verma",
    text: "Called for an airport pickup at midnight and the cab was waiting exactly as promised. Smooth, reliable, and reasonably priced.",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Sana Malik",
    text: "The Pahalgam to Srinagar transfer was comfortable and scenic. Our driver stopped wherever we wanted for photos without any complaints.",
    image: "https://i.pravatar.cc/150?img=44",
  },
];

const ANIMATION_DURATION = 55; // seconds for one full loop — slow, ambient scroll



function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-72 shrink-0 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm sm:w-80">
      <Quote className="h-6 w-6 fill-sky-500 text-sky-500" />
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{testimonial.text}</p>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image src={testimonial.image} alt={testimonial.name} fill unoptimized className="object-cover" />
          </div>
          <span className="font-bold text-sky-600">{testimonial.name}</span>
        </div>
      </div>
    </div>
  );
}

export default function CabTestimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative w-full overflow-hidden bg-sky-50 pb-14 pt-14 sm:pb-16 sm:pt-16">
      <style>{`
        @keyframes cab-testimonial-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .cab-testimonial-track {
          animation: cab-testimonial-marquee ${ANIMATION_DURATION}s linear infinite;
        }
        .cab-testimonial-track.paused {
          animation-play-state: paused;
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
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className={`cab-testimonial-track flex w-max gap-6 px-4 ${isPaused ? "paused" : ""}`}
        >
          {doubled.map((testimonial, i) => (
            <ReviewCard key={`${testimonial.name}-${i}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
