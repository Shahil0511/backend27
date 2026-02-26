import { Schema, model, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  code: string;
  slug: string;
  description?: string;
  isActive: boolean;
  isDeleted: boolean;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

categorySchema.index({ createdAt: -1 });

export const Category: Model<ICategory> = model<ICategory>(
  "Category",
  categorySchema
);