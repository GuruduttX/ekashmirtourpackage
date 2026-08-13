import { Document } from "mongoose";

/**
 * CMS data structure for a DESTINATION page — /destinations/[place]
 * e.g. /destinations/gulmarg
 *
 * This is the field list the eleven sections of
 * src/app/destinations/[slug]/page.tsx consume, in the order they render:
 *
 *   1. Identity & routing
 *   2. Hero
 *   3. Quick facts
 *   4. Things to do        — reference list, resolved at render (src/lib/thingsToDo.ts)
 *   5. How to reach
 *   6. Cab fares           — reference list, resolved at render (src/lib/cabFares.ts)
 *   7. Where to stay       — reference list, resolved at render (src/lib/destinationStays.ts)
 *   8. Best time           — the twelve-month table
 *   9. Photo strip
 *  10. Sartaj's tips
 *  11. Map
 *  12. FAQs
 *  13. SEO / schema
 *
 * Sections 4, 6 and 7 store SLUGS, never copies. A destination names the
 * temple / vehicle / stay it wants and the resolver reads the live record, so
 * a renamed stay or a repriced cab is never stale here. An entry whose slug
 * stops resolving is dropped rather than rendered as a dead link.
 *
 * Every repeated row carries an `id`. The public page does not need one, but
 * the admin editor does — it is the React key that survives reordering and
 * deletion, and the reason none of these lists are bare strings.
 */

export type DestinationStatus = "draft" | "published";

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

/**
 * One photo, everywhere a photo appears: hero carousel, photo strip, things-
 * to-do card. `alt` must describe THIS photo, not the place — the page ships
 * it verbatim.
 */
export interface IDestinationImage {
  id: string;
  image: string;
  alt: string;
}

/* ------------------------------------------------------------------ */
/* 3. Quick facts                                                      */
/* ------------------------------------------------------------------ */

/**
 * An extra quick-facts row, beyond the four the section always shows
 * (altitude, from Srinagar, best time, famous for). The table is a scrolling
 * row list precisely so a destination can add "Permit required" or "Network
 * coverage" without a layout change.
 */
export interface IDestinationFact {
  id: string;
  label: string;
  value: string;
}

/* ------------------------------------------------------------------ */
/* 4. Things to do                                                     */
/* ------------------------------------------------------------------ */

/**
 * "temple" and "stay" are internal links: only `slug` is stored, and the
 * resolver looks the record up in its own collection at render time.
 *
 * "activity" has no collection of its own yet, so author it like "other" —
 * heading, description and image inline, no slug and no outbound link.
 */
export const THING_TO_DO_TYPES = [
  "temple",
  "activity",
  "stay",
  "other",
] as const;

export type ThingToDoType = (typeof THING_TO_DO_TYPES)[number];

export interface IThingToDo {
  id: string;
  type: ThingToDoType;
  heading: string;
  /** "temple" / "stay" only — the record this card links to. */
  slug?: string;
  /** "activity" / "other" only. */
  description?: string;
  /** "activity" / "other" only. Only the first image is shown on the card. */
  images?: IDestinationImage[];
}

/* ------------------------------------------------------------------ */
/* 5. How to reach                                                     */
/* ------------------------------------------------------------------ */

export const TRANSPORT_MODES = ["Air", "Train", "Road"] as const;

export type TransportModeName = (typeof TRANSPORT_MODES)[number];

/** One hub → terminal connection, e.g. Delhi → Srinagar by air. */
export interface IRouteHub {
  id: string;
  /** Departure city, e.g. "Delhi". */
  origin: string;
  /** This leg alone, not door to door, e.g. "1 h 20 m". */
  duration: string;
  /** What runs on this route, in one line. Seasonal — re-check it. */
  details: string;
}

export interface ITransportMode {
  id: string;
  mode: TransportModeName;
  /** Where a traveller actually arrives, e.g. "Srinagar International Airport (SXR)". */
  nearestTerminal: string;
  /** Road km from that terminal to THIS destination. */
  distance: number;
  /** What to do on arrival — onward transport, and anything seasonal. */
  description: string;
  commonRoutes: IRouteHub[];
}

export interface IHowToReach {
  /** Answer-first: the shortest true version of how you get here. */
  overview: string;
  transportModes: ITransportMode[];
}

/* ------------------------------------------------------------------ */
/* 6. Cab fares                                                        */
/* ------------------------------------------------------------------ */

/**
 * Set `price` only when the run to THIS destination costs something other
 * than the vehicle's `basePrice` — the Taxi model has one base price, not one
 * per route. Leave the whole list empty to show the published fleet at base
 * rate, which the table labels as a starting price.
 */
export interface IDestinationCabFare {
  id: string;
  /** Taxi slug — resolves to /cab-service/[slug]. */
  slug: string;
  /** Route-specific fare in INR. Falls back to the vehicle's basePrice. */
  price?: number;
  /** What the fare covers, e.g. "Round trip, same day". */
  note?: string;
}

