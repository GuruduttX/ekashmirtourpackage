import ContactExperience from '@/components/contact/ContactExperience'
import ContactHero from '@/components/contact/ContactHero'
import PremiumFAQ from '@/components/contact/PremiumFAQ'
import TrustShowcase from '@/components/contact/TrustShowcase'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'

const content = () => {
  return (
    <div>
      <Navbar />
      <ContactHero />
      <ContactExperience />
      <TrustShowcase />
      <PremiumFAQ />
      <Footer />
    </div>
  )
}

export default content