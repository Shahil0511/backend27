
import { ApiError } from '../../utils/ApiError.js';

import { findCustomerByEmail,createCustomer,getCustomer } from './customer.repository.js';

 export const createCustomerService = async(data:any)=>{
    const existing = await findCustomerByEmail(data.email);
    if(existing) throw new ApiError(409, 'Customer with this email already exists');

    return await createCustomer(data);
 }

 export const getCustomerService = async()=>{
   return await getCustomer()
 }