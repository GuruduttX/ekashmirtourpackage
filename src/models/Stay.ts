import mongoose, { Schema } from "mongoose";
import { IStay, STAY_AMENITY_GROUPS, STAY_CATEGORIES } from "@/types/stayTypes";

/**
 * An individual stay — /stays/[property-slug].
 *
 * One schema for all four categories. Type pages filter on `category`, place
 * pages filter on `placeTags`, so both are indexed.
 *
 * No rating / reviewCount / score fields by design — see the note in
 * src/types/stayTypes.ts.
 */

const galleryImageSchema = new Schema(
  {
    id: { type: String },
    image: { type: String, default: "" },
    alt: { type: String, default: "" },
  },
  { _id: false },
);

const highlightSchema = new Schema(
  {
    id: { type: String },
    label: { type: String, default: "" },
  },
  { _id: false },
);

const amenitySchema = new Schema(
  {
    id: { type: String },
    label: { type: String, default: "" },
    group: {
      type: String,
      enum: STAY_AMENITY_GROUPS,
      default: "Essentials",
    },
  },
  { _id: false },
);

const listItemSchema = new Schema(
  {
    id: { type: String },
    description: { type: String, default: "" },
  },
  { _id: false },
);

const houseRuleSchema = new Schema(
  {
    id: { type: String },
    rule: { type: String, default: "" },
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

const faqSchema = new Schema(
  {
    id: { type: String },
    question: { type: String, default: "" },
    answer: { type: String, default: "" },
  },
  { _id: false },
);

const internalLinkSchema = new Schema(
  {
    id: { type: String },
    type: {
      type: String,
      enum: [
        "cab",
        "package",
        "destination",
        "temple",
        "experience",
        "activity",
        "blog",
        "stayType",
      ],
      required: true,
    },
    label: { type: String, default: "" },
    slug: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false },
);

const StaySchema = new Schema<IStay>(
  {
    // 1. Identity & routing
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: STAY_CATEGORIES, required: true },
    town: { type: String, default: "" },
    area: { type: String, default: "" },
    placeTags: { type: [String], default: [] },
    host: { type: String, default: "" },
    address: { type: String, default: "" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },

    // 2. Hero
    eyebrow: { type: String, default: "" },
    titleAccent: { type: String, default: "" },
    quickAnswer: { type: String, default: "" },
    heroImage: {
      image: { type: String, default: "" },
      alt: { type: String, default: "" },
    },

    // 3. Gallery
    gallery: { type: [galleryImageSchema], default: [] },

    // 4. Key facts & pricing
    priceFrom: { type: Number, default: 0, min: 0 },
    bestFor: { type: String, default: "" },
    sleeps: { type: Number, default: 0, min: 0 },
    bedrooms: { type: Number, default: 0, min: 0 },
    checkIn: { type: String, default: "" },
    checkOut: { type: String, default: "" },
    minNights: { type: Number, default: 1, min: 1 },
    highlights: { type: [highlightSchema], default: [] },

    // 5. Amenities
    quickInclusions: {
      freeWifi: { type: Boolean, default: false },
      breakfast: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
    },
    amenities: { type: [amenitySchema], default: [] },

    // 6. Overview — HTML from the rich text editor
    overview: { type: String, default: "" },

    // 7. Inclusions & exclusions
    inclusions: { type: [listItemSchema], default: [] },
    exclusions: { type: [listItemSchema], default: [] },

    // 8. Policies
    cancellationPolicy: { type: String, default: "" },
    paymentTerms: { type: String, default: "" },
    houseRules: { type: [houseRuleSchema], default: [] },

    // 9. Sartaj's tips
    tipsHeading: { type: String, default: "" },
    tipsIntro: { type: String, default: "" },
    sartajTips: { type: [tipSchema], default: [] },

    // 10. FAQs
    faqsHeading: { type: String, default: "" },
    faqsIntro: { type: String, default: "" },
    faqs: { type: [faqSchema], default: [] },

    // 11. Internal linking
    linksHeading: { type: String, default: "" },
    linksIntro: { type: String, default: "" },
    internalLinks: { type: [internalLinkSchema], default: [] },

    // 12. SEO / schema
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    schemaTitle: { type: String, default: "" },
    schemaDescription: { type: String, default: "" },
  },
  { timestamps: true },
);

// Type pages query category; place pages query placeTags. Both are hot paths.
StaySchema.index({ category: 1 });
StaySchema.index({ placeTags: 1 });
StaySchema.index({ status: 1 });

const Stay =
  (mongoose.models.Stay as mongoose.Model<IStay>) ??
  mongoose.model<IStay>("Stay", StaySchema);

export default Stay;
