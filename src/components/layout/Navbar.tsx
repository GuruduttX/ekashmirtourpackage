"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, NAV_SERVICES } from "@/lib/constants";

/* ── Brand icon ─────────────────────────────────────────── */
function MountainIcon() {
  return (
    <svg width="30" height="24" viewBox="0 0 28 22" fill="none" aria-hidden="true">
      <path d="M10 14 L16 4 L22 14Z" fill="#1E3A5F" />
      <path d="M16 4 L18.5 9 L13.5 9Z" fill="#93C5FD" opacity="0.9" />
      <path d="M0 20 L8 8 L16 20Z" fill="#3B82F6" opacity="0.85" />
      <path d="M8 8 L11 13.5 L5 13.5Z" fill="#DBEAFE" opacity="0.95" />
      <path d="M0 20 L28 20" stroke="#3B82F6" strokeWidth="1.2" strokeOpacity="0.4" />
    </svg>
  );
}

/* ── Package data for dropdown ──────────────────────────── */
const DROPDOWN_PACKAGES = [
  {
    key: "5-6",
    title: "Gulmarg Snow Retreat",
    duration: "5 Nights · 6 Days",
    location: "Gulmarg",
    price: "₹32,999",
    tag: "Most Popular",
    tagColor: "#38BDF8",
    rating: 4.9,
    reviews: 186,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "4-5",
    title: "Dal Lake Houseboat",
    duration: "4 Nights · 5 Days",
    location: "Srinagar",
    price: "₹24,999",
    tag: "Romantic",
    tagColor: "#F472B6",
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "6-7",
    title: "Pahalgam Valley Trek",
    duration: "6 Nights · 7 Days",
    location: "Pahalgam",
    price: "₹38,499",
    tag: "Adventure",
    tagColor: "#34D399",
    rating: 4.9,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
  },
  {
    key: "8-9",
    title: "Kashmir Grand Circuit",
    duration: "8 Nights · 9 Days",
    location: "Full Kashmir",
    price: "₹54,999",
    tag: "Premium",
    tagColor: "#FBBF24",
    rating: 5.0,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
  },
];

const DURATION_FILTERS = [
  { key: "all", label: "All Days Package", count: 4 },
  { key: "4-5", label: "4 – 5 Days Package", count: 1 },
  { key: "5-6", label: "5 – 6 Days Package", count: 1 },
  { key: "6-7", label: "6 – 7 Days Package", count: 1 },
  { key: "8-9", label: "8 – 9 Days Package", count: 1 },
];

const DESTINATIONS = ["All Cities", "Gulmarg", "Srinagar", "Pahalgam", "Sonamarg"];

/* ══════════════════════════════════════════════════════════
   PACKAGES MEGA DROPDOWN
   ══════════════════════════════════════════════════════════ */
