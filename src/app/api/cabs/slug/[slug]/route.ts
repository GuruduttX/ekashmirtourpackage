import { connectDB } from '@/lib/db';
import Taxi from '@/models/Taxi';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const cab = await Taxi.findOne({ slug, status: 'published' }).lean();
    if (!cab) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ cab });
  } catch {
    return Response.json({ error: 'Failed to fetch cab' }, { status: 500 });
  }
}
