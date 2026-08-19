import { connectDB } from "@/lib/db";
import FestivalModel from "@/models/Festival";
import { FESTIVALS, type StaticFestival } from "@/data/festivals";
import { getFestivalDetail } from "@/data/festivalDetails";
import { FESTIVAL_GALLERY } from "@/data/festivalGallery";
import type { GalleryImage } from "@/data/experienceGallery";
import type {
  Festival,
  FestivalPageData,
  FestivalRecord,
} from "@/types/festivalTypes";

/**
 * Read-through for /festivals and /festivals/[slug].
 *
 * Mongo is the source of truth; the static files backfill any slug that has not
 * been migrated yet, so both pages keep rendering through the move instead of
 * 404ing one by one. Once every festival has a published record,
 * src/data/festivals.ts, src/data/festivalDetails.ts and this fallback can go.
 *
 * The interesting work here is `normalize`. The schema defaults optional fields
 * to "" and [] so an editor never meets an undefined input — but the public
 * components reach for their fallbacks with `??` and with `.length` checks,
 * which an empty string and an empty array both pass straight through. Left
 * alone that ships an empty <title>, a "The story behind…" heading with nothing
 * under it, and a gallery section containing no photos. So every optional field
 * an editor can leave blank is emptied back to undefined on the way out, in
 * exactly one place.
 */

/** "" → undefined, so the components' `??` fallbacks actually fire. */
const text = (value: unknown): string | undefined => {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed.length ? trimmed : undefined;
};

/** [] → undefined, for the lists whose absence means "skip this section". */
const list = <T,>(value: T[] | undefined): T[] | undefined =>
  value?.length ? value : undefined;

/**
 * One stored record in the shape the public components expect.
 *
 * `id` comes from Mongo for a CMS record and from the slug otherwise, so React
 * keys stay stable across renders either way.
 */
