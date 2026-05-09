import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import KashmirEditorialBento from '@/components/whyKashmir/KashmirEditorialBento'
import KashmirJourney from '@/components/whyKashmir/KashmirJourney'
import RealKashmirExperience from '@/components/whyKashmir/RealKashmirExperience'
import TravelerReviewsSection from '@/components/whyKashmir/TravelerReviews'
import WhyKashmirHero from '@/components/whyKashmir/whyKashmirHero'
import WhyTravelWithUs from '@/components/whyKashmir/WhyTravelWithUs'

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