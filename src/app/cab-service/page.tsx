import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Taxi from "@/models/Taxi";
import Navbar from "@/components/layout/Navbar";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Footer from "@/components/layout/Footer";
import CabServiceCTA from "@/components/cab-service/CabServiceCTA";
import CabHubHero from "@/components/cab-service/CabHubHero";
import CabBookingSection from "@/components/cab-service/CabBookingSection";
import CabWhyChooseUs from "@/components/cab-service/CabWhyChooseUs";
import CabExploreDestinations from "@/components/cab-service/CabExploreDestinations";
import CabTestimonials from "@/components/cab-service/CabTestimonials";
import CabFaqSection from "@/components/cab-service/CabFaqSection";
import CabServiceHubView from "@/components/cab-service/CabServiceHubView";
import { CAB_FAQS } from "@/data/cabFaqs";
import { ADDRESS_SCHEMA } from "@/lib/contact";
import { WHATSAPP_TEL } from "@/lib/whatsapp";

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

const PAGE_URL = `${SITE_URL}/cab-service`;

async function getCabs() {
  await connectDB();
  const cabs = await Taxi.find({ status: "published" }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(cabs));
}

/**
 * Service + BreadcrumbList + FAQPage, per SOP §2.7.
 *
 * NO Offer here. The hub quotes no fare of its own — the per-route pages own
 * the fare tables, and inventing a "from" price at hub level is exactly the
 * kind of drift the data-honesty rules exist to stop. No rating markup either:
 * CabTestimonials renders placeholder content.
 */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Taxi",
  name: "Kashmir Cab & Taxi Service",
  url: PAGE_URL,
  description:
    "Sedans, SUVs, tempo travellers and luxury cabs for Kashmir airport transfers, Srinagar sightseeing and point-to-point routes across the valley.",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Kashmir Valley, Jammu & Kashmir, India",
  },
  provider: {
    "@type": "TravelAgency",
    name: "eKashmir Tour Packages",
    url: SITE_URL,
    telephone: WHATSAPP_TEL,
    address: ADDRESS_SCHEMA,
  },
};

// BreadcrumbList comes from <Breadcrumbs /> below — one per URL, and it then
// always matches the trail the reader can see.

// Built from the same array CabFaqSection renders.
const faqSchema = CAB_FAQS.length
  ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: CAB_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    }
  : null;

export default async function CabServicePage() {
  const cabs = await getCabs();

  return (
    <main className="min-h-screen overflow-x-hidden">
      {[serviceSchema, faqSchema].filter(Boolean).map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Kashmir Cab Service" }]} />
      </div>
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
