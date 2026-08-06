"use client";

import { useState } from "react";
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
        <HeroContent onBookNow={() => setEnquiryOpen(true)} />
        <HeroPreviewCards onBookNow={() => setEnquiryOpen(true)} />
      </div>

      <HeroClouds />
    </section>
  );
}
