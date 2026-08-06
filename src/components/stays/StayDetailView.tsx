import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import type { Stay } from "@/data/stays";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

/**
 * SOP §2.8 — Stay (MONEY page).
 * Blueprint, in order: H1 → answer block → options table (property type | area |
 * price-from | amenities | best-for) → how to choose → Sartaj tip → FAQ →
 * enquiry CTA.
 * Schema: LodgingBusiness/Product + Offer (real prices only) + BreadcrumbList +
 * FAQPage. No Review/AggregateRating until genuine on-page reviews exist.
 */
export default function StayDetailView({ stay }: { stay: Stay }) {
  const pageUrl = `${SITE_URL}/stays/${stay.slug}`;
  const prices = stay.options.map((option) => option.priceFrom);

  const lodgingSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: stay.title,
    description: stay.metaDescription || stay.answerBlock,
    url: pageUrl,
    ...(stay.image ? { image: stay.image } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: stay.town,
      addressRegion: "Jammu & Kashmir",
      addressCountry: "IN",
    },
    amenityFeature: [...new Set(stay.options.flatMap((option) => option.amenities))].map(
      (name) => ({ "@type": "LocationFeatureSpecification", name, value: true })
    ),
    makesOffer: stay.options.map((option) => ({
      "@type": "Offer",
      name: option.propertyType,
      price: option.priceFrom,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    })),
    ...(prices.length
      ? {
          priceRange: `₹${Math.min(...prices)}–₹${Math.max(...prices)} per night`,
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
    <main className="min-h-screen overflow-x-hidden">
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

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[{ label: "Stays", href: "/stays/" }, { label: stay.title }]}
        />
      </div>

      {/* TODO: <StayDetailHero /> */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-center text-3xl font-bold text-slate-900 md:text-left md:text-4xl">
          {stay.title}
        </h1>
        <p className="mt-4 max-w-3xl text-center text-slate-600 md:text-left">
          {stay.answerBlock}
        </p>
      </section>

      {/* TODO: <StayOptionsTable options={stay.options} /> — extractable table. */}
      {/* TODO: <StayHowToChoose points={stay.howToChoose} /> */}
      {/* TODO: <SartajTips tips={stay.sartajTips} /> */}
      {/* TODO: <StayFaqSection faqs={stay.faqs} /> — schema already emitted above. */}
      {/* TODO: <StayEnquiryCTA /> */}

      {/* SOP B3 required links: INTO destination + package + cab. */}
      <nav className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center gap-4 text-sm font-medium text-sky-600 md:justify-start">
          <li>
            <Link href={stay.links.destination}>Things to do in {stay.town}</Link>
          </li>
          <li>
            <Link href={stay.links.package}>{stay.town} tour packages</Link>
          </li>
          <li>
            <Link href={stay.links.cabRoute}>Kashmir cab &amp; taxi fares</Link>
          </li>
        </ul>
      </nav>

      <Footer />
    </main>
  );
}
