"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, MapPin, BookOpen, Compass, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─────────────────────────────────────────────────────────
   Kashmir Mountain SVG Scene
───────────────────────────────────────────────────────── */
function KashmirScene() {
  return (
    <div className="relative w-full overflow-hidden">
      <svg
        viewBox="0 0 960 300"
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nf-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#f0f9ff" />
          </linearGradient>
          <linearGradient id="nf-mtnFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="nf-mtnMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="nf-mtnNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="nf-lake" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="nf-mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="70%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <filter id="nf-softblur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" />
          </filter>
          <filter id="nf-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sky background */}
        <rect width="960" height="300" fill="url(#nf-sky)" />

        {/* Stars / distant sparkles */}
        {[
          [80, 30], [180, 18], [320, 45], [460, 22], [600, 38],
          [720, 15], [850, 28], [920, 42], [40, 55], [560, 12],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.2" fill="white" opacity="0.7" />
        ))}

        {/* Far mountains — blurred, pale */}
        <path
          d="M0,195 L70,90 L140,130 L240,55 L340,105 L440,38 L545,88 L650,48 L755,75 L860,60 L960,95 L960,195 Z"
          fill="url(#nf-mtnFar)"
          filter="url(#nf-softblur)"
        />

        {/* Mid mountains — blue-tinted */}
        <path
          d="M0,210 L110,115 L210,158 L320,88 L430,138 L540,68 L645,122 L750,88 L860,115 L960,98 L960,210 Z"
          fill="url(#nf-mtnMid)"
        />

        {/* Foreground mountains — sky-blue */}
        <path
          d="M0,242 L130,148 L270,195 L400,118 L545,172 L685,132 L820,162 L960,140 L960,242 Z"
          fill="url(#nf-mtnNear)"
        />

        {/* Snow caps */}
        <polygon points="240,55 224,92 256,92" fill="white" opacity="0.9" />
        <polygon points="440,38 421,78 459,78" fill="white" opacity="0.88" filter="url(#nf-glow)" />
        <polygon points="650,48 634,82 666,82" fill="white" opacity="0.82" />
        <polygon points="110,115 96,148 124,148" fill="white" opacity="0.7" />
        <polygon points="860,60 848,90 872,90" fill="white" opacity="0.78" />
        <polygon points="540,68 526,100 554,100" fill="white" opacity="0.85" />

        {/* Dal Lake */}
        <ellipse cx="480" cy="258" rx="340" ry="26" fill="url(#nf-lake)" />

        {/* Lake mountain reflection (mirrored, very faint) */}
        <path
          d="M140,258 L200,275 L280,265 L380,280 L480,268 L580,278 L680,265 L760,272 L820,258"
          stroke="#7dd3fc"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />

        {/* Shikara boat */}
        <g transform="translate(430, 252)">
          <path d="M0,6 Q22,-4 44,6 Q22,12 0,6Z" fill="#334155" opacity="0.45" />
          <line x1="22" y1="6" x2="22" y2="-12" stroke="#64748b" strokeWidth="0.9" opacity="0.55" />
          <path d="M22,-12 L32,-1 L22,2Z" fill="#bae6fd" opacity="0.8" />
        </g>

        {/* Second boat (smaller, right) */}
        <g transform="translate(560, 256)">
          <path d="M0,4 Q14,-2 28,4 Q14,8 0,4Z" fill="#334155" opacity="0.3" />
        </g>

        {/* Pine trees on near mountain base */}
        {[150, 195, 240, 690, 740, 790].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${i < 3 ? 215 : 210})`} opacity="0.55">
            <polygon points="0,-18 6,0 -6,0" fill="#0369a1" />
            <polygon points="0,-12 8,4 -8,4" fill="#0284c7" />
          </g>
        ))}

        {/* Mist veil — fades scene into white at bottom */}
        <rect x="0" y="185" width="960" height="115" fill="url(#nf-mist)" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Floating Particle (ambient snow-dot)
───────────────────────────────────────────────────────── */
function FloatingDot({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full bg-sky-300/40 pointer-events-none"
      style={style}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   404 PAGE
───────────────────────────────────────────────────────── */
export default function NotFound() {
  const navLinks = [
    {
      href: "/",
      label: "Back to Home",
      icon: Home,
      desc: "Return to the homepage",
    },
    {
      href: "/package",
      label: "Explore Packages",
      icon: MapPin,
      desc: "Browse Kashmir tour packages",
    },
    {
      href: "/blog",
      label: "Read Our Blogs",
      icon: BookOpen,
      desc: "Discover Kashmir travel stories",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-50 flex flex-col">
      {/* ── Ambient Glow Orbs ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 -top-20 h-[500px] w-[500px] rounded-full bg-sky-400/15 blur-[160px]" />
        <div className="absolute -right-40 top-1/4 h-[460px] w-[460px] rounded-full bg-cyan-400/12 blur-[150px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-sky-300/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* ── Floating particles ────────────────────────────── */}
      {[
        { width: 8, height: 8, top: "12%", left: "8%", animationDelay: "0s", animationDuration: "6s" },
        { width: 5, height: 5, top: "25%", left: "18%", animationDelay: "1.2s", animationDuration: "8s" },
        { width: 10, height: 10, top: "8%", right: "12%", animationDelay: "0.6s", animationDuration: "7s" },
        { width: 6, height: 6, top: "35%", right: "8%", animationDelay: "2s", animationDuration: "9s" },
        { width: 4, height: 4, top: "60%", left: "6%", animationDelay: "1.5s", animationDuration: "5s" },
        { width: 7, height: 7, top: "70%", right: "15%", animationDelay: "0.3s", animationDuration: "10s" },
      ].map((s, i) => (
        <FloatingDot
          key={i}
          style={{
            ...s,
            animation: `bounce ${s.animationDuration} ease-in-out ${s.animationDelay} infinite alternate`,
          }}
        />
      ))}

      <style>{`
        @keyframes bounce {
          0%   { transform: translateY(0px) scale(1); opacity: 0.4; }
          100% { transform: translateY(-22px) scale(1.15); opacity: 0.15; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
      `}</style>

      {/* ── Navbar ────────────────────────────────────────── */}
      <Navbar />

      {/* ── Main Content ──────────────────────────────────── */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16 sm:px-6">

        {/* Compass badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-2.5 rounded-full border border-sky-200/80 bg-white/80 px-5 py-2.5 backdrop-blur-xl shadow-[0_10px_40px_rgba(14,165,233,0.10)]"
        >
          <Compass
            className="h-4 w-4 text-sky-500"
            style={{ animation: "spin-slow 8s linear infinite" }}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-sky-700">
            Page Not Found
          </span>
        </motion.div>

        {/* 404 — Large editorial number */}
        <div className="relative mb-2 select-none">
          {/* Glow behind the number */}
          <div className="absolute inset-0 -z-10 mx-auto w-[80%] rounded-full bg-sky-400/20 blur-[60px]" />

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-center font-extrabold leading-none tracking-[-0.06em]"
            style={{
              fontSize: "clamp(7rem, 22vw, 18rem)",
              background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 35%, #38bdf8 60%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
            }}
          >
            404
          </motion.h1>
        </div>

        {/* Kashmir Mountain Scene */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="w-full max-w-2xl -mt-8 sm:-mt-12 mb-2"
        >
          <KashmirScene />
        </motion.div>

        {/* Glass card — headline + message + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/75 backdrop-blur-2xl shadow-[0_30px_100px_rgba(14,165,233,0.10)] px-8 py-10 sm:px-12 sm:py-12 text-center"
        >
          {/* Ambient inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_40%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_40%)]" />

          <div className="relative z-10">
            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-extralight leading-tight tracking-[-0.045em] text-slate-900">
              Lost in the{" "}
              <span
                className="font-medium"
                style={{
                  background: "linear-gradient(120deg, #0ea5e9, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Kashmiri Mist
              </span>
            </h2>

            {/* Divider */}
            <div className="mx-auto my-5 h-px w-16 bg-gradient-to-r from-sky-400 to-cyan-300" />

            {/* Message */}
            <p className="text-[15px] leading-7 font-light text-slate-500">
              The page you're seeking has wandered off into the valley mist.
              Perhaps it drifted away on a shikara, or got lost among the
              pine forests of Pahalgam. Let us guide you back.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-sky-100/80 bg-white/90 px-6 py-3 text-sm font-medium text-slate-700 backdrop-blur-xl shadow-[0_8px_24px_rgba(14,165,233,0.07)] transition-all duration-500 hover:-translate-y-1 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600 hover:shadow-[0_16px_40px_rgba(14,165,233,0.16)]"
                    >
                      <Icon className="h-4 w-4 text-sky-500 transition-transform duration-500 group-hover:scale-110" />
                      {link.label}
                      <ArrowRight className="h-3.5 w-3.5 text-sky-400 transition-transform duration-500 group-hover:translate-x-1 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 text-[12px] font-light tracking-[0.18em] uppercase text-slate-400"
        >
          eKashmir Tours &nbsp;·&nbsp; Est. in the Valley of Paradise
        </motion.p>
      </main>

      {/* ── Destination strip ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative z-10 border-t border-sky-100/60 bg-white/60 backdrop-blur-xl py-3 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="flex gap-8 whitespace-nowrap text-[11px] font-medium tracking-[0.22em] uppercase text-sky-400/70"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[
            "Dal Lake", "Gulmarg", "Pahalgam", "Sonamarg",
            "Betaab Valley", "Mughal Gardens", "Hazratbal",
            "Shikara Sunrise", "Kashmir Valley", "Doodhpathri",
            "Dal Lake", "Gulmarg", "Pahalgam", "Sonamarg",
            "Betaab Valley", "Mughal Gardens", "Hazratbal",
            "Shikara Sunrise", "Kashmir Valley", "Doodhpathri",
          ].map((name, i) => (
            <span key={i} className="shrink-0">
              {name}
              <span className="ml-8 text-sky-200">·</span>
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </motion.div>

      {/* ── Footer ────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
