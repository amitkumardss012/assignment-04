import jwt from "jsonwebtoken";
import { ErrorResponse } from "../utils/response.util.js";
import { statusCode } from "../types/types.js";
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_123";
export const authenticate = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return next(new ErrorResponse("Access denied. No token provided.", statusCode.Unauthorized));
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return next(new ErrorResponse("Invalid or expired token", statusCode.Unauthorized));
    }
};
export const authorize = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!roles.includes(userRole)) {
            return next(new ErrorResponse("Forbidden. Insufficient permissions.", statusCode.Forbidden)); // Note: make sure statusCode.Forbidden exists in types.ts or use 403 directly
        }
        next();
    };
};
//# sourceMappingURL=auth.middleware.js.map