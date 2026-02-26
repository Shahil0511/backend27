import { Schema, model, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;

  brand?: string;

  category: Schema.Types.ObjectId;
  subCategory: Schema.Types.ObjectId;

  sku: string;

  price: number;
  cost?: number;

  stock: number;


  isActive: boolean;
  isDeleted: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
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

    brand: {
      type: String,
      trim: true,
      index: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
      index: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },

    cost: {
      type: Number,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
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

/**
 * Enterprise Indexes
 */
productSchema.index({ category: 1, subCategory: 1 });
productSchema.index({ brand: 1, price: 1 });
productSchema.index({ createdAt: -1 });

export const Product: Model<IProduct> = model<IProduct>(
  "Product",
  productSchema
);