import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DestinationDetailHero from "@/components/destinations/DestinationDetailHero";
import DestinationQuickFacts from "@/components/destinations/DestinationQuickFacts";
import DestinationThingsToDo from "@/components/destinations/DestinationThingsToDo";
import DestinationHowToReach from "@/components/destinations/DestinationHowToReach";
import DestinationCabFares from "@/components/destinations/DestinationCabFares";
import DestinationWhereToStay from "@/components/destinations/DestinationWhereToStay";
import DestinationBestTime from "@/components/destinations/DestinationBestTime";
import DestinationSartajTips from "@/components/destinations/DestinationSartajTips";
import DestinationMapSection from "@/components/destinations/DestinationMapSection";
import DestinationFaqSection from "@/components/destinations/DestinationFaqSection";
import CtaGradientBanner from "@/components/home/cta/CtaGradientBanner";
import DestinationPhotoStrip from "@/components/destinations/DestinationPhotoStrip";
import {
  getDestinationPage,
  getDestinationPageSlugs,
} from "@/lib/destinationPage";
import { resolveThingsToDo } from "@/lib/thingsToDo";
import { resolveCabFares } from "@/lib/cabFares";
import { getDestinationStays } from "@/lib/destinationStays";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

/**
 * SOP §2.4 — Destination page, /destinations/[place]/.
 *
 * Content comes from the Destination CMS collection, with
 * src/data/destinations.ts backfilling any slug not yet migrated — see
 * src/lib/destinationPage.ts. This page previously kept its own
 * `destinationMap` with a second copy of each place's facts; the two had
 * already drifted, which is why there is exactly one source now.
 *
 * Sections 4, 6 and 7 (things to do, cab fares, where to stay) store slugs
 * only, and the three resolvers below read the live Temple / Taxi / Stay
 * record — so a repriced cab or a renamed stay is never stale here.
 */

/**
 * Static params so these prerender instead of rendering on demand.
 * `dynamicParams` is left at its default, so a destination published in the
 * CMS after a build still renders — it is just not prebuilt.
 */
export async function generateStaticParams() {
  const slugs = await getDestinationPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationPage(slug);

  if (!destination) return {};

  // The CMS fields win; both fall back to the generated title and the answer
  // block, which is already written to say what the place is in under 60 words.
  const title =
    destination.metaTitle ||
    `${destination.name} Kashmir | Best Time, Things To Do & Packages`;
  const description = destination.metaDescription || destination.quickAnswer;
  const url = `${SITE_URL}/destinations/${slug}`;

  return {
    title,
    // The answer block doubles as the meta description: it is already written to
    // say what the place is in under 60 words.
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "eKashmir Tour Packages",
      images: [
        {
          url: destination.image,
          width: 1200,
          height: 630,
          alt: destination.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [destination.image],
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestinationPage(slug);

  if (!destination) notFound();

  // All three hit Mongo; run them together rather than stacking round trips.
  const [thingsToDo, cabFares, stays] = await Promise.all([
    resolveThingsToDo(destination.thingsToDo),
    resolveCabFares(destination.cabFares),
    getDestinationStays(destination.staySlugs),
  ]);

  // Rows saved with only half a question filled in would emit an FAQPage entry
  // with an empty answer, which is a structured-data error rather than a
  // cosmetic one.
  const faqs = destination.faqs.filter((faq) => faq.question && faq.answer);

  // One FAQPage per URL, emitted here rather than inside the accordion, and
  // built from the same array the accordion renders so the markup can never
  // claim an answer the page does not show.
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <Navbar />

      <DestinationDetailHero destination={destination} />
      <DestinationQuickFacts destination={destination} />
      <DestinationThingsToDo
        destinationName={destination.name}
        items={thingsToDo}
      />
      <DestinationHowToReach
        destinationName={destination.name}
        howToReach={destination.howToReach}
      />
      <DestinationCabFares
        destinationName={destination.name}
        fares={cabFares}
      />
      <DestinationWhereToStay
        destinationName={destination.name}
        stays={stays}
      />
      <DestinationBestTime
        destinationName={destination.name}
        bestTimeTable={destination.bestTimeTable}
      />

      <DestinationPhotoStrip
        destinationName={destination.name}
        images={destination.galleryImages}
      />

      <DestinationSartajTips
        destinationName={destination.name}
        tips={destination.sartajTips}
        intro={destination.tipsIntro}
      />
      <DestinationMapSection
        destinationName={destination.name}
        map={destination.map}
      />
      {faqs.length > 0 && (
        <DestinationFaqSection
          faqs={faqs}
          eyebrow={`Planning ${destination.name}`}
          headingLead={`${destination.name} travel`}
          headingAccent="questions"
        />
      )}

      <CtaGradientBanner
        eyebrow={`Plan ${destination.name} with a local`}
        heading={`Ready to plan your ${destination.name} trip?`}
        blurb={`Tell us your dates and we'll build the ${destination.name} leg around them — cabs, stays and the sightseeing that actually fits the day, priced up front.`}
        whatsappMessage={`Hi! I'd like to plan a trip to ${destination.name}, Kashmir. Can you help?`}
      />

      <Footer />
    </main>
  );
}
