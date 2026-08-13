import { connectDB } from '@/lib/db';
import Destination from '@/models/Destination';
import { DESTINATIONS } from '@/data/destinations';
import { staticDestinationToPage } from '@/lib/destinationPage';

export const dynamic = 'force-dynamic';

/**
 * Dev-only seeder — upserts src/data/destinations.ts into the Destination
 * collection so the public pages render from the CMS.
 *
 * Blocked in production: this endpoint writes content, and an unauthenticated
 * write endpoint on a live site is not something to leave lying around. Delete
 * it once the real records are in.
 *
 * Upsert, not insert, so re-running it is safe — but note it OVERWRITES an
 * existing record with the static copy, so run it before editing in the admin,
 * not after.
 *
 *   curl -X POST http://localhost:3000/api/destinations/seed
 */
export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Seeding is disabled in production' }, { status: 403 });
  }

  try {
    await connectDB();

    const results: Array<{ slug: string; action: 'created' | 'updated' }> = [];

    for (const destination of DESTINATIONS) {
      const page = staticDestinationToPage(destination);

      const existing = await Destination.findOne({ slug: page.slug }).select('_id').lean();

      await Destination.findOneAndUpdate({ slug: page.slug }, page, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });

      results.push({ slug: page.slug, action: existing ? 'updated' : 'created' });
    }

    return Response.json({ seeded: results.length, results });
  } catch (error: unknown) {
    console.log(error);
    return Response.json({ error: 'Failed to seed destinations' }, { status: 500 });
  }
}
