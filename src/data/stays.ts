/**
 * TEMPORARY placeholder data for the /stays pages.
 *
 * Per the build plan we ship UI first, then derive the Mongoose model from the
 * fields the UI actually needs. Everything here mirrors the SOP §2.8 blueprint
 * (options table → how to choose → Sartaj tip → FAQ → enquiry CTA).
 *
 * DATA-HONESTY: every price below is an unverified example figure and must be
 * confirmed by Sartaj [VERIFY 2026-27] before this goes live. No review /
 * rating data here on purpose — AggregateRating is only allowed once genuine
 * on-page reviews exist.
 *
 * IMAGES: these are STOCK PLACEHOLDERS on Unsplash so the cards render during
 * development. They are generic hotel/lake/mountain shots, NOT the actual
 * properties. Per SOP B5 they must all be replaced with real Kashmir
 * photography of the real stays before launch — stock imagery of a property you
 * are selling is both an E-E-A-T problem and a trust problem.
 */

/** Placeholder image helper — delete this once real photos are uploaded. */
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export type StayOption = {
  id: string;
  /** e.g. "Deluxe Houseboat", "3-star hotel" */
  propertyType: string;
  /** e.g. "Dal Lake — Ghat 9", "Boulevard Road" */
  area: string;
  /** per night, INR */
  priceFrom: number;
  amenities: string[];
  /** e.g. "Couples wanting a classic Dal Lake night" */
  bestFor: string;
};

export type StayFaq = {
  id: string;
  question: string;
  answer: string;
};

/** One slide in the archive card's image carousel. */
export type StayGalleryImage = {
  id: string;
  image: string;
  alt: string;
};

export type StayCategory = "Houseboat" | "Hotel" | "Resort" | "Homestay";

