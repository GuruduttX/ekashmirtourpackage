import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import KashmirFAQ from '@/components/home/HomeFaq'
import ServiceHero from '@/components/service/ServiceHero'
import ServicesArchive from '@/components/service/ServicesArchive'
import PackageCTA from '@/components/package/packageCTA'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ekashmirtourpackage.com'

export const metadata: Metadata = {
  title: 'Kashmir Tour Services | Transfers, Hotels, Sightseeing & More',
  description:
    'Explore eKashmir\'s complete Kashmir travel services — airport transfers, luxury hotel bookings, guided sightseeing, houseboat stays, adventure activities & fully customized itineraries.',
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    type: 'website',
    title: 'Kashmir Tour Services | Transfers, Hotels, Sightseeing & More',
    description:
      'Airport transfers, luxury hotel bookings, guided sightseeing, houseboat stays, adventure activities & fully customized itineraries across Kashmir.',
    url: `${SITE_URL}/services`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'eKashmir Tour Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kashmir Tour Services | Transfers, Hotels, Sightseeing & More',
    description:
      'Airport transfers, luxury hotel bookings, guided sightseeing, houseboat stays, adventure activities & fully customized itineraries across Kashmir.',
    images: ['/og-image.jpg'],
  },
}

const services = () => {
  return (
    <section>
        <Navbar />
        <ServiceHero />
        <ServicesArchive />
        <div className="px-3 md:px-20">
        <PackageCTA />
        </div>
        <KashmirFAQ />
        <Footer />
    </section>
  )
}

export default services