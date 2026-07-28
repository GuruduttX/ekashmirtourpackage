import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

const destinations = [
  {
    slug: "srinagar",
    name: "Srinagar",
    summary: "Dal Lake, Mughal Gardens, old-city walks and houseboat stays.",
  },
  {
    slug: "gulmarg",
    name: "Gulmarg",
    summary: "Gondola rides, snow views, meadows, skiing and winter trips.",
  },
  {
    slug: "pahalgam",
    name: "Pahalgam",
    summary: "Lidder River, Betaab Valley, Aru Valley and relaxed family stays.",
  },
  {
    slug: "sonamarg",
    name: "Sonamarg",
    summary: "Glacier routes, mountain drives and high-altitude day trips.",
  },
];

export const metadata: Metadata = {
  title: "Kashmir Destinations | Srinagar, Gulmarg, Pahalgam & Sonamarg",
  description:
    "Explore the main Kashmir destinations with local planning notes, best time, route ideas and links into packages and cab routes.",
  alternates: { canonical: `${SITE_URL}/destinations` },
};

export default function DestinationsPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
          Kashmir destination hub
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
          Kashmir destinations for packages, cabs and sightseeing routes
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
          Start with Srinagar, Gulmarg, Pahalgam and Sonamarg, then connect
          each place to the right package duration, local cab route and travel
          season. These pages will become the hub for Kashmir planning depth.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {destinations.map((destination) => (
            <Link
              key={destination.slug}
              href={`/destinations/${destination.slug}/`}
              className="rounded-2xl border border-sky-100 bg-sky-50 p-6 transition hover:-translate-y-1 hover:border-sky-200"
            >
              <h2 className="text-xl font-bold text-slate-950">{destination.name}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {destination.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
