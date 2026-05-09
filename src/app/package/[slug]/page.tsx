import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BookingCard from "@/components/package/BookingForm";
import DestinationRoute from "@/components/package/Destinationroute";
import InclusionsExclusions from "@/components/package/Inclusionsexclusions";
import ItineraryStrip from "@/components/package/Itinerarystrip";
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
import ProductRatings from "@/components/package/ProductRatings";
import { PACKAGES } from "@/lib/constants";

const toSlug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const DEMO_PACKAGE = {
  id: 999,
  title: "Kashmir Valley Discovery",
  duration: "5 Nights · 6 Days",
  price: "₹29,999",
  priceNote: "per person",
  tag: "Demo Package",
  tagColor: "bg-sky-500",
  description:
    "A temporary package dataset for previewing the package detail UI with a hero section, overview, itinerary, and booking sidebar.",
  image:
    "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
} as const;

export function generateStaticParams() {
  return PACKAGES.map((pkg) => ({
    slug: toSlug(pkg.title),
  }));
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg =
    PACKAGES.find((item) => toSlug(item.title) === slug) ?? DEMO_PACKAGE;

  return (
    <main className="min-h-screen ">
      <Navbar />
      <PackageHero />
      <section className="flex-grow w-full max-w-7xl mx-auto  py-10 md:py-16 lg:py-10 overflow-x-clip">
        <div className="grid min-w-0 lg:grid-cols-3 gap-12 lg:gap-16">
          <div
            className="order-2 min-w-0 lg:order-1 lg:col-span-2 space-y-16 anim-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <ItineraryStrip />
            <PackageInclusionsStrip packageData ={pkg}/>
            <DestinationRoute />
            <PackageOverview />
            <PackageHighlights />
            <PackageItinerary />
            <InclusionsExclusions />
          </div>
          <div
            className="order-1 min-w-0 lg:order-2 relative anim-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <BookingCard pkg={pkg} />
          </div>
        </div>
        <KnowBeforeYouGo />
        <PackageCTA />
        <PackageTestimonials />
        <PackageFaqSection />
        <Policies />
      </section>
      <Footer />
    </main>
  );
}
