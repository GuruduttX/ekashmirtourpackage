import { connectDB } from '@/lib/db';
import Stay from '@/models/Stay';
import { STAYS } from '@/data/stays';
import type { StayAmenityGroup } from '@/types/stayTypes';

export const dynamic = 'force-dynamic';

/**
 * Dev-only seeder — turns the static placeholder properties into Stay records
 * so the public detail page can be built against real CMS data.
 *
 * Blocked in production: this writes content and is unauthenticated. Delete it
 * once real properties exist.
 *
 *   curl -X POST http://localhost:3000/api/stays/properties/seed
 *
 * REMINDER: the property names, prices and photos in the source data are all
 * placeholders. None of this is publishable as-is.
 */

/** Keyword → amenity group, so amenities carry sensible groups without hand-tagging. */
const GROUP_RULES: Array<[RegExp, StayAmenityGroup]> = [
  [/breakfast|meal|wazwan|kahwa|dining/i, 'Food'],
  [/shikara|transfer|airport|parking|jeep/i, 'Transport'],
  [/heat|bukhari|fireplace|spa|ensuite|bath|wi-?fi|hot water/i, 'Comfort'],
  [/deck|garden|terrace|meadow|river|bonfire|ski|trek|view|lawn/i, 'Outdoor'],
];

function groupFor(label: string): StayAmenityGroup {
  return GROUP_RULES.find(([re]) => re.test(label))?.[1] ?? 'Essentials';
}

/** Per-slug extras the static data has no field for. */
const EXTRAS: Record<
  string,
  {
    tipTitles: string[];
    exclusions: string[];
    checkIn?: string;
    checkOut?: string;
    bedrooms?: number;
  }
> = {
  'dal-lake-deluxe-houseboat': {
    tipTitles: ['Pick the right ghat', 'Check the bukhari in winter'],
    exclusions: ['Extra shikara rides beyond the transfer', 'Lunch and dinner', 'Gondola or sightseeing tickets'],
    checkIn: '1:00 PM',
    checkOut: '10:00 AM',
    bedrooms: 2,
  },
  'nigeen-heritage-houseboat': {
    tipTitles: ['Choose your bank for the light', 'Budget the extra travel time'],
    exclusions: ['Sightseeing transport', 'Extra shikara hire', 'Personal expenses'],
    checkIn: '1:00 PM',
    checkOut: '10:00 AM',
    bedrooms: 2,
  },
  'boulevard-lake-view-hotel': {
    tipTitles: ['Confirm the floor, not the building', 'Ask what the heating actually is'],
    exclusions: ['Lunch and dinner', 'Shikara rides', 'Laundry'],
    bedrooms: 1,
  },
  'rajbagh-city-hotel': {
    tipTitles: ['Where Srinagar families put their guests', 'Shop before 10 AM'],
    exclusions: ['Lunch and dinner', 'Airport transfer', 'Sightseeing cab'],
    bedrooms: 1,
  },
  'lidder-riverside-hotel': {
    tipTitles: ['Your Srinagar cab stops here', 'Avoid the pony-stand road'],
    exclusions: ['Local Pahalgam taxi for Aru and Betaab', 'Pony rides', 'Lunch and dinner'],
    bedrooms: 1,
  },
  'sonamarg-mountain-lodge': {
    tipTitles: ['Beat the day-trippers to Thajiwas', 'Agree the pony rate first'],
    exclusions: ['Pony hire to Thajiwas glacier', 'Lunch', 'Anything between November and April'],
    bedrooms: 1,
  },
  'gulmarg-pine-resort': {
    tipTitles: ['A Srinagar sedan cannot make the climb', 'Book the Gondola before you arrive'],
    exclusions: ['Gondola tickets', 'Ski equipment hire and instruction', 'Snow-jeep from Tangmarg'],
    bedrooms: 1,
  },
  'cheshma-shahi-hillside-resort': {
    tipTitles: ['Insist on the upper terrace', 'Do all three gardens in one morning'],
    exclusions: ['Spa treatments', 'Lunch and dinner', 'Sightseeing cab'],
    bedrooms: 1,
  },
  'yusmarg-meadow-cottages': {
    tipTitles: ['Carry cash — there is no ATM', 'Go before it changes'],
    exclusions: ['Transport from Srinagar', 'Guide for the Nilnag walk', 'Pony rides'],
    bedrooms: 2,
  },
  'aru-valley-homestay': {
    tipTitles: ['Sleep at the trailhead', 'Download maps in Pahalgam'],
    exclusions: ['Trek guides and porters', 'Local taxi from Pahalgam', 'Bottled drinks'],
    bedrooms: 2,
  },
  'pahalgam-family-homestay': {
    tipTitles: ['Call the host before you pay', 'Order Wazwan a day ahead'],
    exclusions: ['Local sightseeing taxi', 'Pony rides', 'Laundry'],
    bedrooms: 2,
  },
};

const DEFAULT_EXTRAS = {
  tipTitles: [] as string[],
  exclusions: ['Lunch and dinner unless stated', 'Sightseeing transport', 'Personal expenses'],
  checkIn: '12:00 PM',
  checkOut: '11:00 AM',
  bedrooms: 1,
};

