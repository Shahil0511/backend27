import { Request, Response } from "express";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { createCategoryServices } from "./category.services.js";
import { CreateCategoryPayload } from "./category.types.js";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const payload: CreateCategoryPayload = {
      name: req.body.name,
      description: req.body.description,
    };

    const result = await createCategoryServices(payload);

    res.status(201).json({
      success: true,
      data: result,
    });
  }
);