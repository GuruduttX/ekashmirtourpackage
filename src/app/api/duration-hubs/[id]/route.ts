import { connectDB } from '@/lib/db';
import DurationHub from '@/models/DurationHub';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const durationHub = await DurationHub.findById(id).lean();
    if (!durationHub) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ durationHub });
  } catch {
    return Response.json({ error: 'Failed to fetch duration hub' }, { status: 500 });
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
    const durationHub = await DurationHub.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!durationHub) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ durationHub });
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 11000) {
      return Response.json({ error: 'Slug already exists' }, { status: 409 });
    }
    return Response.json({ error: 'Failed to update duration hub' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await DurationHub.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete duration hub' }, { status: 500 });
  }
}
