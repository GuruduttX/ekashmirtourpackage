import TourCategories from '@/components/home/TourCategories'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import PackageCTA from '@/components/package/packageCTA'
import PackageFaqSection from '@/components/package/PackageFaqSection'
import PackageTestimonials from '@/components/package/PackageTestimonial'
import KashmirTrustStats from '@/components/packageArchive/Kashmirtruststats'
import PackagesArchiveHero from '@/components/packageArchive/packageArchiveHero'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <PackagesArchiveHero />
      <TourCategories />
      <KashmirTrustStats />
      <PackageTestimonials />
      <div className="px-27">
      <PackageCTA />
      <PackageFaqSection />
      </div>
      <Footer />
    </div>
  )
}

export default page