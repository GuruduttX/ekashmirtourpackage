import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  BookOpen,
  Car,
  Compass,
  Landmark,
  MapPin,
  Mountain,
  type LucideIcon,
} from "lucide-react";
import { hrefForLink } from "@/lib/stayPlacePage";
import { getStayLinkCards, stayLinkCardKey } from "@/lib/stayLinkCards";
import type { StayPlaceLinkType } from "@/types/stayPlaceTypes";

const LINK_ICON: Record<StayPlaceLinkType, LucideIcon> = {
  cab: Car,
  package: Compass,
  destination: MapPin,
  temple: Landmark,
  experience: Mountain,
  activity: Mountain,
  blog: BookOpen,
  stayType: BedDouble,
};

const LINK_LABEL: Record<StayPlaceLinkType, string> = {
  cab: "Cab route",
  package: "Tour package",
  destination: "Destination",
  temple: "Temple",
  experience: "Experience",
  activity: "Activity",
  blog: "Guide",
  stayType: "Stays",
};

type StayLink = {
  id: string;
  type: StayPlaceLinkType;
  label: string;
  slug: string;
  description?: string;
};

/**
 * Suspense fallback. Mirrors the real card geometry so the section does not
 * jump height when the lookup resolves.
 */
export function StayInternalLinksSkeleton() {
  return (
    <section className="animate-pulse">
      <div className="flex flex-col items-center gap-2 md:items-start">
        <div className="h-3 w-24 rounded-full bg-slate-200" />
        <div className="h-7 w-64 max-w-full rounded-lg bg-slate-200" />
      </div>

      <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
        {[0, 1].map((index) => (
          <div
            key={index}
            className="flex gap-3.5 rounded-2xl border border-slate-200 bg-white p-3"
          >
            <div className="h-20 w-20 shrink-0 rounded-xl bg-slate-100" />
            <div className="flex flex-1 flex-col justify-center gap-2">
              <div className="h-2.5 w-16 rounded-full bg-slate-100" />
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="h-3 w-full rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Internal links (SOP B3) rendered as cards.
 *
 * An async server component: the anchor text and description come from the stay
 * record, and the photo + real page title are resolved by getStayLinkCards,
 * which batches one query per link type. Wrapped in <Suspense> by the caller so
 * a slow lookup streams instead of blocking the page.
 *
 * A link whose target is unpublished, deleted, or not yet backed by a
 * collection still renders — as an icon tile instead of a photo. The link is
 * the point; the image is decoration.
 */
export default async function StayInternalLinks({
  links,
  heading,
  intro,
  townName,
}: {
  links: StayLink[];
  heading?: string;
  intro?: string;
  townName: string;
}) {
  if (!links.length) return null;

  const cards = await getStayLinkCards(
    links.map((link) => ({ type: link.type, slug: link.slug })),
  );

  return (
    <section id="nearby" className="scroll-mt-24">
      <div className="text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          Plan the rest
        </p>

        <h2 className="mt-2 font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
          {heading ?? `Planning the rest of your ${townName} trip?`}
        </h2>

        {intro && <p className="mt-2 text-sm text-slate-500">{intro}</p>}
      </div>

      <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
        {links.map((link) => {
          const slug = link.slug.replace(/^\/+|\/+$/g, "");
          const card = cards[stayLinkCardKey(link.type, slug)];
          const Icon = LINK_ICON[link.type] ?? Compass;

          return (
            <Link
              key={link.id || `${link.type}:${slug}`}
              href={hrefForLink(link)}
              className="group flex gap-3.5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md hover:shadow-sky-500/5"
            >
              {/* Thumbnail, or an icon tile when the target has no image. */}
              <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-sky-50">
                {card?.image ? (
                  <Image
                    src={card.image}
                    alt={card.title || link.label}
                    fill
                    unoptimized
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-sky-500">
                    <Icon className="h-7 w-7" />
                  </span>
                )}
              </span>

              <span className="flex min-w-0 flex-1 flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-sky-600">
                  <Icon className="h-3 w-3" />
                  {LINK_LABEL[link.type]}
                </span>

                {/* The CMS anchor text wins over the target's own title — SOP
                    B3 wants descriptive, varied anchors, not repeated titles. */}
                <span className="mt-1 font-heading text-[0.95rem] font-bold leading-snug text-slate-900 transition-colors group-hover:text-sky-700">
                  {link.label}
                </span>

                {link.description && (
                  <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {link.description}
                  </span>
                )}
              </span>

              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-sky-500" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
