"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";

const CAROUSEL_PACKAGES = [
  {
    id: 1,
    title: "Gulmarg Snow Retreat",
    duration: "6 days & 5 nights",
    originalPrice: "₹42,999",
    price: "₹32,999",
    tag: "Most Popular",
    tagBg: "rgba(14,165,233,0.92)",
    image:
      "https://plus.unsplash.com/premium_photo-1697730277839-440df1a4415f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Dal Lake Houseboat Escape",
    duration: "5 days & 4 nights",
    originalPrice: "₹34,499",
    price: "₹24,999",
    tag: "Romantic",
    tagBg: "rgba(244,63,94,0.92)",
    image:
      "https://plus.unsplash.com/premium_photo-1697730150003-26a1d469adb4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Pahalgam Valley Trek",
    duration: "7 days & 6 nights",
    originalPrice: "₹48,999",
    price: "₹38,499",
    tag: "Adventure",
    tagBg: "rgba(16,185,129,0.92)",
    image:
      "https://images.unsplash.com/photo-1584732200355-486a95263014?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Kashmir Grand Circuit",
    duration: "9 days & 8 nights",
    originalPrice: "₹68,999",
    price: "₹54,999",
    tag: "Premium",
    tagBg: "rgba(245,158,11,0.92)",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "Sonamarg Glacier Tour",
    duration: "4 days & 3 nights",
    originalPrice: "₹22,999",
    price: "₹17,499",
    tag: "Scenic",
    tagBg: "rgba(139,92,246,0.92)",
    image:
      "https://images.unsplash.com/photo-1627894485200-b92fb4353967?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    title: "Betaab Valley Explorer",
    duration: "5 days & 4 nights",
    originalPrice: "₹29,999",
    price: "₹21,999",
    tag: "Cultural",
    tagBg: "rgba(234,88,12,0.92)",
    image:
      "https://images.unsplash.com/photo-1614056965546-42fbe24eb36c?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Three copies so the user can scroll freely in both directions
const tripled = [
  ...CAROUSEL_PACKAGES,
  ...CAROUSEL_PACKAGES,
  ...CAROUSEL_PACKAGES,
];

export default function FeaturedPackages() {
  const { ref: headRef, inView: headVisible } = useInView();

  const trackRef   = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);
  const isPaused   = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStart  = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Start at the middle set so there is room to scroll left AND right
    const setWidth = () => el.scrollWidth / 3;
    el.scrollLeft = setWidth();

    // Seamless boundary reset — fires for both auto-scroll and manual drag/touch
    const onScroll = () => {
      const sw = setWidth();
      if (el.scrollLeft >= sw * 2) el.scrollLeft -= sw;
      else if (el.scrollLeft <= 0) el.scrollLeft += sw;
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    // Time-based auto-scroll (frame-rate independent)
    let last = 0;
    const SPEED = 52; // px/s
    const tick = (now: number) => {
      const dt = last ? (now - last) / 1000 : 0;
      last = now;
      if (!isPaused.current) el.scrollLeft += SPEED * dt;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ── Mouse drag handlers (desktop) ── */
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    isPaused.current   = true;
    dragStartX.current = e.pageX;
    dragStart.current  = trackRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    trackRef.current.scrollLeft = dragStart.current + (dragStartX.current - e.pageX);
  };
  const stopDrag = () => {
    isDragging.current = false;
    isPaused.current   = false;
  };

  return (
    <section id="packages" className="pt-28 pb-5 lg:pt-36 lg:pb-8 overflow-hidden bg-sky-50">

      {/* ── Section Header — one row ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <div
          ref={headRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5"
        >
          {/* Left: overline + heading (single line) */}
          <div>
            <div
              className={`flex items-center gap-2.5 mb-3 transition-all duration-700 ${
                headVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
              }`}
            >
              <div className="h-px w-8 bg-sky-500" />
              <span className="text-sky-500 text-[0.68rem] font-semibold tracking-[0.28em] uppercase">
                Curated Experiences
              </span>
              <div className="h-px w-8 bg-sky-500" />
            </div>

            <h2
              className={`font-heading font-bold text-slate-900 leading-none sm:whitespace-nowrap transition-all duration-700 delay-100 ${
                headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ fontSize: "clamp(1.6rem, 3.8vw, 2.8rem)" }}
            >
              Our Signature{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #0284C7 0%, #0EA5E9 45%, #38BDF8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Kashmir Packages
              </span>
            </h2>
          </div>

          {/* Right: description */}
          <p
            className={`text-slate-400 text-sm leading-relaxed sm:max-w-[230px] sm:text-right transition-all duration-700 delay-200 ${
              headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Each journey designed not just to show you Kashmir — but to let
            Kashmir quietly change you.
          </p>
        </div>
      </div>

      {/* ── Infinite Carousel ── */}
      <div className="relative">
        {/* Edge fade — left (desktop only) */}
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-linear-to-r from-sky-50 to-transparent" />
        {/* Edge fade — right (desktop only) */}
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-linear-to-l from-sky-50 to-transparent" />

        {/* Scrollable track — native touch scroll on mobile, mouse-drag on desktop */}
        <div
          ref={trackRef}
          className="scroll-hide overflow-x-auto cursor-grab active:cursor-grabbing select-none"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          <div className="flex gap-6 w-max pb-4 pl-6 lg:pl-12 pr-6">
            {tripled.map((pkg, i) => (
              <PackageCard key={`${pkg.id}-${i}`} pkg={pkg} />
            ))}
          </div>
        </div>
      </div>

      {/* ── View All CTA ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 text-center">
        <Link
          href="package"
          className="inline-flex items-center gap-2.5 rounded-full px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(120deg, #0284C7 0%, #38BDF8 100%)",
            boxShadow: "0 4px 22px rgba(14,165,233,0.40)",
          }}
        >
          View All Packages
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}

function PackageCard({
  pkg,
}: {
  pkg: (typeof CAROUSEL_PACKAGES)[number];
}) {
  return (
    <article
      className="group relative shrink-0 rounded-3xl overflow-hidden cursor-pointer"
      style={{
        width: "340px",
        height: "500px",
        boxShadow:
          "0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
      }}
    >
      {/* Card image — unoptimized so Next.js doesn't re-compress Unsplash's CDN images */}
      <Image
        src={pkg.image}
        alt={pkg.title}
        fill
        unoptimized
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
      />

      {/* Dark gradient — heavier at bottom */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

      {/* Tag pill */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className="text-white text-[0.62rem] font-semibold px-3 py-1 rounded-full"
          style={{
            background: pkg.tagBg,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {pkg.tag}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <h3 className="text-white font-bold text-[1.02rem] leading-snug mb-0.5 truncate">
          {pkg.title}
        </h3>
        <p className="text-white/50 text-[0.7rem] mb-3">{pkg.duration}</p>

        {/* Divider */}
        <div
          className="mb-3 h-px"
          style={{ background: "rgba(255,255,255,0.15)" }}
        />

        {/* Price + button row */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-white/40 text-[0.65rem] line-through block leading-none">
              {pkg.originalPrice}
            </span>
            <span className="text-white font-bold text-[1.22rem] leading-tight">
              {pkg.price}
            </span>
          </div>

          <button
            className="shrink-0 rounded-full bg-white px-4 py-2 text-[0.72rem] font-semibold text-slate-900 transition-all duration-200 hover:bg-sky-50 hover:shadow-md"
          >
            Get Quotes
          </button>
        </div>
      </div>
    </article>
  );
}
