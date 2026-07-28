import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BookingCard from "@/components/package/BookingForm";
import DestinationRoute from "@/components/package/Destinationroute";
import InclusionsExclusions from "@/components/package/InclusionsExclusions";
import ItineraryStrip from "@/components/package/ItineraryStrip";
import KnowBeforeYouGo from "@/components/package/KnowBeforeYouGo";
import PackageCTA from "@/components/package/packageCTA";
import PackageFaqSection from "@/components/package/PackageFaqSection";
import PackageGalleryCarousel from "@/components/package/PackageGalleryCarousel";
import PackageHero from "@/components/package/PackageHero";
import PackageHighlights from "@/components/package/PackageHighlights";
import PackageInclusionsStrip from "@/components/package/PackageInclusionsStrip";
import PackageItinerary from "@/components/package/PackageItinerary";
import PackageLocationMap from "@/components/package/PackageLocationMap";
import PackageOverview from "@/components/package/PackageOverview";
import PackageTestimonials from "@/components/package/PackageTestimonial";
import PopularPackagesCarousel from "@/components/home/PopularPackagesCarousel";
import Policies from "@/components/package/Policies";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PackageDetailView({ pkg }: { pkg: any }) {
  // Booking card minimal data
  const bookingPkg = { title: pkg.title, price: `₹${(pkg.price ?? 0).toLocaleString("en-IN")}` };

  // Policies derived from DB fields
  const policies = [
    { title: "Refund Policy", description: pkg.refund || "Please contact us for refund details." },
    { title: "Cancellation Policy", description: pkg.cancel || "Please contact us for cancellation details." },
    { title: "Confirmation Policy", description: pkg.confirmation || "Advance payment required to confirm booking." },
    { title: "Payment Policy", description: pkg.payment || "50% advance, remaining at start of tour." },
  ].filter((p) => p.description);

  const pageUrl = `${SITE_URL}/kashmir-tour-packages/${pkg.slug}`;

  const tripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.schemaTitle || pkg.metaTitle || pkg.title,
    description: pkg.schemaDescription || pkg.metaDescription || pkg.overview || "",
    image: pkg.heroImage?.image,
    url: pageUrl,
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
      url: pageUrl,
    },
    touristType: pkg.category,
  };

  // FAQPage schema (AEO) — built from genuine, on-page FAQ content only.
  const faqItems = (pkg.faqs ?? []).filter(
    (f: { question?: string; answer?: string }) => f.question?.trim() && f.answer?.trim()
  );
  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f: { question: string; answer: string }) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;
  return (
    <main className="min-h-screen">
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
      <PackageHero
        title={pkg.title}
        duration={pkg.duration || `${pkg.days}N · ${pkg.nights}D`}
        rating={pkg.rating}
        reviews={pkg.reviews}
        destination={pkg.destination}
        heroImage={pkg.heroImage ?? { image: "", alt: pkg.title }}
        childImages={pkg.childImages ?? []}
        breadcrumbs={[
          { label: "Kashmir Tour Packages", href: "/kashmir-tour-packages/" },
          { label: pkg.title },
        ]}
      />
      {/* Itinerary strip + price — full-width row above the two-column layout */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-stretch gap-4 md:flex-row">
          <div className="min-w-0 flex-1">
            <ItineraryStrip
              durationbreakdown={pkg.durationbreakdown ?? []}
              duration={pkg.duration || `${pkg.days}N · ${pkg.nights}D`}
            />
          </div>
          <button
            className="flex shrink-0 items-center justify-center rounded-xl px-8 py-4 text-lg font-bold whitespace-nowrap text-white shadow-md shadow-sky-200 transition-transform hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(120deg, #0284C7 0%, #0EA5E9 45%, #38BDF8 100%)",
            }}
          >
            ₹ {(pkg.price ?? 0).toLocaleString("en-IN")}/Person
          </button>
        </div>
      </div>

      <section className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 md:py-16 lg:py-10 overflow-x-clip">
        <div className="grid min-w-0 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left column */}
          <div
            className="order-2 min-w-0 lg:order-1 lg:col-span-2 space-y-10 anim-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
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
            <InclusionsExclusions
              inclusions={pkg.inclusions ?? []}
              exclusions={pkg.exclusions ?? []}
            />
          </div>
          {/* Right sidebar */}
          <div
            className="order-1 min-w-0 lg:order-2 anim-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="sticky top-28 space-y-6">
              <BookingCard pkg={bookingPkg} />
            
            </div>
          </div>
        </div>

        <PackageItinerary PackageData={{ itinerary: pkg.itinerary_days ?? [] }} />

        <KnowBeforeYouGo PackageData={{ documents: pkg.knowBeforeYouGo ?? [] }} />
        <PackageGalleryCarousel
          images={[pkg.heroImage, ...(pkg.childImages ?? [])].filter(Boolean)}
        />
        <PopularPackagesCarousel />
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
