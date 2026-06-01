import type { NextFunction, Request, Response } from "express";
import type { ErrorResponse } from "../utils/response.util.js";
export declare const errorMiddleware: (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default errorMiddleware;
type AsyncHandlerFunction<TReq extends Request> = (req: TReq, res: Response, next: NextFunction) => Promise<any>;
export declare const asyncHandler: <TReq extends Request>(fn: AsyncHandlerFunction<TReq>) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=error.middleware.d.ts.map