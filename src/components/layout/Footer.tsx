"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { WHATSAPP_TEL, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import {
  CONTACT_EMAIL,
  mailtoLink,
  ADDRESS_ONE_LINE,
  SOCIAL_PROFILES,
} from "@/lib/contact";

interface FooterPackage {
  slug: string;
  title: string;
  image: string;
}

// Brand glyphs — lucide dropped its brand icons, so use inline SVG paths.
type IconProps = { className?: string };

const InstagramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.21 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.98-11.4a1.58 1.58 0 1 1-1.58-1.57 1.58 1.58 0 0 1 1.58 1.57Z" />
  </svg>
);

const YoutubeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6Z" />
  </svg>
);

const TwitterIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.9 1.5h3.68l-8.04 9.19L24 22.5h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.5h7.59l5.24 6.93ZM17.6 20.3h2.04L6.49 3.6H4.3Z" />
  </svg>
);

/**
 * FOOTER LINK LISTS — the site's internal-linking floor (SOP B1/B3).
 *
 * STATIC ARRAYS, NOT A CMS FETCH, and that is the whole point. A footer link
 * only earns its keep if a crawler sees it, and anything loaded in the
 * `useEffect` below arrives after the HTML does — invisible to a crawler and to
 * an AI answer engine. These are module constants, so they ship inside the
 * server-rendered HTML of every page on the site. (A "use client" component is
 * still server-rendered on first paint; it is the effect, not the file, that is
 * client-only.)
 *
 * They are also deliberately CURATED rather than a mirror of the database. The
 * SOP asks for "top destinations / top routes", not every record — a footer
 * that grows a link per CMS row stops being navigation and starts being a
 * sitemap. When a new destination, activity or temple deserves a permanent
 * link from every page on the site, add it here on purpose.
 *
 * Every href below resolves to a real route. Check before adding: a dead link
 * in the footer is a dead link on every page at once.
 */

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Meet Sartaj", href: "/author/sartaj" },
  { label: "Reviews", href: "/review" },
  { label: "Contact", href: "/contact" },
];

