import { connectDB } from "@/lib/db";
import Taxi from "@/models/Taxi";
import type { IDestinationCabFare } from "@/types/destinationTypes";

/** A fare row resolved against the Taxi record it points at. */
export type ResolvedCabFare = {
  slug: string;
  title: string;
  cabType?: string;
  seats?: number;
  image?: string;
  alt?: string;
  /** Route price if the destination set one, else the vehicle's base price. */
  price?: number;
  /** True when `price` is the generic base rate, not a route-specific fare. */
  isBaseRate: boolean;
  note?: string;
};

/**
 * Builds the cab fare table for a destination.
 *
 * With `cabFares` set, rows follow the authored order and drop any slug that
 * no longer resolves to a published vehicle, so the table never links into a
 * 404. With it unset the whole published fleet is listed at base rate — that
 * is the honest default, since a missing route price is not a reason to hide
 * the vehicle, only a reason to label the figure as a starting rate.
 */
export async function resolveCabFares(
  fares: IDestinationCabFare[] | undefined,
): Promise<ResolvedCabFare[]> {
  await connectDB();

  const projection = "slug title cabType seats image alt basePrice";

  if (!fares || fares.length === 0) {
    const fleet = await Taxi.find({ status: "published" })
      .select(projection)
      .sort({ basePrice: 1 })
      .lean();

    return fleet.map((cab) => ({
      slug: cab.slug,
      title: cab.title,
      cabType: cab.cabType,
      seats: cab.seats,
      image: cab.image,
      alt: cab.alt,
      price: cab.basePrice,
      isBaseRate: true,
    }));
  }

  const records = await Taxi.find({
    slug: { $in: fares.map((fare) => fare.slug) },
    status: "published",
  })
    .select(projection)
    .lean();

  const bySlug = new Map(records.map((cab) => [cab.slug, cab]));

  return fares.flatMap((fare) => {
    const cab = bySlug.get(fare.slug);
    if (!cab) return [];

    return [
      {
        slug: cab.slug,
        title: cab.title,
        cabType: cab.cabType,
        seats: cab.seats,
        image: cab.image,
        alt: cab.alt,
        price: fare.price ?? cab.basePrice,
        isBaseRate: fare.price === undefined,
        note: fare.note,
      },
    ];
  });
}
