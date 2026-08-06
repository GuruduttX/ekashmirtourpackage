import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAllStays } from "@/data/stays";
import StayHubView from "@/components/stays/StayHubView";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";
const PAGE_URL = `${SITE_URL}/stays`;

const TITLE = "Kashmir Stays & Houseboats | Dal Lake Boats, Hotels & Resorts";
const DESCRIPTION =
  "Where to stay in Kashmir — Dal Lake houseboats, hotels in Srinagar, Gulmarg, Pahalgam and Sonamarg, resorts and homestays. Transparent price-from ranges and on-ground tips from a 20-year local.";

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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kashmir Stays & Houseboats" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function StaysHubPage() {
  const stays = getAllStays();

  // SOP: hub = CollectionPage + ItemList. BreadcrumbList is emitted by
  // <Breadcrumbs /> inside the view. No AggregateRating until real reviews.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    isPartOf: { "@type": "WebSite", name: "eKashmir Tour Packages", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: stays.map((stay, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: stay.title,
        url: `${SITE_URL}/stays/${stay.slug}`,
      })),
    },
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <StayHubView stays={stays} />
      <Footer />
    </main>
  );
}

