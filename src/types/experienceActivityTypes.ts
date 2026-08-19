import { Document } from "mongoose";

/**
 * CMS data structure for an ACTIVITY page — /experiences/[slug]
 * e.g. /experiences/dal-lake-shikara
 *
 * This is the field list the sections of src/app/experiences/[slug]/page.tsx
 * consume, in the order they render:
 *
 *   1. Identity & routing
 *   2. Hero              — gallery, videos, rating, map link
 *   3. Price & enquiry rail
 *   4. Answer block + rich-text "about"
 *   5. Quick facts       — season, difficulty, suited for, extra rows
 *   6. Best months       — drives the hub's month tabs, not this page
 *   7. What to expect
 *   8. Inclusions & exclusions
 *   9. Booking & timing  — structured hours, also the OpeningHoursSpecification
 *  10. Tips             — booking tips and Sartaj's tips
 *  11. FAQs             — emitted verbatim as FAQPage
 *  12. SEO
 *
 * These types used to live in src/data/experienceActivities.ts, which is now
 * only the static fallback and re-exports them from here. The public
 * components are typed against `ExperienceActivity`, so a record from Mongo and
 * a record from the static file are interchangeable at render time — see
 * src/lib/experienceActivityPage.ts.
 *
 * EVERY DETAIL-PAGE FIELD IS OPTIONAL, on purpose. Each section renders only
 * when its data exists, so a record an editor has half filled still produces a
 * valid page rather than an empty heading or a crash. Treat that as the
 * contract: nothing here may become required without checking what the page
 * does with it missing.
 *
 * Every repeated row carries an `id`. The public page does not need one, but
 * the admin editor does — it is the React key that survives reordering and
 * deletion, and the reason none of these lists are bare strings.
 */

/**
 * The eleven rolling two-month windows the "Best Activities per Month" tabs
 * offer.
 *
 * Overlapping on purpose (Jan–Feb, Feb–Mar, Mar–Apr …) rather than twelve
 * single months: Kashmir's seasons do not respect month boundaries — the
 * tulips run late March into mid April, and skiing tails off across March —
 * so a window matches how the question is actually asked ("we're coming around
 * the end of March").
 *
 * An activity lists every window it is genuinely good in. Listing a window
 * where the activity does not really run is the one thing that makes that
 * section worse than useless, so keep them honest against `season`.
 */
export const MONTH_WINDOWS = [
  { id: "jan-feb", label: "Jan-Feb" },
  { id: "feb-mar", label: "Feb-Mar" },
  { id: "mar-apr", label: "Mar-Apr" },
  { id: "apr-may", label: "Apr-May" },
  { id: "may-jun", label: "May-Jun" },
  { id: "jun-jul", label: "Jun-July" },
  { id: "jul-aug", label: "July-Agst" },
  { id: "aug-sep", label: "Agst-Sep" },
  { id: "sep-oct", label: "Sep-Oct" },
  { id: "oct-nov", label: "Oct-Nov" },
  { id: "nov-dec", label: "Nov-Dec" },
] as const;

export type MonthWindowId = (typeof MONTH_WINDOWS)[number]["id"];

/** Every window id, for the model enum and the admin chip list. */
export const MONTH_WINDOW_IDS: MonthWindowId[] = MONTH_WINDOWS.map(
  (window) => window.id,
);

/** One carousel slide. `alt` must describe THIS photo, not the activity. */
export type ActivityImage = {
  id: string;
  image: string;
  alt: string;
};

/**
 * How hard the activity actually is.
 *
 * Four levels, not a 1–10 score: the honest resolution is "anyone / most people
 * / needs some fitness / needs training", and a number invites precision the
 * underlying reality does not have.
 */
export const ACTIVITY_DIFFICULTIES = [
  "easy",
  "moderate",
  "challenging",
  "expert",
] as const;

export type ActivityDifficulty = (typeof ACTIVITY_DIFFICULTIES)[number];

/** One extra quick-facts row, beyond the five the section always shows. */
export type ActivityFact = { id: string; label: string; value: string };

