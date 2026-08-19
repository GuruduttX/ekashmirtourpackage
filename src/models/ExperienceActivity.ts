import mongoose, { Schema } from "mongoose";
import {
  ACTIVITY_BOOKING_REQUIREMENTS,
  ACTIVITY_DIFFICULTIES,
  MONTH_WINDOW_IDS,
  WEEKDAY_IDS,
  type IExperienceActivity,
} from "@/types/experienceActivityTypes";

/**
 * An activity page — /experiences/[slug].
 *
 * A page exists only when a published record exists here or in the static
 * fallback (src/data/experienceActivities.ts); see
 * src/lib/experienceActivityPage.ts for the read-through.
 *
 * `destinationSlug` holds a slug, never a copy — the live Destination record
 * supplies the name and photo for the "into destination" link at render time.
 *
 * Sub-document `id` fields are the admin editor's React keys, so they are plain
 * strings with `_id: false` — the same convention as Destination and Stay.
 *
 * Almost everything defaults rather than being required: each section of the
 * public page renders only when its data exists, so a half-filled record still
 * produces a valid page. Only the fields the hero and the card cannot render
 * without are required.
 */

const imageSchema = new Schema(
  {
    id: { type: String },
    image: { type: String, default: "" },
    alt: { type: String, default: "" },
  },
  { _id: false },
);

const videoSchema = new Schema(
  {
    id: { type: String },
    url: { type: String, default: "" },
    title: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
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

const stepSchema = new Schema(
  {
    id: { type: String },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
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

/**
 * Wall-clock times, stored as "HH:MM" strings.
 *
 * NOT Dates: these are opening times in Kashmir with no date and no timezone of
 * their own, and a Date would attach both — the first server in another
 * timezone would shift every published timing by hours.
 */
const slotSchema = new Schema(
  {
    id: { type: String },
    label: { type: String, default: "" },
    opens: { type: String, default: "" },
    closes: { type: String, default: "" },
    lastEntry: { type: String, default: "" },
  },
  { _id: false },
);

const scheduleSchema = new Schema(
  {
    id: { type: String },
    season: { type: String, default: "" },
    days: { type: [String], enum: WEEKDAY_IDS, default: [] },
    closedDays: { type: [String], enum: WEEKDAY_IDS, default: [] },
    slots: { type: [slotSchema], default: [] },
    note: { type: String, default: "" },
  },
  { _id: false },
);

const closedDateSchema = new Schema(
  {
    id: { type: String },
    date: { type: String, default: "" },
    reason: { type: String, default: "" },
  },
  { _id: false },
);

const ExperienceActivitySchema = new Schema<IExperienceActivity>(
  {
    // 1. Identity & routing
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    location: { type: String, default: "" },
    duration: { type: String, default: "" },
    destinationSlug: { type: String, default: "" },
    featured: { type: Boolean, default: false },

    // 2. Hero
    gallery: { type: [imageSchema], default: [] },
    videos: { type: [videoSchema], default: [] },
    mapUrl: { type: String, default: "" },
    // No defaults on either: an unset rating must print no stars at all, and 0
    // would advertise a one-star activity. Same for the count.
    rating: { type: Number, min: 0, max: 5 },
    ratingCount: { type: Number, min: 0 },

    // 3. Price
    pricePerPerson: { type: Number, default: 0, min: 0 },
    priceVerified: { type: Boolean, default: false },
    priceNote: { type: String, default: "" },

    // 4. Answer block & about
    quickAnswer: { type: String, default: "" },
    aboutHtml: { type: String, default: "" },

    // 5. Quick facts
    season: { type: String, default: "" },
    // No default: the page prints "Ask us" rather than guessing a level.
    difficulty: { type: String, enum: ACTIVITY_DIFFICULTIES },
    suitedFor: { type: String, default: "" },
    extraFacts: { type: [factSchema], default: [] },

    // 6. Best months — empty simply means it never shows in the month tabs
    bestMonths: { type: [String], enum: MONTH_WINDOW_IDS, default: [] },

    // 7. What to expect
    whatToExpect: { type: [stepSchema], default: [] },

    // 8. Inclusions & exclusions
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },

    // 9. Booking & timing
    timing: {
      schedules: { type: [scheduleSchema], default: [] },
      weeklyOff: { type: [String], enum: WEEKDAY_IDS, default: [] },
      closedDates: { type: [closedDateSchema], default: [] },
      weatherDependent: { type: Boolean, default: false },
      weatherNote: { type: String, default: "" },
      booking: { type: String, enum: ACTIVITY_BOOKING_REQUIREMENTS },
      bookingLeadTime: { type: String, default: "" },
      // Gates the OpeningHoursSpecification JSON-LD and the visible caveat, so
      // it defaults to false — hours nobody has checked are never published as
      // machine-readable fact.
      verified: { type: Boolean, default: false },
      verifiedOn: { type: String, default: "" },
    },

    // 10. Tips
    bookingTips: { type: [String], default: [] },
    sartajTips: { type: [String], default: [] },

    // 11. FAQs
    faqs: { type: [faqSchema], default: [] },

    // 12. SEO — both fall back to generated copy on the page
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

// The detail page looks up one slug at a time and only ever wants published
// records; the hub and generateStaticParams list by status alone.
ExperienceActivitySchema.index({ status: 1 });

const ExperienceActivity =
  (mongoose.models.ExperienceActivity as mongoose.Model<IExperienceActivity>) ??
  mongoose.model<IExperienceActivity>(
    "ExperienceActivity",
    ExperienceActivitySchema,
  );

export default ExperienceActivity;
