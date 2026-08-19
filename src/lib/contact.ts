/**
 * Business contact details, in one place.
 *
 * The phone and WhatsApp side lives in src/lib/whatsapp.ts because it is driven
 * by WHATSAPP_NUMBER in .env; the email is a fixed address, so it is a constant
 * here rather than another env key. Import from here instead of typing an
 * address into a component — the contact page previously carried three
 * different placeholder addresses because there was nowhere central to look.
 */

/** Public enquiries inbox. */
export const CONTACT_EMAIL = "info@experiencemyindia.com";

/**
 * `mailto:` href, optionally with a prefilled subject.
 *
 * Subject only — no body. A long prefilled body is what trips Gmail's and
 * Outlook's "this link looks suspicious" handling, and it overwrites anything
 * the reader has already typed if they click twice.
 */
export function mailtoLink(subject?: string): string {
  if (!subject) return `mailto:${CONTACT_EMAIL}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

/**
 * Official social profiles.
 *
 * Doubles as the organisation schema's `sameAs`, which is how a search engine
 * ties this site to those accounts — so only real, owned profiles belong here.
 * Facebook is deliberately absent until there is a URL for it.
 */
export const SOCIAL_PROFILES = {
  instagram: "https://www.instagram.com/experiencemyindia",
  youtube: "https://www.youtube.com/@ExperiencemyIndia",
  x: "https://x.com/experiencemyind",
} as const;

/** Flat list, in the order the footer renders them. */
export const SOCIAL_PROFILE_URLS = Object.values(SOCIAL_PROFILES);

/**
 * The registered business address.
 *
 * Kept as parts rather than one string because it is consumed three ways: as
 * display lines in the footer and the contact card, as a single line for a maps
 * query, and as a schema.org PostalAddress. Splitting it once here means the
 * NAP (name / address / phone) a crawler reads and the one a reader sees cannot
 * drift — which matters for local SEO, where an inconsistent address across
 * pages is what suppresses a business in map results.
 *
 * NOT to be confused with the many "Boulevard Road" mentions in the stays and
 * experiences copy: those describe the area for readers, and are not this
 * business's location.
 */
export const BUSINESS_ADDRESS = {
  street: "Hotel Heaven, Canal Ghat No. 1, Dal Lake",
  locality: "Srinagar",
  region: "Jammu & Kashmir",
  postalCode: "190001",
  country: "IN",
} as const;

/** Display lines, in postal order. */
export const ADDRESS_LINES = [
  BUSINESS_ADDRESS.street,
  `${BUSINESS_ADDRESS.locality}, ${BUSINESS_ADDRESS.postalCode}`,
] as const;

/** Single-line form, for compact slots and maps queries. */
export const ADDRESS_ONE_LINE = ADDRESS_LINES.join(", ");

/** schema.org PostalAddress, for the organisation JSON-LD. */
export const ADDRESS_SCHEMA = {
  "@type": "PostalAddress",
  streetAddress: BUSINESS_ADDRESS.street,
  addressLocality: BUSINESS_ADDRESS.locality,
  addressRegion: BUSINESS_ADDRESS.region,
  postalCode: BUSINESS_ADDRESS.postalCode,
  addressCountry: BUSINESS_ADDRESS.country,
} as const;
