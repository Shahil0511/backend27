import { Schema, model, Document, Model,Types } from "mongoose";

export interface ISubCategory extends Document {
  name: string;
  slug: string;
  category: Types.ObjectId;
  isActive: boolean;
  isDeleted: boolean;
}

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
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

// Prevent duplicate subcategory inside same category
subCategorySchema.index({ name: 1, category: 1 }, { unique: true });

export const SubCategory: Model<ISubCategory> = model<ISubCategory>(
  "SubCategory",
  subCategorySchema
);