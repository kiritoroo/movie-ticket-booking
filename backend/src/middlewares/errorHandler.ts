import { Request, Response, NextFunction } from "express";
import ErrorResponse from '@util/ErrorResponse';

export const errorHandler = (err: any, req: Request<any>, res: Response<any>, next: NextFunction) => {
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode ?? 500).json({
      success: false,
      error: err,
      errMessage: err.message ?? "Internal Server Error",
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode ?? 500).json({
      success: false,
      message: error.message ?? "Internal Server Error",
    });
  }
}