import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ItineraryStrip from "@/components/package/Itinerarystrip";
import PackageContent from "@/components/package/PackageContent";
import PackageHero from "@/components/package/PackageHero";
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
    <main className="min-h-screen bg-sky-50">
      <Navbar />
      <PackageHero />
      <PackageContent pkg={pkg} />

      <Footer />
    </main>
  );
}
