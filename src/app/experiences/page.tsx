import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ExperienceHubHero from "@/components/experiences/ExperienceHubHero";
import ExperienceIntro from "@/components/experiences/ExperienceIntro";
import ExperienceArchive from "@/components/experiences/ExperienceArchive";
import WhatWeGive from "@/components/experiences/WhatWeGive";
import BestActivitiesByMonth from "@/components/experiences/BestActivitiesByMonth";
import TravellerReviews from "@/components/experiences/TravellerReviews";
import TravellersGallery from "@/components/experiences/TravellersGallery";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { EXPERIENCE_FAQS } from "@/data/experienceFaqs";
import { getAllExperiences } from "@/data/experiences";
import { getActivityPages } from "@/lib/experienceActivityPage";
import { getExperienceReviews } from "@/data/experienceReviews";
import { getGalleryImages } from "@/data/experienceGallery";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";
const PAGE_URL = `${SITE_URL}/experiences`;

const TITLE =
  "Kashmir Experiences & Activities 2026 | Shikara, Gondola, Skiing & Treks";
const DESCRIPTION =
  "Every Kashmir activity in one place — shikara rides, the Gulmarg Gondola, skiing, trekking, rafting, paragliding, camping, angling and golf, with the season each one runs in, how long it takes and who it suits.";

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
        alt: "Kashmir experiences — shikara rides, the Gulmarg Gondola, skiing and trekking",
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

export default async function ExperiencesHubPage() {
  const experiences = getAllExperiences();
  // CMS first, with the static file backfilling any activity not yet migrated
  // — see src/lib/experienceActivityPage.ts.
  const activities = await getActivityPages();

  // SOP §2.9 / A6 — hub = CollectionPage + ItemList. Each entry is a
  // TouristAttraction rather than a bare URL, so the activities themselves are
  // the entities; `touristType` carries the SOP A3 personas.
  //
  // Deliberately NO Offer / price on any item. The rates in src/data/experiences.ts
  // are unverified 2026 example figures — an Offer is a machine-readable price
  // commitment, and those belong on the individual experience pages once
  // verified. No AggregateRating until real on-page reviews exist.
  //
  // BreadcrumbList is emitted by <Breadcrumbs /> inside the hero, not here.
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
      name: "Kashmir experiences and activities",
      numberOfItems: experiences.length,
      itemListElement: experiences.map((experience, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristAttraction",
          name: experience.name,
          description: experience.summary,
          url: `${SITE_URL}/experiences/${experience.slug}/`,
          touristType: experience.audiences,
          address: {
            "@type": "PostalAddress",
            addressLocality: experience.location,
            addressRegion: "Jammu & Kashmir",
            addressCountry: "IN",
          },
        },
      })),
    },
  };

  // FAQPage built from the same array the accordion renders, so the markup and
  // the visible answers can never drift. Emitted here and nowhere else on this
  // URL — one FAQPage per page.
  const faqSchema = EXPERIENCE_FAQS.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: EXPERIENCE_FAQS.map((faq) => ({
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

      {/* Owns the H1 and the Breadcrumbs (and therefore the BreadcrumbList
          JSON-LD), so anything that replaces it has to keep both. Sized to
          100svh minus the fixed navbar — navbar + hero = exactly one screen. */}
      <ExperienceHubHero experiences={experiences} />

      {/* SOP §2.9 answer-first block. */}
      <ExperienceIntro />

      {/* Activity archive. Takes its list purely as a prop, so it neither knows
          nor cares whether a record came from Mongo or the static fallback. */}
      <ExperienceArchive activities={activities} />

      <WhatWeGive />
      
      <BestActivitiesByMonth activities={activities} />

      <TravellersGallery images={getGalleryImages()} />

      {/* PLACEHOLDER testimonials. No Review/AggregateRating schema is emitted
          for these — see the header of src/data/experienceReviews.ts. */}
      <TravellerReviews reviews={getExperienceReviews()} />


      {/* Closing section — the SOP blueprint ends FAQ → CTA. Fed from the same
          EXPERIENCE_FAQS array as the FAQPage JSON-LD emitted above, so the
          markup and the visible answers cannot drift apart. */}
      <FaqAccordion
        faqs={EXPERIENCE_FAQS}
        eyebrow="Before you book"
        headingLead="Kashmir experience"
        headingAccent="questions"
      />

      <Footer />
    </main>
  );
}