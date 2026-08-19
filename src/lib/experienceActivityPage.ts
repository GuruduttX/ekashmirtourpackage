import { connectDB } from "@/lib/db";
import ExperienceActivityModel from "@/models/ExperienceActivity";
import {
  EXPERIENCE_ACTIVITIES,
  rankRelatedActivities,
} from "@/data/experienceActivities";
import type {
  ExperienceActivity,
  ExperienceActivityPageData,
  ExperienceActivityRecord,
  ActivitySchedule,
  ActivityTiming,
} from "@/types/experienceActivityTypes";

/**
 * Read-through for /experiences and /experiences/[slug].
 *
 * Mongo is the source of truth; src/data/experienceActivities.ts backfills any
 * slug that has not been migrated yet, so the existing pages keep rendering
 * through the move instead of 404ing one by one. Once every activity has a
 * published record, the static file and this fallback can go.
 *
 * The interesting work here is `normalize`. The schema defaults optional fields
 * to "" and [] so an editor never meets an undefined input — but the public
 * page reaches for its fallbacks with `??`, which an empty string and an empty
 * array both pass straight through. Left alone that ships an empty <title>, a
 * dead "View Map" link, and a timings table where `schedule.days ?? EVERY_DAY`
 * resolves to "closed all week". So every optional field an editor can leave
 * blank is emptied back to undefined on the way out, in exactly one place.
 */

/** "" → undefined, so the page's `??` fallbacks actually fire. */
const text = (value: unknown): string | undefined => {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed.length ? trimmed : undefined;
};

/** [] → undefined, for the lists whose absence means "no restriction". */
const list = <T,>(value: T[] | undefined): T[] | undefined =>
  value?.length ? value : undefined;

/**
 * Timing, emptied out.
 *
 * `days` and `closedDays` are the ones that matter: an empty `days` array means
 * "the editor set no allowlist", but ActivityBookingTiming reads it as "no day
 * is open" because `[] ?? EVERY_DAY` is `[]`. The whole object collapses to
 * undefined when there are no schedules, which is what makes the section
 * disappear rather than render an empty shell.
 */
function normalizeTiming(timing?: ActivityTiming): ActivityTiming | undefined {
  const schedules = (timing?.schedules ?? [])
    // A schedule with no slots has nothing to say and would render an empty row.
    .filter((schedule) => schedule.slots?.length)
    .map(
      (schedule): ActivitySchedule => ({
        id: schedule.id,
        season: text(schedule.season),
        days: list(schedule.days),
        closedDays: list(schedule.closedDays),
        slots: schedule.slots.map((slot) => ({
          id: slot.id,
          label: text(slot.label),
          opens: slot.opens,
          closes: slot.closes,
          lastEntry: text(slot.lastEntry),
        })),
        note: text(schedule.note),
      }),
    );

  if (!schedules.length) return undefined;

  return {
    schedules,
    weeklyOff: list(timing?.weeklyOff),
    closedDates: list(
      (timing?.closedDates ?? []).filter((closure) => closure.date),
    ),
    weatherDependent: timing?.weatherDependent,
    weatherNote: text(timing?.weatherNote),
    booking: timing?.booking || undefined,
    bookingLeadTime: text(timing?.bookingLeadTime),
    verified: timing?.verified,
    verifiedOn: text(timing?.verifiedOn),
  };
}

/**
 * One stored record in the shape the public components expect.
 *
 * `id` comes from Mongo for a CMS record and from the static file otherwise, so
 * React keys stay stable across renders either way.
 */
function normalize(
  id: string,
  record: ExperienceActivityRecord,
): ExperienceActivityPageData {
  const seoTitle = text(record.seo?.title);
  const seoDescription = text(record.seo?.description);

  return {
    id,
    slug: record.slug,
    title: record.title,
    status: record.status,
    location: record.location,
    duration: record.duration,
    pricePerPerson: record.pricePerPerson,
    gallery: record.gallery ?? [],
    bestMonths: record.bestMonths ?? [],
    featured: record.featured,
    // A 0 rating would print zero stars rather than none, so it is dropped
    // along with an unset one — the hero shows stars only for a real average.
    rating: record.rating || undefined,
    ratingCount: record.ratingCount || undefined,
    videos: list((record.videos ?? []).filter((video) => video.url)),
    mapUrl: text(record.mapUrl),

    quickAnswer: text(record.quickAnswer),
    aboutHtml: text(record.aboutHtml),
    season: text(record.season),
    difficulty: record.difficulty || undefined,
    suitedFor: text(record.suitedFor),
    destinationSlug: text(record.destinationSlug),
    priceVerified: record.priceVerified,
    priceNote: text(record.priceNote),
    extraFacts: list((record.extraFacts ?? []).filter((fact) => fact.label)),
    whatToExpect: list(
      (record.whatToExpect ?? []).filter((step) => step.title || step.body),
    ),
    inclusions: list((record.inclusions ?? []).filter(Boolean)),
    exclusions: list((record.exclusions ?? []).filter(Boolean)),
    timing: normalizeTiming(record.timing),
    bookingTips: list((record.bookingTips ?? []).filter(Boolean)),
    sartajTips: list((record.sartajTips ?? []).filter(Boolean)),
    // A half-filled FAQ row would ship as broken FAQPage markup, so both halves
    // are required for the row to survive.
    faqs: list((record.faqs ?? []).filter((faq) => faq.question && faq.answer)),
    seo:
      seoTitle || seoDescription
        ? { title: seoTitle, description: seoDescription }
        : undefined,
  };
}

