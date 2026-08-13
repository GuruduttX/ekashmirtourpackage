/**
 * SOP A6 — DESTINATIONS [HUB].
 *
 * Single source of truth for what the /destinations/ hub lists. Kept in step
 * with the `destinationMap` in src/app/destinations/[slug]/page.tsx on purpose:
 * only places with a real detail page belong here, so the hub's ItemList never
 * points at a 404.
 *
 * The full SOP A2 cluster (Dal Lake · Betaab · Aru · Yusmarg · Doodhpathri ·
 * Gurez · Dachigam · Wular · Mughal Gardens) lands as those pages get built,
 * and this file becomes the CMS read-through when destinations move to Mongo.
 */

// Reuses the hub FAQ shape rather than declaring a parallel one — both feed
// the same accordion component and the same FAQPage schema.
import type { DestinationFaq } from "@/data/destinationFaqs";

/**
 * Hero/card photography. PLACEHOLDER stock, same helper pattern and the same
 * per-place photo IDs already used in src/data/stayTaxonomy.ts, so the two
 * agree until real on-ground photos land. Swap these for local files under
 * public/destinations/ when Sartaj supplies them.
 */
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1920&q=80`;

/** One hero-carousel slide. `alt` must describe THIS photo, not the place. */
export type DestinationPhoto = {
  src: string;
  alt: string;
};

export type Destination = {
  slug: string;
  name: string;
  /** Card copy — what the place is known for, in one line. */
  summary: string;
  /**
   * SOP §2.4 answer-first block for /destinations/[slug], 40–60 words. Answers
   * "what is this place and why go" before anything else on the page.
   */
  quickAnswer: string;
  /** Rough time worth giving the place, for the hero stat row. */
  idealDays: string;
  /**
   * Hero carousel slides.
   *
   * INCOMPLETE ON PURPOSE. Every entry here has been checked to show what its
   * alt text claims, which is why the counts are uneven (Srinagar 4, Gulmarg 2,
   * Pahalgam and Sonamarg 1). Padding them out would have meant labelling
   * photos as places they are not — the repo already does that on the homepage,
   * where a Kerala backwater and the Golden Temple are captioned "Gulmarg" and
   * "Sonamarg". The carousel handles any count from 1 up, so add real photos per
   * destination and it starts rotating on its own.
   */
  heroImages: DestinationPhoto[];
  /** Approximate drive from Srinagar. Empty for Srinagar itself. */
  fromSrinagar?: string;
  /** Answer-block fodder: when the place is at its best. */
  bestTime: string;
  /**
   * Approximate elevation, metres then feet. Stable geography rather than a
   * drifting rate, so it carries no [VERIFY] tag — but it is still rounded,
   * because published figures for these places disagree by tens of metres.
   */
  altitude: string;
  /** Two or three things the place is actually known for. Table-cell length. */
  famousFor: string;
  /** Full-bleed hero image. */
  image: string;
  /** Written for the hero, where this is the only description of the photo. */
  imageAlt: string;
  /**
   * Optional second photo, crossfaded in on card hover. Left unset here rather
   * than filled with guessed stock — the card falls back to a slow zoom on the
   * primary image, so it degrades cleanly. Add a second angle of the same place
   * and the crossfade turns itself on.
   */
  hoverImage?: string;
  /** SOP §2.4 "Things to do" — see the type's own doc comment for the internal-linking contract. */
  thingsToDo?: ThingToDoItem[];
  /** SOP §2.4 "How to reach" — air/train/road, each with hub connections. */
  howToReach?: HowToReach;
  /**
   * Cab fare table rows. Leave unset to show the whole published fleet at its
   * standard base price — see `CabFare` for when to set it.
   */
  cabFares?: CabFare[];
  /**
   * "Where to stay" cards, as stay slugs in the order they should appear.
   *
   * Only these are fetched, so a destination leads with the stays it should
   * rather than whatever happens to be tagged to it. Unset or empty hides the
   * section.
   */
  staySlugs?: string[];
  /** SOP §2.4 "Best time" — the twelve-month table. */
  bestTimeTable?: BestTimeTable;
  /**
   * Sartaj's on-ground tips — one string per tip.
   *
   * SOP A4/A8 information-gain block: this is the part a reader cannot get
   * from an aggregator, so each entry should be a specific, checkable truth
   * rather than generic advice ("carry warm clothes" is not a tip).
   */
  sartajTips?: string[];
  /** SOP §2.4 map block — where the place actually is. */
  map?: DestinationMap;
  /**
   * Page-level FAQs. Scope these to THIS place — hub-level questions ("which
   * destination first", "how many days for all four") live in
   * src/data/destinationFaqs.ts, and the two must not compete for the same
   * queries. Answers are plain strings because the page emits them verbatim
   * as FAQPage JSON-LD.
   */
  faqs?: DestinationFaq[];
  /**
   * Photo strip for the scrolling gallery — image URLs, nothing else.
   *
   * NOTE: with no alt text in the shape, these render as decorative images.
   * If they should carry alt text, this needs to become {url, alt} objects.
   */
  galleryImages?: string[];
};

/**
 * Map block for one destination.
 *
 * Coordinates rather than a pasted embed URL: from lat/lng the component can
 * build both the embed and the "get directions" link, and the CMS editor is
 * never asked to paste iframe markup. `embedUrl` exists only as an escape
 * hatch for a hand-tuned map.
 */
export type DestinationMap = {
  lat: number;
  lng: number;
  /** Google zoom level. Higher is closer; 11–13 suits a town and its valley. */
  zoom?: number;
  /** Overrides the generated embed URL. Leave unset in almost every case. */
  embedUrl?: string;
  /** Orientation copy for the left column — how the place is laid out. */
  blurb: string;
  /** Landmarks worth knowing, with their distance or drive time. */
  landmarks?: { name: string; detail: string }[];
};

/**
 * How worth visiting a month is.
 *
 * Four levels, not a 1–10 score: the honest resolution here is "go / fine /
 * depends / don't", and a number invites precision the underlying weather
 * does not have.
 */
export type MonthRating = "best" | "good" | "mixed" | "avoid";

/** One row of the month table. */
export type MonthEntry = {
  /** Three-letter label, "Jan" … "Dec". Table-cell length by design. */
  month: string;
  rating: MonthRating;
  /** Why that rating, in a few words — "Deep snow, gondola running". */
  note: string;
};

/**
 * The twelve-month table for one destination.
 *
 * Per-destination rather than valley-wide because the answer genuinely
 * differs: February is Gulmarg's peak and Sonamarg's closed season.
 */
export type BestTimeTable = {
  /** Answer-first line above the table. */
  overview: string;
  /** Twelve entries, January first. */
  months: MonthEntry[];
};

/**
 * One row of a destination's cab fare table.
 *
 * `slug` points at a Taxi record (Mongo), which owns the vehicle's photo,
 * name, type and seat count — this file never copies those. Set `price` only
 * when the run to THIS destination costs something other than the vehicle's
 * `basePrice`; a Srinagar–Sonamarg day trip is not priced like a Srinagar
 * airport transfer, and the Taxi model has one base price, not one per route.
 */
export type CabFare = {
  /** Taxi slug — resolves to /cab-service/[slug]. */
  slug: string;
  /** Route-specific fare in INR. Falls back to the vehicle's basePrice. */
  price?: number;
  /** What the fare covers, e.g. "Round trip, same day". */
  note?: string;
};

/**
 * One hub → terminal connection, e.g. Delhi → Srinagar by air.
 *
 * `duration` is the leg itself, not door to door, and both it and `details`
 * name carriers/services that change every season — treat them as [VERIFY]
 * content that the CMS editor re-checks, not fixed geography.
 */
export type RouteHub = {
  /** Departure city, e.g. "Delhi". */
  origin: string;
  /** Time for this leg alone, e.g. "1 h 20 m". */
  duration: string;
  /** What runs on this route, in one line. */
  details: string;
};

/** One way in — air, train or road — and the hubs that feed it. */
export type TransportMode = {
  mode: "Air" | "Train" | "Road";
  /** Terminal a traveller actually arrives at, e.g. "Srinagar International Airport (SXR)". */
  nearestTerminal: string;
  /** Road km from that terminal to THIS destination. Number so it can be sorted/compared. */
  distance: number;
  /** What to do on arrival — onward transport, and anything seasonal. */
  description: string;
  commonRoutes: RouteHub[];
};

/**
 * "How to reach" for one destination.
 *
 * Deliberately per-destination rather than one shared valley-wide block: the
 * terminal is the same for all four, but the onward distance, drive time and
 * seasonal road caveats are not, and those are the part a reader is here for.
 */
export type HowToReach = {
  /** Answer-first: the shortest true version of how you get here. */
  overview: string;
  transportModes: TransportMode[];
};

/**
 * One "thing to do" entry for a destination's Things To Do section.
 *
 * "temple" and "stay" are internal links: give only `slug` and the section
 * resolves heading/image/href by looking that record up in its own source
 * (Temple model, src/data/stays.ts) at render time, so this file never
 * duplicates data that already lives — and can change — elsewhere.
 *
 * "activity" has no dedicated data source yet (there is no activities/
 * experiences collection in the repo). Until one exists, author "activity"
 * entries the same way as "other": heading/description/images inline, no
 * slug, no outbound link.
 *
 * "other" is always self-contained: heading/description/images inline, no
 * slug, no outbound link. Use it for anything that will never get its own
 * page (a viewpoint, a market street, a specific trek).
 */
export type ThingToDoItem = {
  type: "temple" | "activity" | "stay" | "other";
  heading: string;
  /** Required for "temple"/"stay" once linked; never set for "activity"/"other". */
  slug?: string;
  /** "other" (and "activity", until it has a data source) only. */
  description?: string;
  /** "other" (and "activity", until it has a data source) only. */
  images?: string[];
};

export const DESTINATIONS: Destination[] = [
  {
    slug: "srinagar",
    quickAnswer:
      "Srinagar is Kashmir's summer capital and the base for almost every trip to the valley: Dal Lake and its houseboats, the Mughal Gardens, and the old city's mosques and bazaars. It has the valley's only airport and its widest choice of stays, and Gulmarg, Pahalgam and Sonamarg are all day trips from here.",
    idealDays: "2–3 days",
    heroImages: [
      {
        src: img("1614591276564-7b3e69347a48"),
        alt: "Houseboats lining the tree-fringed shore of Dal Lake in Srinagar",
      },
      {
        src: "/Home/kashmir-hero.webp",
        alt: "Snow-covered peaks above a Srinagar lake with boats moored along the shore",
      },
      {
        src: "/stays/houseboat.webp",
        alt: "Carved walnut veranda of a Dal Lake houseboat looking out over the water",
      },
      {
        src: "/temple-upload-images/Kheer-Bhawani-temple.webp",
        alt: "Pilgrims gathered at the Kheer Bhawani temple near Srinagar",
      },
    ],
    name: "Srinagar",
    summary: "Dal Lake, Mughal Gardens, old-city walks and houseboat stays.",
    bestTime: "April to June, September to November",
    image: img("1614591276564-7b3e69347a48"),
    imageAlt: "Houseboats lining the tree-fringed shore of Dal Lake in Srinagar",
    altitude: "~1,585 m (5,200 ft)",
    famousFor: "Dal Lake, houseboats, Mughal Gardens, old-city bazaars",
    staySlugs: [
      "dal-lake-deluxe-houseboat",
      "nigeen-heritage-houseboat",
      "boulevard-lake-view-hotel",
      "cheshma-shahi-hillside-resort",
      "rajbagh-city-hotel",
    ],
    // Only photos verified to show Srinagar — the strip repeats a short list
    // rather than padding it with scenery from elsewhere.
    galleryImages: [
      img("1614591276564-7b3e69347a48"),
      "/Home/kashmir-hero.webp",
      "/stays/houseboat.webp",
      "/temple-upload-images/Kheer-Bhawani-temple.webp",
    ],
    faqs: [
      {
        id: "srinagar-days",
        question: "How many days are enough for Srinagar?",
        answer:
          "Two to three days. That covers Dal Lake and a shikara ride, the Mughal Gardens, the old city and Hazratbal, with a day left over for Pari Mahal or the Shankaracharya temple. If you are using Srinagar as a base for Gulmarg, Pahalgam and Sonamarg, add one day per destination on top.",
      },
      {
        id: "srinagar-houseboat-worth-it",
        question: "Is a houseboat stay worth it, or should I book a hotel?",
        answer:
          "One or two nights on a houseboat is worth it for the experience; a full week usually is not, because storage, bathrooms and heating are more limited than a hotel of the same price. A common split is two nights on a houseboat and the rest in a hotel. Nigeen Lake is quieter than Dal for the same standard.",
      },
      {
        id: "srinagar-shikara-cost",
        question: "How much does a shikara ride cost?",
        answer:
          "Rates are set per shikara per hour, not per person, and are revised by the local authority from time to time. Agree both the price and the duration before you board, and confirm whether the route includes the floating gardens. We can arrange it as part of your itinerary so the rate is fixed in advance.",
      },
      {
        id: "srinagar-airport-distance",
        question: "How far is Srinagar airport from the city?",
        answer:
          "About 14 km, which is 30 to 45 minutes depending on traffic and security checks. Prepaid taxis run from outside arrivals, and most hotels and houseboats will arrange a pickup if you ask in advance.",
      },
      {
        id: "srinagar-winter",
        question: "Is Srinagar worth visiting in winter?",
        answer:
          "Yes, if you accept the cold. December to February is quiet and noticeably cheaper, the gardens are bare but the lake and old city are at their most atmospheric, and snowfall in the city is possible though never guaranteed. Check that your stay has proper heating before booking.",
      },
    ],
    map: {
      lat: 34.0837,
      lng: 74.7973,
      zoom: 12,
      blurb:
        "Srinagar sits in the middle of the valley, wrapped around Dal Lake and the Jhelum. Almost everything visitors come for is within a few kilometres of the lake's eastern shore, and the airport is a short drive south of the city.",
      landmarks: [
        { name: "Dal Lake & Boulevard Road", detail: "City centre, 0–3 km" },
        { name: "Mughal Gardens (Nishat, Shalimar)", detail: "8–12 km east" },
        { name: "Srinagar airport (SXR)", detail: "14 km south, 30–45 min" },
        { name: "Old city & Jamia Masjid", detail: "4–6 km north-west" },
      ],
    },
    sartajTips: [
      "Agree the shikara rate and the exact duration before you step in, not after. An hour means an hour, and the price is per shikara, not per person.",
      "Houseboats on Nigeen are quieter than Dal, and usually cheaper for the same standard. Dal's Boulevard end is convenient but noisy until late.",
      "The Mughal Gardens open early and empty out by mid-morning. Going at opening time is the difference between photographs and queues.",
      "Buy saffron and pashmina from a shop with a bill and a fixed price, not from a boat or a hotel doorstep. Ask your driver to wait outside rather than walk you in — commission is what makes the price move.",
    ],
    bestTimeTable: {
      overview:
        "Srinagar works year-round — it is the one destination with no closed season. April to June and September to November are the strongest windows; July and August are warm and busy, and deep winter is cold but quiet and cheap.",
      months: [
        {
          month: "Jan",
          rating: "mixed",
          note: "Coldest weeks. Snow possible, some services thin out.",
        },
        {
          month: "Feb",
          rating: "mixed",
          note: "Still cold, but clearer. Low rates, few crowds.",
        },
        {
          month: "Mar",
          rating: "good",
          note: "Almond blossom, gardens waking up. Rain likely.",
        },
        {
          month: "Apr",
          rating: "best",
          note: "Tulip garden season and mild days. Books out early.",
        },
        {
          month: "May",
          rating: "best",
          note: "Gardens at their peak, comfortable all day.",
        },
        {
          month: "Jun",
          rating: "best",
          note: "Warm and long-lit. Peak season prices.",
        },
        {
          month: "Jul",
          rating: "good",
          note: "Warmest month, occasional heavy rain.",
        },
        {
          month: "Aug",
          rating: "good",
          note: "Green and humid. Busy with domestic holidays.",
        },
        {
          month: "Sep",
          rating: "best",
          note: "Crowds thin, air clears, lake at its best.",
        },
        {
          month: "Oct",
          rating: "best",
          note: "Chinar leaves turn. The photographer's month.",
        },
        {
          month: "Nov",
          rating: "good",
          note: "Cold, quiet and cheap. Late autumn colour.",
        },
        {
          month: "Dec",
          rating: "mixed",
          note: "Winter proper. Snow if you are lucky, cold regardless.",
        },
      ],
    },
    howToReach: {
      overview:
        "Srinagar is the valley's entry point: it has Kashmir's only commercial airport, and every other destination here is reached by road from it. Flying in is the fastest option by a wide margin — the road approach from Jammu is a full day's drive on NH-44.",
      transportModes: [
        {
          mode: "Air",
          nearestTerminal: "Srinagar International Airport (SXR)",
          distance: 14,
          description:
            "The airport sits south of the city at Budgam. Prepaid taxis run from just outside arrivals, and most hotels and houseboats will arrange a pickup if you ask in advance. Allow 30–45 minutes into the city centre.",
          commonRoutes: [
            {
              origin: "Delhi",
              duration: "~1 h 30 m",
              details:
                "The densest route — multiple direct flights daily. [VERIFY carriers/frequency each season]",
            },
            {
              origin: "Mumbai",
              duration: "~3 h",
              details:
                "A few directs daily; the rest connect through Delhi. [VERIFY]",
            },
            {
              origin: "Bengaluru",
              duration: "~4 h 30 m",
              details:
                "Usually one-stop via Delhi; direct service comes and goes by season. [VERIFY]",
            },
          ],
        },
        {
          mode: "Train",
          nearestTerminal: "Srinagar (Nowgam) railway station",
          distance: 12,
          description:
            "The Katra–Srinagar line put the valley on the national network, so you can now reach Srinagar by rail rather than stopping at Jammu. Services and journey times on this line are still settling — check current timings before you plan around it. [VERIFY]",
          commonRoutes: [
            {
              origin: "Katra (Vaishno Devi)",
              duration: "~3 h",
              details:
                "The valley leg of the USBRL route, through the Chenab bridge and Banihal tunnel. [VERIFY]",
            },
            {
              origin: "Jammu Tawi",
              duration: "~4 h",
              details:
                "The older railhead, still the fallback if valley services are disrupted. [VERIFY]",
            },
          ],
        },
        {
          mode: "Road",
          nearestTerminal: "NH-44 via Jammu and the Banihal tunnel",
          distance: 270,
          description:
            "A long but scenic drive from Jammu, and the only overland way in. NH-44 closes without much notice in heavy snow, landslides or convoy movement, so never make it the last leg before a flight home.",
          commonRoutes: [
            {
              origin: "Jammu",
              duration: "8–10 h",
              details:
                "Shared taxis and buses run daily; timings depend entirely on highway conditions.",
            },
            {
              origin: "Delhi",
              duration: "18–20 h",
              details:
                "Only worth it as a two-day drive with an overnight at Jammu or Patnitop.",
            },
          ],
        },
      ],
    },
    thingsToDo: [
      {
        type: "stay",
        heading: "Stay on a Dal Lake houseboat",
        slug: "dal-lake-deluxe-houseboat",
      },
      {
        type: "temple",
        heading: "Visit Kheer Bhawani temple",
        // Must match the Temple record's slug exactly, or resolveThingsToDo
        // drops the card rather than rendering a dead link.
        slug: "kheer-bhawani-temple",
      },
      {
        type: "other",
        heading: "Shikara ride at sunset",
        description:
          "An hour on a shikara across Dal Lake as the light drops, past floating gardens and the houseboat row.",
        images: [
          "/temple-upload-images/Kheer-Bhawani-temple.webp",
        ],
      },
    ],
  },
  {
    slug: "gulmarg",
    quickAnswer:
      "Gulmarg is Kashmir's snow and ski destination, roughly 50 to 65 km west of Srinagar at about 2,650 m. Its gondola climbs towards Apharwat in two phases, and December to February is the only reliable snow window. From April the meadows turn green and the same slopes become walking country.",
    idealDays: "1–2 days",
    heroImages: [
      {
        src: img("1651509094074-e8acaeb84d8f"),
        alt: "Yellow gondola cabins crossing the snowfields above Gulmarg under a deep blue sky",
      },
      {
        src: "/destinations/hero/bg-mountains.png",
        alt: "Snow-covered peaks above the treeline at golden hour",
      },
    ],
    name: "Gulmarg",
    summary: "Gondola rides, snow views, meadows, skiing and winter trips.",
    fromSrinagar: "50–65 km, 1.5–2 h",
    bestTime: "December to February for snow, April to June for meadows",
    image: img("1651509094074-e8acaeb84d8f"),
    imageAlt:
      "Yellow gondola cabins crossing the snowfields above Gulmarg under a deep blue sky",
    altitude: "~2,650 m (8,700 ft)",
    famousFor: "Gondola cable car, skiing, snow meadows",
    staySlugs: ["gulmarg-pine-resort"],
    galleryImages: [
      img("1651509094074-e8acaeb84d8f"),
      "/destinations/hero/bg-mountains.png",
    ],
    faqs: [
      {
        id: "gulmarg-snow-months",
        question: "When is there snow in Gulmarg?",
        answer:
          "December to February is the reliable window, with January and February usually the deepest. March is unpredictable as the snow softens. From April the meadows are green and any snow you see underfoot will be at the top of the gondola's second phase, not in Gulmarg itself.",
      },
      {
        id: "gulmarg-gondola-booking",
        question: "Do I need to book the gondola in advance?",
        answer:
          "Yes, particularly for Phase 2. Phase 1 and Phase 2 are separate tickets and Phase 2 sells out first. Book online before you travel. Both phases also close at short notice for weather and maintenance, so keep the day flexible rather than planning everything around it.",
      },
      {
        id: "gulmarg-day-trip",
        question: "Can Gulmarg be done as a day trip from Srinagar?",
        answer:
          "Yes — it is the shortest transfer of the four at roughly 50 to 65 km and 1.5 to 2 hours each way. Leave early, because in winter the road above Tangmarg can close for snow clearing and vehicles arriving late are the ones turned back. Staying overnight is worth it in ski season.",
      },
      {
        id: "gulmarg-ski",
        question: "Can beginners ski in Gulmarg?",
        answer:
          "Yes. There are gentler slopes near the base with instructors and rental gear available locally, alongside the advanced terrain higher up that Gulmarg is better known for. Arrange instruction through your stay or through us rather than on the slope, so the rate and the instructor are confirmed in advance.",
      },
      {
        id: "gulmarg-winter-vehicle",
        question: "Do I need a special vehicle to reach Gulmarg in winter?",
        answer:
          "Often, yes. In heavy snow the stretch above Tangmarg needs chains or a snow-capable vehicle, and ordinary Srinagar taxis will stop there and hand you over to a local jeep. Budget for that leg separately in December to February.",
      },
    ],
    map: {
      lat: 34.0484,
      lng: 74.3805,
      zoom: 13,
      blurb:
        "Gulmarg is a bowl-shaped meadow ringed by pine forest, high above the valley floor. The gondola base station, the golf course and most hotels sit around the same open meadow, so the resort itself is walkable — everything else is a drive down through Tangmarg.",
      landmarks: [
        { name: "Gondola base station", detail: "Centre of the meadow" },
        { name: "Apharwat Peak (Phase 2)", detail: "Two gondola stages up" },
        { name: "Tangmarg", detail: "13 km down, last town before the climb" },
        { name: "Srinagar airport (SXR)", detail: "50 km, 1.5–2 h" },
      ],
    },
    sartajTips: [
      "Book the gondola online before you travel. Phase 1 and Phase 2 are separate tickets, and Phase 2 is the one that sells out — it also shuts on its own for weather and maintenance.",
      "Snow boots and gaiters rent for a fraction of what the roadside stalls first quote, and you only need them if you are actually walking in snow. Settle the price before anything goes on your feet.",
      "In heavy snow the road above Tangmarg can close at short notice. Start early — vehicles that leave Srinagar after mid-morning are the ones that get turned back.",
      "Ponywallahs quote per point, not per ride. Fix the full route and the total before mounting, or the price grows at every stop.",
    ],
    bestTimeTable: {
      overview:
        "Gulmarg has two seasons and they want opposite things. December to February is the snow and ski window; April to June turns the same slopes into walking meadows. March and November are the changeover months and the least reliable.",
      months: [
        {
          month: "Jan",
          rating: "best",
          note: "Deepest snow of the year. Peak ski season.",
        },
        {
          month: "Feb",
          rating: "best",
          note: "Reliable snow with longer, brighter days.",
        },
        {
          month: "Mar",
          rating: "mixed",
          note: "Snow softening and patchy. Neither season at its best.",
        },
        {
          month: "Apr",
          rating: "good",
          note: "Meadows emerging, upper slopes still white.",
        },
        {
          month: "May",
          rating: "best",
          note: "Green meadows, clear views, comfortable walking.",
        },
        {
          month: "Jun",
          rating: "best",
          note: "Warmest and busiest. Book the gondola ahead.",
        },
        {
          month: "Jul",
          rating: "good",
          note: "Lush and cool, with cloud and rain rolling through.",
        },
        {
          month: "Aug",
          rating: "good",
          note: "Green throughout, peak domestic holiday traffic.",
        },
        {
          month: "Sep",
          rating: "good",
          note: "Quieter, crisp air, clear mountain views.",
        },
        {
          month: "Oct",
          rating: "good",
          note: "Cold and near-empty. Autumn colour lower down.",
        },
        {
          month: "Nov",
          rating: "mixed",
          note: "Bare and cold, waiting for snow. Least to see.",
        },
        {
          month: "Dec",
          rating: "best",
          note: "Snow settles in and the ski season opens.",
        },
      ],
    },
    howToReach: {
      overview:
        "There is no airport, station or through-bus at Gulmarg — every route ends with a drive from Srinagar. Fly into Srinagar, then take a taxi up through Tangmarg; it is the shortest transfer of the four destinations.",
      transportModes: [
        {
          mode: "Air",
          nearestTerminal: "Srinagar International Airport (SXR)",
          distance: 50,
          description:
            "Taxis from the airport reach Gulmarg in around two hours without going into Srinagar city. In deep winter the last stretch above Tangmarg can need chains, and the road is sometimes closed for clearing after heavy snowfall.",
          commonRoutes: [
            {
              origin: "Delhi",
              duration: "~1 h 30 m flight + 2 h drive",
              details:
                "The usual way in — a morning flight gets you to Gulmarg by afternoon.",
            },
          ],
        },
        {
          mode: "Train",
          nearestTerminal: "Srinagar (Nowgam) railway station",
          distance: 52,
          description:
            "Arrive at Srinagar by rail, then continue by road exactly as you would from the airport. There is no rail link any closer. [VERIFY current services]",
          commonRoutes: [
            {
              origin: "Katra (Vaishno Devi)",
              duration: "~3 h rail + 2 h drive",
              details: "Valley leg of the USBRL route, then a taxi up. [VERIFY]",
            },
          ],
        },
        {
          mode: "Road",
          nearestTerminal: "Tangmarg, on the Srinagar–Gulmarg road",
          distance: 13,
          description:
            "Tangmarg is the last town before the climb and where vehicles wait out a closure. Most visitors come up as a day trip from Srinagar; if you are staying the night, book ahead — the on-mountain stays are few and fill through the ski season.",
          commonRoutes: [
            {
              origin: "Srinagar",
              duration: "1.5–2 h",
              details:
                "Full-day taxi hire is the standard arrangement, including waiting time at the gondola.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "pahalgam",
    quickAnswer:
      "Pahalgam sits about 90 km south-east of Srinagar, where the Lidder River comes down out of the mountains. It is the greenest and least hurried of the four destinations, with Betaab Valley and Aru Valley close by, and it is the traditional starting point for the Amarnath Yatra.",
    idealDays: "1–2 days",
    heroImages: [
      {
        src: img("1666688449550-26a765798090"),
        alt: "The Lidder River running through the pine valley at Pahalgam",
      },
    ],
    name: "Pahalgam",
    summary:
      "Lidder River, Betaab Valley, Aru Valley and relaxed family stays.",
    fromSrinagar: "90 km, 2.5–3 h",
    bestTime: "April to June, September to November",
    image: img("1666688449550-26a765798090"),
    imageAlt: "The Lidder River running through the pine valley at Pahalgam",
    altitude: "~2,130 m (7,000 ft)",
    famousFor: "Lidder River, Betaab Valley, Aru Valley",
    staySlugs: [
      "lidder-riverside-hotel",
      "pahalgam-family-homestay",
      "aru-valley-homestay",
    ],
    galleryImages: [img("1666688449550-26a765798090")],
    faqs: [
      {
        id: "pahalgam-local-taxi",
        question: "Why do I need a separate taxi for Betaab and Aru?",
        answer:
          "Outside vehicles are not permitted up the side valleys. Your Srinagar cab drops you in Pahalgam town, and the local taxi union runs the circuit to Betaab, Aru and Chandanwari on fixed point-to-point rates. Hire it from the union stand and settle the full circuit as one price before setting off.",
      },
      {
        id: "pahalgam-days",
        question: "How many days should I spend in Pahalgam?",
        answer:
          "One night and two days as a minimum, which gives you the town, the Lidder bank and one side valley. Two nights lets you do Betaab and Aru properly rather than as photo stops. Aru in particular rewards an overnight — most visitors drive up, stop for twenty minutes and leave.",
      },
      {
        id: "pahalgam-yatra",
        question: "Should I avoid Pahalgam during the Amarnath Yatra?",
        answer:
          "If you are not there for the yatra, come before or after it. During the season the town runs on convoys, checkpoints and full hotels, and the roads towards Chandanwari are heavily restricted. The dates move each year, so confirm them before booking July or August travel.",
      },
      {
        id: "pahalgam-winter-open",
        question: "Is Pahalgam open in winter?",
        answer:
          "The main road to Pahalgam town stays open through most of winter in normal weather, which is why it works as a snow base when Sonamarg is shut. The side valleys are the part that closes — Betaab, Aru and Chandanwari can be restricted after heavy snowfall.",
      },
      {
        id: "pahalgam-family",
        question: "Is Pahalgam good for families with young children?",
        answer:
          "It is the most relaxed of the four, with short walks, riverside meadows and no altitude to speak of at around 2,130 m. The one thing to watch is the Lidder itself — it runs fast and very cold straight off the snow, and the rocks at the edge are slippery.",
      },
    ],
    map: {
      lat: 34.0161,
      lng: 75.315,
      zoom: 12,
      blurb:
        "Pahalgam runs along the Lidder River, with the town on one bank and pine slopes rising on both sides. The side valleys — Betaab one way, Aru the other — branch off within a few kilometres, which is why most people base themselves in town and drive out from there.",
      landmarks: [
        { name: "Pahalgam town & Lidder bank", detail: "Base for everything" },
        { name: "Betaab Valley", detail: "7 km, ~20 min by local taxi" },
        { name: "Aru Valley", detail: "12 km, ~40 min by local taxi" },
        { name: "Srinagar airport (SXR)", detail: "95 km, 2.5–3 h" },
      ],
    },
    sartajTips: [
      "Betaab and Aru need a local taxi from Pahalgam town — outside vehicles are not allowed up. Hire it from the union stand and settle the full circuit in one price.",
      "Aru is worth an overnight, not a photo stop. Most people drive up, spend twenty minutes and leave, which is the one way to waste the best part of Pahalgam.",
      "During the Amarnath Yatra the town runs on a different rhythm — checkpoints, convoys and full hotels. If you are not there for the yatra, come before or after it.",
      "The Lidder looks calm and is not. It runs fast and cold straight off the snow; stay off the rocks at the edge, particularly with children.",
    ],
    bestTimeTable: {
      overview:
        "Pahalgam's road stays open all year, so the question is what you want rather than whether you can get there. April to June and September to October are the strongest; July and August coincide with the Amarnath Yatra and its traffic.",
      months: [
        {
          month: "Jan",
          rating: "mixed",
          note: "Cold and quiet, snow on the ground. Side valleys may shut.",
        },
        {
          month: "Feb",
          rating: "mixed",
          note: "Still wintry. Good for snow, thin on everything else.",
        },
        {
          month: "Mar",
          rating: "good",
          note: "Thawing, green returning. Rain and mud likely.",
        },
        {
          month: "Apr",
          rating: "best",
          note: "Valley greens up, Lidder running full. Mild days.",
        },
        {
          month: "May",
          rating: "best",
          note: "Betaab and Aru at their best. Comfortable throughout.",
        },
        {
          month: "Jun",
          rating: "best",
          note: "Peak season — warm, green and heavily booked.",
        },
        {
          month: "Jul",
          rating: "mixed",
          note: "Yatra season. Heavy traffic and security checks.",
        },
        {
          month: "Aug",
          rating: "mixed",
          note: "Yatra continues; green but crowded and wet.",
        },
        {
          month: "Sep",
          rating: "best",
          note: "Crowds gone, weather settled. The local's pick.",
        },
        {
          month: "Oct",
          rating: "best",
          note: "Autumn colour along the Lidder. Cold nights.",
        },
        {
          month: "Nov",
          rating: "good",
          note: "Quiet and cold, bare trees, low rates.",
        },
        {
          month: "Dec",
          rating: "mixed",
          note: "Winter sets in. Snow possible, side valleys restricted.",
        },
      ],
    },
    howToReach: {
      overview:
        "Pahalgam is reached by road from Srinagar, roughly 90 km south-east through Anantnag. It is the one destination that keeps its road open year-round in normal weather, which is why it works as a winter base when Sonamarg is shut.",
      transportModes: [
        {
          mode: "Air",
          nearestTerminal: "Srinagar International Airport (SXR)",
          distance: 95,
          description:
            "A two-and-a-half to three hour taxi transfer, mostly on good highway as far as Anantnag. Book the taxi for the full stay if you also want Betaab and Aru — those are separate short drives from Pahalgam town.",
          commonRoutes: [
            {
              origin: "Delhi",
              duration: "~1 h 30 m flight + 3 h drive",
              details:
                "Take a morning flight; an afternoon arrival makes for a late, dark drive.",
            },
          ],
        },
        {
          mode: "Train",
          nearestTerminal: "Anantnag railway station",
          distance: 45,
          description:
            "Anantnag is on the valley line and is genuinely the closest railhead — about 90 minutes out by road. Useful if you are already travelling within the valley by train. [VERIFY current services]",
          commonRoutes: [
            {
              origin: "Srinagar (Nowgam)",
              duration: "~1 h rail + 1.5 h drive",
              details:
                "The valley local line runs Srinagar–Anantnag–Banihal. [VERIFY]",
            },
          ],
        },
        {
          mode: "Road",
          nearestTerminal: "Anantnag, on the Srinagar–Pahalgam road",
          distance: 45,
          description:
            "The road stays open through most of winter, though snow can slow the last stretch. During the Amarnath Yatra season expect heavy traffic and security checks on this route — allow considerably more time.",
          commonRoutes: [
            {
              origin: "Srinagar",
              duration: "2.5–3 h",
              details:
                "Taxis and shared sumos run daily; buses go as far as Anantnag.",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "sonamarg",
    quickAnswer:
      "Sonamarg is the highest and furthest of the four, roughly 80 km from Srinagar on the road towards Ladakh. Thajiwas Glacier is the draw, reached on foot or by pony from the meadows. The road usually opens around May and closes again with the first heavy snow.",
    idealDays: "1 day trip",
    heroImages: [
      {
        src: img("1643449415972-87d4cfe882a1"),
        alt: "High-altitude meadows below the glaciers at Sonamarg",
      },
    ],
    name: "Sonamarg",
    summary: "Glacier routes, mountain drives and high-altitude day trips.",
    fromSrinagar: "80 km, 2.5–3 h",
    bestTime: "May to October, road and weather permitting",
    image: img("1643449415972-87d4cfe882a1"),
    imageAlt: "High-altitude meadows below the glaciers at Sonamarg",
    altitude: "~2,730 m (8,960 ft)",
    famousFor: "Thajiwas Glacier, alpine meadows, pony trails",
    staySlugs: ["sonamarg-mountain-lodge"],
    galleryImages: [img("1643449415972-87d4cfe882a1")],
    faqs: [
      {
        id: "sonamarg-road-open",
        question: "When does the Sonamarg road open?",
        answer:
          "Usually around May, and it closes again with the first heavy snow, typically in November. The exact dates move every year and are decided by conditions, not a calendar, so confirm the road is open the day before you travel rather than the week before.",
      },
      {
        id: "sonamarg-day-trip",
        question: "Is Sonamarg a day trip or an overnight?",
        answer:
          "A day trip for most people. It is roughly 80 km and 2.5 to 3 hours each way from Srinagar, and there is little in the way of a town once you arrive — the meadow, the Thajiwas trailhead and a handful of stays. Start early and you are back in Srinagar comfortably by evening.",
      },
      {
        id: "sonamarg-thajiwas",
        question: "Do I have to take a pony to Thajiwas Glacier?",
        answer:
          "No. It is a walk of roughly 3 km from the road and manageable for most reasonably fit people. Ponies are available and useful if you would rather not walk it, but fix the price and the turnaround point before mounting — ponywallahs quote per point, not per ride.",
      },
      {
        id: "sonamarg-altitude",
        question: "Will I feel the altitude at Sonamarg?",
        answer:
          "Some people do. At around 2,730 m it is roughly 1,100 m higher than Srinagar, and the Thajiwas walk climbs further. Take the first hour slowly rather than heading straight up, keep water with you, and skip the glacier walk if you have a heart or breathing condition without checking with your doctor first.",
      },
      {
        id: "sonamarg-ladakh",
        question: "Can I continue to Ladakh from Sonamarg?",
        answer:
          "Yes — Sonamarg is the last major stop before Zoji La on the Srinagar–Leh highway. The pass opens later in the season than Sonamarg itself and traffic is often held for convoys, so treat it as its own journey rather than an extension of a day trip.",
      },
    ],
    map: {
      lat: 34.304,
      lng: 75.293,
      zoom: 12,
      blurb:
        "Sonamarg is a long meadow strung along NH-1 on the way to Ladakh, with the Sindh River beside the road and glaciers behind it. There is no town to speak of — the meadow, the Thajiwas trailhead and a handful of stays are all within a couple of kilometres of the highway.",
      landmarks: [
        { name: "Sonamarg meadow & NH-1", detail: "The whole destination" },
        { name: "Thajiwas Glacier trailhead", detail: "3 km, walk or pony" },
        { name: "Zoji La pass", detail: "~15 km on, seasonal, towards Ladakh" },
        { name: "Srinagar airport (SXR)", detail: "87 km, ~3 h" },
      ],
    },
    sartajTips: [
      "Confirm the road is open the day before, not the week before. Sonamarg closes and reopens on its own schedule, and a booked cab is no guarantee of getting through.",
      "Thajiwas is a short walk or a pony ride, and the pony is optional — the walk is manageable for most people. Fix the pony price and the turnaround point in advance if you take one.",
      "Leave Srinagar early. Traffic on NH-1 is often held for Ladakh-bound convoys, and afternoon weather at this altitude closes in fast.",
      "It is 800 m higher than Srinagar and it feels it. Give yourself a slow first hour rather than walking straight up to the glacier.",
    ],
    bestTimeTable: {
      overview:
        "Sonamarg is the one destination with a genuinely closed season. The road is usually shut from around November to April, so the trip only exists from roughly May to October — and July to September is the most dependable stretch.",
      months: [
        {
          month: "Jan",
          rating: "avoid",
          note: "Road closed. Not reachable as a day trip.",
        },
        {
          month: "Feb",
          rating: "avoid",
          note: "Road closed under snow.",
        },
        {
          month: "Mar",
          rating: "avoid",
          note: "Still closed. Clearing has not started.",
        },
        {
          month: "Apr",
          rating: "mixed",
          note: "Reopening begins, but the date moves every year.",
        },
        {
          month: "May",
          rating: "good",
          note: "Usually open. Snow still lying near Thajiwas.",
        },
        {
          month: "Jun",
          rating: "best",
          note: "Meadows green, glacier walk comfortable.",
        },
        {
          month: "Jul",
          rating: "best",
          note: "Fully open, warmest. Zoji La running to Ladakh.",
        },
        {
          month: "Aug",
          rating: "best",
          note: "Reliable access, peak season traffic.",
        },
        {
          month: "Sep",
          rating: "best",
          note: "Clear air, thinner crowds, cold mornings.",
        },
        {
          month: "Oct",
          rating: "mixed",
          note: "Can close early on the first heavy snow.",
        },
        {
          month: "Nov",
          rating: "avoid",
          note: "Normally shut for the season.",
        },
        {
          month: "Dec",
          rating: "avoid",
          note: "Road closed under snow.",
        },
      ],
    },
    howToReach: {
      overview:
        "Sonamarg is 80 km from Srinagar on NH-1, the road towards Ladakh, and is the only one of the four that closes for the season. The road usually opens around May and shuts with the first heavy snow — confirm it is open before you build a day around it.",
      transportModes: [
        {
          mode: "Air",
          nearestTerminal: "Srinagar International Airport (SXR)",
          distance: 87,
          description:
            "Around three hours by taxi from the airport. Most people do Sonamarg as a day trip from Srinagar rather than staying, because stays here are limited and the drive back is straightforward in daylight.",
          commonRoutes: [
            {
              origin: "Delhi",
              duration: "~1 h 30 m flight + 3 h drive",
              details:
                "Fly to Srinagar, stay the night there, and do Sonamarg the next day.",
            },
          ],
        },
        {
          mode: "Train",
          nearestTerminal: "Srinagar (Nowgam) railway station",
          distance: 85,
          description:
            "No rail link comes near Sonamarg. Arrive at Srinagar and continue by road — same transfer as from the airport. [VERIFY current services]",
          commonRoutes: [
            {
              origin: "Katra (Vaishno Devi)",
              duration: "~3 h rail + 3 h drive",
              details:
                "Long enough that an overnight in Srinagar is the sensible break. [VERIFY]",
            },
          ],
        },
        {
          mode: "Road",
          nearestTerminal: "Ganderbal, on NH-1 towards Sonamarg",
          distance: 55,
          description:
            "The one route in, and it is seasonal: the stretch beyond Sonamarg to Zoji La opens later still. Start early — the road is often one-way controlled for Ladakh-bound convoys, and afternoon weather closes in quickly at this altitude.",
          commonRoutes: [
            {
              origin: "Srinagar",
              duration: "2.5–3 h",
              details:
                "Full-day taxi hire is the norm, with waiting time at the Thajiwas trailhead.",
            },
          ],
        },
      ],
    },
  },
];

export function getAllDestinations(): Destination[] {
  return DESTINATIONS;
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((destination) => destination.slug === slug);
}
