export declare class ActivityLogService {
    static LogActivity(vendorId: string, action: string, details?: any): Promise<{
        id: string;
        createdAt: Date;
        vendorId: string;
        action: string;
        details: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
}
//# sourceMappingURL=activity.services.d.ts.map