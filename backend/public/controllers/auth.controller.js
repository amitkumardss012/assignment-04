import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/error.middleware.js";
import { UserService } from "../services/user.services.js";
import { statusCode } from "../types/types.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.util.js";
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_123";
export const Login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please provide email and password", statusCode.Bad_Request));
    }
    const user = await UserService.FindUserByEmail(email);
    if (!user) {
        return next(new ErrorResponse("Invalid credentials", statusCode.Unauthorized));
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", statusCode.Unauthorized));
    }
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    // Setting token in HTTP-only cookie for secure delivery
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    const userWithoutPassword = {
        id: user.id,
        email: user.email,
        role: user.role
    };
    return SuccessResponse(res, "Login successful", { user: userWithoutPassword, token }, statusCode.OK);
});
export const Logout = asyncHandler(async (req, res, next) => {
    res.clearCookie("token");
    return SuccessResponse(res, "Logout successful", null, statusCode.OK);
});
export const Me = asyncHandler(async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        return next(new ErrorResponse("Not authenticated", statusCode.Unauthorized));
    }
    const user = await UserService.FindUserById(userId);
    if (!user) {
        return next(new ErrorResponse("User not found", statusCode.Not_Found));
    }
    return SuccessResponse(res, "User retrieved successfully", user, statusCode.OK);
});
//# sourceMappingURL=auth.controller.js.map