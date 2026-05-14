import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Package from "@/models/Package";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BookingCard from "@/components/package/BookingForm";
import DestinationRoute from "@/components/package/Destinationroute";
import InclusionsExclusions from "@/components/package/InclusionsExclusions";
import ItineraryStrip from "@/components/package/ItineraryStrip";
import KnowBeforeYouGo from "@/components/package/KnowBeforeYouGo";
import PackageCTA from "@/components/package/packageCTA";
import PackageFaqSection from "@/components/package/PackageFaqSection";
import PackageHero from "@/components/package/PackageHero";
import PackageHighlights from "@/components/package/PackageHighlights";
import PackageInclusionsStrip from "@/components/package/PackageInclusionsStrip";
import PackageItinerary from "@/components/package/PackageItinerary";
import PackageOverview from "@/components/package/PackageOverview";
import PackageTestimonials from "@/components/package/PackageTestimonial";
import Policies from "@/components/package/Policies";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

async function getPackageBySlug(slug: string) {
  await connectDB();
  const pkg = await Package.findOne({ slug, status: "published" }).lean();
  if (!pkg) return null;
  // Fully serialize — converts ObjectIds, Dates to plain JSON types
  return JSON.parse(JSON.stringify(pkg));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
    const url = `${SITE_URL}/package/${slug}`;

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

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  // Booking card minimal data
  const bookingPkg = { title: pkg.title, price: `₹${(pkg.price ?? 0).toLocaleString("en-IN")}` };

  // Policies derived from DB fields
  const policies = [
    { title: "Refund Policy", description: pkg.refund || "Please contact us for refund details." },
    { title: "Cancellation Policy", description: pkg.cancel || "Please contact us for cancellation details." },
    { title: "Confirmation Policy", description: pkg.confirmation || "Advance payment required to confirm booking." },
    { title: "Payment Policy", description: pkg.payment || "50% advance, remaining at start of tour." },
  ].filter((p) => p.description);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.schemaTitle || pkg.metaTitle || pkg.title,
    description: pkg.schemaDescription || pkg.metaDescription || pkg.overview || "",
    image: pkg.heroImage?.image,
    url: `${SITE_URL}/package/${pkg.slug}`,
    provider: {
      "@type": "TravelAgency",
      name: "eKashmir Tour Packages",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: pkg.price ?? 0,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/package/${pkg.slug}`,
    },
    touristType: pkg.category,
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <PackageHero
        title={pkg.title}
        duration={pkg.duration || `${pkg.days}N · ${pkg.nights}D`}
        rating={pkg.rating}
        reviews={pkg.reviews}
        destination={pkg.destination}
        heroImage={pkg.heroImage ?? { image: "", alt: pkg.title }}
        childImages={pkg.childImages ?? []}
      />

      <section className="flex-grow w-full max-w-7xl mx-auto py-0 md:py-16 lg:py-10 overflow-x-clip">
        <div className="grid min-w-0 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left column */}
          <div
            className="order-2 min-w-0 lg:order-1 lg:col-span-2 space-y-10 anim-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <ItineraryStrip
              durationbreakdown={pkg.durationbreakdown ?? []}
              duration={pkg.duration || `${pkg.days}N · ${pkg.nights}D`}
            />

            <PackageInclusionsStrip
              packageData={{
                isTransferIncluded: pkg.isTransferIncluded,
                isStayIncluded: pkg.isStayIncluded,
                isBreakfastIncluded: pkg.isBreakfastIncluded,
                isSightseeingIncluded: pkg.isSightseeingIncluded,
              }}
            />

            <DestinationRoute
              routeData={
                pkg.routes ?? {
                  source: pkg.destination || "Source",
                  destination: pkg.destination || "Destination",
                  segments: [],
                }
              }
            />

            <PackageOverview overview={pkg.overview || ""} />

            <PackageHighlights PackageData={{ highlights: pkg.highlights ?? [] }} />

            <PackageItinerary PackageData={{ itinerary: pkg.itinerary ?? [] }} />

            <InclusionsExclusions
              inclusions={pkg.inclusions ?? []}
              exclusions={pkg.exclusions ?? []}
            />
          </div>

          {/* Right sidebar */}
          <div
            className="order-1 min-w-0 lg:order-2 relative anim-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <BookingCard pkg={bookingPkg} />
          </div>
        </div>

        <KnowBeforeYouGo PackageData={{ documents: pkg.knowBeforeYouGo ?? [] }} />
        <div className="px-3">
        <PackageCTA />
        </div>
        <PackageTestimonials PackageData={{ testimonials: pkg.testimonials ?? [] }} />
        <PackageFaqSection faqs={pkg.faqs ?? []} />
        <Policies policies={policies} />
      </section>

      <Footer />
    </main>
  );
}
