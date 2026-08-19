"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import EnquiryPopupForm from "@/utils/EnquiryPopupForm";
import HeroBackground from "@/components/temples/hero/HeroBackground";
import HeroBuildingCarousel from "@/components/temples/hero/HeroBuildingCarousel";
import HeroClouds from "@/components/temples/hero/HeroClouds";
import HeroContent from "@/components/temples/hero/HeroContent";
import HeroPreviewCards from "@/components/temples/hero/HeroPreviewCards";

export default function TempleHubHero() {
  const [isEnquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <section className="relative min-h-[98asdvh] w-full overflow-hidden bg-slate-900 pt-24 sm:pt-28 lg:min-h-190">
      <EnquiryPopupForm isOpen={isEnquiryOpen} onClose={() => setEnquiryOpen(false)} />

      <HeroBackground />
      <HeroBuildingCarousel />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Inside the hero, over the background — not stacked above it on the
            page's white. The arbitrary variants re-tint the shared component
            for a dark backdrop, where its own slate greys are invisible. */}
        <Breadcrumbs
          items={[{ label: "Temples & Shrines" }]}
          className="mb-6 text-white/60 **:aria-[current]:text-sky-300 [&_a]:text-white/80 [&_a:hover]:text-white"
        />

        <HeroContent onBookNow={() => setEnquiryOpen(true)} />
        <HeroPreviewCards onBookNow={() => setEnquiryOpen(true)} />
      </div>

      <HeroClouds />
    </section>
  );
}
