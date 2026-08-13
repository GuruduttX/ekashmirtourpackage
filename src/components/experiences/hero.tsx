"use client";

import { motion } from "framer-motion";

const DURATION = 5;

export default function Hero() {
  return (
    <section
      className="
        relative
        h-[100svh]
        min-h-[600px]
        md:min-h-[700px]
        w-full
        overflow-hidden
        bg-[#e0f0f5]
      "
    >

      {/* =========================================================
          LAYER 1 — BACK CLOUDS
      ========================================================= */}

      <motion.img
        src="/experiences/backClouds.png"
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
          scale: 1.3,
          opacity: 1,
        }}
        animate={{
          x: ["0%", "2%", "5%"],
          y: ["0%", "7%", "-7%"],
          scale: [1.3, 1.2, 1.1],
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
        src="/experiences/backMountain.png"
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
          y: "0%",
          scale: 1.7,
          opacity: 1,
        }}
        animate={{
          x: ["-5%", "-5%", "3%"],
          y: ["15%", "25%", "30%"],
          scale: [1.2, 1.1, 1.0],
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
        src="/experiences/sideCloud1.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[4]
          w-[42%]
          max-w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          transform-gpu
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: 5,
          opacity: 1,
        }}
        animate={{
          x: ["0%", " 0%"],
          y: ["0%", "-195%"],
          scale: [5, 5],
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
        src="/experiences/sideCloud2.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[5]
          w-[45%]
          max-w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          transform-gpu
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: 5,
          opacity: 1,
        }}
        animate={{
          x: ["0%", "-280%"],
          y: ["0%", "-190%"],
          scale: [5, 5],
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
        src="/experiences/sideCloud3.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[6]
          w-[48%]
          max-w-[750px]
          -translate-x-1/2
          -translate-y-1/2
          transform-gpu
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: 1.5,
          opacity: 1,
        }}
        animate={{
          x: ["0%", "-210%"],
          y: ["0%", "190%"],
          scale: [7, 7],
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
        src="/experiences/sideCloud2.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[7]
          w-[42%]
          max-w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          transform-gpu
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: 0.75,
          opacity: 1,
        }}
        animate={{
          x: ["0%", "150%"],
          y: ["0%", "150%"],
          scale: [0.75, 1.6],
          opacity: [1, 1],
        }}
        transition={{
          duration: 3.4,
          delay: 0.75,
          ease: "easeInOut",
        }}
      />


      {/* =========================================================
          LAYER 7 — CENTER CLOUD → TOP CENTER / CORNER
      ========================================================= */}

      <motion.img
        src="/experiences/sideCloud1.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[8]
          w-[38%]
          max-w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          transform-gpu
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: 3,
          opacity: 1,
        }}
        animate={{
          x: ["0%", "150%"],
          y: ["0%", "-120%"],
          scale: [3, 5],
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
          transform-gpu
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: 1,
          opacity: 1,
        }}
        animate={{
          x: ["0%", "0%"],
          y: ["0%", "-8%"],
          scale: [1, 1.08],
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
            text-center
            text-[clamp(3rem,10vw,9rem)]
            font-bold
            tracking-[0.15em]
            md:tracking-[0.22em]
            text-white
            drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)]
          "
        >
          EXPLORE
        </h1>
      </motion.div>


      {/* =========================================================
          LAYER 13 — CAVE
      ========================================================= */}

      <motion.img
        src="/experiences/cave.png"
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
          scale: 1.7,
          opacity: 1,
        }}
        animate={{
          x: ["0%", "0%", "0%", "0%"],
          y: ["0%", "0%", "0%", "2%"],
          scale: [1.7, 1.7, 1.7, 1],
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
        src="/experiences/person.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          z-[12]
          h-[90vh]
          w-auto
          max-w-none
          -translate-x-1/2
          object-contain
          object-bottom
          transform-gpu
        "
        initial={{
          x: "0%",
          y: "0%",
          scale: 1,
          opacity: 0,
        }}
        animate={{
          x: ["0%", "0%", "0%", "0%"],
          y: ["0%", "0%", "0%", "-50%"],
          scale: [1.5, 1.5, 1.5, 2],
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