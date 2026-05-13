import { connectDB } from '@/lib/db';
import Package from '@/models/Package';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const pkg = await Package.findOne({ slug, status: 'published' }).lean();
    if (!pkg) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ package: pkg });
  } catch {
    return Response.json({ error: 'Failed to fetch package' }, { status: 500 });
  }
}
