import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

const cabRoutes = {
  "srinagar-to-gulmarg": {
    title: "Srinagar to Gulmarg Taxi Fare",
    from: "Srinagar",
    to: "Gulmarg",
    distance: "Around 50-65 km [VERIFY 2026-27]",
    time: "Usually 1.5-2 hours depending on traffic, snow and stops",
    fare: "Sedan and SUV fares need Sartaj verification before publishing",
    destinationSlug: "gulmarg",
  },
  "srinagar-to-pahalgam": {
    title: "Srinagar to Pahalgam Taxi Fare",
    from: "Srinagar",
    to: "Pahalgam",
    distance: "Around 90 km [VERIFY 2026-27]",
    time: "Usually 2.5-3.5 hours depending on traffic and stops",
    fare: "Sedan and SUV fares need Sartaj verification before publishing",
    destinationSlug: "pahalgam",
  },
  "srinagar-to-sonamarg": {
    title: "Srinagar to Sonamarg Taxi Fare",
    from: "Srinagar",
    to: "Sonamarg",
    distance: "Around 80 km [VERIFY 2026-27]",
    time: "Usually 2-3 hours depending on road and weather conditions",
    fare: "Sedan and SUV fares need Sartaj verification before publishing",
    destinationSlug: "sonamarg",
  },
};

type CabSlug = keyof typeof cabRoutes;

function getCabRoute(slug: string) {
  return cabRoutes[slug as CabSlug];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = getCabRoute(slug);
  if (!route) return {};

  return {
    title: `${route.title} | Distance, Time & Cab Booking`,
    description: `Check ${route.from} to ${route.to} cab route details, distance, travel time, local taxi rules and quote options with eKashmir.`,
    alternates: { canonical: `${SITE_URL}/cab-service/${slug}` },
  };
}

export default async function CabRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const route = getCabRoute(slug);
  if (!route) notFound();

  return (
    <main className="bg-white text-slate-900">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-12 lg:py-32">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
          Kashmir cab route
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
          {route.title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
          Plan the {route.from} to {route.to} cab route with distance, time,
          fare verification and local taxi rules before booking your Kashmir
          package or day transfer.
        </p>
        <div className="mt-10 overflow-hidden rounded-2xl border border-sky-100">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-sky-100">
              {[
                ["Route", `${route.from} to ${route.to}`],
                ["Distance", route.distance],
                ["Travel time", route.time],
                ["Fare note", route.fare],
              ].map(([label, value]) => (
                <tr key={label}>
                  <th className="w-40 bg-sky-50 px-5 py-4 font-semibold text-slate-950">
                    {label}
                  </th>
                  <td className="px-5 py-4 text-slate-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 rounded-2xl bg-slate-950 p-6 text-white">
          <h2 className="text-xl font-bold">Sartaj local note</h2>
          <p className="mt-3 text-sm leading-7 text-white/75">
            Srinagar taxis may not cover local sightseeing inside some
            destinations because local union rules can apply. Winter routes may
            also need snow-chain or local snow vehicle support beyond certain
            points. Verify current rules before publishing fixed fares.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact/"
            className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white"
          >
            Get cab quote
          </Link>
          <Link
            href={`/destinations/${route.destinationSlug}/`}
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900"
          >
            View {route.to} destination guide
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
