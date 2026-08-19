import type { Metadata } from 'next'
import ContactExperience from '@/components/contact/ContactExperience'
import ContactHero from '@/components/contact/ContactHero'
import PremiumFAQ from '@/components/contact/PremiumFAQ'
import TrustShowcase from '@/components/contact/TrustShowcase'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { ADDRESS_SCHEMA, CONTACT_EMAIL, SOCIAL_PROFILE_URLS } from '@/lib/contact'
import { WHATSAPP_TEL } from '@/lib/whatsapp'
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

const PAGE_URL = `${SITE_URL}/contact`

/**
 * ContactPage + the business it contacts, per SOP §2.14.
 *
 * The NAP here must stay byte-identical to what the page and footer show —
 * an address or phone that disagrees between markup and page is what
 * suppresses a business in local results. Both read from src/lib/contact.ts,
 * so there is only one place to change it.
 */
const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact eKashmir Tour Packages',
  url: PAGE_URL,
  mainEntity: {
    '@type': 'TravelAgency',
    name: 'eKashmir Tour Packages',
    url: SITE_URL,
    email: CONTACT_EMAIL,
    telephone: WHATSAPP_TEL,
    address: ADDRESS_SCHEMA,
    sameAs: SOCIAL_PROFILE_URLS,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: WHATSAPP_TEL,
      email: CONTACT_EMAIL,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Kashmiri'],
    },
  },
}

// BreadcrumbList comes from <Breadcrumbs /> below — one per URL.

const ContactPage = () => {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema).replace(/</g, '\\u003c'),
        }}
      />

      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Contact' }]} />
      </div>
      <ContactHero />
      <ContactExperience />
      <TrustShowcase />
      <PremiumFAQ />
      <Footer />
    </div>
  )
}

export default ContactPage