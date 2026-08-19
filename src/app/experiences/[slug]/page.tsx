import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ActivityHero from "@/components/experiences/detail/ActivityHero";
import ActivityQuickFacts from "@/components/experiences/detail/ActivityQuickFacts";
import ActivityAbout from "@/components/experiences/detail/ActivityAbout";
import ActivityWhatToExpect from "@/components/experiences/detail/ActivityWhatToExpect";
import ActivityInclusions from "@/components/experiences/detail/ActivityInclusions";
import ActivityBookingTiming from "@/components/experiences/detail/ActivityBookingTiming";
import ActivityTips from "@/components/experiences/detail/ActivityTips";
// NOTE: ActivityBookingCta is intentionally no longer rendered. The sticky
// enquiry rail below is now the page's conversion point, and a second
// full-width enquiry band under it competed with the form rather than
// reinforcing it. The component is kept for reuse — delete it if the rail
// stays.
import ActivityEnquiryForm from "@/components/experiences/detail/ActivityEnquiryForm";
import ActivityRelated from "@/components/experiences/detail/ActivityRelated";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { WEEKDAYS } from "@/data/experienceActivities";
import {
  getActivityPage,
  getActivityPageSlugs,
  getRelatedActivityPages,
} from "@/lib/experienceActivityPage";
import type { ExperienceActivity } from "@/types/experienceActivityTypes";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * Every published activity prerenders — CMS records plus any static slug not
 * yet migrated. A slug added to the CMS after a build still renders on demand,
 * since this route leaves `dynamicParams` at its default.
 */
