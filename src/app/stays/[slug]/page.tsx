import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { classifyStaySlug } from "@/lib/classifyStaySlug";
import {
  getAllStays,
  getStayBySlug,
  getStaysByCategory,
  getStaysByPlace,
} from "@/data/stays";
import {
  STAY_PLACES,
  STAY_TYPES,
  getStayPlace,
  getStayType,
} from "@/data/stayTaxonomy";
import { connectDB } from "@/lib/db";
import StayPlace from "@/models/StayPlace";
import StayModel from "@/models/Stay";
import {
  recordToPage,
  staticPlaceToPage,
  type StayPlacePage,
} from "@/lib/stayPlacePage";
import {
  recordToStayDetail,
  staticStayToDetail,
  type StayDetailPage,
} from "@/lib/stayDetailPage";
import StayTypeView from "@/components/stays/StayTypeView";
import StayPlaceView from "@/components/stays/StayPlaceView";
import StayDetailView from "@/components/stays/StayDetailView";

export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

/**
 * /stays/[slug] serves three page types — see classifyStaySlug().
 * A place or type page with no matching stays 404s rather than publishing an
 * empty listing (SOP: no thin pages).
 */

/**
 * Place content: a published StayPlace record wins; otherwise we fall back to
 * the static taxonomy so pages stay alive while the CMS is being filled.
 */
async function getPlacePage(placeKey: string): Promise<StayPlacePage | null> {
  try {
    await connectDB();
    const record = await StayPlace.findOne({
      placeKey,
      status: "published",
    }).lean();
    if (record) return recordToPage(record);
  } catch {
    // DB unreachable — fall through to the static copy rather than 500.
  }

  const fallback = getStayPlace(placeKey);
  return fallback ? staticPlaceToPage(fallback) : null;
}

/**
 * Property content: a published Stay record wins; otherwise the static list.
 */
async function getStayDetail(slug: string): Promise<StayDetailPage | null> {
  try {
    await connectDB();
    const record = await StayModel.findOne({ slug, status: "published" }).lean();
    if (record) return recordToStayDetail(record);
  } catch {
    // DB unreachable — fall through to the static copy rather than 500.
  }

  const fallback = getStayBySlug(slug);
  return fallback ? staticStayToDetail(fallback) : null;
}

export function generateStaticParams() {
  return [
    ...STAY_TYPES.map((type) => ({ slug: type.slug })),
    ...STAY_PLACES.map((place) => ({ slug: `${place.slug}-stays` })),
    ...getAllStays().map((stay) => ({ slug: stay.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const kind = classifyStaySlug(slug);
  const url = `${SITE_URL}/stays/${slug}`;

  const build = (
    title: string,
    description: string,
    image?: string,
    alt?: string,
  ): Metadata => ({
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "eKashmir Tour Packages",
      images: image
        ? [{ url: image, alt: alt || title }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image ?? "/og-image.jpg"],
    },
  });

  // Type page
  if (kind.type === "type") {
    const type = getStayType(kind.slug);
    if (type && getStaysByCategory(type.category).length > 0) {
      return build(type.metaTitle, type.metaDescription, type.image, type.alt);
    }
  }

  // Place page
  if (kind.type === "place" && kind.placeKey) {
    const place = await getPlacePage(kind.placeKey);
    if (place && getStaysByPlace(place.placeKey).length > 0) {
      return build(
        place.metaTitle,
        place.metaDescription,
        place.heroImage.image,
        place.heroImage.alt,
      );
    }
  }

  // Individual property
  const stay = await getStayDetail(kind.slug);
  if (!stay) return {};

  return build(
    stay.metaTitle || `${stay.title} | eKashmir`,
    stay.metaDescription || stay.quickAnswer,
    stay.heroImage.image,
    stay.heroImage.alt,
  );
}

export default async function StayRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const kind = classifyStaySlug(slug);

  // Stay type → listing for one of the four fixed categories
  if (kind.type === "type") {
    const type = getStayType(kind.slug);
    if (type) {
      const stays = getStaysByCategory(type.category);
      if (stays.length > 0) return <StayTypeView type={type} stays={stays} />;
    }
  }

  // Place → listing for one town or area
  if (kind.type === "place" && kind.placeKey) {
    const place = await getPlacePage(kind.placeKey);
    if (place) {
      const stays = getStaysByPlace(place.placeKey);
      if (stays.length > 0) return <StayPlaceView place={place} stays={stays} />;
    }
  }

  // Otherwise → individual property
  const stay = await getStayDetail(kind.slug);
  if (!stay) notFound();
  return <StayDetailView stay={stay} />;
}
