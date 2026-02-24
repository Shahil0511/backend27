import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { Request,Response } from "express";
import { createCustomerService,getCustomerService } from "./customer.services.js";

export const createCustomer = asyncHandler(async(req:Request, res: Response )=>{
    const {firstName,lastName,email,phone,addresses}= req.body;
    if(!firstName || !email) throw new ApiError(400, "First name and Email are required");
    const customer = await createCustomerService({
          firstName, lastName, email, phone, addresses
    })
     res.status(201).json({ success: true, customer });
})

export const getCustomer = asyncHandler(async(req:Request, res:Response)=>{
      const customer = await getCustomerService();
      res.status(201).json({sucess:true, customer})
})