/** One beat of the "what to expect" walk-through. */
export type ActivityStep = { id: string; title: string; body: string };

/** One page-level FAQ. Answers are plain text — emitted verbatim as schema. */
export type ActivityFaq = { id: string; question: string; answer: string };

/* -------------------------------------------------------------------------- */
/* Operating hours                                                             */
/* -------------------------------------------------------------------------- */

/**
 * The week, Monday-first, with the schema.org URL each day maps to.
 *
 * Kept as data rather than a bare union so the day chips, the sort order and
 * the JSON-LD all read from one place — a mismatch between the visible table
 * and the emitted OpeningHoursSpecification is the classic bug here.
 */
export const WEEKDAYS = [
  { id: "mon", short: "Mon", label: "Monday", schema: "https://schema.org/Monday" },
  { id: "tue", short: "Tue", label: "Tuesday", schema: "https://schema.org/Tuesday" },
  { id: "wed", short: "Wed", label: "Wednesday", schema: "https://schema.org/Wednesday" },
  { id: "thu", short: "Thu", label: "Thursday", schema: "https://schema.org/Thursday" },
  { id: "fri", short: "Fri", label: "Friday", schema: "https://schema.org/Friday" },
  { id: "sat", short: "Sat", label: "Saturday", schema: "https://schema.org/Saturday" },
  { id: "sun", short: "Sun", label: "Sunday", schema: "https://schema.org/Sunday" },
] as const;

export type WeekdayId = (typeof WEEKDAYS)[number]["id"];

/** Every weekday id, for the model enum. */
export const WEEKDAY_IDS: WeekdayId[] = WEEKDAYS.map((day) => day.id);

/**
 * How much notice the activity needs.
 *
 * Three values because the practical advice genuinely has three shapes, and the
 * difference decides a reader's morning: the Gondola must be booked or you lose
 * hours queueing; a ski instructor should be booked in peak season; a shikara
 * is simply walked up to.
 */
export const ACTIVITY_BOOKING_REQUIREMENTS = [
  "required",
  "recommended",
  "walk-in",
] as const;

export type ActivityBookingRequirement =
  (typeof ACTIVITY_BOOKING_REQUIREMENTS)[number];

/**
 * One operating window inside a schedule.
 *
 * Times are 24-hour "HH:MM" strings, NOT Date objects: these are wall-clock
 * opening times in Kashmir, with no date and no timezone of their own. Storing
 * them as Dates would attach both, and the first server in another timezone
 * would shift every published timing by hours.
 */
export type ActivitySlot = {
  id: string;
  /** Names the window when there is more than one, e.g. "Phase 1", "Morning". */
  label?: string;
  /** "HH:MM", 24-hour. */
  opens: string;
  /** "HH:MM", 24-hour. */
  closes: string;
  /**
   * Last time you can actually start or board, when that is earlier than
   * `closes`. This is the field that stops a reader arriving at 16:50 for a
   * 17:00 close and being turned away — the single most useful number here.
   */
  lastEntry?: string;
};

/**
 * Operating hours for one part of the year.
 *
 * Seasonal because Kashmir genuinely is: the Gondola's winter hours are not its
 * summer hours, and a single opens/closes pair would be wrong for half the
 * year. An activity that never varies simply has one schedule with no `season`.
 */
export type ActivitySchedule = {
  id: string;
  /** e.g. "Summer (Apr–Oct)". Omit when the activity runs the same year round. */
  season?: string;
  /** Days these hours apply to. Omit for every day. */
  days?: WeekdayId[];
  /** Days it does not run at all in this season, e.g. a maintenance day. */
  closedDays?: WeekdayId[];
  slots: ActivitySlot[];
  /** Qualifier shown under the slots. */
  note?: string;
};

/** One dated closure beyond the weekly pattern. */
export type ActivityClosedDate = { id: string; date: string; reason?: string };