function normalize(id: string, record: FestivalRecord): FestivalPageData {
  const seoTitle = text(record.seo?.title);
  const seoDescription = text(record.seo?.description);

  return {
    id,
    slug: record.slug,
    name: record.name,
    // The card and the breadcrumb both print shortName; falling back to the
    // full name keeps them readable rather than blank when it is unset.
    shortName: text(record.shortName) ?? record.name,
    status: record.status,
    kind: record.kind,
    season: record.season,
    destinationSlug: record.destinationSlug,

    summary: record.summary,
    image: record.image,
    imageAlt: record.imageAlt,
    quickAnswer: record.quickAnswer,

    dates: {
      window: record.dates?.window ?? "",
      short: record.dates?.short ?? "",
      duration: record.dates?.duration ?? "",
      // "" would satisfy the Event gate's `!start` check and emit a startDate
      // of empty string, so these are emptied like every other optional field.
      start: text(record.dates?.start),
      end: text(record.dates?.end),
    },
    datesVerified: Boolean(record.datesVerified),

    venue: record.venue,
    location: record.location,
    entry: record.entry,
    facts: list((record.facts ?? []).filter((fact) => fact.label)),

    intro: text(record.intro),
    highlights: (record.highlights ?? []).filter(Boolean),

    // Both halves matter for a row to be worth rendering: a step with a title
    // and no body is a numbered heading pointing at nothing.
    attend: list(
      (record.attend ?? []).filter((step) => step.title || step.body),
    ),
    history: list(
      (record.history ?? []).filter((block) => block.title || block.body),
    ),
    gallery: list((record.gallery ?? []).filter((photo) => photo.image)),
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
 * The static hub record joined to its detail payload, in CMS shape. Also the
 * seeder's input — one conversion, so a seeded record and a fallback record are
 * identical.
 */
export function staticFestivalToPage(festival: StaticFestival): FestivalPageData {
  const detail = getFestivalDetail(festival.slug);

  return normalize(festival.slug, {
    ...festival,
    // The static files predate the CMS and have no publish state. Everything in
    // them is already live on the site, so they backfill as published.
    status: "published",
    facts: detail?.facts,
    intro: detail?.intro,
    // The detail payload's richer list wins; the hub's bullets are the fallback
    // for a festival whose long-form copy has not been written yet.
    highlights: detail?.whatHappens ?? festival.highlights,
    attend: detail?.attend,
    history: detail?.history,
    gallery: detail?.gallery,
    sartajTips: detail?.sartajTips,
    faqs: detail?.faqs,
  });
}

/** A lean document, as a plain record plus its Mongo id. */
type LeanFestival = FestivalRecord & { _id: unknown };

const fromMongo = (record: LeanFestival): FestivalPageData =>
  // `.lean()` still hands back ObjectId and Date instances, which a Server
  // Component cannot pass to a Client Component. Round-tripping through JSON
  // flattens them to plain strings — same approach as the activity page.
  normalize(
    String(record._id),
    JSON.parse(JSON.stringify(record)) as FestivalRecord,
  );

/**
 * One festival, CMS first.
 *
 * Returns undefined when neither source has the slug, which is what makes the
 * page 404 — a half-empty templated page would be worse than none (SOP: no
 * thin pages).
 */
export async function getFestivalPage(
  slug: string,
): Promise<FestivalPageData | undefined> {
  try {
    await connectDB();
    const record = await FestivalModel.findOne({
      slug,
      status: "published",
    }).lean<LeanFestival>();

    if (record) return fromMongo(record);
  } catch {
    // A database that is down should degrade to the static copy rather than
    // take the page with it.
  }

  const staticRecord = FESTIVALS.find((festival) => festival.slug === slug);
  return staticRecord ? staticFestivalToPage(staticRecord) : undefined;
}

/**
 * Every published festival — CMS records first, then any static slug not yet
 * migrated. Feeds the hub grid, the calendar and the detail page's sibling rail.
 *
 * CMS records win on a slug collision, so seeding a static festival and then
 * editing it in the admin shows the edit rather than the original.
 */
export async function getFestivalPages(): Promise<FestivalPageData[]> {
  let cmsRecords: FestivalPageData[] = [];

  try {
    await connectDB();
    const records = await FestivalModel.find({ status: "published" })
      .sort({ createdAt: -1 })
      .lean<LeanFestival[]>();

    cmsRecords = records.map(fromMongo);
  } catch {
    // Mongo outage — the hub still renders whatever the static files know.
  }

  const seen = new Set(cmsRecords.map((festival) => festival.slug));
  const staticRecords = FESTIVALS.filter(
    (festival) => !seen.has(festival.slug),
  ).map(staticFestivalToPage);

  return [...cmsRecords, ...staticRecords];
}

/**
 * Every slug worth prerendering. Slugs added to the CMS after a build still
 * render on demand, since the route leaves `dynamicParams` at its default.
 */
export async function getFestivalPageSlugs(): Promise<string[]> {
  const slugs = new Set(FESTIVALS.map((festival) => festival.slug));

  try {
    await connectDB();
    const records = await FestivalModel.find({ status: "published" })
      .select("slug")
      .lean<{ slug: string }[]>();

    for (const record of records) slugs.add(record.slug);
  } catch {
    // Build-time Mongo outage — prerender what the static files know about.
  }

  return [...slugs];
}

/**
 * Sibling festivals for a detail page — same season first, since a reader whose
 * dates are fixed wants to know what else falls in their window, then anything
 * else so the rail is always full even for a season with one festival in it.
 */
export function rankRelatedFestivals(
  festival: Festival,
  pool: FestivalPageData[],
  limit = 3,
): FestivalPageData[] {
  const others = pool.filter((item) => item.slug !== festival.slug);

  return [
    ...others.filter((item) => item.season === festival.season),
    ...others.filter((item) => item.season !== festival.season),
  ].slice(0, limit);
}

/**
 * The detail page's photo grid, as the lightbox's GalleryImage shape.
 *
 * `alt` doubles as the caption: the CMS stores {image, alt} so the admin can
 * reuse the existing image editor, and while the photography is placeholder a
 * caption naming a festival the photo may not show is exactly the failure
 * src/data/festivals.ts warns about.
 *
 * Falls back to the shared festival reel, so the section renders for a record
 * with no photos of its own rather than disappearing.
 */
export function galleryFor(festival: Festival): GalleryImage[] {
  if (!festival.gallery?.length) return FESTIVAL_GALLERY.slice(0, 6);

  return festival.gallery.map((photo) => ({
    id: photo.id,
    url: photo.image,
    caption: photo.alt,
    alt: photo.alt,
  }));
}
