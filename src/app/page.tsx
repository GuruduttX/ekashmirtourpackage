import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import TourCategories from "@/components/home/TourCategories";
import WhyKashmir from "@/components/home/WhyKashmir";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import ActivityCarousel from "@/components/home/Activitycarousel";
import HowItWorks from "@/components/home/Howitworks";
import MidPageCTA from "@/components/home/Midpagecta";
import TopDestinations from "@/components/home/Topdestinations";
import PopularPackagesCarousel from "@/components/home/PopularPackagesCarousel";
import HomeFaq from "@/components/home/HomeFaq";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturedPackages />
      <TourCategories />
      <ActivityCarousel />
      <HowItWorks />
      <PopularPackagesCarousel />
      <WhyKashmir />
      <MidPageCTA />
      <TopDestinations />
      <Testimonials />
      <CallToAction />
      <HomeFaq />
      <Footer />
    </main>
  );
}
