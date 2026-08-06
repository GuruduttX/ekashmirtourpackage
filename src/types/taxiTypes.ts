import { Document } from "mongoose";

export interface ITaxi extends Document {
  title: string;
  slug: string;
  basePrice: number;
  seats: number;
  cabType:
    | "SUV"
    | "Sedan"
    | "Hatchback"
    | "Tempo Traveller"
    | "Luxury"
    | "Electric";
  fuelType: "Petrol" | "Diesel" | "Electric" | "CNG";
  status: "published" | "draft";
  isAC: boolean;
  overview: string;
  inclusions: Array<{ id: string; description: string }>;
  exclusions: Array<{ id: string; description: string }>;
  faqs: Array<{ id: string; question: string; answer: string }>;
  metaTitle: string;
  metaDescription: string;
  image: string;
  alt: string;
  createdAt: Date;
  updatedAt: Date;
}
