"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

/**
 * The shared chrome every mega-dropdown wears.
 *
 * Four panels — Packages, Destinations, Experiences, Temples — plus the static
 * More menu all render through this, so they cannot drift into four different
 * designs. The shell owns the frame (position, glass, accent line, header bar,
 * footer CTAs, trust strip); each panel supplies only its body.
 *
 * Position is `fixed` and centred rather than absolute to the nav item: at
 * 880px these are wider than their trigger and would otherwise hang off the
 * right of the viewport on the last item in the bar.
 */

export const PANEL_TOP = "72px";

/* Shared tokens, so a colour is changed in one place rather than five. */
export const SKY = "#0EA5E9";
export const SKY_DARK = "#0284C7";
export const SKY_LIGHT = "#38BDF8";
export const HAIRLINE = "1px solid rgba(15,23,42,0.08)";

export interface PanelCta {
  href: string;
  label: string;
}

export default function NavPanel({
  width = 880,
  eyebrow,
  stats,
  children,
  minBodyHeight,
  primary,
  secondary,
  trust,
  onClose,
}: {
  width?: number;
  /** Header line — what this panel is for, in one clause. */
  eyebrow: string;
  /** Header right. Derived from live data, never hardcoded counts. */
  stats?: { label: string; value: string }[];
  children: ReactNode;
  minBodyHeight?: string;
  primary: PanelCta;
  secondary?: PanelCta;
  /** Bottom reassurance strip. Packages only — the others skip it. */
  trust?: { icon: string; label: string }[];
  onClose: () => void;
}) {
  return (
    <div
      className="fixed z-[200] overflow-hidden rounded-2xl"
      style={{
        top: PANEL_TOP,
        left: "50%",
        transform: "translateX(-50%)",
        width: `${width}px`,
        maxWidth: "calc(100vw - 2rem)",
        background: "rgba(255,255,255,0.98)",
        backdropFilter: "blur(36px)",
        WebkitBackdropFilter: "blur(36px)",
        border: "1px solid rgba(56,189,248,0.25)",
        boxShadow:
          "0 28px 70px rgba(15,23,42,0.18), 0 0 0 1px rgba(56,189,248,0.05)",
      }}
    >
      {/* ── Top sky-blue gradient accent line ── */}
      <div
        className="h-0.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #0EA5E9 25%, #38BDF8 50%, #93C5FD 70%, transparent 100%)",
        }}
      />

      {/* ── Header bar ── */}
      <div
        className="flex items-center justify-between gap-4 px-5 py-2.5"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,106,167,0.10) 0%, rgba(14,165,233,0.07) 50%, rgba(56,189,248,0.05) 100%)",
          borderBottom: "1px solid rgba(56,189,248,0.16)",
        }}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-[0.72rem] font-bold text-sky-500">✦</span>
          <span className="truncate text-[0.75rem] font-semibold tracking-wide text-slate-800">
            {eyebrow}
          </span>
        </div>
        {stats && stats.length > 0 && (
          <div className="flex shrink-0 items-center gap-5">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5 text-[0.7rem]">
                <span className="text-slate-400">{s.label}</span>
                <span className="font-bold text-sky-600">{s.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div style={minBodyHeight ? { minHeight: minBodyHeight } : undefined}>
        {children}
      </div>

      {/* ── CTA bar ── */}
      <div className="flex items-center gap-3 px-5 py-3" style={{ borderTop: HAIRLINE }}>
        <Link
          href={primary.href}
          onClick={onClose}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-[0.82rem] font-semibold text-white transition-all hover:brightness-110"
          style={{
            background: "linear-gradient(90deg, #0284C7 0%, #0EA5E9 50%, #38BDF8 100%)",
            boxShadow: "0 4px 16px rgba(14,165,233,0.40)",
          }}
        >
          {primary.label}
        </Link>
        {secondary && (
          <Link
            href={secondary.href}
            onClick={onClose}
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-[0.82rem] font-semibold text-sky-600 transition-all hover:bg-sky-50"
            style={{ border: "1px solid rgba(56,189,248,0.40)" }}
          >
            {secondary.label}
          </Link>
        )}
      </div>

      {/* ── Trust strip ── */}
      {trust && trust.length > 0 && (
        <div
          className="flex items-center justify-around px-5 py-2.5"
          style={{ background: "rgba(15,23,42,0.03)", borderTop: "1px solid rgba(15,23,42,0.06)" }}
        >
          {trust.map((t) => (
            <div key={t.label} className="flex items-center gap-1.5">
              <span className="text-sm text-sky-500">{t.icon}</span>
              <span className="text-[0.67rem] font-medium text-slate-500">{t.label}</span>
            </div>
          ))}
          <div className="text-[0.67rem] text-sky-600/90">
            Need help?{" "}
            <Link
              href="/contact"
              onClick={onClose}
              className="font-semibold text-sky-600 underline underline-offset-2"
            >
              Talk to us →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* States                                                                      */
/* -------------------------------------------------------------------------- */

/** Skeletons while a collection loads. Same card footprint, so nothing jumps. */
export function PanelSkeleton({ count, columns }: { count: number; columns: number }) {
  return (
    <div className="grid flex-1 gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-xl"
          style={{ background: "rgba(15,23,42,0.04)", border: HAIRLINE }}
        >
          <div className="h-28 w-full" style={{ background: "rgba(15,23,42,0.07)" }} />
          <div className="space-y-2 p-3">
            <div className="h-3 w-3/4 rounded" style={{ background: "rgba(15,23,42,0.08)" }} />
            <div className="h-2.5 w-1/2 rounded" style={{ background: "rgba(15,23,42,0.06)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PanelMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center py-10 text-[0.78rem] text-slate-500">
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* The card                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * One item in any panel — a package, a destination, an activity or a temple.
 *
 * `unoptimized` because these come from several hosts (Cloudinary uploads,
 * Unsplash placeholders, local files) and a hover-triggered menu is not worth
 * warming the image optimiser for. A record with no image gets a tinted block
 * with its initial rather than a broken frame — one temple genuinely has none.
 */
export function NavCard({
  href,
  onClose,
  image,
  alt,
  title,
  badge,
  overlay,
  meta,
  footLabel,
  footValue,
  cta = "View →",
  imageHeight = 112,
  capitalize = false,
}: {
  href: string;
  onClose: () => void;
  image: string;
  alt: string;
  title: string;
  /** Top-left pill — theme, difficulty, deity. */
  badge?: string;
  /** Bottom-right overlay — a rating, a distance. */
  overlay?: ReactNode;
  /** Small dot-separated line under the title. Falsy entries are dropped. */
  meta?: (string | false | undefined)[];
  footLabel?: string;
  footValue?: string;
  cta?: string;
  imageHeight?: number;
  /** Package titles are authored lowercase in the CMS; nothing else needs it. */
  capitalize?: boolean;
}) {
  const metaParts = (meta ?? []).filter(Boolean) as string[];

  return (
    <Link
      href={href}
      onClick={onClose}
      className="group flex flex-col overflow-hidden rounded-xl transition-all duration-250 hover:-translate-y-0.5"
      style={{
        background: "#ffffff",
        border: HAIRLINE,
        boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ height: `${imageHeight}px`, background: "rgba(15,23,42,0.05)" }}
      >
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="320px"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-2xl font-bold"
            style={{ background: "rgba(56,189,248,0.10)", color: "rgba(2,132,199,0.45)" }}
            aria-hidden="true"
          >
            {title.charAt(0)}
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 40%, rgba(6,14,35,0.55) 100%)" }}
        />
        {badge && (
          <span
            className="absolute left-2.5 top-2.5 max-w-[85%] truncate rounded-full px-2.5 py-1 text-[0.6rem] font-bold text-white"
            style={{ background: SKY_LIGHT, boxShadow: "0 2px 10px rgba(56,189,248,0.38)" }}
          >
            {badge}
          </span>
        )}
        {overlay && (
          <div
            className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full px-2 py-0.5"
            style={{
              background: "rgba(6,14,35,0.75)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {overlay}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h4
          className={`mb-1.5 text-[0.82rem] font-semibold leading-tight text-slate-900 ${
            capitalize ? "capitalize" : ""
          }`}
        >
          {title}
        </h4>
        {/* One clamped line-pair rather than wrapping spans: a destination's
            summary is a full sentence, and left to wrap freely it makes its
            card twice the height of the one beside it. */}
        {metaParts.length > 0 && (
          <p className="mb-2.5 line-clamp-2 text-[0.66rem] leading-snug text-slate-500">
            {metaParts.join("  ·  ")}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="min-w-0">
            {footLabel && <div className="text-[0.6rem] text-slate-400">{footLabel}</div>}
            {footValue && (
              <div className="truncate text-[0.92rem] font-bold" style={{ color: SKY_DARK }}>
                {footValue}
              </div>
            )}
          </div>
          <span
            className="shrink-0 rounded-lg px-3 py-1.5 text-[0.7rem] font-semibold text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #0EA5E9, #38BDF8)",
              boxShadow: "0 2px 10px rgba(14,165,233,0.40)",
            }}
          >
            {cta}
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * The left filter rail Packages and Experiences share.
 *
 * Options are always derived from what is actually published, so the rail can
 * never offer a filter with nothing behind it.
 */
export function PanelRail({
  title,
  options,
  active,
  onSelect,
}: {
  title: string;
  options: { key: string; label: string; count: number }[];
  active: string;
  onSelect: (key: string) => void;
}) {
  return (
    <div
      className="flex w-[210px] shrink-0 flex-col py-4"
      style={{ borderRight: HAIRLINE }}
    >
      <p className="mb-2 px-4 text-[0.58rem] font-bold tracking-[0.22em] text-sky-500/70 uppercase">
        {title}
      </p>
      {options.map((option) => {
        const on = active === option.key;
        return (
          <button
            key={option.key}
            onClick={() => onSelect(option.key)}
            className="flex items-center justify-between gap-2 px-4 py-2.5 text-left transition-all duration-150"
            style={{
              background: on ? "rgba(56,189,248,0.10)" : "transparent",
              borderLeft: on ? "3px solid #38BDF8" : "3px solid transparent",
            }}
          >
            <span
              className="truncate text-[0.78rem] font-medium"
              style={{ color: on ? SKY_DARK : "#475569" }}
            >
              {option.label}
            </span>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-bold"
              style={{
                background: on ? SKY : "rgba(15,23,42,0.06)",
                color: on ? "white" : "#64748b",
              }}
            >
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
