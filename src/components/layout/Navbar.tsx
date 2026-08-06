"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";
import { useNavPackages, formatPrice, type NavPackage } from "@/components/layout/useNavPackages";

/* ══════════════════════════════════════════════════════════
   PACKAGES MEGA DROPDOWN
   ══════════════════════════════════════════════════════════ */
function PackagesDropdown({
  onClose,
  packages,
  isLoading,
  hasError,
}: {
  onClose: () => void;
  packages: NavPackage[];
  isLoading: boolean;
  hasError: boolean;
}) {
  const [activeDuration, setActiveDuration] = useState("all");
  const [activeCity, setActiveCity] = useState("All Cities");

  // Filters are derived from whatever is actually published, so the dropdown
  // never advertises a duration or destination with nothing behind it.
  const durationFilters = useMemo(() => {
    const byDays = new Map<number, number>();
    packages.forEach((p) => {
      if (p.days > 0) byDays.set(p.days, (byDays.get(p.days) ?? 0) + 1);
    });
    return [
      { key: "all", label: "All Days Package", count: packages.length },
      ...[...byDays.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([days, count]) => ({
          key: String(days),
          label: `${days} Day${days === 1 ? "" : "s"} Package`,
          count,
        })),
    ];
  }, [packages]);

  const destinations = useMemo(
    () => [
      "All Cities",
      ...[...new Set(packages.map((p) => p.destination).filter(Boolean))].sort(),
    ],
    [packages]
  );

  const filtered = packages.filter((p) => {
    const durationOk = activeDuration === "all" || String(p.days) === activeDuration;
    const cityOk = activeCity === "All Cities" || p.destination === activeCity;
    return durationOk && cityOk;
  });

  const stats = useMemo(() => {
    const rated = packages.filter((p) => p.rating > 0);
    const bestRated = rated.length ? Math.max(...rated.map((p) => p.rating)) : 0;
    const totalReviews = packages.reduce((sum, p) => sum + (p.reviews ?? 0), 0);
    return [
      { label: "Best Rated", value: bestRated ? `${bestRated.toFixed(1)} ★` : "—" },
      { label: "Destinations", value: `${destinations.length - 1} +` },
      { label: "Reviews", value: `${totalReviews} +` },
    ];
  }, [packages, destinations.length]);

  return (
    <div
      className="fixed z-[200] overflow-hidden rounded-2xl"
      style={{
        top: "72px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "880px",
        maxWidth: "calc(100vw - 2rem)",
        background: "rgba(255,255,255,0.98)",
        backdropFilter: "blur(36px)",
        WebkitBackdropFilter: "blur(36px)",
        border: "1px solid rgba(56,189,248,0.25)",
        boxShadow: "0 28px 70px rgba(15,23,42,0.18), 0 0 0 1px rgba(56,189,248,0.05)",
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
          background: "linear-gradient(90deg, rgba(2,106,167,0.10) 0%, rgba(14,165,233,0.07) 50%, rgba(56,189,248,0.05) 100%)",
          borderBottom: "1px solid rgba(56,189,248,0.16)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sky-500 text-[0.72rem] font-bold">✦</span>
          <span className="text-[0.75rem] font-semibold tracking-wide text-slate-800">
            Handpicked Kashmir itineraries, built by locals
          </span>
        </div>
        <div className="flex items-center gap-5">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5 text-[0.7rem]">
              <span className="text-slate-400">{s.label}</span>
              <span className="font-bold text-sky-600">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex" style={{ minHeight: "330px" }}>
        {/* Left: Duration filters */}
        <div
          className="flex w-[210px] shrink-0 flex-col py-4"
          style={{ borderRight: "1px solid rgba(15,23,42,0.08)" }}
        >
          <p className="mb-2 px-4 text-[0.58rem] font-bold tracking-[0.22em] text-sky-500/70 uppercase">
            Duration
          </p>
          {durationFilters.map((f) => {
            const active = activeDuration === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveDuration(f.key)}
                className="flex items-center justify-between px-4 py-2.5 text-left transition-all duration-150"
                style={{
                  background: active ? "rgba(56,189,248,0.10)" : "transparent",
                  borderLeft: active ? "3px solid #38BDF8" : "3px solid transparent",
                }}
              >
                <span
                  className="text-[0.78rem] font-medium"
                  style={{ color: active ? "#0284C7" : "#475569" }}
                >
                  {f.label}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[0.6rem] font-bold"
                  style={{
                    background: active ? "#0EA5E9" : "rgba(15,23,42,0.06)",
                    color: active ? "white" : "#64748b",
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
            <span className="mr-1 text-[0.6rem] font-semibold tracking-widest text-sky-500/70 uppercase">
              🌍 Destination
            </span>
            {destinations.map((city) => {
              const active = activeCity === city;
              return (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className="rounded-full px-3 py-1 text-[0.7rem] font-medium transition-all duration-150"
                  style={{
                    background: active ? "linear-gradient(135deg, #0EA5E9, #38BDF8)" : "rgba(15,23,42,0.04)",
                    color: active ? "white" : "#475569",
                    border: active ? "1px solid rgba(56,189,248,0.50)" : "1px solid rgba(15,23,42,0.10)",
                    boxShadow: active ? "0 4px 12px rgba(14,165,233,0.30)" : "none",
                  }}
                >
                  {city}
                </button>
              );
            })}
          </div>

          {/* Package cards */}
          {isLoading ? (
            <div className="grid flex-1 gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-xl"
                  style={{ background: "rgba(15,23,42,0.04)", border: "1px solid rgba(15,23,42,0.08)" }}
                >
                  <div className="h-36 w-full" style={{ background: "rgba(15,23,42,0.07)" }} />
                  <div className="space-y-2 p-3">
                    <div className="h-3 w-3/4 rounded" style={{ background: "rgba(15,23,42,0.08)" }} />
                    <div className="h-2.5 w-1/2 rounded" style={{ background: "rgba(15,23,42,0.06)" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : hasError ? (
            <div className="flex flex-1 items-center justify-center text-[0.78rem] text-slate-500">
              Couldn&apos;t load packages right now.
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-[0.78rem] text-slate-500">
              No packages match these filters.
            </div>
          ) : (
            <div className="grid flex-1 gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {filtered.slice(0, 2).map((pkg) => (
                <Link
                  key={pkg.id}
                  href={`/package/${pkg.slug}`}
                  onClick={onClose}
                  className="group overflow-hidden rounded-xl transition-all duration-250 hover:-translate-y-0.5"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(15,23,42,0.08)",
                    boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
                  }}
                >
                  {/* Image */}
                  <div className="relative h-36 overflow-hidden" style={{ background: "rgba(15,23,42,0.05)" }}>
                    {pkg.image && (
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="320px"
                      />
                    )}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(180deg, transparent 40%, rgba(6,14,35,0.55) 100%)" }}
                    />
                    {pkg.themes[0] && (
                      <span
                        className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[0.6rem] font-bold text-white"
                        style={{ background: "#38BDF8", boxShadow: "0 2px 10px rgba(56,189,248,0.38)" }}
                      >
                        {pkg.themes[0]}
                      </span>
                    )}
                    {pkg.rating > 0 && (
                      <div
                        className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full px-2 py-0.5"
                        style={{ background: "rgba(6,14,35,0.75)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.12)" }}
                      >
                        <span className="text-[0.58rem] text-amber-400">★</span>
                        <span className="text-[0.63rem] font-semibold text-white">{pkg.rating}</span>
                        <span className="text-[0.58rem] text-white/50">({pkg.reviews})</span>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-3">
                    <h4 className="mb-1.5 text-[0.82rem] font-semibold capitalize text-slate-900 leading-tight">
                      {pkg.title}
                    </h4>
                    <div className="mb-2.5 flex items-center gap-3 text-[0.66rem] text-slate-500">
                      {pkg.duration && <span className="flex items-center gap-1">⏱ {pkg.duration}</span>}
                      {pkg.destination && <span className="flex items-center gap-1">📍 {pkg.destination}</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[0.6rem] text-slate-400">Starting from</div>
                        <div className="text-[0.92rem] font-bold" style={{ color: "#0284C7" }}>
                          {formatPrice(pkg.price)}
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
          )}
        </div>
      </div>

      {/* ── Bottom CTA bar ── */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ borderTop: "1px solid rgba(15,23,42,0.08)" }}
      >
        <Link
          href="/kashmir-tour-packages/"
          onClick={onClose}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-[0.82rem] font-semibold text-white transition-all hover:brightness-110"
          style={{
            background: "linear-gradient(90deg, #0284C7 0%, #0EA5E9 50%, #38BDF8 100%)",
            boxShadow: "0 4px 16px rgba(14,165,233,0.40)",
          }}
        >
          🔍 Explore All Packages →
        </Link>
        <Link
          href="/cab-service"
          onClick={onClose}
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-[0.82rem] font-semibold text-sky-600 transition-all hover:bg-sky-50"
          style={{ border: "1px solid rgba(56,189,248,0.40)" }}
        >
          🚕 Book a Cab
        </Link>
      </div>

      {/* ── Trust footer strip ── */}
      <div
        className="flex items-center justify-around px-5 py-2.5"
        style={{ background: "rgba(15,23,42,0.03)", borderTop: "1px solid rgba(15,23,42,0.06)" }}
      >
        {[
          { icon: "✓", label: "Free Cancellation" },
          { icon: "💳", label: "Easy EMI" },
          { icon: "🎧", label: "24 / 7 Support" },
        ].map((t) => (
          <div key={t.label} className="flex items-center gap-1.5">
            <span className="text-sky-500 text-sm">{t.icon}</span>
            <span className="text-[0.67rem] font-medium text-slate-500">{t.label}</span>
          </div>
        ))}
        <div className="text-[0.67rem] text-sky-600/90">
          Need help?{" "}
          <Link href="/contact" onClick={onClose} className="font-semibold text-sky-600 underline underline-offset-2">
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
  const [isOpen, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { packages, isLoading, hasError, load: loadPackages } = useNavPackages();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (key === "packages") loadPackages();
    setActiveDropdown(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 140);
  };

  const closeDropdown = () => setActiveDropdown(null);

  return (
    <>
      <EnquiryPopupForm isOpen = {isOpen} onClose={()=>setOpen(false)}/>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* ── Main bar ── */}
        <div
          className={`transition-all duration-500 ${scrolled ? "shadow-xl shadow-slate-900/10" : "shadow-md shadow-slate-900/5"}`}
          style={{
            background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderBottom: scrolled
              ? "1px solid rgba(56,189,248,0.28)"
              : "1px solid rgba(56,189,248,0.14)",
          }}
        >
          <nav className="mx-auto flex h-[70px] max-w-8xl items-center px-6 lg:px-12 justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5"
            >
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
                const isActive =
                  hasDropdown && activeDropdown === link.dropdown;

                return (
                  <li
                    key={link.label}
                    className="relative"
                    onMouseEnter={() =>
                      hasDropdown && openDropdown(link.dropdown!)
                    }
                    onMouseLeave={() => hasDropdown && scheduleClose()}
                  >
                    <Link
                      href={link.href}
                      className={`group relative flex items-center gap-1 rounded-lg px-3 py-2 text-[0.83rem] font-medium tracking-wide transition-all duration-200 ${
                        isActive
                          ? "bg-sky-50 text-sky-600"
                          : "text-slate-700 hover:bg-sky-50/70 hover:text-sky-600"
                      }`}
                    >
                      {link.label}
                      {hasDropdown && (
                        <svg
                          className={`h-3 w-3 transition-transform duration-200 ${isActive ? "rotate-180 text-sky-600" : "text-slate-400"}`}
                          viewBox="0 0 12 12"
                          fill="currentColor"
                        >
                          <path
                            d="M2 4l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      {!hasDropdown && (
                        <span className="absolute -bottom-0.5 left-3 right-3 h-px scale-x-0 rounded-full bg-sky-500 transition-transform duration-300 group-hover:scale-x-100" />
                      )}
                    </Link>

                    {/* Dropdown panels */}
                    {isActive && link.dropdown === "packages" && (
                      <div
                        onMouseEnter={() => openDropdown("packages")}
                        onMouseLeave={scheduleClose}
                      >
                        <PackagesDropdown
                          onClose={closeDropdown}
                          packages={packages}
                          isLoading={isLoading}
                          hasError={hasError}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Desktop right */}
            <div className="hidden shrink-0 items-center gap-3 md:flex">
              <button
                onClick={()=> setOpen(true)}
                className="rounded-4xl px-5 py-2.5 text-[0.83rem] font-semibold text-white transition-all duration-300 hover:-translate-y-px"
                style={{
                  background:
                    "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)",
                  boxShadow:
                    "0 0 0 1px rgba(56,189,248,0.45), 0 4px 16px rgba(14,165,233,0.35)",
                }}
              >
                Let&apos;s Feel Some Snow
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg md:hidden"
              style={{
                background: "rgba(15,23,42,0.04)",
                border: "1px solid rgba(15,23,42,0.10)",
              }}
              aria-label="Toggle navigation"
            >
              <div className="flex w-5 flex-col gap-[5px]">
                <span
                  className={`block h-[1.5px] rounded bg-slate-800 origin-center transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
                />
                <span
                  className={`block h-[1.5px] rounded bg-slate-800 transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
                />
                <span
                  className={`block h-[1.5px] rounded bg-slate-800 origin-center transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
                />
              </div>
            </button>
          </nav>
        </div>

        {/* ── Sky blue gradient rule ── */}
        <div
          className={`h-px transition-opacity duration-500 ${scrolled ? "opacity-90" : "opacity-50"}`}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.55) 20%, rgba(147,197,253,0.85) 50%, rgba(56,189,248,0.55) 80%, transparent 100%)",
          }}
        />

        {/* ── Mobile drawer ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
          style={{
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderBottom: "1px solid rgba(56,189,248,0.18)",
          }}
        >
          <div className="flex flex-col gap-0.5 px-5 py-4">
            {NAV_LINKS.map((link) => {
              const hasDropdown = link.dropdown !== null;
              const isExpanded = mobileExpanded === link.dropdown;

              return (
                <div key={link.label}>
                  <div
                    className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-sky-50"
                    onClick={() => {
                      if (!hasDropdown) return;
                      if (link.dropdown === "packages") loadPackages();
                      setMobileExpanded(isExpanded ? null : link.dropdown!);
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => !hasDropdown && setMobileOpen(false)}
                      className="flex-1 text-[0.92rem] font-medium text-slate-700 hover:text-sky-600"
                    >
                      {link.label}
                    </Link>
                    {hasDropdown ? (
                      <svg
                        className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        viewBox="0 0 12 12"
                        fill="currentColor"
                      >
                        <path
                          d="M2 4l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <span className="text-xs text-sky-500/70">→</span>
                    )}
                  </div>

                  {hasDropdown &&
                    isExpanded &&
                    link.dropdown === "packages" && (
                      <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-sky-200 pl-3">
                        {isLoading && (
                          <p className="px-2 py-2 text-[0.72rem] text-slate-400">Loading packages…</p>
                        )}
                        {hasError && (
                          <p className="px-2 py-2 text-[0.72rem] text-slate-400">
                            Couldn&apos;t load packages.
                          </p>
                        )}
                        {!isLoading && !hasError && packages.length === 0 && (
                          <p className="px-2 py-2 text-[0.72rem] text-slate-400">No packages yet.</p>
                        )}
                        {packages.map((pkg) => (
                          <Link
                            key={pkg.id}
                            href={`/package/${pkg.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-sky-50"
                          >
                            <div
                              className="relative h-9 w-12 shrink-0 overflow-hidden rounded-lg"
                              style={{ background: "rgba(15,23,42,0.05)" }}
                            >
                              {pkg.image && (
                                <Image
                                  src={pkg.image}
                                  alt={pkg.title}
                                  fill
                                  unoptimized
                                  className="object-cover"
                                  sizes="48px"
                                />
                              )}
                            </div>
                            <div>
                              <div className="text-[0.78rem] font-medium capitalize text-slate-800">
                                {pkg.title}
                              </div>
                              <div className="text-[0.65rem] text-slate-400">
                                {pkg.duration} ·{" "}
                                <span className="text-sky-600">{formatPrice(pkg.price)}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                </div>
              );
            })}

            <Link
              href="/kashmir-tour-packages/"
              onClick={() => setMobileOpen(false)}
              className="mt-3 rounded-xl py-3 text-center text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)",
                boxShadow: "0 4px 16px rgba(14,165,233,0.35)",
              }}
            >
              Book Now
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
