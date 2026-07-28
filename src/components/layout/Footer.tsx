"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";

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

const FacebookIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12A12 12 0 1 0 10.13 23.85v-8.38H7.08V12h3.05V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.52c-1.49 0-1.96.93-1.96 1.88V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12Z" />
  </svg>
);

const TwitterIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.9 1.5h3.68l-8.04 9.19L24 22.5h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.5h7.59l5.24 6.93ZM17.6 20.3h2.04L6.49 3.6H4.3Z" />
  </svg>
);

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Packages", href: "/kashmir-tour-packages/" },
  { label: "Activities", href: "/kashmir-tour-packages/" },
];

const SOCIALS = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
];

const CONTACT = [
  { Icon: Phone, text: "(+91) 6272828", href: "tel:+916272828" },
  { Icon: Mail, text: "exp@gmail.com", href: "mailto:exp@gmail.com" },
  { Icon: MapPin, text: "Noida, Sector-62", href: undefined },
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
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-14 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_1fr_1.1fr]">
          {/* ── Brand + socials ── */}
          <div>
            <div className="inline-flex items-center rounded-full bg-white px-5 py-2.5 shadow-md">
              <Image
                src="/Experience_my_India.webp"
                alt="Experience My India"
                width={170}
                height={44}
                className="h-9 w-auto object-contain"
              />
            </div>

            <div className="mt-7 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:bg-white/15"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick links ── */}
          <div>
            <h4 className="font-heading text-xl font-bold">Quick links</h4>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[15px] text-white/90 transition-colors hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Get in touch ── */}
          <div>
            <h4 className="font-heading text-xl font-bold">Get in touch</h4>
            <ul className="mt-5 space-y-4">
              {CONTACT.map(({ Icon, text, href }) => {
                const inner = (
                  <>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/50">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-[15px] text-white/90">{text}</span>
                  </>
                );
                return (
                  <li key={text}>
                    {href ? (
                      <a href={href} className="flex items-center gap-3 transition-opacity hover:opacity-80">
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Package thumbnails ── */}
          {packages.length > 0 && (
            <div className="grid grid-cols-3 gap-2.5">
              {packages.map((pkg) => (
                <Link
                  key={pkg.slug}
                  href={`/kashmir-tour-packages/${pkg.slug}`}
                  aria-label={pkg.title}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-white/40"
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
        </div>

        {/* Copyright */}
        <p className="mt-10 text-xs text-white/70">
          © {new Date().getFullYear()} eKashmir Tour Packages. All rights reserved.
        </p>
      </div>

      {/* ── Bottom mountains ── */}
      <img
        src="/footer-mountain.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none mt-6 w-full select-none"
      />
    </footer>
  );
}
