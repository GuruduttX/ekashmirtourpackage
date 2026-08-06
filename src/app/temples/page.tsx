import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { connectDB } from "@/lib/db";
import Temple from "@/models/Temple";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TempleHubHero from "@/components/temples/TempleHubHero";
import TempleBookingSection from "@/components/temples/TempleBookingSection";
import TopTemplesSection from "@/components/temples/TopTemplesSection";
import TempleHubView from "@/components/temples/TempleHubView";
import WhyChooseUsSection from "@/components/temples/WhyChooseUsSection";
import TempleGallerySection from "@/components/temples/TempleGallerySection";
import TempleTestimonials from "@/components/temples/TempleTestimonials";
import PopularPackagesCarousel from "@/components/home/PopularPackagesCarousel";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

export const metadata: Metadata = {
  title: "Kashmir Temples & Shrines | Timings, Rituals & How to Reach",
  description:
    "Shankaracharya, Kheer Bhawani, Amarnath, Hazratbal, Charar-e-Sharief and Jamia Masjid — verified timings, entry, dress code and how to reach every temple and shrine in Kashmir.",
  alternates: { canonical: `${SITE_URL}/temples` },
  openGraph: {
    type: "website",
    title: "Kashmir Temples & Shrines | Timings, Rituals & How to Reach",
    description:
      "Verified timings, entry, dress code and how to reach every temple and shrine in Kashmir.",
    url: `${SITE_URL}/temples`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kashmir Temples & Shrines" }],
  },
};

async function getTemples() {
  await connectDB();
  const temples = await Temple.find({ status: "published" }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(temples));
}

export default async function TemplesHubPage() {
  const temples = await getTemples();

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <TempleHubHero />
      <TopTemplesSection />
      <TempleHubView temples={temples} />
      <TempleBookingSection />
      <WhyChooseUsSection />
      <TempleGallerySection />
      <div className="bg-white">
        <PopularPackagesCarousel />
        <div className="flex justify-center px-4 pb-10">
          <Link
            href="/kashmir-tour-packages/"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 to-cyan-400 px-10 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition-transform hover:-translate-y-0.5"
          >
            Explore Packages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <TempleTestimonials />
      <Footer />
    </main>
  );
}
