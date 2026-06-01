import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/error.middleware.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.util.js";
import { statusCode, VendorCategory } from "../types/types.js";
import { UserService } from "../services/user.services.js";
import { VendorService } from "../services/vendor.services.js";
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_123";
export const Register = asyncHandler(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please provide email and password", statusCode.Bad_Request));
    }
    const existingUser = await UserService.FindUserByEmail(email);
    if (existingUser) {
        return next(new ErrorResponse("Email is already registered", statusCode.Bad_Request));
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserService.CreateUser({
        email,
        passwordHash,
        role: role || "VENDOR"
    });
    if (user.role === "VENDOR") {
        await VendorService.CreateProfile({
            userId: user.id,
            vendorName: "starvnt entertainment",
            category: VendorCategory.PHOTOGRAPHY,
            location: "kolkata",
            contactInfo: email
        });
    }
    return SuccessResponse(res, "User registered successfully", user, statusCode.Created);
});
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