import { ITaxi } from "@/types/taxiTypes";
import mongoose, { Schema } from "mongoose";

const taxiSchema = new Schema<ITaxi>(
  {
    title: { type: String, required: true },

    slug: { type: String, required: true, unique: true },

    basePrice: { type: Number, default: 0 },

    seats: { type: Number, default: 0 },

    cabType: {
      type: String,
      enum: [
        "SUV",
        "Sedan",
        "Hatchback",
        "Tempo Traveller",
        "Luxury",
        "Electric",
      ],
    },

    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },

    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "CNG"],
    },

    isAC: { type: Boolean, default: true },

    overview: { type: String, default: "" },

    inclusions: [
      {
        id: { type: String },
        description: { type: String },
      },
    ],

    exclusions: [
      {
        id: { type: String },
        description: { type: String },
      },
    ],

    faqs: [
      {
        id: { type: String },
        question: { type: String },
        answer: { type: String },
      },
    ],

    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },

    image: {
      type: String,
    },

    alt: {
      type: String,
    },
  },
  { timestamps: true },
);

const Taxi =
  mongoose.models.Taxi || mongoose.model<ITaxi>("Taxi", taxiSchema);

export default Taxi;
