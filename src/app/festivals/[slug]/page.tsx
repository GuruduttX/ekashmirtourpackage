import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FestivalDetailHero from "@/components/festivals/detail/FestivalDetailHero";
import FestivalAtAGlance from "@/components/festivals/detail/FestivalAtAGlance";
import FestivalWhatHappens from "@/components/festivals/detail/FestivalWhatHappens";
import FestivalHowToAttend from "@/components/festivals/detail/FestivalHowToAttend";
import FestivalHistory from "@/components/festivals/detail/FestivalHistory";
import FestivalDetailGallery from "@/components/festivals/detail/FestivalDetailGallery";
import FestivalSartajTips from "@/components/festivals/detail/FestivalSartajTips";
import FestivalPlanCard from "@/components/festivals/detail/FestivalPlanCard";
import FestivalDetailCta from "@/components/festivals/detail/FestivalDetailCta";
import FestivalRelated from "@/components/festivals/detail/FestivalRelated";
import FaqAccordion from "@/components/ui/FaqAccordion";
import {
  galleryFor,
  getFestivalPage,
  getFestivalPages,
  getFestivalPageSlugs,
  rankRelatedFestivals,
} from "@/lib/festivalPage";
import type { Festival } from "@/types/festivalTypes";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * FESTIVAL DETAIL — /festivals/[slug]/ · SOP §2.6.
 *
 * Section order is the SOP blueprint, and the order matters more than the
 * design does: answer block → dates/at-a-glance → what happens → how to attend
 * (+ stay + cab) → history/significance → gallery → Sartaj tip → FAQ → CTA. A
 * reader arriving from "amarnath registration" gets the logistics before the
 * history; one arriving from "when is the tulip festival" gets the window in
 * the first paragraph. Reordering these blocks is a ranking decision, not a
 * layout one.
 *
 * DATA: CMS-first through src/lib/festivalPage.ts — a published Festival
 * record wins, and the static files (src/data/festivals.ts joined to
 * src/data/festivalDetails.ts) backfill any slug not migrated yet, so no page
 * 404s during the move. Every section takes props and returns null on missing
 * data, so a record an editor has half filled still renders a valid, if short,
 * page.
 */

/**
 * Every published festival prerenders — CMS records plus any static slug not
 * yet migrated. A slug added to the CMS after a build still renders on demand,
 * since this route leaves `dynamicParams` at its default.
 */
export async function generateStaticParams() {
  const slugs = await getFestivalPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const festival = await getFestivalPage(slug);

  if (!festival) return { title: "Festival not found" };

  // No trailing slash: the app serves URLs without one (Next's default
  // trailingSlash: false), so a canonical ending in "/" would point at a URL
  // that 308-redirects. Matches every other canonical on the site.
  const url = `${SITE_URL}/festivals/${festival.slug}`;
  // CMS overrides win; both fall back to generated copy, so a record with an
  // empty SEO section still ships a full head.
  const title =
    festival.seo?.title ??
    `${festival.name} 2026 | Dates, What Happens & How to Attend`;
  const description = festival.seo?.description ?? festival.quickAnswer;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "eKashmir Tour Packages",
      images: [{ url: festival.image, alt: festival.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [festival.image],
    },
  };
}

/**
 * Event schema, or null.
 *
 * THE GATE THAT MATTERS. schema.org Event requires a startDate, and a wrong
 * startDate is a wrong date shown in Google — strictly worse than no rich
 * result. So Event is emitted only for a festival whose dates have been
 * confirmed on the ground for the current year. Everything else states its
 * window in prose and emits nothing. See the header of src/data/festivals.ts.
 */
function eventSchemaFor(festival: Festival) {
  const { start, end } = festival.dates;
  if (!festival.datesVerified || !start) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: festival.name,
    description: festival.summary,
    url: `${SITE_URL}/festivals/${festival.slug}`,
    startDate: start,
    ...(end ? { endDate: end } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [festival.image],
    location: {
      "@type": "Place",
      name: festival.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: festival.location,
        addressRegion: "Jammu & Kashmir",
        addressCountry: "IN",
      },
    },
  };
}

