import { Document } from "mongoose";

/**
 * CMS data structure for a FESTIVAL — /festivals/ and /festivals/[slug].
 *
 * ONE RECORD FEEDS BOTH PAGES. The hub (FestivalExplore → FestivalRail →
 * FestivalCard, plus FestivalCalendar) reads the first block of fields; the
 * detail page reads all of them. They are one type rather than two because a
 * festival that appears on the hub must have a page to link to — a split would
 * let an editor publish a card pointing at a 404, which is the exact thing the
 * static data file's header forbids.
 *
 * Field order below is the order the detail page renders, so an editor working
 * top to bottom in the admin form is walking down the public page:
 *
 *   1. Identity & routing      — slug, name, kind, season, destination
 *   2. Card & hero             — summary, cover photo, answer block
 *   3. Dates                   — the window, and the verification gate
 *   4. At a glance             — venue, location, entry, extra rows
 *   5. What happens            — intro prose + the highlight list
 *   6. How to attend           — the numbered steps
 *   7. History / significance  — titled prose blocks
 *   8. Gallery                 — the detail page's photo grid
 *   9. Sartaj's tips           — the information-gain payload
 *  10. FAQs                    — emitted verbatim as FAQPage
 *  11. SEO
 *
 * These types used to live in src/data/festivals.ts and
 * src/data/festivalDetails.ts, which are now only the static fallback and
 * re-export from here. The public components are typed against `Festival`, so
 * a record from Mongo and a record from the static files are interchangeable at
 * render time — see src/lib/festivalPage.ts.
 *
 * EVERY DETAIL-PAGE FIELD IS OPTIONAL, on purpose. Each section renders only
 * when its data exists, so a record an editor has half filled still produces a
 * valid page rather than an empty heading or a crash. Only the fields the CARD
 * cannot render without are required. Treat that as the contract: nothing here
 * may become required without checking what the page does with it missing.
 *
 * Every repeated row carries an `id` — the admin editor's React key, which is
 * what survives reordering and deletion, and the reason none of these lists are
 * bare strings.
 */

/* -------------------------------------------------------------------------- */
/* Classification                                                             */
/* -------------------------------------------------------------------------- */

/**
 * What kind of occasion this is.
 *
 * Drives the hub's filter chips and, more importantly, the TONE of the page: a
 * `pilgrimage` page is a logistics document (registration, route, fitness)
 * while a `bloom` page is a timing document (when to come, how long it lasts).
 * Getting this wrong produces a page that answers the wrong question.
 */
export const FESTIVAL_KIND_IDS = [
  "bloom", // Tulip, Saffron — a natural window, called by the season
  "pilgrimage", // Amarnath, Kheer Bhawani — darshan, registration, route
  "cultural", // Shikara Festival, Sufi urs — organised, ticketed or public
  "sport", // Gulmarg Winter Festival
  "religious", // Eid, Navroz — observed valley-wide, not an "event" to attend
] as const;

export type FestivalKind = (typeof FESTIVAL_KIND_IDS)[number];

/**
 * Roughly when it falls, as a season label.
 *
 * Deliberately coarse. The precise window lives in `dates.window` as prose, and
 * exact dates only exist once verified — this field is for grouping and for the
 * "what's on when I'm visiting" question, nothing more.
 */
export const FESTIVAL_SEASON_IDS = [
  "winter",
  "spring",
  "summer",
  "autumn",
  "moves",
] as const;

export type FestivalSeason = (typeof FESTIVAL_SEASON_IDS)[number];

/* -------------------------------------------------------------------------- */
/* Dates                                                                       */
/* -------------------------------------------------------------------------- */

export type FestivalDates = {
  /**
   * The typical window, in prose, e.g. "Late March to mid April".
   *
   * ALWAYS safe to render — it describes a pattern, not a promise. This is what
   * the pages show while `datesVerified` is false, which today is all of them.
   */
  window: string;
  /**
   * The same window compressed to a card chip, e.g. "Mar–Apr".
   *
   * Authored, not derived from `window`: a few of these do not compress to
   * months at all ("Moves yearly"), and a regex that turned "May or June, on
   * Jyeshtha Ashtami" into something sensible would be worse than typing it.
   */
  short: string;
  /**
   * Confirmed ISO start/end for the current year, once they are signed off.
   *
   * Absent by default. Only a festival with BOTH a `start` AND
   * `datesVerified: true` may emit Event schema — see `datesVerified`.
   */
  start?: string;
  end?: string;
  /** How long it runs, in prose, e.g. "About 3 weeks". */
  duration: string;
};

/* -------------------------------------------------------------------------- */
/* Repeated rows                                                               */
/* -------------------------------------------------------------------------- */

/**
 * One gallery photo.
 *
 * `{id, image, alt}` rather than the public GalleryImage `{id, url, caption}`
 * shape, so the admin can reuse DestinationImagesEditor and its uploader
 * unchanged. The read-through maps one to the other, using `alt` as the caption
 * — which is right while the photography is placeholder anyway: a caption
 * naming a festival the photo may not show is the failure the data file warns
 * about.
 */
export type FestivalPhoto = { id: string; image: string; alt: string };

/** One extra at-a-glance row, beyond the four every festival has. */
export type FestivalFact = { id: string; label: string; value: string };

/**
 * One numbered step in "how to attend".
 *
 * `{id, title, body}` — deliberately the same shape as ActivityStep, so the
 * admin reuses ActivityStepsEditor for this AND for the history blocks below
 * rather than shipping two near-identical editors.
 */
export type FestivalAttendStep = { id: string; title: string; body: string };

