import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middlewares/error.middleware.js";
import { ErrorResponse, SuccessResponse } from "../utils/response.util.js";
import { statusCode, InquiryStatus } from "../types/types.js";
import { InquiryService } from "../services/inquiry.services.js";
import { VendorService } from "../services/vendor.services.js";
import { ActivityLogService } from "../services/activity.services.js";

export const CreateInquiry = asyncHandler(async (req, res, next) => {
    const userId = (req as any).user?.id;
    if (!userId) {
        return next(new ErrorResponse("Not authenticated", statusCode.Unauthorized));
    }

    const { eventDate, eventType, message, customerName, customerEmail, customerPhone } = req.body;

    if (!eventDate || !eventType || !customerName || !customerEmail || !customerPhone) {
        return next(new ErrorResponse("Please provide eventDate, eventType, customerName, customerEmail, and customerPhone", statusCode.Bad_Request));
    }

    const vendorProfile = await VendorService.GetProfileByUserId(userId);
    if (!vendorProfile) {
        return next(new ErrorResponse("Vendor profile not found", statusCode.Not_Found));
    }

    const inquiry = await InquiryService.CreateInquiry({
        vendorId: vendorProfile.id,
        customerName,
        customerEmail,
        customerPhone,
        eventDate: new Date(eventDate),
        eventType,
        message
    });

    await ActivityLogService.LogActivity(vendorProfile.id, "INQUIRY_RECEIVED", { inquiryId: inquiry.id });

    return SuccessResponse(res, "Inquiry created successfully", inquiry, statusCode.Created);
});

export const GetInquiries = asyncHandler(async (req, res, next) => {
    const user = (req as any).user;
    if (!user) {
        return next(new ErrorResponse("Not authenticated", statusCode.Unauthorized));
    }

    if (user.role !== "VENDOR") {
        return next(new ErrorResponse("Only vendors can view inquiries", statusCode.Forbidden));
    }

    const vendorProfile = await VendorService.GetProfileByUserId(user.id);
    if (!vendorProfile) {
        return next(new ErrorResponse("Vendor profile not found", statusCode.Not_Found));
    }
    
    const inquiries = await InquiryService.GetInquiriesByVendorId(vendorProfile.id);

    return SuccessResponse(res, "Inquiries retrieved successfully", inquiries, statusCode.OK);
});

export const UpdateInquiryStatus = asyncHandler(async (req, res, next) => {
    const user = (req as any).user;
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !Object.values(InquiryStatus).includes(status)) {
        return next(new ErrorResponse("Invalid inquiry status", statusCode.Bad_Request));
    }

    const inquiry = await InquiryService.GetInquiryById(id as string);
    if (!inquiry) {
        return next(new ErrorResponse("Inquiry not found", statusCode.Not_Found));
    }

    // Only the vendor who received the inquiry can update its status
    const vendorProfile = await VendorService.GetProfileByUserId(user.id);
    if (!vendorProfile || vendorProfile.id !== inquiry.vendorId) {
        return next(new ErrorResponse("Forbidden. You do not own this inquiry.", statusCode.Forbidden));
    }

    const updatedInquiry = await InquiryService.UpdateInquiryStatus(id as string, status);

    await ActivityLogService.LogActivity(vendorProfile.id, "STATUS_UPDATED", { inquiryId: id, status });

    return SuccessResponse(res, "Inquiry status updated successfully", updatedInquiry, statusCode.OK);
});
