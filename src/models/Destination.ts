import mongoose, { Schema } from "mongoose";
import {
  IDestination,
  MONTH_RATINGS,
  THING_TO_DO_TYPES,
  TRANSPORT_MODES,
} from "@/types/destinationTypes";

/**
 * A destination page — /destinations/[slug].
 *
 * A page exists only when a published record exists here or in the static
 * fallback (src/data/destinations.ts); see src/lib/destinationPage.ts for the
 * read-through. Nothing that belongs to another collection is copied in:
 * `thingsToDo`, `cabFares` and `staySlugs` hold slugs, and the live Temple /
 * Taxi / Stay record supplies the title, photo and price at render time.
 *
 * Sub-document `id` fields are the admin editor's React keys, so they are
 * plain strings with `_id: false` — the same convention as Stay and StayPlace.
 */

const imageSchema = new Schema(
  {
    id: { type: String },
    image: { type: String, default: "" },
    alt: { type: String, default: "" },
  },
  { _id: false },
);

const factSchema = new Schema(
  {
    id: { type: String },
    label: { type: String, default: "" },
    value: { type: String, default: "" },
  },
  { _id: false },
);

const thingToDoSchema = new Schema(
  {
    id: { type: String },
    type: { type: String, enum: THING_TO_DO_TYPES, required: true },
    heading: { type: String, default: "" },
    slug: { type: String, default: "" },
    description: { type: String, default: "" },
    images: { type: [imageSchema], default: [] },
  },
  { _id: false },
);

const routeHubSchema = new Schema(
  {
    id: { type: String },
    origin: { type: String, default: "" },
    duration: { type: String, default: "" },
    details: { type: String, default: "" },
  },
  { _id: false },
);

const transportModeSchema = new Schema(
  {
    id: { type: String },
    mode: { type: String, enum: TRANSPORT_MODES, default: "Air" },
    nearestTerminal: { type: String, default: "" },
    distance: { type: Number, default: 0, min: 0 },
    description: { type: String, default: "" },
    commonRoutes: { type: [routeHubSchema], default: [] },
  },
  { _id: false },
);

const cabFareSchema = new Schema(
  {
    id: { type: String },
    slug: { type: String, default: "" },
    // No default: an unset price means "use the vehicle's base rate", and 0
    // would instead advertise a free cab.
    price: { type: Number, min: 0 },
    note: { type: String, default: "" },
  },
  { _id: false },
);

const monthSchema = new Schema(
  {
    id: { type: String },
    month: { type: String, default: "" },
    rating: { type: String, enum: MONTH_RATINGS, default: "good" },
    note: { type: String, default: "" },
  },
  { _id: false },
);

const tipSchema = new Schema(
  {
    id: { type: String },
    title: { type: String, default: "" },
    tip: { type: String, default: "" },
  },
  { _id: false },
);

const landmarkSchema = new Schema(
  {
    id: { type: String },
    name: { type: String, default: "" },
    detail: { type: String, default: "" },
  },
  { _id: false },
);

const faqSchema = new Schema(
  {
    id: { type: String },
    question: { type: String, default: "" },
    answer: { type: String, default: "" },
  },
  { _id: false },
);

const DestinationSchema = new Schema<IDestination>(
  {
    // 1. Identity & routing
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    summary: { type: String, default: "" },
    fromSrinagar: { type: String, default: "" },

    // 2. Hero
    quickAnswer: { type: String, default: "" },
    idealDays: { type: String, default: "" },
    heroImages: { type: [imageSchema], default: [] },
    image: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    hoverImage: { type: String, default: "" },

    // 3. Quick facts
    altitude: { type: String, default: "" },
    bestTime: { type: String, default: "" },
    famousFor: { type: String, default: "" },
    extraFacts: { type: [factSchema], default: [] },

    // 4. Things to do
    thingsToDo: { type: [thingToDoSchema], default: [] },

    // 5. How to reach
    howToReach: {
      overview: { type: String, default: "" },
      transportModes: { type: [transportModeSchema], default: [] },
    },

    // 6. Cab fares — empty means "whole published fleet at base rate"
    cabFares: { type: [cabFareSchema], default: [] },

    // 7. Where to stay
    staySlugs: { type: [String], default: [] },

    // 8. Best time
    bestTimeTable: {
      overview: { type: String, default: "" },
      months: { type: [monthSchema], default: [] },
    },

    // 9. Photo strip
    galleryImages: { type: [imageSchema], default: [] },

    // 10. Sartaj's tips
    tipsIntro: { type: String, default: "" },
    sartajTips: { type: [tipSchema], default: [] },

    // 11. Map
    map: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
      zoom: { type: Number, default: 12 },
      embedUrl: { type: String, default: "" },
      blurb: { type: String, default: "" },
      landmarks: { type: [landmarkSchema], default: [] },
    },

    // 12. FAQs
    faqs: { type: [faqSchema], default: [] },

    // 13. SEO / schema
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    schemaTitle: { type: String, default: "" },
    schemaDescription: { type: String, default: "" },
  },
  { timestamps: true },
);

// The public page looks up one slug at a time and only ever wants published
// records; the hub and generateStaticParams list by status alone.
DestinationSchema.index({ status: 1 });

const Destination =
  (mongoose.models.Destination as mongoose.Model<IDestination>) ??
  mongoose.model<IDestination>("Destination", DestinationSchema);

export default Destination;
