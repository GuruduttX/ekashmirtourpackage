"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Heart, MapPin, Send, Share2, Star, Video } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import GalleryDialog from "@/components/experiences/GalleryDialog";
import type { ExperienceActivity } from "@/data/experienceActivities";
import type { GalleryImage } from "@/data/experienceGallery";

/**
 * /experiences/[slug] hero — a strip of portrait photos over the title block.
 *
 * Owns the page's H1 and its Breadcrumbs, and therefore the BreadcrumbList
 * JSON-LD, which the page emits nowhere else.
 *
 * ONE DOM, TWO LAYOUTS. Below lg the strip is an infinite marquee (the list
 * rendered twice, translated -50% by the shared `.animate-marquee` utility);
 * from lg it is a static four-column grid. Rather than render the photos twice
 * and toggle with `hidden`, the duplicate half of the track carries `lg:hidden`
 * and the animation is switched off at lg — so the grid genuinely has four
 * children and assistive tech never meets the same photo twice.
 *
 * Mobile height is deliberately compact: a portrait aspect at full width would
 * eat the whole screen before the title, so on the marquee the cards are a
 * fixed narrow width and the strip is short.
 *
 * ⚠️ The star rating is FABRICATED dummy data (see the data file's header). It
 * is rendered because the design calls for it, but no AggregateRating JSON-LD
 * is emitted for it anywhere, and "(N Ratings)" prints only when `ratingCount`
 * is set — which it deliberately never is yet.
 */
export default function ActivityHero({
  activity,
}: {
  activity: ExperienceActivity;
}) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  // UI-only, like the rest of the enquiry surfaces in this project: there is no
  // account system to persist a wishlist to yet.
  const [wishlisted, setWishlisted] = useState(false);
  const [shared, setShared] = useState(false);

  const photos = activity.gallery;
  // The lightbox speaks GalleryImage; an activity slide is the same picture
  // under different field names, so it is mapped rather than duplicated.
  const galleryImages: GalleryImage[] = photos.map((photo) => ({
    id: photo.id,
    url: photo.image,
    caption: photo.alt,
    alt: photo.alt,
  }));

  const track = [...photos, ...photos];

  const mapUrl =
    activity.mapUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${activity.title}, ${activity.location}, Kashmir`,
    )}`;

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  const handleShare = async () => {
    const url = window.location.href;
    // Native share sheet where there is one (mobile), clipboard everywhere else.
    if (navigator.share) {
      try {
        await navigator.share({ title: activity.title, url });
        return;
      } catch {
        // Cancelled, or the sheet refused — fall through to the clipboard.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or denied permission). Nothing
      // useful left to try, and a thrown error here would break the page.
    }
  };

  const actionClasses =
    "inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-sky-600";

  return (
    // pt clears the fixed navbar.
    <section className="bg-white pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Experiences", href: "/experiences/" },
            { label: activity.title },
          ]}
        />
      </div>

      {/* ---------- photo strip ---------- */}
      <div className="relative mt-5">
        {/* overflow-hidden is the marquee window below lg; at lg there is
            nothing overflowing, so it simply stops mattering. */}
        <div className="overflow-hidden lg:mx-auto lg:max-w-7xl lg:px-8">
          <div
            // animate-marquee-lg-none switches the animation off from lg up, so
            // the same element is a static four-column grid there with no
            // scrolling. Below lg it loops. See globals.css for why that is a
            // dedicated class and not `lg:animate-none`.
            className="animate-marquee animate-marquee-lg-none flex w-max gap-3 lg:grid lg:w-full lg:grid-cols-4 lg:gap-4"
            style={{ "--marquee-duration": "45s" } as React.CSSProperties}
          >
            {track.map((photo, position) => {
              const isDuplicate = position >= photos.length;

              return (
                <button
                  key={`${photo.id}-${position}`}
                  type="button"
                  onClick={() => openGallery(position % photos.length)}
                  // The second copy exists only to make the -50% loop seamless
                  // below lg. It is removed from the grid, from the tab order
                  // and from assistive tech.
                  aria-hidden={isDuplicate ? "true" : undefined}
                  tabIndex={isDuplicate ? -1 : undefined}
                  aria-label={`Open photo: ${photo.alt}`}
                  className={`group relative aspect-8/15 w-40 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-slate-100 sm:w-48 lg:w-auto lg:shrink ${
                    isDuplicate ? "lg:hidden" : ""
                  }`}
                >
                  <Image
                    src={photo.image}
                    alt={isDuplicate ? "" : photo.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 192px"
                    priority={position < 4}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Video control only — the gallery is opened by tapping any photo, so a
            separate "show all" button was a second door to the same room.
            Rendered only when the record actually has videos, so the button
            never promises something that is not there, and the whole row is
            omitted rather than left as an empty box when it does not.
            One element, two placements: under the strip on mobile (where it
            would otherwise ride a moving photo), overlaid on the second image
            from lg, as in the design. */}
        {activity.videos?.length ? (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 px-4 lg:absolute lg:bottom-4 lg:left-1/4 lg:mt-0 lg:justify-start lg:px-0">
            <a
              href={activity.videos[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-900/20 transition-colors hover:bg-sky-600"
            >
              <Video aria-hidden="true" className="h-4 w-4" />
              Watch Videos
            </a>
          </div>
        ) : null}
      </div>

      {/* ---------- title + actions ---------- */}
      <div className="mx-auto mt-6 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 text-center md:text-left">
            <h1 className="font-heading text-2xl font-bold text-sky-500 sm:text-3xl lg:text-4xl">
              {activity.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-start">
              {typeof activity.rating === "number" && (
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }, (_, star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star < Math.round(activity.rating!)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-200"
                        }`}
                      />
                    ))}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {activity.rating}
                  </span>
                  {/* Only prints with a real count behind it. */}
                  {typeof activity.ratingCount === "number" && (
                    <span className="text-sm text-slate-500">
                      ({activity.ratingCount}{" "}
                      {activity.ratingCount === 1 ? "Rating" : "Ratings"})
                    </span>
                  )}
                  <span className="sr-only">out of 5</span>
                </span>
              )}

              <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                <MapPin aria-hidden="true" className="h-4 w-4 text-sky-500" />
                {activity.location}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 md:shrink-0">
            <button
              type="button"
              onClick={() => setWishlisted((prev) => !prev)}
              aria-pressed={wishlisted}
              className={`${actionClasses} ${wishlisted ? "text-rose-500" : ""}`}
            >
              <Heart
                aria-hidden="true"
                className={`h-4.5 w-4.5 ${wishlisted ? "fill-rose-500" : ""}`}
              />
              Wishlist
            </button>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClasses}
            >
              <Send aria-hidden="true" className="h-4.5 w-4.5" />
              View Map
            </a>

            <button type="button" onClick={handleShare} className={actionClasses}>
              {shared ? (
                <Check aria-hidden="true" className="h-4.5 w-4.5 text-emerald-600" />
              ) : (
                <Share2 aria-hidden="true" className="h-4.5 w-4.5" />
              )}
              {shared ? "Link copied" : "Share"}
            </button>
          </div>
        </div>
      </div>

      <GalleryDialog
        images={galleryImages}
        index={galleryIndex}
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        onIndexChange={setGalleryIndex}
      />
    </section>
  );
}