/** Every hub — the top of each silo in the SOP A6 topical map. */
const HUB_LINKS = [
  { label: "Tour Packages", href: "/kashmir-tour-packages" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Festivals & Events", href: "/festivals" },
  { label: "Temples & Shrines", href: "/temples" },
  { label: "Stays & Houseboats", href: "/stays" },
  { label: "Cabs & Transport", href: "/cab-service" },
  { label: "Travel Guides", href: "/blog" },
];

const DESTINATION_LINKS = [
  { label: "Srinagar", href: "/destinations/srinagar" },
  { label: "Gulmarg", href: "/destinations/gulmarg" },
  { label: "Pahalgam", href: "/destinations/pahalgam" },
  { label: "Sonamarg", href: "/destinations/sonamarg" },
];

const ACTIVITY_LINKS = [
  { label: "Shikara Ride", href: "/experiences/dal-lake-shikara" },
  { label: "Gondola Ride", href: "/experiences/gondola-ride" },
  { label: "Skiing", href: "/experiences/skiing" },
  { label: "Houseboat Stay", href: "/experiences/houseboat-stay" },
  { label: "River Rafting", href: "/experiences/river-rafting" },
  { label: "Trekking", href: "/experiences/trekking" },
];

const TEMPLE_LINKS = [
  { label: "Shankaracharya Temple", href: "/temples/shankaracharya-temple" },
  { label: "Kheer Bhawani Temple", href: "/temples/kheer-bhawani-temple" },
];

/**
 * Every link column, in one array so the row is a single loop.
 *
 * ORDER IS DEPTH, left to right: site-wide pages, then the hubs, then the deep
 * pages under them. Hubs and their children stay in SEPARATE columns rather
 * than one merged list — putting /destinations and /destinations/gulmarg in the
 * same column tells a reader, and a crawler, that they sit at the same level.
 */
const LINK_COLUMNS = [
  { title: "Quick links", links: QUICK_LINKS },
  { title: "Explore", links: HUB_LINKS },
  { title: "Destinations", links: DESTINATION_LINKS },
  { title: "Things to do", links: ACTIVITY_LINKS },
  { title: "Temples", links: TEMPLE_LINKS },
];

// URLs come from src/lib/contact.ts so the footer and the organisation schema's
// `sameAs` can never list different profiles. Facebook is absent because there
// is no account URL yet — an href="#" here is a dead link on every page.
const SOCIALS = [
  { label: "Instagram", href: SOCIAL_PROFILES.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: SOCIAL_PROFILES.youtube, Icon: YoutubeIcon },
  { label: "X", href: SOCIAL_PROFILES.x, Icon: TwitterIcon },
];

const CONTACT = [
  { Icon: Phone, text: WHATSAPP_DISPLAY, href: `tel:${WHATSAPP_TEL}` },
  { Icon: Mail, text: CONTACT_EMAIL, href: mailtoLink() },
  { Icon: MapPin, text: ADDRESS_ONE_LINE, href: undefined },
];

export default function Footer() {
  const [packages, setPackages] = useState<FooterPackage[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/packages?status=published")
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        const list = (data?.packages ?? [])
          .map((p: { slug?: string; title?: string; heroImage?: { image?: string } }) => ({
            slug: p.slug ?? "",
            title: p.title ?? "",
            image: p.heroImage?.image ?? "",
          }))
          .filter((p: FooterPackage) => p.slug && p.image)
          .slice(0, 6);
        setPackages(list);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-linear-to-br from-sky-500 via-sky-400 to-sky-300 text-white"
    >
      {/* ── Bottom mountains ──
          A BACKGROUND LAYER, not a block in the flow. As a normal <img> this
          added its full rendered height to the footer — the artwork is
          1440×222, so roughly 200px of pure furniture on a desktop viewport,
          below the last line of text. Pinned to the bottom it costs nothing:
          the footer's height is now its content plus the padding below, and the
          ridge sits behind that padding.

          The top of the artwork is transparent sky, so the bottom bar reads
          against the footer's own gradient for most of its width, with the
          peaks rising behind it. `pb` on the content is what keeps the text
          clear of the solid rock lower down.

          Lazy + async: it is a ~950KB decorative PNG (inlined in the SVG) at the
          very bottom of every page on the site, so it must never compete with
          the content above it for bandwidth. */}
      <img
        src="/footer-mountain.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full select-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-10 pb-12 lg:px-12 lg:pb-16">
        {/* ── ONE ROW OF LINK COLUMNS ──
            Brand block plus all five lists across a single row, so the footer
            costs one screen-height rather than two stacked bands.

            Six columns only from lg. Below that they reflow 2-up (3-up from sm)
            — five 200px columns on a phone would be five columns of wrapped
            single words. The brand block spans the full width there so the logo
            and socials are not crushed into a half-column. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          {/* ── Brand + socials ── */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="inline-flex items-center rounded-full bg-white px-4 py-2 shadow-md">
              <Image
                src="/Experience_my_India.webp"
                alt="Experience My India"
                width={170}
                height={44}
                className="h-8 w-auto object-contain"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:bg-white/15"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* ── Get in touch ──
                Under the brand rather than in its own column: it is three rows,
                and a sixth column for it would have taken width from the lists
                while leaving its own column mostly empty. */}
            <ul className="mt-5 space-y-2.5">
              {CONTACT.map(({ Icon, text, href }) => {
                const inner = (
                  <>
                    <Icon className="h-4 w-4 shrink-0 text-white/80" />
                    <span className="text-sm text-white/90">{text}</span>
                  </>
                );
                return (
                  <li key={text}>
                    {href ? (
                      <a
                        href={href}
                        className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-2.5">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── The five link columns ── */}
          {LINK_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h4 className="font-heading text-base font-bold">{column.title}</h4>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-start gap-1.5 text-sm text-white/85 transition-colors hover:text-white"
                    >
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Package thumbnails ──
            The one CLIENT-LOADED block in the footer: it arrives after
            hydration, so it is decorative reinforcement of links that already
            exist in the HTML above, never the only route to a page. A single
            row here rather than a 3×2 block in a column — same six links, half
            the height. */}
        {packages.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2.5 border-t border-white/25 pt-6">
            <span className="mr-1 text-xs font-semibold tracking-wide text-white/70 uppercase">
              Popular packages
            </span>
            {packages.map((pkg) => (
              <Link
                key={pkg.slug}
                href={`/kashmir-tour-packages/${pkg.slug}`}
                aria-label={pkg.title}
                className="group relative h-14 w-14 overflow-hidden rounded-lg border border-white/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </Link>
            ))}
          </div>
        )}

        {/* ── Bottom bar ── */}
        <div className="mt-6 flex flex-col items-center gap-2 border-t border-white/25 pt-5 text-center [text-shadow:0_1px_6px_rgba(15,23,42,0.45)] sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-white/85">
            © {new Date().getFullYear()} eKashmir Tour Packages. All rights
            reserved.
          </p>

          <p className="text-xs text-white/85">
            Created and maintained by{" "}
            {/* External, so a plain <a> rather than next/link — and
                rel="noopener" because target="_blank" otherwise hands the new
                tab a reference back to this window. */}
            <a
              href="https://inventoapps.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-white/40 underline-offset-2 transition-colors hover:decoration-white"
            >
              Invento Apps
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
