import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Taxi from "@/models/Taxi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CabServiceCTA from "@/components/cab-service/CabServiceCTA";
import CabHubHero from "@/components/cab-service/CabHubHero";
import CabBookingSection from "@/components/cab-service/CabBookingSection";
import CabWhyChooseUs from "@/components/cab-service/CabWhyChooseUs";
import CabExploreDestinations from "@/components/cab-service/CabExploreDestinations";
import CabTestimonials from "@/components/cab-service/CabTestimonials";
import CabFaqSection from "@/components/cab-service/CabFaqSection";
import CabServiceHubView from "@/components/cab-service/CabServiceHubView";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

export const metadata: Metadata = {
  title: "Kashmir Cab & Taxi Service | Book Verified Local Cabs",
  description:
    "Browse eKashmir's Kashmir cab and taxi fleet — sedans, SUVs, tempo travellers and luxury cabs for airport transfers, Srinagar sightseeing and full tour packages.",
  alternates: { canonical: `${SITE_URL}/cab-service` },
  openGraph: {
    type: "website",
    title: "Kashmir Cab & Taxi Service | Book Verified Local Cabs",
    description:
      "Sedans, SUVs, tempo travellers and luxury cabs for Kashmir transfers and sightseeing. Book with eKashmir.",
    url: `${SITE_URL}/cab-service`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kashmir Cab & Taxi Service" }],
  },
};

async function getCabs() {
  await connectDB();
  const cabs = await Taxi.find({ status: "published" }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(cabs));
}

export default async function CabServicePage() {
  const cabs = await getCabs();

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <CabHubHero />
      <CabBookingSection />
      <CabServiceHubView cabs={cabs} />
      <CabWhyChooseUs />
      <CabExploreDestinations />
      <CabTestimonials />
      <CabFaqSection />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CabServiceCTA />
      </div>
      <Footer />
    </main>
  );
}
