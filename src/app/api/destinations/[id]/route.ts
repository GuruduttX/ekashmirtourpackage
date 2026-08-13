import { connectDB } from '@/lib/db';
import Destination from '@/models/Destination';
import { handleWriteError } from '@/lib/apiErrors';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const destination = await Destination.findById(id).lean();
    if (!destination) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ destination });
  } catch {
    return Response.json({ error: 'Failed to fetch destination' }, { status: 500 });
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
    const destination = await Destination.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!destination) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ destination });
  } catch (error: unknown) {
    return handleWriteError(error, 'update destination');
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await Destination.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete destination' }, { status: 500 });
  }
}
