import type { Metadata } from 'next'
import ContactExperience from '@/components/contact/ContactExperience'
import ContactHero from '@/components/contact/ContactHero'
import PremiumFAQ from '@/components/contact/PremiumFAQ'
import TrustShowcase from '@/components/contact/TrustShowcase'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import React from 'react'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ekashmirtourpackage.com'

export const metadata: Metadata = {
  title: 'Contact eKashmir | Book Your Kashmir Tour Today',
  description:
    'Get in touch with eKashmir to plan your dream Kashmir holiday. Talk to our Kashmir travel experts for customized tour packages, booking assistance & travel advice. Available 24/7.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    type: 'website',
    title: 'Contact eKashmir | Book Your Kashmir Tour Today',
    description:
      'Talk to our Kashmir travel experts for customized tour packages, booking assistance & travel advice. Available 24/7.',
    url: `${SITE_URL}/contact`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Contact eKashmir Tour Packages' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact eKashmir | Book Your Kashmir Tour Today',
    description:
      'Talk to our Kashmir travel experts for customized tour packages, booking assistance & travel advice. Available 24/7.',
    images: ['/og-image.jpg'],
  },
}

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