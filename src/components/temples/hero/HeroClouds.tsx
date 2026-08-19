"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CLOUD_IMAGE = "/temple-hub/temple-hub-bottom-cloud.webp";

/** Bottom cloud strip — slow horizontal drift, fades in on mount. */
export default function HeroClouds() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 overflow-hidden sm:h-32 lg:h-40">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: [0, 24, 0] }}
        transition={{
          opacity: { duration: 1.2, delay: 0.3 },
          x: { duration: 16, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute inset-x-[-5%] bottom-0 h-full"
      >
        <Image
          src={CLOUD_IMAGE}
          alt=""
          fill
          unoptimized
          aria-hidden
          className="object-cover object-bottom"
        />
      </motion.div>
    </div>
  );
}
