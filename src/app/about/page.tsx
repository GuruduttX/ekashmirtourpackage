import type { Metadata } from "next";
import HeroSection from "@/components/about/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import DestinationsSection from "@/components/about/DestinationsSection";
import GallerySection from "@/components/about/GallerySection";
import StatsSection from "@/components/about/StatsSection";
import PackagesSection from "@/components/about/PackagesSection";
import FaqSection from "@/components/about/FaqSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ADDRESS_SCHEMA, CONTACT_EMAIL, SOCIAL_PROFILE_URLS } from "@/lib/contact";
import { WHATSAPP_TEL } from "@/lib/whatsapp";

/**
 * This page is deliberately a SERVER component. It used to be "use client",
 * which makes a `metadata` export impossible — the page shipped with the root
 * layout's generic title and, worse, inherited the root canonical and declared
 * itself a duplicate of the homepage. Every section below carries its own
 * "use client", so nothing here needs the directive.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: "About eKashmir | Kashmir Trips Planned by a 20-Year Local",
  description:
    "Who we are: a Srinagar-based team led by Sartaj, born and raised in Kashmir, planning packages, cabs and stays across the valley for 20 years.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    title: "About eKashmir | Kashmir Trips Planned by a 20-Year Local",
    description:
      "A Srinagar-based team led by Sartaj — 20 years planning Kashmir packages, cabs and stays.",
    url: PAGE_URL,
    images: [
      {
        url: "/og-image.webp",
        width: 1734,
        height: 907,
        alt: "About eKashmir Tour Packages",
      },
    ],
  },
};

/**
 * AboutPage + the organisation it describes. No AggregateRating here — the SOP
 * allows rating markup only where genuine on-page reviews are rendered.
 */
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About eKashmir Tour Packages",
  url: PAGE_URL,
  mainEntity: {
    "@type": "TravelAgency",
    name: "eKashmir Tour Packages",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    telephone: WHATSAPP_TEL,
    address: ADDRESS_SCHEMA,
    sameAs: SOCIAL_PROFILE_URLS,
    founder: {
      "@type": "Person",
      name: "Sartaj",
      url: `${SITE_URL}/author/sartaj`,
    },
  },
};

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />
      <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#00B4D8] selection:text-white pb-0 overflow-x-hidden">
        <main>
          <HeroSection />
          <AboutSection />
          <DestinationsSection />
          <GallerySection />
          <StatsSection />
          <PackagesSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
