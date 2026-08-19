import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
import { getPublishedPackages } from "./kashmir-tour-packages/page";
import { buildHomeActivities } from "@/lib/homeActivities";
import { ADDRESS_SCHEMA, CONTACT_EMAIL, SOCIAL_PROFILE_URLS } from "@/lib/contact";
import { WHATSAPP_TEL } from "@/lib/whatsapp";
import Hero from "@/components/home/AnimatedHeroHome";
import AboutUs from "@/components/home/AboutUs";
import CtaGradientBanner from "@/components/home/cta/CtaGradientBanner";
import CtaSplitImage from "@/components/home/cta/CtaSplitImage";
import CtaGlassOverlay from "@/components/home/cta/CtaGlassOverlay";


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
  address: ADDRESS_SCHEMA,
  // Same NAP a reader sees in the footer — an inconsistent address or phone
  // between the markup and the page is what suppresses a business in local results.
  telephone: WHATSAPP_TEL,
  email: CONTACT_EMAIL,
  sameAs: SOCIAL_PROFILE_URLS,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    telephone: WHATSAPP_TEL,
    email: CONTACT_EMAIL,
    areaServed: "IN",
    availableLanguage: ["English", "Hindi", "Kashmiri"],
  },
};

/**
 * WebSite (SOP §2.1). Belongs on the homepage and nowhere else — it describes
 * the site as a whole, so emitting it per-hub just repeats the same claim on a
 * dozen URLs.
 *
 * NO SearchAction, though the SOP lists one. Its `target` must be a URL that
 * actually runs a search, and this site has no search endpoint yet — pointing
 * it at a URL that ignores the query would be a claim the site cannot honour.
 * Add it the day a real search ships, not before.
 */
const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "eKashmir Tour Packages",
  url: SITE_URL,
  publisher: {
    "@type": "TravelAgency",
    name: "eKashmir Tour Packages",
    url: SITE_URL,
  },
};

export default async function HomePage() {
  const [packages, activities] = await Promise.all([
    getPublishedPackages(),
    buildHomeActivities(),
  ]);
  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <Hero />
      <AboutUs />
      <TopDestinations />
      <PopularPackagesCarousel />
      <CtaGradientBanner />
      <FeaturedPackages />
      <TourCategories packages={packages.length > 0 ? packages : undefined} />
      {activities.length > 0 && <ActivityCarousel activities={activities} />}
      <CtaSplitImage />
      <HowItWorks />
      <WhyKashmir />
      <MidPageCTA />
      <Testimonials />
      <CtaGlassOverlay />
      <CallToAction />
      <Footer />
    </main>
  );
}
