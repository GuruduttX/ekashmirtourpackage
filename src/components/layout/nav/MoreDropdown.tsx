"use client";

import Link from "next/link";
import NavPanel, { HAIRLINE } from "@/components/layout/nav/NavPanel";
import { NAV_MORE_LINKS } from "@/lib/constants";

/**
 * The "More" menu — the pages that belong in the navigation but not in the bar.
 *
 * No fetch and no loading state: this is the one panel with no collection
 * behind it, so it opens instantly. Each row carries a line on what is actually
 * there, because a bare list of page names tells a visitor nothing about which
 * one they want.
 *
 * It sizes itself from the list. Stays, Cabs, About, Reviews and Contact were
 * promoted to top-level links, and a 620px two-column sheet holding the two
 * survivors would be mostly empty air — so a short list collapses to one
 * narrow column instead.
 */
export default function MoreDropdown({ onClose }: { onClose: () => void }) {
  const twoColumn = NAV_MORE_LINKS.length > 4;

  return (
    <NavPanel
      width={twoColumn ? 620 : 340}
      eyebrow="A little more about the valley, and us"
      onClose={onClose}
      primary={{ href: "/contact", label: "✆ Talk to Someone in Srinagar →" }}
    >
      <div
        className="grid gap-1 p-3"
        style={{ gridTemplateColumns: `repeat(${twoColumn ? 2 : 1}, 1fr)` }}
      >
        {NAV_MORE_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 hover:bg-sky-50/80"
          >
            <span
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[0.78rem] transition-colors"
              style={{ background: "rgba(56,189,248,0.12)", color: "#0284C7", border: HAIRLINE }}
              aria-hidden="true"
            >
              {link.icon}
            </span>
            <span className="min-w-0">
              <span className="block text-[0.82rem] font-semibold text-slate-800 transition-colors group-hover:text-sky-600">
                {link.label}
              </span>
              <span className="block text-[0.68rem] leading-snug text-slate-500">
                {link.desc}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </NavPanel>
  );
}
