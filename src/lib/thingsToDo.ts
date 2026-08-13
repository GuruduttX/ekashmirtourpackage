import { connectDB } from "@/lib/db";
import Temple from "@/models/Temple";
import StayModel from "@/models/Stay";
import { getStayBySlug } from "@/data/stays";
import type { IThingToDo, ThingToDoType } from "@/types/destinationTypes";

/** One card slide. `id` is the carousel key, so it must be unique per card. */
export type ThingToDoPhoto = {
  id: string;
  image: string;
  alt: string;
};

/** A "thing to do" item, resolved to whatever a card actually needs to render. */
export type ResolvedThingToDo = {
  type: ThingToDoType;
  heading: string;
  description?: string;
  /**
   * Lead photo first, then the record's own gallery — the card pages through
   * these. Empty when the source has no usable photo, which the card draws as
   * a tinted placeholder rather than a broken image.
   */
  images: ThingToDoPhoto[];
  /** Present only when the item links to a real internal page. */
  href?: string;
};

/**
 * Lead photo first, then gallery, minus blanks and repeats.
 *
 * The lead is usually also the gallery's first entry, and a carousel that
 * shows the same photo twice in a row reads as broken rather than as two
 * photos.
 */
const buildSlides = (
  keyPrefix: string,
  lead: { image?: string; alt?: string } | undefined,
  gallery: { image?: string; alt?: string }[],
  fallbackAlt: string,
): ThingToDoPhoto[] => {
  const seen = new Set<string>();

  return [lead, ...gallery].flatMap((photo, i) => {
    const url = photo?.image?.trim();
    if (!url || seen.has(url)) return [];
    seen.add(url);

    return [
      {
        id: `${keyPrefix}-${i}`,
        image: url,
        alt: photo?.alt?.trim() || fallbackAlt,
      },
    ];
  });
};

/**
 * Resolves each destination's `thingsToDo` entries against their source of
 * truth — the Temple collection for "temple", the Stay collection (with the
 * static file backfilling un-migrated slugs, exactly as
 * src/lib/destinationStays.ts does) for "stay" — so the destination page
 * always shows the live title and photo for that record, not a copy that can
 * drift. "activity"/"other" pass through as authored.
 *
 * Entries whose slug no longer resolves (temple unpublished/renamed, stay
 * removed) are dropped rather than rendered as a dead link.
 */
export async function resolveThingsToDo(
  items: IThingToDo[] | undefined,
): Promise<ResolvedThingToDo[]> {
  if (!items || items.length === 0) return [];

  const resolved = await Promise.all(
    items.map(async (item): Promise<ResolvedThingToDo | null> => {
      switch (item.type) {
        case "stay": {
          if (!item.slug) return null;
          await connectDB();

          const cmsStay = await StayModel.findOne({
            slug: item.slug,
            status: "published",
          })
            .select("slug title quickAnswer heroImage gallery")
            .lean();

          if (cmsStay) {
            return {
              type: "stay",
              heading: item.heading,
              description: cmsStay.quickAnswer,
              images: buildSlides(
                item.id,
                cmsStay.heroImage,
                cmsStay.gallery ?? [],
                item.heading,
              ),
              href: `/stays/${cmsStay.slug}`,
            };
          }

          const stay = getStayBySlug(item.slug);
          if (!stay) return null;
          return {
            type: "stay",
            heading: item.heading,
            description: stay.cardSummary,
            images: buildSlides(
              item.id,
              { image: stay.image, alt: stay.alt },
              stay.gallery ?? [],
              item.heading,
            ),
            href: `/stays/${stay.slug}`,
          };
        }

        case "temple": {
          if (!item.slug) return null;
          await connectDB();
          const temple = await Temple.findOne({
            slug: item.slug,
            status: "published",
          }).lean();
          if (!temple) return null;
          return {
            type: "temple",
            heading: item.heading,
            description: temple.overview,
            images: buildSlides(
              item.id,
              { image: temple.image, alt: temple.alt },
              temple.galleryImages ?? [],
              item.heading,
            ),
            href: `/temples/${temple.slug}`,
          };
        }

        case "activity":
        case "other":
        default:
          return {
            type: item.type,
            heading: item.heading,
            description: item.description,
            images: buildSlides(item.id, undefined, item.images ?? [], item.heading),
          };
      }
    }),
  );

  return resolved.filter((entry): entry is ResolvedThingToDo => entry !== null);
}
