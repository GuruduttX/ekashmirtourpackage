import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import TourCategories from "@/components/home/TourCategories";
import WhyKashmir from "@/components/home/WhyKashmir";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturedPackages />
      <TourCategories />
      <WhyKashmir />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}
