import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { Request, Response } from "express";
import { createCustomerService, getAllCustomerService } from "./customer.services.js";

export const createCustomer = asyncHandler(async (req: Request, res: Response) => {
      const { firstName, lastName, email, phone, addresses } = req.body;
      if (!firstName || !email) throw new ApiError(400, "First name and Email are required");
      const customer = await createCustomerService({
            firstName, lastName, email, phone, addresses
      })
      res.status(201).json({ success: true, customer });
})

export const getAllCustomer = asyncHandler(async (req: Request, res: Response) => {
      const page = Math.max(parseInt(req.query.page as string) || 1, 1);
      const limitQuery = parseInt(req.query.limit as string) || 10;
      const limit = Math.min(limitQuery, 50);
      const result = await getAllCustomerService(page, limit);
      res.status(200).json({
            success: true,
            ...result,
      });
})