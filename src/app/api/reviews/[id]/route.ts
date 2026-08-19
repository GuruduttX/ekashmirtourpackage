import { NextResponse } from 'next/server';
import Review from '@/models/Review';
import connectDB from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: review }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

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
    const updateFields = {
      packageId: body.packageId,
      authorName: body.authorName,
      authorEmail: body.authorEmail,
      authorAvatar: body.authorAvatar,
      authorAvatarAlt: body.authorAvatarAlt ?? '',
      rating: body.rating,
      title: body.title,
      content: body.content,
      status: body.status,
      isVerifiedPurchase: body.isVerifiedPurchase,
      images: body.images ?? [],
    };

    const review = await Review.findByIdAndUpdate(
      id,
      updateFields,
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