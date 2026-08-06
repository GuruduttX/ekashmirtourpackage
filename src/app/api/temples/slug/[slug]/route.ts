import { connectDB } from '@/lib/db';
import Temple from '@/models/Temple';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    const temple = await Temple.findOne({ slug, status: 'published' }).lean();
    if (!temple) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ temple });
  } catch {
    return Response.json({ error: 'Failed to fetch temple' }, { status: 500 });
  }
}
