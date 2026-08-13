import { connectDB } from '@/lib/db';
import StayPlace from '@/models/StayPlace';
import { STAY_PLACES } from '@/data/stayTaxonomy';
import { staticPlaceToPage } from '@/lib/stayPlacePage';

export const dynamic = 'force-dynamic';

/**
 * Dev-only seeder — upserts the static taxonomy into StayPlace so the public
 * place pages render from the CMS.
 *
 * Blocked in production: this endpoint writes content, and an unauthenticated
 * write endpoint on a live site is not something to leave lying around. Delete
 * it once the real records are in.
 *
 *   curl -X POST http://localhost:3000/api/stays/places/seed
 */
export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Seeding is disabled in production' }, { status: 403 });
  }

  try {
    await connectDB();

    const results: Array<{ slug: string; action: 'created' | 'updated' }> = [];

    for (const def of STAY_PLACES) {
      const page = staticPlaceToPage(def);

      const doc = {
        slug: page.slug,
        placeKey: page.placeKey,
        name: page.name,
        parentTown:
          def.slug === 'dal-lake' || def.slug === 'nigeen-lake'
            ? 'Srinagar'
            : def.slug === 'aru'
              ? 'Pahalgam'
              : '',
        status: 'published' as const,

        eyebrow: page.eyebrow,
        title: page.title,
        titleAccent: '',
        quickAnswer: page.quickAnswer,
        heroImage: page.heroImage,

        archiveHeading: `Stays in ${page.name}`,
        archiveIntro: `Every ${page.name} property we book, with the real starting price for each — not a teaser rate.`,

        tipsHeading: `Sartaj's tips for ${page.name}`,
        tipsIntro: `What a local would tell you before you book a bed in ${page.name} — the things the booking sites leave out.`,
        sartajTips: page.sartajTips,

        faqsHeading: `${page.name} stay questions, answered`,
        faqsIntro: `What travellers ask us most before booking a stay in ${page.name}.`,
        faqs: page.faqs,

        linksHeading: `Planning the rest of ${page.name}?`,
        linksIntro: '',
        internalLinks: page.internalLinks,

        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        schemaTitle: '',
        schemaDescription: '',
      };

      const existing = await StayPlace.findOne({ slug: page.slug }).select('_id').lean();
      await StayPlace.findOneAndUpdate({ slug: page.slug }, doc, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });

      results.push({ slug: page.slug, action: existing ? 'updated' : 'created' });
    }

    return Response.json({ seeded: results.length, results });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
