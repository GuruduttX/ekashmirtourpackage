import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug, status: 'published' }).lean();
    if (!blog) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ blog });
  } catch {
    return Response.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
