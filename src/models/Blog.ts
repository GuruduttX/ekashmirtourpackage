import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  category: string;
  slug: string;
  author: string;
  meta: { title: string; description: string };
  image: string;
  alt: string;
  subContent: string;
  content: string;
  structuredData: { title: string; description: string };
  faqs: Array<{ id: string; question: string; answer: string }>;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    meta: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
    },
    image: { type: String, default: '' },
    alt: { type: String, default: '' },
    subContent: { type: String, default: '' },
    content: { type: String, default: '' },
    structuredData: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
    },
    faqs: [{ id: String, question: String, answer: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  },
  { timestamps: true }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog ?? mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
