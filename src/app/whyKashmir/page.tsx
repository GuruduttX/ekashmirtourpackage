import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import KashmirEditorialBento from '@/components/whyKashmir/KashmirEditorialBento'
import KashmirJourney from '@/components/whyKashmir/KashmirJourney'
import RealKashmirExperience from '@/components/whyKashmir/RealKashmirExperience'
import TravelerReviewsSection from '@/components/whyKashmir/TravelerReviews'
import WhyKashmirHero from '@/components/whyKashmir/whyKashmirHero'
import WhyTravelWithUs from '@/components/whyKashmir/WhyTravelWithUs'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ekashmirtourpackage.com'

export const metadata: Metadata = {
  title: 'Why Visit Kashmir? | Heaven on Earth Awaits You',
  description:
    'Discover why Kashmir is called Heaven on Earth. Stunning snow-capped valleys, Dal Lake, Mughal gardens, Gulmarg skiing, Pahalgam treks, Kashmiri cuisine & warm hospitality await you.',
  alternates: { canonical: `${SITE_URL}/whyKashmir` },
  openGraph: {
    type: 'website',
    title: 'Why Visit Kashmir? | Heaven on Earth Awaits You',
    description:
      'Snow-capped valleys, Dal Lake, Mughal gardens, Gulmarg skiing, Pahalgam treks, Kashmiri cuisine & warm hospitality — discover Heaven on Earth.',
    url: `${SITE_URL}/whyKashmir`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Why Visit Kashmir — Heaven on Earth' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Visit Kashmir? | Heaven on Earth Awaits You',
    description:
      'Snow-capped valleys, Dal Lake, Mughal gardens, Gulmarg skiing, Pahalgam treks, Kashmiri cuisine & warm hospitality — discover Heaven on Earth.',
    images: ['/og-image.jpg'],
  },
}

const whyKashmir = () => {
  return (
    <div>
        <Navbar />
        <WhyKashmirHero />
        <KashmirEditorialBento />
        <KashmirJourney />
        <RealKashmirExperience />
        <WhyTravelWithUs />
        <TravelerReviewsSection />
        <Footer />
    </div>
  )
}

export default whyKashmir