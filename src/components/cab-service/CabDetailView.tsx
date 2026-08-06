"use client";

import { useState } from "react";
import { Car, Fuel, Users, IndianRupee, Snowflake } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CabDetailHero from "@/components/cab-service/CabDetailHero";
import CabTripDetailsForm from "@/components/cab-service/CabTripDetailsForm";
import CabFareSummary from "@/components/cab-service/CabFareSummary";
import CabInclusionsExclusions from "@/components/cab-service/CabInclusionsExclusions";
import CabCancellationPolicy from "@/components/cab-service/CabCancellationPolicy";
import PackageFaqSection from "@/components/package/PackageFaqSection";
import CabServiceCTA from "./CabServiceCTA";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

const isValidPhone = (value: string) => /^\+?[\d\s-]{10,}$/.test(value.trim());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CabDetailView({ cab }: { cab: any }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const fieldErrors = {
    name: !name.trim() ? "Full name is required." : "",
    phone: !phone.trim()
      ? "Phone number is required."
      : !isValidPhone(phone)
        ? "Enter a valid phone number."
        : "",
    pickup: !pickup.trim() ? "Pickup location is required." : "",
    destination: !destination.trim() ? "Drop location is required." : "",
  };
  const fieldIds: Record<keyof typeof fieldErrors, string> = {
    name: "trip-name",
    phone: "trip-phone",
    pickup: "trip-pickup",
    destination: "trip-destination",
  };
  const firstInvalidField = (Object.keys(fieldErrors) as Array<keyof typeof fieldErrors>).find(
    (key) => fieldErrors[key]
  );

  const handleConfirmBooking = () => {
    if (firstInvalidField) {
      setShowErrors(true);
      const el = document.getElementById(fieldIds[firstInvalidField]);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus();
      return;
    }

    setShowErrors(false);
    setConfirmed(true);
    // UI only for now — wire up submission later.
    console.log("Cab booking:", { name, phone, pickup, destination, basePrice: cab.basePrice });

    // Blur first so the mobile keyboard closes before we scroll — scrolling
    // while the keyboard is dismissing gets overridden by the viewport resize.
    (document.activeElement as HTMLElement | null)?.blur();
    setTimeout(() => {
      document.getElementById("cab-fare-summary")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const pageUrl = `${SITE_URL}/cab-service/${cab.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Taxi",
    name: cab.metaTitle || cab.title,
    description: cab.metaDescription || cab.overview || "",
    image: cab.image,
    url: pageUrl,
    provider: {
      "@type": "TravelAgency",
      name: "eKashmir Tour Packages",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: cab.basePrice ?? 0,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
  };

  const faqItems = (cab.faqs ?? []).filter(
    (f: { question?: string; answer?: string }) => f.question?.trim() && f.answer?.trim()
  );
  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f: { question: string; answer: string }) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <main className="min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Navbar />

      <section className="w-full bg-white px-4 pt-24 pb-6 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Left column — hero + content (finalized later) */}
          <div className="min-w-0 space-y-10">
            <CabDetailHero
              title={cab.title}
              image={cab.image}
              alt={cab.alt}
              pickup={pickup}
              destination={destination}
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-heading text-3xl font-bold leading-tight bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent sm:text-4xl">
                  {cab.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-700">
                  {cab.cabType && (
                    <span className="flex items-center gap-1">
                      <Car className="h-4 w-4 text-sky-500" /> {cab.cabType}
                    </span>
                  )}
                  {!!cab.seats && (
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-sky-500" /> {cab.seats}{" "}
                      seats
                    </span>
                  )}
                  {cab.fuelType && (
                    <span className="flex items-center gap-1">
                      <Fuel className="h-4 w-4 text-sky-500" /> {cab.fuelType}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Snowflake className="h-4 w-4 text-sky-500" />{" "}
                    {cab.isAC ? "AC" : "Non-AC"}
                  </span>
                </div>
              </div>

              {!!cab.basePrice && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className="flex items-center gap-0.5 text-2xl font-bold bg-linear-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
                      <IndianRupee className="h-5 w-5 text-sky-500" />
                      {cab.basePrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      / person
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-400">
                    + distance charges based on kilometers travelled
                  </p>
                </div>
              )}
            </div>

            <CabTripDetailsForm
              name={name}
              phone={phone}
              pickup={pickup}
              destination={destination}
              onNameChange={setName}
              onPhoneChange={setPhone}
              onPickupChange={setPickup}
              onDestinationChange={setDestination}
              errors={fieldErrors}
              showErrors={showErrors}
              confirmed={confirmed}
              onConfirm={handleConfirmBooking}
            />

            {cab.overview && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 sm:text-3xl">
                  Overview
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                  {cab.overview}
                </p>
              </div>
            )}

            <CabInclusionsExclusions
              inclusions={cab.inclusions ?? []}
              exclusions={cab.exclusions ?? []}
            />

            <CabCancellationPolicy />
          </div>

          {/* Right column — sticky fare summary, capped to fit one screen height */}
          <div className="min-w-0 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <CabFareSummary
              basePrice={cab.basePrice}
              confirmed={confirmed}
              onConfirm={handleConfirmBooking}
            />
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 space-y-10">
        <CabServiceCTA />

        <PackageFaqSection faqs={cab.faqs ?? []} />
      </section>

      <Footer />
    </main>
  );
}