export async function generateStaticParams() {
  const slugs = await getActivityPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

/** Title and description fall back to generated copy when the CMS has no override. */
function seoFor(activity: ExperienceActivity) {
  const title =
    activity.seo?.title ??
    `${activity.title} in ${activity.location} 2026 | Price, Season & What to Expect`;

  const description =
    activity.seo?.description ??
    activity.quickAnswer ??
    `${activity.title} in ${activity.location} — how long it takes, the season it runs in, what is included and what is not, and what it costs.`;

  return { title, description };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const activity = await getActivityPage(slug);

  // A missing record must not produce a page with an empty title — the route
  // renders notFound() below, and this keeps the head consistent with that.
  if (!activity) return { title: "Activity not found" };

  const { title, description } = seoFor(activity);
  const url = `${SITE_URL}/experiences/${activity.slug}`;
  // A CMS record can be published before its photos are in. The share card then
  // falls back to whatever the site defaults to, rather than the head carrying
  // an undefined image URL.
  const cover = activity.gallery[0];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "eKashmir Tour Packages",
      ...(cover
        ? {
            images: [
              { url: cover.image, width: 1200, height: 630, alt: cover.alt },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(cover ? { images: [cover.image] } : {}),
    },
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const activity = await getActivityPage(slug);

  if (!activity) notFound();

  const related = await getRelatedActivityPages(activity);
  // Only the description is needed here; the title is head-only and set by
  // generateMetadata, which calls the same helper.
  const { description } = seoFor(activity);
  const url = `${SITE_URL}/experiences/${activity.slug}`;

  // SOP §2.9 — Service + Offer + BreadcrumbList + FAQPage.
  //
  // The Offer is attached ONLY when `priceVerified` is set on the record. An
  // Offer is a machine-readable price commitment, and the SOP forbids
  // publishing one built on an unverified figure — so an unverified activity
  // ships as a Service with no price, matching the visible "indicative rate"
  // caveat in the CTA. Both come from the same flag, so they cannot disagree.
  //
  // No AggregateRating in any case: `rating` is fabricated dummy data.
  // BreadcrumbList is emitted by <Breadcrumbs /> inside the hero.
  // OpeningHoursSpecification, but ONLY when the timings have been checked on
  // the ground. Published hours that are wrong send someone to a closed gate,
  // which is a worse failure than publishing none — so this is gated the same
  // way the Offer is, and by the same reasoning. The visible caveat in
  // ActivityBookingTiming reads from the identical flag.
  const hoursSchema =
    activity.timing?.verified && activity.timing.schedules.length
      ? activity.timing.schedules.flatMap((schedule) => {
          // Season-specific closures AND the standing weekly off, so the
          // emitted days match the chips the reader sees.
          const closed = [
            ...(schedule.closedDays ?? []),
            ...(activity.timing?.weeklyOff ?? []),
          ];
          const open = (schedule.days ?? WEEKDAYS.map((day) => day.id)).filter(
            (day) => !closed.includes(day),
          );
          const dayUrls = WEEKDAYS.filter((day) => open.includes(day.id)).map(
            (day) => day.schema,
          );

          return schedule.slots.map((slot) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: dayUrls,
            opens: slot.opens,
            closes: slot.closes,
            ...(schedule.season ? { name: schedule.season } : {}),
          }));
        })
      : [];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: activity.title,
    description,
    url,
    serviceType: "Tourist activity",
    ...(activity.gallery.length
      ? { image: activity.gallery.map((photo) => photo.image) }
      : {}),
    provider: {
      "@type": "TravelAgency",
      name: "eKashmir Tour Packages",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: activity.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: activity.location,
        addressRegion: "Jammu & Kashmir",
        addressCountry: "IN",
      },
    },
    ...(hoursSchema.length ? { hoursAvailable: hoursSchema } : {}),
    ...(activity.priceVerified
      ? {
          offers: {
            "@type": "Offer",
            price: activity.pricePerPerson,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url,
          },
        }
      : {}),
  };

  // Built from the same array the accordion renders, so the markup and the
  // visible answers are byte-identical. One FAQPage per URL.
  const faqSchema = activity.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: activity.faqs.map((faq) => ({
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
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
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

      {/* Owns the H1 and the Breadcrumbs (and so the BreadcrumbList JSON-LD). */}
      <ActivityHero activity={activity} />

      {/* ---------- two-column body ----------
          Same shape as /temples/[slug]: a wide content column and a 340px rail
          whose card sticks below the navbar. Below lg the grid collapses to one
          column and the rail falls in underneath the content, which is the right
          order on mobile — the reader should meet the activity before the form.

          `lg:items-start` is what makes the sticky work: the default `stretch`
          would make the aside as tall as the content column, leaving it nothing
          to stick within. */}
      <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
          {/* Main column. New sections drop in here. Every one returns null
              when its data is missing, which is what lets a half-filled CMS
              record still render a valid page. */}
          <div className="min-w-0 space-y-6">
            <ActivityQuickFacts activity={activity} />

            {/* CMS rich text. Sanitised server-side inside RichText. */}
            <ActivityAbout html={activity.aboutHtml} title={activity.title} />

            <ActivityWhatToExpect
              steps={activity.whatToExpect}
              title={activity.title}
            />

            <ActivityInclusions
              inclusions={activity.inclusions}
              exclusions={activity.exclusions}
            />

            {/* Structured hours, closed days and booking notice. */}
            <ActivityBookingTiming timing={activity.timing} />

            <ActivityTips
              bookingTips={activity.bookingTips}
              sartajTips={activity.sartajTips}
            />
          </div>

          {/* Sticky enquiry rail — the page's primary conversion point.

              `order-first` lifts it above the content column below lg, so on a
              phone the form sits directly above "At a glance". It is a visual
              reorder only: the DOM keeps content-then-form, which is the order
              that should be read out and tabbed through on desktop, where the
              rail is beside the content rather than ahead of it. */}
          <aside className="order-first min-w-0 lg:order-0 lg:sticky lg:top-28">
            <ActivityEnquiryForm activity={activity} />
          </aside>
        </div>
      </section>

      {activity.faqs?.length ? (
        <FaqAccordion
          faqs={activity.faqs}
          eyebrow="Before you book"
          headingLead={activity.title}
          headingAccent="questions"
        />
      ) : null}

      <ActivityRelated activity={activity} related={related} />

      <Footer />
    </main>
  );
}
