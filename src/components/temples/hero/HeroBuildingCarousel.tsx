"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimationControls, Easing } from "framer-motion";
import { heroEaseOutExpo } from "@/components/temples/hero/heroMotion";

type BuildingKey = "temple" | "mosque";

const BUILDINGS: Record<BuildingKey, { src: string; alt: string }> = {
  temple: {
    src: "/temple-hub/temple-hub-building-1.svg",
    alt: "Shankaracharya-style stone temple overlooking Srinagar",
  },
  mosque: {
    src: "/temple-hub/temple-hub-building-2.webp",
    alt: "Hazratbal shrine dome and minaret in Srinagar",
  },
};

const HOLD_MS = 4500;
const RISE_TRANSITION = { duration: 2.2, ease: heroEaseOutExpo };
// A symmetric ease-in-out (rather than the front-loaded ease-out-expo used
// for rise/entrances) so the sink doesn't feel like it rushes through its
// visible portion before slowing to a stop mostly offscreen.
const sinkEase: Easing = [0.65, 0, 0.35, 1];
const SINK_TRANSITION = { duration: 2, ease: sinkEase };

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Right-side building artwork — rises from the bottom, holds, sinks back
 * down, then swaps to the other building and rises again. Loops forever. */
export default function HeroBuildingCarousel() {
  const [activeBuilding, setActiveBuilding] = useState<BuildingKey>("temple");
  const controls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;

    async function run() {
      while (!cancelled) {
        await controls.start({ y: "0%", transition: RISE_TRANSITION });
        if (cancelled) return;
        await wait(HOLD_MS);
        if (cancelled) return;
        await controls.start({ y: "115%", transition: SINK_TRANSITION });
        if (cancelled) return;
        setActiveBuilding((prev) => (prev === "temple" ? "mosque" : "temple"));
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [controls]);

  const inactiveBuilding: BuildingKey = activeBuilding === "temple" ? "mosque" : "temple";

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-full overflow-hidden lg:right-[-4%] lg:w-[60%] lg:max-w-4xl">
      <motion.div
        initial={{ y: "110%" }}
        animate={controls}
        className="absolute bottom-0 right-0 h-full w-full lg:w-[85%]"
      >
        <Image
          src={BUILDINGS[activeBuilding].src}
          alt={BUILDINGS[activeBuilding].alt}
          fill
          unoptimized
          className="object-contain object-bottom drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
        />
      </motion.div>

      {/* Preload the other building so its rise never shows a blank frame. */}
      <Image
        src={BUILDINGS[inactiveBuilding].src}
        alt=""
        width={1}
        height={1}
        unoptimized
        priority
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
    </div>
  );
}