/**
 * Place schema — SOP §2.6's second required type, and the one that is ALWAYS
 * safe to emit.
 *
 * Where the venue is makes no claim about when anything happens, so it carries
 * none of the risk that keeps Event behind a flag. This is what gives the
 * unverified seven of the eight festivals a structured-data footprint at all.
 */
function placeSchemaFor(festival: Festival) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: festival.venue,
    description: festival.summary,
    url: `${SITE_URL}/festivals/${festival.slug}`,
    image: [festival.image],
    address: {
      "@type": "PostalAddress",
      addressLocality: festival.location,
      addressRegion: "Jammu & Kashmir",
      addressCountry: "IN",
    },
  };
}

export default async function FestivalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const festival = await getFestivalPage(slug);

  if (!festival) notFound();

  // Same-season siblings first — a reader whose dates are fixed wants what else
  // falls in their window. Ranked over the same pool the hub shows.
  const related = rankRelatedFestivals(festival, await getFestivalPages());

  // Falls back to the shared festival reel when the record has no photos of its
  // own. A stock photo captioned as a named festival is the failure the data
  // file warns about, so an honest generic strip beats a specific lie.
  const gallery = galleryFor(festival);

  const eventSchema = eventSchemaFor(festival);
  const placeSchema = placeSchemaFor(festival);

  // Built from the same array the accordion renders, so the markup and the
  // visible answers are byte-identical. One FAQPage per URL — these are the
  // festival-specific questions; the hub keeps the hub-level ones, so the two
  // pages do not compete for the same queries.
  const faqSchema = festival.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: festival.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  const schemas = [eventSchema, placeSchema, faqSchema].filter(Boolean);

  return (
    // overflow-x-clip, not -hidden: `hidden` makes this a scroll container and
    // silently kills every `sticky` descendant further down the page.
    <main className="min-h-screen overflow-x-clip bg-white">
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}

      <Navbar />

      {/* Owns the H1 and the Breadcrumbs (and so the BreadcrumbList JSON-LD). */}
      <FestivalDetailHero festival={festival} />

      {/* ---------- two-column body ----------
          Same shape as /experiences/[slug]: a wide content column and a 340px
          rail whose card sticks below the navbar. Below lg the grid collapses
          to one column.

          `lg:items-start` is what makes the sticky work — the default `stretch`
          would make the aside as tall as the content column, leaving it nothing
          to stick within. */}
      <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
          <div className="min-w-0 space-y-6">
            <FestivalAtAGlance festival={festival} extraFacts={festival.facts} />

            <FestivalWhatHappens
              name={festival.shortName}
              intro={festival.intro}
              highlights={festival.highlights}
            />

            <FestivalHowToAttend
              name={festival.shortName}
              steps={festival.attend}
              destinationSlug={festival.destinationSlug}
              destinationLabel={festival.location}
            />

            <FestivalHistory
              name={festival.shortName}
              blocks={festival.history}
            />

            <FestivalDetailGallery
              name={festival.shortName}
              images={gallery}
            />

            <FestivalSartajTips tips={festival.sartajTips} />
          </div>

          {/* Sticky plan rail. `order-first` lifts it above the content column
              below lg so the window and the contact buttons are the first thing
              on a phone. It is a visual reorder only: the DOM keeps
              content-then-rail, which is the order that should be read out and
              tabbed through on desktop. */}
          <aside className="order-first min-w-0 lg:order-0 lg:sticky lg:top-28">
            <FestivalPlanCard festival={festival} />
          </aside>
        </div>
      </section>

      {festival.faqs?.length ? (
        <FaqAccordion
          faqs={festival.faqs}
          eyebrow="Before you go"
          headingLead={festival.shortName}
          headingAccent="questions"
        />
      ) : null}

      <FestivalDetailCta
        festival={festival}
        destinationLabel={festival.location}
      />

      <FestivalRelated festivals={related} />

      <Footer />
    </main>
  );
}
