"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <section
      className="
        relative
        h-[100svh]
        min-h-[560px]
        w-full
        overflow-hidden
        bg-[#e0f0f5]
        sm:min-h-[600px]
        md:min-h-[700px]
      "
    >
      {/* =========================================================
          LAYER 1 — BACK CLOUDS
      ========================================================= */}

      <motion.img
        src="/experiences/backClouds.webp"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          h-full
          w-full
          object-cover
          object-center
          transform-gpu
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: isMobile ? 1.15 : 1.3,
          opacity: 1,
        }}
        animate={{
          x: isMobile ? ["0%", "1%", "3%"] : ["0%", "2%", "5%"],
          y: isMobile ? ["0%", "4%", "-3%"] : ["0%", "7%", "-7%"],
          scale: isMobile ? [1.15, 1.1, 1.05] : [1.3, 1.2, 1.1],
          opacity: [1, 1, 1],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          LAYER 2 — BACK MOUNTAIN
      ========================================================= */}

      <motion.img
        src="/experiences/backMountain.webp"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          h-full
          w-full
          object-cover
          object-top
          transform-gpu
        "
        initial={{
          x: "-5%",
          y: isMobile ? "18%" : "0%",
          scale: isMobile ? 1.3 : 1.7,
          opacity: 1,
        }}
        animate={{
          x: isMobile
            ? ["-3%", "-2%", "2%"]
            : ["-5%", "-5%", "3%"],

          y: isMobile
            ? ["15%", "35%", "50%"]
            : ["15%", "25%", "30%"],

          scale: isMobile
            ? [1.3, 1.15, 1.05]
            : [1.2, 1.1, 1.0],

          opacity: [1, 1, 1],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          LAYER 3 — CENTER CLOUD → TOP LEFT
      ========================================================= */}

      <motion.img
        src="/experiences/sideCloud1.webp"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[4]
          w-[80%]
          max-w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          transform-gpu
          md:w-[42%]
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: isMobile ? 2.2 : 5,
          opacity: 1,
        }}
        animate={{
          x: ["0%", "0%"],
          y: isMobile
            ? ["0%", "-100%"]
            : ["0%", "-195%"],
          scale: isMobile ? [2.2, 2.2] : [5, 5],
          opacity: [1, 1],
        }}
        transition={{
          duration: 3,
          delay: 0,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          LAYER 4 — CENTER CLOUD → TOP RIGHT
      ========================================================= */}

      <motion.img
        src="/experiences/sideCloud2.webp"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[5]
          w-[85%]
          max-w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          transform-gpu
          md:w-[45%]
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: isMobile ? 2.2 : 5,
          opacity: 1,
        }}
        animate={{
          x: isMobile
            ? ["0%", "-125%"]
            : ["0%", "-280%"],

          y: isMobile
            ? ["0%", "-95%"]
            : ["0%", "-190%"],

          scale: isMobile ? [2.2, 2.2] : [5, 5],
          opacity: [1, 1],
        }}
        transition={{
          duration: 3,
          delay: 0.25,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          LAYER 5 — CENTER CLOUD → BOTTOM LEFT
      ========================================================= */}

      <motion.img
        src="/experiences/sideCloud3.webp"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[6]
          w-[90%]
          max-w-[750px]
          -translate-x-1/2
          -translate-y-1/2
          transform-gpu
          md:w-[48%]
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: isMobile ? 2.5 : 1.5,
          opacity: 1,
        }}
        animate={{
          x: isMobile
            ? ["0%", "-100%"]
            : ["0%", "-210%"],

          y: isMobile
            ? ["0%", "100%"]
            : ["0%", "190%"],

          scale: isMobile ? [2.5, 2.5] : [7, 7],
          opacity: [1, 1],
        }}
        transition={{
          duration: 3.2,
          delay: 0.5,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          LAYER 6 — CENTER CLOUD → BOTTOM RIGHT
      ========================================================= */}

      <motion.img
        src="/experiences/sideCloud2.webp"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[7]
          w-[80%]
          max-w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          transform-gpu
          md:w-[42%]
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: isMobile ? 0.8 : 0.75,
          opacity: 1,
        }}
        animate={{
          x: isMobile
            ? ["0%", "80%"]
            : ["0%", "150%"],

          y: isMobile
            ? ["0%", "80%"]
            : ["0%", "150%"],

          scale: isMobile
            ? [0.8, 1.25]
            : [0.75, 1.6],

          opacity: [1, 1],
        }}
        transition={{
          duration: 3.4,
          delay: 0.75,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          LAYER 7 — CENTER CLOUD → TOP RIGHT CORNER
      ========================================================= */}

      <motion.img
        src="/experiences/sideCloud1.webp"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[8]
          w-[75%]
          max-w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          transform-gpu
          md:w-[38%]
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: isMobile ? 1.8 : 3,
          opacity: 1,
        }}
        animate={{
          x: isMobile
            ? ["0%", "85%"]
            : ["0%", "150%"],

          y: isMobile
            ? ["0%", "-70%"]
            : ["0%", "-120%"],

          scale: isMobile
            ? [1.8, 2.8]
            : [3, 5],

          opacity: [1, 1],
        }}
        transition={{
          duration: 3.5,
          delay: 1,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          LAYER 11 — EXPLORE
      ========================================================= */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[3]
          flex
          items-center
          justify-center
          px-3
          transform-gpu
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: 1,
          opacity: 1,
        }}
        animate={{
          x: "0%",
          y: isMobile ? ["05%", "10%"] : ["0%", "-8%"],
          scale: isMobile ? [1, 1.04] : [1, 1.08],
          opacity: [1, 1],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
        }}
      >
        <h1
          className="
            select-none
            whitespace-nowrap
            text-center
            text-[clamp(2.8rem,13vw,9rem)]
            font-bold
            tracking-[0.08em]
            text-white
            drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)]
            md:text-[clamp(3rem,10vw,9rem)]
            md:tracking-[0.22em]
          "
        >
          EXPLORE
        </h1>
      </motion.div>

      {/* =========================================================
          LAYER 13 — CAVE
      ========================================================= */}

      <motion.img
        src="/experiences/cave.webp"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[13]
          h-full
          w-full
          object-cover
          object-center
          transform-gpu
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: isMobile ? 1.3 : 1.7,
          opacity: 1,
        }}
        animate={{
          x: ["0%", "0%", "0%", isMobile ? "-10%" : "0%"],
          y: ["0%", "0%", "0%", isMobile ? "10%" : "2%"],
          scale: isMobile
            ? [1.3, 1.3, 1.25, 1.5]
            : [1.7, 1.7, 1.7, 1],
          opacity: [1, 1, 1, 1],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          LAYER 12 — PERSON
      ========================================================= */}

      <motion.img
        src="/experiences/person.webp"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          z-[12]
          h-[65vh]
          w-auto
          max-w-none
          -translate-x-1/2
          object-contain
          object-bottom
          transform-gpu
          md:h-[90vh]
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: isMobile ? 1.1 : 1.5,
          opacity: 0,
        }}
        animate={{
          x: "0%",
          y: isMobile
            ? ["0%", "0%", "0%", "-50%"]
            : ["0%", "0%", "0%", "-50%"],

          scale: isMobile
            ? [1.5, 1.5, 1.5, 2]
            : [1.5, 1.5, 1.5, 2],

          opacity: [0, 0, 0, 1],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}