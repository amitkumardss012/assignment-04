export declare class DashboardService {
    static GetTotalInquiries(vendorId: string): Promise<number>;
    static GetUpcomingEvents(vendorId: string): Promise<{
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
    }[]>;
    static GetUpcomingEventsCount(vendorId: string): Promise<number>;
    static GetRecentActivity(vendorId: string): Promise<{
        id: string;
        createdAt: Date;
        vendorId: string;
        action: string;
        details: import("@prisma/client/runtime/client").JsonValue | null;
    }[]>;
}
//# sourceMappingURL=dashboard.services.d.ts.map