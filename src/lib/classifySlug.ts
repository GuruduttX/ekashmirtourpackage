/**
 * Classifies a /kashmir-tour-packages/[slug] segment by intent.
 *
 * The hub route serves several slug types under one namespace. This is a
 * lightweight, pattern-based first pass — the dispatcher still verifies the
 * guess against the database and falls back gracefully.
 *
 *   city     → "from-delhi", "from-mumbai"           (origin-city hubs)
 *   duration → "6-days-5-nights", "2-days-1-night"    (duration hubs)
 *   theme    → "honeymoon-packages", "family-packages" (theme hubs)
 *   package  → anything else (an individual package slug)
 *
 * Each hub type has a distinct, unambiguous slug shape, so classification is
 * pure pattern-matching. The dispatcher still verifies the guess against the
 * database and falls through to a package lookup, so a package that happens to
 * match a hub pattern (e.g. ends in "-packages") is never lost.
 */
export type SlugType = 'city' | 'duration' | 'theme' | 'package';

export interface SlugClassification {
  type: SlugType;
  slug: string;
}

const CITY_RE = /^from-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DURATION_RE = /^\d+-days?-\d+-nights?$/;
const THEME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*-packages$/;

export function classifySlug(slug: string): SlugClassification {
  const s = slug.toLowerCase().trim();

  // Order matters: city/duration are checked before theme so a slug like
  // "from-delhi" is never mistaken for a "-packages" theme.
  if (CITY_RE.test(s)) return { type: 'city', slug: s };
  if (DURATION_RE.test(s)) return { type: 'duration', slug: s };
  if (THEME_RE.test(s)) return { type: 'theme', slug: s };

  return { type: 'package', slug: s };
}
