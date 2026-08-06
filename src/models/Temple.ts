import { ITemple } from "@/types/templeTypes";
import mongoose, { Schema } from "mongoose";

const timingEntrySchema = new Schema(
  {
    id: { type: String },
    name: { type: String, default: "" },
    startTime: { type: String, default: "" },
    endTime: { type: String, default: "" },
  },
  { _id: false },
);

const timingPeriodSchema = new Schema(
  {
    id: { type: String },
    label: { type: String, default: "" },
    entries: [timingEntrySchema],
  },
  { _id: false },
);

const seasonTimingsSchema = new Schema(
  {
    id: { type: String },
    season: { type: String, default: "" },
    periods: [timingPeriodSchema],
  },
  { _id: false },
);

const distanceSchema = new Schema(
  {
    id: { type: String },
    from: { type: String, default: "" },
    distanceKm: { type: Number, default: 0 },
  },
  { _id: false },
);

const ritualSchema = new Schema(
  {
    id: { type: String },
    name: { type: String, default: "" },
    startTime: { type: String, default: "" },
    endTime: { type: String, default: "" },
  },
  { _id: false },
);

const bestTimeSchema = new Schema(
  {
    id: { type: String },
    period: { type: String, default: "" },
    type: { type: String, enum: ["Best", "Hot", "Monsoon"], default: "Best" },
  },
  { _id: false },
);

const templeSchema = new Schema<ITemple>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    templeType: {
      type: String,
      enum: ["Temple", "Shrine", "Mosque", "Cave Shrine", "Sufi Shrine"],
    },
    status: { type: String, enum: ["published", "draft"], default: "draft" },
    deity: { type: String, default: "" },
    location: { type: String, default: "" },
    distances: [distanceSchema],
    seasonalTimings: [seasonTimingsSchema],
    entryFeeINR: { type: Number, default: 0 },
    dressCode: { type: String, default: "" },
    stepsOrClimb: { type: String, default: "" },
    photographyNote: { type: String, default: "" },
    bestTimeToVisit: { type: String, default: "" },
    howToReach: { type: String, default: "" },
    cabFareNote: { type: String, default: "" },
    ritualsDarshan: { type: String, default: "" },
    mainFestival: { type: String, default: "" },
    aboutTemple: { type: String, default: "" },
    tags: [{ id: { type: String }, label: { type: String, default: "" } }],
    history: { type: String, default: "" },
    mythology: { type: String, default: "" },
    significance: { type: String, default: "" },
    rituals: [ritualSchema],
    address: { type: String, default: "" },
    bestTimes: [bestTimeSchema],
    sartajTips: [{ id: { type: String }, tip: { type: String, default: "" } }],
    nearbyPlaces: [{ id: { type: String }, name: { type: String }, link: { type: String } }],
    overview: { type: String, default: "" },
    faqs: [{ id: { type: String }, question: { type: String }, answer: { type: String } }],
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    image: { type: String },
    alt: { type: String },
    galleryImages: [{ id: { type: String }, image: { type: String, default: "" }, alt: { type: String, default: "" } }],
  },
  { timestamps: true },
);

const Temple = mongoose.models.Temple || mongoose.model<ITemple>("Temple", templeSchema);
export default Temple;
