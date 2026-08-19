"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { THEMES } from "@/lib/themes";

/* ── Types ───────────────────────────────────────────────── */
export interface PackageCard {
  id: string | number;
  slug: string;
  title: string;
  days: number;
  location: string;
  idealFor: string;
  themes?: string[];
  inclusions: string[];
  price: string;
  originalPrice: string;
  images: string[];
  rating?: number;
}

/* ── Image pool (fallback for hardcoded data) ─────────────── */
const I = {
  mountain: "https://plus.unsplash.com/premium_photo-1697730277839-440df1a4415f?q=85&w=900&auto=format&fit=crop",
  houseboat: "https://plus.unsplash.com/premium_photo-1697730150003-26a1d469adb4?q=85&w=900&auto=format&fit=crop",
  meadow: "https://images.unsplash.com/photo-1584732200355-486a95263014?q=85&w=900&auto=format&fit=crop",
  valley: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=85&w=900&auto=format&fit=crop",
  glacier: "https://images.unsplash.com/photo-1627894485200-b92fb4353967?q=85&w=900&auto=format&fit=crop",
  river: "https://images.unsplash.com/photo-1614056965546-42fbe24eb36c?q=85&w=900&auto=format&fit=crop",
  road: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=85&w=900&auto=format&fit=crop",
  path: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=85&w=900&auto=format&fit=crop",
  snow: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=85&w=900&auto=format&fit=crop",
  valley2: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=85&w=900&auto=format&fit=crop",
};



const TABS = [
  "All",
  ...Array.from({ length: 10 }, (_, i) => `${i + 1} ${i === 0 ? "Day" : "Days"}`),
];

const THEME_TABS = ["All", ...THEMES];

/* ════════════════════════════════════════════════════════════
   SECTION
   ════════════════════════════════════════════════════════════ */
