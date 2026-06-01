import bcrypt from "bcrypt";
import { AdminService } from "../services/admin.services.js";
import { asyncHandler } from "../middlewares/error.middleware.js";
import { SuccessResponse, ErrorResponse } from "../utils/response.util.js";
import { statusCode } from "../types/types.js";
import { UserService } from "../services/user.services.js";
export const getDashboardStats = asyncHandler(async (req, res, next) => {
    const stats = await AdminService.getDashboardStats();
    return SuccessResponse(res, "Admin stats retrieved", stats, statusCode.OK);
});
export const getAllVendors = asyncHandler(async (req, res) => {
    const vendors = await AdminService.getAllVendors();
    return SuccessResponse(res, "Vendors retrieved", vendors, statusCode.OK);
});
export const getVendorDetails = asyncHandler(async (req, res, next) => {
    const vendorId = req.params.id;
    const vendor = await AdminService.getVendorDetails(vendorId);
    if (!vendor) {
        return next(new ErrorResponse("Vendor not found", statusCode.Not_Found));
    }
    return SuccessResponse(res, "Vendor details retrieved", vendor, statusCode.OK);
});
export const createVendor = asyncHandler(async (req, res, next) => {
    const { email, password, vendorName, category, location, contactInfo } = req.body;
    if (!email || !password || !vendorName || !category || !location || !contactInfo) {
        return next(new ErrorResponse("All fields are required", statusCode.Bad_Request));
    }
    const existingUser = await UserService.FindUserByEmail(email);
    if (existingUser) {
        return next(new ErrorResponse("Email already in use", statusCode.Bad_Request));
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await AdminService.createVendor(email, passwordHash, {
        vendorName,
        category,
        location,
        contactInfo,
    });
    return SuccessResponse(res, "Vendor created successfully", result.profile, statusCode.Created);
});
//# sourceMappingURL=admin.controller.js.map