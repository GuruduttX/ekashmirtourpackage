import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StayListingHero from "@/components/stays/StayListingHero";
import StayArchive from "@/components/stays/StayArchive";
import StayFaqSection from "@/components/stays/StayFaqSection";
import type { Stay } from "@/data/stays";
import type { StayTypeDef } from "@/data/stayTaxonomy";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

/**
 * /stays/[type] — one of the four fixed stay categories.
 *
 * Everything except the archive is static: the hero copy comes from the
 * taxonomy, and the archive is the only part that changes, filtered to this
 * category. Schema is ItemList of the listings + BreadcrumbList (from the hero).
 */
export default function StayTypeView({
  type,
  stays,
}: {
  type: StayTypeDef;
  stays: Stay[];
}) {
  const priceFrom = Math.min(...stays.map((stay) => stay.priceFrom));
  const pageUrl = `${SITE_URL}/stays/${type.slug}`;

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: type.metaTitle,
    description: type.metaDescription,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "eKashmir Tour Packages",
      url: SITE_URL,
    },
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
          __html: JSON.stringify(listSchema).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />

      <StayListingHero
        eyebrow="Stay type"
        title={type.title}
        answerBlock={type.answerBlock}
        image={type.image}
        alt={type.alt}
        breadcrumbLabel={type.title}
        stayCount={stays.length}
        priceFrom={priceFrom}
      />

      {/* The only data-driven section on this page. Filters are off — every
          card here is the same category. */}
      <StayArchive
        stays={stays}
        heading={`Every ${type.category.toLowerCase()} we book`}
        intro={`Verified ${type.category.toLowerCase()} stays across the valley, with the real starting price for each — best for ${type.bestFor.toLowerCase()}.`}
        showFilters={false}
      />

      <StayFaqSection stays={stays} />

      <Footer />
    </main>
  );
}
