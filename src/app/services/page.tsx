import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import KashmirFAQ from '@/components/home/HomeFaq'
import ServiceHero from '@/components/service/ServiceHero'
import ServicesArchive from '@/components/service/ServicesArchive'
import PackageCTA from '@/components/package/packageCTA'
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