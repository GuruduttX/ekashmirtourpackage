import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  packageId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
  authorAvatarAlt: string;
  rating: number;
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  images: Array<{ id: string; url: string; alt: string }>;
  helpfulVotes: number;
  isVerifiedPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Extend the Model to include our custom static method
interface IReviewModel extends Model<IReview> {
  calculateAverageRating(packageId: mongoose.Types.ObjectId): Promise<void>;
}

const ReviewSchema = new Schema<IReview>(
  {
    packageId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Package', 
      required: true,
      index: true 
    },
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    authorName: { type: String, required: true },
    authorEmail: { type: String, required: true },
    authorAvatar: { type: String, default: '' },
    authorAvatarAlt: { type: String, default: '' },
    rating: { 
      type: Number, 
      required: true,
      min: 1,
      max: 5
    },
    title: { type: String, default: '' },
    content: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    },
    images: [{ 
      id: String, 
      url: String, 
      alt: String 
    }],
    helpfulVotes: { type: Number, default: 0 },
    isVerifiedPurchase: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Static method to calculate average rating and update the Package
ReviewSchema.statics.calculateAverageRating = async function (packageId: mongoose.Types.ObjectId) {
  const stats = await this.aggregate([
    { $match: { packageId, status: 'approved' } },
    {
      $group: {
        _id: '$packageId',
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await mongoose.model('Package').findByIdAndUpdate(packageId, {
      rating: stats.length > 0 ? Math.round(stats[0].averageRating * 10) / 10 : 0,
      reviews: stats.length > 0 ? stats[0].numOfReviews : 0,
    });
  } catch (error) {
    console.error('Failed to update package average rating:', error);
  }
};

// Hook: Run after a new review is saved
ReviewSchema.post('save', function () {
  (this.constructor as IReviewModel).calculateAverageRating(this.packageId);
});

// Hook: Run after a review is updated (e.g., approved/rejected by admin)
ReviewSchema.post('findOneAndUpdate', async function (doc) {
  if (doc) {
    await (doc.constructor as IReviewModel).calculateAverageRating(doc.packageId);
  }
});

// Initialize model
const Review = (mongoose.models.Review as IReviewModel) || 
  mongoose.model<IReview, IReviewModel>('Review', ReviewSchema);

export default Review;