"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, NAV_MORE_LINKS } from "@/lib/constants";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";
import { useNavPackages, formatPrice } from "@/components/layout/useNavPackages";
import {
  useNavDestinations,
  useNavExperiences,
  useNavTemples,
} from "@/components/layout/useNavCollections";
import PackagesDropdown from "@/components/layout/nav/PackagesDropdown";
import DestinationsDropdown from "@/components/layout/nav/DestinationsDropdown";
import ExperiencesDropdown from "@/components/layout/nav/ExperiencesDropdown";
import TemplesDropdown from "@/components/layout/nav/TemplesDropdown";
import MoreDropdown from "@/components/layout/nav/MoreDropdown";

/**
 * The primary navigation.
 *
 * Four items open a mega-dropdown fed live from its own collection: Packages,
 * Destinations, Experiences and Temples. Each collection is fetched LAZILY on
 * the first open of its own panel, so a visitor who never touches the nav makes
 * no requests at all, and opening Temples never fetches Packages.
 *
 * Stays, Cabs, About, Reviews and Contact are plain links, and "More" holds
 * what is left. It is a trigger with no href of its own, so it renders as a
 * <button> rather than an anchor to nothing.
 *
 * BREAKPOINT: the bar carries ten labels plus the logo and the CTA, which needs
 * roughly 1,150px. So the horizontal nav appears at `xl` and everything below
 * 1280px — tablets included, not just phones — gets the drawer. Dropping this
 * to `lg` overlaps the CTA.
 *
 * The drawer runs off the same data as the desktop panels rather than a second
 * hardcoded list, which is what stops the two from drifting apart.
 */

/** One row in an expanded mobile section. */
interface MobileItem {
  href: string;
  label: string;
  sub?: string;
  image?: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isOpen, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const packages = useNavPackages();
  const destinations = useNavDestinations();
  const experiences = useNavExperiences();
  const temples = useNavTemples();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A panel opened by hover has no other way out for a keyboard user.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** Kicks off the fetch for whichever panel is being opened, and only that one. */
  const loadFor = (key: string) => {
    if (key === "packages") packages.load();
    if (key === "destinations") destinations.load();
    if (key === "experiences") experiences.load();
    if (key === "temples") temples.load();
    // "more" is static — nothing to fetch.
  };