/** One titled prose block in the history / significance section. */
export type FestivalHistoryBlock = { id: string; title: string; body: string };

/** One page-level FAQ. Answers are plain text — emitted verbatim as schema. */
export type FestivalFaq = { id: string; question: string; answer: string };

/* -------------------------------------------------------------------------- */
/* The record                                                                  */
/* -------------------------------------------------------------------------- */

export type Festival = {
  /** Stable key — the Mongo _id for a CMS record, the slug for a static one. */
  id: string;

  /* 1. Identity & routing */

  /** URL slug — /festivals/[slug]. */
  slug: string;
  /** H1-grade name, e.g. "Tulip Festival, Srinagar". */
  name: string;
  /** Short label for chips, cards and table cells, e.g. "Tulip Festival". */
  shortName: string;
  kind: FestivalKind;
  season: FestivalSeason;
  /**
   * SOP B3 "INTO destination" link — the hub this festival routes into. A slug,
   * never a copy: the live Destination record supplies the name at render time.
   */
  destinationSlug: string;

  /* 2. Card & hero */

  /** Card copy — what the festival is, in one line. */
  summary: string;
  /** Hero and card photography. */
  image: string;
  /** Describes THIS photo, not the festival. */
  imageAlt: string;
  /**
   * SOP §2.6 answer-first block, 40–60 words. Answers "what is this, when is
   * it, and should I plan around it" before anything else on the page, and is
   * the meta description when the SEO override is empty.
   */
  quickAnswer: string;

  /* 3. Dates */

  dates: FestivalDates;
  /**
   * TRUE ONLY WHEN THIS YEAR'S DATES ARE CONFIRMED ON THE GROUND.
   *
   * THE GATE THAT MATTERS. schema.org Event requires a startDate, and a wrong
   * startDate is a wrong date shown in Google — strictly worse than no rich
   * result. This flag drives BOTH the Event JSON-LD and the visible "typical
   * window" caveat in the hero, the glance table and the plan card, so what the
   * reader sees can never disagree with what the crawler is told.
   *
   * Six of the eight festivals move every year — the tulip bloom is called by
   * the garden weeks out, Amarnath's dates are set by the Shrine Board, and the
   * lunar observances shift ~11 days earlier annually. Default false, and it
   * stays false until someone has actually checked.
   */
  datesVerified: boolean;

  /* 4. At a glance */

  /** Where it happens, e.g. "Indira Gandhi Memorial Tulip Garden". */
  venue: string;
  /** The town it sits in — used for the "nearest hub" line and Place schema. */
  location: string;
  /** Entry cost in prose, or "Free". Never a bare number — some are per-head. */
  entry: string;
  /** Extra at-a-glance rows: "Registration", "Dress code", "Best time of day". */
  facts?: FestivalFact[];

  /* 5. What happens */

  /** Opening prose under the answer block — what the occasion actually is. */
  intro?: string;
  /**
   * What happens on the ground, as discrete moments a reader can picture.
   * Doubles as the card's bullet list on the hub, so it is never empty in
   * practice even for a festival with no detail copy yet.
   */
  highlights: string[];

  /* 6–9. Detail sections */

  attend?: FestivalAttendStep[];
  history?: FestivalHistoryBlock[];
  /**
   * The detail page's photo grid. Falls back to the shared festival reel when
   * empty, so a record with no photos of its own still renders the section.
   */
  gallery?: FestivalPhoto[];
  /**
   * On-ground truths (SOP A4/A8 information gain) — the part a reader cannot
   * get from an aggregator, and the reason this page can outrank one. Each
   * entry should be specific and checkable; "go early" is not a tip.
   */
  sartajTips?: string[];

  /* 10–11. FAQs & SEO */

  /**
   * Page-level FAQs. Scope to THIS festival — hub-level questions live in
   * src/data/festivalFaqs.ts and the two must not compete for the same queries.
   */
  faqs?: FestivalFaq[];
  /** Overrides for the <title> and meta description. Both fall back. */
  seo?: { title?: string; description?: string };
};

export type FestivalStatus = "draft" | "published";

/**
 * One festival as the public pages receive it — a Festival plus the publish
 * state, whether it came from Mongo or from the static fallback.
 */
export interface FestivalPageData extends Festival {
  status: FestivalStatus;
}

/**
 * What the collection stores. `id` is omitted because Mongo owns identity — the
 * read-through fills `FestivalPageData.id` from `_id`, so the public components
 * keep a stable key either way.
 */
export type FestivalRecord = Omit<FestivalPageData, "id">;

export interface IFestival extends FestivalRecord, Document {
  createdAt: Date;
  updatedAt: Date;
}

/* -------------------------------------------------------------------------- */
/* Labels                                                                      */
/* -------------------------------------------------------------------------- */

/** Hub filter chips. Order is the order they render in. */
export const FESTIVAL_KINDS: { id: FestivalKind; label: string }[] = [
  { id: "bloom", label: "Blooms & harvests" },
  { id: "pilgrimage", label: "Pilgrimages" },
  { id: "cultural", label: "Cultural" },
  { id: "sport", label: "Winter sport" },
  { id: "religious", label: "Religious" },
];

/** Season labels, for grouping and the "what's on when I visit" question. */
export const FESTIVAL_SEASONS: { id: FestivalSeason; label: string }[] = [
  { id: "winter", label: "Winter" },
  { id: "spring", label: "Spring" },
  { id: "summer", label: "Summer" },
  { id: "autumn", label: "Autumn" },
  { id: "moves", label: "Moves yearly" },
];
