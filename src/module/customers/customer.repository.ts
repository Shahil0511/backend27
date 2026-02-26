import { Customer, ICustomer } from "../../model/customer.model.js";
import { CreateCustomerDto } from "./customer.types.js";


export const findCustomerByEmail = (
  email: string
): Promise<ICustomer | null> => {
  return Customer.findOne({ email: email.toLowerCase() });
};


export const createCustomer = (
  data: CreateCustomerDto
): Promise<ICustomer> => {
  return Customer.create(data);
};


export const getAllCustomer = (
  query: Record<string, unknown>,
  skip: number,
  limit: number
): Promise<ICustomer[]> => {
  return Customer.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .select("-__v")
    .lean();
};


export const countAllCustomer = (
  query: Record<string, unknown>
): Promise<number> => {
  return Customer.countDocuments(query);
};


export const findCustomerById = (
  id: string
): Promise<ICustomer | null> => {
  return Customer.findById(id);
};