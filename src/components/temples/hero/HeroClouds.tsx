"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CLOUD_IMAGE = "/temple-hub/temple-hub-bottom-cloud.webp";

/**
 * Bottom cloud strip — slow horizontal drift, fades in on mount.
 *
 * Sits at z-20, above the hero's z-10 content column. At lg the strip is 160px
 * tall while the content only reserves pb-24 (96px), so its last 64px used to
 * cover the preview cards; it drops by that amount from lg up. Below lg the
 * cards are hidden, so the strip stays pinned to the bottom there.
 */
export default function HeroClouds() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 overflow-hidden sm:h-32 lg:-bottom-16 lg:h-40">
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
