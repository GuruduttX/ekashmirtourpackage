import type { Metadata } from 'next'
import Hero from '@/components/experiences/hero'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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
      
      <Hero />
      <Footer />
    </div>
  )
}

export default content