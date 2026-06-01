import { prisma } from "../db/db.js";
export class DashboardService {
    static async GetTotalInquiries(vendorId) {
        return await prisma.inquiry.count({
            where: { vendorId }
        });
    }
    static async GetUpcomingEvents(vendorId) {
        const today = new Date();
        return await prisma.inquiry.findMany({
            where: {
                vendorId,
                status: "CONFIRMED",
                eventDate: {
                    gte: today
                }
            },
            orderBy: { eventDate: "asc" },
            take: 10
        });
    }
    static async GetUpcomingEventsCount(vendorId) {
        const today = new Date();
        return await prisma.inquiry.count({
            where: {
                vendorId,
                status: "CONFIRMED",
                eventDate: {
                    gte: today
                }
            }
        });
    }
    static async GetRecentActivity(vendorId) {
        return await prisma.activityLog.findMany({
            where: { vendorId },
            orderBy: { createdAt: "desc" },
            take: 20
        });
    }
}
//# sourceMappingURL=dashboard.services.js.map