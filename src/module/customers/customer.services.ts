
import { ApiError } from '../../utils/ApiError.js';

import { findCustomerByEmail, createCustomer, getAllCustomer, countAllCustomer,findCustomerById } from './customer.repository.js';

export const createCustomerService = async (data: any) => {
  const existing = await findCustomerByEmail(data.email);
  if (existing) throw new ApiError(409, 'Customer with this email already exists');

  return await createCustomer(data);
}

export const getAllCustomerService = async (page: number, limit: number, search?: string) => {
  const skip = (page - 1) * limit;
  const query: any = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const [customers, total] = await Promise.all([
    getAllCustomer(query, skip, limit),
    countAllCustomer(query),
  ]);
  return {
    data: customers,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export const getCustomerByIdServices=async(id:string)=>{
  const customer = await findCustomerById(id);
  if(!customer) throw new ApiError(404, "Customer Not Found");
  return customer;
}