/**
 * The static record, in CMS shape. Also the seeder's input — one conversion, so
 * a seeded record and a fallback record are identical.
 */
export function staticActivityToPage(
  activity: ExperienceActivity,
): ExperienceActivityPageData {
  return normalize(activity.id, {
    ...activity,
    // The static file predates the CMS and has no publish state. Everything in
    // it is already live on the site, so it backfills as published.
    status: "published",
  });
}

/** A lean document, as a plain record plus its Mongo id. */
type LeanActivity = ExperienceActivityRecord & { _id: unknown };

const fromMongo = (record: LeanActivity): ExperienceActivityPageData =>
  // `.lean()` still hands back ObjectId and Date instances, which a Server
  // Component cannot pass to a Client Component. Round-tripping through JSON
  // flattens them to plain strings — same approach as the destination page.
  normalize(
    String(record._id),
    JSON.parse(JSON.stringify(record)) as ExperienceActivityRecord,
  );

/**
 * One activity, CMS first.
 *
 * Returns undefined when neither source has the slug, which is what makes the
 * page 404 — a half-empty templated page would be worse than none (SOP: no
 * thin pages).
 */
export async function getActivityPage(
  slug: string,
): Promise<ExperienceActivityPageData | undefined> {
  try {
    await connectDB();
    const record = await ExperienceActivityModel.findOne({
      slug,
      status: "published",
    }).lean<LeanActivity>();

    if (record) return fromMongo(record);
  } catch {
    // A database that is down should degrade to the static copy rather than
    // take the page with it.
  }

  const staticRecord = EXPERIENCE_ACTIVITIES.find(
    (activity) => activity.slug === slug,
  );

  return staticRecord ? staticActivityToPage(staticRecord) : undefined;
}

/**
 * Every published activity — CMS records first, then any static slug not yet
 * migrated. Feeds the hub archive, the month tabs and the related rail.
 *
 * CMS records win on a slug collision, so seeding a static activity and then
 * editing it in the admin shows the edit rather than the original.
 */
export async function getActivityPages(): Promise<
  ExperienceActivityPageData[]
> {
  let cmsRecords: ExperienceActivityPageData[] = [];

  try {
    await connectDB();
    const records = await ExperienceActivityModel.find({ status: "published" })
      .sort({ createdAt: -1 })
      .lean<LeanActivity[]>();

    cmsRecords = records.map(fromMongo);
  } catch {
    // Mongo outage — the hub still renders whatever the static file knows.
  }

  const seen = new Set(cmsRecords.map((activity) => activity.slug));
  const staticRecords = EXPERIENCE_ACTIVITIES.filter(
    (activity) => !seen.has(activity.slug),
  ).map(staticActivityToPage);

  return [...cmsRecords, ...staticRecords];
}

/**
 * Every slug worth prerendering. Slugs added to the CMS after a build still
 * render on demand, since the route leaves `dynamicParams` at its default.
 */
export async function getActivityPageSlugs(): Promise<string[]> {
  const slugs = new Set(EXPERIENCE_ACTIVITIES.map((activity) => activity.slug));

  try {
    await connectDB();
    const records = await ExperienceActivityModel.find({ status: "published" })
      .select("slug")
      .lean<{ slug: string }[]>();

    for (const record of records) slugs.add(record.slug);
  } catch {
    // Build-time Mongo outage — prerender what the static file knows about.
  }

  return [...slugs];
}

/**
 * Related activities for a detail page, ranked over the same pool the hub
 * shows — same destination first, then whatever shares a month window.
 */
export async function getRelatedActivityPages(
  activity: ExperienceActivityPageData,
  limit = 3,
): Promise<ExperienceActivityPageData[]> {
  return rankRelatedActivities(activity, await getActivityPages(), limit);
}
