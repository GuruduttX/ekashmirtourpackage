import { connectDB } from '@/lib/db';
import Temple from '@/models/Temple';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const temple = await Temple.findById(id).lean();
    if (!temple) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ temple });
  } catch {
    return Response.json({ error: 'Failed to fetch temple' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const temple = await Temple.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!temple) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ temple });
  } catch {
    return Response.json({ error: 'Failed to update temple' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await Temple.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete temple' }, { status: 500 });
  }
}
