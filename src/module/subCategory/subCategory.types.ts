import { Types } from "mongoose";

/**
 * Payload from controller when creating subcategory
 */
export interface CreateSubCategoryPayload {
  name: string;
  category: Types.ObjectId | string;
}

/**
 * Payload sent to repository (after slug generation)
 */
export interface CreateSubCategoryRepoPayload {
  name: string;
  slug: string;
  category: Types.ObjectId;
}

/**
 * Update DTO
 */
export interface UpdateSubCategoryPayload {
  name?: string;
  category?: Types.ObjectId | string;
  isActive?: boolean;
  isDeleted?: boolean;
}

/**
 * API Response DTO
 */
export interface SubCategoryResponse {
  id: string;
  name: string;
  slug: string;
  category: {
    id: string;
    name?: string;
  };
  isActive: boolean;
  createdAt: Date;
}