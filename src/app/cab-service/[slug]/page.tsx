import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Taxi from "@/models/Taxi";
import CabDetailView from "@/components/cab-service/CabDetailView";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

async function getCabBySlug(slug: string) {
  await connectDB();
  const cab = await Taxi.findOne({ slug, status: "published" }).lean();
  if (!cab) return null;
  return JSON.parse(JSON.stringify(cab));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cab = await getCabBySlug(slug);
  if (!cab) return {};

  const title = cab.metaTitle || `${cab.title} | Kashmir Cab Service`;
  const description =
    cab.metaDescription ||
    cab.overview ||
    `Book ${cab.title} for your Kashmir trip. Verified local cab service with eKashmir.`;
  const url = `${SITE_URL}/cab-service/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "eKashmir Tour Packages",
      images: cab.image
        ? [{ url: cab.image, alt: cab.alt || title }]
        : [{ url: "/og-image.webp", width: 1734, height: 907, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: cab.image ? [cab.image] : ["/og-image.webp"],
    },
  };
}

export default async function CabServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cab = await getCabBySlug(slug);
  if (!cab) notFound();
  return <CabDetailView cab={cab} />;
}
