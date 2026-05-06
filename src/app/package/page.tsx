import TourCategories from '@/components/home/TourCategories'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
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
      <Footer />
    </div>
  )
}

export default page