import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface HubLink {
  /** Visible anchor text, e.g. "Kashmir Tour Packages from Delhi" */
  label: string;
  /** Absolute site path, e.g. "/kashmir-tour-packages/from-delhi/" */
  href: string;
  /** Optional supporting line, e.g. "6 Days · 5 Nights" */
  sublabel?: string;
}

interface PackageHubLinksProps {
  eyebrow: string;
  heading: ReactNode;
  subtitle?: string;
  icon: LucideIcon;
  links: HubLink[];
  /** Tint the section so consecutive blocks alternate. */
  variant?: "white" | "tinted";
}

/**
 * Reusable hub → spoke internal-linking block for the package hub.
 *
 * Renders a grid of descriptive, crawlable links down into the city /
 * duration / theme sub-hubs. Deliberately a server component (no
 * "use client") so every <a href> ships in the server-rendered HTML —
 * client-only links are invisible to crawlers and LLMs.
 */
export default function PackageHubLinks({
  eyebrow,
  heading,
  subtitle,
  icon: Icon,
  links,
  variant = "white",
}: PackageHubLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className={variant === "tinted" ? "bg-sky-50/60 py-8 sm:py-10" : "bg-white py-8 sm:py-10"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
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
            <p className="mt-2 text-center text-sm text-slate-400 sm:text-left">
              {subtitle}
            </p>
          )}
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-center gap-3 rounded-2xl border border-sky-100 bg-white px-4 py-3.5 shadow-[0_2px_12px_rgba(14,165,233,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_8px_24px_rgba(14,165,233,0.14)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-cyan-400 text-white">
                  <Icon className="h-4.5 w-4.5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.92rem] font-semibold text-slate-900 transition-colors group-hover:text-sky-700">
                    {link.label}
                  </span>
                  {link.sublabel && (
                    <span className="mt-0.5 block truncate text-xs text-slate-400">
                      {link.sublabel}
                    </span>
                  )}
                </span>

                <ChevronRight className="h-4 w-4 shrink-0 text-sky-400 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
