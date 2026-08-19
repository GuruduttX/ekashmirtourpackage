"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [isEnquiryOpen, setEnquiryOpen] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <>
    <div className="relative w-full h-[80vh] md:h-[97vh] overflow-hidden bg-slate-900 mt-10">
      {/* 1. SKY */}
      <img
        src="/Home/Hero/sky.svg"
        alt="Sky Background"
        // PLACEMENT & SIZE: Change these values
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* 2. MOUNTAIN */}
      <motion.img
        src="/Home/Hero/white-mountain.webp"
        alt="Mountain"
        // PLACEMENT & SIZE:
        className="absolute bottom-[-10%] md:bottom-[-15%] right-[-35%] md:right-[-5%] w-full scale-125 md:scale-100 md:w-[63%] h-auto object-contain origin-bottom" // Changed to origin-bottom
        // ANIMATION CONTROL:
        initial={{ scale: 1.3 }}
        animate={{ scale: 1.44 }} // Removed x: 20 for a pure zoom effect
        transition={{ delay: 0.3, duration: 2, ease: "easeInOut" }}
      />

      {/* 3. FOREGROUND */}
      <motion.img
        src="/Home/Hero/foreground.svg"
        alt="Foreground"
        // PLACEMENT & SIZE:
        // Make width slightly larger than 100% so when it moves left, we don't see the edge
        className="absolute bottom-[5%] md:bottom-[-10%] left-[-10%] w-[110%] h-auto object-contain"
        // ANIMATION CONTROL:
        initial={{ x: "5%", scale: 1.3 }} // Starts at its normal position
        animate={{ x: "0%", scale: 1.3 }} // Moves slightly right to left and scales up a tiny bit
        transition={{ delay: 0.3, duration: 2, ease: "easeInOut" }}
      />

      {/* 4. CLOUD */}
      <motion.img
        src="/Home/Hero/cloud.svg"
        alt="Cloud"
        // PLACEMENT & SIZE:
        className="absolute top-[8%] md:top-[-5%] left-[-10%] w-[45%] h-auto object-contain"
        // ANIMATION CONTROL:
        initial={{ x: "-100%", opacity: 0, scale: 2.6 }} // Starts off-screen left, invisible, slightly small
        animate={{ x: "70%", opacity: 1, scale: 2.6 }} // Moves in, becomes visible, scales to normal size
        transition={{ delay: 0.3, duration: 2, ease: "easeInOut" }}
      />

      {/* 5. DARK BACKDROP FILTER */}
      <div className="absolute inset-0 bg-black/20  z-10 pointer-events-none"></div>

      {/* 6. SNOWFALL ANIMATION */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {Array.from({ length: 200 }).map((_, i) => {
            const size = Math.random() * 5 + 2;
            return (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full opacity-80"
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: -10,
                }}
                animate={{
                  y: ["0vh", "100vh"],
                  x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 120],
                }}
                transition={{
                  duration: Math.random() * 3 + 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 3,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 7. TEXT CONTENT & CTAS */}
      <div className="relative z-20 flex flex-col justify-start pt-26 md:justify-center md:pt-0 h-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-none z-44">
        <motion.div
          // Increased max-w to 2xl to better accommodate the paragraph text
          className="max-w-2xl text-center md:text-left pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.8, ease: "easeOut" }}
        >
          {/* 1. UPDATED HEADING */}
          <h1 className="text-white font-bold text-4xl md:text-5xl leading-tight drop-shadow-lg">
            Kashmir Tour Packages by{" "}
            <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Sartaj
            </span>{" "}
            a{" "}
            <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              20 year
            </span>{" "}
            local expert
          </h1>

          {/* 2. NEW PARAGRAPH */}
          <p className="mt-6 text-sm md:text-lg  text-white/90 drop-shadow-md leading-relaxed">
            Plan a Kashmir trip with packages, stays, cabs and local sightseeing
            shaped around Srinagar, Gulmarg, Pahalgam and Sonamarg. Sartaj helps
            you compare routes, seasons and inclusions before you book, so your
            itinerary is practical, transparent and paced for your family,
            honeymoon or group.
          </p>

          {/* 3. CALL TO ACTION BUTTONS */}
          {/* Added flex-wrap just in case the buttons need to stack on very small mobile screens */}
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link
              href="/kashmir-tour-packages/"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-400 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold rounded-full shadow-lg transition-colors w-full md:w-fit"
            >
              Explore Packages
              <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.5)] text-white font-semibold transition-colors w-full md:w-fit text-center"
            >
              Book Now
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* 8. BOTTOM FADE */}
      <img
        src="/Home/Hero/bottom-fade.svg"
        alt="Fade transition"
        // PLACEMENT & SIZE:
        className="absolute bottom-[-10] md:bottom-0 left-0 w-full h-[15vh] object-cover pointer-events-none z-30"
      />
    </div>

    {/* Rendered outside the overflow-hidden hero so the fixed overlay is never clipped. */}
    <EnquiryPopupForm
      isOpen={isEnquiryOpen}
      onClose={() => setEnquiryOpen(false)}
    />
    </>
  );
}
