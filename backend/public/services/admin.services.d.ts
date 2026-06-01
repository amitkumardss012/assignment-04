import { VendorCategory } from "../types/types.js";
export interface CreateVendorData {
    vendorName: string;
    category: VendorCategory;
    location: string;
    contactInfo: string;
}
export declare class AdminService {
    static getDashboardStats(): Promise<{
        totalVendors: number;
        totalInquiries: number;
        recentActivity: ({
            vendor: {
                vendorName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            vendorId: string;
            action: string;
            details: import("@prisma/client/runtime/client").JsonValue | null;
        })[];
    }>;
    static getAllVendors(): Promise<({
        user: {
            email: string;
        };
        _count: {
            inquiries: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vendorName: string;
        category: VendorCategory;
        location: string;
        contactInfo: string;
        userId: string;
    })[]>;
    static getVendorDetails(vendorId: string): Promise<({
        user: {
            email: string;
            createdAt: Date;
        };
        inquiries: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            customerName: string;
            customerEmail: string;
            customerPhone: string;
            eventDate: Date;
            eventType: string;
            message: string | null;
            status: import("../types/types.js").InquiryStatus;
            vendorId: string;
        }[];
        activities: {
            id: string;
            createdAt: Date;
            vendorId: string;
            action: string;
            details: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vendorName: string;
        category: VendorCategory;
        location: string;
        contactInfo: string;
        userId: string;
    }) | null>;
    static createVendor(email: string, passwordHash: string, vendorData: CreateVendorData): Promise<{
        user: {
            id: string;
            email: string;
            passwordHash: string;
            role: import("../types/types.js").Role;
            createdAt: Date;
            updatedAt: Date;
        };
        profile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            vendorName: string;
            category: VendorCategory;
            location: string;
            contactInfo: string;
            userId: string;
        };
    }>;
}
//# sourceMappingURL=admin.services.d.ts.map