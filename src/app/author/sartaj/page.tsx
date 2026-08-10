import React from 'react';
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PackagesSection from "@/components/about/PackagesSection";
import {AboutSartaj} from "@/components/author/AboutSartaj";
import {LanguagesAndSpecialities} from "@/components/author/LanguagesAndSpecialities";
import {TourDetails} from "@/components/author/TourDetails";
import {HeroSection} from "@/components/author/HeroSection";

// --- MOCK COMPONENTS FOR PREVIEW (DELETE IN YOUR PROJECT) ---
const Link = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => (
  <a href={href} className={className}>{children}</a>
);

// ------------------------------------------------------------

const SITE_URL = "https://www.ekashmirtourpackage.com";

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
  knowsAbout: ["Kashmir tour packages", "Kashmir cab routes", "Srinagar", "Gulmarg", "Pahalgam", "Sonamarg"],
  url: `${SITE_URL}/author/sartaj`,
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