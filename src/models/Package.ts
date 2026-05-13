import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPackage extends Document {
  title: string;
  slug: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  status: 'draft' | 'published';
  days: number;
  nights: number;
  durationbreakdown: Array<{ id: string; days: number; place: string }>;
  availableSrc: string[];
  destination: string;
  overview: string;
  highlights: Array<{ id: string; description: string }>;
  itinerary: Array<{ id: string; day: number; title: string; description: string }>;
  inclusions: Array<{ id: string; description: string }>;
  exclusions: Array<{ id: string; description: string }>;
  faqs: Array<{ id: string; question: string; answer: string }>;
  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;
  refund: string;
  cancel: string;
  confirmation: string;
  payment: string;
  heroImage: { alt: string; image: string };
  childImages: Array<{ id: string; image: string; alt: string }>;
  testimonials: Array<{ id: string; name: string; description: string; rating: string }>;
  knowBeforeYouGo: Array<{ id: string; description: string }>;
  routes: {
    source: string;
    destination: string;
    segments: Array<{ id: string; from: string; to: string }>;
  };
  isTransferIncluded: boolean;
  isStayIncluded: boolean;
  isBreakfastIncluded: boolean;
  isSightseeingIncluded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PackageSchema = new Schema<IPackage>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    duration: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    days: { type: Number, default: 0 },
    nights: { type: Number, default: 0 },
    durationbreakdown: [{ id: String, days: Number, place: String }],
    availableSrc: [{ type: String }],
    destination: { type: String, default: '' },
    overview: { type: String, default: '' },
    highlights: [{ id: String, description: String }],
    itinerary: [{ id: String, day: Number, title: String, description: String }],
    inclusions: [{ id: String, description: String }],
    exclusions: [{ id: String, description: String }],
    faqs: [{ id: String, question: String, answer: String }],
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    schemaTitle: { type: String, default: '' },
    schemaDescription: { type: String, default: '' },
    refund: { type: String, default: '' },
    cancel: { type: String, default: '' },
    confirmation: { type: String, default: '' },
    payment: { type: String, default: '' },
    heroImage: {
      alt: { type: String, default: '' },
      image: { type: String, default: '' },
    },
    childImages: [{ id: String, image: String, alt: String }],
    testimonials: [{ id: String, name: String, description: String, rating: String }],
    knowBeforeYouGo: [{ id: String, description: String }],
    routes: {
      source: { type: String, default: '' },
      destination: { type: String, default: '' },
      segments: [{ id: String, from: String, to: String }],
    },
    isTransferIncluded: { type: Boolean, default: false },
    isStayIncluded: { type: Boolean, default: false },
    isBreakfastIncluded: { type: Boolean, default: false },
    isSightseeingIncluded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Package: Model<IPackage> =
  mongoose.models.Package ?? mongoose.model<IPackage>('Package', PackageSchema);

export default Package;
