import AboutHero from "@/components/about/AboutHero";
import AboutFinalCTA from "@/components/about/AboutFinalCTA";
import HappyClients from "@/components/about/HappyClients";
import OurMission from "@/components/about/Ourmission";
import OurVision from "@/components/about/OurVision";
import WhyChoose from "@/components/about/WhyChoose";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

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
