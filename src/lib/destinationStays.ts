import { connectDB } from "@/lib/db";
import StayModel from "@/models/Stay";
import { getStayBySlug } from "@/data/stays";
import type { StayCardData } from "@/components/stays/StayCard";

/**
 * Fetches the stays a destination's "Where to stay" section shows.
 *
 * Slug-list driven: a destination names the stays it wants, in the order it
 * wants them, and only those are fetched — one `$in` query rather than
 * loading the catalogue and filtering it down.
 *
 * Mongo (the CMS) is the source of truth; the static list in src/data/stays.ts
 * backfills slugs that have not been migrated yet, so the section keeps
 * working through the move instead of emptying out mid-way. Slugs that
 * resolve to neither are dropped, so a renamed or unpublished stay never
 * renders as a dead card.
 */
export async function getDestinationStays(
  staySlugs: string[] | undefined,
): Promise<StayCardData[]> {
  if (!staySlugs || staySlugs.length === 0) return [];

  await connectDB();

  const records = await StayModel.find({
    slug: { $in: staySlugs },
    status: "published",
  })
    .select("slug title area category sleeps priceFrom highlights gallery heroImage")
    .lean();

  const fromCms = new Map<string, StayCardData>(
    records.map((stay) => [
      stay.slug,
      {
        slug: stay.slug,
        title: stay.title,
        area: stay.area,
        category: stay.category,
        sleeps: stay.sleeps,
        priceFrom: stay.priceFrom,
        // The card wants plain strings; the CMS stores {id, label} rows.
        highlights: (stay.highlights ?? []).map(
          (highlight: { label: string }) => highlight.label,
        ),
        gallery: stay.gallery ?? [],
        image: stay.heroImage?.image ?? "",
        alt: stay.heroImage?.alt ?? stay.title,
      },
    ]),
  );

  return staySlugs.flatMap((slug) => {
    const cmsStay = fromCms.get(slug);
    if (cmsStay) return [cmsStay];

    const staticStay = getStayBySlug(slug);
    return staticStay ? [staticStay satisfies StayCardData] : [];
  });
}
