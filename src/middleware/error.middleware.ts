import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode || 500;
    message = err.message;
  } else if (err.name === 'ValidationError' && err.errors) {
    statusCode = 400;
    message = Object.values(err.errors).map((e: any) => e.message).join(', ');
  } else if (err.name === 'MongoServerError' && (err.code === 11000 || err.code === 11001)) {
    statusCode = 409;
    message = 'Duplicate key error';
  } else if (err.status && typeof err.status === 'number') {
    statusCode = err.status;
    message = err.message || message;
  }

  const payload: any = { success: false, message };
  if (process.env.NODE_ENV === 'development') payload.stack = err.stack;

  res.status(statusCode).json(payload);
};
