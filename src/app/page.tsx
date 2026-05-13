import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import TourCategories from "@/components/home/TourCategories";
import WhyKashmir from "@/components/home/WhyKashmir";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import ActivityCarousel from "@/components/home/Activitycarousel";
import HowItWorks from "@/components/home/Howitworks";
import MidPageCTA from "@/components/home/Midpagecta";
import TopDestinations from "@/components/home/Topdestinations";
import PopularPackagesCarousel from "@/components/home/PopularPackagesCarousel";
import HomeFaq from "@/components/home/HomeFaq";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

export const metadata: Metadata = {
  title: {
    absolute: "eKashmir Tour Packages | Premium Kashmir Holiday Packages",
  },
  description:
    "Book premium Kashmir tour packages with eKashmir. Explore Gulmarg, Dal Lake, Pahalgam & Sonamarg. Customized Kashmir holiday packages from ₹8,999. Best deals on Kashmir tours.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    title: "eKashmir Tour Packages | Premium Kashmir Holiday Packages",
    description:
      "Book premium Kashmir tour packages. Gulmarg snow retreats, Dal Lake houseboats, Pahalgam valley treks & Sonamarg glaciers. From ₹8,999.",
    url: SITE_URL,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "eKashmir Tour Packages — Premium Kashmir Holidays" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "eKashmir Tour Packages | Premium Kashmir Holiday Packages",
    description:
      "Book premium Kashmir tour packages. Gulmarg, Dal Lake, Pahalgam & Sonamarg. From ₹8,999.",
    images: ["/og-image.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "eKashmir Tour Packages",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    "Premium Kashmir tour packages — Gulmarg snow retreats, Dal Lake houseboats, Pahalgam valley treks. Luxury travel crafted for the discerning traveler.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Srinagar",
    addressRegion: "Jammu & Kashmir",
    postalCode: "190001",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi", "Kashmiri"],
  },
};

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Navbar />
      <HeroSection />
      <FeaturedPackages />
      <TourCategories />
      <ActivityCarousel />
      <HowItWorks />
      <PopularPackagesCarousel />
      <WhyKashmir />
      <MidPageCTA />
      <TopDestinations />
      <Testimonials />
      <CallToAction />
      <HomeFaq />
      <Footer />
    </main>
  );
}
