import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Car,
  Compass,
  Landmark,
  MapPin,
  Mountain,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StayListingHero from "@/components/stays/StayListingHero";
import StayArchive from "@/components/stays/StayArchive";
import StaySartajTips from "@/components/stays/StaySartajTips";
import StayFaqSection from "@/components/stays/StayFaqSection";
import { hrefForLink, type StayPlacePage } from "@/lib/stayPlacePage";
import type { StayPlaceLinkType } from "@/types/stayPlaceTypes";
import type { Stay } from "@/data/stays";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

/**
 * /stays/[place]-stays — every stay in one town or area.
 *
 * Content comes from a published StayPlace record, falling back to the static
 * taxonomy. Either way it arrives here as a normalised StayPlacePage.
 */

const LINK_ICON: Record<StayPlaceLinkType, LucideIcon> = {
  cab: Car,
  package: Compass,
  destination: MapPin,
  temple: Landmark,
  experience: Mountain,
  activity: Mountain,
  blog: BookOpen,
  stayType: BedDouble,
};

export default function StayPlaceView({
  place,
  stays,
}: {
  place: StayPlacePage;
  stays: Stay[];
}) {
  const priceFrom = Math.min(...stays.map((stay) => stay.priceFrom));
  const pageUrl = `${SITE_URL}/stays/${place.slug}`;

  const categories = Array.from(new Set(stays.map((stay) => stay.category)));

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: place.metaTitle,
    description: place.metaDescription,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "eKashmir Tour Packages",
      url: SITE_URL,
    },
    about: {
      "@type": "Place",
      name: place.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: place.name,
        addressRegion: "Jammu & Kashmir",
        addressCountry: "IN",
      },
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
        eyebrow={place.eyebrow}
        title={place.title}
        answerBlock={place.quickAnswer}
        image={place.heroImage.image}
        alt={place.heroImage.alt}
        breadcrumbLabel={place.name}
        stayCount={stays.length}
        priceFrom={priceFrom}
      />

      <StayArchive
        stays={stays}
        heading={place.archiveHeading || `Stays in ${place.name}`}
        intro={
          place.archiveIntro ||
          `Every ${place.name} property we book, with the real starting price for each — not a teaser rate.`
        }
      />

      <StaySartajTips
        tips={place.sartajTips}
        heading={place.tipsHeading || `Sartaj's tips for ${place.name}`}
        intro={
          place.tipsIntro ||
          `What a local would tell you before you book a bed in ${place.name} — the things the booking sites leave out.`
        }
      />

      {/* SOP B3 — across-links out of the place silo */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-center font-heading text-xl font-bold text-slate-900 md:text-left">
            {place.linksHeading || `Planning the rest of ${place.name}?`}
          </h2>

          {place.linksIntro && (
            <p className="mt-2 text-center text-sm text-slate-600 md:text-left">
              {place.linksIntro}
            </p>
          )}

          <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
            {place.internalLinks.map((link) => {
              const Icon = LINK_ICON[link.type] ?? ArrowRight;
              return (
                <Link
                  key={link.id}
                  href={hrefForLink(link)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-200 hover:text-sky-600"
                >
                  <Icon className="h-4 w-4 text-sky-500" />
                  {link.label}
                </Link>
              );
            })}

            {/* Down-links to the stay types actually present here */}
            {categories.map((category) => (
              <Link
                key={category}
                href={`/stays/${category.toLowerCase()}s/`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-200 hover:text-sky-600"
              >
                <ArrowRight className="h-4 w-4 text-sky-500" />
                All Kashmir {category.toLowerCase()}s
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StayFaqSection
        stays={stays}
        faqs={place.faqs}
        heading={place.faqsHeading || `${place.name} stay questions, answered`}
        intro={
          place.faqsIntro ||
          `What travellers ask us most before booking a stay in ${place.name}.`
        }
      />

      <Footer />
    </main>
  );
}