/**
 * Everything about when an activity runs and how far ahead to arrange it.
 *
 * Grouped into its own object rather than flattened onto the activity because
 * these fields are only meaningful together — and because the CMS form wants
 * them as one repeatable section rather than a dozen loose inputs.
 */
export type ActivityTiming = {
  /** At least one. Multiple entries mean the hours change by season. */
  schedules: ActivitySchedule[];
  /**
   * Standing weekly off — days the activity never runs, in any season.
   *
   * Distinct from a schedule's own `closedDays`, which is for a closure that
   * applies to ONE season only. Most weekly closures are year-round, and
   * repeating them inside every schedule is how the two drift apart.
   *
   * Omit it entirely when there is no weekly off. The page shows the row only
   * when this has values — an explicit "Weekly off: none" is noise, and an
   * empty array renders nothing.
   */
  weeklyOff?: WeekdayId[];
  /** Specific dates it is shut, beyond the weekly pattern. */
  closedDates?: ActivityClosedDate[];
  /** True when a session can be called off on the day. */
  weatherDependent?: boolean;
  /** What actually stops it — "wind or poor visibility", not "bad weather". */
  weatherNote?: string;
  booking?: ActivityBookingRequirement;
  /** How much notice, e.g. "A day ahead in Dec–Feb". */
  bookingLeadTime?: string;
  /**
   * TRUE ONLY WHEN THESE TIMINGS HAVE BEEN CHECKED ON THE GROUND.
   *
   * Gates the OpeningHoursSpecification JSON-LD, and swaps the visible
   * "confirm before you travel" caveat for a verified date. Published opening
   * hours that turn out to be wrong send someone to a closed gate, so this
   * follows the same pattern as `priceVerified`: the flag drives what the
   * reader sees and what the crawler is told, together.
   */
  verified?: boolean;
  /** ISO date the timings were last checked, e.g. "2026-08-01". */
  verifiedOn?: string;
};

/** One video for the hero's "Watch Videos" control. */
export type ActivityVideo = {
  id: string;
  /** Embeddable URL (YouTube/Vimeo embed form, or a direct file). */
  url: string;
  title: string;
  /** Poster frame. Falls back to the activity's cover photo when unset. */
  thumbnail?: string;
};

/* -------------------------------------------------------------------------- */
/* The record                                                                  */
/* -------------------------------------------------------------------------- */

