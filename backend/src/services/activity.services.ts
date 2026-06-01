import { prisma } from "../db/db.js";

export class ActivityLogService {
    public static async LogActivity(vendorId: string, action: string, details?: any) {
        return await prisma.activityLog.create({
            data: {
                vendorId,
                action,
                details: details || {}
            }
        });
    }
}
