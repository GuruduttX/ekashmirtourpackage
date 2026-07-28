"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Destination {
  id: number;
  name: string;
  image: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: "Dal Lake",
    image:
      "https://images.unsplash.com/photo-1677123419103-785c917c4a58?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Shikara Ride",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Nigeen Lake",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Sonamarg",
    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Gulmarg",
    image:
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=900&auto=format&fit=crop&q=80",
  },
];

const BASE_WIDTH = 230;
const HOVER_WIDTH = 460;
const MOBILE_BASE_HEIGHT = 110;
const MOBILE_ACTIVE_HEIGHT = 260;

export default function TopDestinations() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-20 lg:py-10">
      <h2 className="mb-2 text-center font-heading text-3xl font-bold bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent sm:text-4xl lg:mb-3 lg:text-5xl">
        Top Destinations
      </h2>

      <div className="relative">
        <img
          src="/TopDestination/TopDestinationUpPattern.svg"
          alt=""
          aria-hidden="true"
          className="absolute -top-px left-0 z-10 w-full select-none"
        />

        <div className="bg-sky-100 py-24 sm:py-32">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 overflow-hidden px-4 sm:flex-row sm:gap-6 sm:px-8">
            {DESTINATIONS.map((dest, index) => {
              const isActive = activeId === dest.id;
              const isLast = index === DESTINATIONS.length - 1;

              return (
                <motion.div
                  key={dest.id}
                  onMouseEnter={() => isDesktop && setActiveId(dest.id)}
                  onMouseLeave={() => isDesktop && setActiveId(null)}
                  onClick={() =>
                    !isDesktop &&
                    setActiveId((current) => (current === dest.id ? null : dest.id))
                  }
                  animate={
                    isDesktop
                      ? {
                          width: isActive ? HOVER_WIDTH : BASE_WIDTH,
                          x: isActive && isLast ? -(HOVER_WIDTH - BASE_WIDTH) : 0,
                        }
                      : {
                          width: "100%",
                          height: isActive ? MOBILE_ACTIVE_HEIGHT : MOBILE_BASE_HEIGHT,
                          x: 0,
                        }
                  }
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full shrink-0 cursor-pointer overflow-hidden rounded-[2.5rem] shadow-lg sm:h-85 sm:w-auto sm:rounded-[2.5rem] lg:h-105"
                  style={{
                    width: isDesktop ? BASE_WIDTH : "100%",
                    height: isDesktop ? undefined : MOBILE_BASE_HEIGHT,
                  }}
                >
                  <motion.img
                    src={dest.image}
                    alt={dest.name}
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 12,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-x-4 bottom-4 flex items-center justify-center rounded-full border border-white/30 bg-white/15 px-5 py-3 text-center font-heading text-lg font-bold text-white shadow-lg backdrop-blur-md"
                  >
                    {dest.name}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <img
          src="/TopDestination/TopDestinationBottomPattern.svg"
          alt=""
          aria-hidden="true"
          className="absolute -bottom-px left-0 z-10 w-full select-none"
        />
      </div>

      <div className="mt-10 flex justify-center lg:mt-0">
        <Link
          href="/kashmir-tour-packages/"
          className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-8 py-4 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
        >
          Explore Packages
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