/* ------------------------------------------------------------------ */
/* 8. Best time                                                        */
/* ------------------------------------------------------------------ */

/**
 * Four levels, not a score out of ten: the honest resolution is "go / fine /
 * depends / don't", and a number invites precision the weather does not have.
 */
export const MONTH_RATINGS = ["best", "good", "mixed", "avoid"] as const;

export type MonthRating = (typeof MONTH_RATINGS)[number];

/** Three-letter month label, in the order the table renders them. */
export const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export interface IMonthEntry {
  id: string;
  /** "Jan" … "Dec". Table-cell length by design. */
  month: string;
  rating: MonthRating;
  /** Why that rating, in a few words — "Deep snow, gondola running". */
  note: string;
}

export interface IBestTimeTable {
  /** Answer-first line above the table. */
  overview: string;
  /** Twelve entries, January first. */
  months: IMonthEntry[];
}

/* ------------------------------------------------------------------ */
/* 10. Sartaj's tips                                                   */
/* ------------------------------------------------------------------ */

/**
 * The SOP A4/A8 information-gain block — the part a reader cannot get from an
 * aggregator. Each tip is a specific, checkable truth; "carry warm clothes"
 * is not a tip.
 */
export interface IDestinationTip {
  id: string;
  title: string;
  tip: string;
}

/* ------------------------------------------------------------------ */
/* 11. Map                                                             */
/* ------------------------------------------------------------------ */

export interface IDestinationLandmark {
  id: string;
  name: string;
  /** Distance or drive time, e.g. "14 km south, 30–45 min". */
  detail: string;
}

/**
 * Coordinates rather than a pasted embed URL: from lat/lng the component
 * builds both the embed and the directions link, so an editor is never asked
 * to paste iframe markup. `embedUrl` is an escape hatch for a hand-tuned map.
 */
export interface IDestinationMap {
  lat: number;
  lng: number;
  /** Google zoom level. Higher is closer; 11–13 suits a town and its valley. */
  zoom?: number;
  /** Overrides the generated embed URL. Leave empty in almost every case. */
  embedUrl?: string;
  /** Orientation copy for the left column — how the place is laid out. */
  blurb: string;
  landmarks: IDestinationLandmark[];
}

/* ------------------------------------------------------------------ */
/* 12. FAQs                                                            */
/* ------------------------------------------------------------------ */

/**
 * Scope these to THIS place. Hub-level questions ("which destination first")
 * live in src/data/destinationFaqs.ts and the two must not compete for the
 * same queries. Answers are plain strings because the page emits them
 * verbatim as FAQPage JSON-LD — HTML here would break the markup.
 */
export interface IDestinationFaq {
  id: string;
  question: string;
  answer: string;
}

/* ------------------------------------------------------------------ */
/* The record                                                          */
/* ------------------------------------------------------------------ */

/**
 * Everything /destinations/[slug] renders. Plain data — no mongoose — so the
 * public components can type against it whether the record came from the CMS
 * or from the static fallback in src/data/destinations.ts.
 */
export interface DestinationPageData {
  // 1. Identity & routing
  slug: string;
  name: string;
  status: DestinationStatus;
  /** Hub card copy — what the place is known for, in one line. */
  summary: string;
  /** Approximate drive from Srinagar. Empty for Srinagar itself. */
  fromSrinagar: string;

  // 2. Hero
  /** SOP §2.4 answer-first block, 40–60 words. Doubles as the meta description. */
  quickAnswer: string;
  /** Rough time worth giving the place, for the hero stat row. */
  idealDays: string;
  /** Hero carousel slides. One is enough — the carousel only rotates from two. */
  heroImages: IDestinationImage[];
  /** Card and Open Graph photo. */
  image: string;
  imageAlt: string;
  /** Optional second angle, crossfaded on hub-card hover. */
  hoverImage: string;

  // 3. Quick facts
  /** Metres then feet, rounded — published figures disagree by tens of metres. */
  altitude: string;
  bestTime: string;
  /** Two or three things the place is known for. Table-cell length. */
  famousFor: string;
  /** Extra rows appended to the four fixed ones. */
  extraFacts: IDestinationFact[];

  // 4. Things to do
  thingsToDo: IThingToDo[];

  // 5. How to reach
  howToReach: IHowToReach;

  // 6. Cab fares
  cabFares: IDestinationCabFare[];

  // 7. Where to stay — stay slugs, in the order they should appear
  staySlugs: string[];

  // 8. Best time
  bestTimeTable: IBestTimeTable;

  // 9. Photo strip
  galleryImages: IDestinationImage[];

  // 10. Sartaj's tips
  tipsIntro: string;
  sartajTips: IDestinationTip[];

  // 11. Map
  map: IDestinationMap;

  // 12. FAQs
  faqs: IDestinationFaq[];

  // 13. SEO / schema
  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;
}

export interface IDestination extends DestinationPageData, Document {
  createdAt: Date;
  updatedAt: Date;
}
