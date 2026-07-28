import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Package from "@/models/Package";
import TourCategories, { type PackageCard } from "@/components/home/TourCategories";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PackageCTA from "@/components/package/packageCTA";
import PackageFaqSection from "@/components/package/PackageFaqSection";
import PackageTestimonials from "@/components/package/PackageTestimonial";
import KashmirTrustStats from "@/components/packageArchive/Kashmirtruststats";
import PackagesArchiveHero from "@/components/packageArchive/packageArchiveHero";
import PremiumTravelAssistance from "@/components/packageArchive/PremiumTravelAssistance";
import CityPackagesShowcase from "@/components/packageArchive/CityPackagesShowcase";
import ThemePackagesShowcase from "@/components/packageArchive/ThemePackagesShowcase";
import DurationPackagesShowcase from "@/components/packageArchive/DurationPackagesShowcase";
import PackageHubLinks from "@/components/packageArchive/PackageHubLinks";
import CityHub from "@/models/CityHub";
import DurationHub from "@/models/DurationHub";
import ThemeHub from "@/models/ThemeHub";
import { MapPin, CalendarDays, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

export const metadata: Metadata = {
  title: "Kashmir Tour Packages | All-Inclusive Holiday Deals",
  description:
    "Browse eKashmir's complete collection of Kashmir tour packages. Honeymoon, family, adventure & luxury packages with hotel, transfer & sightseeing included. Book at best prices.",
  alternates: { canonical: `${SITE_URL}/kashmir-tour-packages` },
  openGraph: {
    type: "website",
    title: "Kashmir Tour Packages | All-Inclusive Holiday Deals",
    description:
      "Honeymoon, family, adventure & luxury Kashmir packages with hotel, transfer & sightseeing included. Book at best prices with eKashmir.",
    url: `${SITE_URL}/kashmir-tour-packages`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kashmir Tour Packages by eKashmir" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kashmir Tour Packages | All-Inclusive Holiday Deals",
    description:
      "Honeymoon, family, adventure & luxury Kashmir packages with hotel, transfer & sightseeing included.",
    images: ["/og-image.jpg"],
  },
};

function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

function buildInclusions(pkg: {
  isTransferIncluded?: boolean;
  isStayIncluded?: boolean;
  isBreakfastIncluded?: boolean;
  isSightseeingIncluded?: boolean;
  inclusions?: Array<{ description: string }>;
}): string[] {
  const labels: string[] = [];
  if (pkg.isTransferIncluded) labels.push("Transfer Included");
  if (pkg.isStayIncluded) labels.push("Stay Included");
  if (pkg.isBreakfastIncluded) labels.push("Breakfast Included");
  if (pkg.isSightseeingIncluded) labels.push("Sightseeing Included");
  if (labels.length === 0 && pkg.inclusions?.length) {
    return pkg.inclusions.slice(0, 4).map((i) => i.description);
  }
  return labels;
}

const PACKAGE_CARD_FIELDS =
  "title slug category themes days nights destination price rating heroImage childImages isTransferIncluded isStayIncluded isBreakfastIncluded isSightseeingIncluded inclusions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPackageCard(pkg: any): PackageCard {
  const heroSrc = pkg.heroImage?.image || "";
  const childSrcs = (pkg.childImages ?? []).slice(0, 4).map((c: { image: string }) => c.image);

  return {
    id: pkg._id.toString(),
    slug: pkg.slug,
    title: pkg.title,
    days: pkg.days ?? 0,
    location: pkg.destination || "Kashmir",
    idealFor: pkg.category,
    themes: pkg.themes ?? [],
    inclusions: buildInclusions(pkg),
    price: formatPrice(pkg.price ?? 0),
    originalPrice: "",
    images: [heroSrc, ...childSrcs].filter(Boolean),
    rating: pkg.rating ?? 0,
  };
}

/** Single query path for every package-card list on this page. */
async function findPackageCards(
  filter: Record<string, unknown> = {},
  limit?: number
): Promise<PackageCard[]> {
  try {
    await connectDB();
    let query = Package.find({ status: "published", ...filter })
      .select(PACKAGE_CARD_FIELDS)
      .sort({ createdAt: -1 });
    if (limit) query = query.limit(limit);
    const packages = await query.lean();
    return packages.map(toPackageCard);
  } catch {
    return [];
  }
}

export async function getPublishedPackages(): Promise<PackageCard[]> {
  return findPackageCards();
}

/** Exact-but-case-insensitive match — hub names are title-cased ("Delhi")
 *  while package tags are often stored lowercase ("delhi"). */
const ciExact = (value: string) => new RegExp(`^${escapeRegex(value)}$`, "i");

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function getPackagesByCity(cityName: string, limit = 8): Promise<PackageCard[]> {
  return findPackageCards({ availableSrc: ciExact(cityName) }, limit);
}

async function getPackagesByTheme(themeName: string, limit = 8): Promise<PackageCard[]> {
  return findPackageCards({ themes: ciExact(themeName) }, limit);
}

async function getPackagesByDuration(days: number, limit = 8): Promise<PackageCard[]> {
  return findPackageCards({ days }, limit);
}

interface CityHubRef { slug: string; cityName: string }
interface DurationHubRef { slug: string; days: number; nights: number }
interface ThemeHubRef { slug: string; themeName: string }

const hubUrl = (slug: string) => `/kashmir-tour-packages/${slug}/`;

