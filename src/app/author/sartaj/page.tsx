import React from 'react';
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PackagesSection from "@/components/about/PackagesSection";
import {AboutSartaj} from "@/components/author/AboutSartaj";
import {LanguagesAndSpecialities} from "@/components/author/LanguagesAndSpecialities";
import {TourDetails} from "@/components/author/TourDetails";
import {HeroSection} from "@/components/author/HeroSection";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

const PAGE_URL = `${SITE_URL}/author/sartaj`;

export const metadata: Metadata = {
  title: "Sartaj — Kashmir Tour Planner | 20 Years Planning Kashmir Trips",
  description:
    "Sartaj was born and raised in Kashmir and has spent 20 years planning trips across the valley — packages, cabs, stays, temples and festivals, all verified on the ground.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "profile",
    title: "Sartaj — Kashmir Tour Planner",
    description:
      "Born and raised in Kashmir, 20 years planning trips across the valley. The author behind every guide on eKashmirTourPackage.com.",
    url: PAGE_URL,
    images: [
      {
        url: "/og-image.webp",
        width: 1734,
        height: 907,
        alt: "Sartaj — Kashmir tour planner",
      },
    ],
  },
};

/**
 * Author entity for the whole site (SOP A7). Every guide is bylined to this
 * page, so this is the URL that carries the site's E-E-A-T.
 *
 * TODO [CONFIRM]: `sameAs` is one of the four inputs the SOP gates the build
 * on — add Sartaj's real profile URLs (LinkedIn, Instagram, Google Business,
 * TripAdvisor) as soon as they are supplied. Until then the property is left
 * off entirely rather than filled with guesses.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sartaj",
  jobTitle: "Kashmir Tour Planner",
  worksFor: {
    "@type": "TravelAgency",
    name: "eKashmir Tour Packages",
    url: SITE_URL,
  },
  description:
    "Born and raised in Kashmir, 20 years planning trips across the valley — packages, cabs, stays, temples and festivals.",
  knowsAbout: [
    "Kashmir tour packages",
    "Kashmir cab routes",
    "Srinagar",
    "Gulmarg",
    "Pahalgam",
    "Sonamarg",
  ],
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
};


// ============================================================================
// MAIN PAGE EXPORT 
// ============================================================================
export default function SartajAuthorPage() {
  return (
    <>
    <main className="bg-white text-slate-900 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      
      <Navbar />
      
      <HeroSection />
      <AboutSartaj />
      <LanguagesAndSpecialities />
      <PackagesSection />
      <TourDetails />
      
     
    </main>
     <Footer />
     </>
  );
}