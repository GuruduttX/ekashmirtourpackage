"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

interface TopTemple {
  name: string;
  templeType: string;
  location: string;
  description: string;
  image: string;
  alt: string;
  href: string;
}

// Lorem Picsum seed URLs — deterministic (same seed always returns the same
// photo) placeholders until each temple has a real CMS-uploaded image.
const TOP_TEMPLES: TopTemple[] = [
  {
    name: "Shankaracharya Temple",
    templeType: "Temple",
    location: "Srinagar",
    description:
      "Hilltop shrine to Lord Shiva with panoramic views over Dal Lake, about 243 steps from the base.",
    image: "https://picsum.photos/seed/shankaracharya-temple/600/450",
    alt: "Shankaracharya Temple steps leading to the hilltop shrine",
    href: "/temples/shankaracharya-temple",
  },
  {
    name: "Hazratbal Shrine",
    templeType: "Shrine",
    location: "Srinagar",
    description:
      "Revered mosque on the banks of Dal Lake, home to a relic believed to be from the Prophet Muhammad.",
    image: "https://picsum.photos/seed/hazratbal-shrine/600/450",
    alt: "Hazratbal Shrine dome and minaret beside Dal Lake",
    href: "/temples",
  },
  {
    name: "Amarnath Cave",
    templeType: "Cave Shrine",
    location: "Pahalgam / Baltal",
    description:
      "High-altitude ice lingam shrine and the centerpiece of the annual Amarnath Yatra pilgrimage.",
    image: "https://picsum.photos/seed/amarnath-cave/600/450",
    alt: "Amarnath Cave pilgrimage route through the mountains",
    href: "/temples",
  },
  {
    name: "Khanqah-e-Moula",
    templeType: "Shrine",
    location: "Srinagar",
    description:
      "Kashmir's oldest wooden mosque, famed for intricate papier-mâché and khatamband ceiling work.",
    image: "https://picsum.photos/seed/khanqah-e-moula/600/450",
    alt: "Khanqah-e-Moula wooden shrine architecture in Srinagar",
    href: "/temples",
  },
];

const revealEase: Easing = [0.16, 1, 0.3, 1];

/**
 * Mobile card heights — collapsed keeps all four cards inside one screen,
 * expanded makes room for the location, description and CTA.
 */
const MOBILE_COLLAPSED_H = 128;
const MOBILE_EXPANDED_H = 300;

function TopTempleCard({ temple }: { temple: TopTemple }) {
  const [expanded, setExpanded] = useState(false);
  // Starts true so the first paint uses the CSS height classes (no flash);
  // the effect corrects it before any interaction is possible.
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <motion.div
      onHoverStart={() => isDesktop && setExpanded(true)}
      onHoverEnd={() => isDesktop && setExpanded(false)}
      onClick={() => !isDesktop && setExpanded((prev) => !prev)}
      animate={
        isDesktop ? undefined : { height: expanded ? MOBILE_EXPANDED_H : MOBILE_COLLAPSED_H }
      }
      transition={{ duration: 0.7, ease: revealEase }}
      className="relative h-32 w-full cursor-pointer overflow-hidden rounded-2xl border border-sky-200/70 shadow-md shadow-black/10 sm:h-80"
    >
      <Image src={temple.image} alt={temple.alt} fill unoptimized className="object-cover" />

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/45 to-transparent px-4 pb-4 pt-6 sm:pt-10">
        <motion.p
          layout="position"
          transition={{ duration: 0.7, ease: revealEase }}
          className="text-base font-bold text-white sm:text-lg"
        >
          {temple.name}
        </motion.p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: revealEase }}
              className="overflow-hidden"
            >
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-sky-300">
                <MapPin className="h-3.5 w-3.5" /> {temple.templeType} · {temple.location}
              </p>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-200">
                {temple.description}
              </p>
              <Link
                href={temple.href}
                onClick={(e) => e.stopPropagation()}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 py-2 text-sm font-semibold text-white"
              >
                View Details <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function TopTemplesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-10 sm:px-6 lg:px-8">
      <Image
        src="/small-temple-left.png"
        alt=""
        width={160}
        height={160}
        unoptimized
        aria-hidden
        className="pointer-events-none absolute -top-1 left-1 w-12 sm:left-4 sm:w-24 lg:left-8 lg:w-40 hidden md:block"
      />
      <Image
        src="/small-temple-right.png"
        alt=""
        width={160}
        height={160}
        unoptimized
        aria-hidden
        className="pointer-events-none absolute -top-1 right-1 w-12 sm:right-4 sm:w-24 lg:right-8 lg:w-40 hidden md:block"
      />

      <h2 className="max-w-[calc(100%rem)] text-center font-heading text-[1.5rem] font-extrabold text-slate-900 sm:max-w-none sm:text-3xl lg:text-4xl">
        Top{" "}
        <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
          Temples and Shrines
        </span>
      </h2>

      <div className="mx-auto mt-4 grid max-w-6xl grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {TOP_TEMPLES.map((temple) => (
          <TopTempleCard key={temple.name} temple={temple} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="#all-temples"
          className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-8 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
        >
          Explore All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
