

"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { BookOpenText } from "lucide-react";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Cinematic Top Progress Line */}
      <div className="pointer-events-none fixed left-0 top-17 z-[999] h-[4px] w-full overflow-hidden">
        {/* Ambient Glow Background */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />

        {/* Soft Glow Layer */}
        <motion.div
          style={{ scaleX }}
          className="absolute left-0 top-0 h-full w-full origin-left bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 blur-[6px] opacity-70"
        />

        {/* Main Progress Bar */}
        <motion.div
          style={{ scaleX }}
          className="absolute left-0 top-0 h-full w-full origin-left bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500"
        />
      </div>
    </>
  );
}