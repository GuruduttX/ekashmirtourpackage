import { Document } from "mongoose";

/**
 * CMS data structure for a stay PLACE page — /stays/[place]-stays
 * e.g. /stays/dal-lake-stays, /stays/srinagar-stays
 *
 * Built section by section. Sections defined so far:
 *   1. Identity & routing
 *   2. Hero
 *   3. Archive           — no fields; fetches stays by placeKey
 *   4. Sartaj's tips
 *   5. FAQs
 *   6. Internal linking
 *   7. SEO / schema
 *
 * Still to define (leave the doc open for these):
 *   • "How to choose in <place>" editorial block
 *   • Reviews  ← Review/AggregateRating schema stays OFF until these are real
 */

/* ------------------------------------------------------------------ */
/* 4. Sartaj's tips                                                    */
/* ------------------------------------------------------------------ */

/**
 * One on-ground truth for this place, in Sartaj's voice.
 *
 * This is the section that carries the information gain over the OTAs, so the
 * copy should be something only someone who lives here would know — not a
 * rewrite of the listing blurb.
 */
export interface IStayPlaceTip {
  id: string;
  /** Short label for the card, e.g. "Pick your ghat carefully". */
  title: string;
  /** The tip itself, 1–2 sentences. */
  tip: string;
}

/* ------------------------------------------------------------------ */
/* 5. FAQs                                                             */
/* ------------------------------------------------------------------ */

/**
 * Place-level FAQ. Emitted as FAQPage schema, so the answer text on the page
 * and in the markup must always be identical — mismatched FAQ markup is a
 * manual-action risk.
 */
export interface IStayPlaceFaq {
  id: string;
  question: string;
  answer: string;
}

/* ------------------------------------------------------------------ */
/* 6. Internal linking                                                 */
/* ------------------------------------------------------------------ */

/**
 * Link targets we support today. Add new values here as the silos launch —
 * because links live in one typed array, a new kind needs no migration and no
 * schema change, just a new option in the admin dropdown.
 */
export type StayPlaceLinkType =
  | "cab"
  | "package"
  | "destination"
  | "temple"
  | "experience"
  | "activity"
  /** A blog post — lives at /blog/<slug>/, sourced from the Blog model. */
  | "blog"
  | "stayType";

/**
 * One internal link out of the place silo (SOP B3).
 *
 * `slug` is stored WITHOUT the section prefix — the renderer builds the href
 * from `type` + `slug`, so if a URL pattern ever changes we fix it in one place
 * instead of re-editing every CMS row.
 *   { type: "cab", slug: "srinagar-to-gulmarg" } → /cab-service/srinagar-to-gulmarg/
 */
export interface IStayPlaceLink {
  id: string;
  type: StayPlaceLinkType;
  /** Anchor text. SOP B3 requires varied, descriptive anchors — never "click here". */
  label: string;
  /** Slug within that section, no leading or trailing slash. */
  slug: string;
  /** Optional one-liner shown under the anchor on card-style link blocks. */
  description: string;
}

/* ------------------------------------------------------------------ */
/* 2. Hero                                                             */
/* ------------------------------------------------------------------ */

export interface IStayPlaceHeroImage {
  image: string;
  alt: string;
}

/* ------------------------------------------------------------------ */
/* Document                                                            */
/* ------------------------------------------------------------------ */

export interface IStayPlace extends Document {
  /* --- 1. Identity & routing --- */

  /** Full URL segment, e.g. "dal-lake-stays". Unique. */
  slug: string;
  /**
   * Filter key — the slug with "-stays" stripped, e.g. "dal-lake".
   * Matches Stay.placeTags[]; this is what the archive queries on.
   */
  placeKey: string;
  /** Display name used in headings and breadcrumbs, e.g. "Dal Lake". */
  name: string;
  /** Town this place sits in — "Srinagar" for Dal Lake. Empty if it IS a town. */
  parentTown: string;
  status: "draft" | "published";

  /* --- 2. Hero --- */

  /** Small uppercase label above the H1, e.g. "Dal Lake". */
  eyebrow: string;
  /** H1 — exact intent, e.g. "Where to Stay on Dal Lake". */
  title: string;
  /** Portion of the H1 rendered in the sky→cyan gradient. */
  titleAccent: string;
  /**
   * 40–60 word answer-first block (AEO). Server-rendered, so it is the text
   * most likely to be lifted into an AI Overview or featured snippet.
   */
  quickAnswer: string;
  heroImage: IStayPlaceHeroImage;

  /**
   * NOTE: the hero's two stats (stay count and "from ₹X") are DERIVED from the
   * live listings at render time and are deliberately not stored. A hand-typed
   * price here would drift out of sync with the cards below it.
   */

  /* --- 3. Archive --- */

  /** Optional override for the listing section heading. */
  archiveHeading: string;
  /** Optional override for the listing section sub-copy. */
  archiveIntro: string;

  /* --- 4. Sartaj's tips --- */

  /** Section heading, e.g. "Sartaj's tips for Dal Lake". */
  tipsHeading: string;
  /** Optional lead-in above the tip cards. */
  tipsIntro: string;
  sartajTips: IStayPlaceTip[];

  /* --- 5. FAQs --- */

  faqsHeading: string;
  faqsIntro: string;
  faqs: IStayPlaceFaq[];

  /* --- 6. Internal linking --- */

  /** Section heading, e.g. "Planning the rest of Dal Lake?" */
  linksHeading: string;
  /** Short editorial lead-in, so the block reads as prose, not a link dump. */
  linksIntro: string;
  internalLinks: IStayPlaceLink[];

  /* --- 7. SEO / schema --- */

  metaTitle: string;
  metaDescription: string;
  /** Overrides for the CollectionPage schema when they differ from the meta. */
  schemaTitle: string;
  schemaDescription: string;

  createdAt: Date;
  updatedAt: Date;
}
