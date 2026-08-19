import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FestivalHubHero from "@/components/festivals/FestivalHubHero";
import FestivalExplore from "@/components/festivals/FestivalExplore";
import FestivalWhyBanner from "@/components/festivals/FestivalWhyBanner";
import FestivalCalendar from "@/components/festivals/FestivalCalendar";
import FestivalGallery from "@/components/festivals/FestivalGallery";
import { getFestivalGallery } from "@/data/festivalGallery";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { FESTIVAL_FAQS } from "@/data/festivalFaqs";
import { getFestivalPages } from "@/lib/festivalPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";
const PAGE_URL = `${SITE_URL}/festivals`;

const TITLE =
  "Kashmir Festivals & Events 2026 | Tulip Festival, Amarnath Yatra & Saffron Harvest";
const DESCRIPTION =
  "Every Kashmir festival in one place — the Tulip Festival, Amarnath Yatra, Gulmarg Winter Festival, saffron harvest, Shikara Festival, Kheer Bhawani Mela and the Sufi urs gatherings, with the window each one falls in and how to plan around it.";

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
        url: "/og-image.webp",
        width: 1734,
        height: 907,
        alt: "Kashmir festivals — tulips in bloom, the Amarnath Yatra and the saffron harvest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.webp"],
  },
};

export default async function FestivalsHubPage() {
  // CMS-first, with the static files backfilling any slug not migrated yet —
  // see src/lib/festivalPage.ts. Published records only, so a draft festival
  // never reaches the grid or the ItemList.
  const festivals = await getFestivalPages();

  // SOP §2.6 / A6 — hub = CollectionPage + ItemList, mirroring /experiences.
  //
  // DELIBERATELY NOT `Event`. The SOP says Event{startDate, endDate} with real
  // dates only, and six of these eight move every year — see the header of
  // src/data/festivals.ts. Event markup needs a startDate, so emitting it here
  // would mean inventing one, which is a wrong-date rich result in Google.
  // Each item is therefore a plain thing-with-a-URL, and Event lands on the
  // individual festival pages, gated on `datesVerified`.
  //
  // No Offer and no AggregateRating anywhere: nothing here is priced by us and
  // there are no on-page reviews of a festival.
  //
  // BreadcrumbList is emitted by <Breadcrumbs /> below, not here.
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
      name: "Kashmir festivals and events",
      numberOfItems: festivals.length,
      itemListElement: festivals.map((festival, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: festival.name,
        description: festival.summary,
        url: `${SITE_URL}/festivals/${festival.slug}/`,
      })),
    },
  };

  // FAQPage built from the same array the accordion renders, so the markup and
  // the visible answers can never drift. Emitted here and nowhere else on this
  // URL — one FAQPage per page.
  const faqSchema = FESTIVAL_FAQS.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FESTIVAL_FAQS.map((faq) => ({
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

      {/* SHARED BACKGROUND — the blossom / pale-sky plate.
          This wrapper exists because of how the hero ends: the bottom of
          festival-hero-image.webp is cut to a curve and is TRANSPARENT below it,
          so the pink blossoms at the left and the pale sky at the right that
          appear under the sweep in the Figma comp are this image showing
          through, not part of the hero.
          It therefore has to be ONE image spanning the hero AND the "Explore
          Kashmir Festivals" section — giving each section its own copy would
          repeat the blossom branch and put a visible seam right on the curve.
          So: every section that sits on this plate goes INSIDE this wrapper. */}
      <div className="relative">
        {/* The plate does NOT span the full wrapper — it starts at ~80% of the
            hero's height and runs to the bottom. Only the last fifth of the
            hero is transparent (the curve), so covering the whole hero as well
            just forced `object-cover` to scale the artwork up over a much
            taller box, which is what stretched the blossoms out of scale. The
            offsets below are 80% of each hero height breakpoint in
            FestivalHubHero: 600px → 480px, 680px → 544px, and from md the hero
            is 1440/781 of the viewport (≈54.2vw, capped at 880px) so 80% is
            ≈43.4vw capped at 704px. Change the hero height and change these. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-120 sm:top-136 md:top-[min(43.4vw,704px)]">
          <Image
            src="/festival/hero/second-component-image.webp"
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>

        {/* Children need their own stacking context to sit above the plate. */}
        <div className="relative">
          <FestivalHubHero />

          <FestivalExplore festivals={festivals} />

          {/* SECTION SLOTS — built one at a time from the Figma screenshots.
              Planned order, following the SOP §2.6 hub blueprint:
                1. Hero                                            ✅ above
                2. "Explore Kashmir Festivals" grid                ✅ above
                2b. "Why explore Kashmir festivals" banner         ✅ above
                3. Answer-first intro
                4. Festival calendar — month by month              ✅ below
                5. Gallery                                         ✅ below
                6. FAQ  (below)
                7. CTA into the seasonal package + Srinagar cab

              Anything that should sit on the blossom plate goes HERE, inside
              this wrapper. A section that wants its own background goes after
              the wrapper closes. */}
        </div>
      </div>

      {/* Outside the plate wrapper on purpose: the shared blossom background
          belongs to the hero and the card rail only. This banner brings its own
          photograph, so it sits on the page's plain white. */}
      <FestivalWhyBanner />

      <FestivalCalendar />

      <FestivalGallery images={getFestivalGallery()} />

      {/* Closing section — the SOP blueprint ends FAQ → CTA. Fed from the same
          FESTIVAL_FAQS array as the FAQPage JSON-LD emitted above, so the
          markup and the visible answers cannot drift apart. */}
      <FaqAccordion
        faqs={FESTIVAL_FAQS}
        eyebrow="Before you plan"
        headingLead="Kashmir festival"
        headingAccent="questions"
      />

      <Footer />
    </main>
  );
}