export type Stay = {
  slug: string;
  /** H1 — exact intent, e.g. "Dal Lake Houseboats" */
  title: string;
  /** Which town/area this stay type belongs to — used for internal links. */
  town: string;
  /** Precise area shown on the card, e.g. "Dal Lake, Srinagar". */
  area: string;
  /** Stay category — powers the archive filter and the hub grouping. */
  category: StayCategory;
  /** 40–60 word answer-first block. */
  answerBlock: string;
  /** Short one-liner for listings. */
  cardSummary: string;
  /** Lowest nightly rate across all options, INR. Shown on the card. */
  priceFrom: number;
  /** 2–3 short chips on the card, e.g. "Breakfast included". */
  highlights: string[];
  /** Typical room capacity — small detail on the card. */
  sleeps: number;
  /** Carousel images for the archive card (first is also the OG image). */
  gallery: StayGalleryImage[];
  image: string;
  alt: string;
  metaTitle?: string;
  metaDescription?: string;
  options: StayOption[];
  /** "How to choose" body — houseboat vs hotel, location tips. */
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
  {
    slug: "dal-lake-houseboats",
    title: "Dal Lake Houseboats",
    town: "Srinagar",
    area: "Dal Lake, Srinagar",
    category: "Houseboat",
    answerBlock:
      "Dal Lake houseboats start from about ₹2,500 a night for a deluxe room including breakfast and shikara transfer. Ghat 9–16 stretches are the quietest; the Boulevard end is livelier but noisier. Book a lake-facing deck room for the classic Srinagar sunrise.",
    cardSummary: "Hand-carved cedar boats with private decks opening onto the water.",
    priceFrom: 2500,
    highlights: ["Breakfast included", "Shikara transfer", "Lake-facing deck"],
    sleeps: 4,
    gallery: [
      {
        id: "hb-1",
        image: img("1566073771259-6a8506099945"),
        alt: "Carved cedar houseboats moored along Dal Lake at sunrise with shikaras alongside",
      },
      {
        id: "hb-2",
        image: img("1571896349842-33c89424de2d"),
        alt: "Walnut-wood living room inside a Dal Lake heritage houseboat with Kashmiri carpets",
      },
      {
        id: "hb-3",
        image: img("1582719478250-c89cae4dc85b"),
        alt: "Private houseboat deck set for breakfast overlooking Dal Lake",
      },
      {
        id: "hb-4",
        image: img("1520250497591-112f2f40a3f4"),
        alt: "Houseboat bedroom with hand-carved khatamband ceiling and lake view windows",
      },
    ],
    image: img("1566073771259-6a8506099945"),
    alt: "Traditional cedar houseboats moored on Dal Lake, Srinagar",
    metaTitle: "Dal Lake Houseboats 2026 | Prices, Best Ghats & How to Choose",
    metaDescription:
      "Dal Lake houseboat stays from ₹2,500/night — deluxe vs heritage, which ghat to pick, what's included, and on-ground tips from a 20-year Srinagar local.",
    options: [
      {
        id: "hb-deluxe",
        propertyType: "Deluxe Houseboat",
        area: "Dal Lake — Ghat 9",
        priceFrom: 2500,
        amenities: ["Breakfast", "Shikara transfer", "Room heater", "Wi-Fi"],
        bestFor: "Couples wanting a classic Dal Lake night",
      },
      {
        id: "hb-heritage",
        propertyType: "Heritage Houseboat",
        area: "Dal Lake — Nigeen",
        priceFrom: 4500,
        amenities: ["All meals", "Private deck", "Walnut-wood interiors", "Heating"],
        bestFor: "Honeymooners and photographers",
      },
    ],
    howToChoose: [
      "Houseboat vs hotel: a houseboat is the experience, a hotel is the convenience. Most travellers do one night on the water and the rest on land.",
      "Nigeen Lake is calmer and cleaner than the central Dal stretch near Boulevard Road.",
      "Check that the tariff includes the shikara transfer — several boats charge it separately.",
    ],
    sartajTips: [
      "Avoid the congested Dal stretch directly opposite Boulevard Road in peak season — it is the noisiest water in Srinagar.",
      "In December–February confirm the boat has a working bukhari or heater before you pay an advance.",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "How much does a Dal Lake houseboat cost per night?",
        answer:
          "Deluxe houseboats start around ₹2,500 per night with breakfast; heritage boats with all meals run ₹4,500 and up. Rates rise sharply during the Tulip Festival and Christmas week.",
      },
      {
        id: "faq-2",
        question: "Is a houseboat or a hotel better in Srinagar?",
        answer:
          "A houseboat gives you the lake experience but limited mobility after dark. A hotel on Boulevard Road is easier for sightseeing days. One night on a houseboat plus two in a hotel suits most itineraries.",
      },
    ],
    links: {
      destination: "/destinations/srinagar/",
      package: "/kashmir-tour-packages/honeymoon/",
      cabRoute: "/cab-service/",
    },
  },
  {
    slug: "nigeen-lake-houseboats",
    title: "Nigeen Lake Houseboats",
    town: "Srinagar",
    area: "Nigeen Lake, Srinagar",
    category: "Houseboat",
    answerBlock:
      "Nigeen Lake houseboats start around ₹3,200 a night and sit on noticeably cleaner, quieter water than central Dal. You trade five minutes of extra driving for no shikara traffic outside your window — the reason most repeat visitors move here on their second trip.",
    cardSummary: "Quieter, cleaner water than Dal — the local's choice for a second visit.",
    priceFrom: 3200,
    highlights: ["Quiet water", "All meals", "Sunset deck"],
    sleeps: 4,
    gallery: [
      {
        id: "ng-1",
        image: img("1512918728675-ed5a9ecdebfd"),
        alt: "Houseboats moored on the calm water of Nigeen Lake, Srinagar",
      },
      {
        id: "ng-2",
        image: img("1611892440504-42a792e24d32"),
        alt: "Carved wooden interior of a Nigeen Lake houseboat sitting room",
      },
      {
        id: "ng-3",
        image: img("1590490360182-c33d57733427"),
        alt: "Sunset from the deck of a houseboat on Nigeen Lake",
      },
    ],
    image: img("1512918728675-ed5a9ecdebfd"),
    alt: "Houseboats on the quiet water of Nigeen Lake, Srinagar",
    metaTitle: "Nigeen Lake Houseboats 2026 | Quieter Than Dal, Prices & Tips",
    metaDescription:
      "Nigeen Lake houseboats from ₹3,200/night — cleaner, calmer water than central Dal, what's included, and why repeat visitors to Srinagar move here.",
    options: [
      {
        id: "ng-deluxe",
        propertyType: "Deluxe Houseboat",
        area: "Nigeen Lake",
        priceFrom: 3200,
        amenities: ["Breakfast", "Shikara transfer", "Heating", "Wi-Fi"],
        bestFor: "Travellers who want quiet water",
      },
      {
        id: "ng-premium",
        propertyType: "Premium Houseboat",
        area: "Nigeen — west bank",
        priceFrom: 5800,
        amenities: ["All meals", "Private deck", "Ensuite bath", "Heating"],
        bestFor: "Longer stays and slow mornings",
      },
    ],
    howToChoose: [
      "Nigeen is about 6 km from Boulevard Road — budget an extra 15 minutes to every sightseeing start.",
      "West-bank boats get the sunset; east-bank boats get the sunrise over Hari Parbat.",
      "Fewer boats here means fewer vendors knocking on your deck through the day.",
    ],
    sartajTips: [
      "If someone has told you Dal Lake is dirty, they stayed in the wrong stretch — book Nigeen and judge again.",
      "Nigeen freezes at the edges in January. It photographs beautifully but confirm the boat's heating first.",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Is Nigeen Lake better than Dal Lake for a houseboat?",
        answer:
          "For quiet and water quality, yes. Nigeen has far fewer boats and almost no shikara traffic. Dal wins on convenience — it is closer to Boulevard Road, the Mughal Gardens and the Old City.",
      },
      {
        id: "faq-2",
        question: "How far is Nigeen Lake from Srinagar airport?",
        answer:
          "Roughly 18 km, about 45 minutes depending on city traffic. Most houseboats will arrange an airport pickup for ₹700–1,300.",
      },
    ],
    links: {
      destination: "/destinations/srinagar/",
      package: "/kashmir-tour-packages/honeymoon/",
      cabRoute: "/cab-service/",
    },
  },
  {
    slug: "srinagar-hotels",
    title: "Srinagar Hotels",
    town: "Srinagar",
    area: "Boulevard Road, Srinagar",
    category: "Hotel",
    answerBlock:
      "Srinagar hotels start from about ₹1,800 a night for a clean 3-star room. Boulevard Road puts you on the lake with sightseeing at your door; Rajbagh and Gogji Bagh are quieter and better value. Ask for a lake-facing floor, not a lake-facing building.",
    cardSummary: "Lake-facing rooms minutes from Mughal Gardens and the Old City.",
    priceFrom: 1800,
    highlights: ["Breakfast included", "Central location", "24×7 reception"],
    sleeps: 3,
    gallery: [
      {
        id: "ht-1",
        image: img("1578683010236-d716f9a3f461"),
        alt: "Lake-facing hotel on Boulevard Road, Srinagar, with Dal Lake in the foreground",
      },
      {
        id: "ht-2",
        image: img("1540541338287-41700207dee6"),
        alt: "Twin-bed hotel room in Srinagar with a window overlooking Dal Lake",
      },
      {
        id: "ht-3",
        image: img("1445019980597-93fa8acb246c"),
        alt: "Hotel dining room in Srinagar serving Kashmiri breakfast with kahwa",
      },
    ],
    image: img("1578683010236-d716f9a3f461"),
    alt: "Lake-facing hotel on Boulevard Road, Srinagar",
    metaTitle: "Hotels in Srinagar 2026 | Best Areas, Prices & Where to Book",
    metaDescription:
      "Srinagar hotels from ₹1,800/night — Boulevard Road vs Rajbagh vs Gogji Bagh, what each area is really like, and which rooms actually face the lake.",
    options: [
      {
        id: "ht-3star",
        propertyType: "3-star hotel",
        area: "Rajbagh",
        priceFrom: 1800,
        amenities: ["Breakfast", "Room heater", "Wi-Fi", "Parking"],
        bestFor: "Families keeping the budget sensible",
      },
      {
        id: "ht-4star",
        propertyType: "4-star lake-facing",
        area: "Boulevard Road",
        priceFrom: 4200,
        amenities: ["Breakfast", "Lake-view room", "Restaurant", "Airport transfer"],
        bestFor: "First-timers who want the Dal Lake view",
      },
    ],
    howToChoose: [
      "Boulevard Road is walkable to the shikara ghats but the most expensive per square foot in the city.",
      "Rajbagh and Gogji Bagh are ten minutes from the lake, noticeably quieter and often 30% cheaper.",
      "\"Lake-facing hotel\" and \"lake-facing room\" are different things — confirm the room, in writing.",
    ],
    sartajTips: [
      "Rooms on the third floor and above on Boulevard Road get the view; lower floors look straight at parked cars.",
      "In winter ask whether heating is central or a portable bukhari — it changes the night entirely.",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Which area is best to stay in Srinagar?",
        answer:
          "Boulevard Road for the lake view and walkability, Rajbagh or Gogji Bagh for quiet and value, and near Lal Chowk if you are shopping. All three are within a 15-minute drive of each other.",
      },
      {
        id: "faq-2",
        question: "How much is a hotel in Srinagar per night?",
        answer:
          "Clean 3-star rooms start around ₹1,800 per night with breakfast. Lake-facing 4-star rooms on Boulevard Road run ₹4,200 and up, and peak sharply during the Tulip Festival.",
      },
    ],
    links: {
      destination: "/destinations/srinagar/",
      package: "/kashmir-tour-packages/family/",
      cabRoute: "/cab-service/",
    },
  },
  {
    slug: "srinagar-luxury-resorts",
    title: "Srinagar Luxury Resorts",
    town: "Srinagar",
    area: "Cheshma Shahi & Nishat",
    category: "Resort",
    answerBlock:
      "Srinagar's luxury resorts start near ₹14,000 a night and sit above the lake around Cheshma Shahi and Nishat, not on Boulevard Road. You are paying for grounds, quiet and a view down over the whole Dal — but you will drive to everything.",
    cardSummary: "Hillside grounds above Dal Lake with the valley's best views.",
    priceFrom: 14000,
    highlights: ["Spa", "Fine dining", "Panoramic views"],
    sleeps: 3,
    gallery: [
      {
        id: "lx-1",
        image: img("1631049307264-da0ec9d70304"),
        alt: "Luxury resort terrace above Dal Lake near Cheshma Shahi, Srinagar",
      },
      {
        id: "lx-2",
        image: img("1596394516093-501ba68a0ba6"),
        alt: "Suite interior at a Srinagar luxury resort with valley-facing windows",
      },
      {
        id: "lx-3",
        image: img("1618773928121-c32242e63f39"),
        alt: "Resort garden and lawn overlooking the Dal Lake basin in Srinagar",
      },
    ],
    image: img("1631049307264-da0ec9d70304"),
    alt: "Luxury resort overlooking Dal Lake, Srinagar",
    metaTitle: "Luxury Resorts in Srinagar 2026 | Rates, Areas & What You Get",
    metaDescription:
      "Srinagar luxury resorts from ₹14,000/night around Cheshma Shahi and Nishat — what the premium actually buys, and when a Boulevard Road hotel is the smarter booking.",
    options: [
      {
        id: "lx-suite",
        propertyType: "Luxury resort room",
        area: "Cheshma Shahi",
        priceFrom: 14000,
        amenities: ["Breakfast", "Spa", "Restaurant", "Airport transfer"],
        bestFor: "Honeymooners wanting privacy and grounds",
      },
      {
        id: "lx-villa",
        propertyType: "Private villa",
        area: "Nishat",
        priceFrom: 26000,
        amenities: ["All meals", "Private garden", "Butler service", "Heating"],
        bestFor: "Special occasions and small family groups",
      },
    ],
    howToChoose: [
      "These properties sit 6–9 km uphill from Boulevard Road — factor a cab into every outing.",
      "The view is the product. If your room does not face the lake, the premium is largely wasted.",
      "Shoulder season (Oct–Nov, Feb) can cut these rates by a third with no drop in service.",
    ],
    sartajTips: [
      "Ask for a room on the upper terrace level — the lower blocks at most of these resorts look into the hillside, not the lake.",
      "Cheshma Shahi is a 10-minute drive from the Nishat and Shalimar gardens, so do all three in one morning.",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Are luxury resorts in Srinagar worth it?",
        answer:
          "If you want grounds, quiet and a panoramic view, yes. If your days are packed with sightseeing, a lake-facing Boulevard Road hotel costs a third as much and saves you two cab rides a day.",
      },
      {
        id: "faq-2",
        question: "How far are they from Srinagar airport?",
        answer:
          "Around 20–24 km, roughly 50 minutes. Most properties include or arrange an airport transfer.",
      },
    ],
    links: {
      destination: "/destinations/srinagar/",
      package: "/kashmir-tour-packages/honeymoon/",
      cabRoute: "/cab-service/",
    },
  },
  {
    slug: "gulmarg-resorts",
    title: "Gulmarg Mountain Resorts",
    town: "Gulmarg",
    area: "Gulmarg, Baramulla",
    category: "Resort",
    answerBlock:
      "Gulmarg resorts start from about ₹5,500 a night in season and sit at 2,650 m, so heating matters more than the view. Staying in Gulmarg itself saves you the daily Tangmarg climb — critical in January when the road needs snow chains.",
    cardSummary: "Pine-wood resorts at 2,650 m, walking distance from the Gondola.",
    priceFrom: 5500,
    highlights: ["Central heating", "Near Gondola", "All meals available"],
    sleeps: 4,
    gallery: [
      {
        id: "rs-1",
        image: img("1551882547-ff40c63fe5fa"),
        alt: "Snow-covered pine-wood resort in Gulmarg with the Affarwat range behind it",
      },
      {
        id: "rs-2",
        image: img("1587061949409-02df41d5e562"),
        alt: "Resort room in Gulmarg with a fireplace and windows facing the ski slopes",
      },
      {
        id: "rs-3",
        image: img("1584132967334-10e028bd69f7"),
        alt: "Gulmarg resort terrace looking out over deep snow and pine forest",
      },
      {
        id: "rs-4",
        image: img("1502672260266-1c1ef2d93688"),
        alt: "Gondola cable car seen from a Gulmarg resort on a clear winter morning",
      },
    ],
    image: img("1551882547-ff40c63fe5fa"),
    alt: "Snow-covered mountain resort in Gulmarg, Kashmir",
    metaTitle: "Gulmarg Resorts 2026 | Ski-In Stays, Prices & Winter Booking Tips",
    metaDescription:
      "Gulmarg resort stays from ₹5,500/night — which properties are walking distance from the Gondola, what heating to insist on, and why staying up in Gulmarg beats Tangmarg.",
    options: [
      {
        id: "rs-standard",
        propertyType: "Mountain resort",
        area: "Gulmarg — upper bowl",
        priceFrom: 5500,
        amenities: ["Central heating", "All meals", "Ski storage", "Parking"],
        bestFor: "Skiers who want to walk to the Gondola",
      },
      {
        id: "rs-luxury",
        propertyType: "Luxury ski resort",
        area: "Gulmarg — Gondola road",
        priceFrom: 12000,
        amenities: ["Heated rooms", "Spa", "Restaurant", "Equipment hire"],
        bestFor: "Honeymooners and serious snow weeks",
      },
    ],
    howToChoose: [
      "Staying in Gulmarg beats staying in Tangmarg — you avoid a 13 km climb that closes without warning after heavy snow.",
      "Anything described as \"near Gulmarg\" is usually Tangmarg. Ask for the actual distance to the Gondola base.",
      "Off-season (Apr–Oct) the same rooms drop by half and Gulmarg becomes a green meadow walk.",
    ],
    sartajTips: [
      "From December to February a Srinagar sedan cannot make the Tangmarg–Gulmarg climb — you need a snow-jeep with chains beyond Tangmarg.",
      "Book Gondola Phase 1 tickets before you arrive; the on-site queue in January can cost you the whole morning.",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Should I stay in Gulmarg or do a day trip from Srinagar?",
        answer:
          "Stay in Gulmarg if you plan to ski or want first light on Affarwat. A day trip from Srinagar works in summer, but in deep winter the road can shut and you lose the day.",
      },
      {
        id: "faq-2",
        question: "How much do Gulmarg resorts cost?",
        answer:
          "In-season resorts start around ₹5,500 per night, with luxury ski properties from ₹12,000. Rates roughly halve between April and October.",
      },
    ],
    links: {
      destination: "/destinations/gulmarg/",
      package: "/kashmir-tour-packages/honeymoon/",
      cabRoute: "/cab-service/srinagar-to-gulmarg/",
    },
  },
  {
    slug: "pahalgam-hotels",
    title: "Pahalgam Hotels",
    town: "Pahalgam",
    area: "Pahalgam, Anantnag",
    category: "Hotel",
    answerBlock:
      "Pahalgam hotels start near ₹2,200 a night. The ones along the Lidder river are worth the premium — you get the water noise instead of the main-road noise. Stay two nights if you want Aru, Betaab and Chandanwari without rushing any of them.",
    cardSummary: "Riverside rooms on the Lidder, a short drive from Aru and Betaab.",
    priceFrom: 2200,
    highlights: ["River-facing", "Breakfast included", "Parking"],
    sleeps: 4,
    gallery: [
      {
        id: "ph-1",
        image: img("1522708323590-d24dbb6b0267"),
        alt: "Hotel beside the Lidder river in Pahalgam surrounded by pine forest",
      },
      {
        id: "ph-2",
        image: img("1560448204-e02f11c3d0e2"),
        alt: "Warm hotel room in Pahalgam with wooden panelling and a river view",
      },
      {
        id: "ph-3",
        image: img("1595576508898-0ad5c879a061"),
        alt: "Pahalgam hotel garden looking towards the surrounding pine ridges",
      },
    ],
    image: img("1522708323590-d24dbb6b0267"),
    alt: "Riverside hotel in Pahalgam, Kashmir",
    metaTitle: "Hotels in Pahalgam 2026 | River-Facing Stays, Prices & Areas",
    metaDescription:
      "Pahalgam hotels from ₹2,200/night — which properties actually face the Lidder, how many nights you need for Aru and Betaab, and what to avoid on the main road.",
    options: [
      {
        id: "ph-standard",
        propertyType: "3-star hotel",
        area: "Pahalgam main market",
        priceFrom: 2200,
        amenities: ["Breakfast", "Room heater", "Parking", "Wi-Fi"],
        bestFor: "Short one-night stops",
      },
      {
        id: "ph-river",
        propertyType: "River-facing hotel",
        area: "Lidder riverside",
        priceFrom: 4800,
        amenities: ["Breakfast", "River-view balcony", "Restaurant", "Heating"],
        bestFor: "Families staying two nights or more",
      },
    ],
    howToChoose: [
      "River-facing rooms cost roughly double and are the single upgrade worth paying for in Pahalgam.",
      "Main-market hotels are convenient for food but sit on the pony-stand road, which is loud from 7 AM.",
      "Aru and Betaab valleys are 11 km and 15 km away — you need a local Pahalgam taxi, not your Srinagar cab.",
    ],
    sartajTips: [
      "Srinagar cabs cannot do local Pahalgam sightseeing — the Aru/Betaab/Chandanwari run is a separate local union taxi. Budget for it.",
      "Ask which bank of the Lidder the hotel is on; the far bank is quieter but adds a bridge crossing to every trip into town.",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "How many nights should I stay in Pahalgam?",
        answer:
          "Two. One night only gives you the drive plus the market. Two lets you do Aru and Betaab properly, and Chandanwari if the road is open.",
      },
      {
        id: "faq-2",
        question: "How much are hotels in Pahalgam?",
        answer:
          "Standard 3-star rooms start around ₹2,200 per night with breakfast. River-facing rooms start near ₹4,800 and are worth it if you are staying more than one night.",
      },
    ],
    links: {
      destination: "/destinations/pahalgam/",
      package: "/kashmir-tour-packages/family/",
      cabRoute: "/cab-service/srinagar-to-pahalgam/",
    },
  },
  {
    slug: "sonamarg-stays",
    title: "Sonamarg Stays",
    town: "Sonamarg",
    area: "Sonamarg, Ganderbal",
    category: "Hotel",
    answerBlock:
      "Sonamarg stays start near ₹2,800 a night and are strictly seasonal — most properties close from November to April when the road over Zoji La shuts. Staying overnight is the only way to reach Thajiwas glacier before the day-trip crowds arrive at 11 AM.",
    cardSummary: "Seasonal riverside lodges at the foot of the Thajiwas glacier.",
    priceFrom: 2800,
    highlights: ["Glacier access", "Riverside", "Seasonal only"],
    sleeps: 4,
    gallery: [
      {
        id: "sm-1",
        image: img("1600585154340-be6161a56a0c"),
        alt: "Lodge in Sonamarg beside the Sindh river with snow peaks behind",
      },
      {
        id: "sm-2",
        image: img("1600607687939-ce8a6c25118c"),
        alt: "Simple twin room in a Sonamarg lodge with mountain-facing windows",
      },
      {
        id: "sm-3",
        image: img("1618221195710-dd6b41faaea6"),
        alt: "Meadow and river at Sonamarg seen from a guest lodge verandah",
      },
    ],
    image: img("1600585154340-be6161a56a0c"),
    alt: "Riverside lodge in Sonamarg, Kashmir",
    metaTitle: "Sonamarg Hotels 2026 | Seasonal Stays, Prices & Glacier Access",
    metaDescription:
      "Sonamarg stays from ₹2,800/night — when properties are actually open, why an overnight beats a day trip, and how to reach Thajiwas glacier before the crowds.",
    options: [
      {
        id: "sm-lodge",
        propertyType: "Mountain lodge",
        area: "Sonamarg town",
        priceFrom: 2800,
        amenities: ["Breakfast", "Room heater", "Parking"],
        bestFor: "Amarnath-route travellers and glacier walks",
      },
      {
        id: "sm-camp",
        propertyType: "Deluxe camp",
        area: "Sindh riverside",
        priceFrom: 4500,
        amenities: ["All meals", "Attached bath", "Bonfire", "River view"],
        bestFor: "Summer travellers wanting to sleep by the river",
      },
    ],
    howToChoose: [
      "Check the opening window before anything else — most Sonamarg properties operate May to October only.",
      "Riverside camps are the better experience in June–August; solid lodges are safer in shoulder season.",
      "Sonamarg is 80 km from Srinagar, roughly 2.5 hours. It is a long day trip and a comfortable overnight.",
    ],
    sartajTips: [
      "Day-trippers from Srinagar reach Thajiwas around 11 AM. Stay the night, start at 8, and you will have the glacier path to yourself.",
      "Pony rates to Thajiwas are negotiated, not fixed — agree the price and the turnaround point before you mount.",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Is it worth staying overnight in Sonamarg?",
        answer:
          "Yes, if the glacier matters to you. The 2.5-hour drive each way makes for a rushed day trip, and an overnight puts you at Thajiwas hours before the Srinagar buses arrive.",
      },
      {
        id: "faq-2",
        question: "Are Sonamarg hotels open in winter?",
        answer:
          "Mostly no. The Zoji La road closes with snow and most properties shut from November to April. Confirm the opening window before booking anything outside May–October.",
      },
    ],
    links: {
      destination: "/destinations/sonamarg/",
      package: "/kashmir-tour-packages/family/",
      cabRoute: "/cab-service/srinagar-to-sonamarg/",
    },
  },
  {
    slug: "kashmir-homestays",
    title: "Kashmir Homestays",
    town: "Pahalgam",
    area: "Pahalgam, Aru & Yusmarg",
    category: "Homestay",
    answerBlock:
      "Kashmiri homestays start from about ₹1,200 a night and usually include home-cooked meals with the family. They are the best value in the valley and the only way to eat proper Wazwan outside a wedding — but expect shared bathrooms at the lower end.",
    cardSummary: "Family-run walnut-wood homes with home-cooked Wazwan and vetted hosts.",
    priceFrom: 1200,
    highlights: ["Home-cooked meals", "Local hosts", "Best value"],
    sleeps: 5,
    gallery: [
      {
        id: "hs-1",
        image: img("1493809842364-78817add7ffb"),
        alt: "Kashmiri family homestay courtyard in Pahalgam with a walnut-wood verandah",
      },
      {
        id: "hs-2",
        image: img("1517320964276-a002fa203177"),
        alt: "Home-cooked Kashmiri meal served on a copper trami at a homestay",
      },
      {
        id: "hs-3",
        image: img("1613490493576-7fde63acd811"),
        alt: "Simple homestay bedroom in Aru valley with hand-woven blankets",
      },
    ],
    image: img("1493809842364-78817add7ffb"),
    alt: "Family-run Kashmiri homestay in Pahalgam",
    metaTitle: "Kashmir Homestays 2026 | Prices, Where to Book & What to Expect",
    metaDescription:
      "Kashmiri homestays from ₹1,200/night in Pahalgam, Aru and Yusmarg — home-cooked meals, what the rooms are actually like, and how to pick a genuine family host.",
    options: [
      {
        id: "hs-basic",
        propertyType: "Village homestay",
        area: "Aru & Yusmarg",
        priceFrom: 1200,
        amenities: ["Home-cooked meals", "Bukhari heating", "Local guide help"],
        bestFor: "Budget travellers and slow trips",
      },
      {
        id: "hs-premium",
        propertyType: "Premium homestay",
        area: "Pahalgam town",
        priceFrom: 2800,
        amenities: ["Private bathroom", "All meals", "Wi-Fi", "Garden"],
        bestFor: "Families wanting local food with comfort",
      },
    ],
    howToChoose: [
      "Below roughly ₹1,500 a night, assume a shared bathroom unless the listing says otherwise.",
      "Homestays in Aru and Yusmarg have patchy mobile signal — download your maps before you leave Pahalgam.",
      "The meal is the point. Pick a host who cooks, not one who sends you into town to eat.",
    ],
    sartajTips: [
      "A genuine homestay will happily put you on a call with the host before you pay. If the agent refuses, it is a guesthouse being resold.",
      "Carry cash — most village homestays in Aru have no card machine and UPI drops with the signal.",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Are homestays in Kashmir safe for families?",
        answer:
          "Yes — family homestays are common across Pahalgam, Aru and Yusmarg, and hosts typically live on the property. Book one we have visited, and confirm whether the bathroom is private before paying.",
      },
      {
        id: "faq-2",
        question: "How much does a Kashmiri homestay cost?",
        answer:
          "Village homestays start around ₹1,200 per night including home-cooked meals. Premium homestays in Pahalgam town with private bathrooms start near ₹2,800.",
      },
    ],
    links: {
      destination: "/destinations/pahalgam/",
      package: "/kashmir-tour-packages/family/",
      cabRoute: "/cab-service/srinagar-to-pahalgam/",
    },
  },
  {
    slug: "aru-valley-homestays",
    title: "Aru Valley Homestays",
    town: "Aru",
    area: "Aru Valley, Pahalgam",
    category: "Homestay",
    answerBlock:
      "Aru valley homestays start near ₹1,400 a night, 11 km above Pahalgam at the trailhead for Lidderwat and Kolahoi. Signal is patchy and hot water is bucket-fed at the cheaper houses — which is exactly why the valley still feels like the valley.",
    cardSummary: "Trailhead village homes for Lidderwat and Kolahoi trekkers.",
    priceFrom: 1400,
    highlights: ["Trek trailhead", "All meals", "Bukhari heating"],
    sleeps: 4,
    gallery: [
      {
        id: "ar-1",
        image: img("1568605114967-8130f3a36994"),
        alt: "Wooden homestay in Aru village surrounded by meadow and pine",
      },
      {
        id: "ar-2",
        image: img("1586375300773-8384e3e4916f"),
        alt: "Simple guest bedroom in an Aru valley homestay with mountain views",
      },
      {
        id: "ar-3",
        image: img("1499793983690-e29da59ef1c2"),
        alt: "Meadow and shepherd huts above Aru valley in summer",
      },
    ],
    image: img("1568605114967-8130f3a36994"),
    alt: "Village homestay in Aru valley, Kashmir",
    metaTitle: "Aru Valley Homestays 2026 | Trek Base, Prices & What to Expect",
    metaDescription:
      "Aru valley homestays from ₹1,400/night — the base for Lidderwat and Kolahoi treks, what facilities to actually expect, and when the road up from Pahalgam is open.",
    options: [
      {
        id: "ar-basic",
        propertyType: "Village homestay",
        area: "Aru village",
        priceFrom: 1400,
        amenities: ["All meals", "Bukhari heating", "Trek guide contacts"],
        bestFor: "Trekkers heading to Lidderwat",
      },
      {
        id: "ar-cottage",
        propertyType: "Guest cottage",
        area: "Aru — upper meadow",
        priceFrom: 3200,
        amenities: ["Private bathroom", "All meals", "Hot water", "Meadow view"],
        bestFor: "Couples wanting quiet with comfort",
      },
    ],
    howToChoose: [
      "Aru is 11 km of narrow road above Pahalgam — check road status in shoulder season before committing.",
      "If you are trekking, stay in the village itself; the upper-meadow cottages add a 20-minute walk with a pack.",
      "Ask specifically about hot water. Bucket-fed is normal below ₹2,000 and is not a complaint worth making on arrival.",
    ],
    sartajTips: [
      "Aru is where the Lidderwat and Kolahoi treks actually start. Sleeping in Pahalgam instead costs you the best two hours of morning light.",
      "Mobile signal is unreliable above Pahalgam — tell someone your plan before you drive up, and download offline maps.",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Is Aru worth staying in over Pahalgam?",
        answer:
          "For trekkers and photographers, yes — you start at the trailhead and get the meadow before the day visitors. For general sightseeing, Pahalgam has far more choice and easier access.",
      },
      {
        id: "faq-2",
        question: "How do I get to Aru valley?",
        answer:
          "It is 11 km from Pahalgam on a narrow mountain road, about 40 minutes by local taxi. Srinagar cabs cannot run this route — you take a Pahalgam local union taxi.",
      },
    ],
    links: {
      destination: "/destinations/aru/",
      package: "/kashmir-tour-packages/adventure/",
      cabRoute: "/cab-service/srinagar-to-pahalgam/",
    },
  },
  {
    slug: "yusmarg-cottages",
    title: "Yusmarg Cottages",
    town: "Yusmarg",
    area: "Yusmarg, Budgam",
    category: "Resort",
    answerBlock:
      "Yusmarg cottages start near ₹2,600 a night, 47 km south-west of Srinagar. It is the quietest meadow in the valley because almost no tour buses come here — which also means limited food options and no ATM. Bring cash and treat it as a slow two-night stop.",
    cardSummary: "Quiet meadow cottages in the valley's least-visited hill station.",
    priceFrom: 2600,
    highlights: ["Very quiet", "Meadow walks", "All meals"],
    sleeps: 4,
    gallery: [
      {
        id: "ym-1",
        image: img("1505693416388-ac5ce068fe85"),
        alt: "Wooden cottage in the Yusmarg meadow surrounded by pine forest",
      },
      {
        id: "ym-2",
        image: img("1522771739844-6a9f6d5f14af"),
        alt: "Cottage bedroom in Yusmarg with a wood stove and meadow-facing window",
      },
      {
        id: "ym-3",
        image: img("1520250497591-112f2f40a3f4"),
        alt: "Open meadow and pine ridges at Yusmarg on a clear morning",
      },
    ],
    image: img("1505693416388-ac5ce068fe85"),
    alt: "Meadow cottage at Yusmarg, Kashmir",
    metaTitle: "Yusmarg Cottages 2026 | Quiet Meadow Stays, Prices & Access",
    metaDescription:
      "Yusmarg cottages from ₹2,600/night — the valley's quietest hill station 47 km from Srinagar, what facilities exist, and why you should carry cash.",
    options: [
      {
        id: "ym-cottage",
        propertyType: "Meadow cottage",
        area: "Yusmarg",
        priceFrom: 2600,
        amenities: ["All meals", "Wood stove", "Parking", "Meadow view"],
        bestFor: "Travellers who want genuine quiet",
      },
      {
        id: "ym-huts",
        propertyType: "Tourist huts",
        area: "Yusmarg — forest edge",
        priceFrom: 1800,
        amenities: ["Basic meals", "Heating", "Forest walks"],
        bestFor: "Budget stays and short overnight stops",
      },
    ],
    howToChoose: [
      "There is no market to speak of — book a property that serves all meals, not just breakfast.",
      "Yusmarg has no ATM and unreliable card acceptance. Draw cash in Srinagar before you leave.",
      "It is 47 km from Srinagar, about 1.5 hours, and works well as a quiet break between city nights.",
    ],
    sartajTips: [
      "Yusmarg gets a fraction of Gulmarg's visitors for a meadow that is arguably prettier in summer. Go before that changes.",
      "The Nilnag lake walk is 4 km from the cottages and needs a local guide — the trail forks twice and is not marked.",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Is Yusmarg worth visiting?",
        answer:
          "If you want quiet meadows and pine forest without crowds, yes. If you want activities, shops and restaurants, Gulmarg or Pahalgam will suit you far better.",
      },
      {
        id: "faq-2",
        question: "How far is Yusmarg from Srinagar?",
        answer:
          "About 47 km, roughly 1.5 hours by road via Chadoora. It is an easy day trip but a much better overnight.",
      },
    ],
    links: {
      destination: "/destinations/yusmarg/",
      package: "/kashmir-tour-packages/family/",
      cabRoute: "/cab-service/",
    },
  },
];

export function getAllStays(): Stay[] {
  return STAYS;
}

export function getStayBySlug(slug: string): Stay | null {
  return STAYS.find((stay) => stay.slug === slug) ?? null;
}