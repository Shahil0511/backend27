import {
  CreateCategoryPayload,
  CreateCategoryRepoPayload,
} from "./category.types.js";
import { categoryRepository,countAllCategory,getCategoryRepository } from "./category.repository.js";

export const createCategoryServices = async (
  payload: CreateCategoryPayload
) => {
  const { name, description } = payload;

  const slug = name.toLowerCase().replace(/\s+/g, "-");
  const code = name.toUpperCase().replace(/\s+/g, "_");

  const repoPayload: CreateCategoryRepoPayload = {
    name,
    slug,
    code,
    description,
  };

  const result = await categoryRepository(repoPayload);

  return result;
};

export const getCategoryServices=async()=>{
  const [categories, total]=await Promise.all([
    getCategoryRepository(),
    countAllCategory()
  ])
  return {
    data:categories,
    total
  };
}