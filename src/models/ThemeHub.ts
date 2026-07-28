import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IThemeHub extends Document {
  // Identity & routing
  slug: string;
  themeName: string;
  status: 'draft' | 'published';

  // Hero
  title: string;
  titleAccent: string;
  subtitle: string;
  heroImage: { alt: string; image: string };
  stats: Array<{ id: string; value: string; label: string }>;
  gallery: string[];

  // Quick Answer (AEO)
  quickAnswer: string;

  // Editorial body (optional)
  overview: string;

  // Reviews
  testimonials: Array<{
    id: string;
    name: string;
    description: string;
    rating: string;
    location: string;
    avatar: string;
    avatarAlt: string;
    photo: string;
    photoAlt: string;
  }>;
  rating: number;
  reviewsCount: number;

  // FAQs
  faqs: Array<{ id: string; question: string; answer: string }>;

  // SEO / schema
  metaTitle: string;
  metaDescription: string;
  schemaTitle: string;
  schemaDescription: string;

  createdAt: Date;
  updatedAt: Date;
}

const ThemeHubSchema = new Schema<IThemeHub>(
  {
    slug: { type: String, required: true, unique: true },
    themeName: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },

    title: { type: String, required: true },
    titleAccent: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    heroImage: {
      alt: { type: String, default: '' },
      image: { type: String, default: '' },
    },
    stats: [{ id: String, value: String, label: String }],
    gallery: { type: [String], default: [] },

    quickAnswer: { type: String, default: '' },

    overview: { type: String, default: '' },

    testimonials: [{
      id: String,
      name: String,
      description: String,
      rating: String,
      location: { type: String, default: '' },
      avatar: { type: String, default: '' },
      avatarAlt: { type: String, default: '' },
      photo: { type: String, default: '' },
      photoAlt: { type: String, default: '' },
    }],
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },

    faqs: [{ id: String, question: String, answer: String }],

    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    schemaTitle: { type: String, default: '' },
    schemaDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

// themeName drives the package grid filter (Package.category); index for fast hub lookups
ThemeHubSchema.index({ themeName: 1 });

const ThemeHub: Model<IThemeHub> =
  mongoose.models.ThemeHub ?? mongoose.model<IThemeHub>('ThemeHub', ThemeHubSchema);

export default ThemeHub;
