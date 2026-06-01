import { ZodError } from "zod";
import { statusCode } from "../types/types.js";
import { zodError } from "../utils/utils.js";
export const errorMiddleware = (err, req, res, next) => {
    err.message ||= "Internal Server Error";
    err.statusCode ||= 500;
    if (err.name === "CastError")
        err.message = "Invalid ID";
    if ("code" in err && err.code === "P2025") {
        err.message = "Item not found";
    }
    // ✅ Handle Zod error
    if (err instanceof ZodError) {
        const errors = zodError(err);
        // get first zod error message
        const firstErrorMessage = err.issues.length > 0 ? err?.issues?.[0]?.message : "Validation Error";
        return res.status(statusCode.Bad_Request).json({
            success: false,
            message: firstErrorMessage,
            errors,
        });
    }
    // Final Error Response
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
export default errorMiddleware;
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
//# sourceMappingURL=error.middleware.js.map