/** Turn the answer block + how-to-choose notes into the rich-text overview. */
function buildOverview(answerBlock: string, howToChoose: string[], cardSummary: string) {
  const bullets = howToChoose.map((point) => `<li>${point}</li>`).join('');
  return [
    `<p>${answerBlock}</p>`,
    `<p>${cardSummary}</p>`,
    howToChoose.length ? `<h3>Before you book</h3><ul>${bullets}</ul>` : '',
  ]
    .filter(Boolean)
    .join('');
}

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Seeding is disabled in production' }, { status: 403 });
  }

  try {
    await connectDB();

    const results: Array<{ slug: string; action: 'created' | 'updated' }> = [];

    for (const source of STAYS) {
      const extras = { ...DEFAULT_EXTRAS, ...(EXTRAS[source.slug] ?? {}) };

      // Amenities: the union of every room option's amenity list.
      const amenityLabels = Array.from(
        new Set(source.options.flatMap((option) => option.amenities)),
      );

      const doc = {
        // 1. Identity & routing
        slug: source.slug,
        title: source.title,
        category: source.category,
        town: source.town,
        area: source.area,
        placeTags: source.placeTags,
        host: 'eKashmir verified host',
        address: source.area,
        status: 'published' as const,

        // 2. Hero
        eyebrow: source.category,
        titleAccent: '',
        quickAnswer: source.answerBlock,
        heroImage: {
          image: source.gallery[0]?.image ?? source.image,
          alt: source.gallery[0]?.alt ?? source.alt,
        },

        // 3. Gallery
        gallery: source.gallery,

        // 4. Key facts & pricing
        priceFrom: source.priceFrom,
        bestFor: source.options[0]?.bestFor ?? '',
        sleeps: source.sleeps,
        bedrooms: extras.bedrooms,
        checkIn: extras.checkIn,
        checkOut: extras.checkOut,
        minNights: 1,
        highlights: source.highlights.map((label, i) => ({
          id: `h${i + 1}`,
          label,
        })),

        // 5. Amenities
        quickInclusions: {
          freeWifi: amenityLabels.some((a) => /wi-?fi/i.test(a)),
          breakfast: amenityLabels.some((a) => /breakfast|all meals/i.test(a)),
          parking: amenityLabels.some((a) => /parking/i.test(a)),
        },
        amenities: amenityLabels.map((label, i) => ({
          id: `a${i + 1}`,
          label,
          group: groupFor(label),
        })),

        // 6. Overview
        overview: buildOverview(source.answerBlock, source.howToChoose, source.cardSummary),

        // 7. Inclusions & exclusions
        inclusions: (source.options[0]?.amenities ?? []).map((description, i) => ({
          id: `i${i + 1}`,
          description,
        })),
        exclusions: extras.exclusions.map((description, i) => ({
          id: `e${i + 1}`,
          description,
        })),

        // 8. Policies
        cancellationPolicy:
          'Free cancellation up to 7 days before check-in. Within 7 days the advance is non-refundable, though we will always try to move your dates instead.',
        paymentTerms:
          '30% advance to confirm the booking, balance payable on arrival. Cash, UPI and bank transfer accepted — most properties outside Srinagar have no card machine.',
        houseRules: [
          { id: 'r1', rule: 'Check-in with a valid government photo ID for every adult' },
          { id: 'r2', rule: 'No smoking inside the rooms' },
          { id: 'r3', rule: 'Quiet hours after 10 PM' },
        ],

        // 9. Sartaj's tips
        tipsHeading: `Sartaj's tips for ${source.title}`,
        tipsIntro: 'What a local would tell you before booking this one.',
        sartajTips: source.sartajTips.map((tip, i) => ({
          id: `t${i + 1}`,
          title: extras.tipTitles[i] ?? `Tip ${i + 1}`,
          tip,
        })),

        // 10. FAQs
        faqsHeading: `${source.title} — questions, answered`,
        faqsIntro: 'What travellers ask us most before booking this property.',
        faqs: source.faqs,

        // 11. Internal linking
        linksHeading: 'Planning the rest of your trip?',
        linksIntro: '',
        internalLinks: [
          {
            id: 'l1',
            type: 'destination' as const,
            label: `Things to do in ${source.town}`,
            slug: source.links.destination.replace(/^\/+|\/+$/g, '').split('/').pop() ?? '',
            description: '',
          },
          {
            id: 'l2',
            type: 'package' as const,
            label: `${source.town} tour packages`,
            slug: source.links.package.replace(/^\/+|\/+$/g, '').split('/').pop() ?? '',
            description: '',
          },
          {
            id: 'l3',
            type: 'cab' as const,
            label: `Cab fares to ${source.town}`,
            slug: source.links.cabRoute.replace(/^\/+|\/+$/g, '').split('/').pop() ?? '',
            description: '',
          },
        ].filter((link) => link.slug && link.slug !== 'cab-service'),

        // 12. SEO
        metaTitle: source.metaTitle ?? source.title,
        metaDescription: source.metaDescription ?? source.answerBlock,
        schemaTitle: '',
        schemaDescription: '',
      };

      const existing = await Stay.findOne({ slug: source.slug }).select('_id').lean();
      await Stay.findOneAndUpdate({ slug: source.slug }, doc, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      });

      results.push({ slug: source.slug, action: existing ? 'updated' : 'created' });
    }

    return Response.json({ seeded: results.length, results });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
