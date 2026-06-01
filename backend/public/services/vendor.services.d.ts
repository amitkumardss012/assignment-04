import type { Prisma } from "../generated/prisma/client.js";
export declare class VendorService {
    static GetProfileByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vendorName: string;
        category: import("../generated/prisma/enums.js").VendorCategory;
        location: string;
        contactInfo: string;
        userId: string;
    } | null>;
    static CreateProfile(data: Prisma.VendorProfileUncheckedCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vendorName: string;
        category: import("../generated/prisma/enums.js").VendorCategory;
        location: string;
        contactInfo: string;
        userId: string;
    }>;
    static UpdateProfile(userId: string, data: Prisma.VendorProfileUncheckedUpdateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        vendorName: string;
        category: import("../generated/prisma/enums.js").VendorCategory;
        location: string;
        contactInfo: string;
        userId: string;
    }>;
}
//# sourceMappingURL=vendor.services.d.ts.map