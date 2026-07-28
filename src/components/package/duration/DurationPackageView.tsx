import { connectDB } from "@/lib/db";
import Package from "@/models/Package";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import PackagesArchiveHero from "@/components/packageArchive/packageArchiveHero";
import TourCategories, { type PackageCard } from "@/components/home/TourCategories";
import PackageOverview from "@/components/package/PackageOverview";
import KashmirTrustStats from "@/components/packageArchive/Kashmirtruststats";
import PremiumTravelAssistance from "@/components/packageArchive/PremiumTravelAssistance";
import PackageTestimonials from "@/components/package/PackageTestimonial";
import PackageCTA from "@/components/package/packageCTA";
import PackageFaqSection from "@/components/package/PackageFaqSection";
import CityQuickAnswer from "@/components/package/city/CityQuickAnswer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

// ─── Types ───────────────────────────────────────────────
export interface DurationHubData {
  slug: string;
  days: number;
  nights: number;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  quickAnswer?: string;
  overview?: string;
  rating?: number;
  reviewsCount?: number;
  heroImage?: { image?: string; alt?: string };
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

async function getPackagesForDuration(days: number, nights: number): Promise<PackageCard[]> {
  try {
    await connectDB();
    const packages = await Package.find({ status: "published", days, nights })
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
export default async function DurationPackageView({ durationHub }: { durationHub: DurationHubData }) {
  const packages = await getPackagesForDuration(durationHub.days, durationHub.nights);

  const pageUrl = `${SITE_URL}/kashmir-tour-packages/${durationHub.slug}`;
  const durationLabel = `${durationHub.days} Days ${durationHub.nights} Nights`;

  // Split the H1 into a base + accent for the hero, avoiding duplication.
  const accent = durationHub.titleAccent?.trim() ?? "";
  const heroTitle =
    accent && durationHub.title.endsWith(accent)
      ? durationHub.title.slice(0, durationHub.title.length - accent.length).trim()
      : durationHub.title;

  const heroImages = durationHub.heroImage?.image ? [durationHub.heroImage.image] : undefined;

  const faqItems = (durationHub.faqs ?? []).filter(
    (f) => f.question?.trim() && f.answer?.trim()
  );

  // ── Structured data ──
  const tripSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: durationHub.schemaTitle || durationHub.metaTitle || durationHub.title,
    description:
      durationHub.schemaDescription || durationHub.metaDescription || durationHub.quickAnswer || "",
    image: durationHub.heroImage?.image,
    url: pageUrl,
    provider: {
      "@type": "TravelAgency",
      name: "eKashmir Tour Packages",
      url: SITE_URL,
    },
  };
  if ((durationHub.rating ?? 0) > 0 && (durationHub.reviewsCount ?? 0) > 0) {
    tripSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: durationHub.rating,
      reviewCount: durationHub.reviewsCount,
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

      <div className="mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Kashmir Tour Packages", href: "/kashmir-tour-packages" },
            { label: durationLabel },
          ]}
        />
      </div>

      <PackagesArchiveHero
        title={heroTitle}
        titleAccent={accent || undefined}
        subtitle={durationHub.subtitle || undefined}
        description={durationHub.metaDescription || undefined}
        images={heroImages}
        stats={durationHub.stats?.length ? durationHub.stats : undefined}
        totalPackages={packages.length}
        ctaHref="#tour-categories"
      />

      <CityQuickAnswer
        question={`What does a ${durationLabel} Kashmir tour include?`}
        answer={durationHub.quickAnswer ?? ""}
      />

      <TourCategories packages={packages.length > 0 ? packages : undefined} />

      {durationHub.overview?.trim() && (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <PackageOverview overview={durationHub.overview} />
        </div>
      )}

      <KashmirTrustStats />
      <PremiumTravelAssistance />

      <PackageTestimonials
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        PackageData={{ testimonials: (durationHub.testimonials ?? []) as any }}
      />

      <div className="px-3 md:px-27">
        <PackageCTA />
        <PackageFaqSection faqs={faqItems} />
      </div>

      <Footer />
    </main>
  );
}
