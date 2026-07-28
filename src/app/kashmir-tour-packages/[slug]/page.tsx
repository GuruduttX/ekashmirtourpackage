import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Package from "@/models/Package";
import CityHub from "@/models/CityHub";
import ThemeHub from "@/models/ThemeHub";
import DurationHub from "@/models/DurationHub";
import { classifySlug } from "@/lib/classifySlug";
import CityPackageView from "@/components/package/city/CityPackageView";
import ThemePackageView from "@/components/package/theme/ThemePackageView";
import DurationPackageView from "@/components/package/duration/DurationPackageView";
import PackageDetailView from "@/components/package/PackageDetailView";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

async function getPackageBySlug(slug: string) {
  await connectDB();
  const pkg = await Package.findOne({ slug, status: "published" }).lean();
  if (!pkg) return null;
  // Fully serialize — converts ObjectIds, Dates to plain JSON types
  return JSON.parse(JSON.stringify(pkg));
}

async function getCityHubBySlug(slug: string) {
  await connectDB();
  const hub = await CityHub.findOne({ slug, status: "published" }).lean();
  if (!hub) return null;
  return JSON.parse(JSON.stringify(hub));
}

async function getThemeHubBySlug(slug: string) {
  await connectDB();
  const hub = await ThemeHub.findOne({ slug, status: "published" }).lean();
  if (!hub) return null;
  return JSON.parse(JSON.stringify(hub));
}

async function getDurationHubBySlug(slug: string) {
  await connectDB();
  const hub = await DurationHub.findOne({ slug, status: "published" }).lean();
  if (!hub) return null;
  return JSON.parse(JSON.stringify(hub));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // City hub metadata
  if (classifySlug(slug).type === "city") {
    const hub = await getCityHubBySlug(slug);
    if (hub) {
      const title = hub.metaTitle || hub.title;
      const description =
        hub.metaDescription ||
        hub.quickAnswer ||
        `Kashmir tour packages ${hub.titleAccent || `from ${hub.cityName}`}. Book all-inclusive holidays with eKashmir.`;
      const url = `${SITE_URL}/kashmir-tour-packages/${slug}`;
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
          images: hub.heroImage?.image
            ? [{ url: hub.heroImage.image, alt: hub.heroImage.alt || title }]
            : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: hub.heroImage?.image ? [hub.heroImage.image] : ["/og-image.jpg"],
        },
      };
    }
  }

  // Theme hub metadata
  if (classifySlug(slug).type === "theme") {
    const hub = await getThemeHubBySlug(slug);
    if (hub) {
      const title = hub.metaTitle || hub.title;
      const description =
        hub.metaDescription ||
        hub.quickAnswer ||
        `Kashmir ${hub.titleAccent || `${hub.themeName} tour packages`}. Book all-inclusive holidays with eKashmir.`;
      const url = `${SITE_URL}/kashmir-tour-packages/${slug}`;
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
          images: hub.heroImage?.image
            ? [{ url: hub.heroImage.image, alt: hub.heroImage.alt || title }]
            : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: hub.heroImage?.image ? [hub.heroImage.image] : ["/og-image.jpg"],
        },
      };
    }
  }

  // Duration hub metadata
  if (classifySlug(slug).type === "duration") {
    const hub = await getDurationHubBySlug(slug);
    if (hub) {
      const title = hub.metaTitle || hub.title;
      const description =
        hub.metaDescription ||
        hub.quickAnswer ||
        `${hub.days} days ${hub.nights} nights Kashmir tour packages. Book all-inclusive holidays with eKashmir.`;
      const url = `${SITE_URL}/kashmir-tour-packages/${slug}`;
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
          images: hub.heroImage?.image
            ? [{ url: hub.heroImage.image, alt: hub.heroImage.alt || title }]
            : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: hub.heroImage?.image ? [hub.heroImage.image] : ["/og-image.jpg"],
        },
      };
    }
  }

  try {
    await connectDB();
    const pkg = await Package.findOne({ slug, status: "published" })
      .select("metaTitle metaDescription title heroImage destination days category")
      .lean();
    if (!pkg) return {};

    const title = pkg.metaTitle || pkg.title;
    const description =
      pkg.metaDescription ||
      `Explore ${pkg.title}. ${pkg.days ? `${pkg.days}-day ` : ""}Kashmir tour package to ${pkg.destination || "Kashmir"}. Book now with eKashmir.`;
    const url = `${SITE_URL}/kashmir-tour-packages/${slug}`;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        title,
        description,
        url,
        siteName: "eKashmir Tour Packages",
        images: pkg.heroImage?.image
          ? [{ url: pkg.heroImage.image, alt: pkg.heroImage.alt || title }]
          : [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: pkg.heroImage?.image ? [pkg.heroImage.image] : ["/og-image.jpg"],
      },
    };
  } catch {
    return {};
  }
}

export default async function KashmirTourPackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const kind = classifySlug(slug).type;

  // City hub → origin-city landing page
  if (kind === "city") {
    const hub = await getCityHubBySlug(slug);
    if (hub) return <CityPackageView cityHub={hub} />;
  }

  // Theme hub → theme landing page
  if (kind === "theme") {
    const hub = await getThemeHubBySlug(slug);
    if (hub) return <ThemePackageView themeHub={hub} />;
  }

  // Duration hub → duration landing page
  if (kind === "duration") {
    const hub = await getDurationHubBySlug(slug);
    if (hub) return <DurationPackageView durationHub={hub} />;
  }

  // Otherwise → individual package detail page
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();
  return <PackageDetailView pkg={pkg} />;
}
