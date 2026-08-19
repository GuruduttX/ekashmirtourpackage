import { connectDB } from '@/lib/db';
import ExperienceActivity from '@/models/ExperienceActivity';
import { handleWriteError } from '@/lib/apiErrors';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const activity = await ExperienceActivity.findById(id).lean();
    if (!activity) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ activity });
  } catch {
    return Response.json({ error: 'Failed to fetch activity' }, { status: 500 });
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
    const activity = await ExperienceActivity.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!activity) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ activity });
  } catch (error: unknown) {
    return handleWriteError(error, 'update activity');
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await ExperienceActivity.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete activity' }, { status: 500 });
  }
}
