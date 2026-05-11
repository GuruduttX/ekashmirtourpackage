

"use client";

import { motion, Variants } from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  HeartHandshake,
  MapPinned,
  MessageSquareText,
  Phone,
  Send,
  User,
} from "lucide-react";

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const destinations = [
  "Srinagar",
  "Gulmarg",
  "Pahalgam",
  "Sonamarg",
  "Dal Lake",
  "Kupwara",
];

export default function BlogInquiryForm() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUpVariants}
      className="relative overflow-hidden rounded-[2rem] md:border border-sky-100/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(240,249,255,0.82))] md:p-6  shadow-[0_25px_80px_rgba(14,165,233,0.08)] backdrop-blur-2xl"
    >
      {/* Ambient Glow Layers */}
      <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-sky-400/15 blur-[100px]" />

      <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-cyan-400/10 blur-[90px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-1">
            {/* Icon Container */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.4rem] border border-sky-100 bg-white/80 shadow-[0_10px_30px_rgba(14,165,233,0.08)] backdrop-blur-xl">
              <HeartHandshake className="h-6 w-6 text-sky-500" />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/70 px-3 py-1.5 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-sky-700">
                Personalized Travel Planning
              </span>
            </div>
          </div>

          <div>
            <h3 className="mt-4 text-[1.8rem] leading-[1] tracking-[-0.05em] font-extralight text-slate-900">
              Start Your
              <span className="block bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400 bg-clip-text text-transparent font-medium">
                Kashmir Journey
              </span>
            </h3>
          </div>
        </div>
        {/* Form */}
        <form className="mt-8 flex flex-col gap-5">
          {/* Name */}
          <div className="group relative">
            <User className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-sky-500" />

            <input
              type="text"
              placeholder="Your Name"
              className="h-14 w-full rounded-2xl border border-white/70 bg-white/75 pl-14 pr-5 text-[15px] text-slate-700 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-slate-400 focus:border-sky-200 focus:bg-white focus:shadow-[0_10px_30px_rgba(14,165,233,0.08)]"
            />
          </div>

          {/* Phone */}
          <div className="group relative">
            <Phone className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-sky-500" />

            <input
              type="tel"
              placeholder="Phone Number"
              className="h-14 w-full rounded-2xl border border-white/70 bg-white/75 pl-14 pr-5 text-[15px] text-slate-700 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-slate-400 focus:border-sky-200 focus:bg-white focus:shadow-[0_10px_30px_rgba(14,165,233,0.08)]"
            />
          </div>

          {/* Destination */}
          <div className="group relative">
            <MapPinned className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-sky-500" />

            <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <select className="h-14 w-full appearance-none rounded-2xl border border-white/70 bg-white/75 pl-14 pr-12 text-[15px] text-slate-700 outline-none backdrop-blur-xl transition-all duration-300 focus:border-sky-200 focus:bg-white focus:shadow-[0_10px_30px_rgba(14,165,233,0.08)]">
              <option value="">Preferred Destination</option>

              {destinations.map((destination) => (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
          </div>

          {/* Travel Date */}
          <div className="group relative">
            <CalendarDays className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-sky-500" />

            <input
              type="text"
              placeholder="Preferred Travel Month"
              className="h-14 w-full rounded-2xl border border-white/70 bg-white/75 pl-14 pr-5 text-[15px] text-slate-700 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-slate-400 focus:border-sky-200 focus:bg-white focus:shadow-[0_10px_30px_rgba(14,165,233,0.08)]"
            />
          </div>

          {/* Message */}
          <div className="group relative">
            <MessageSquareText className="pointer-events-none absolute left-5 top-5 z-10 h-5 w-5 text-slate-400 transition-colors duration-300 group-focus-within:text-sky-500" />

            <textarea
              rows={5}
              placeholder="Tell us about the kind of Kashmir experience you want..."
              className="w-full rounded-[1.7rem] border border-white/70 bg-white/75 pl-14 pr-5 pt-5 text-[15px] text-slate-700 outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-slate-400 focus:border-sky-200 focus:bg-white focus:shadow-[0_10px_30px_rgba(14,165,233,0.08)] resize-none"
            />
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            type="submit"
            className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-medium text-white shadow-[0_20px_50px_rgba(15,23,42,0.18)] transition-all duration-500 hover:bg-sky-500"
          >
            Plan My Kashmir Trip
            <Send className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}