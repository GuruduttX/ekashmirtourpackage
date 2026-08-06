import { Document } from "mongoose";

export interface ITempleTimingEntry {
  id: string;
  /** e.g. "Darshan", "Mangla Aarti", "Makhan Bhog" */
  name: string;
  /** e.g. "05:00 AM" — also the sole time when `endTime` is empty */
  startTime: string;
  /** e.g. "12:00 PM" — leave empty for a single-time entry (no range) */
  endTime: string;
}

export interface ITempleTimingPeriod {
  id: string;
  /** e.g. "Morning", "Evening", "Afternoon", "Night" */
  label: string;
  entries: ITempleTimingEntry[];
}

export interface ITempleSeasonTimings {
  id: string;
  /** e.g. "Summer", "Winter" */
  season: string;
  periods: ITempleTimingPeriod[];
}

export interface ITempleDistance {
  id: string;
  /** e.g. "Srinagar Airport", "Srinagar Railway Station", "City Centre" */
  from: string;
  distanceKm: number;
}

export interface ITempleSartajTip {
  id: string;
  tip: string;
}

export interface ITempleGalleryImage {
  id: string;
  image: string;
  alt: string;
}

/** Chip shown under the "About the Temple" copy — e.g. "Ancient", "Mata Rani". */
export interface ITempleTag {
  id: string;
  label: string;
}

/** A single aarti / darshan slot rendered as a card in "Rituals & Darshan". */
export interface ITempleRitual {
  id: string;
  /** e.g. "Mangal Aarti", "Bhog Aarti" */
  name: string;
  /** e.g. "3:00 AM" */
  startTime: string;
  /** e.g. "11:00 PM" — leave empty for a single-time ritual */
  endTime: string;
}

export type TempleSeasonLabel = "Best" | "Hot" | "Monsoon";

/** A row in the "Best Time to Visit" card — a month range plus its rating. */
export interface ITempleBestTime {
  id: string;
  /** e.g. "Oct-Mar" */
  period: string;
  type: TempleSeasonLabel;
}

export interface ITemple extends Document {
  title: string;
  slug: string;
  templeType: "Temple" | "Shrine" | "Mosque" | "Cave Shrine" | "Sufi Shrine";
  status: "published" | "draft";
  deity: string;
  location: string;
  distances: ITempleDistance[];
  seasonalTimings: ITempleSeasonTimings[];
  /** Entry fee in INR — 0 means free entry */
  entryFeeINR: number;
  dressCode: string;
  stepsOrClimb: string;
  photographyNote: string;
  bestTimeToVisit: string;
  howToReach: string;
  cabFareNote: string;
  ritualsDarshan: string;
  mainFestival: string;
  /** Long-form copy for the "About the Temple" card. */
  aboutTemple: string;
  tags: ITempleTag[];
  history: string;
  /** "History & Significance" tab 2. */
  mythology: string;
  /** "History & Significance" tab 3. */
  significance: string;
  rituals: ITempleRitual[];
  /** Street address shown in the "Temple Information" card. */
  address: string;
  bestTimes: ITempleBestTime[];
  sartajTips: ITempleSartajTip[];
  nearbyPlaces: Array<{ id: string; name: string; link: string }>;
  overview: string;
  faqs: Array<{ id: string; question: string; answer: string }>;
  metaTitle: string;
  metaDescription: string;
  image: string;
  alt: string;
  galleryImages: ITempleGalleryImage[];
  createdAt: Date;
  updatedAt: Date;
}
