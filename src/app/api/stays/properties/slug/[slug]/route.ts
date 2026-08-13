import { connectDB } from '@/lib/db';
import Stay from '@/models/Stay';

export const dynamic = 'force-dynamic';

/**
 * Public lookup by slug — published only, so a draft is never reachable from
 * the front end. Admin reads go through /api/stays/properties/[id].
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const stay = await Stay.findOne({ slug, status: 'published' }).lean();
    if (!stay) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ stay });
  } catch {
    return Response.json({ error: 'Failed to fetch stay' }, { status: 500 });
  }
}
