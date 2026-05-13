import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findById(id).lean();
    if (!blog) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ blog });
  } catch {
    return Response.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!blog) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ blog });
  } catch {
    return Response.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await Blog.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
