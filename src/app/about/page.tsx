import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutFinalCTA from "@/components/about/AboutFinalCTA";
import HappyClients from "@/components/about/HappyClients";
import OurMission from "@/components/about/Ourmission";
import OurVision from "@/components/about/OurVision";
import WhyChoose from "@/components/about/WhyChoose";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ekashmirtourpackage.com";

export const metadata: Metadata = {
  title: "About eKashmir | Kashmir's Most Trusted Tour Operator",
  description:
    "Learn about eKashmir — Kashmir's trusted tour operator. We craft personalized Kashmir holiday packages with expert local guides, luxury stays & seamless travel experiences since years.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "website",
    title: "About eKashmir | Kashmir's Most Trusted Tour Operator",
    description:
      "Kashmir's trusted tour operator crafting personalized holiday packages with expert local guides, luxury stays & seamless travel experiences.",
    url: `${SITE_URL}/about`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "About eKashmir Tour Packages" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About eKashmir | Kashmir's Most Trusted Tour Operator",
    description:
      "Kashmir's trusted tour operator crafting personalized holiday packages with expert local guides, luxury stays & seamless travel experiences.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Navbar />
      <AboutHero />
      <OurMission />
      <OurVision />
      <HappyClients />
      <WhyChoose />
      <AboutFinalCTA />
      <Footer />
    </main>
  );
}
