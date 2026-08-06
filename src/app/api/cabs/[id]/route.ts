import { connectDB } from '@/lib/db';
import Taxi from '@/models/Taxi';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const cab = await Taxi.findById(id).lean();
    if (!cab) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ cab });
  } catch {
    return Response.json({ error: 'Failed to fetch cab' }, { status: 500 });
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
    const cab = await Taxi.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!cab) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ cab });
  } catch {
    return Response.json({ error: 'Failed to update cab' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await Taxi.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete cab' }, { status: 500 });
  }
}
