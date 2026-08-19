/**
 * STATIC FALLBACK for the /experiences activity archive and detail pages.
 *
 * Mongo is the source of truth — see src/models/ExperienceActivity.ts and the
 * read-through in src/lib/experienceActivityPage.ts. The records below backfill
 * any slug that has not been migrated yet, so the pages built against this file
 * keep rendering through the move instead of 404ing one by one. Once every
 * activity has a published CMS record, this file and the fallback can go.
 *
 * The TYPES it used to declare now live in src/types/experienceActivityTypes.ts
 * and are re-exported below, so every component that imports
 * `ExperienceActivity` from here keeps working and a CMS record and a static
 * record stay the same shape.
 *
 * NOTHING below is verified:
 *   • `rating` is fabricated. It renders on the card but is deliberately NOT
 *     emitted as Review / AggregateRating JSON-LD anywhere — fake rating markup
 *     is a domain-wide manual-action risk.
 *   • `pricePerPerson` is a placeholder figure, not a quote, and every record
 *     here seeds with `priceVerified` unset so no Offer is emitted.
 */

import {
  MONTH_WINDOWS,
  WEEKDAYS,
  type ActivityBookingRequirement,
  type ActivityClosedDate,
  type ActivityDifficulty,
  type ActivityFact,
  type ActivityFaq,
  type ActivityImage,
  type ActivitySchedule,
  type ActivitySlot,
  type ActivityStep,
  type ActivityTiming,
  type ActivityVideo,
  type ExperienceActivity,
  type MonthWindowId,
  type WeekdayId,
} from "@/types/experienceActivityTypes";

export { MONTH_WINDOWS, WEEKDAYS };
export type {
  ActivityBookingRequirement,
  ActivityClosedDate,
  ActivityDifficulty,
  ActivityFact,
  ActivityFaq,
  ActivityImage,
  ActivitySchedule,
  ActivitySlot,
  ActivityStep,
  ActivityTiming,
  ActivityVideo,
  ExperienceActivity,
  MonthWindowId,
  WeekdayId,
};

/** Same placeholder-photo helper the other data files use. */
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

/**
 * Builds a gallery from `[unsplashId, alt]` pairs.
 *
 * PLACEHOLDER ALT TEXT: these describe the *kind* of photo each slot holds, not
 * a photo anyone has checked. When the real images land, every alt has to be
 * rewritten against the picture it actually sits on — alt text that describes
 * the wrong image is worse than none.
 */
const gallery = (slug: string, shots: [string, string][]): ActivityImage[] =>
  shots.map(([photoId, alt], index) => ({
    id: `${slug}-${index + 1}`,
    image: img(photoId),
    alt,
  }));

/**
 * Fourteen entries — enough that the archive paginates properly while it is
 * being built, and that every month window has something to show.
 */
