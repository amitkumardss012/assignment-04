import { prisma } from "../db/db.js";
export class ActivityLogService {
    static async LogActivity(vendorId, action, details) {
        return await prisma.activityLog.create({
            data: {
                vendorId,
                action,
                details: details || {}
            }
        });
    }
}
//# sourceMappingURL=activity.services.js.map