import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const verifyToken = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authorization token missing or malformed'));
  }

  const token = authHeader.split(' ')[1];

  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    return next(new ApiError(500, 'Access token secret not configured'));
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload | string;
    (req as any).user = decoded;
    return next();
  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};
