"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Heart, Star, CloudSun, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { type PackageCard } from "@/components/home/TourCategories";

const ICON_GRADIENT_ID = "showcase-icon-gradient";

interface PackagesShowcaseRowProps {
  eyebrow: string;
  heading: ReactNode;
  subtitle?: string;
  packages: PackageCard[];
  /** Hub page this row belongs to, e.g. "/kashmir-tour-packages/from-delhi/" */
  ctaHref?: string;
  /** Anchor text for the hub link, e.g. "View all Delhi packages" */
  ctaLabel?: string;
}

/**
 * Shared internal layout for the city/theme package showcases — a heading
 * (eyebrow + gradient-highlighted title) above a single row of package cards
 * that always scrolls horizontally, on mobile and desktop alike. Not meant
 * to be used directly; see CityPackagesShowcase / ThemePackagesShowcase.
 */
export default function PackagesShowcaseRow({
  eyebrow,
  heading,
  subtitle,
  packages,
  ctaHref,
  ctaLabel = "View all packages",
}: PackagesShowcaseRowProps) {
  if (packages.length === 0) return null;

  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2.5 flex items-center justify-center gap-2.5 sm:justify-start">
              <div className="h-px w-8 bg-sky-500" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-sky-500">
                {eyebrow}
              </span>
            </div>
            <h2
              className="text-center font-heading font-bold leading-tight text-slate-900 sm:text-left"
              style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.2rem)" }}
            >
              {heading}
            </h2>
            {subtitle && (
              <p className="mt-2 text-center text-sm text-slate-400 sm:text-left">{subtitle}</p>
            )}
          </div>

          {ctaHref && (
            <Link
              href={ctaHref}
              className="group inline-flex shrink-0 items-center justify-center gap-2 self-center whitespace-nowrap rounded-full border-2 border-sky-500 px-6 py-2.5 text-sm font-semibold text-sky-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-500 hover:text-white sm:self-auto"
            >
              {ctaLabel}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          )}
        </div>
      </div>

      <div className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:gap-6 sm:px-6 lg:px-8">
        {packages.map((pkg, i) => (
          <ShowcaseCard key={pkg.id} pkg={pkg} index={i} />
        ))}
      </div>

      {/* Gradient referenced by the card action icons */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={ICON_GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}

function ShowcaseCard({ pkg, index }: { pkg: PackageCard; index: number }) {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // On touch the whole card is a link, so a tap navigates rather than
  // toggling — keep the panel open there so the details stay reachable.
  const expanded = isDesktop ? hovered : true;

  return (
    <article
      ref={ref}
      className={`w-72 shrink-0 snap-start transition-all duration-600 sm:w-80 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` }}
    >
      {/* Whole card is the link — the CTA is a styled span so we never nest
          interactive elements inside an anchor. */}
      <Link
        href={`/kashmir-tour-packages/${pkg.slug}/`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative block h-96 w-full overflow-hidden rounded-3xl shadow-lg"
      >
        <motion.div
          animate={{ scale: expanded ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={pkg.images[0]}
            alt={pkg.title}
            fill
            unoptimized
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        {/* Top-right action icons */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : -8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute right-4 top-4 flex gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
            <ImageIcon
              className="h-4 w-4"
              fill={`url(#${ICON_GRADIENT_ID})`}
              stroke={`url(#${ICON_GRADIENT_ID})`}
            />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
            <Heart
              className="h-4 w-4"
              fill={`url(#${ICON_GRADIENT_ID})`}
              stroke={`url(#${ICON_GRADIENT_ID})`}
            />
          </span>
        </motion.div>

        {/* Glass info panel */}
        <motion.div
          animate={{ height: expanded ? 184 : 92 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-3 bottom-3 overflow-hidden rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-md"
        >
          <h3 className="line-clamp-1 font-heading text-lg font-bold leading-none text-white">
            {pkg.title}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm text-white/80">
            {pkg.location}
            {pkg.idealFor ? ` · ${pkg.idealFor}` : ""}
          </p>

          <motion.div
            animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 8 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: expanded ? 0.15 : 0 }}
            className="mt-3"
          >
            <div className="flex items-center gap-4 text-xs font-medium text-white/90">
              <span className="flex items-center gap-1">
                <CloudSun className="h-3.5 w-3.5 fill-white text-white" />
                {pkg.days} {pkg.days === 1 ? "day" : "days"}
              </span>
              {!!pkg.rating && (
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-white text-white" />
                  {pkg.rating}
                </span>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="text-white">
                <span className="text-base font-bold">{pkg.price}</span>
                <span className="ml-1 text-xs text-white/70">/ Person</span>
              </div>

              <span className="group/cta flex shrink-0 items-center gap-1.5 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-2 text-xs font-semibold text-white shadow-md">
                <span className="transition-transform duration-400 group-hover/cta:-translate-x-0.5">
                  Book Now
                </span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-400 group-hover/cta:translate-x-1 group-hover/cta:-rotate-40" />
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Link>
    </article>
  );
}
