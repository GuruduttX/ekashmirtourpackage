/**
 * TEMPORARY placeholder data for the /stays pages.
 *
 * Each entry is an INDIVIDUAL PROPERTY. Type pages (/stays/houseboats) and
 * place pages (/stays/srinagar-stays) are built by filtering this list — see
 * src/data/stayTaxonomy.ts for those.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * DO NOT PUBLISH AS-IS.
 *
 * • Property names are generic placeholders, not real businesses. Publishing
 *   invented property names, addresses or tariffs would be fabricated records.
 *   Every one must be replaced with a real, verified property before launch.
 * • Every price is an unverified example figure [VERIFY 2026-27].
 * • Photos are generic Unsplash stock, NOT these properties (SOP B5 requires
 *   real Kashmir photography of the real stays).
 * • No review / rating data on purpose — AggregateRating is only allowed once
 *   genuine on-page reviews exist.
 *
 * This all becomes CMS-backed later; the shape below is the contract.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Placeholder image helper — delete this once real photos are uploaded. */
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export type StayOption = {
  id: string;
  /** e.g. "Deluxe room", "Heritage suite" */
  propertyType: string;
  area: string;
  /** per night, INR */
  priceFrom: number;
  amenities: string[];
  bestFor: string;
};

export type StayFaq = {
  id: string;
  question: string;
  answer: string;
};

export type StayGalleryImage = {
  id: string;
  image: string;
  alt: string;
};

export type StayCategory = "Houseboat" | "Hotel" | "Resort" | "Homestay";

export type Stay = {
  /** Property slug — the fallback branch of /stays/[slug]. */
  slug: string;
  /** Property name — the H1 on its own page. */
  title: string;
  /** Town this property sits in, e.g. "Srinagar". */
  town: string;
  /** Precise area shown on cards, e.g. "Dal Lake, Srinagar". */
  area: string;
  category: StayCategory;
  /**
   * Place slugs this property belongs to, WITHOUT the "-stays" suffix.
   * A property is normally tagged with both its area and its town, so it shows
   * on /stays/dal-lake-stays and /stays/srinagar-stays.
   */
  placeTags: string[];
  /** 40–60 word answer-first block. */
  answerBlock: string;
  /** Short one-liner for listings. */
  cardSummary: string;
  /** Lowest nightly rate across all options, INR. */
  priceFrom: number;
  highlights: string[];
  sleeps: number;
  gallery: StayGalleryImage[];
  image: string;
  alt: string;
  metaTitle?: string;
  metaDescription?: string;
  options: StayOption[];
  howToChoose: string[];
  /** Sartaj's on-ground truths (2–4). */
  sartajTips: string[];
  faqs: StayFaq[];
  /** Internal links required by SOP B3: INTO destination + package + cab. */
  links: {
    destination: string;
    package: string;
    cabRoute: string;
  };
};