function PackagesDropdown({ onClose }: { onClose: () => void }) {
  const [activeDuration, setActiveDuration] = useState("all");
  const [activeCity, setActiveCity] = useState("All Cities");

  const filtered = DROPDOWN_PACKAGES.filter((p) => {
    const durationOk = activeDuration === "all" || p.key === activeDuration;
    const cityOk = activeCity === "All Cities" || p.location === activeCity;
    return durationOk && cityOk;
  });

  const visible = filtered.length ? filtered : DROPDOWN_PACKAGES.slice(0, 2);

  return (
    <div
      className="fixed z-[200] overflow-hidden rounded-2xl"
      style={{
        top: "72px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "880px",
        maxWidth: "calc(100vw - 2rem)",
        background: "rgba(6,14,35,0.97)",
        backdropFilter: "blur(36px)",
        WebkitBackdropFilter: "blur(36px)",
        border: "1px solid rgba(56,189,248,0.20)",
        boxShadow: "0 28px 70px rgba(4,10,28,0.75), 0 0 0 1px rgba(56,189,248,0.06)",
      }}
    >
      {/* ── Top sky-blue gradient accent line ── */}
      <div
        className="h-0.5 w-full"
        style={{ background: "linear-gradient(90deg, transparent 0%, #0EA5E9 25%, #38BDF8 50%, #93C5FD 70%, transparent 100%)" }}
      />

      {/* ── Deal header bar ── */}
      <div
        className="flex items-center justify-between px-5 py-2.5"
        style={{
          background: "linear-gradient(90deg, rgba(2,106,167,0.45) 0%, rgba(14,165,233,0.28) 50%, rgba(56,189,248,0.18) 100%)",
          borderBottom: "1px solid rgba(56,189,248,0.14)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sky-400 text-[0.72rem] font-bold">✦</span>
          <span className="text-[0.75rem] font-semibold tracking-wide text-white">
            Exclusive Deals — Up to 30% Off on Selected Packages
          </span>
        </div>
        <div className="flex items-center gap-5">
          {[
            { label: "Best Rated", value: "4.9 ★" },
            { label: "Destinations", value: "4 +" },
            { label: "Travelers", value: "4K +" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1.5 text-[0.7rem]">
              <span className="text-white/50">{s.label}</span>
              <span className="font-bold text-sky-300">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex" style={{ minHeight: "330px" }}>

        {/* Left: Duration filters */}
        <div
          className="flex w-[210px] shrink-0 flex-col py-4"
          style={{ borderRight: "1px solid rgba(56,189,248,0.10)" }}
        >
          <p className="mb-2 px-4 text-[0.58rem] font-bold tracking-[0.22em] text-sky-400/60 uppercase">
            Duration
          </p>
          {DURATION_FILTERS.map((f) => {
            const active = activeDuration === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveDuration(f.key)}
                className="flex items-center justify-between px-4 py-2.5 text-left transition-all duration-150"
                style={{
                  background: active ? "rgba(56,189,248,0.12)" : "transparent",
                  borderLeft: active ? "3px solid #38BDF8" : "3px solid transparent",
                }}
              >
                <span
                  className="text-[0.78rem] font-medium"
                  style={{ color: active ? "#7DD3FC" : "rgba(255,255,255,0.55)" }}
                >
                  {f.label}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[0.6rem] font-bold"
                  style={{
                    background: active ? "#0EA5E9" : "rgba(255,255,255,0.08)",
                    color: active ? "white" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: City chips + package cards */}
        <div className="flex flex-1 flex-col p-4">

          {/* City chips */}
          <div className="mb-3.5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[0.6rem] font-semibold tracking-widest text-sky-400/60 uppercase">
              🌍 Destination
            </span>
            {DESTINATIONS.map((city) => {
              const active = activeCity === city;
              return (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className="rounded-full px-3 py-1 text-[0.7rem] font-medium transition-all duration-150"
                  style={{
                    background: active ? "linear-gradient(135deg, #0EA5E9, #38BDF8)" : "rgba(255,255,255,0.06)",
                    color: active ? "white" : "rgba(255,255,255,0.55)",
                    border: active ? "1px solid rgba(56,189,248,0.50)" : "1px solid rgba(255,255,255,0.10)",
                    boxShadow: active ? "0 4px 12px rgba(14,165,233,0.35)" : "none",
                  }}
                >
                  {city}
                </button>
              );
            })}
          </div>

          {/* Package cards */}
          <div className="grid flex-1 gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {visible.slice(0, 2).map((pkg) => (
              <Link
                key={pkg.key}
                href="/package/slug"
                onClick={onClose}
                className="group overflow-hidden rounded-xl transition-all duration-250 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  boxShadow: "0 2px 12px rgba(4,10,28,0.30)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid rgba(56,189,248,0.40)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(14,165,233,0.22)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(56,189,248,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.09)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(4,10,28,0.30)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                }}
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="320px"
                  />
                  {/* Dark gradient over image bottom */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 40%, rgba(6,14,35,0.65) 100%)" }}
                  />
                  {/* Tag */}
                  <span
                    className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[0.6rem] font-bold text-white"
                    style={{ background: pkg.tagColor, boxShadow: `0 2px 10px ${pkg.tagColor}60` }}
                  >
                    {pkg.tag}
                  </span>
                  {/* Rating */}
                  <div
                    className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full px-2 py-0.5"
                    style={{ background: "rgba(6,14,35,0.75)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <span className="text-[0.58rem] text-amber-400">★</span>
                    <span className="text-[0.63rem] font-semibold text-white">{pkg.rating}</span>
                    <span className="text-[0.58rem] text-white/50">({pkg.reviews})</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-3">
                  <h4 className="mb-1.5 text-[0.82rem] font-semibold text-white leading-tight">
                    {pkg.title}
                  </h4>
                  <div className="mb-2.5 flex items-center gap-3 text-[0.66rem] text-white/40">
                    <span className="flex items-center gap-1">⏱ {pkg.duration}</span>
                    <span className="flex items-center gap-1">📍 {pkg.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[0.6rem] text-white/35">Starting from</div>
                      <div
                        className="text-[0.92rem] font-bold"
                        style={{ color: "#38BDF8" }}
                      >
                        {pkg.price}
                      </div>
                    </div>
                    <span
                      className="rounded-lg px-3 py-1.5 text-[0.7rem] font-semibold text-white transition-all"
                      style={{
                        background: "linear-gradient(135deg, #0EA5E9, #38BDF8)",
                        boxShadow: "0 2px 10px rgba(14,165,233,0.40)",
                      }}
                    >
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA bar ── */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ borderTop: "1px solid rgba(56,189,248,0.12)" }}
      >
        <Link
          href="#packages"
          onClick={onClose}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-[0.82rem] font-semibold text-white transition-all hover:brightness-110"
          style={{
            background: "linear-gradient(90deg, #0284C7 0%, #0EA5E9 50%, #38BDF8 100%)",
            boxShadow: "0 4px 16px rgba(14,165,233,0.40)",
          }}
        >
          🔍 Explore All Packages →
        </Link>
        <button
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-[0.82rem] font-semibold text-sky-300 transition-all hover:bg-sky-400/10"
          style={{ border: "1px solid rgba(56,189,248,0.30)" }}
        >
          🔥 Hot Deals
        </button>
      </div>

      {/* ── Trust footer strip ── */}
      <div
        className="flex items-center justify-around px-5 py-2.5"
        style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(56,189,248,0.08)" }}
      >
        {[
          { icon: "✓", label: "Free Cancellation" },
          { icon: "💳", label: "Easy EMI" },
          { icon: "🎧", label: "24 / 7 Support" },
        ].map((t) => (
          <div key={t.label} className="flex items-center gap-1.5">
            <span className="text-sky-400 text-sm">{t.icon}</span>
            <span className="text-[0.67rem] font-medium text-white/45">{t.label}</span>
          </div>
        ))}
        <div className="text-[0.67rem] text-sky-400/80">
          Need help? <span className="cursor-pointer font-semibold text-sky-400 underline underline-offset-2">Talk to us →</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SERVICES DROPDOWN
   ══════════════════════════════════════════════════════════ */
function ServicesDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] rounded-2xl overflow-hidden z-50"
      style={{
        background: "rgba(6,14,35,0.97)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "1px solid rgba(56,189,248,0.22)",
        boxShadow:
          "0 24px 60px rgba(4,10,28,0.70), 0 0 0 1px rgba(56,189,248,0.08)",
      }}
    >
      <div
        className="h-0.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #38BDF8 30%, #93C5FD 60%, transparent)",
        }}
      />
      <div className="p-5">
        <p className="text-[0.6rem] font-semibold tracking-[0.28em] text-sky-400/70 uppercase mb-4 px-1">
          What We Offer
        </p>
        <div className="grid grid-cols-2 gap-2">
          {NAV_SERVICES.map((svc) => (
            <Link
              key={svc.title}
              href="/services"
              onClick={onClose}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(56,189,248,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(56,189,248,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.06)";
              }}
            >
              <span className="text-xl leading-none">{svc.icon}</span>
              <div>
                <div className="text-[0.78rem] font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {svc.title}
                </div>
                <div className="text-[0.65rem] text-white/40 leading-tight mt-0.5">
                  {svc.desc}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 border-t border-white/6 pt-3 flex items-center justify-between">
          <span className="text-[0.68rem] text-white/35">
            All services customisable for your trip
          </span>
          <Link
            href="#contact"
            onClick={onClose}
            className="text-[0.72rem] font-medium text-sky-400 hover:text-sky-300 transition-colors"
          >
            Talk to us →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 140);
  };

  const closeDropdown = () => setActiveDropdown(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Main bar ── */}
      <div
        className={`transition-all duration-500 ${scrolled ? "shadow-2xl shadow-black/50" : "shadow-lg shadow-black/20"}`}
        style={{
          background: scrolled ? "rgba(6,14,35,0.98)" : "rgba(5,12,26,0.84)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderBottom: scrolled ? "1px solid rgba(56,189,248,0.22)" : "1px solid rgba(56,189,248,0.12)",
        }}
      >
        <nav className="mx-auto flex h-[70px] max-w-8xl items-center px-6 lg:px-12 justify-between">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 bg-white rounded-full px-5">
            <Image
              src="/Experience_my_India.webp"
              width={120}
              height={120}
              alt="Experience My India Website Logo"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const hasDropdown = link.dropdown !== null;
              const isActive = hasDropdown && activeDropdown === link.dropdown;

              return (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && openDropdown(link.dropdown!)}
                  onMouseLeave={() => hasDropdown && scheduleClose()}
                >
                  <Link
                    href={link.href}
                    className={`group relative flex items-center gap-1 rounded-lg px-3 py-2 text-[0.83rem] font-medium tracking-wide transition-all duration-200 ${isActive ? "bg-sky-500/12 text-sky-400" : "text-white hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    {link.label}
                    {hasDropdown && (
                      <svg
                        className={`h-3 w-3 transition-transform duration-200 ${isActive ? "rotate-180 text-sky-400" : "text-white/35"}`}
                        viewBox="0 0 12 12" fill="currentColor"
                      >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {!hasDropdown && (
                      <span className="absolute -bottom-0.5 left-3 right-3 h-px scale-x-0 rounded-full bg-sky-400 transition-transform duration-300 group-hover:scale-x-100" />
                    )}
                  </Link>

                  {/* Dropdown panels */}
                  {isActive && link.dropdown === "packages" && (
                    <div
                      onMouseEnter={() => openDropdown("packages")}
                      onMouseLeave={scheduleClose}
                    >
                      <PackagesDropdown onClose={closeDropdown} />
                    </div>
                  )}
                  {isActive && link.dropdown === "services" && (
                    <div
                      onMouseEnter={() => openDropdown("services")}
                      onMouseLeave={scheduleClose}
                    >
                      <ServicesDropdown onClose={closeDropdown} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop right */}
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <Link
              href="/package"
              className="rounded-4xl px-5 py-2.5 text-[0.83rem] font-semibold text-white transition-all duration-300 hover:-translate-y-px"
              style={{
                background: "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)",
                boxShadow: "0 0 0 1px rgba(56,189,248,0.45), 0 4px 16px rgba(14,165,233,0.35)",
              }}
            >
              Let's Feel Some Snow
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg md:hidden"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
            aria-label="Toggle navigation"
          >
            <div className="flex w-5 flex-col gap-[5px]">
              <span className={`block h-[1.5px] rounded bg-white origin-center transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block h-[1.5px] rounded bg-white transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-[1.5px] rounded bg-white origin-center transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </div>
          </button>
        </nav>
      </div>

      {/* ── Sky blue gradient rule ── */}
      <div
        className={`h-px transition-opacity duration-500 ${scrolled ? "opacity-90" : "opacity-50"}`}
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.55) 20%, rgba(147,197,253,0.85) 50%, rgba(56,189,248,0.55) 80%, transparent 100%)" }}
      />

      {/* ── Mobile drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          background: "rgba(5,12,28,0.98)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderBottom: "1px solid rgba(56,189,248,0.15)",
        }}
      >
        <div className="flex flex-col gap-0.5 px-5 py-4">
          {NAV_LINKS.map((link) => {
            const hasDropdown = link.dropdown !== null;
            const isExpanded = mobileExpanded === link.dropdown;

            return (
              <div key={link.label}>
                <div
                  className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
                  onClick={() => hasDropdown && setMobileExpanded(isExpanded ? null : link.dropdown!)}
                >
                  <Link
                    href={link.href}
                    onClick={() => !hasDropdown && setMobileOpen(false)}
                    className="flex-1 text-[0.92rem] font-medium text-white/72 hover:text-white"
                  >
                    {link.label}
                  </Link>
                  {hasDropdown ? (
                    <svg className={`h-4 w-4 text-white/70 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="currentColor">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <span className="text-xs text-sky-500/60">→</span>
                  )}
                </div>

                {hasDropdown && isExpanded && link.dropdown === "packages" && (
                  <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-sky-500/20 pl-3">
                    {DROPDOWN_PACKAGES.map((pkg) => (
                      <Link
                        key={pkg.key}
                        href="#packages"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-white/5"
                      >
                        <div className="relative h-9 w-12 shrink-0 overflow-hidden rounded-lg">
                          <Image src={pkg.image} alt={pkg.title} fill className="object-cover" sizes="48px" />
                        </div>
                        <div>
                          <div className="text-[0.78rem] font-medium text-white/85">{pkg.title}</div>
                          <div className="text-[0.65rem] text-white/40">{pkg.duration} · <span style={{ color: pkg.tagColor }}>{pkg.price}</span></div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {hasDropdown && isExpanded && link.dropdown === "services" && (
                  <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-sky-500/20 pl-3">
                    {NAV_SERVICES.map((svc) => (
                      <Link key={svc.title} href="#services" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-white/5">
                        <span className="text-base">{svc.icon}</span>
                        <span className="text-[0.78rem] font-medium text-white/80">{svc.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="#packages"
            onClick={() => setMobileOpen(false)}
            className="mt-3 rounded-xl py-3 text-center text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)", boxShadow: "0 4px 16px rgba(14,165,233,0.35)" }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
