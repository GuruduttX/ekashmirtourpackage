import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Package from "@/models/Package";
import TourCategories, { type PackageCard } from "@/components/home/TourCategories";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PackageCTA from "@/components/package/packageCTA";
import PackageFaqSection from "@/components/package/PackageFaqSection";
import PackageTestimonials from "@/components/package/PackageTestimonial";
import KashmirTrustStats from "@/components/packageArchive/Kashmirtruststats";
import PackagesArchiveHero from "@/components/packageArchive/packageArchiveHero";
import PremiumTravelAssistance from "@/components/packageArchive/PremiumTravelAssistance";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

export const metadata: Metadata = {
  title: "Kashmir Tour Packages | All-Inclusive Holiday Deals",
  description:
    "Browse eKashmir's complete collection of Kashmir tour packages. Honeymoon, family, adventure & luxury packages with hotel, transfer & sightseeing included. Book at best prices.",
  alternates: { canonical: `${SITE_URL}/package` },
  openGraph: {
    type: "website",
    title: "Kashmir Tour Packages | All-Inclusive Holiday Deals",
    description:
      "Honeymoon, family, adventure & luxury Kashmir packages with hotel, transfer & sightseeing included. Book at best prices with eKashmir.",
    url: `${SITE_URL}/package`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kashmir Tour Packages by eKashmir" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kashmir Tour Packages | All-Inclusive Holiday Deals",
    description:
      "Honeymoon, family, adventure & luxury Kashmir packages with hotel, transfer & sightseeing included.",
    images: ["/og-image.jpg"],
  },
};

function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

function buildInclusions(pkg: {
  isTransferIncluded?: boolean;
  isStayIncluded?: boolean;
  isBreakfastIncluded?: boolean;
  isSightseeingIncluded?: boolean;
  inclusions?: Array<{ description: string }>;
}): string[] {
  const labels: string[] = [];
  if (pkg.isTransferIncluded) labels.push("Transfer Included");
  if (pkg.isStayIncluded) labels.push("Stay Included");
  if (pkg.isBreakfastIncluded) labels.push("Breakfast Included");
  if (pkg.isSightseeingIncluded) labels.push("Sightseeing Included");
  if (labels.length === 0 && pkg.inclusions?.length) {
    return pkg.inclusions.slice(0, 4).map((i) => i.description);
  }
  return labels;
}

export async function getPublishedPackages(): Promise<PackageCard[]> {
  try {
    await connectDB();
    const packages = await Package.find({ status: "published" })
      .select(
        "title slug category themes days destination price heroImage childImages isTransferIncluded isStayIncluded isBreakfastIncluded isSightseeingIncluded inclusions"
      )
      .sort({ createdAt: -1 })
      .lean();

    return packages.map((pkg) => {
      const heroSrc = pkg.heroImage?.image || "";
      const childSrcs = (pkg.childImages ?? []).slice(0, 4).map((c: { image: string }) => c.image);
      const images = [heroSrc, ...childSrcs].filter(Boolean);

      return {
        id: pkg._id.toString(),
        slug: pkg.slug,
        title: pkg.title,
        days: pkg.days ?? 0,
        location: pkg.destination || "Kashmir",
        idealFor: pkg.category,
        themes: pkg.themes ?? [],
        inclusions: buildInclusions(pkg as any),
        price: formatPrice(pkg.price ?? 0),
        originalPrice: "",
        images,
      };
    });
  } catch {
    return [];
  }
}

export default async function PackageArchivePage() {
  const packages = await getPublishedPackages();

  return (
    <div>
      <Navbar />
      <PackagesArchiveHero />
      <TourCategories packages={packages.length > 0 ? packages : undefined} />
      <KashmirTrustStats />
      <PremiumTravelAssistance />
      <PackageTestimonials />
      <div className="px-3 md:px-27">
        <PackageCTA />
        <PackageFaqSection />
      </div>
      <Footer />
    </div>
  );
}
