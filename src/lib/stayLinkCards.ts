import { unstable_cache } from "next/cache";
import type { Model } from "mongoose";
import { connectDB } from "@/lib/db";
import Package from "@/models/Package";
import Temple from "@/models/Temple";
import Taxi from "@/models/Taxi";
import Blog from "@/models/Blog";
import { STAY_PLACES } from "@/data/stayTaxonomy";
import type { StayPlaceLinkType } from "@/types/stayPlaceTypes";

/**
 * Resolves internal-link rows ({ type, slug }) into the title + image a card
 * needs.
 *
 * Shape of the problem: the CMS stores only a type and a slug, and each type
 * lives in a different collection. Resolving one link at a time would be an
 * N+1 on a page that is already `force-dynamic`, so instead the links are
 * grouped by type and each type is resolved with ONE `$in` query, all in
 * parallel — at most one query per type present on the page.
 *
 * Adapters are a registry on purpose. `destination`, `experience` and
 * `activity` are static today but are planned as Mongo-backed hubs; when that
 * lands, swap that one entry for `mongoAdapter(Model, "image")` and nothing
 * else in this file or the component changes.
 */

export type StayLinkCard = {
  /** Resolved page title — falls back to the CMS anchor text. */
  title?: string;
  image?: string;
};

/** Key into the resolved map. Type is part of it because slugs can collide. */
const keyOf = (type: string, slug: string) => `${type}:${slug}`;

type Adapter = (slugs: string[]) => Promise<Map<string, StayLinkCard>>;

/**
 * One query per collection: `slug $in [...]`, published only, projecting just
 * the two fields a card renders. `imagePath` is a dot path so Package's
 * `heroImage.image` works alongside the others' flat `image`.
 */
function mongoAdapter(
  // The models have divergent document types and only `slug` is read
  // generically, so the adapter is intentionally loose here.
  model: Model<any>,
  imagePath: string,
): Adapter {
  return async (slugs) => {
    await connectDB();

    const docs = await model
      .find({ slug: { $in: slugs }, status: "published" })
      .select(`slug title ${imagePath}`)
      .lean<Array<Record<string, any>>>();

    return new Map(
      docs.map((doc) => [
        doc.slug as string,
        {
          title: doc.title as string | undefined,
          image: imagePath
            .split(".")
            .reduce<any>((value, part) => value?.[part], doc) as string | undefined,
        },
      ]),
    );
  };
}

/** Place stays ("srinagar-stays") and stay types ("houseboats") are static. */
const stayTypeAdapter: Adapter = async (slugs) => {
  const resolved = new Map<string, StayLinkCard>();

  for (const slug of slugs) {
    const place = STAY_PLACES.find(
      (definition) => `${definition.slug}-stays` === slug || definition.slug === slug,
    );

    if (place) {
      resolved.set(slug, { title: place.name, image: place.image });
    }
  }

  return resolved;
};

/**
 * Not yet backed by a collection — cards render from the CMS anchor text and
 * description with an icon tile instead of a photo. Replace with
 * `mongoAdapter(...)` once these hubs exist.
 */
const notYetSourced: Adapter = async () => new Map();

const ADAPTERS: Record<StayPlaceLinkType, Adapter> = {
  package: mongoAdapter(Package, "heroImage.image"),
  temple: mongoAdapter(Temple, "image"),
  cab: mongoAdapter(Taxi, "image"),
  blog: mongoAdapter(Blog, "image"),
  stayType: stayTypeAdapter,
  destination: notYetSourced,
  experience: notYetSourced,
  activity: notYetSourced,
};

async function resolve(
  links: Array<{ type: StayPlaceLinkType; slug: string }>,
): Promise<Record<string, StayLinkCard>> {
  // Group first, so each collection is touched exactly once.
  const byType = new Map<StayPlaceLinkType, Set<string>>();

  for (const link of links) {
    const slug = link.slug.replace(/^\/+|\/+$/g, "");
    if (!slug) continue;
    if (!byType.has(link.type)) byType.set(link.type, new Set());
    byType.get(link.type)!.add(slug);
  }

  const results = await Promise.all(
    Array.from(byType.entries()).map(async ([type, slugs]) => {
      const adapter = ADAPTERS[type];
      if (!adapter) return [] as Array<[string, StayLinkCard]>;

      try {
        const resolved = await adapter(Array.from(slugs));
        return Array.from(resolved.entries()).map(
          ([slug, card]) => [keyOf(type, slug), card] as [string, StayLinkCard],
        );
      } catch (error) {
        // A card without a photo is fine; a 500 on a MONEY page is not.
        console.error(`[stayLinkCards] ${type} lookup failed`, error);
        return [] as Array<[string, StayLinkCard]>;
      }
    }),
  );

  return Object.fromEntries(results.flat());
}

/**
 * Cached wrapper. Link targets' titles and images change on the order of weeks
 * while a stay's price changes daily, so the resolver is cached rather than the
 * page — the page stays dynamic and only this lookup is reused.
 *
 * NOTE: `unstable_cache` is marked as replaced by the `use cache` directive in
 * Next 16. Migrating means enabling `cacheComponents` project-wide, so it is a
 * deliberate separate step; when it happens, only this function changes. A
 * plain object is returned (not a Map) because the cache serialises the result.
 */
export const getStayLinkCards = unstable_cache(
  resolve,
  ["stay-internal-link-cards"],
  { revalidate: 3600, tags: ["stay-link-cards"] },
);

export { keyOf as stayLinkCardKey };
