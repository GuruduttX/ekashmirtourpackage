import { connectDB } from '@/lib/db';
import StayPlace from '@/models/StayPlace';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const place = await StayPlace.findById(id).lean();
    if (!place) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ place });
  } catch {
    return Response.json({ error: 'Failed to fetch stay place' }, { status: 500 });
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
    const place = await StayPlace.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!place) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ place });
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: number }).code === 11000
    ) {
      return Response.json({ error: 'Slug already exists' }, { status: 409 });
    }
    return Response.json({ error: 'Failed to update stay place' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await StayPlace.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete stay place' }, { status: 500 });
  }
}
