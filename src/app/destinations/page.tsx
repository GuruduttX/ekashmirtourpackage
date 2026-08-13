import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DestinationHubHero from "@/components/destinations/DestinationHubHero";
import TopDestinationsSection from "@/components/destinations/TopDestinationsSection";
import DestinationComparisonTable from "@/components/destinations/DestinationComparisonTable";
import DestinationItinerariesSection from "@/components/destinations/DestinationItinerariesSection";
import DestinationGallerySection from "@/components/destinations/DestinationGallerySection";
import DestinationFaqSection from "@/components/destinations/DestinationFaqSection";
import { DESTINATION_FAQS } from "@/data/destinationFaqs";
import { getAllDestinations } from "@/data/destinations";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";
const PAGE_URL = `${SITE_URL}/destinations`;

const TITLE =
  "Kashmir Destinations 2026 | Srinagar, Gulmarg, Pahalgam & Sonamarg";
const DESCRIPTION =
  "Every Kashmir destination in one place — Srinagar, Gulmarg, Pahalgam and Sonamarg with distances from Srinagar, best season, things to do and the cab fare and package that fits each one.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "eKashmir Tour Packages",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kashmir destinations — Srinagar, Gulmarg, Pahalgam and Sonamarg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function DestinationsHubPage() {
  const destinations = getAllDestinations();

  // SOP §2.4 / A6 — hub = CollectionPage + ItemList, with each entry typed as a
  // TouristDestination so the places themselves are the entities, not just URLs.
  // BreadcrumbList is emitted by <Breadcrumbs /> inside the hero. No
  // AggregateRating until real reviews exist.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    isPartOf: {
      "@type": "WebSite",
      name: "eKashmir Tour Packages",
      url: SITE_URL,
    },
    about: {
      "@type": "Place",
      name: "Kashmir Valley",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Jammu & Kashmir",
        addressCountry: "IN",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Kashmir destinations",
      numberOfItems: destinations.length,
      itemListElement: destinations.map((destination, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristDestination",
          name: destination.name,
          description: destination.summary,
          url: `${SITE_URL}/destinations/${destination.slug}/`,
          address: {
            "@type": "PostalAddress",
            addressLocality: destination.name,
            addressRegion: "Jammu & Kashmir",
            addressCountry: "IN",
          },
        },
      })),
    },
  };

  // FAQPage, built from the same array the accordion renders — the answers in
  // the markup are byte-identical to the answers on the page, which is what
  // keeps this compliant. Emitted here and nowhere else: one FAQPage per URL.
  const faqSchema = DESTINATION_FAQS.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: DESTINATION_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    // overflow-x-clip, not -hidden: `hidden` makes this a scroll container and
    // silently kills every `sticky` descendant further down the page.
    <main className="min-h-screen overflow-x-clip bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <Navbar />

      <DestinationHubHero destinations={destinations} />

      <TopDestinationsSection destinations={destinations} />

      <DestinationComparisonTable destinations={destinations} />

      <DestinationItinerariesSection destinations={destinations} />

      <DestinationGallerySection destinations={destinations} />

      <DestinationFaqSection />

      <Footer />
    </main>
  );
}