  const openDropdown = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    loadFor(key);
    setActiveDropdown(key);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 140);
  };

  const closeDropdown = () => setActiveDropdown(null);

  /** The desktop panel for a key. */
  const renderPanel = (key: string) => {
    switch (key) {
      case "packages":
        return (
          <PackagesDropdown
            onClose={closeDropdown}
            packages={packages.packages}
            isLoading={packages.isLoading}
            hasError={packages.hasError}
          />
        );
      case "destinations":
        return (
          <DestinationsDropdown
            onClose={closeDropdown}
            destinations={destinations.items}
            isLoading={destinations.isLoading}
            hasError={destinations.hasError}
          />
        );
      case "experiences":
        return (
          <ExperiencesDropdown
            onClose={closeDropdown}
            experiences={experiences.items}
            isLoading={experiences.isLoading}
            hasError={experiences.hasError}
          />
        );
      case "temples":
        return (
          <TemplesDropdown
            onClose={closeDropdown}
            temples={temples.items}
            isLoading={temples.isLoading}
            hasError={temples.hasError}
          />
        );
      case "more":
        return <MoreDropdown onClose={closeDropdown} />;
      default:
        return null;
    }
  };

  /**
   * The same collections, flattened for the drawer.
   *
   * One shape for all five sections, so the mobile markup below is written once
   * instead of five times — and so a record that appears on desktop cannot go
   * missing on a phone.
   */
  const mobileGroup = (
    key: string,
  ): { items: MobileItem[]; isLoading: boolean; hasError: boolean; empty: string } => {
    switch (key) {
      case "packages":
        return {
          items: packages.packages.map((p) => ({
            href: `/package/${p.slug}`,
            label: p.title,
            sub: [p.duration, formatPrice(p.price)].filter(Boolean).join(" · "),
            image: p.image,
          })),
          isLoading: packages.isLoading,
          hasError: packages.hasError,
          empty: "No packages yet.",
        };
      case "destinations":
        return {
          items: destinations.items.map((d) => ({
            href: `/destinations/${d.slug}`,
            label: d.name,
            sub: d.fromSrinagar || "Base city",
            image: d.image,
          })),
          isLoading: destinations.isLoading,
          hasError: destinations.hasError,
          empty: "No destinations yet.",
        };
      case "experiences":
        return {
          items: experiences.items.map((e) => ({
            href: `/experiences/${e.slug}`,
            label: e.title,
            sub: [e.location, e.duration].filter(Boolean).join(" · "),
            image: e.image,
          })),
          isLoading: experiences.isLoading,
          hasError: experiences.hasError,
          empty: "No experiences yet.",
        };
      case "temples":
        return {
          items: temples.items.map((t) => ({
            href: `/temples/${t.slug}`,
            label: t.title,
            sub: [t.deity, t.distance].filter(Boolean).join(" · "),
            image: t.image,
          })),
          isLoading: temples.isLoading,
          hasError: temples.hasError,
          empty: "No temples yet.",
        };
      case "more":
        return {
          items: NAV_MORE_LINKS.map((l) => ({
            href: l.href,
            label: l.label,
            sub: l.desc,
          })),
          isLoading: false,
          hasError: false,
          empty: "",
        };
      default:
        return { items: [], isLoading: false, hasError: false, empty: "" };
    }
  };

  return (
    <>
      <EnquiryPopupForm isOpen={isOpen} onClose={() => setOpen(false)} />
      <header className="fixed top-0 right-0 left-0 z-50">
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
          <nav className="max-w-8xl mx-auto flex h-[70px] items-center justify-between px-6 lg:px-12">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <Image
                src="/Experience_my_India.webp"
                width={120}
                height={120}
                alt="Experience My India Website Logo"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <ul className="hidden items-center gap-0.5 xl:flex 2xl:gap-1.5">
              {NAV_LINKS.map((link) => {
                const hasDropdown = link.dropdown !== null;
                const isActive = hasDropdown && activeDropdown === link.dropdown;

                const triggerClass = `group relative flex items-center gap-1 rounded-lg px-2.5 py-2 text-[0.8rem] font-medium whitespace-nowrap tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-sky-50 text-sky-600"
                    : "text-slate-700 hover:bg-sky-50/70 hover:text-sky-600"
                }`;

                const chevron = hasDropdown && (
                  <svg
                    className={`h-3 w-3 transition-transform duration-200 ${isActive ? "rotate-180 text-sky-600" : "text-slate-400"}`}
                    viewBox="0 0 12 12"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 4l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                );

                return (
                  <li
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => hasDropdown && openDropdown(link.dropdown!)}
                    onMouseLeave={() => hasDropdown && scheduleClose()}
                  >
                    {/* A dropdown-only item has nowhere to navigate, so it is a
                        button rather than an anchor to nothing. */}
                    {link.href ? (
                      <Link href={link.href} className={triggerClass}>
                        {link.label}
                        {chevron}
                        {!hasDropdown && (
                          <span className="absolute -bottom-0.5 right-2.5 left-2.5 h-px scale-x-0 rounded-full bg-sky-500 transition-transform duration-300 group-hover:scale-x-100" />
                        )}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={triggerClass}
                        aria-expanded={isActive}
                        aria-haspopup="true"
                        onClick={() =>
                          isActive ? closeDropdown() : openDropdown(link.dropdown!)
                        }
                      >
                        {link.label}
                        {chevron}
                      </button>
                    )}

                    {isActive && (
                      <div
                        onMouseEnter={() => openDropdown(link.dropdown!)}
                        onMouseLeave={scheduleClose}
                      >
                        {renderPanel(link.dropdown!)}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Desktop right */}
            <div className="hidden shrink-0 items-center gap-3 xl:flex">
              <button
                onClick={() => setOpen(true)}
                className="rounded-4xl px-4 py-2.5 text-[0.8rem] font-semibold whitespace-nowrap text-white transition-all duration-300 hover:-translate-y-px 2xl:px-5"
                style={{
                  background: "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)",
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
              className="relative flex h-9 w-9 items-center justify-center rounded-lg xl:hidden"
              style={{
                background: "rgba(15,23,42,0.04)",
                border: "1px solid rgba(15,23,42,0.10)",
              }}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <div className="flex w-5 flex-col gap-[5px]">
                <span
                  className={`block h-[1.5px] origin-center rounded bg-slate-800 transition-all duration-300 ${mobileOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-[1.5px] rounded bg-slate-800 transition-all duration-300 ${mobileOpen ? "scale-x-0 opacity-0" : ""}`}
                />
                <span
                  className={`block h-[1.5px] origin-center rounded bg-slate-800 transition-all duration-300 ${mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
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

        {/* ── Mobile drawer ──
            Scrolls internally rather than growing: with five expandable
            sections the drawer is easily taller than a phone screen, and a
            fixed header cannot grow past the viewport. */}
        <div
          className={`overflow-hidden transition-all duration-300 xl:hidden ${
            mobileOpen ? "max-h-[80vh] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
          }`}
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
              const isExpanded = hasDropdown && mobileExpanded === link.dropdown;
              const group = isExpanded ? mobileGroup(link.dropdown!) : null;

              return (
                <div key={link.label}>
                  <div
                    className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-sky-50"
                    onClick={() => {
                      if (!hasDropdown) return;
                      loadFor(link.dropdown!);
                      setMobileExpanded(isExpanded ? null : link.dropdown!);
                    }}
                  >
                    {link.href ? (
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          // Tapping the label of a section that has a panel
                          // should still go to its hub page, not just expand.
                          e.stopPropagation();
                          setMobileOpen(false);
                        }}
                        className="flex-1 text-[0.92rem] font-medium text-slate-700 hover:text-sky-600"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="flex-1 text-[0.92rem] font-medium text-slate-700">
                        {link.label}
                      </span>
                    )}
                    {hasDropdown ? (
                      <svg
                        className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        aria-hidden="true"
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

                  {group && (
                    <div className="mt-1 ml-3 flex flex-col gap-1 border-l border-sky-200 pl-3">
                      {group.isLoading && (
                        <p className="px-2 py-2 text-[0.72rem] text-slate-400">Loading…</p>
                      )}
                      {group.hasError && (
                        <p className="px-2 py-2 text-[0.72rem] text-slate-400">
                          Couldn&apos;t load these right now.
                        </p>
                      )}
                      {!group.isLoading && !group.hasError && group.items.length === 0 && (
                        <p className="px-2 py-2 text-[0.72rem] text-slate-400">{group.empty}</p>
                      )}
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-sky-50"
                        >
                          {/* The More menu has no thumbnails; everything else
                              does, so the frame is only rendered when there is
                              a picture to put in it. */}
                          {item.image !== undefined && (
                            <div
                              className="relative h-9 w-12 shrink-0 overflow-hidden rounded-lg"
                              style={{ background: "rgba(15,23,42,0.05)" }}
                            >
                              {item.image && (
                                <Image
                                  src={item.image}
                                  alt={item.label}
                                  fill
                                  unoptimized
                                  className="object-cover"
                                  sizes="48px"
                                />
                              )}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="truncate text-[0.78rem] font-medium text-slate-800">
                              {item.label}
                            </div>
                            {item.sub && (
                              <div className="truncate text-[0.65rem] text-slate-400">
                                {item.sub}
                              </div>
                            )}
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
