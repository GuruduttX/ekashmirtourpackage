import { NextResponse } from 'next/server';
import Review from '@/models/Review';
import connectDB from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // 1. Change type to Promise
) {
  try {
    await connectDB();
    
    // 2. Await the params to extract the id
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const body = await req.json();
    const { status } = body; // Expects 'approved', 'rejected', or 'pending'

    // The findOneAndUpdate hook in our model will automatically 
    // recalculate the parent package rating when status changes
    const review = await Review.findByIdAndUpdate(
      id, // Use the awaited id here
      { status },
      { new: true, runValidators: true }
    );

    if (!review) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: review }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // 1. Change type to Promise
) {
  try {
    await connectDB();
    
    // 2. Await the params to extract the id
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    // Use findByIdAndDelete to ensure we grab the document before it's gone
    const review = await Review.findByIdAndDelete(id); // Use the awaited id here

    if (!review) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
    }

    // Trigger recalculation manually since the doc is now deleted
    await (Review as any).calculateAverageRating(review.packageId);

    return NextResponse.json({ success: true, message: 'Review deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}