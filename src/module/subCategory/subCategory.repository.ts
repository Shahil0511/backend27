import { Types } from "mongoose";
import { SubCategory } from "../../model/subCategory.model.js";

interface CreateSubCategoryRepoPayload {
  name: string;
  slug: string;
  category: Types.ObjectId;
}

export const createSubCategoryRepository = async (
  data: CreateSubCategoryRepoPayload
) => {
  return SubCategory.create(data);
};

export const getSubCategoryRepository = async()=>{
  return await SubCategory.find()
}

export const countAllSubCategory = async()=>{
  return await SubCategory.countDocuments()
}