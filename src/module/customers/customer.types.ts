import { IAddress } from "../../model/customer.model.js";

export interface CreateCustomerDto {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  addresses?: IAddress[];
}

export interface UpdateCustomerDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  addresses?: IAddress[];
  isActive?: boolean;
}

export interface CustomerResponse {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  fullName: string;
  totalOrders: number;
  lifetimeValue: number;
  createdAt: Date;
}