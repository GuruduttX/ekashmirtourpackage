import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

export const metadata: Metadata = {
  title: "Sartaj | Kashmir Tour Planner & Local Travel Expert",
  description:
    "Meet Sartaj, the local Kashmir tour planning expert behind eKashmir Tour Packages, helping travelers plan practical packages, cabs, stays and sightseeing routes.",
  alternates: { canonical: `${SITE_URL}/author/sartaj` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sartaj",
  jobTitle: "Kashmir Tour Planner",
  worksFor: {
    "@type": "TravelAgency",
    name: "eKashmir Tour Packages",
    url: SITE_URL,
  },
  knowsAbout: [
    "Kashmir tour packages",
    "Kashmir cab routes",
    "Srinagar",
    "Gulmarg",
    "Pahalgam",
    "Sonamarg",
  ],
  url: `${SITE_URL}/author/sartaj`,
};

export default function SartajAuthorPage() {
  return (
    <main className="bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-24 lg:px-12 lg:py-32">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">
          Author of record
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
          Sartaj, Kashmir tour planner and local travel expert
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
          Sartaj is the local planning voice behind eKashmir Tour Packages. His
          role is to help travelers compare Kashmir routes, seasons, cab rules,
          stays and sightseeing pace before they book a package.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["Kashmir packages", "Cab route planning", "Local itinerary advice"].map(
            (item) => (
              <div key={item} className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
                <p className="text-sm font-semibold text-slate-950">{item}</p>
              </div>
            )
          )}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/kashmir-tour-packages/"
            className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white"
          >
            Browse packages
          </Link>
          <Link
            href="/contact/"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900"
          >
            Contact Sartaj
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
