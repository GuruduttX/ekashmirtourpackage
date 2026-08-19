import mongoose, { Schema } from "mongoose";
import {
  FESTIVAL_KIND_IDS,
  FESTIVAL_SEASON_IDS,
  type IFestival,
} from "@/types/festivalTypes";

/**
 * A festival — the /festivals/ hub card AND its /festivals/[slug] page.
 *
 * One collection feeds both, because a card without a page is a link to a 404.
 * A page exists only when a published record exists here or in the static
 * fallback (src/data/festivals.ts + src/data/festivalDetails.ts); see
 * src/lib/festivalPage.ts for the read-through.
 *
 * `destinationSlug` holds a slug, never a copy — the live Destination record
 * supplies the name for the "into destination" link at render time.
 *
 * Sub-document `id` fields are the admin editor's React keys, so they are plain
 * strings with `_id: false` — the same convention as ExperienceActivity.
 *
 * Almost everything defaults rather than being required: each section of the
 * public page renders only when its data exists, so a half-filled record still
 * produces a valid page. Only the fields the CARD cannot render without are
 * required, since a card is what puts the festival in front of a reader.
 */

const photoSchema = new Schema(
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

/** Shared by `attend` and `history` — both are {title, body} prose rows. */
const proseBlockSchema = new Schema(
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
 * Dates.
 *
 * `window`, `short` and `duration` are PROSE and always safe to publish — they
 * describe the pattern the festival falls in. `start` and `end` are ISO dates
 * and default to "" rather than to a guess; they are meaningless on their own
 * and only reach the Event schema alongside `datesVerified`. See the flag.
 */
const datesSchema = new Schema(
  {
    window: { type: String, default: "" },
    short: { type: String, default: "" },
    start: { type: String, default: "" },
    end: { type: String, default: "" },
    duration: { type: String, default: "" },
  },
  { _id: false },
);

const FestivalSchema = new Schema<IFestival>(
  {
    // 1. Identity & routing
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    shortName: { type: String, default: "", trim: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    kind: { type: String, enum: FESTIVAL_KIND_IDS, default: "cultural" },
    season: { type: String, enum: FESTIVAL_SEASON_IDS, default: "moves" },
    destinationSlug: { type: String, default: "" },

    // 2. Card & hero
    summary: { type: String, default: "" },
    image: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    quickAnswer: { type: String, default: "" },

    // 3. Dates
    dates: { type: datesSchema, default: () => ({}) },
    // Gates the Event JSON-LD and the visible "typical window" caveat together,
    // so it defaults to false — a date nobody has checked is never published as
    // machine-readable fact. See the field docs in the types file.
    datesVerified: { type: Boolean, default: false },

    // 4. At a glance
    venue: { type: String, default: "" },
    location: { type: String, default: "" },
    entry: { type: String, default: "" },
    facts: { type: [factSchema], default: [] },

    // 5. What happens
    intro: { type: String, default: "" },
    highlights: { type: [String], default: [] },

    // 6–9. Detail sections
    attend: { type: [proseBlockSchema], default: [] },
    history: { type: [proseBlockSchema], default: [] },
    gallery: { type: [photoSchema], default: [] },
    sartajTips: { type: [String], default: [] },

    // 10. FAQs
    faqs: { type: [faqSchema], default: [] },

    // 11. SEO — both fall back to generated copy on the page
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

// The detail page looks up one slug at a time and only ever wants published
// records; the hub and generateStaticParams list by status alone.
FestivalSchema.index({ status: 1 });

const Festival =
  (mongoose.models.Festival as mongoose.Model<IFestival>) ??
  mongoose.model<IFestival>("Festival", FestivalSchema);

export default Festival;
