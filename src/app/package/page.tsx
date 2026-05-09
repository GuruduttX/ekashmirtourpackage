import TourCategories from '@/components/home/TourCategories'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PackageCTA from '@/components/package/packageCTA'
import PackageFaqSection from '@/components/package/PackageFaqSection'
import PackageTestimonials from '@/components/package/PackageTestimonial'
import KashmirTrustStats from '@/components/packageArchive/Kashmirtruststats'
import PackagesArchiveHero from '@/components/packageArchive/packageArchiveHero'
import PremiumTravelAssistance from '@/components/packageArchive/PremiumTravelAssistance'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <PackagesArchiveHero />
      <TourCategories />
      <KashmirTrustStats />
      <PremiumTravelAssistance />
      <PackageTestimonials />
      <div className="px-3 md:px-27">
      <PackageCTA />
      <PackageFaqSection />
      </div>
      <Footer />
    </div>
  )
}

export default page