/**
 * Every published city / duration / theme sub-hub, fetched server-side.
 * Feeds both the package showcase rows and the hub link blocks (SOP §B3),
 * so the anchors always ship in the SSR HTML.
 */
async function getHubs(): Promise<{
  cities: CityHubRef[];
  durations: DurationHubRef[];
  themes: ThemeHubRef[];
}> {
  try {
    await connectDB();
    const [cities, durations, themes] = await Promise.all([
      CityHub.find({ status: "published" }).select("slug cityName").sort({ cityName: 1 }).lean(),
      DurationHub.find({ status: "published" }).select("slug days nights").sort({ days: 1 }).lean(),
      ThemeHub.find({ status: "published" }).select("slug themeName").sort({ themeName: 1 }).lean(),
    ]);

    return {
      cities: cities.map((c) => ({ slug: c.slug, cityName: c.cityName })),
      durations: durations.map((d) => ({ slug: d.slug, days: d.days, nights: d.nights })),
      themes: themes.map((t) => ({ slug: t.slug, themeName: t.themeName })),
    };
  } catch {
    return { cities: [], durations: [], themes: [] };
  }
}

/** How many hubs of each type get a full package-card row on this page. */
const FEATURED_ROWS_PER_TYPE = 2;

export default async function PackageArchivePage() {
  const [packages, hubs] = await Promise.all([getPublishedPackages(), getHubs()]);

  // Fetch the package cards for the first few hubs of each type, in parallel.
  const [cityRows, durationRows, themeRows] = await Promise.all([
    Promise.all(
      hubs.cities.slice(0, FEATURED_ROWS_PER_TYPE).map(async (hub) => ({
        hub,
        packages: await getPackagesByCity(hub.cityName),
      }))
    ),
    Promise.all(
      hubs.durations.slice(0, FEATURED_ROWS_PER_TYPE).map(async (hub) => ({
        hub,
        packages: await getPackagesByDuration(hub.days),
      }))
    ),
    Promise.all(
      hubs.themes.slice(0, FEATURED_ROWS_PER_TYPE).map(async (hub) => ({
        hub,
        packages: await getPackagesByTheme(hub.themeName),
      }))
    ),
  ]);

  return (
    <div>
      <Navbar />
      <PackagesArchiveHero />
      <TourCategories packages={packages.length > 0 ? packages : undefined} />
      {/* Package-card rows for the featured hubs, each linking to its hub page */}
      {themeRows.map(({ hub, packages: rowPackages }) => (
        <ThemePackagesShowcase
          key={hub.slug}
          themeName={hub.themeName}
          packages={rowPackages}
          hubHref={hubUrl(hub.slug)}
        />
      ))}

      {durationRows.map(({ hub, packages: rowPackages }) => (
        <DurationPackagesShowcase
          key={hub.slug}
          days={hub.days}
          nights={hub.nights}
          packages={rowPackages}
          hubHref={hubUrl(hub.slug)}
        />
      ))}

      {cityRows.map(({ hub, packages: rowPackages }) => (
        <CityPackagesShowcase
          key={hub.slug}
          cityName={hub.cityName}
          packages={rowPackages}
          hubHref={hubUrl(hub.slug)}
        />
      ))}

      {/* Full hub → spoke link lists (SOP §B3) */}
      <PackageHubLinks
        eyebrow="Browse by theme"
        heading={
          <>
            Kashmir packages for{" "}
            <span className="bg-linear-to-r from-sky-600 to-cyan-400 bg-clip-text text-transparent">
              every kind of trip
            </span>
          </>
        }
        subtitle="Honeymoon, family, budget or adventure — pick the itinerary style that fits you."
        icon={Sparkles}
        links={hubs.themes.map((t) => ({
          label: `Kashmir ${t.themeName} Packages`,
          href: hubUrl(t.slug),
          sublabel: t.themeName,
        }))}
      />

      <PackageHubLinks
        eyebrow="Browse by duration"
        heading={
          <>
            Find a trip that fits{" "}
            <span className="bg-linear-to-r from-sky-600 to-cyan-400 bg-clip-text text-transparent">
              your dates
            </span>
          </>
        }
        subtitle="From short weekend escapes to full ten-day valley circuits."
        icon={CalendarDays}
        links={hubs.durations.map((d) => ({
          label: `${d.days} Days ${d.nights} Nights Kashmir Packages`,
          href: hubUrl(d.slug),
          sublabel: `${d.days} Days · ${d.nights} Nights`,
        }))}
        variant="tinted"
      />

      <PackageHubLinks
        eyebrow="Browse by departure city"
        heading={
          <>
            Kashmir packages{" "}
            <span className="bg-linear-to-r from-sky-600 to-cyan-400 bg-clip-text text-transparent">
              from your city
            </span>
          </>
        }
        subtitle="Flight-inclusive and land-only options departing major Indian cities."
        icon={MapPin}
        links={hubs.cities.map((c) => ({
          label: `Kashmir Tour Packages from ${c.cityName}`,
          href: hubUrl(c.slug),
          sublabel: `Departing ${c.cityName}`,
        }))}
      />

      <KashmirTrustStats />
      <PremiumTravelAssistance />
      <PackageTestimonials />
      <div className="px-3 md:px-27">
        <PackageCTA />
        <PackageFaqSection />
      </div>
      <Footer />
    </div>
  );
}
