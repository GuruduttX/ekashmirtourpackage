import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StayDetailHero from "@/components/stays/StayDetailHero";
import StayKeyFacts from "@/components/stays/StayKeyFacts";
import StayBookingCard from "@/components/stays/StayBookingCard";
import StayOverviewSection from "@/components/stays/StayOverviewSection";
import StayAmenitiesSection from "@/components/stays/StayAmenitiesSection";
import StayInclusionsSection from "@/components/stays/StayInclusionsSection";
import StayGallerySection from "@/components/stays/StayGallerySection";
import StayPoliciesSection from "@/components/stays/StayPoliciesSection";
import StayDetailTips from "@/components/stays/StayDetailTips";
import StayDetailFaqs from "@/components/stays/StayDetailFaqs";
import StayInternalLinks, {
  StayInternalLinksSkeleton,
} from "@/components/stays/StayInternalLinks";
import type { StayDetailPage } from "@/lib/stayDetailPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

/**
 * SOP §2.8 — Stay (MONEY page).
 *
 * Blueprint, in order: H1 → answer block → key facts → gallery → overview →
 * amenities → inclusions/exclusions → policies → Sartaj's tips → FAQ →
 * internal links → enquiry CTA.
 *
 * Schema: LodgingBusiness + Offer (real prices only) + BreadcrumbList (emitted
 * by the hero's Breadcrumbs) + FAQPage. No Review/AggregateRating — the model
 * carries no rating data on purpose.
 *
 * Built section by section; the hero is done, the rest follow.
 */
export default function StayDetailView({ stay }: { stay: StayDetailPage }) {
  const pageUrl = `${SITE_URL}/stays/${stay.slug}`;

  const lodgingSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: stay.title,
    description: stay.metaDescription || stay.quickAnswer,
    url: pageUrl,
    ...(stay.heroImage.image ? { image: stay.heroImage.image } : {}),
    address: {
      "@type": "PostalAddress",
      ...(stay.address ? { streetAddress: stay.address } : {}),
      addressLocality: stay.town,
      addressRegion: "Jammu & Kashmir",
      addressCountry: "IN",
    },
    ...(stay.checkIn ? { checkinTime: stay.checkIn } : {}),
    ...(stay.checkOut ? { checkoutTime: stay.checkOut } : {}),
    ...(stay.sleeps > 0 ? { occupancy: { "@type": "QuantitativeValue", maxValue: stay.sleeps } } : {}),
    amenityFeature: stay.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.label,
      value: true,
    })),
    ...(stay.priceFrom > 0
      ? {
          makesOffer: {
            "@type": "Offer",
            name: `${stay.title} — from`,
            price: stay.priceFrom,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: pageUrl,
          },
          priceRange: `From ₹${stay.priceFrom.toLocaleString("en-IN")} per night`,
        }
      : {}),
  };

  const faqSchema = stay.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: stay.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    // overflow-x-clip, not -hidden: `hidden` turns this into a scroll container
    // and silently kills every `sticky` descendant (the enquiry card, the
    // overview's Read more button). `clip` crops without that side effect.
    <main className="min-h-screen overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(lodgingSchema).replace(/</g, "\\u003c"),
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

      <StayDetailHero stay={stay} />

      {/* Two-column body: content on the left (wider), sticky enquiry card on
          the right. `items-start` is what lets the card actually stick — a
          stretched grid item has no free space to scroll within.
          On mobile the card comes first, so the price is visible immediately
          after the title rather than below every section. */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-start lg:gap-10">
          <aside className="order-first min-w-0 lg:order-last lg:sticky lg:top-28">
            <StayBookingCard stay={stay} />
          </aside>

          {/* min-w-0: grid items default to `min-width: auto`, so any wide
              child (the amenities scroll rail) would stretch this column past
              the viewport instead of scrolling inside it. */}
          <div className="min-w-0 space-y-10 lg:col-span-2">
            <StayKeyFacts stay={stay} />

            <StayOverviewSection overview={stay.overview} title={stay.title} />

            <StayAmenitiesSection amenities={stay.amenities} />

            <StayInclusionsSection
              inclusions={stay.inclusions}
              exclusions={stay.exclusions}
            />

            <StayGallerySection photos={stay.gallery} title={stay.title} />
            <StayPoliciesSection
              cancellationPolicy={stay.cancellationPolicy}
              paymentTerms={stay.paymentTerms}
              houseRules={stay.houseRules}
            />
            <StayDetailTips
              tips={stay.sartajTips}
              heading={stay.tipsHeading}
              intro={stay.tipsIntro}
            />

            <StayDetailFaqs
              faqs={stay.faqs}
              heading={stay.faqsHeading}
              intro={stay.faqsIntro}
            />
            {/* Suspense: the link cards need a DB lookup per link type, so they
                stream in rather than holding back everything above them. */}
            <Suspense fallback={<StayInternalLinksSkeleton />}>
              <StayInternalLinks
                links={stay.internalLinks}
                heading={stay.linksHeading}
                intro={stay.linksIntro}
                townName={stay.town}
              />
            </Suspense>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