export const EXPERIENCE_ACTIVITIES: ExperienceActivity[] = [
  {
    id: "act-1",
    slug: "dal-lake-shikara",
    timing: {
      booking: "walk-in",
      bookingLeadTime: "No booking needed — boats are hired at the ghat.",
      weatherDependent: true,
      weatherNote:
        "Rowing stops in heavy rain, and for days at a time when the lake freezes in a hard January.",
      verified: false,
      schedules: [
        {
          id: "shikara-all-year",
          slots: [
            {
              id: "shikara-day",
              opens: "06:00",
              closes: "19:00",
            },
          ],
          note: "Boats run on demand rather than to a timetable. The floating vegetable market is a separate, earlier trip — around 05:00 to 07:00.",
        },
      ],
    },
    aboutHtml:
      "<p>A shikara is a hand-rowed cedar boat with a canopy and cushioned seats, and an hour in one is the single most photographed thing anybody does in Kashmir. It is also the least demanding: you step down from a ghat at water level, sit, and the boatman does the rest.</p><h3>What you actually see</h3><p>The circuit most boats run leaves the Boulevard Road ghats, crosses open water towards the houseboat rows, then turns into the channels between the floating vegetable gardens before coming back past Char Chinar island. The open-water stretch at the start is the quiet one — the Zabarwan hills sit behind the houseboats and, on a still evening, the whole thing is mirrored.</p><h3>Timing is most of the experience</h3><p>The same ride is worth very different amounts depending on when you take it. An hour before sunset is the hour to pay for. Midday is flat, hot and crowded, and the light is the worst it will be all day. If you can only go once, go late.</p><p>There is one other hour worth knowing about: the <strong>floating vegetable market</strong> forms near Ghat 16 at around five in the morning and is finished by seven. Very few hotels will suggest it, and it is the most interesting thing on the lake.</p><h3>The vendors</h3><ul><li>Boats selling saffron, papier-mâché, jewellery and kahwa will pull alongside mid-ride. This is normal.</li><li>Buying is entirely optional, and declining politely is completely routine — nobody takes offence.</li><li>Saffron sold from a boat is a gamble. Buy it from a shop with a bill if you want the real thing.</li></ul><h3>Agree the price first</h3><p>Rates are quoted <strong>per boat, per hour</strong> — not per person. Almost every dispute we hear about traces back to that one ambiguity, and it is settled by asking two questions before you step aboard: how much, and for how long.</p>",
    quickAnswer:
      "A shikara is a hand-rowed wooden boat, and an hour on Dal Lake is the easiest thing to do in Srinagar. You pass the houseboat rows, the floating vegetable gardens and Char Chinar island. No fitness, no booking and no season — it runs year round, and sunset is the hour worth paying for.",
    season: "Year round; best at sunset, Apr–Oct",
    difficulty: "easy",
    suitedFor: "Anyone — no fitness needed, and the boat is boarded from a step",
    destinationSlug: "srinagar",
    priceNote: "Per boat per hour, not per person. A shikara seats four comfortably.",
    extraFacts: [
      { id: "dal-lake-shikara-f1", label: "Boat capacity", value: "Up to 4 adults" },
      { id: "dal-lake-shikara-f2", label: "Departure points", value: "Ghat 9–16, Boulevard Road" },
      { id: "dal-lake-shikara-f3", label: "Best hour", value: "One hour before sunset" },
    ],
    whatToExpect: [
      {
        id: "dal-lake-shikara-s1",
        title: "Boarding at the ghat",
          body:
            "Shikaras leave from numbered ghats along Boulevard Road. You step down onto a cushioned bench under a canopy — there is no climb and no balance test.",
      },
      {
        id: "dal-lake-shikara-s2",
        title: "Out across the open water",
          body:
            "The first stretch crosses open lake towards the houseboat rows. This is the quiet part, and the one people remember: the Zabarwan hills sit behind the boats and the water is usually glass-still.",
      },
      {
        id: "dal-lake-shikara-s3",
        title: "The gardens and Char Chinar",
          body:
            "Deeper in, the lake becomes channels between floating vegetable gardens. Boats selling saffron, papier-mâché and kahwa will come alongside. Buying is entirely optional and declining is normal.",
      },
      {
        id: "dal-lake-shikara-s4",
        title: "Back before dark",
          body:
            "An hour covers the main circuit comfortably. Two hours lets you go as far as Nehru Park and back without rushing the light.",
      },
    ],
    inclusions: [
      "Hand-rowed shikara with canopy and cushioned seating",
      "Boatman for the booked duration",
    ],
    exclusions: [
      "Anything bought from the floating vendors",
      "Houseboat entry or overnight stay",
      "Tips, which are customary but not fixed",
    ],
    bookingTips: [
      "Agree the price and the duration before you step onto the boat, not after. Rates are per boat per hour and quoted per person only by mistake or by design.",
      "Go out about an hour before sunset. The same trip at midday is a fraction of the experience for the same money.",
      "Avoid the congested stretch directly off the central Boulevard ghats — ask to head towards the Nishat side, where the water is cleaner and quieter.",
    ],
    sartajTips: [
      "The floating market at Ghat 16 forms around 5 AM and is over by 7. Nobody in a hotel will suggest it and it is the best hour on the lake.",
      "A shikara ride sold as part of a package is almost always one hour. Ask which ghat and how long before you accept it as covered.",
      "Dal Lake ices over in a hard January and rowing stops for days at a time. If you are travelling in deep winter, treat it as weather-dependent.",
    ],
    faqs: [
      {
        id: "dal-lake-shikara-q1",
        question: "How much is a shikara ride on Dal Lake?",
          answer:
            "Rates have run at roughly ₹300–500 per hour for the whole boat in recent seasons, not per person. Confirm the figure and the duration with the boatman before boarding — that one sentence prevents almost every dispute we hear about.",
      },
      {
        id: "dal-lake-shikara-q2",
        question: "How long should a shikara ride be?",
          answer:
            "One hour covers the main circuit. Two hours is worth it at sunset if you want to reach Nehru Park and the quieter channels without the boatman turning back early.",
      },
      {
        id: "dal-lake-shikara-q3",
        question: "Is a shikara ride safe for children and elderly travellers?",
          answer:
            "Yes. The boat is boarded from a step at water level, the seating is cushioned and covered, and it moves at walking pace. It is the one Kashmir activity that suits every age without qualification.",
      },
    ],
    bestMonths: ["mar-apr", "apr-may", "may-jun", "jun-jul", "jul-aug", "aug-sep", "sep-oct", "oct-nov"],
    title: "Adventureous Dal Lake",
    location: "Kashmir",
    duration: "1 hour – 4 days",
    pricePerPerson: 5000,
    featured: true,
    rating: 4.5,
    gallery: gallery("dal-lake-shikara", [
      ["1566837945700-30057527ade0", "Shikara boats moored on Dal Lake below misted mountains"],
      ["1595815771614-ade9d652a65d", "Still lake water reflecting a line of wooden houseboats"],
      ["1605649487212-47bdc0bf7b0f", "Hand-rowed shikara crossing open water at golden hour"],
      ["1580746738099-79cd0b0d0d9c", "Floating vegetable market with laden boats at dawn"],
    ]),
  },
  {
    id: "act-2",
    slug: "houseboat-stay",
    quickAnswer:
      "A Kashmiri houseboat is a carved cedar hotel moored on Dal or Nigeen Lake — panelled rooms, a verandah over the water and meals cooked aboard. A ride or an overnight both work; the difference between a good one and a poor one is which lake stretch it sits on, not the photos.",
    season: "Year round; best Apr–Oct",
    difficulty: "easy",
    suitedFor: "Anyone; boarding is from a shikara, so pack light",
    destinationSlug: "srinagar",
    bestMonths: ["mar-apr", "apr-may", "may-jun", "jun-jul", "jul-aug", "aug-sep", "sep-oct", "oct-nov"],
    title: "House Boat Ride",
    location: "Kashmir",
    duration: "1 hour – 4 days",
    pricePerPerson: 5000,
    featured: true,
    rating: 4.5,
    gallery: gallery("houseboat-stay", [
      ["1590059390047-4c1e0e0b0a0a", "Carved wooden houseboat moored beneath trees on still water"],
      ["1566837945700-30057527ade0", "Row of houseboats along a lake bank at sunset"],
      ["1605649487212-47bdc0bf7b0f", "Carved cedar verandah of a houseboat facing the water"],
    ]),
  },
  {
    id: "act-3",
    slug: "paragliding",
    quickAnswer:
      "Paragliding here is tandem only — you are strapped to a certified pilot and the launch is a short downhill run, nothing more. Flights go from Sanasar and, in season, the Gulmarg meadows. Every flight is weather-called on the morning, so build it into a flexible day.",
    season: "Apr–Jun and Sep–Oct, weather permitting",
    difficulty: "moderate",
    suitedFor: "Anyone without vertigo or a heart condition; no experience needed",
    destinationSlug: "gulmarg",
    bestMonths: ["apr-may", "may-jun", "sep-oct"],
    title: "Paragliding",
    location: "Kashmir",
    duration: "1 hour – 4 days",
    pricePerPerson: 5000,
    featured: true,
    rating: 4.5,
    gallery: gallery("paragliding", [
      ["1626621341517-bbf3d9990a23", "Red cable-car cabin crossing a clear blue sky above snow slopes"],
      ["1622163642998-1ea32b0bbc67", "Paraglider canopy in flight above green hill slopes"],
      ["1516738901171-8eb4fc13bd20", "Cable car climbing towards a bare snow-covered ridge"],
    ]),
  },
  {
    id: "act-4",
    slug: "skiing",
    timing: {
      booking: "recommended",
      bookingLeadTime: "Arrange an instructor two days ahead in January and February.",
      weatherDependent: true,
      weatherNote:
        "Lifts close in a whiteout, and Apharwat can shut while the lower slopes stay open.",
      verified: false,
      schedules: [
        {
          id: "ski-season",
          season: "Ski season (Dec–Mar)",
          slots: [
            {
              id: "ski-lifts",
              label: "Lifts",
              opens: "10:00",
              closes: "16:30",
              lastEntry: "15:30",
            },
            {
              id: "ski-lessons-am",
              label: "Morning lessons",
              opens: "10:00",
              closes: "13:00",
            },
            {
              id: "ski-lessons-pm",
              label: "Afternoon lessons",
              opens: "13:30",
              closes: "16:00",
            },
          ],
          note: "Gear hire opens with the lifts; get boots fitted before the first lesson slot.",
        },
      ],
    },
    aboutHtml:
      "<p>Gulmarg is India's only ski destination that serious skiers travel for, and the reason is Apharwat: a long, lift-served, ungroomed face with a genuine vertical drop, sitting above a resort that also happens to have gentle nursery slopes. Very few mountains anywhere offer both to that degree.</p><h3>If you have never skied</h3><p>You will learn at Kongdoori, reached by Gondola Phase 1. The slopes there are wide and gentle, instruction is available from absolute beginner level, and the usual progression is: stopping on day one, linking turns by day three. Book an instructor for at least two days — a single lesson tends to leave people able to stop but not to turn, which is the most frustrating place to be.</p><h3>If you already ski</h3><p>Apharwat, via Gondola Phase 2, is the mountain. It is <strong>off-piste, ungroomed, unpatrolled terrain with real avalanche exposure</strong>. It is not a resort run with a rope at the edge. Hire a certified local guide, and treat anyone offering to take you up without one as a reason to walk away.</p><h3>When to come</h3><ul><li><strong>December</strong> — unreliable. The base is still building and lower runs can be thin.</li><li><strong>January and February</strong> — the season. Deepest, most consistent snow.</li><li><strong>March</strong> — skiable, but soft and patchy by afternoon as the days warm.</li></ul><h3>Gear</h3><p>Skis, boots and poles all hire locally, and the kit at Kongdoori is better maintained and cheaper than at the Gulmarg base. The two things worth bringing yourself are <strong>goggles and gloves</strong> — hire quality on both is genuinely poor, and the glare off Apharwat on a clear day is punishing enough that sunglasses will not do.</p><p>Finally: build a spare day into any ski trip here. Gulmarg loses days to weather every single season, and when Apharwat closes there is no substitute run to move to.</p>",
    quickAnswer:
      "Gulmarg is India's only serious ski mountain. Beginners learn on the gentle Kongdoori slopes with an instructor and hired kit; experienced skiers ride Gondola Phase 2 for the long Apharwat descents. The season runs roughly December to March, and January–February is when the snow is deepest and most reliable.",
    season: "Dec–Mar; deepest snow Jan–Feb",
    difficulty: "moderate",
    suitedFor: "Complete beginners upwards — the Kongdoori slopes are taught from zero",
    destinationSlug: "gulmarg",
    priceNote: "Kit hire per day. Instruction and lift passes are charged separately.",
    extraFacts: [
      { id: "skiing-f1", label: "Base altitude", value: "~2,650 m (Gulmarg)" },
      { id: "skiing-f2", label: "Top of lift", value: "~3,980 m (Apharwat)" },
      { id: "skiing-f3", label: "Lessons", value: "From absolute beginner" },
    ],
    whatToExpect: [
      {
        id: "skiing-s1",
        title: "Kit and fitting",
          body:
            "Skis, boots and poles are hired at the base or at Kongdoori. Allow half an hour for boot fitting — badly sized boots ruin a ski day faster than bad snow.",
      },
      {
        id: "skiing-s2",
        title: "First morning on the nursery slopes",
          body:
            "Beginners start on the gentle Kongdoori runs with an instructor. Most people are turning and stopping by the end of day one and linking turns by day three.",
      },
      {
        id: "skiing-s3",
        title: "Up to Apharwat",
          body:
            "Confident skiers take Gondola Phase 2 to about 3,980 m for long open descents. This is off-piste, ungroomed terrain — it is not a beginner's mountain and should not be skied without a guide.",
      },
      {
        id: "skiing-s4",
        title: "Weather days",
          body:
            "Gulmarg loses days to weather every season. Build one spare day into a ski trip, because a whiteout on Apharwat closes the lift and there is no substitute run.",
      },
    ],
    inclusions: [
      "Skis, boots and poles for the day",
    ],
    exclusions: [
      "Instructor fees, charged per session or per day",
      "Gondola Phase 1 and Phase 2 lift tickets",
      "Ski clothing, goggles and gloves",
      "Guide for off-piste Apharwat descents",
    ],
    bookingTips: [
      "Book an instructor for the first two days rather than one — a single lesson leaves most people able to stop but not to turn, which is the frustrating middle.",
      "Hire kit at Kongdoori rather than the Gulmarg base: it is cheaper and better maintained.",
      "Come in January or February for the snow. December is unreliable and March is soft and patchy by afternoon.",
    ],
    sartajTips: [
      "Off-piste Apharwat is genuinely serious terrain with avalanche risk, and it is skied on ungroomed snow with no patrol below you. Hire a certified local guide — this is not the place to save money.",
      "Goggles matter more than a jacket here. The glare off Apharwat on a clear day is punishing and sunglasses are not enough.",
      "The lift queue on a bluebird morning after a snowfall is the worst of the season. If it snowed overnight, be at the gondola before it opens or accept losing two hours.",
    ],
    faqs: [
      {
        id: "skiing-q1",
        question: "Can a complete beginner ski in Gulmarg?",
          answer:
            "Yes. The Kongdoori slopes are gentle and instruction is taught from zero. Most people are stopping and turning by the end of the first day. What beginners should not do is take Phase 2 to Apharwat, which is ungroomed off-piste terrain.",
      },
      {
        id: "skiing-q2",
        question: "When is the best time to ski in Gulmarg?",
          answer:
            "January and February. December snow is unreliable at the start of the season and March turns soft and patchy through the afternoon. If you have one week to pick, make it late January.",
      },
      {
        id: "skiing-q3",
        question: "Do I need my own ski equipment?",
          answer:
            "No. Skis, boots and poles are hired locally and the kit at Kongdoori is decent. Bring your own goggles and gloves if you can — those are the two items where hire quality is genuinely poor.",
      },
    ],
    bestMonths: ["jan-feb", "feb-mar", "mar-apr", "nov-dec"],
    title: "Skiing",
    location: "Kashmir",
    duration: "1 hour – 4 days",
    pricePerPerson: 5000,
    featured: true,
    rating: 4.5,
    gallery: gallery("skiing", [
      ["1551524559-8af4e6624178", "Skier turning through deep snow with pine-covered peaks behind"],
      ["1605540436563-5bca919ae766", "Ski tracks cut across an open white slope"],
      ["1548777123-e216912df7d8", "Skier silhouetted against a bright winter sky"],
      ["1516738901171-8eb4fc13bd20", "Snow-laden conifers lining a groomed piste"],
    ]),
  },
  {
    id: "act-5",
    slug: "gulmarg-paragliding",
    quickAnswer:
      "Tandem flights over the Gulmarg meadows with a certified pilot, launching from the open slopes above the base. Airtime is short — ten to twenty-five minutes — and entirely weather-dependent, so it belongs on a flexible day rather than a fixed one.",
    season: "Apr–Jun and Sep–Oct, weather permitting",
    difficulty: "moderate",
    suitedFor: "Anyone without vertigo or a heart condition; no experience needed",
    destinationSlug: "gulmarg",
    bestMonths: ["apr-may", "may-jun", "sep-oct", "oct-nov"],
    title: "Gulmarg Paragliding",
    location: "Kashmir",
    duration: "1 hour – 4 days",
    pricePerPerson: 5000,
    featured: true,
    rating: 4.5,
    gallery: gallery("gulmarg-paragliding", [
      ["1622163642998-1ea32b0bbc67", "Orange paraglider canopy against snow-capped peaks and blue sky"],
      ["1520250497591-112f2f40a3f4", "Tandem paraglider lifting off a grassy launch slope"],
      ["1626621341517-bbf3d9990a23", "Wide valley view from beneath a paraglider wing"],
    ]),
  },
  {
    id: "act-6",
    slug: "tulip-garden",
    quickAnswer:
      "Indira Gandhi Memorial Tulip Garden sits below the Zabarwan hills with Dal Lake beneath it, and opens for roughly three to four weeks from late March. Bloom dates move every year with the weather, and the garden is at its best in the first ten days after opening.",
    season: "Late Mar to mid Apr — dates announced yearly",
    difficulty: "easy",
    suitedFor: "Anyone; the garden is terraced with gentle paved paths",
    destinationSlug: "srinagar",
    bestMonths: ["mar-apr", "apr-may"],
    title: "Tulip Garden",
    location: "Kashmir",
    duration: "1 hour – 4 days",
    pricePerPerson: 5000,
    featured: true,
    rating: 4.5,
    gallery: gallery("tulip-garden", [
      ["1524492412937-b28074a5d7da", "Terraced garden beds below a hill ridge in warm evening light"],
      ["1522383225653-ed111181a951", "Rows of red and yellow tulips in flower"],
      ["1585320806297-9794b3e4eeae", "Garden path running between planted flower beds"],
    ]),
  },
  {
    id: "act-7",
    slug: "gondola-ride",
    timing: {
      booking: "required",
      bookingLeadTime: "Book Phase 1 online at least a day ahead from December to February.",
      weatherDependent: true,
      weatherNote:
        "Phase 2 to Apharwat is suspended for wind or poor visibility, often at an hour's notice. Phase 1 runs in most conditions.",
      verified: false,
      schedules: [
        {
          id: "gondola-summer",
          season: "Summer (Apr–Oct)",
          slots: [
            {
              id: "gondola-summer-p1",
              label: "Phase 1 — Kongdoori",
              opens: "10:00",
              closes: "17:00",
              lastEntry: "16:00",
            },
            {
              id: "gondola-summer-p2",
              label: "Phase 2 — Apharwat",
              opens: "10:00",
              closes: "16:00",
              lastEntry: "15:00",
            },
          ],
          note: "Last boarding is brought forward in poor weather without notice.",
        },
        {
          id: "gondola-winter",
          season: "Winter (Nov–Mar)",
          slots: [
            {
              id: "gondola-winter-p1",
              label: "Phase 1 — Kongdoori",
              opens: "10:00",
              closes: "16:00",
              lastEntry: "15:00",
            },
            {
              id: "gondola-winter-p2",
              label: "Phase 2 — Apharwat",
              opens: "10:00",
              closes: "15:30",
              lastEntry: "14:30",
            },
          ],
          note: "Shorter daylight, and the queue is at its longest on a clear morning after snowfall.",
        },
      ],
    },
    aboutHtml:
      "<p>The Gulmarg Gondola is the reason most people put Gulmarg on a Kashmir itinerary at all. It is one of the highest operating cable cars in the world, and it does something no other Kashmir activity manages: it takes a reader with no fitness, no gear and no experience from a meadow at 2,650 m to open snowfield at nearly 4,000 m in under half an hour.</p><h3>The two phases, and why the difference matters</h3><p><strong>Phase 1</strong> runs from the Gulmarg base to Kongdoori, at roughly 3,080 m. It operates in almost every season and in most weather. This is where the beginner ski slopes are, where the gear-hire stalls cluster, and where the majority of visitors spend their day quite happily without going any higher.</p><p><strong>Phase 2</strong> continues from Kongdoori to Apharwat Peak at about 3,980 m. It is a genuinely different proposition — thinner air, no shelter at the top, and a service that is suspended at short notice whenever wind or visibility turns. Treat it as a bonus you might get rather than the thing you came for.</p><h3>What the ride is actually like</h3><ul><li>Cabins seat six and are enclosed, so the ride itself is warm regardless of the temperature outside.</li><li>Phase 1 takes about eight minutes and climbs over dense pine forest.</li><li>Phase 2 crosses open snow with very little below you — worth knowing if heights are a problem.</li><li>There is no toilet at the Apharwat top station. Use the facilities at Kongdoori.</li></ul><h3>Who should stop at Kongdoori</h3><p>Anyone travelling with young children, anyone over seventy, and anyone with a heart or respiratory condition. Altitude sickness at Apharwat is common enough that the staff at the top station see it daily, and the only treatment available up there is to get back in a cabin and come down.</p><blockquote>If you do one thing differently after reading this page: book Phase 1 online before you travel. The counter queue on a clear February morning routinely costs visitors their entire morning in Gulmarg.</blockquote>",
    quickAnswer:
      "The Gulmarg Gondola climbs in two phases: Phase 1 to Kongdoori at about 3,080 m, Phase 2 on to Apharwat Peak at about 3,980 m. Phase 1 runs nearly all year; Phase 2 is weather-dependent and closes without notice. Book online — the counter queue in season is the longest wait in Kashmir.",
    season: "Phase 1 year round; Phase 2 Dec–Apr, snow-dependent",
    difficulty: "easy",
    suitedFor: "Anyone, but Phase 2 sits at altitude — skip it if breathlessness is a concern",
    destinationSlug: "gulmarg",
    priceNote: "Phase 1 fare. Phase 2 is ticketed separately and sells out first.",
    extraFacts: [
      { id: "gondola-ride-f1", label: "Top altitude", value: "~3,980 m (Apharwat Peak)" },
      { id: "gondola-ride-f2", label: "Phases", value: "2, ticketed separately" },
      { id: "gondola-ride-f3", label: "Booking", value: "Online, in advance" },
    ],
    whatToExpect: [
      {
        id: "gondola-ride-s1",
        title: "Arrive and collect tickets",
          body:
            "Gulmarg is roughly a 90-minute drive from Srinagar. With an online booking you go straight to the boarding line; without one, the counter queue on a February morning can run past an hour.",
      },
      {
        id: "gondola-ride-s2",
        title: "Phase 1 — up to Kongdoori",
          body:
            "An eight-minute cabin ride over pine forest to the Kongdoori bowl at about 3,080 m. This is where the beginner ski slopes are, and where most families stop and spend the day.",
      },
      {
        id: "gondola-ride-s3",
        title: "Phase 2 — Apharwat Peak",
          body:
            "A second cabin climbs to roughly 3,980 m onto open snowfield. The air is noticeably thinner and there is no shelter at the top. Expect 20–30 minutes up there before you want to come down.",
      },
      {
        id: "gondola-ride-s4",
        title: "Back down",
          body:
            "Allow three to four hours for both phases including queues. Last boarding is well before dusk and is brought forward in bad weather without warning.",
      },
    ],
    inclusions: [
      "Return cable-car fare for the phase booked",
      "Boarding assistance at both stations",
    ],
    exclusions: [
      "Phase 2 ticket, when only Phase 1 is booked",
      "Snow gear and boot hire at Kongdoori",
      "Sledge, ATV and pony rides at the top",
      "Cab fare from Srinagar to Gulmarg",
    ],
    bookingTips: [
      "Book Phase 1 online the night before at the latest — the counter queue is the single biggest time sink of a Gulmarg day.",
      "Take the first slot of the morning. Cloud builds through the afternoon and Phase 2 is usually the first thing suspended.",
      "Buy Phase 2 at the Kongdoori counter only after you have seen the weather at Phase 1 — it is refundable far less readily than it is sold.",
    ],
    sartajTips: [
      "Srinagar taxis cannot do local sightseeing inside Gulmarg — a separate union taxi takes over at the top of the road. Budget for both, and do not let anyone tell you at the gate that it is a surprise.",
      "Beyond Tangmarg in deep winter the road needs snow chains or a snow-jeep. A normal sedan gets turned back, and the ride is arranged at Tangmarg, not in Srinagar.",
      "Gear hire at Kongdoori is cheaper than at the Gulmarg base and the boots are in better condition. Walk past the first three stalls.",
    ],
    faqs: [
      {
        id: "gondola-ride-q1",
        question: "How much does the Gulmarg Gondola cost?",
          answer:
            "Phase 1 has run at roughly ₹900–1,400 per person in recent seasons, with Phase 2 ticketed separately. Treat those as guidance only — fares are revised by the corporation and we confirm the current rate when you enquire rather than quoting an old one.",
      },
      {
        id: "gondola-ride-q2",
        question: "Is Gondola Phase 2 always open?",
          answer:
            "No. Phase 2 runs only when the weather and snow allow, and it is suspended at short notice for wind or poor visibility. Phase 1 is far more reliable. Plan the day so that losing Phase 2 does not lose you the trip.",
      },
      {
        id: "gondola-ride-q3",
        question: "Can elderly people ride the gondola?",
          answer:
            "Phase 1, comfortably — it is a seated cabin ride with no climbing. Phase 2 puts you near 3,980 m, where breathlessness is common and there is no shelter. We usually advise older travellers and anyone with a heart condition to stop at Kongdoori.",
      },
      {
        id: "gondola-ride-q4",
        question: "Do I need to book the gondola in advance?",
          answer:
            "Yes, for Phase 1. Tickets are sold online and the on-site queue in peak season regularly costs visitors a full morning. It is the one Kashmir activity where booking ahead makes a material difference to your day.",
      },
    ],
    bestMonths: ["jan-feb", "feb-mar", "mar-apr", "apr-may", "may-jun", "jun-jul", "jul-aug", "aug-sep", "sep-oct", "oct-nov", "nov-dec"],
    title: "Gondola Ride",
    location: "Gulmarg",
    duration: "3 – 4 hours",
    pricePerPerson: 1400,
    rating: 4.7,
    gallery: gallery("gondola-ride", [
      ["1516738901171-8eb4fc13bd20", "Cable car cabin suspended above a snow-covered mountain slope"],
      ["1626621341517-bbf3d9990a23", "Gondola line running up towards a high ridge"],
      ["1548777123-e216912df7d8", "View down a snowfield from a cable-car window"],
    ]),
  },
  {
    id: "act-8",
    slug: "river-rafting",
    quickAnswer:
      "Rafting in Kashmir means the Lidder at Pahalgam, run in graded stretches from a short family float to an 8 km Grade III section. Operators supply helmet, life jacket and a guide in every raft. The water is snowmelt and genuinely cold, which is why the runs are short.",
    season: "Apr–Sep; highest water May–Jul",
    difficulty: "moderate",
    suitedFor: "Non-swimmers can raft the short stretch; the long run needs confidence in water",
    destinationSlug: "pahalgam",
    bestMonths: ["apr-may", "may-jun", "jun-jul", "jul-aug", "aug-sep"],
    title: "River Rafting",
    location: "Pahalgam",
    duration: "20 min – 1 hour",
    pricePerPerson: 1500,
    rating: 4.4,
    gallery: gallery("river-rafting", [
      ["1530866495561-507c9faab2ed", "Inflatable raft with paddlers running a stretch of white water"],
      ["1544551763-46a013bb70d5", "Fast shallow river running over boulders"],
      ["1517649763962-0c623066013b", "Rafting crew in helmets and life jackets mid-rapid"],
    ]),
  },
  {
    id: "act-9",
    slug: "trekking",
    quickAnswer:
      "Kashmir's trekking runs from short meadow walks anyone can manage to the multi-day Kashmir Great Lakes and Tarsar Marsar routes. The long routes are summer only, need a registered guide and permits, and are graded on sustained altitude rather than technical difficulty.",
    season: "Jun–Sep for high routes; Apr–Oct for day walks",
    difficulty: "challenging",
    suitedFor: "Day walks suit most people; multi-day routes need real fitness and a guide",
    destinationSlug: "sonamarg",
    bestMonths: ["jun-jul", "jul-aug", "aug-sep", "sep-oct"],
    title: "Valley Trekking",
    location: "Sonamarg",
    duration: "1 – 7 days",
    pricePerPerson: 3500,
    rating: 4.6,
    gallery: gallery("trekking", [
      ["1551632811-561732d1e306", "Trekkers crossing an alpine meadow below bare rock ridges"],
      ["1454496522488-7a8e488e8606", "Mountain trail winding towards a high pass"],
      ["1464822759023-fed622ff2c3b", "Alpine lake held in a bowl of grey rock"],
      ["1519681393784-d120267933ba", "Snow-dusted peaks under a clear night sky"],
    ]),
  },
  {
    id: "act-10",
    slug: "camping",
    quickAnswer:
      "Camping splits in two. Serviced camps at Pahalgam, Aru and Sonamarg give you a furnished tent, attached bath and meals — closer to a hotel than to camping. Trek camps on the high routes are carried in and pitched on open meadow. Nights are cold even in July.",
    season: "May–Sep",
    difficulty: "moderate",
    suitedFor: "Serviced camps suit families; trek camps need the fitness of the route",
    destinationSlug: "pahalgam",
    bestMonths: ["may-jun", "jun-jul", "jul-aug", "aug-sep"],
    title: "Riverside Camping",
    location: "Pahalgam",
    duration: "1 – 3 nights",
    pricePerPerson: 2500,
    rating: 4.3,
    gallery: gallery("camping", [
      ["1504280390367-361c6d9f38f4", "Dome tents pitched on grass beside a river with pine slopes behind"],
      ["1478131143081-80f7f84ca84d", "Lit tent glowing at dusk on an open meadow"],
      ["1510312305653-8ed496efae75", "Camp chairs and a fire ring beside running water"],
    ]),
  },
  {
    id: "act-11",
    slug: "trout-angling",
    quickAnswer:
      "Kashmir's trout streams are run as numbered beats under the Fisheries Department — you buy a day permit for a specific beat with a daily catch limit, not open access. The Lidder at Pahalgam and the Sind at Sonamarg are the classic waters, and permits are limited.",
    season: "Apr–Sep (official angling season)",
    difficulty: "easy",
    suitedFor: "Anyone patient; a ghillie can be hired if you have never cast",
    destinationSlug: "pahalgam",
    bestMonths: ["apr-may", "may-jun", "jun-jul", "jul-aug", "aug-sep"],
    title: "Trout Angling",
    location: "Lidder River",
    duration: "Half day – full day",
    pricePerPerson: 2000,
    rating: 4.2,
    gallery: gallery("trout-angling", [
      ["1445307806294-bff7f67ff225", "Angler casting a fly line into a shallow, fast-running river"],
      ["1544551763-46a013bb70d5", "Clear mountain stream running over pale stones"],
      ["1499242611767-cf8b9be02854", "Fly rod and reel resting on a mossy river bank"],
    ]),
  },
  {
    id: "act-12",
    slug: "golf",
    timing: {
      booking: "recommended",
      bookingLeadTime: "Call ahead for a tee time at weekends.",
      weatherDependent: false,
      verified: false,
      // Year-round closure, so it belongs here rather than inside the one
      // schedule — see the field's doc comment.
      weeklyOff: ["mon"],
      schedules: [
        {
          id: "golf-season",
          season: "Playing season (Apr–Oct)",
          slots: [
            {
              id: "golf-day",
              label: "Tee times",
              opens: "07:00",
              closes: "18:00",
              lastEntry: "14:00",
            },
          ],
          note: "Monday is course maintenance. Last tee-off allows time for a full eighteen before dusk.",
        },
      ],
    },
    quickAnswer:
      "Kashmir has two courses worth the trip: Gulmarg Golf Course, among the highest 18-hole greens in the world at about 2,650 m, and Royal Springs in Srinagar along Dal Lake. Both take visitor green fees and hire out clubs, and both are playable only once the snow clears.",
    season: "Apr–Oct",
    difficulty: "easy",
    suitedFor: "Golfers of any handicap; caddies available at both courses",
    destinationSlug: "gulmarg",
    bestMonths: ["apr-may", "may-jun", "jun-jul", "jul-aug", "aug-sep", "sep-oct"],
    title: "Highland Golf",
    location: "Gulmarg",
    duration: "4 – 5 hours",
    pricePerPerson: 3000,
    rating: 4.4,
    gallery: gallery("golf", [
      ["1587174486073-ae5e5cff23aa", "Mown golf fairway running towards tall conifers and a hill ridge"],
      ["1535131749006-b7f58c99034b", "Golf green with a flagstick against open sky"],
      ["1592919505780-303950717480", "Fairway bunkers cut into rolling mown grass"],
    ]),
  },
  // The two winter-only entries below exist so the Jan–Feb / Feb–Mar / Nov–Dec
  // tabs are not down to two cards. Kashmir genuinely has little else running
  // in deep winter, so this is thin by nature rather than by oversight — worth
  // remembering when the real catalogue replaces this file.
  {
    id: "act-13",
    slug: "snowboarding",
    quickAnswer:
      "Gulmarg rides the same mountain as its skiing — gentle Kongdoori slopes to learn on, and long ungroomed Apharwat descents above Gondola Phase 2. Board and boot hire is available at the base and at Kongdoori, and instruction is taught from zero.",
    season: "Dec–Mar; deepest snow Jan–Feb",
    difficulty: "moderate",
    suitedFor: "Beginners upwards; Apharwat is for confident riders with a guide",
    destinationSlug: "gulmarg",
    bestMonths: ["jan-feb", "feb-mar", "nov-dec"],
    title: "Snowboarding",
    location: "Gulmarg",
    duration: "Half day – multi-day",
    pricePerPerson: 4000,
    rating: 4.6,
    gallery: gallery("snowboarding", [
      ["1522056615691-da7b8106c665", "Snowboarder carving through loose powder on an open slope"],
      ["1551524559-8af4e6624178", "Board tracks cut down a steep white face"],
      ["1548777123-e216912df7d8", "Rider silhouetted against bright winter cloud"],
    ]),
  },
  {
    id: "act-14",
    slug: "snow-trekking",
    quickAnswer:
      "Winter walking on packed snow, from short meadow routes above Gulmarg to two- and three-day crossings with overnight camps. Snowshoes are provided where the route needs them. Cold, not technical — but daylight is short and the weather turns fast.",
    season: "Dec–Mar",
    difficulty: "moderate",
    suitedFor: "Reasonable fitness; no technical skill needed on the day routes",
    destinationSlug: "gulmarg",
    bestMonths: ["jan-feb", "feb-mar", "mar-apr", "nov-dec"],
    title: "Snow Trekking",
    location: "Gulmarg & Pahalgam",
    duration: "1 – 3 days",
    pricePerPerson: 4500,
    rating: 4.5,
    gallery: gallery("snow-trekking", [
      ["1454496522488-7a8e488e8606", "Trekker on a snow ridge looking towards distant peaks at sunrise"],
      ["1519681393784-d120267933ba", "Snow-covered summits under a clear cold sky"],
      ["1464822759023-fed622ff2c3b", "Footprints crossing a wind-scoured snowfield"],
    ]),
  },
];

