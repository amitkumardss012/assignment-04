import type { NextFunction, Request, Response } from "express";
import type { ErrorResponse } from "../utils/response.util.js";

export const errorMiddleware = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if ("code" in err && err.code === "P2025") {
    err.message = "Item not found";
  }

  // Final Error Response
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;


type AsyncHandlerFunction<TReq extends Request> = (
  req: TReq,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler =
  <TReq extends Request>(fn: AsyncHandlerFunction<TReq>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as TReq, res, next)).catch(next);
  };



