import { Request, Response } from "express";
import { registerUser, RemoveUser, loginUser } from "./auth.services.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, 'Email and password are required');

  const user = await registerUser(email, password);

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
    },
  });
});

export const signin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, 'Email and password are required');

  const { existingUser, accessToken, refreshToken } = await loginUser(email, password);

  res.status(200).json({
    success: true,
    accessToken,
    refreshToken,
    user: {
      id: existingUser._id,
      email: existingUser.email,
    },
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, 'Email is required');

  await RemoveUser(email);
  res.status(200).json({ success: true, message: 'User deleted successfully' });
});