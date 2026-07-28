import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

const destinationMap = {
  srinagar: {
    name: "Srinagar",
    famousFor: "Dal Lake, Mughal Gardens, houseboats and old-city culture",
    bestTime: "April to June, September to November, and winter for snow views",
    distance: "Airport to Dal Lake is usually a short city transfer [VERIFY 2026-27]",
    packageAnchor: "Srinagar Kashmir tour packages",
  },
  gulmarg: {
    name: "Gulmarg",
    famousFor: "Gondola rides, snow, skiing and alpine meadows",
    bestTime: "December to February for snow, April to June for meadows",
    distance: "Around 50-65 km from Srinagar [VERIFY 2026-27]",
    packageAnchor: "Kashmir package covering Gulmarg",
  },
  pahalgam: {
    name: "Pahalgam",
    famousFor: "Lidder River, Betaab Valley, Aru Valley and relaxed stays",
    bestTime: "April to June and September to November",
    distance: "Around 90 km from Srinagar [VERIFY 2026-27]",
    packageAnchor: "Kashmir package covering Pahalgam",
  },
  sonamarg: {
    name: "Sonamarg",
    famousFor: "Mountain drives, glacier access and high-altitude scenery",
    bestTime: "May to October, depending on road and weather conditions",
    distance: "Around 80 km from Srinagar [VERIFY 2026-27]",
    packageAnchor: "Kashmir package covering Sonamarg",
  },
};

type DestinationSlug = keyof typeof destinationMap;

function getDestination(slug: string) {
  return destinationMap[slug as DestinationSlug];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};

  return {
    title: `${destination.name} Kashmir | Best Time, Things To Do & Packages`,
    description: `Plan ${destination.name}, Kashmir with local notes on best time, distance, things to do, cab routes and related Kashmir tour packages.`,
    alternates: { canonical: `${SITE_URL}/destinations/${slug}` },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  return (
    <main className="bg-white text-slate-900">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-12 lg:py-32">
        <Link href="/destinations/" className="text-sm font-semibold text-sky-600">
          Destinations
        </Link>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
          {destination.name} Kashmir travel guide
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
          {destination.name} is planned best when you know the route, season,
          sightseeing pace and local transport rules before booking. Use this
          page to connect {destination.name} with the right package and cab
          route.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              Famous for
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{destination.famousFor}</p>
          </div>
          <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              Best time
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{destination.bestTime}</p>
          </div>
          <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              Distance
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{destination.distance}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/kashmir-tour-packages/"
            className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white"
          >
            {destination.packageAnchor}
          </Link>
          <Link
            href={`/cab-service/srinagar-to-${slug}/`}
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900"
          >
            Srinagar to {destination.name} cab route
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
