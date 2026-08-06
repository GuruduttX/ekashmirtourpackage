"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackageFaqSection from "@/components/package/PackageFaqSection";
import TempleTimingsCard from "@/components/temples/TempleTimingsCard";
import TempleDetailHero from "@/components/temples/TempleDetailHero";
import TempleInfoChips from "@/components/temples/detail/TempleInfoChips";
import TempleAbout from "@/components/temples/detail/TempleAbout";
import TempleHistorySignificance from "@/components/temples/detail/TempleHistorySignificance";
import TempleRitualsDarshan from "@/components/temples/detail/TempleRitualsDarshan";
import TempleGallery from "@/components/temples/detail/TempleGallery";
import TempleBookExperience from "@/components/temples/detail/TempleBookExperience";
import TempleInformation from "@/components/temples/detail/TempleInformation";
import TempleBestTimeToVisit from "@/components/temples/detail/TempleBestTimeToVisit";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";
import type {
  ITempleBestTime,
  ITempleGalleryImage,
  ITempleRitual,
  ITempleSeasonTimings,
  ITempleTag,
} from "@/types/templeTypes";
import { getTimingsSummary } from "@/lib/templeFormat";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

interface Faq {
  id?: string;
  question: string;
  answer: string;
}

/** The serialised temple document handed down from the server page. */
export interface TempleDetail {
  title: string;
  slug: string;
  templeType?: string;
  deity?: string;
  location?: string;
  address?: string;
  aboutTemple?: string;
  tags?: ITempleTag[];
  history?: string;
  mythology?: string;
  significance?: string;
  rituals?: ITempleRitual[];
  bestTimes?: ITempleBestTime[];
  seasonalTimings?: ITempleSeasonTimings[];
  overview?: string;
  image?: string;
  alt?: string;
  galleryImages?: ITempleGalleryImage[];
  faqs?: Faq[];
  metaTitle?: string;
  metaDescription?: string;
}

export default function TempleDetailView({ temple }: { temple: TempleDetail }) {
  const [isEnquiryOpen, setEnquiryOpen] = useState(false);
  const openEnquiry = () => setEnquiryOpen(true);

  const pageUrl = `${SITE_URL}/temples/${temple.slug}`;
  const timingsSummary = getTimingsSummary(temple.seasonalTimings);
  const bestPeriod = (temple.bestTimes ?? []).find((b) => b.type === "Best")?.period;

  const touristAttractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: temple.metaTitle || temple.title,
    description: temple.metaDescription || temple.aboutTemple || temple.overview || "",
    image: temple.image,
    url: pageUrl,
    ...(timingsSummary
      ? {
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            description: timingsSummary,
          },
        }
      : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: temple.address || undefined,
      addressLocality: temple.location || "Srinagar",
      addressRegion: "Jammu and Kashmir",
      addressCountry: "IN",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Temples & Shrines", item: `${SITE_URL}/temples` },
      { "@type": "ListItem", position: 3, name: temple.title, item: pageUrl },
    ],
  };

  const faqItems = (temple.faqs ?? []).filter((f) => f.question?.trim() && f.answer?.trim());
  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <main className="min-h-screen overflow-x-clip bg-slate-50/60">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <EnquiryPopupForm isOpen={isEnquiryOpen} onClose={() => setEnquiryOpen(false)} />
      <Navbar />

      <TempleDetailHero
        title={temple.title}
        templeType={temple.templeType}
        location={temple.location}
        image={temple.image}
        alt={temple.alt}
        galleryImages={temple.galleryImages}
      />

      <section className="w-full px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <TempleInfoChips
            location={temple.location}
            timings={timingsSummary}
            bestTime={bestPeriod}
            deity={temple.deity}
          />
        </div>
      </section>

      <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
          {/* Main column */}
          <div className="min-w-0 space-y-6">
            {temple.aboutTemple?.trim() && (
              <TempleAbout about={temple.aboutTemple} tags={temple.tags} />
            )}

            <TempleHistorySignificance
              history={temple.history}
              mythology={temple.mythology}
              significance={temple.significance}
            />

            <TempleRitualsDarshan rituals={temple.rituals} />

            {(temple.seasonalTimings?.length ?? 0) > 0 && (
              <TempleTimingsCard
                name={temple.title}
                location={temple.location}
                seasonalTimings={temple.seasonalTimings ?? []}
              />
            )}

            <TempleGallery images={temple.galleryImages} templeName={temple.title} />
          </div>

          {/* Sidebar */}
          <aside className="min-w-0 space-y-6 lg:sticky lg:top-28">
            <TempleBookExperience onEnquire={openEnquiry} />
            <TempleInformation
              timings={timingsSummary}
              address={temple.address}
              templeName={temple.title}
            />
            <TempleBestTimeToVisit bestTimes={temple.bestTimes} />
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <PackageFaqSection faqs={temple.faqs ?? []} />
      </section>

      <Footer />
    </main>
  );
}