export type ExperienceActivity = {
  /** Stable key — the Mongo _id for a CMS record, the authored id for a static one. */
  id: string;
  /** URL slug — /experiences/[slug]. */
  slug: string;
  /** Card and H1 title. */
  title: string;
  /** Where it happens — the card's MapPin line. */
  location: string;
  /** Display string, e.g. "1 hour – 4 days". Free text because the real spread varies. */
  duration: string;
  /** Indicative per-person rate in INR. Shown as "from" guidance. */
  pricePerPerson: number;
  /**
   * Carousel slides, at least one. The card pages through these and derives the
   * photo-count pill from `gallery.length`, so the count can never claim more
   * photos than exist — which is why there is no separate `photoCount` field.
   */
  gallery: ActivityImage[];
  /**
   * Every month window this activity is genuinely worth doing in — drives the
   * "Best Activities per Month" filter. An empty array simply means the
   * activity never appears there; it does not hide it from the archive.
   */
  bestMonths: MonthWindowId[];
  /** Pins the "Featured" badge. */
  featured?: boolean;
  /**
   * 0–5. Populate only from genuine on-page reviews — the hero prints the stars
   * from this, and fake rating markup is a domain-wide manual-action risk. No
   * AggregateRating JSON-LD is emitted from it in any case.
   */
  rating?: number;
  /**
   * How many genuine reviews `rating` averages. The hero prints "(N Ratings)"
   * only when it is present, so an unset count shows the stars alone rather
   * than inventing a review count.
   */
  ratingCount?: number;
  /**
   * Video embeds for the hero's "Watch Videos" button, which is hidden when
   * this is empty.
   */
  videos?: ActivityVideo[];
  /**
   * Overrides the hero's "View Map" target. Falls back to a Google Maps search
   * for the activity's location, which is right often enough that most records
   * will never need this.
   */
  mapUrl?: string;

  /**
   * SOP §2.9 answer-first block, 40–60 words. Answers "what is this and is it
   * for me" above the fold, before any table. This is the block most likely to
   * be lifted as a featured snippet, so it must read as a complete answer on
   * its own — and it is the meta description when the SEO override is empty.
   */
  quickAnswer?: string;
  /**
   * The main body copy — RICH-TEXT HTML from the CMS editor, not plain text or
   * Markdown.
   *
   * Rendered through RichText, which sanitises it server-side against the
   * allowlist in src/lib/sanitizeHtml.ts. That allowlist is the real contract
   * here: headings, lists, links, tables, blockquotes, images and inline
   * emphasis survive; script/style/iframe, event handlers and `javascript:`
   * URLs are stripped. Anything the editor can produce that is not on the list
   * will silently vanish, so extend the allowlist and the prose styles together.
   */
  aboutHtml?: string;
  /** When it actually runs, e.g. "Dec–Mar; deepest snow Jan–Feb". */
  season?: string;
  difficulty?: ActivityDifficulty;
  /** One line on who this suits — the difficulty rating in plain words. */
  suitedFor?: string;
  /**
   * SOP B3 "INTO destination" link. Must resolve to a destination record — an
   * unresolvable slug drops the link rather than rendering a dead one.
   */
  destinationSlug?: string;
  /**
   * True only once `pricePerPerson` has been verified for the current season.
   *
   * GATES THE schema.org Offer. An Offer is a machine-readable price
   * commitment, and the SOP forbids publishing one built on an unverified
   * figure — so the page emits Service-without-Offer until this is set, and
   * shows the price as "from" guidance either way.
   */
  priceVerified?: boolean;
  /** Qualifier under the price, e.g. "Phase 1; Phase 2 charged separately". */
  priceNote?: string;
  /** Extra quick-facts rows beyond the five the section always shows. */
  extraFacts?: ActivityFact[];
  /** SOP §2.9 "what to expect" — the walk-through, one step per beat. */
  whatToExpect?: ActivityStep[];
  /** What the stated price covers. */
  inclusions?: string[];
  /** What it does not. Name the real ones — this is the trust block. */
  exclusions?: string[];
  /**
   * When the activity runs and how far ahead to arrange it. See ActivityTiming.
   * Absent means the section is skipped entirely — better than publishing hours
   * nobody has checked.
   */
  timing?: ActivityTiming;
  /**
   * SOP §2.9 booking tips — advice that does not fit the structured timing
   * above, e.g. "take the first slot; cloud builds through the afternoon".
   */
  bookingTips?: string[];
  /**
   * Sartaj's on-ground truths (SOP A4/A8 information gain). Each entry should
   * be specific and checkable — "carry warm clothes" is not a tip.
   */
  sartajTips?: string[];
  /**
   * Page-level FAQs. Scope to THIS activity — hub-level questions live in
   * src/data/experienceFaqs.ts and the two must not compete for the same
   * queries. Plain strings, because the page emits them verbatim as FAQPage.
   */
  faqs?: ActivityFaq[];
  /** Overrides for the <title> and meta description. Both fall back to generated copy. */
  seo?: { title?: string; description?: string };
};

export type ExperienceActivityStatus = "draft" | "published";

/**
 * One activity as the public page receives it — an ExperienceActivity plus the
 * publish state, whether it came from Mongo or from the static fallback.
 */
export interface ExperienceActivityPageData extends ExperienceActivity {
  status: ExperienceActivityStatus;
}

/**
 * What the collection stores. `id` is omitted because Mongo owns identity —
 * the read-through fills `ExperienceActivityPageData.id` from `_id`, so the
 * public components keep a stable key either way.
 */
export type ExperienceActivityRecord = Omit<
  ExperienceActivityPageData,
  "id"
>;

export interface IExperienceActivity
  extends ExperienceActivityRecord,
    Document {
  createdAt: Date;
  updatedAt: Date;
}
