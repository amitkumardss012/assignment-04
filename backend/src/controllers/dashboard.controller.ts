import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middlewares/error.middleware.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.util.js";
import { statusCode } from "../types/types.js";
import { DashboardService } from "../services/dashboard.services.js";
import { VendorService } from "../services/vendor.services.js";

export const GetStats = asyncHandler(async (req, res, next) => {
    const userId = (req as any).user?.id;
    
    const vendorProfile = await VendorService.GetProfileByUserId(userId);
    if (!vendorProfile) {
        return next(new ErrorResponse("Vendor profile not found", statusCode.Not_Found));
    }

    const totalInquiries = await DashboardService.GetTotalInquiries(vendorProfile.id);
    const upcomingEventsCount = await DashboardService.GetUpcomingEventsCount(vendorProfile.id);

    return SuccessResponse(res, "Dashboard stats retrieved successfully", {
        totalInquiries,
        upcomingEvents: upcomingEventsCount
    }, statusCode.OK);
});

export const GetUpcomingEvents = asyncHandler(async (req, res, next) => {
    const userId = (req as any).user?.id;
    
    const vendorProfile = await VendorService.GetProfileByUserId(userId);
    if (!vendorProfile) {
        return next(new ErrorResponse("Vendor profile not found", statusCode.Not_Found));
    }

    const events = await DashboardService.GetUpcomingEvents(vendorProfile.id);

    return SuccessResponse(res, "Upcoming events retrieved successfully", events, statusCode.OK);
});

export const GetRecentActivity = asyncHandler(async (req, res, next) => {
    const userId = (req as any).user?.id;
    
    const vendorProfile = await VendorService.GetProfileByUserId(userId);
    if (!vendorProfile) {
        return next(new ErrorResponse("Vendor profile not found", statusCode.Not_Found));
    }

    const activity = await DashboardService.GetRecentActivity(vendorProfile.id);

    return SuccessResponse(res, "Recent activity retrieved successfully", activity, statusCode.OK);
});
