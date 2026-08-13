/**
 * Classifies a /stays/[slug] segment by intent.
 *
 * The route serves three page types under one namespace:
 *
 *   type  → "houseboats", "hotels", "resorts", "homestays"  (fixed set of 4)
 *   place → "srinagar-stays", "dal-lake-stays"              (any "<place>-stays")
 *   stay  → anything else                                    (one property)
 *
 * Same contract as classifySlug() for packages: this is a pattern-based first
 * pass, and the dispatcher still verifies each guess against the data and falls
 * through to a property lookup. So a property whose slug happens to end in
 * "-stays" is never lost — it just costs one extra miss on the way down.
 */

import { STAY_TYPES } from "@/data/stayTaxonomy";

export type StaySlugType = "type" | "place" | "stay";

export interface StaySlugClassification {
  type: StaySlugType;
  /** Normalised slug. */
  slug: string;
  /**
   * For "place", the place key with the "-stays" suffix stripped
   * ("srinagar-stays" → "srinagar"). Undefined for the other kinds.
   */
  placeKey?: string;
}

const PLACE_RE = /^([a-z0-9]+(?:-[a-z0-9]+)*)-stays$/;

const TYPE_SLUGS = new Set(STAY_TYPES.map((type) => type.slug));

export function classifyStaySlug(slug: string): StaySlugClassification {
  const s = slug.toLowerCase().trim();

  // Types are an exact, closed set — check them first so a future type can
  // never be shadowed by a property of the same name.
  if (TYPE_SLUGS.has(s)) return { type: "type", slug: s };

  const placeMatch = PLACE_RE.exec(s);
  if (placeMatch) return { type: "place", slug: s, placeKey: placeMatch[1] };

  return { type: "stay", slug: s };
}
