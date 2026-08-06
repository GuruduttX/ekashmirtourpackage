import { NextResponse } from 'next/server';
import Review from '@/models/Review'; 
import connectDB from '@/lib/db';
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Create the review (status defaults to 'pending')
    const newReview = await Review.create(body);

    return NextResponse.json({ success: true, data: newReview }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const packageId = searchParams.get('packageId');

    if (!packageId) {
      return NextResponse.json({ success: false, message: 'packageId is required' }, { status: 400 });
    }

    // Only fetch approved reviews to show to the public
    const reviews = await Review.find({ 
      packageId, 
      status: 'approved' 
    }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: reviews }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}