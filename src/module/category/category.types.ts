import { ICategory } from "../../model/category.model.js";
import { Types } from "mongoose";

/**
 * Payload when creating category
 */
export interface CreateCategoryPayload {
  name: string;
  description?: string;
}

/**
 * Data sent to repository (after service logic)
 */
export interface CreateCategoryRepoPayload {
  name: string;
  slug: string;
  code: string;
  description?: string;
}

/**
 * Category Response DTO
 */
export interface CategoryResponse {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  code: string;
  description?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Repository Return Type
 */
export type CategoryDocument = ICategory;