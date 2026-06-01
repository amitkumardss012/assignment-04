import type { Prisma, InquiryStatus } from "../generated/prisma/client.js";
export declare class InquiryService {
    static CreateInquiry(data: Prisma.InquiryUncheckedCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        eventDate: Date;
        eventType: string;
        message: string | null;
        status: InquiryStatus;
        vendorId: string;
    }>;
    static GetInquiriesByVendorId(vendorId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        eventDate: Date;
        eventType: string;
        message: string | null;
        status: InquiryStatus;
        vendorId: string;
    }[]>;
    static GetInquiryById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        eventDate: Date;
        eventType: string;
        message: string | null;
        status: InquiryStatus;
        vendorId: string;
    } | null>;
    static UpdateInquiryStatus(id: string, status: InquiryStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        eventDate: Date;
        eventType: string;
        message: string | null;
        status: InquiryStatus;
        vendorId: string;
    }>;
}
//# sourceMappingURL=inquiry.services.d.ts.map