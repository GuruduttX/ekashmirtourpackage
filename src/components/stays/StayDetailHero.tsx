import Image from "next/image";
import { BedDouble, Images, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StayGallerySwiper from "@/components/stays/StayGallerySwiper";
import type { StayDetailPage } from "@/lib/stayDetailPage";

/**
 * Hero for an individual stay (/stays/[property-slug]).
 *
 * Photo-led, because on a property page the rooms are the product:
 *   breadcrumbs → photo grid → category chip + H1 + location
 *
 * The answer block, key facts and price card live in the two-column layout
 * below this — see StayDetailView.
 */

const CATEGORY_TYPE_SLUG: Record<string, string> = {
  Houseboat: "houseboats",
  Hotel: "hotels",
  Resort: "resorts",
  Homestay: "homestays",
};

export default function StayDetailHero({ stay }: { stay: StayDetailPage }) {
  const photos = stay.gallery.length
    ? stay.gallery
    : [{ id: "hero", image: stay.heroImage.image, alt: stay.heroImage.alt }];
  const [lead, ...rest] = photos;
  const sidePhotos = rest.slice(0, 2);

  const typeSlug = CATEGORY_TYPE_SLUG[stay.category];

  return (
    // Navbar is a 70px fixed bar; pt-20 clears it with a small breathing gap.
    <section className="w-full bg-white pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Stays", href: "/stays/" },
            ...(typeSlug
              ? [{ label: `${stay.category}s`, href: `/stays/${typeSlug}/` }]
              : []),
            { label: stay.title },
          ]}
        />

        {/* ---------- Photos ---------- */}
        {/* Mobile: swipeable track with dot indicator. */}
        <div className="mt-5">
          <StayGallerySwiper photos={photos} title={stay.title} />
        </div>

        {/* Desktop: lead shot + two supporting shots. */}
        <div className="mt-5 hidden gap-3 lg:grid lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-3xl bg-sky-100 lg:col-span-2 lg:aspect-16/10">
            {lead?.image && (
              <Image
                src={lead.image}
                alt={lead.alt || stay.title}
                fill
                unoptimized
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            )}

            {photos.length > 1 && (
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                <Images className="h-3.5 w-3.5" />
                {photos.length} photos
              </span>
            )}
          </div>

          {/* Supporting shots — desktop only; mobile keeps the lead photo alone
              so the fold still reaches the title and price. */}
          {sidePhotos.length > 0 && (
            <div className="hidden gap-3 lg:grid lg:grid-rows-2">
              {sidePhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative overflow-hidden rounded-3xl bg-sky-100"
                >
                  <Image
                    src={photo.image}
                    alt={photo.alt || stay.title}
                    fill
                    unoptimized
                    sizes="33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------- Title block, under the photos ---------- */}
        {/* Left-aligned at every width — on a property page the title/location
            pair reads as a listing header, not a centred section heading. */}
        <div className="mt-6 text-left">
          <h1 className="font-heading text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            {stay.title}
            {stay.titleAccent && (
              <>
                {" "}
                <span className="bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
                  {stay.titleAccent}
                </span>
              </>
            )}
          </h1>

          {/* Location + category eyebrow share a row — the eyebrow reads as a
              qualifier of the place rather than a separate stacked badge. */}
          <div className="mt-3 flex flex-wrap items-center justify-start gap-x-3 gap-y-2">
            <p className="flex items-center gap-1.5 text-sm text-slate-600">
              <MapPin className="h-4 w-4 shrink-0 text-sky-500" />
              {stay.area || stay.town}
            </p>

            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50 px-3.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-600">
              <BedDouble className="h-3.5 w-3.5" /> {stay.eyebrow}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
