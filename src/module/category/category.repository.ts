import { Category } from "../../model/category.model.js";
import { CreateCategoryRepoPayload } from "./category.types.js";

export const categoryRepository = async (
  data: CreateCategoryRepoPayload
) => {
  return await Category.create(data);
};