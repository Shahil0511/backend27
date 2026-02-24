
import { ApiError } from '../../utils/ApiError.js';

import { findCustomerByEmail, createCustomer, getCustomer,countCustomer } from './customer.repository.js';

export const createCustomerService = async (data: any) => {
  const existing = await findCustomerByEmail(data.email);
  if (existing) throw new ApiError(409, 'Customer with this email already exists');

  return await createCustomer(data);
}

export const getCustomerService = async (page: number, limit: number) => {
  const skip = (page-1)*limit;
   
  const customer = await getCustomer(skip, limit)
  const total = await countCustomer()
   return {
    data: customer,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}