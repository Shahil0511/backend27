import User, { IUser } from "../../model/user.model.js";
import mongoose from "mongoose";

export const findUserByEmail = (email: string, withPassword = false): Promise<IUser | null> => {
  const query = User.findOne({ email });
  if (withPassword) query.select('+password');
  return query.exec();
};

export const createUser = (data: Partial<IUser>): Promise<IUser> => {
  return User.create(data as any);
};

export const deleteUserByEmail = (email: string): Promise<mongoose.DeleteResult> => {
  return User.deleteOne({ email }).exec();
};