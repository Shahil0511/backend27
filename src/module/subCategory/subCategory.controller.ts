import { asyncHandler } from "../../utils/AsyncHandler.js";
import { createSubCategoryServices } from "./subCategory.services.js";
import { CreateSubCategoryPayload } from "./subCategory.types.js";
import { Request, Response} from "express";


export const createSubCategory = asyncHandler(async(req:Request, res:Response)=>{
    const payload : CreateSubCategoryPayload ={
        name:req.body.name,
        category:req.body.category,
    }

    const result = await createSubCategoryServices(payload);
      res.status(201).json({
      success: true,
      data: result,
    });
})