export default function TourCategories({
  packages: externalPackages,
}: {
  packages?: PackageCard[];
}) {
  const { ref: headRef, inView: headVisible } = useInView();
  const [activeTab, setActiveTab] = useState("All");
  const [activeTheme, setActiveTheme] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const [collapsedCount, setCollapsedCount] = useState(6);

  const PACKAGES = externalPackages ?? [];

  const filtered = PACKAGES.filter((p) => {
    const matchesDuration = activeTab === "All" || p.days === parseInt(activeTab);
    const matchesTheme = activeTheme === "All" || (p.themes ?? []).includes(activeTheme);
    return matchesDuration && matchesTheme;
  });

  useEffect(() => {
    const updateCollapsedCount = () => {
      if (window.innerWidth >= 1280) { setCollapsedCount(6); return; }
      if (window.innerWidth >= 640) { setCollapsedCount(4); return; }
      setCollapsedCount(2);
    };
    updateCollapsedCount();
    window.addEventListener("resize", updateCollapsedCount);
    return () => window.removeEventListener("resize", updateCollapsedCount);
  }, []);

  const hasMorePackages = filtered.length > collapsedCount;
  const visiblePackages = expanded ? filtered : filtered.slice(0, collapsedCount);

  return (
    <section className="py-10 lg:py-10 bg-white" id="tour-categories">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* ── Header ── */}
        <div ref={headRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <div className={`flex items-center justify-center md:justify-start gap-2.5 mb-3 transition-all duration-700 ${headVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}`}>
              <div className="h-px w-8 bg-sky-500" />
              <span className="text-sky-500 text-[0.68rem] font-semibold tracking-[0.28em] uppercase">Browse by Duration</span>
              <div className="h-px w-8 bg-sky-500" />
            </div>
            <h2
              className={`font-heading font-bold text-center md:text-start text-slate-900 leading-none sm:whitespace-nowrap transition-all duration-700 delay-100 ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ fontSize: "clamp(1.6rem, 3.8vw, 2.8rem)" }}
            >
              Find Your{" "}
              <span style={{ background: "linear-gradient(120deg, #0284C7 0%, #0EA5E9 45%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Perfect Package
              </span>
            </h2>
          </div>
          <p className={`text-slate-400 text-sm text-center md:text-start leading-relaxed sm:max-w-[230px] sm:text-right transition-all duration-700 delay-200 ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            Filter by trip length and discover the Kashmir experience that fits your schedule.
          </p>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="-mx-6 px-6 sm:mx-0 sm:px-0 mb-5 md:mb-10 overflow-x-auto scroll-hide sm:overflow-visible pt-3 pb-1">
          <div className="flex gap-3 sm:w-full">
            {TABS.map((tab) => {
              const active = tab === activeTab;
              const isAll = tab === "All";
              const num = isAll ? null : parseInt(tab);
              const dayLabel = num === 1 ? "Day" : "Days";
              return (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setExpanded(false); }}
                  className="min-w-21 sm:min-w-0 sm:flex-1 flex flex-row items-center justify-center gap-1.5 rounded-2xl transition-all duration-300 select-none relative overflow-hidden cursor-pointer group/tab"
                  style={{
                    height: "68px",
                    ...(active
                      ? { background: "linear-gradient(145deg, #075985 0%, #0284C7 40%, #0EA5E9 75%, #38BDF8 100%)", boxShadow: "0 10px 32px rgba(14,165,233,0.55), 0 4px 12px rgba(2,132,199,0.35), inset 0 1px 0 rgba(255,255,255,0.25)", transform: "translateY(-4px) scale(1.03)", border: "1px solid rgba(125,211,252,0.4)" }
                      : { background: "linear-gradient(160deg, #FFFFFF 0%, #F0F9FF 60%, #E0F2FE 100%)", border: "1.5px solid rgba(125,211,252,0.55)", boxShadow: "0 3px 12px rgba(56,189,248,0.14), 0 1px 3px rgba(0,0,0,0.05)", transform: "translateY(0) scale(1)" }),
                  }}
                >
                  <span className="absolute top-0 left-3 right-3 h-px rounded-full" style={{ background: active ? "rgba(255,255,255,0.50)" : "rgba(186,230,253,0.80)" }} />
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300" style={{ width: active ? "20px" : "4px", height: "3px", background: active ? "rgba(255,255,255,0.65)" : "rgba(125,211,252,0.7)" }} />
                  {isAll ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-5" style={{ color: active ? "rgba(255,255,255,0.95)" : "#0EA5E9" }}>
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" strokeLinejoin="round" />
                      </svg>
                      <span className="font-bold tracking-widest uppercase" style={{ fontSize: "0.8rem", color: active ? "#fff" : "#0284C7" }}>All</span>
                    </>
                  ) : (
                    <>
                      <span className="font-black leading-none tabular-nums" style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)", color: active ? "#fff" : "#0369A1", textShadow: active ? "0 2px 8px rgba(7,89,133,0.40)" : "none" }}>{num}</span>
                      <span className="font-bold leading-none" style={{ fontSize: "0.8rem", color: active ? "rgba(255,255,255,0.95)" : "#0369A1" }}>{dayLabel}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Theme Pills (mobile/tablet — horizontally scrollable, below duration filters) ── */}
        <div className="-mx-6 px-6 mb-8 overflow-x-auto scroll-hide pt-1 pb-1 lg:hidden">
          <div className="flex gap-2.5">
            {THEME_TABS.map((theme) => {
              const active = theme === activeTheme;
              return (
                <button
                  key={theme}
                  onClick={() => { setActiveTheme(theme); setExpanded(false); }}
                  className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer"
                  style={
                    active
                      ? { background: "linear-gradient(120deg,#0284C7,#38BDF8)", color: "#fff", boxShadow: "0 4px 14px rgba(14,165,233,0.32)" }
                      : { background: "#F0F9FF", color: "#0369A1", border: "1px solid rgba(125,211,252,0.55)" }
                  }
                >
                  {theme}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8 lg:items-start">
          {/* ── Theme Sidebar (desktop only) ── */}
          <aside className="hidden lg:block lg:sticky lg:top-24">
            <p className="text-slate-400 text-[0.68rem] font-semibold tracking-[0.2em] uppercase mb-3">
              Filter by Theme
            </p>
            <div className="flex flex-wrap gap-2">
              {THEME_TABS.map((theme) => {
                const active = theme === activeTheme;
                return (
                  <button
                    key={theme}
                    onClick={() => { setActiveTheme(theme); setExpanded(false); }}
                    className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer"
                    style={
                      active
                        ? { background: "linear-gradient(120deg,#0284C7,#38BDF8)", color: "#fff", boxShadow: "0 4px 14px rgba(14,165,233,0.32)" }
                        : { background: "#F0F9FF", color: "#0369A1", border: "1px solid rgba(125,211,252,0.55)" }
                    }
                  >
                    {theme}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ── Cards Grid ── */}
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <div className="text-4xl mb-3">🏔</div>
              <p className="text-slate-400 text-sm">No packages found for this filter.</p>
            </div>
          ) : (
            <div>
              {/* Card height now comes from the card's own aspect ratio rather
                  than a fixed row height — the photo fills the whole card, so a
                  hard 430px would letterbox it at some column widths. */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visiblePackages.map((pkg, i) => (
                  <TourCard key={pkg.id} pkg={pkg} index={i} />
                ))}
              </div>
              {hasMorePackages && (
                <div className={`z-20 mt-8 flex justify-center ${expanded ? "sticky bottom-4" : ""}`}>
                  <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: "linear-gradient(120deg,#0284C7,#38BDF8)", boxShadow: expanded ? "0 8px 24px rgba(14,165,233,0.28)" : "0 5px 18px rgba(14,165,233,0.22)" }}
                  >
                    {expanded ? "View Less" : "View More"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CARD
   ════════════════════════════════════════════════════════════ */

/**
 * Package card for the duration/theme grid.
 *
 * REDESIGNED AFTER StayCard (src/components/stays/StayCard.tsx), and it works
 * the same way on purpose — the two are the site's archive cards and a reader
 * moving between /stays and /kashmir-tour-packages should not have to learn a
 * second set of gestures. What it borrows: the photo fills the whole card, a
 * black gradient across the bottom carries the text (so it stays readable over
 * any photo without a glass panel), swipe to page photos below lg, glass arrows
 * on hover from lg, dots that are tappable at every size.
 *
 * What replaced the old design: a fixed 5-up image mosaic. That mosaic assumed
 * exactly five photos — it sliced `images[1..]` into a 2×2 and hard-coded a
 * "More +" badge onto the fourth — so a package with two photos rendered a grid
 * of holes and one with six silently dropped the sixth. This pages through
 * however many there are, and hides the paging entirely for a single photo.
 *
 * EVERY FIELD IS DYNAMIC and every optional one is gated: the rating badge only
 * appears above zero, the strike-through only when there is a real original
 * price, the inclusion pills only when the package has inclusions, and the
 * photo controls only with more than one photo. A package with a thin record
 * renders a clean card rather than empty furniture.
 *
 * The card is one link (whole surface); the arrows, dots and a completed swipe
 * all suppress the click so paging never navigates.
 */
function TourCard({ pkg, index }: { pkg: PackageCard; index: number }) {
  const { ref, inView } = useInView();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const href = `/kashmir-tour-packages/${pkg.slug}/`;

  // A record can arrive with no photos at all; one empty slide keeps the
  // carousel's arithmetic honest and lets the fallback tile render.
  const slides = pkg.images.length ? pkg.images : [""];
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  const paginate = (step: number) => {
    setDirection(step);
    setSlide((prev) => (prev + step + slides.length) % slides.length);
  };

  // --- Touch swipe over the photo (mobile) -------------------------------
  // The swipe surface carries `touch-pan-y`, which tells the browser only
  // vertical panning may scroll an ancestor — so a horizontal drag pages the
  // photo instead of fighting the page scroll.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);

  const SWIPE_MIN_PX = 40;

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (slides.length < 2) return;
    // Horizontal intent only, so a vertical page scroll never pages photos.
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;

    didSwipe.current = true;
    paginate(dx < 0 ? 1 : -1);
  };

  // The surface sits above the card-wide <Link>, so it owns its own taps. The
  // real <Link> stays in the DOM underneath for crawlers and keyboard users.
  const handleSurfaceClick = () => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }
    router.push(href);
  };

  const offset = reduceMotion ? 0 : 40;
  const dayLabel = pkg.days === 1 ? "Day" : "Days";
  const hasRating = typeof pkg.rating === "number" && pkg.rating > 0;

  return (
    <article
      ref={ref}
      className={`group relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-sky-100 shadow-md shadow-sky-100/70 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-200/70 sm:rounded-3xl ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
    >
      {/* ---------- Image layer ---------- */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={slide}
            custom={direction}
            initial={{ opacity: 0, x: direction * offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -offset }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {!slides[slide] || failed[slide] ? (
              // Missing or broken photo — the title on a wash beats a grey box.
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-sky-200 via-sky-100 to-cyan-100">
                <span className="px-6 text-center font-heading text-xl font-bold text-sky-700/70">
                  {pkg.title}
                </span>
              </div>
            ) : (
              <Image
                src={slides[slide]}
                alt={`${pkg.title} — photo ${slide + 1}`}
                fill
                unoptimized
                sizes="(max-width: 640px) 92vw, (max-width: 1280px) 46vw, 31vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => setFailed((prev) => ({ ...prev, [slide]: true }))}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Light top scrim so the duration chip and dots stay legible */}
        <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-slate-950/45 to-transparent" />

        {/* Solid black backdrop across the bottom — carries the info text on
            any photo, so the panel itself needs no glass. */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      {/* Whole-card link sits under the controls so the card is one tap target */}
      <Link
        href={href}
        className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 sm:rounded-3xl"
      >
        <span className="sr-only">View {pkg.title}</span>
      </Link>

      {/* Swipe surface — photo area only, mobile only. */}
      <div
        aria-hidden="true"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleSurfaceClick}
        className="absolute inset-x-0 top-0 z-15 h-2/5 touch-pan-y lg:hidden"
      />

      {/* ---------- Duration chip + rating ---------- */}
      <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          <Clock className="h-3.5 w-3.5" />
          {pkg.days} {dayLabel}
        </span>

        {/* Only above zero — a "0.0" badge advertises a package nobody rated. */}
        {hasRating && (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/15 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {pkg.rating!.toFixed(1)}
          </span>
        )}
      </div>

      {/* ---------- Carousel arrows (glass) + dots ---------- */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.preventDefault();
              paginate(-1);
            }}
            className="absolute left-3 top-2/5 z-20 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/15 p-2 text-white shadow-sm backdrop-blur-md transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:block lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.preventDefault();
              paginate(1);
            }}
            className="absolute right-3 top-2/5 z-20 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/15 p-2 text-white shadow-sm backdrop-blur-md transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:block lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5">
            {slides.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                aria-label={`Photo ${dotIndex + 1} of ${slides.length}`}
                aria-current={dotIndex === slide}
                onClick={(event) => {
                  event.preventDefault();
                  setDirection(dotIndex > slide ? 1 : -1);
                  setSlide(dotIndex);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  dotIndex === slide
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* ---------- Bottom info panel ---------- */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4">
        <h3 className="line-clamp-2 font-heading text-lg font-bold leading-snug text-white">
          {pkg.title}
        </h3>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-200">
          <span className="flex min-w-0 items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{pkg.location}</span>
          </span>
          {pkg.idealFor && (
            <span className="flex min-w-0 items-center gap-1.5">
              <Users className="h-4 w-4 shrink-0" />
              <span className="truncate">{pkg.idealFor}</span>
            </span>
          )}
        </div>

        {/* Inclusions — scroll sideways, never wrap to a second line, so a
            package with six of them cannot push the price off the card. */}
        {pkg.inclusions.length > 0 && (
          <div className="no-scrollbar pointer-events-auto mt-3 flex snap-x flex-nowrap items-center gap-1.5 overflow-x-auto">
            {pkg.inclusions.map((item) => (
              <span
                key={item}
                className="inline-flex shrink-0 snap-start items-center gap-1 whitespace-nowrap rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white"
              >
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-3 flex items-end justify-between gap-2 border-t border-white/20 pt-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-slate-300">
              Starting from
            </p>
            <p className="font-heading text-xl font-bold leading-none text-white">
              {pkg.price}
              {/* Only with a real "was" price behind it. */}
              {pkg.originalPrice && (
                <span className="ml-2 text-xs font-medium text-slate-400 line-through">
                  {pkg.originalPrice}
                </span>
              )}
            </p>
          </div>

          <Link
            href={href}
            className="pointer-events-auto relative z-30 inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/30 transition-transform hover:-translate-y-0.5"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
