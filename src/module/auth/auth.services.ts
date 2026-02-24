import bcrypt from "bcrypt";
import { findUserByEmail, createUser, deleteUserByEmail } from "./auth.repository.js";
import { ApiError } from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const registerUser = async (email: string, password: string) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // `createUser` will trigger the model pre-save hook to hash the password
  const user = await createUser({
    email,
    password,
  });

  return user;
};

export const RemoveUser = async (email: string) => {
  const existingUser = await findUserByEmail(email);
  if (!existingUser) {
    throw new ApiError(404, "User does not exist");
  }
  await deleteUserByEmail(email);
};

export const loginUser = async (email: string, password: string) => {
  const existingUser = await findUserByEmail(email, true);
  if (!existingUser) throw new ApiError(404, "User not found");

  const isValid = await bcrypt.compare(password, existingUser.password);
  if (!isValid) throw new ApiError(401, "Invalid credentials");

  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!accessSecret || !refreshSecret) throw new ApiError(500, 'Token secrets not configured');

  const accessToken = jwt.sign(
    { id: existingUser._id, email: existingUser.email },
    accessSecret,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: existingUser._id },
    refreshSecret,
    { expiresIn: "7d" }
  );

  existingUser.refreshToken = refreshToken;
  await existingUser.save();

  return { existingUser, accessToken, refreshToken };
};
