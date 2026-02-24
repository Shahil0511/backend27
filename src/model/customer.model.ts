import { Schema, model, Document, Model } from 'mongoose';
import validator from 'validator';


export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string; 
  isDefault: boolean;
}

export interface ICustomer extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  addresses: IAddress[];
  totalOrders: number;
  lifetimeValue: number;
  isActive: boolean;
  fullName: string; 
}


const addressSchema = new Schema<IAddress>({
  street: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  country: { type: String, trim: true, uppercase: true },
  zipCode: { type: String, trim: true },
  isDefault: { type: Boolean, default: false }
}, { _id: true });


const customerSchema = new Schema<ICustomer>(
  {
    firstName: { 
      type: String, 
      required: [true, 'First name is required'], 
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    lastName: { 
      type: String, 
      trim: true, 
      maxlength: [50, 'Name cannot exceed 50 characters'] 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true, 
      lowercase: true, 
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
      index: true 
    },
    phone: { 
      type: String, 
      trim: true,
      index: { sparse: true } 
    },
    addresses: [addressSchema],
    totalOrders: { 
      type: Number, 
      default: 0, 
      min: [0, 'Orders cannot be negative'] 
    },
    lifetimeValue: { 
      type: Number, 
      default: 0, 
      min: 0,
      set: (v: number) => Math.round(v * 100) / 100 
    },
    isActive: { type: Boolean, default: true },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export const Customer: Model<ICustomer> = model<ICustomer>('Customer', customerSchema);