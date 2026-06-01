import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middlewares/error.middleware.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.util.js";
import { statusCode, VendorCategory } from "../types/types.js";
import { VendorService } from "../services/vendor.services.js";

export const CreateProfile = asyncHandler(async (req, res, next) => {
    const userId = (req as any).user?.id;
    if (!userId) {
        return next(new ErrorResponse("Not authenticated", statusCode.Unauthorized));
    }

    const { vendorName, category, location, contactInfo } = req.body;

    if (!vendorName || !category || !location || !contactInfo) {
        return next(new ErrorResponse("Please provide all required fields (vendorName, category, location, contactInfo)", statusCode.Bad_Request));
    }

    // Check if category is valid
    if (!Object.values(VendorCategory).includes(category)) {
        return next(new ErrorResponse("Invalid vendor category", statusCode.Bad_Request));
    }

    const existingProfile = await VendorService.GetProfileByUserId(userId);
    if (existingProfile) {
        return next(new ErrorResponse("Vendor profile already exists for this user", statusCode.Conflict));
    }

    const profile = await VendorService.CreateProfile({
        userId,
        vendorName,
        category,
        location,
        contactInfo
    });

    return SuccessResponse(res, "Vendor profile created successfully", profile, statusCode.Created);
});

export const GetProfile = asyncHandler(async (req, res, next) => {
    const userId = (req as any).user?.id;
    if (!userId) {
        return next(new ErrorResponse("Not authenticated", statusCode.Unauthorized));
    }

    const profile = await VendorService.GetProfileByUserId(userId);
    if (!profile) {
        return next(new ErrorResponse("Vendor profile not found", statusCode.Not_Found));
    }

    return SuccessResponse(res, "Vendor profile retrieved successfully", profile, statusCode.OK);
});

export const UpdateProfile = asyncHandler(async (req, res, next) => {
    const userId = (req as any).user?.id;
    if (!userId) {
        return next(new ErrorResponse("Not authenticated", statusCode.Unauthorized));
    }

    const { vendorName, category, location, contactInfo } = req.body;

    const existingProfile = await VendorService.GetProfileByUserId(userId);
    if (!existingProfile) {
        return next(new ErrorResponse("Vendor profile not found. Please create one first.", statusCode.Not_Found));
    }

    if (category && !Object.values(VendorCategory).includes(category)) {
        return next(new ErrorResponse("Invalid vendor category", statusCode.Bad_Request));
    }

    const updatedProfile = await VendorService.UpdateProfile(userId, {
        vendorName: vendorName || undefined,
        category: category || undefined,
        location: location || undefined,
        contactInfo: contactInfo || undefined
    });

    return SuccessResponse(res, "Vendor profile updated successfully", updatedProfile, statusCode.OK);
});
