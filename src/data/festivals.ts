/**
 * SOP A6 — FESTIVALS & EVENTS [HUB].
 *
 * Single source of truth for what /festivals/ lists. Same contract as
 * src/data/destinations.ts and src/data/experiences.ts: a festival belongs here
 * only when it will have a real /festivals/[slug]/ page, so the hub's ItemList
 * never points at a 404. This file becomes the CMS read-through when festivals
 * move to Mongo — see the internal-link-types roadmap, and
 * src/lib/experienceActivityPage.ts for the read-through shape to copy.
 *
 * The eight entries below are exactly the SOP A6 cluster: Tulip Festival ·
 * Amarnath Yatra · Gulmarg Winter Festival · Saffron Festival · Shikara
 * Festival · Kheer Bhawani Mela · Eid & Navroz · Sufi festivals.
 *
 * DATA-HONESTY (SOP, non-negotiable) — READ BEFORE TOUCHING `dates`:
 * Every festival window below is the TYPICAL window, not an announced date.
 * Six of these eight move every year: the tulip bloom is called by the garden
 * weeks out, Amarnath's yatra dates are set by the Shrine Board annually, and
 * the four Islamic observances follow the lunar calendar and shift ~11 days
 * earlier each year. That is why every entry carries `datesVerified: false` and
 * why NO Event schema is emitted anywhere from this data.
 *
 * SOP §2.6 and the schema appendix both say Event{startDate, endDate} with REAL
 * DATES ONLY. Event markup with a guessed startDate is a wrong-date rich result
 * in Google — worse than no rich result. When Sartaj confirms a year's dates,
 * set `dates.start` / `dates.end` as ISO dates and flip `datesVerified` to true;
 * the individual festival page emits Event only for those. Until then the pages
 * state the window in prose, which is honest and still perfectly citable.
 */

import type { Festival } from "@/types/festivalTypes";

export type {
  Festival,
  FestivalDates,
  FestivalKind,
  FestivalSeason,
  FestivalFaq,
} from "@/types/festivalTypes";
export { FESTIVAL_KINDS, FESTIVAL_SEASONS } from "@/types/festivalTypes";

