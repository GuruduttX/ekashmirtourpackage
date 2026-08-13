import { Document } from "mongoose";
import type { StayPlaceLinkType } from "@/types/stayPlaceTypes";

/**
 * CMS data structure for an INDIVIDUAL STAY — /stays/[property-slug]
 * e.g. /stays/dal-lake-deluxe-houseboat
 *
 * One structure serves all four categories (Houseboat, Hotel, Resort,
 * Homestay). Type pages (/stays/houseboats) and place pages
 * (/stays/srinagar-stays) are built by filtering these records.
 *
 * Sections:
 *   1. Identity & routing
 *   2. Hero
 *   3. Gallery
 *   4. Key facts & pricing
 *   5. Amenities
 *   6. Overview          — HTML from the rich text editor
 *   7. Inclusions & exclusions
 *   8. Policies
 *   9. Sartaj's tips
 *  10. FAQs
 *  11. Internal linking
 *  12. SEO / schema
 *
 * DELIBERATELY ABSENT: reviews and ratings. No rating, reviewCount or score
 * breakdown until there is a genuine source of guest reviews — Review /
 * AggregateRating markup without real on-page reviews is a domain-wide
 * manual-action risk (SOP data-honesty rules).
 */

export type StayCategory = "Houseboat" | "Hotel" | "Resort" | "Homestay";

export const STAY_CATEGORIES: StayCategory[] = [
  "Houseboat",
  "Hotel",
  "Resort",
  "Homestay",
];

/* ------------------------------------------------------------------ */
/* 3. Gallery                                                          */
/* ------------------------------------------------------------------ */

export interface IStayGalleryImage {
  id: string;
  image: string;
  alt: string;
}

/* ------------------------------------------------------------------ */
/* 4. Key facts                                                        */
/* ------------------------------------------------------------------ */

/** Short chip shown on the archive card, e.g. "Breakfast included". */
export interface IStayHighlight {
  id: string;
  label: string;
}

/* ------------------------------------------------------------------ */
/* 5. Amenities                                                        */
/* ------------------------------------------------------------------ */

/** Grouping for the amenities list — drives the admin dropdown. */
export const STAY_AMENITY_GROUPS = [
  "Essentials",
  "Comfort",
  "Food",
  "Outdoor",
  "Transport",
  "Accessibility",
] as const;

export type StayAmenityGroup = (typeof STAY_AMENITY_GROUPS)[number];

/**
 * A free-form amenity. The three quick booleans below cover the badges every
 * property shares; this list carries what actually differentiates a Kashmiri
 * stay — "bukhari heating", "shikara transfer", "ski storage", "private deck".
 */
export interface IStayAmenity {
  id: string;
  label: string;
  group: StayAmenityGroup;
}

/** Badge booleans, fast to filter on and shown on the card. */
export interface IStayQuickInclusions {
  freeWifi: boolean;
  breakfast: boolean;
  parking: boolean;
}

/* ------------------------------------------------------------------ */
/* 7. Inclusions & exclusions                                          */
/* ------------------------------------------------------------------ */

export interface IStayListItem {
  id: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/* 8. Policies                                                         */
/* ------------------------------------------------------------------ */

export interface IStayHouseRule {
  id: string;
  rule: string;
}

/* ------------------------------------------------------------------ */
/* 9. Sartaj's tips                                                    */
/* ------------------------------------------------------------------ */

export interface IStayTip {
  id: string;
  /** Short card label, e.g. "Ask for a deck room". */
  title: string;
  tip: string;
}

/* ------------------------------------------------------------------ */
/* 10. FAQs                                                            */
/* ------------------------------------------------------------------ */

export interface IStayFaq {
  id: string;
  question: string;
  answer: string;
}

/* ------------------------------------------------------------------ */
/* 11. Internal linking                                                */
/* ------------------------------------------------------------------ */

/** Same typed-array contract as StayPlace — slug is stored WITHOUT a prefix. */
export interface IStayLink {
  id: string;
  type: StayPlaceLinkType;
  label: string;
  slug: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/* Document                                                            */
/* ------------------------------------------------------------------ */

export interface IStay extends Document {
  /* --- 1. Identity & routing --- */

  /** URL segment — /stays/[slug]. Must NOT end in "-stays". */
  slug: string;
  /** Property name — the H1. */
  title: string;
  category: StayCategory;
  /** Town, e.g. "Srinagar". */
  town: string;
  /** Precise area shown on cards, e.g. "Dal Lake, Srinagar". */
  area: string;
  /**
   * Place keys this property appears under, e.g. ["dal-lake", "srinagar"].
   * Matches StayPlace.placeKey — this is what place pages query.
   */
  placeTags: string[];
  /** Host or operator name. Most meaningful for homestays and houseboats. */
  host: string;
  /** Street address for the info card. */
  address: string;
  status: "draft" | "published";

  /* --- 2. Hero --- */

  eyebrow: string;
  titleAccent: string;
  /** 40–60 word answer-first block (AEO). */
  quickAnswer: string;
  heroImage: { image: string; alt: string };

  /* --- 3. Gallery --- */

  gallery: IStayGalleryImage[];

  /* --- 4. Key facts & pricing --- */

  /**
   * Starting nightly rate, INR. One property = one starting price; there is no
   * per-room-type array. [VERIFY 2026-27] before publishing.
   */
  priceFrom: number;
  /** Who this property suits, e.g. "Couples wanting a classic Dal Lake night". */
  bestFor: string;
  sleeps: number;
  bedrooms: number;
  checkIn: string;
  checkOut: string;
  minNights: number;
  /** Card chips. */
  highlights: IStayHighlight[];

  /* --- 5. Amenities --- */

  quickInclusions: IStayQuickInclusions;
  amenities: IStayAmenity[];

  /* --- 6. Overview --- */

  /** HTML from the rich text editor. Sanitise before rendering. */
  overview: string;

  /* --- 7. Inclusions & exclusions --- */

  inclusions: IStayListItem[];
  exclusions: IStayListItem[];

  /* --- 8. Policies --- */

  cancellationPolicy: string;
  paymentTerms: string;
  houseRules: IStayHouseRule[];

  /* --- 9. Sartaj's tips --- */

  tipsHeading: string;
  tipsIntro: string;
  sartajTips: IStayTip[];

  /* --- 10. FAQs --- */

  faqsHeading: string;
  faqsIntro: string;
  faqs: IStayFaq[];

  /* --- 11. Internal linking --- */

  linksHeading: string;
  linksIntro: string;
  internalLinks: IStayLink[];

  /* --- 12. SEO / schema --- */

  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;

  createdAt: Date;
  updatedAt: Date;
}