export const STAYS: Stay[] = [
  /* ---------------------------- Houseboats ---------------------------- */
  {
    slug: "dal-lake-deluxe-houseboat",
    title: "Dal Lake Deluxe Houseboat",
    town: "Srinagar",
    area: "Dal Lake, Srinagar",
    category: "Houseboat",
    placeTags: ["dal-lake", "srinagar"],
    answerBlock:
      "A deluxe cedar houseboat moored on the quieter Ghat 9 stretch of Dal Lake, from ₹2,500 a night with breakfast and the shikara transfer included. Lake-facing deck rooms catch the sunrise straight over Hari Parbat.",
    cardSummary: "Carved cedar boat on the quiet Ghat 9 stretch, breakfast included.",
    priceFrom: 2500,
    highlights: ["Breakfast included", "Shikara transfer", "Lake-facing deck"],
    sleeps: 4,
    gallery: [
      {
        id: "g1",
        image: img("1566073771259-6a8506099945"),
        alt: "Carved cedar houseboats moored along Dal Lake at sunrise with shikaras alongside",
      },
      {
        id: "g2",
        image: img("1571896349842-33c89424de2d"),
        alt: "Walnut-wood living room inside a Dal Lake houseboat with Kashmiri carpets",
      },
      {
        id: "g3",
        image: img("1582719478250-c89cae4dc85b"),
        alt: "Private houseboat deck set for breakfast overlooking Dal Lake",
      },
    ],
    image: img("1566073771259-6a8506099945"),
    alt: "Deluxe houseboat moored on Dal Lake, Srinagar",
    metaTitle: "Dal Lake Deluxe Houseboat, Srinagar | Rates & Booking",
    metaDescription:
      "A deluxe Dal Lake houseboat from ₹2,500/night with breakfast and shikara transfer. Quiet Ghat 9 mooring, verified on the ground by a 20-year Srinagar local.",
    options: [
      {
        id: "o1",
        propertyType: "Deluxe room",
        area: "Dal Lake — Ghat 9",
        priceFrom: 2500,
        amenities: ["Breakfast", "Shikara transfer", "Room heater", "Wi-Fi"],
        bestFor: "Couples wanting a classic Dal Lake night",
      },
      {
        id: "o2",
        propertyType: "Deck suite",
        area: "Dal Lake — Ghat 9",
        priceFrom: 3800,
        amenities: ["All meals", "Private deck", "Ensuite bath", "Heating"],
        bestFor: "Honeymooners and photographers",
      },
    ],
    howToChoose: [
      "Deck rooms face the water; interior rooms look onto the walkway and cost noticeably less.",
      "Confirm the shikara transfer is included — several boats bill it separately on checkout.",
    ],
    sartajTips: [
      "Ghat 9 is far enough from Boulevard Road to escape the evening noise but still a five-minute shikara from it.",
      "In December–February confirm the bukhari is working before you pay an advance.",
    ],
    faqs: [
      {
        id: "f1",
        question: "Is the shikara transfer included?",
        answer:
          "Yes, arrival and departure transfers are included in the tariff. Extra shikara trips during your stay are charged separately at the standard ₹600–800 per hour.",
      },
      {
        id: "f2",
        question: "Is there heating in winter?",
        answer:
          "Rooms have a wood-fired bukhari plus an electric heater. Between December and February we confirm both are working before we hold a booking.",
      },
    ],
    links: {
      destination: "/destinations/srinagar/",
      package: "/kashmir-tour-packages/honeymoon/",
      cabRoute: "/cab-service/",
    },
  },
  {
    slug: "nigeen-heritage-houseboat",
    title: "Nigeen Heritage Houseboat",
    town: "Srinagar",
    area: "Nigeen Lake, Srinagar",
    category: "Houseboat",
    placeTags: ["nigeen-lake", "srinagar"],
    answerBlock:
      "A heritage houseboat on Nigeen Lake from ₹3,200 a night with all meals. The water here is cleaner and quieter than central Dal, with no shikara traffic outside the window — the trade is six extra kilometres to Boulevard Road.",
    cardSummary: "Walnut-wood heritage boat on Nigeen's calm, uncrowded water.",
    priceFrom: 3200,
    highlights: ["All meals", "Quiet water", "Sunset deck"],
    sleeps: 4,
    gallery: [
      {
        id: "g1",
        image: img("1512918728675-ed5a9ecdebfd"),
        alt: "Houseboats moored on the calm water of Nigeen Lake, Srinagar",
      },
      {
        id: "g2",
        image: img("1611892440504-42a792e24d32"),
        alt: "Carved wooden sitting room inside a Nigeen Lake heritage houseboat",
      },
      {
        id: "g3",
        image: img("1590490360182-c33d57733427"),
        alt: "Sunset from the deck of a houseboat on Nigeen Lake",
      },
    ],
    image: img("1512918728675-ed5a9ecdebfd"),
    alt: "Heritage houseboat on Nigeen Lake, Srinagar",
    metaTitle: "Nigeen Heritage Houseboat, Srinagar | Rates & Booking",
    metaDescription:
      "Heritage Nigeen Lake houseboat from ₹3,200/night with all meals — cleaner, quieter water than central Dal, with walnut-wood interiors and a sunset deck.",
    options: [
      {
        id: "o1",
        propertyType: "Heritage room",
        area: "Nigeen Lake",
        priceFrom: 3200,
        amenities: ["All meals", "Shikara transfer", "Heating", "Wi-Fi"],
        bestFor: "Travellers who want quiet water",
      },
      {
        id: "o2",
        propertyType: "Royal suite",
        area: "Nigeen Lake — west bank",
        priceFrom: 5800,
        amenities: ["All meals", "Private deck", "Ensuite bath", "Heating"],
        bestFor: "Longer stays and slow mornings",
      },
    ],
    howToChoose: [
      "West-bank rooms get the sunset; east-bank rooms get sunrise over Hari Parbat.",
      "Nigeen is about 6 km from Boulevard Road — add 15 minutes to every sightseeing start.",
    ],
    sartajTips: [
      "If someone told you Dal Lake is dirty, they stayed in the wrong stretch. Book Nigeen and judge again.",
      "The lake edge freezes in January. It photographs beautifully, but confirm the heating first.",
    ],
    faqs: [
      {
        id: "f1",
        question: "How far is Nigeen Lake from Srinagar airport?",
        answer:
          "Roughly 18 km, about 45 minutes depending on city traffic. An airport pickup can be arranged for ₹700–1,300.",
      },
      {
        id: "f2",
        question: "Is Nigeen better than Dal for a houseboat?",
        answer:
          "For quiet and water quality, yes. Dal wins on convenience — it is closer to Boulevard Road, the Mughal Gardens and the Old City.",
      },
    ],
    links: {
      destination: "/destinations/srinagar/",
      package: "/kashmir-tour-packages/honeymoon/",
      cabRoute: "/cab-service/",
    },
  },

  /* ------------------------------ Hotels ------------------------------ */
  {
    slug: "boulevard-lake-view-hotel",
    title: "Boulevard Lake View Hotel",
    town: "Srinagar",
    area: "Boulevard Road, Srinagar",
    category: "Hotel",
    placeTags: ["boulevard-road", "dal-lake", "srinagar"],
    answerBlock:
      "A four-star hotel on Boulevard Road from ₹4,200 a night, with genuine lake-facing rooms from the third floor up. You are walking distance from the shikara ghats and a ten-minute drive from the Mughal Gardens.",
    cardSummary: "Four-star on Boulevard Road with real lake-facing rooms upstairs.",
    priceFrom: 4200,
    highlights: ["Lake-view rooms", "Breakfast included", "Airport transfer"],
    sleeps: 3,
    gallery: [
      {
        id: "g1",
        image: img("1578683010236-d716f9a3f461"),
        alt: "Lake-facing hotel on Boulevard Road, Srinagar, with Dal Lake in the foreground",
      },
      {
        id: "g2",
        image: img("1540541338287-41700207dee6"),
        alt: "Twin-bed hotel room in Srinagar with a window overlooking Dal Lake",
      },
      {
        id: "g3",
        image: img("1445019980597-93fa8acb246c"),
        alt: "Hotel dining room in Srinagar serving Kashmiri breakfast with kahwa",
      },
    ],
    image: img("1578683010236-d716f9a3f461"),
    alt: "Lake-facing hotel on Boulevard Road, Srinagar",
    metaTitle: "Boulevard Lake View Hotel, Srinagar | Rates & Booking",
    metaDescription:
      "Lake-facing four-star hotel on Boulevard Road, Srinagar, from ₹4,200/night with breakfast. Which floors actually see the lake, verified on the ground.",
    options: [
      {
        id: "o1",
        propertyType: "Deluxe room",
        area: "Boulevard Road",
        priceFrom: 4200,
        amenities: ["Breakfast", "Lake-view room", "Restaurant", "Parking"],
        bestFor: "First-timers who want the Dal Lake view",
      },
      {
        id: "o2",
        propertyType: "Family suite",
        area: "Boulevard Road",
        priceFrom: 6800,
        amenities: ["Breakfast", "Two bedrooms", "Lake-view balcony", "Heating"],
        bestFor: "Families of four or more",
      },
    ],
    howToChoose: [
      "\"Lake-facing hotel\" and \"lake-facing room\" are different things — confirm the room, in writing.",
      "Third floor and above gets the view; lower floors look at the road and parked cars.",
    ],
    sartajTips: [
      "Boulevard Road is the most expensive stretch per square foot in Srinagar. You are paying for the walk to the ghats.",
      "Ask whether heating is central or a portable bukhari — in January it changes the night entirely.",
    ],
    faqs: [
      {
        id: "f1",
        question: "Do all rooms face the lake?",
        answer:
          "No. Only rooms on the third floor and above have an unobstructed lake view. We confirm the specific room category in writing before booking.",
      },
      {
        id: "f2",
        question: "Is it walkable to the shikara ghats?",
        answer:
          "Yes — the nearest ghats are a two to five minute walk along Boulevard Road, which is the main reason this stretch costs what it does.",
      },
    ],
    links: {
      destination: "/destinations/srinagar/",
      package: "/kashmir-tour-packages/family/",
      cabRoute: "/cab-service/",
    },
  },
  {
    slug: "rajbagh-city-hotel",
    title: "Rajbagh City Hotel",
    town: "Srinagar",
    area: "Rajbagh, Srinagar",
    category: "Hotel",
    placeTags: ["rajbagh", "srinagar"],
    answerBlock:
      "A clean three-star hotel in Rajbagh from ₹1,800 a night with breakfast. Ten minutes from Dal Lake and noticeably quieter than Boulevard Road, this is the sensible-budget choice for families running full sightseeing days.",
    cardSummary: "Quiet three-star in Rajbagh, ten minutes from the lake.",
    priceFrom: 1800,
    highlights: ["Breakfast included", "Parking", "Family rooms"],
    sleeps: 4,
    gallery: [
      {
        id: "g1",
        image: img("1596394516093-501ba68a0ba6"),
        alt: "Hotel exterior on a quiet residential street in Rajbagh, Srinagar",
      },
      {
        id: "g2",
        image: img("1631049307264-da0ec9d70304"),
        alt: "Comfortable twin hotel room with wooden panelling in Srinagar",
      },
      {
        id: "g3",
        image: img("1618773928121-c32242e63f39"),
        alt: "Hotel garden and seating area in Rajbagh, Srinagar",
      },
    ],
    image: img("1596394516093-501ba68a0ba6"),
    alt: "Three-star city hotel in Rajbagh, Srinagar",
    metaTitle: "Rajbagh City Hotel, Srinagar | Rates & Booking",
    metaDescription:
      "Clean three-star Srinagar hotel in Rajbagh from ₹1,800/night with breakfast — quieter than Boulevard Road and ten minutes from Dal Lake.",
    options: [
      {
        id: "o1",
        propertyType: "Standard room",
        area: "Rajbagh",
        priceFrom: 1800,
        amenities: ["Breakfast", "Room heater", "Wi-Fi", "Parking"],
        bestFor: "Families keeping the budget sensible",
      },
      {
        id: "o2",
        propertyType: "Family room",
        area: "Rajbagh",
        priceFrom: 2900,
        amenities: ["Breakfast", "Extra beds", "Heating", "Parking"],
        bestFor: "Groups of four to five",
      },
    ],
    howToChoose: [
      "Rajbagh and Gogji Bagh sit ten minutes from the lake and often run 30% cheaper than Boulevard Road.",
      "If you are out sightseeing from morning to night, you are paying for a bed, not a view.",
    ],
    sartajTips: [
      "This is where Srinagar families put their own visiting relatives — quiet streets, easy parking, no tourist mark-up.",
      "Lal Chowk for shopping is a ten-minute drive, less if you go before 10 AM.",
    ],
    faqs: [
      {
        id: "f1",
        question: "How far is it from Dal Lake?",
        answer:
          "About 3 km, roughly ten minutes by car. A one-way taxi to the Boulevard Road ghats runs ₹200–300.",
      },
      {
        id: "f2",
        question: "Is parking available?",
        answer:
          "Yes, free on-site parking, which is genuinely hard to find on Boulevard Road if you are self-driving.",
      },
    ],
    links: {
      destination: "/destinations/srinagar/",
      package: "/kashmir-tour-packages/family/",
      cabRoute: "/cab-service/",
    },
  },
  {
    slug: "lidder-riverside-hotel",
    title: "Lidder Riverside Hotel",
    town: "Pahalgam",
    area: "Lidder Riverside, Pahalgam",
    category: "Hotel",
    placeTags: ["lidder-riverside", "pahalgam"],
    answerBlock:
      "A river-facing hotel on the Lidder in Pahalgam from ₹2,200 a night. Rooms above the water get the river noise instead of the pony-stand road, which is the single upgrade worth paying for in this town.",
    cardSummary: "River-facing rooms on the Lidder, away from the market noise.",
    priceFrom: 2200,
    highlights: ["River-facing", "Breakfast included", "Parking"],
    sleeps: 4,
    gallery: [
      {
        id: "g1",
        image: img("1522708323590-d24dbb6b0267"),
        alt: "Hotel beside the Lidder river in Pahalgam surrounded by pine forest",
      },
      {
        id: "g2",
        image: img("1560448204-e02f11c3d0e2"),
        alt: "Warm hotel room in Pahalgam with wooden panelling and a river view",
      },
      {
        id: "g3",
        image: img("1595576508898-0ad5c879a061"),
        alt: "Pahalgam hotel garden looking towards the surrounding pine ridges",
      },
    ],
    image: img("1522708323590-d24dbb6b0267"),
    alt: "Riverside hotel on the Lidder in Pahalgam",
    metaTitle: "Lidder Riverside Hotel, Pahalgam | Rates & Booking",
    metaDescription:
      "River-facing Pahalgam hotel on the Lidder from ₹2,200/night with breakfast — which rooms actually face the water, and how to reach Aru and Betaab.",
    options: [
      {
        id: "o1",
        propertyType: "Standard room",
        area: "Pahalgam",
        priceFrom: 2200,
        amenities: ["Breakfast", "Room heater", "Parking", "Wi-Fi"],
        bestFor: "Short one-night stops",
      },
      {
        id: "o2",
        propertyType: "River-view room",
        area: "Lidder riverside",
        priceFrom: 4800,
        amenities: ["Breakfast", "River-view balcony", "Restaurant", "Heating"],
        bestFor: "Families staying two nights or more",
      },
    ],
    howToChoose: [
      "River-facing rooms cost roughly double and are the one upgrade worth paying for in Pahalgam.",
      "Stay two nights if you want Aru and Betaab without rushing either.",
    ],
    sartajTips: [
      "Srinagar cabs cannot do local Pahalgam sightseeing — Aru, Betaab and Chandanwari need a local union taxi. Budget for it.",
      "Main-market hotels sit on the pony-stand road, which is loud from 7 AM.",
    ],
    faqs: [
      {
        id: "f1",
        question: "How many nights should I stay in Pahalgam?",
        answer:
          "Two. One night gives you the drive plus the market; two lets you do Aru and Betaab properly, and Chandanwari if the road is open.",
      },
      {
        id: "f2",
        question: "Can my Srinagar cab take me to Aru?",
        answer:
          "No. Local sightseeing around Pahalgam is reserved for Pahalgam union taxis. Your Srinagar cab brings you in and takes you out.",
      },
    ],
    links: {
      destination: "/destinations/pahalgam/",
      package: "/kashmir-tour-packages/family/",
      cabRoute: "/cab-service/srinagar-to-pahalgam/",
    },
  },
  {
    slug: "sonamarg-mountain-lodge",
    title: "Sonamarg Mountain Lodge",
    town: "Sonamarg",
    area: "Sonamarg, Ganderbal",
    category: "Hotel",
    placeTags: ["sonamarg"],
    answerBlock:
      "A seasonal riverside lodge in Sonamarg from ₹2,800 a night, open roughly May to October. Staying overnight is the only way to reach Thajiwas glacier before the Srinagar day-trippers arrive around 11 AM.",
    cardSummary: "Seasonal lodge by the Sindh, minutes from the Thajiwas trail.",
    priceFrom: 2800,
    highlights: ["Glacier access", "Riverside", "Seasonal only"],
    sleeps: 4,
    gallery: [
      {
        id: "g1",
        image: img("1600585154340-be6161a56a0c"),
        alt: "Lodge in Sonamarg beside the Sindh river with snow peaks behind",
      },
      {
        id: "g2",
        image: img("1600607687939-ce8a6c25118c"),
        alt: "Simple twin room in a Sonamarg lodge with mountain-facing windows",
      },
      {
        id: "g3",
        image: img("1618221195710-dd6b41faaea6"),
        alt: "Meadow and river at Sonamarg seen from a guest lodge verandah",
      },
    ],
    image: img("1600585154340-be6161a56a0c"),
    alt: "Riverside mountain lodge in Sonamarg",
    metaTitle: "Sonamarg Mountain Lodge | Seasonal Rates & Booking",
    metaDescription:
      "Riverside Sonamarg lodge from ₹2,800/night, open May to October. Why an overnight beats a day trip, and how to reach Thajiwas glacier before the crowds.",
    options: [
      {
        id: "o1",
        propertyType: "Mountain room",
        area: "Sonamarg town",
        priceFrom: 2800,
        amenities: ["Breakfast", "Room heater", "Parking"],
        bestFor: "Amarnath-route travellers and glacier walks",
      },
      {
        id: "o2",
        propertyType: "Riverside deluxe",
        area: "Sindh riverside",
        priceFrom: 4500,
        amenities: ["All meals", "Attached bath", "River view", "Bonfire"],
        bestFor: "Summer travellers wanting to sleep by the river",
      },
    ],
    howToChoose: [
      "Check the opening window first — most Sonamarg properties operate May to October only.",
      "Sonamarg is 80 km from Srinagar, about 2.5 hours. A long day trip, a comfortable overnight.",
    ],
    sartajTips: [
      "Day-trippers reach Thajiwas around 11 AM. Stay the night, start at 8, and the glacier path is yours.",
      "Pony rates to Thajiwas are negotiated, not fixed. Agree the price and the turnaround point before you mount.",
    ],
    faqs: [
      {
        id: "f1",
        question: "Is the lodge open in winter?",
        answer:
          "No. The Zoji La road closes with snow and the property shuts from November to April. Confirm the opening window before booking anything outside May–October.",
      },
      {
        id: "f2",
        question: "Is an overnight in Sonamarg worth it?",
        answer:
          "If the glacier matters to you, yes. The 2.5-hour drive each way makes a rushed day trip, and an overnight puts you at Thajiwas hours before the buses.",
      },
    ],
    links: {
      destination: "/destinations/sonamarg/",
      package: "/kashmir-tour-packages/family/",
      cabRoute: "/cab-service/srinagar-to-sonamarg/",
    },
  },

  /* ------------------------------ Resorts ----------------------------- */
  {
    slug: "gulmarg-pine-resort",
    title: "Gulmarg Pine Resort",
    town: "Gulmarg",
    area: "Gulmarg, Baramulla",
    category: "Resort",
    placeTags: ["gulmarg"],
    answerBlock:
      "A pine-wood resort in Gulmarg's upper bowl from ₹5,500 a night in season, at 2,650 m and walking distance from the Gondola base. Staying up here saves you the daily Tangmarg climb, which matters in January.",
    cardSummary: "Walking distance from the Gondola, with proper central heating.",
    priceFrom: 5500,
    highlights: ["Central heating", "Near Gondola", "Ski storage"],
    sleeps: 4,
    gallery: [
      {
        id: "g1",
        image: img("1551882547-ff40c63fe5fa"),
        alt: "Snow-covered pine-wood resort in Gulmarg with the Affarwat range behind it",
      },
      {
        id: "g2",
        image: img("1587061949409-02df41d5e562"),
        alt: "Resort room in Gulmarg with a fireplace and windows facing the ski slopes",
      },
      {
        id: "g3",
        image: img("1584132967334-10e028bd69f7"),
        alt: "Gulmarg resort terrace looking out over deep snow and pine forest",
      },
    ],
    image: img("1551882547-ff40c63fe5fa"),
    alt: "Pine-wood mountain resort in Gulmarg",
    metaTitle: "Gulmarg Pine Resort | Ski-In Rates & Winter Booking",
    metaDescription:
      "Gulmarg resort from ₹5,500/night, walking distance from the Gondola base. What heating to insist on and why staying up in Gulmarg beats Tangmarg.",
    options: [
      {
        id: "o1",
        propertyType: "Mountain room",
        area: "Gulmarg — upper bowl",
        priceFrom: 5500,
        amenities: ["Central heating", "All meals", "Ski storage", "Parking"],
        bestFor: "Skiers who want to walk to the Gondola",
      },
      {
        id: "o2",
        propertyType: "Slope-view suite",
        area: "Gulmarg — Gondola road",
        priceFrom: 9500,
        amenities: ["Heated rooms", "Fireplace", "Restaurant", "Equipment hire"],
        bestFor: "Longer snow weeks",
      },
    ],
    howToChoose: [
      "Anything advertised as \"near Gulmarg\" is usually Tangmarg. Ask for the distance to the Gondola base.",
      "Off-season (Apr–Oct) the same rooms drop by half and Gulmarg becomes a green meadow walk.",
    ],
    sartajTips: [
      "December to February a Srinagar sedan cannot make the Tangmarg–Gulmarg climb — you need a snow-jeep with chains.",
      "Book Gondola Phase 1 tickets before you arrive; the January queue can cost you the whole morning.",
    ],
    faqs: [
      {
        id: "f1",
        question: "How far is the Gondola base station?",
        answer:
          "About a 5–8 minute walk in summer. In deep snow allow 15 minutes, or use the resort shuttle where one is running.",
      },
      {
        id: "f2",
        question: "Should I stay in Gulmarg or day-trip from Srinagar?",
        answer:
          "Stay if you plan to ski or want first light on Affarwat. A day trip works in summer, but in deep winter the road can shut and you lose the day.",
      },
    ],
    links: {
      destination: "/destinations/gulmarg/",
      package: "/kashmir-tour-packages/honeymoon/",
      cabRoute: "/cab-service/srinagar-to-gulmarg/",
    },
  },
  {
    slug: "cheshma-shahi-hillside-resort",
    title: "Cheshma Shahi Hillside Resort",
    town: "Srinagar",
    area: "Cheshma Shahi, Srinagar",
    category: "Resort",
    placeTags: ["cheshma-shahi", "srinagar"],
    answerBlock:
      "A hillside luxury resort above Dal Lake near Cheshma Shahi, from ₹14,000 a night. You are paying for grounds, quiet and a view down over the whole lake basin — and you will drive to everything.",
    cardSummary: "Hillside grounds above Dal Lake with the valley's best views.",
    priceFrom: 14000,
    highlights: ["Spa", "Fine dining", "Panoramic views"],
    sleeps: 3,
    gallery: [
      {
        id: "g1",
        image: img("1631049307264-da0ec9d70304"),
        alt: "Luxury resort terrace above Dal Lake near Cheshma Shahi, Srinagar",
      },
      {
        id: "g2",
        image: img("1596394516093-501ba68a0ba6"),
        alt: "Suite interior at a Srinagar hillside resort with valley-facing windows",
      },
      {
        id: "g3",
        image: img("1618773928121-c32242e63f39"),
        alt: "Resort garden and lawn overlooking the Dal Lake basin in Srinagar",
      },
    ],
    image: img("1631049307264-da0ec9d70304"),
    alt: "Hillside luxury resort above Dal Lake, Srinagar",
    metaTitle: "Cheshma Shahi Hillside Resort, Srinagar | Rates & Booking",
    metaDescription:
      "Hillside luxury resort above Dal Lake from ₹14,000/night — what the premium actually buys, and when a Boulevard Road hotel is the smarter booking.",
    options: [
      {
        id: "o1",
        propertyType: "Valley-view room",
        area: "Cheshma Shahi",
        priceFrom: 14000,
        amenities: ["Breakfast", "Spa", "Restaurant", "Airport transfer"],
        bestFor: "Honeymooners wanting privacy and grounds",
      },
      {
        id: "o2",
        propertyType: "Private villa",
        area: "Cheshma Shahi",
        priceFrom: 26000,
        amenities: ["All meals", "Private garden", "Butler service", "Heating"],
        bestFor: "Special occasions and small family groups",
      },
    ],
    howToChoose: [
      "The view is the product. If your room does not face the lake, the premium is largely wasted.",
      "Shoulder season (Oct–Nov, Feb) can cut these rates by a third with no drop in service.",
    ],
    sartajTips: [
      "Ask for the upper terrace level — the lower blocks look into the hillside, not the lake.",
      "Nishat and Shalimar gardens are a ten-minute drive, so do all three in one morning.",
    ],
    faqs: [
      {
        id: "f1",
        question: "How far is it from Boulevard Road?",
        answer:
          "Around 7 km uphill, about 20 minutes. Factor a cab into every outing — there is nothing walkable from here.",
      },
      {
        id: "f2",
        question: "Is a luxury resort worth it in Srinagar?",
        answer:
          "If you want grounds, quiet and a panoramic view, yes. If your days are packed with sightseeing, a lake-facing Boulevard Road hotel costs a third as much.",
      },
    ],
    links: {
      destination: "/destinations/srinagar/",
      package: "/kashmir-tour-packages/honeymoon/",
      cabRoute: "/cab-service/",
    },
  },
  {
    slug: "yusmarg-meadow-cottages",
    title: "Yusmarg Meadow Cottages",
    town: "Yusmarg",
    area: "Yusmarg, Budgam",
    category: "Resort",
    placeTags: ["yusmarg"],
    answerBlock:
      "Wooden cottages on the Yusmarg meadow from ₹2,600 a night, 47 km south-west of Srinagar. This is the quietest hill station in the valley because almost no tour buses come here — which also means no market and no ATM.",
    cardSummary: "Quiet meadow cottages in the valley's least-visited hill station.",
    priceFrom: 2600,
    highlights: ["Very quiet", "All meals", "Meadow walks"],
    sleeps: 4,
    gallery: [
      {
        id: "g1",
        image: img("1505693416388-ac5ce068fe85"),
        alt: "Wooden cottage in the Yusmarg meadow surrounded by pine forest",
      },
      {
        id: "g2",
        image: img("1522771739844-6a9f6d5f14af"),
        alt: "Cottage bedroom in Yusmarg with a wood stove and meadow-facing window",
      },
      {
        id: "g3",
        image: img("1520250497591-112f2f40a3f4"),
        alt: "Open meadow and pine ridges at Yusmarg on a clear morning",
      },
    ],
    image: img("1505693416388-ac5ce068fe85"),
    alt: "Meadow cottages at Yusmarg, Kashmir",
    metaTitle: "Yusmarg Meadow Cottages | Rates, Access & Booking",
    metaDescription:
      "Yusmarg cottages from ₹2,600/night in the valley's quietest hill station, 47 km from Srinagar — what facilities exist and why you should carry cash.",
    options: [
      {
        id: "o1",
        propertyType: "Meadow cottage",
        area: "Yusmarg",
        priceFrom: 2600,
        amenities: ["All meals", "Wood stove", "Parking", "Meadow view"],
        bestFor: "Travellers who want genuine quiet",
      },
      {
        id: "o2",
        propertyType: "Forest hut",
        area: "Yusmarg — forest edge",
        priceFrom: 1800,
        amenities: ["Basic meals", "Heating", "Forest walks"],
        bestFor: "Budget overnight stops",
      },
    ],
    howToChoose: [
      "There is no market to speak of — book a property that serves all meals, not just breakfast.",
      "Yusmarg is 47 km from Srinagar, about 1.5 hours, and works well as a quiet break between city nights.",
    ],
    sartajTips: [
      "Yusmarg gets a fraction of Gulmarg's visitors for a meadow that is arguably prettier in summer. Go before that changes.",
      "There is no ATM and card acceptance is unreliable. Draw cash in Srinagar before you leave.",
    ],
    faqs: [
      {
        id: "f1",
        question: "How far is Yusmarg from Srinagar?",
        answer:
          "About 47 km, roughly 1.5 hours by road via Chadoora. An easy day trip, but a much better overnight.",
      },
      {
        id: "f2",
        question: "Are meals included?",
        answer:
          "All meals are included in the cottage tariff, which matters here because there is effectively no market to eat at.",
      },
    ],
    links: {
      destination: "/destinations/yusmarg/",
      package: "/kashmir-tour-packages/family/",
      cabRoute: "/cab-service/",
    },
  },

  /* ----------------------------- Homestays ---------------------------- */
  {
    slug: "aru-valley-homestay",
    title: "Aru Valley Homestay",
    town: "Aru",
    area: "Aru Valley, Pahalgam",
    category: "Homestay",
    placeTags: ["aru", "pahalgam"],
    answerBlock:
      "A family homestay in Aru village from ₹1,200 a night including home-cooked meals, 11 km above Pahalgam at the trailhead for Lidderwat and Kolahoi. Signal is patchy and hot water is bucket-fed at this rate.",
    cardSummary: "Trailhead village home for Lidderwat and Kolahoi trekkers.",
    priceFrom: 1200,
    highlights: ["Home-cooked meals", "Trek trailhead", "Bukhari heating"],
    sleeps: 5,
    gallery: [
      {
        id: "g1",
        image: img("1568605114967-8130f3a36994"),
        alt: "Wooden homestay in Aru village surrounded by meadow and pine",
      },
      {
        id: "g2",
        image: img("1586375300773-8384e3e4916f"),
        alt: "Simple guest bedroom in an Aru valley homestay with mountain views",
      },
      {
        id: "g3",
        image: img("1499793983690-e29da59ef1c2"),
        alt: "Meadow and shepherd huts above Aru valley in summer",
      },
    ],
    image: img("1568605114967-8130f3a36994"),
    alt: "Family homestay in Aru valley, Kashmir",
    metaTitle: "Aru Valley Homestay, Pahalgam | Rates & What to Expect",
    metaDescription:
      "Aru valley homestay from ₹1,200/night with home-cooked meals — the base for Lidderwat and Kolahoi treks, and what facilities to actually expect.",
    options: [
      {
        id: "o1",
        propertyType: "Village room",
        area: "Aru village",
        priceFrom: 1200,
        amenities: ["All meals", "Bukhari heating", "Trek guide contacts"],
        bestFor: "Trekkers heading to Lidderwat",
      },
      {
        id: "o2",
        propertyType: "Ensuite room",
        area: "Aru — upper meadow",
        priceFrom: 3200,
        amenities: ["Private bathroom", "All meals", "Hot water", "Meadow view"],
        bestFor: "Couples wanting quiet with comfort",
      },
    ],
    howToChoose: [
      "Below roughly ₹1,500 a night, assume a shared bathroom unless the listing says otherwise.",
      "If you are trekking, stay in the village itself; upper-meadow rooms add a 20-minute walk with a pack.",
    ],
    sartajTips: [
      "Aru is where the Lidderwat and Kolahoi treks actually start. Sleeping in Pahalgam costs you the best two hours of morning light.",
      "Carry cash — there is no card machine here and UPI drops with the signal.",
    ],
    faqs: [
      {
        id: "f1",
        question: "How do I get to Aru valley?",
        answer:
          "It is 11 km from Pahalgam on a narrow mountain road, about 40 minutes by local taxi. Srinagar cabs cannot run this route.",
      },
      {
        id: "f2",
        question: "Is there hot water?",
        answer:
          "Bucket-fed hot water in the village rooms, which is normal at this rate. The ensuite rooms in the upper meadow have running hot water.",
      },
    ],
    links: {
      destination: "/destinations/aru/",
      package: "/kashmir-tour-packages/adventure/",
      cabRoute: "/cab-service/srinagar-to-pahalgam/",
    },
  },
  {
    slug: "pahalgam-family-homestay",
    title: "Pahalgam Family Homestay",
    town: "Pahalgam",
    area: "Pahalgam town",
    category: "Homestay",
    placeTags: ["pahalgam"],
    answerBlock:
      "A premium family homestay in Pahalgam town from ₹2,800 a night with private bathrooms and all meals cooked by the hosts. The comfort of a hotel with the food of a Kashmiri home — which is the whole point of a homestay.",
    cardSummary: "Host-cooked Wazwan with private bathrooms and a garden.",
    priceFrom: 2800,
    highlights: ["Private bathroom", "All meals", "Garden"],
    sleeps: 5,
    gallery: [
      {
        id: "g1",
        image: img("1493809842364-78817add7ffb"),
        alt: "Kashmiri family homestay courtyard in Pahalgam with a walnut-wood verandah",
      },
      {
        id: "g2",
        image: img("1517320964276-a002fa203177"),
        alt: "Home-cooked Kashmiri meal served on a copper trami at a homestay",
      },
      {
        id: "g3",
        image: img("1613490493576-7fde63acd811"),
        alt: "Guest bedroom in a Pahalgam homestay with hand-woven blankets",
      },
    ],
    image: img("1493809842364-78817add7ffb"),
    alt: "Family-run homestay in Pahalgam, Kashmir",
    metaTitle: "Pahalgam Family Homestay | Rates, Meals & Booking",
    metaDescription:
      "Premium Pahalgam homestay from ₹2,800/night with private bathrooms and host-cooked Kashmiri meals — how to tell a genuine family host from a resold guesthouse.",
    options: [
      {
        id: "o1",
        propertyType: "Ensuite room",
        area: "Pahalgam town",
        priceFrom: 2800,
        amenities: ["Private bathroom", "All meals", "Wi-Fi", "Garden"],
        bestFor: "Families wanting local food with comfort",
      },
      {
        id: "o2",
        propertyType: "Whole floor",
        area: "Pahalgam town",
        priceFrom: 5200,
        amenities: ["Two bedrooms", "All meals", "Private lounge", "Heating"],
        bestFor: "Two families travelling together",
      },
    ],
    howToChoose: [
      "The meal is the point. Pick a host who cooks, not one who sends you into town to eat.",
      "Confirm whether the bathroom is private before paying — it is the main difference at this price.",
    ],
    sartajTips: [
      "A genuine homestay will happily put you on a call with the host before you pay. If the agent refuses, it is a guesthouse being resold.",
      "Ask for Wazwan a day ahead. It is not a dish you cook to order in an hour.",
    ],
    faqs: [
      {
        id: "f1",
        question: "Are homestays suitable for families?",
        answer:
          "Yes — the hosts live on the property, rooms here have private bathrooms, and meals are cooked in-house, which suits children and older travellers.",
      },
      {
        id: "f2",
        question: "Are meals included?",
        answer:
          "All meals are included, cooked by the host family. Tell them a day ahead if you want a full Wazwan spread.",
      },
    ],
    links: {
      destination: "/destinations/pahalgam/",
      package: "/kashmir-tour-packages/family/",
      cabRoute: "/cab-service/srinagar-to-pahalgam/",
    },
  },
];

export function getAllStays(): Stay[] {
  return STAYS;
}

export function getStayBySlug(slug: string): Stay | null {
  return STAYS.find((stay) => stay.slug === slug) ?? null;
}

export function getStaysByCategory(category: StayCategory): Stay[] {
  return STAYS.filter((stay) => stay.category === category);
}

export function getStaysByPlace(placeSlug: string): Stay[] {
  return STAYS.filter((stay) => stay.placeTags.includes(placeSlug));
}
