import { connectDB } from "@/lib/db";
import DestinationModel from "@/models/Destination";
import { DESTINATIONS, type Destination } from "@/data/destinations";
import type {
  DestinationPageData,
  IDestinationImage,
} from "@/types/destinationTypes";

/**
 * Read-through for /destinations/[slug].
 *
 * Mongo is the source of truth; src/data/destinations.ts backfills any slug
 * that has not been migrated yet, so the four existing pages keep rendering
 * through the move instead of 404ing one by one. Once every destination has a
 * published record, the static file and this fallback can go.
 *
 * The static shape is converted rather than mirrored: the CMS gives every
 * repeated row an `id` (the editor's React key) and every photo an `alt`,
 * neither of which the static file has. Generated ids are DERIVED FROM THE
 * SLUG, not random — a fresh uuid on each render would change the key on every
 * request and defeat the point.
 */

const DEFAULT_ZOOM = 12;

/** Deterministic row id, e.g. "gulmarg-hero-0". */
const rowId = (slug: string, group: string, index: number) =>
  `${slug}-${group}-${index}`;

/** Static photos are bare URLs; the CMS wants {id, image, alt}. */
const toImages = (
  slug: string,
  group: string,
  urls: string[] | undefined,
  alt: string,
): IDestinationImage[] =>
  (urls ?? []).map((url, i) => ({
    id: rowId(slug, group, i),
    image: url,
    // The static file has no alt for these, and inventing a description per
    // photo would be worse than reusing the one honest sentence we do have.
    alt,
  }));

/**
 * The static record, in CMS shape. Also the seeder's input — one conversion,
 * so a seeded record and a fallback record are identical.
 */
export function staticDestinationToPage(
  destination: Destination,
): DestinationPageData {
  const { slug, name } = destination;

  return {
    slug,
    name,
    status: "published",
    summary: destination.summary,
    fromSrinagar: destination.fromSrinagar ?? "",

    quickAnswer: destination.quickAnswer,
    idealDays: destination.idealDays,
    heroImages: destination.heroImages.map((photo, i) => ({
      id: rowId(slug, "hero", i),
      image: photo.src,
      alt: photo.alt,
    })),
    image: destination.image,
    imageAlt: destination.imageAlt,
    hoverImage: destination.hoverImage ?? "",

    altitude: destination.altitude,
    bestTime: destination.bestTime,
    famousFor: destination.famousFor,
    extraFacts: [],

    thingsToDo: (destination.thingsToDo ?? []).map((item, i) => ({
      id: rowId(slug, "thing", i),
      type: item.type,
      heading: item.heading,
      slug: item.slug ?? "",
      description: item.description ?? "",
      images: toImages(slug, `thing-${i}-img`, item.images, item.heading),
    })),

    howToReach: {
      overview: destination.howToReach?.overview ?? "",
      transportModes: (destination.howToReach?.transportModes ?? []).map(
        (mode, i) => ({
          id: rowId(slug, "mode", i),
          mode: mode.mode,
          nearestTerminal: mode.nearestTerminal,
          distance: mode.distance,
          description: mode.description,
          commonRoutes: mode.commonRoutes.map((route, j) => ({
            id: rowId(slug, `mode-${i}-route`, j),
            origin: route.origin,
            duration: route.duration,
            details: route.details,
          })),
        }),
      ),
    },

    cabFares: (destination.cabFares ?? []).map((fare, i) => ({
      id: rowId(slug, "fare", i),
      slug: fare.slug,
      price: fare.price,
      note: fare.note ?? "",
    })),

    staySlugs: destination.staySlugs ?? [],

    bestTimeTable: {
      overview: destination.bestTimeTable?.overview ?? "",
      months: (destination.bestTimeTable?.months ?? []).map((month, i) => ({
        id: rowId(slug, "month", i),
        month: month.month,
        rating: month.rating,
        note: month.note,
      })),
    },

    galleryImages: toImages(
      slug,
      "gallery",
      destination.galleryImages,
      destination.imageAlt,
    ),

    tipsIntro:
      "The things worth knowing before you go — the sort that only come from having been there in every season.",
    sartajTips: (destination.sartajTips ?? []).map((tip, i) => ({
      id: rowId(slug, "tip", i),
      // The static tips are single paragraphs with no headline. Rather than
      // invent one, the card falls back to numbering when `title` is empty.
      title: "",
      tip,
    })),

    map: {
      lat: destination.map?.lat ?? 0,
      lng: destination.map?.lng ?? 0,
      zoom: destination.map?.zoom ?? DEFAULT_ZOOM,
      embedUrl: destination.map?.embedUrl ?? "",
      blurb: destination.map?.blurb ?? "",
      landmarks: (destination.map?.landmarks ?? []).map((landmark, i) => ({
        id: rowId(slug, "landmark", i),
        name: landmark.name,
        detail: landmark.detail,
      })),
    },

    faqs: (destination.faqs ?? []).map((faq) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    })),

    metaTitle: `${name} Kashmir | Best Time, Things To Do & Packages`,
    metaDescription: destination.quickAnswer,
    schemaTitle: name,
    schemaDescription: destination.quickAnswer,
  };
}

/**
 * One destination, CMS first.
 *
 * Returns undefined when neither source has the slug, which is what makes the
 * page 404 — a half-empty templated page would be worse than none (SOP: no
 * thin pages).
 */
export async function getDestinationPage(
  slug: string,
): Promise<DestinationPageData | undefined> {
  try {
    await connectDB();
    const record = await DestinationModel.findOne({
      slug,
      status: "published",
    }).lean<DestinationPageData>();

    // `.lean()` still hands back ObjectId and Date instances, which a Server
    // Component cannot pass to a Client Component. Round-tripping through JSON
    // flattens them to plain strings — same approach as the package and temple
    // pages.
    if (record) return JSON.parse(JSON.stringify(record)) as DestinationPageData;
  } catch {
    // A database that is down should degrade to the static copy rather than
    // take the page with it.
  }

  const staticRecord = DESTINATIONS.find(
    (destination) => destination.slug === slug,
  );

  return staticRecord ? staticDestinationToPage(staticRecord) : undefined;
}

/**
 * Every slug worth prerendering — CMS records plus static ones not yet
 * migrated, deduplicated. Slugs added to the CMS after a build still render on
 * demand, since the route leaves `dynamicParams` at its default.
 */
export async function getDestinationPageSlugs(): Promise<string[]> {
  const slugs = new Set(DESTINATIONS.map((destination) => destination.slug));

  try {
    await connectDB();
    const records = await DestinationModel.find({ status: "published" })
      .select("slug")
      .lean<{ slug: string }[]>();

    for (const record of records) slugs.add(record.slug);
  } catch {
    // Build-time Mongo outage — prerender what the static file knows about.
  }

  return [...slugs];
}
