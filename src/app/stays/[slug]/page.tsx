import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllStays, getStayBySlug } from "@/data/stays";
import StayDetailView from "@/components/stays/StayDetailView";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

export function generateStaticParams() {
  return getAllStays().map((stay) => ({ slug: stay.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stay = getStayBySlug(slug);
  if (!stay) return {};

  const title = stay.metaTitle || `${stay.title} — Prices, Options & How to Choose | eKashmir`;
  const description =
    stay.metaDescription ||
    stay.answerBlock ||
    `Where to stay: ${stay.title} in ${stay.town} — price-from ranges, amenities and on-ground tips from a Kashmir local.`;
  const url = `${SITE_URL}/stays/${slug}`;

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
      images: stay.image
        ? [{ url: stay.image, alt: stay.alt || title }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: stay.image ? [stay.image] : ["/og-image.jpg"],
    },
  };
}

export default async function StayDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stay = getStayBySlug(slug);
  if (!stay) notFound();
  return <StayDetailView stay={stay} />;
}
