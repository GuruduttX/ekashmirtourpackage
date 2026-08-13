/**
 * Taxonomy behind /stays/[slug].
 *
 * TYPES  — a fixed set of four. Slug is the plural bare word: /stays/houseboats
 * PLACES — open-ended, slug is "<place>-stays": /stays/srinagar-stays
 *
 * Copy here is STATIC placeholder content and moves to the CMS later. Keep the
 * field shape stable so the CMS record can drop straight in.
 * All prices remain [VERIFY 2026-27].
 */

import type { StayCategory } from "@/data/stays";

/* ------------------------------------------------------------------ */
/* Stay types — fixed, hard-coded                                      */
/* ------------------------------------------------------------------ */

export type StayTypeDef = {
  /** URL segment, e.g. "houseboats" → /stays/houseboats */
  slug: string;
  category: StayCategory;
  /** H1 */
  title: string;
  /** 40–60 word answer-first block. */
  answerBlock: string;
  bestFor: string;
  metaTitle: string;
  metaDescription: string;
  /** Static hero image for this type. */
  image: string;
  alt: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export const STAY_TYPES: StayTypeDef[] = [
  {
    slug: "houseboats",
    category: "Houseboat",
    title: "Kashmir Houseboats",
    answerBlock:
      "Kashmir houseboats are carved cedar boats moored on Dal and Nigeen lakes, from about ₹2,500 a night with breakfast and a shikara transfer. They are the valley's signature stay — best booked for one or two nights rather than a whole trip.",
    bestFor: "Couples & first-timers",
    metaTitle: "Kashmir Houseboats 2026 | Dal & Nigeen Lake Rates, Best Ghats",
    metaDescription:
      "Houseboats on Dal and Nigeen lakes from ₹2,500/night — which ghats are quietest, what the tariff includes, and on-ground tips from a 20-year Srinagar local.",
    image: img("1566073771259-6a8506099945"),
    alt: "Carved cedar houseboats moored along Dal Lake at sunrise",
  },
  {
    slug: "hotels",
    category: "Hotel",
    title: "Kashmir Hotels",
    answerBlock:
      "Hotels across Srinagar, Pahalgam and Sonamarg start from about ₹1,800 a night with breakfast. They are the practical choice for sightseeing days — ask for a lake-facing room in writing, because a lake-facing hotel is not the same thing.",
    bestFor: "Families & busy itineraries",
    metaTitle: "Hotels in Kashmir 2026 | Best Areas, Prices & Where to Book",
    metaDescription:
      "Kashmir hotels from ₹1,800/night across Srinagar, Pahalgam and Sonamarg — which areas are worth the premium and which rooms actually face the lake.",
    image: img("1578683010236-d716f9a3f461"),
    alt: "Lake-facing hotel on Boulevard Road, Srinagar",
  },
  {
    slug: "resorts",
    category: "Resort",
    title: "Kashmir Resorts",
    answerBlock:
      "Kashmir resorts run from about ₹2,600 a night at Yusmarg to ₹14,000 on the hillsides above Dal Lake, with Gulmarg's ski properties in between. You are buying grounds, quiet and a view — and you will drive to everything else.",
    bestFor: "Honeymooners & skiers",
    metaTitle: "Kashmir Resorts 2026 | Gulmarg Ski Stays & Lake-View Luxury",
    metaDescription:
      "Kashmir resorts from ₹2,600/night — Gulmarg ski properties, hillside luxury above Dal Lake and quiet meadow cottages, with honest notes on what each costs you.",
    image: img("1551882547-ff40c63fe5fa"),
    alt: "Snow-covered pine-wood resort in Gulmarg",
  },
  {
    slug: "homestays",
    category: "Homestay",
    title: "Kashmir Homestays",
    answerBlock:
      "Kashmiri homestays start from about ₹1,200 a night and usually include meals cooked by the host family. They are the best value in the valley and the only reliable way to eat proper Wazwan — expect shared bathrooms at the lower end.",
    bestFor: "Budget & slow travellers",
    metaTitle: "Kashmir Homestays 2026 | Prices, Meals & What to Expect",
    metaDescription:
      "Kashmiri homestays from ₹1,200/night in Pahalgam, Aru and Yusmarg — home-cooked meals, what the rooms are really like, and how to spot a genuine family host.",
    image: img("1493809842364-78817add7ffb"),
    alt: "Kashmiri family homestay courtyard in Pahalgam",
  },
];

export function getStayType(slug: string): StayTypeDef | null {
  return STAY_TYPES.find((type) => type.slug === slug) ?? null;
}

/* ------------------------------------------------------------------ */
/* Places — open-ended, matched on town OR area                        */
/* ------------------------------------------------------------------ */

/** Mirrors IStayPlaceTip — see src/types/stayPlaceTypes.ts */
export type StayPlaceTip = { id: string; title: string; tip: string };

/** Mirrors IStayPlaceFaq */
export type StayPlaceFaq = { id: string; question: string; answer: string };

export type StayPlaceDef = {
  /** Place key, WITHOUT the "-stays" suffix. URL = `${slug}-stays`. */
  slug: string;
  /** Display name, e.g. "Srinagar" */
  name: string;
  /** H1 */
  title: string;
  answerBlock: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  alt: string;
  /** On-ground truths — the information gain over the OTAs. */
  sartajTips: StayPlaceTip[];
  /** Place-level FAQs. Rendered and emitted as FAQPage schema. */
  faqs: StayPlaceFaq[];
  /** SOP B3 — every place page links across to its destination + cab route. */
  links: { destination: string; cabRoute: string };
};

export const STAY_PLACES: StayPlaceDef[] = [
  {
    slug: "srinagar",
    name: "Srinagar",
    title: "Where to Stay in Srinagar",
    answerBlock:
      "Srinagar stays start from about ₹1,800 a night. Boulevard Road puts you on the lake at the highest price per square foot in the city; Rajbagh and Gogji Bagh are ten minutes away, quieter and often 30% cheaper. Houseboats sit on Dal and Nigeen.",
    metaTitle: "Where to Stay in Srinagar 2026 | Best Areas, Hotels & Houseboats",
    metaDescription:
      "Srinagar stays from ₹1,800/night — Boulevard Road vs Rajbagh vs Nigeen, houseboats vs hotels, and which rooms actually face Dal Lake.",
    image: img("1578683010236-d716f9a3f461"),
    alt: "Hotels and houseboats along Dal Lake in Srinagar",
    sartajTips: [
      {
        id: "t1",
        title: "Pick the neighbourhood, not the star rating",
        tip: "Boulevard Road is the most expensive stretch per square foot in the city and you are paying for the walk to the ghats. Rajbagh and Gogji Bagh are ten minutes away, quieter, and often 30% cheaper for the same standard of room.",
      },
      {
        id: "t2",
        title: "A lake-facing hotel is not a lake-facing room",
        tip: "On Boulevard Road only the third floor and above has a clear view. Get the room category in writing before you pay, not just the hotel name.",
      },
      {
        id: "t3",
        title: "Split your nights",
        tip: "One night on a houseboat and the rest in a hotel beats a full week on the water. You get the experience without losing every evening to a shikara ride.",
      },
    ],
    faqs: [
      {
        id: "f1",
        question: "Which area is best to stay in Srinagar?",
        answer:
          "Boulevard Road for the lake view and walkability, Rajbagh or Gogji Bagh for quiet and value, and near Lal Chowk if you are shopping. All three are within a 15-minute drive of each other.",
      },
      {
        id: "f2",
        question: "How much does a stay in Srinagar cost per night?",
        answer:
          "Clean three-star rooms start around \u20b91,800 with breakfast. Lake-facing four-star rooms on Boulevard Road run \u20b94,200 and up, houseboats from \u20b92,500, and hillside luxury resorts from \u20b914,000.",
      },
      {
        id: "f3",
        question: "Is there heating in Srinagar hotels in winter?",
        answer:
          "Most established hotels have central heating, but budget properties and houseboats often rely on a bukhari wood stove or a portable heater. Between December and February, confirm which one before paying an advance.",
      },
    ],
    links: { destination: "/destinations/srinagar/", cabRoute: "/cab-service/" },
  },
  {
    slug: "dal-lake",
    name: "Dal Lake",
    title: "Where to Stay on Dal Lake",
    answerBlock:
      "Dal Lake stays are houseboats from about ₹2,500 a night plus the hotels lining Boulevard Road. The Ghat 9 to 16 stretches are the quietest water; the stretch directly opposite Boulevard Road is the busiest and noisiest in Srinagar.",
    metaTitle: "Where to Stay on Dal Lake 2026 | Houseboats, Ghats & Hotels",
    metaDescription:
      "Dal Lake stays from ₹2,500/night — which ghats are quietest, houseboat vs Boulevard Road hotel, and what the tariff should include.",
    image: img("1566073771259-6a8506099945"),
    alt: "Houseboats moored on Dal Lake, Srinagar",
    sartajTips: [
      {
        id: "t1",
        title: "Choose your ghat carefully",
        tip: "The water directly opposite Boulevard Road is the busiest and noisiest in Srinagar. Ghats 9 to 16 are calmer, and you are still only a short shikara ride from the Boulevard.",
      },
      {
        id: "t2",
        title: "Check what the tariff actually covers",
        tip: "The arrival and departure shikara transfer should be included. Several boats bill it separately at checkout, so get it confirmed in writing.",
      },
      {
        id: "t3",
        title: "Winter means checking the bukhari",
        tip: "From December to February confirm the wood stove and the backup electric heater both work. A beautiful boat with no heat is a very long night.",
      },
    ],
    faqs: [
      {
        id: "f1",
        question: "How much does a Dal Lake houseboat cost per night?",
        answer:
          "Deluxe houseboats start around \u20b92,500 per night with breakfast; deck suites with all meals run \u20b93,800 and up. Rates rise sharply during the Tulip Festival and Christmas week.",
      },
      {
        id: "f2",
        question: "Is Dal Lake clean enough to stay on?",
        answer:
          "It depends entirely on the stretch. The central stretch near Boulevard Road carries the most traffic; the Ghat 9 to 16 moorings and Nigeen Lake are noticeably cleaner and quieter.",
      },
      {
        id: "f3",
        question: "Can I stay on Dal Lake without a houseboat?",
        answer:
          "Yes. Boulevard Road runs along the lake edge and its hotels give you the same view with easier access to sightseeing, which suits travellers with a packed itinerary.",
      },
    ],
    links: { destination: "/destinations/srinagar/", cabRoute: "/cab-service/" },
  },
  {
    slug: "gulmarg",
    name: "Gulmarg",
    title: "Where to Stay in Gulmarg",
    answerBlock:
      "Gulmarg stays start near ₹5,500 a night in season at 2,650 m, where heating matters more than the view. Staying in Gulmarg itself saves you the daily Tangmarg climb — critical in January when the road needs snow chains.",
    metaTitle: "Where to Stay in Gulmarg 2026 | Ski Resorts, Rates & Winter Tips",
    metaDescription:
      "Gulmarg stays from ₹5,500/night — which properties are walking distance from the Gondola, what heating to insist on, and why Gulmarg beats Tangmarg.",
    image: img("1551882547-ff40c63fe5fa"),
    alt: "Snow-covered resort in Gulmarg with the Affarwat range behind",
    sartajTips: [
      {
        id: "t1",
        title: "Stay up in Gulmarg, not Tangmarg",
        tip: "Anything advertised as \u201cnear Gulmarg\u201d is usually Tangmarg, 13 km below. In deep winter that climb needs a snow-jeep with chains and closes without warning \u2014 which can cost you a full ski day.",
      },
      {
        id: "t2",
        title: "Your Srinagar sedan cannot make the climb",
        tip: "From December to February you change to a snow-jeep beyond Tangmarg. Budget for it rather than discovering it at the roadblock.",
      },
      {
        id: "t3",
        title: "Book the Gondola before you arrive",
        tip: "The Phase 1 ticket queue in January can swallow an entire morning. Book ahead and you ski while everyone else queues.",
      },
    ],
    faqs: [
      {
        id: "f1",
        question: "Should I stay in Gulmarg or day-trip from Srinagar?",
        answer:
          "Stay overnight if you plan to ski or want first light on Affarwat. A day trip works in summer, but in deep winter the road can shut and you lose the whole day.",
      },
      {
        id: "f2",
        question: "How much do Gulmarg stays cost?",
        answer:
          "In-season resorts start around \u20b95,500 per night, with slope-view suites from \u20b99,500. Rates roughly halve between April and October, when Gulmarg becomes a green meadow walk.",
      },
      {
        id: "f3",
        question: "Do Gulmarg properties have proper heating?",
        answer:
          "The established resorts have central heating, which matters at 2,650 m. Confirm it is central rather than a portable heater before booking a winter stay.",
      },
    ],
    links: {
      destination: "/destinations/gulmarg/",
      cabRoute: "/cab-service/srinagar-to-gulmarg/",
    },
  },
  {
    slug: "pahalgam",
    name: "Pahalgam",
    title: "Where to Stay in Pahalgam",
    answerBlock:
      "Pahalgam stays start near ₹1,200 a night for a homestay and ₹2,200 for a hotel. Rooms along the Lidder are worth the premium — you get the river instead of the pony-stand road. Stay two nights to do Aru and Betaab properly.",
    metaTitle: "Where to Stay in Pahalgam 2026 | River-Facing Hotels & Homestays",
    metaDescription:
      "Pahalgam stays from ₹1,200/night — which hotels actually face the Lidder, how many nights you need for Aru and Betaab, and what to avoid on the main road.",
    image: img("1522708323590-d24dbb6b0267"),
    alt: "Riverside hotel beside the Lidder in Pahalgam",
    sartajTips: [
      {
        id: "t1",
        title: "Pay for the river, not the star rating",
        tip: "River-facing rooms on the Lidder cost roughly double and are the one upgrade genuinely worth it here. You get running water instead of the pony-stand road, which is loud from 7 AM.",
      },
      {
        id: "t2",
        title: "Your Srinagar cab cannot do local sightseeing",
        tip: "Aru, Betaab and Chandanwari are reserved for Pahalgam union taxis. Your Srinagar cab brings you in and takes you out \u2014 budget separately for the local run.",
      },
      {
        id: "t3",
        title: "Two nights, not one",
        tip: "One night gives you the drive and the market. Two lets you do Aru and Betaab properly, and Chandanwari if the road is open.",
      },
    ],
    faqs: [
      {
        id: "f1",
        question: "How many nights should I stay in Pahalgam?",
        answer:
          "Two. A single night is consumed by the drive in and the market; two nights let you see Aru and Betaab without rushing either.",
      },
      {
        id: "f2",
        question: "How much do stays in Pahalgam cost?",
        answer:
          "Homestays start around \u20b91,200 a night including meals, standard hotel rooms from \u20b92,200, and river-facing rooms from \u20b94,800.",
      },
      {
        id: "f3",
        question: "Are the riverside hotels noisy?",
        answer:
          "The river itself is the noise, which most people find helps them sleep. The genuinely loud option is a main-market hotel on the pony-stand road.",
      },
    ],
    links: {
      destination: "/destinations/pahalgam/",
      cabRoute: "/cab-service/srinagar-to-pahalgam/",
    },
  },
  {
    slug: "sonamarg",
    name: "Sonamarg",
    title: "Where to Stay in Sonamarg",
    answerBlock:
      "Sonamarg stays start near ₹2,800 a night and are strictly seasonal — most properties close from November to April when the Zoji La road shuts. An overnight is the only way to reach Thajiwas glacier before the day-trippers.",
    metaTitle: "Where to Stay in Sonamarg 2026 | Seasonal Lodges & Glacier Access",
    metaDescription:
      "Sonamarg stays from ₹2,800/night — when properties are actually open, why an overnight beats a day trip, and how to reach Thajiwas before the crowds.",
    image: img("1600585154340-be6161a56a0c"),
    alt: "Riverside lodge in Sonamarg with snow peaks behind",
    sartajTips: [
      {
        id: "t1",
        title: "Check the property is even open",
        tip: "Most Sonamarg properties operate May to October only. The Zoji La road closes with snow and the town effectively shuts from November to April.",
      },
      {
        id: "t2",
        title: "The overnight is the whole point",
        tip: "Day-trippers from Srinagar reach Thajiwas around 11 AM. Sleep here, start at 8, and you have the glacier path to yourself.",
      },
      {
        id: "t3",
        title: "Agree the pony rate before you mount",
        tip: "Pony rates to Thajiwas are negotiated, not fixed. Settle the price and the turnaround point on the ground, before you get on.",
      },
    ],
    faqs: [
      {
        id: "f1",
        question: "Are Sonamarg hotels open in winter?",
        answer:
          "Mostly no. The Zoji La road closes with snow and most properties shut from November to April. Confirm the opening window before booking outside May to October.",
      },
      {
        id: "f2",
        question: "Is it worth staying overnight in Sonamarg?",
        answer:
          "If the glacier matters to you, yes. The 2.5-hour drive each way makes for a rushed day trip, and an overnight puts you at Thajiwas hours before the buses.",
      },
      {
        id: "f3",
        question: "How far is Sonamarg from Srinagar?",
        answer:
          "About 80 km, roughly 2.5 hours by road. It is a long day trip and a comfortable overnight.",
      },
    ],
    links: {
      destination: "/destinations/sonamarg/",
      cabRoute: "/cab-service/srinagar-to-sonamarg/",
    },
  },
  {
    slug: "yusmarg",
    name: "Yusmarg",
    title: "Where to Stay in Yusmarg",
    answerBlock:
      "Yusmarg stays start near ₹1,800 a night, 47 km south-west of Srinagar. It is the quietest meadow in the valley because almost no tour buses come here — which also means no market and no ATM. Bring cash and book meals in.",
    metaTitle: "Where to Stay in Yusmarg 2026 | Meadow Cottages & Access",
    metaDescription:
      "Yusmarg stays from ₹1,800/night in the valley's quietest hill station, 47 km from Srinagar — what facilities exist and why you should carry cash.",
    image: img("1505693416388-ac5ce068fe85"),
    alt: "Wooden cottages on the Yusmarg meadow",
    sartajTips: [
      {
        id: "t1",
        title: "Carry cash",
        tip: "There is no ATM in Yusmarg and card acceptance is unreliable. Draw what you need in Srinagar before you leave.",
      },
      {
        id: "t2",
        title: "Book a property that serves all meals",
        tip: "There is no market to speak of here. A room-only booking means a long drive every time you are hungry.",
      },
      {
        id: "t3",
        title: "Go before it changes",
        tip: "Yusmarg gets a fraction of Gulmarg\u2019s visitors for a meadow that is arguably prettier in summer. That will not last forever.",
      },
    ],
    faqs: [
      {
        id: "f1",
        question: "How far is Yusmarg from Srinagar?",
        answer:
          "About 47 km, roughly 1.5 hours by road via Chadoora. It works as a day trip but is a much better overnight.",
      },
      {
        id: "f2",
        question: "Is Yusmarg worth visiting?",
        answer:
          "If you want quiet meadows and pine forest without crowds, yes. If you want activities, shops and restaurants, Gulmarg or Pahalgam will suit you far better.",
      },
      {
        id: "f3",
        question: "Are meals included in Yusmarg cottages?",
        answer:
          "All meals are normally included in the cottage tariff, which matters here because there is effectively nowhere else to eat.",
      },
    ],
    links: { destination: "/destinations/yusmarg/", cabRoute: "/cab-service/" },
  },
  {
    slug: "aru",
    name: "Aru",
    title: "Where to Stay in Aru Valley",
    answerBlock:
      "Aru valley stays start near ₹1,200 a night including meals, 11 km above Pahalgam at the trailhead for Lidderwat and Kolahoi. Signal is patchy and hot water is bucket-fed at the cheaper houses — which is why the valley still feels like the valley.",
    metaTitle: "Where to Stay in Aru Valley 2026 | Trek Base Homestays & Rates",
    metaDescription:
      "Aru valley stays from ₹1,200/night — the base for Lidderwat and Kolahoi treks, what facilities to actually expect, and how to get up from Pahalgam.",
    image: img("1568605114967-8130f3a36994"),
    alt: "Village homestay in Aru valley surrounded by meadow and pine",
    sartajTips: [
      {
        id: "t1",
        title: "Sleep at the trailhead",
        tip: "Aru is where the Lidderwat and Kolahoi treks actually start. Staying down in Pahalgam costs you the best two hours of morning light.",
      },
      {
        id: "t2",
        title: "Expect bucket-fed hot water at village rates",
        tip: "Below roughly \u20b91,500 a night, assume a shared bathroom and bucket hot water. That is normal here, not a property cutting corners.",
      },
      {
        id: "t3",
        title: "Download your maps in Pahalgam",
        tip: "Mobile signal above Pahalgam is unreliable and UPI drops with it. Carry cash and tell someone your plan before you drive up.",
      },
    ],
    faqs: [
      {
        id: "f1",
        question: "How do I get to Aru valley?",
        answer:
          "It is 11 km from Pahalgam on a narrow mountain road, about 40 minutes by local taxi. Srinagar cabs cannot run this route \u2014 you take a Pahalgam union taxi.",
      },
      {
        id: "f2",
        question: "Is Aru worth staying in over Pahalgam?",
        answer:
          "For trekkers and photographers, yes \u2014 you start at the trailhead and get the meadow before the day visitors. For general sightseeing, Pahalgam has far more choice.",
      },
      {
        id: "f3",
        question: "Is there mobile signal in Aru?",
        answer:
          "Patchy at best, and it drops out entirely on the trails above the village. Download offline maps before you leave Pahalgam.",
      },
    ],
    links: {
      destination: "/destinations/aru/",
      cabRoute: "/cab-service/srinagar-to-pahalgam/",
    },
  },
  {
    slug: "nigeen-lake",
    name: "Nigeen Lake",
    title: "Where to Stay on Nigeen Lake",
    answerBlock:
      "Nigeen Lake stays are houseboats from about ₹3,200 a night on noticeably cleaner, quieter water than central Dal. You trade six extra kilometres to Boulevard Road for no shikara traffic outside your window.",
    metaTitle: "Where to Stay on Nigeen Lake 2026 | Quiet Houseboats & Rates",
    metaDescription:
      "Nigeen Lake houseboats from ₹3,200/night — cleaner and calmer than central Dal, what's included, and why repeat visitors to Srinagar move here.",
    image: img("1512918728675-ed5a9ecdebfd"),
    alt: "Houseboats on the calm water of Nigeen Lake",
    sartajTips: [
      {
        id: "t1",
        title: "This is where the locals send repeat visitors",
        tip: "If someone told you Dal Lake was dirty, they stayed in the wrong stretch. Nigeen is calmer, cleaner and has almost no shikara traffic outside your window.",
      },
      {
        id: "t2",
        title: "Pick your bank for the light",
        tip: "West-bank boats get the sunset; east-bank boats get sunrise over Hari Parbat. Decide which one you actually want to wake up for.",
      },
      {
        id: "t3",
        title: "Budget the extra travel time",
        tip: "Nigeen is about 6 km from Boulevard Road. Add fifteen minutes to the start of every sightseeing day.",
      },
    ],
    faqs: [
      {
        id: "f1",
        question: "Is Nigeen Lake better than Dal Lake for a houseboat?",
        answer:
          "For quiet and water quality, yes. Nigeen has far fewer boats and almost no shikara traffic. Dal wins on convenience \u2014 it is closer to Boulevard Road, the Mughal Gardens and the Old City.",
      },
      {
        id: "f2",
        question: "How much do Nigeen houseboats cost?",
        answer:
          "Heritage boats start around \u20b93,200 per night with all meals, and royal suites with a private deck run \u20b95,800 and up.",
      },
      {
        id: "f3",
        question: "How far is Nigeen Lake from Srinagar airport?",
        answer:
          "Roughly 18 km, about 45 minutes depending on city traffic. Most boats arrange an airport pickup for \u20b9700\u20131,300.",
      },
    ],
    links: { destination: "/destinations/srinagar/", cabRoute: "/cab-service/" },
  },
];

export function getStayPlace(slug: string): StayPlaceDef | null {
  return STAY_PLACES.find((place) => place.slug === slug) ?? null;
}
