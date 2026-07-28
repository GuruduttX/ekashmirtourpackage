"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { THEMES } from "@/lib/themes";

/* ── Icons ───────────────────────────────────────────────── */
export const PinIcon = () => (
  <svg viewBox="0 0 12 14" fill="currentColor" className="w-2.5 h-3 shrink-0">
    <path d="M6 0a5 5 0 0 0-5 5c0 3.8 5 9 5 9s5-5.2 5-9A5 5 0 0 0 6 0zm0 6.8A1.8 1.8 0 1 1 6 3.2a1.8 1.8 0 0 1 0 3.6z" />
  </svg>
);
export const ClockIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3 h-3 shrink-0">
    <circle cx="7" cy="7" r="6" />
    <path d="M7 4v3l2 1.5" strokeLinecap="round" />
  </svg>
);
export const PeopleIcon = () => (
  <svg viewBox="0 0 18 14" fill="currentColor" className="w-3.5 h-3 shrink-0">
    <path d="M7 7a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0 1c-3.9 0-7 2-7 4.5V14h14v-1.5C14 10 10.9 8 7 8zM14.5 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1c-1.3 0-2.4.5-2.4.5 1.4.9 2.4 2.3 2.4 4v1H18v-1C18 7.8 16.4 6 14.5 6z" />
  </svg>
);
export const CheckIcon = () => (
  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0">
    <circle cx="8" cy="8" r="8" fill="#22C55E" />
    <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

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

const CARD_HEIGHT = "430px";

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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3" style={{ gridAutoRows: CARD_HEIGHT }}>
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
function TourCard({ pkg, index }: { pkg: PackageCard; index: number }) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl bg-white cursor-pointer transition-all duration-600 hover:-translate-y-1.5 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${(index % 3) * 90}ms`, border: "1px solid #e8f0f8", boxShadow: "0 4px 20px rgba(14,165,233,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}
    >
      {/* ── 5-image block ── */}
      <Link href={`/kashmir-tour-packages/${pkg.slug}/`}>
        <div className="flex overflow-hidden" style={{ height: "195px" }}>
          <div className="relative overflow-hidden" style={{ flex: "0 0 57%" }}>
            <Image src={pkg.images[0]} alt={pkg.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
            <div className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.6rem] font-bold text-white leading-none" style={{ background: "linear-gradient(120deg,#0284C7,#38BDF8)", boxShadow: "0 2px 10px rgba(14,165,233,0.55)" }}>
              {pkg.days} {pkg.days === 1 ? "Day" : "Days"}
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-0.5 pl-0.5 overflow-hidden" style={{ flex: "0 0 43%" }}>
            {pkg.images.slice(1).map((src, i) => (
              <div key={i} className="relative overflow-hidden">
                <Image src={src} alt="" fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
                {i === 3 && (
                  <div className="absolute inset-0 bg-black/38 flex items-center justify-center">
                    <span className="text-white text-[0.62rem] font-semibold tracking-wide">More +</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Link>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-slate-900 text-[0.92rem] leading-snug mb-3 line-clamp-2 group-hover:text-sky-700 transition-colors duration-200">
          {pkg.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3.5">
          <span className="flex items-center gap-1 text-[0.7rem] text-orange-500 font-medium"><PinIcon />{pkg.location}</span>
          <span className="flex items-center gap-1 text-[0.7rem] text-orange-500 font-medium"><ClockIcon />{pkg.days}-{pkg.days === 1 ? "day" : "days"}</span>
          <span className="flex items-center gap-1 text-[0.7rem] text-orange-500 font-medium"><PeopleIcon />{pkg.idealFor}</span>
        </div>
        <div className="h-px bg-slate-100 mb-3.5" />
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4">
          {pkg.inclusions.map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-[0.71rem] text-slate-600 font-medium">
              <CheckIcon /><span className="truncate">{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-3.5 flex items-center justify-between gap-2" style={{ borderTop: "1px solid #f1f5f9" }}>
          <div>
            <div className="text-[0.58rem] text-slate-400 uppercase tracking-widest leading-none mb-0.5">Starting from</div>
            <div className="font-bold text-[1.12rem] leading-none" style={{ color: "#0284C7" }}>{pkg.price}</div>
            {pkg.originalPrice && (
              <div className="text-slate-300 text-[0.65rem] line-through mt-0.5">{pkg.originalPrice}</div>
            )}
          </div>
          <Link href={`/kashmir-tour-packages/${pkg.slug}/`}>
            <button className="shrink-0 rounded-full px-5 py-2.5 text-[0.75rem] font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5" style={{ background: "linear-gradient(120deg,#0284C7,#38BDF8)", boxShadow: "0 3px 12px rgba(14,165,233,0.32)" }}>
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}
