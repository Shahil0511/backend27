import { Types } from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { CreateSubCategoryPayload } from "./subCategory.types.js";
import { createSubCategoryRepository } from "./subCategory.repository.js";

export const createSubCategoryServices = async (
  payload: CreateSubCategoryPayload
) => {
  const { name, category } = payload;

  
  if (!name || !category) {
    throw new ApiError(400, "Name and Category are required");
  }

  
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  
  const categoryId =
    typeof category === "string"
      ? new Types.ObjectId(category)
      : category;

  
  const result = await createSubCategoryRepository({
    name,
    slug,
    category: categoryId,
  });

  return result;
};