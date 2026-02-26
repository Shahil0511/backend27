import { Category } from "../../model/category.model.js";
import { CreateCategoryRepoPayload } from "./category.types.js";

export const categoryRepository = async (
  data: CreateCategoryRepoPayload
) => {
  return await Category.create(data);
};

export const getCategoryRepository = async()=>{
  return await Category.find()
}

export const countAllCategory = async()=>{
  return await Category.countDocuments()
}