export function getActivities(): ExperienceActivity[] {
  return EXPERIENCE_ACTIVITIES;
}

/** Everything worth doing in one month window, in authored order. */
export function getActivitiesByMonth(
  window: MonthWindowId,
  activities: ExperienceActivity[] = EXPERIENCE_ACTIVITIES,
): ExperienceActivity[] {
  return activities.filter((activity) => activity.bestMonths.includes(window));
}

export function getActivityBySlug(slug: string): ExperienceActivity | undefined {
  return EXPERIENCE_ACTIVITIES.find((activity) => activity.slug === slug);
}

/**
 * Related activities for a detail page — same destination first, then whatever
 * else shares a month window, never the activity itself.
 *
 * SOP B3 wants every deep page to link ACROSS to at least two genuine siblings.
 * "Genuine" is why this is not just the next N in the array: a snowboarding
 * page linking to trout angling is a footer dump with extra steps.
 *
 * The pool is passed in so the same ranking runs over the CMS collection — see
 * getRelatedActivityPages in src/lib/experienceActivityPage.ts. Identity is the
 * SLUG, not the id: a static record and its seeded CMS twin share a slug but
 * not an id, and matching on id would let a page list itself.
 */
export function rankRelatedActivities<T extends ExperienceActivity>(
  activity: ExperienceActivity,
  pool: T[],
  limit = 3,
): T[] {
  const others = pool.filter((item) => item.slug !== activity.slug);

  const sameDestination = others.filter(
    (item) =>
      activity.destinationSlug && item.destinationSlug === activity.destinationSlug,
  );
  const sharesSeason = others.filter(
    (item) =>
      !sameDestination.includes(item) &&
      item.bestMonths.some((month) => activity.bestMonths.includes(month)),
  );

  return [...sameDestination, ...sharesSeason, ...others]
    .filter((item, index, list) => list.indexOf(item) === index)
    .slice(0, limit);
}

/** The same ranking over the static file alone. */
export function getRelatedActivities(
  activity: ExperienceActivity,
  limit = 3,
): ExperienceActivity[] {
  return rankRelatedActivities(activity, EXPERIENCE_ACTIVITIES, limit);
}

/** Where a card points. Centralised so the route lives in exactly one place. */
export function activityHref(activity: ExperienceActivity): string {
  return `/experiences/${activity.slug}/`;
}
