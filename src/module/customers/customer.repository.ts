import { Customer, ICustomer } from "../../model/customer.model.js";


export const findCustomerByEmail=(email:string):Promise<ICustomer|null>=>{
return Customer.findOne({email:email.toLowerCase()});
}

export const createCustomer=(data:any):Promise<ICustomer>=>{
    return Customer.create(data)
}
export const getCustomer=():Promise<ICustomer[]>=>{
    return Customer.find()
}