import { IStayPlace } from "@/types/stayPlaceTypes";
import mongoose, { Schema } from "mongoose";

/**
 * Stay place page — /stays/[place]-stays
 *
 * A place page exists ONLY when a published record exists here. The route 404s
 * otherwise, so we never ship a templated doorway page (SOP: no thin pages).
 *
 * The listing itself is not stored: the archive queries Stay by placeKey, the
 * same way CityHub drives its package grid off cityName.
 */

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

const sartajTipSchema = new Schema(
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

const StayPlaceSchema = new Schema<IStayPlace>(
  {
    // 1. Identity & routing
    slug: { type: String, required: true, unique: true, trim: true },
    placeKey: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    parentTown: { type: String, default: "" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },

    // 2. Hero
    eyebrow: { type: String, default: "" },
    title: { type: String, required: true },
    titleAccent: { type: String, default: "" },
    quickAnswer: { type: String, default: "" },
    heroImage: {
      image: { type: String, default: "" },
      alt: { type: String, default: "" },
    },

    // 3. Archive (listing is queried, not stored)
    archiveHeading: { type: String, default: "" },
    archiveIntro: { type: String, default: "" },

    // 4. Sartaj's tips
    tipsHeading: { type: String, default: "" },
    tipsIntro: { type: String, default: "" },
    sartajTips: { type: [sartajTipSchema], default: [] },

    // 5. FAQs
    faqsHeading: { type: String, default: "" },
    faqsIntro: { type: String, default: "" },
    faqs: { type: [faqSchema], default: [] },

    // 6. Internal linking
    linksHeading: { type: String, default: "" },
    linksIntro: { type: String, default: "" },
    internalLinks: { type: [internalLinkSchema], default: [] },

    // 7. SEO / schema
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    schemaTitle: { type: String, default: "" },
    schemaDescription: { type: String, default: "" },
  },
  { timestamps: true },
);

// placeKey drives the archive query against Stay.placeTags — index it.
StayPlaceSchema.index({ placeKey: 1 });
StayPlaceSchema.index({ status: 1 });

const StayPlace =
  (mongoose.models.StayPlace as mongoose.Model<IStayPlace>) ??
  mongoose.model<IStayPlace>("StayPlace", StayPlaceSchema);

export default StayPlace;
