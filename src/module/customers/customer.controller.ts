import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { Request, Response } from "express";
import {
  createCustomerService,
  getAllCustomerService,
  getCustomerByIdServices,
} from "./customer.services.js";
import { CreateCustomerDto } from "./customer.types.js";

export const createCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const payload: CreateCustomerDto = req.body;
    if (!payload.firstName || !payload.email) {
      throw new ApiError(400, "First name and Email are required");
    }

    const customer = await createCustomerService(payload);
    res.status(201).json({ success: true, customer });
  },
);

export const getAllCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limitQuery = parseInt(req.query.limit as string) || 10;
    const limit = Math.min(limitQuery, 50);
    const result = await getAllCustomerService(page, limit);
    res.status(200).json({
      success: true,
      ...result,
    });
  },
);

export const getCustomerById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getCustomerByIdServices(id as string);
    res.status(200).json({
      sucess: true,
      result,
    });
  },
);
