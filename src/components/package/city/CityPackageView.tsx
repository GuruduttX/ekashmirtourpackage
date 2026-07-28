import { connectDB } from "@/lib/db";
import Package from "@/models/Package";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategories, { type PackageCard } from "@/components/home/TourCategories";
import CityOverview from "@/components/package/city/CityOverview";
import KashmirTrustStats from "@/components/packageArchive/Kashmirtruststats";
import PremiumTravelAssistance from "@/components/packageArchive/PremiumTravelAssistance";
import PackageTestimonials from "@/components/package/PackageTestimonial";
import PackageCTA from "@/components/package/packageCTA";
import PackageFaqSection from "@/components/package/PackageFaqSection";
import CityHero from "@/components/package/city/CityHero";
import CityQuickAnswer from "@/components/package/city/CityQuickAnswer";
import CityGallery from "@/components/package/city/CityGallery";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

// ─── Types ───────────────────────────────────────────────
export interface CityHubData {
  slug: string;
  cityName: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  quickAnswer?: string;
  overview?: string;
  rating?: number;
  reviewsCount?: number;
  heroImage?: { image?: string; alt?: string };
  gallery?: string[];
  stats?: Array<{ value: string; label: string }>;
  testimonials?: Array<Record<string, unknown>>;
  faqs?: Array<{ id?: string; question: string; answer: string }>;
  metaTitle?: string;
  metaDescription?: string;
  schemaTitle?: string;
  schemaDescription?: string;
}

// ─── Package mapping (mirrors the archive grid) ──────────
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

async function getPackagesForCity(cityName: string): Promise<PackageCard[]> {
  try {
    await connectDB();
    const packages = await Package.find({ status: "published", availableSrc: cityName })
      .select(
        "title slug category themes days destination price heroImage childImages isTransferIncluded isStayIncluded isBreakfastIncluded isSightseeingIncluded inclusions"
      )
      .sort({ createdAt: -1 })
      .lean();

    return packages.map((pkg) => {
      const heroSrc = pkg.heroImage?.image || "";
      const childSrcs = (pkg.childImages ?? [])
        .slice(0, 4)
        .map((c: { image: string }) => c.image);
      const images = [heroSrc, ...childSrcs].filter(Boolean);

      return {
        id: pkg._id.toString(),
        slug: pkg.slug,
        title: pkg.title,
        days: pkg.days ?? 0,
        location: pkg.destination || "Kashmir",
        idealFor: pkg.category,
        themes: pkg.themes ?? [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// ─── View ────────────────────────────────────────────────
export default async function CityPackageView({ cityHub }: { cityHub: CityHubData }) {
  const packages = await getPackagesForCity(cityHub.cityName);

  const pageUrl = `${SITE_URL}/kashmir-tour-packages/${cityHub.slug}`;

  // Split the H1 into a base + accent for the hero, avoiding duplication.
  const accent = cityHub.titleAccent?.trim() ?? "";
  const heroTitle =
    accent && cityHub.title.endsWith(accent)
      ? cityHub.title.slice(0, cityHub.title.length - accent.length).trim()
      : cityHub.title;

  const galleryImages = Array.from(
    new Set([cityHub.heroImage?.image, ...(cityHub.gallery ?? [])].filter(Boolean) as string[])
  );
  const heroImages = galleryImages.slice(0, 5);

  const faqItems = (cityHub.faqs ?? []).filter(
    (f) => f.question?.trim() && f.answer?.trim()
  );

  // ── Structured data ──
  const tripSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: cityHub.schemaTitle || cityHub.metaTitle || cityHub.title,
    description:
      cityHub.schemaDescription || cityHub.metaDescription || cityHub.quickAnswer || "",
    image: cityHub.heroImage?.image,
    url: pageUrl,
    provider: {
      "@type": "TravelAgency",
      name: "eKashmir Tour Packages",
      url: SITE_URL,
    },
  };
  if ((cityHub.rating ?? 0) > 0 && (cityHub.reviewsCount ?? 0) > 0) {
    tripSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: cityHub.rating,
      reviewCount: cityHub.reviewsCount,
      bestRating: 5,
    };
  }

  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Navbar />

      <CityHero
        breadcrumbItems={[
          { label: "Kashmir Tour Packages", href: "/kashmir-tour-packages" },
          { label: cityHub.cityName },
        ]}
        title={heroTitle}
        titleAccent={accent || undefined}
        subtitle={cityHub.subtitle || undefined}
        images={heroImages}
        stats={cityHub.stats?.length ? cityHub.stats : undefined}
        totalPackages={packages.length}
        rating={cityHub.rating}
        reviewsCount={cityHub.reviewsCount}
        ctaHref="#tour-categories"
      />

      <CityQuickAnswer
        question={`Do you offer Kashmir tour packages ${accent || `from ${cityHub.cityName}`}?`}
        answer={cityHub.quickAnswer ?? ""}
      />

      <TourCategories packages={packages.length > 0 ? packages : undefined} />

      <CityOverview cityName={cityHub.cityName} overview={cityHub.overview ?? ""} />

      <CityGallery images={galleryImages} cityName={cityHub.cityName} />

      <KashmirTrustStats />
      <PremiumTravelAssistance />

      <PackageTestimonials
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        PackageData={{ testimonials: (cityHub.testimonials ?? []) as any }}
      />

      <div className="px-3 md:px-27">
        <PackageCTA />
        <PackageFaqSection faqs={faqItems} />
      </div>

      <Footer />
    </main>
  );
}