/**
 * Card / hero photography. PLACEHOLDER stock, using the same helper pattern as
 * src/data/experiences.ts so the two files stay swappable. Replace with local
 * files under public/festivals/ when real on-ground photos land.
 */
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=80`;

/**
 * One festival as this file authors it — every hub field, and none of the
 * detail-page ones.
 *
 * `id` is omitted because Mongo owns identity for a CMS record and the
 * read-through fills it from the slug for a static one. The long-form sections
 * live in src/data/festivalDetails.ts, keyed by the same slug, and
 * src/lib/festivalPage.ts is what joins the two into a Festival.
 */
export type StaticFestival = Omit<
  Festival,
  | "id"
  | "facts"
  | "intro"
  | "attend"
  | "history"
  | "gallery"
  | "sartajTips"
  | "faqs"
  | "seo"
>;

export const FESTIVALS: StaticFestival[] = [
  {
    slug: "tulip-festival",
    name: "Tulip Festival, Srinagar",
    shortName: "Tulip Festival",
    kind: "bloom",
    season: "spring",
    summary:
      "Asia's largest tulip garden opens for roughly three weeks each spring, with over a million bulbs flowering below the Zabarwan hills.",
    quickAnswer:
      "The Tulip Festival runs at the Indira Gandhi Memorial Tulip Garden in Srinagar for about three weeks from late March into mid April, though the garden announces the opening only once the bloom actually starts. It is Kashmir's single biggest annual visitor spike — book stays and cabs well before you travel.",
    dates: {
      window: "Late March to mid April",
      short: "Mar–Apr",
      duration: "About 3 weeks",
    },
    datesVerified: false,
    venue: "Indira Gandhi Memorial Tulip Garden",
    location: "Srinagar",
    destinationSlug: "srinagar",
    entry: "Ticketed — a small per-head entry fee",
    highlights: [
      "Over a million tulips across terraced beds",
      "Dal Lake and the Zabarwan range as the backdrop",
      "Almond and cherry blossom in the same fortnight",
    ],
    image: img("1522383225653-ed111181a951"),
    imageAlt:
      "Terraced beds of red and yellow tulips with hills rising behind them",
  },
  {
    slug: "amarnath-yatra",
    name: "Amarnath Yatra",
    shortName: "Amarnath Yatra",
    kind: "pilgrimage",
    season: "summer",
    summary:
      "The annual pilgrimage to the ice lingam at Amarnath cave, on foot from either Pahalgam or Baltal, across roughly two months of high summer.",
    quickAnswer:
      "The Amarnath Yatra runs for about two months across July and August, with dates set by the Shri Amarnathji Shrine Board each year. Registration and a medical certificate are compulsory. Two routes reach the cave: Baltal is the short, steep one; Pahalgam is the traditional multi-day walk.",
    dates: {
      window: "July to August",
      short: "Jul–Aug",
      duration: "About 2 months",
    },
    datesVerified: false,
    venue: "Amarnath cave, via the Baltal or Pahalgam routes",
    location: "Anantnag / Ganderbal",
    destinationSlug: "pahalgam",
    entry: "Free darshan — compulsory advance registration",
    highlights: [
      "Two routes: Baltal (short, steep) or Pahalgam (traditional)",
      "Registration plus a medical certificate are mandatory",
      "Helicopter services on both routes in most years",
    ],
    image: img("1600100397608-f010b8dfa2b0"),
    imageAlt: "Pilgrims walking a stone mountain trail below snow-streaked peaks",
  },
  {
    slug: "gulmarg-winter-festival",
    name: "Gulmarg Winter Festival",
    shortName: "Gulmarg Winter Festival",
    kind: "sport",
    season: "winter",
    summary:
      "A few days of skiing and snowboarding events, snow sculpture and live music on the Gulmarg slopes at the height of the season.",
    quickAnswer:
      "The Gulmarg Winter Festival is a short winter-sports carnival held on the Gulmarg slopes, usually across a few days between late December and February once the snow base is deep enough. It layers races, snow sculpture and music over what is already the best skiing window of the year.",
    dates: {
      window: "Late December to February",
      short: "Dec–Feb",
      duration: "About 3 to 5 days",
    },
    datesVerified: false,
    venue: "Gulmarg ski slopes and the Gondola base",
    location: "Gulmarg",
    destinationSlug: "gulmarg",
    entry: "Free to watch — events and gear are charged separately",
    highlights: [
      "Ski and snowboard races on the main slopes",
      "Snow sculpture and igloo building",
      "Falls in the deepest-snow window of the season",
    ],
    image: img("1551524559-8af4e6624178"),
    imageAlt: "Skiers on a wide snow slope with pine forest along the edge",
  },
  {
    slug: "saffron-festival",
    name: "Saffron Festival, Pampore",
    shortName: "Saffron Festival",
    kind: "bloom",
    season: "autumn",
    summary:
      "The saffron fields of Pampore turn purple for a fortnight each autumn, and the harvest is marked with field visits and grading demonstrations.",
    quickAnswer:
      "Pampore's saffron crocus flowers for roughly two weeks between late October and mid November, and the harvest is marked with field walks and grading demonstrations. The bloom is short and weather-dependent — it is the one Kashmir window where arriving a week late means missing it entirely.",
    dates: {
      window: "Late October to mid November",
      short: "Oct–Nov",
      duration: "About 2 weeks",
    },
    datesVerified: false,
    venue: "Saffron fields around Pampore",
    location: "Pampore, near Srinagar",
    destinationSlug: "srinagar",
    entry: "Free to walk the fields",
    highlights: [
      "Purple crocus fields at first light",
      "Hand-picking and grading demonstrations",
      "Overlaps the Chinar autumn colour in Srinagar",
    ],
    image: img("1601472544287-3f3e0c4e1f3f"),
    imageAlt: "Purple crocus flowers across an open field at dawn",
  },
  {
    slug: "shikara-festival",
    name: "Shikara Festival, Dal Lake",
    shortName: "Shikara Festival",
    kind: "cultural",
    season: "summer",
    summary:
      "A lake carnival of shikara races, dragon-boat heats and a decorated-boat parade across Dal Lake, usually over a weekend in high summer.",
    quickAnswer:
      "The Shikara Festival is a two-day lake carnival on Dal Lake, typically held over a weekend in July or August. Shikara and dragon-boat races run through the day, ending in a parade of decorated boats. It is free to watch from the boulevard and needs no ticket or booking.",
    dates: {
      window: "July or August",
      short: "Jul–Aug",
      duration: "About 2 days",
    },
    datesVerified: false,
    venue: "Dal Lake, along the Boulevard",
    location: "Srinagar",
    destinationSlug: "srinagar",
    entry: "Free to watch from the Boulevard",
    highlights: [
      "Shikara and dragon-boat races",
      "Decorated-boat parade at the close",
      "Watchable free from the Boulevard footpath",
    ],
    image: img("1566837945700-30057527ade0"),
    imageAlt: "Wooden shikara boats with canopies moored on a still lake",
  },
  {
    slug: "kheer-bhawani-mela",
    name: "Kheer Bhawani Mela",
    shortName: "Kheer Bhawani Mela",
    kind: "pilgrimage",
    season: "spring",
    summary:
      "The Kashmiri Pandit community's largest annual gathering, held at the Ragnya Devi temple at Tulmulla on Jyeshtha Ashtami.",
    quickAnswer:
      "The Kheer Bhawani Mela is a single-day gathering at the Ragnya Devi temple in Tulmulla, about 27 km from Srinagar, held on Jyeshtha Ashtami — usually in May or June. Devotees offer kheer and milk at the sacred spring. Anyone may attend; dress modestly and expect heavy crowds.",
    dates: {
      window: "May or June, on Jyeshtha Ashtami",
      short: "May–Jun",
      duration: "1 day",
    },
    datesVerified: false,
    venue: "Mata Kheer Bhawani (Ragnya Devi) temple, Tulmulla",
    location: "Ganderbal",
    destinationSlug: "srinagar",
    entry: "Free — open to all visitors",
    highlights: [
      "Offerings of kheer and milk at the sacred spring",
      "The valley's largest Kashmiri Pandit gathering",
      "About 27 km from Srinagar, an easy half-day trip",
    ],
    image: img("1548013146-72479768bada"),
    imageAlt: "Stone temple courtyard with a spring pool at its centre",
  },
  {
    slug: "eid-and-navroz",
    name: "Eid & Navroz in Kashmir",
    shortName: "Eid & Navroz",
    kind: "religious",
    season: "moves",
    summary:
      "The valley's two biggest observances — Eid, twice a year on the lunar calendar, and Navroz, the Persian new year each March.",
    quickAnswer:
      "Eid is observed twice a year on the lunar calendar, so it shifts about eleven days earlier annually; Navroz falls around 20–21 March. Both are family occasions rather than spectacles — markets are packed beforehand and many shops shut on the day itself, which is worth planning a Kashmir itinerary around.",
    dates: {
      window: "Eid moves yearly; Navroz around 20–21 March",
      short: "Moves yearly",
      duration: "1 to 3 days each",
    },
    datesVerified: false,
    venue: "Valley-wide — Jamia Masjid and Hazratbal draw the largest crowds",
    location: "Across Kashmir",
    destinationSlug: "srinagar",
    entry: "Free — public observance",
    highlights: [
      "Dawn congregations at Hazratbal and Jamia Masjid",
      "Wazwan feasting in family homes",
      "Markets crowded before, many shops shut on the day",
    ],
    image: img("1519817650390-64a93db51149"),
    imageAlt: "Crowd gathered outside a white mosque with a tall minaret",
  },
  {
    slug: "sufi-festivals",
    name: "Sufi Festivals & Urs",
    shortName: "Sufi Festivals",
    kind: "cultural",
    season: "moves",
    summary:
      "The urs gatherings at Kashmir's Sufi shrines, marked with night-long devotional singing and some of the valley's oldest living music.",
    quickAnswer:
      "Each of Kashmir's major shrines — Charar-e-Sharief, Hazratbal, Makhdoom Sahib — marks its saint's urs with a gathering of devotional singing, often lasting through the night. Dates follow the Islamic calendar and move each year. Visitors are welcome at all of them; cover your head and dress modestly.",
    dates: {
      window: "Through the year, on the Islamic calendar",
      short: "Year-round",
      duration: "1 to 3 days each",
    },
    datesVerified: false,
    venue: "Charar-e-Sharief, Hazratbal and Makhdoom Sahib shrines",
    location: "Across Kashmir",
    destinationSlug: "srinagar",
    entry: "Free — visitors welcome",
    highlights: [
      "Night-long devotional singing at the shrines",
      "Sufiyana kalam, among the valley's oldest music",
      "Charar-e-Sharief is an easy day trip from Srinagar",
    ],
    image: img("1564769662533-4f00a87b4056"),
    imageAlt: "Wooden shrine facade lit warmly against an evening sky",
  },
];

/**
 * The static fallback list. src/lib/festivalPage.ts prefers Mongo and falls
 * back to these, so the hub keeps rendering through the migration.
 */
export function getAllFestivals(): StaticFestival[] {
  return FESTIVALS;
}

export function getFestivalBySlug(slug: string): StaticFestival | undefined {
  return FESTIVALS.find((festival) => festival.slug === slug);
}

export function getFestivalSlugs(): string[] {
  return FESTIVALS.map((festival) => festival.slug);
}
