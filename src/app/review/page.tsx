import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import ReviewHero from '@/components/review/ReviewHero';
import Footer from '@/components/layout/Footer';
import ReviewArchive from '@/components/review/ReviewArchive';
import BenefitsSection from '@/components/review/BenefitsSection';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { REVIEW_FAQS } from '@/data/reviewFaqs';
import CTASection from '@/components/review/CTASection';
import ReviewList from '@/components/review/ReviewList';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ekashmirtourpackage.com';

export const metadata: Metadata = {
  title: 'Review Archive | eKashmir',
  description: 'Browse our complete history of verified traveler reviews.',
  alternates: { canonical: `${SITE_URL}/review` },
};

export default async function ReviewPage() {
  // FAQPage built from the same array the accordion renders, so the markup and
  // the visible answers can never drift. Emitted here and nowhere else on this
  // URL — one FAQPage per page.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: REVIEW_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />
      
      <main className="min-h-screen bg-white text-slate-900 overflow-hidden pb-24">
        
        {/* Full-width Hero */}
        <ReviewHero />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Elegant Section Header for the Archive */}
          <div className="mt-20 mb-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              The <span className="text-sky-500">Archive</span>
            </h2>
            <p className="text-slate-600 font-light text-base sm:text-lg">
              Explore hundreds of past experiences from our verified travelers. Every memory, beautifully preserved.
            </p>
            <div className="h-1 w-20 bg-sky-100 mx-auto mt-8 rounded-full" />
          </div>
         
          {/* The Masonry Archive Component */}
          <ReviewArchive />
          <BenefitsSection />
          <CTASection />
          <FaqAccordion
            faqs={REVIEW_FAQS}
            eyebrow="About these reviews"
            headingLead="Frequently asked"
          />
          {/*<ReviewList />*/}
          
        </div>
        
      </main>
      
      <Footer />
    </>
  );
}