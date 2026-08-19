import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Temple from "@/models/Temple";
import TempleDetailView from "@/components/temples/TempleDetailView";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

async function getTempleBySlug(slug: string) {
  await connectDB();
  const temple = await Temple.findOne({ slug, status: "published" }).lean();
  if (!temple) return null;
  return JSON.parse(JSON.stringify(temple));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const temple = await getTempleBySlug(slug);
  if (!temple) return {};

  const title = temple.metaTitle || `${temple.title} Timings, Rituals & How to Reach | eKashmir`;
  const description =
    temple.metaDescription ||
    temple.overview ||
    `Plan your visit to ${temple.title} — timings, entry, dress code and how to reach, verified by a Kashmir local.`;
  const url = `${SITE_URL}/temples/${slug}`;

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
      images: temple.image
        ? [{ url: temple.image, alt: temple.alt || title }]
        : [{ url: "/og-image.webp", width: 1734, height: 907, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: temple.image ? [temple.image] : ["/og-image.webp"],
    },
  };
}

export default async function TempleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const temple = await getTempleBySlug(slug);
  if (!temple) notFound();
  return <TempleDetailView temple={temple} />;
}
