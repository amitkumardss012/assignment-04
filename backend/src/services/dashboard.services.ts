import { prisma } from "../db/db.js";

export class DashboardService {
    public static async GetTotalInquiries(vendorId: string) {
        return await prisma.inquiry.count({
            where: { vendorId }
        });
    }

    public static async GetUpcomingEvents(vendorId: string) {
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

    public static async GetUpcomingEventsCount(vendorId: string) {
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

    public static async GetRecentActivity(vendorId: string) {
        return await prisma.activityLog.findMany({
            where: { vendorId },
            orderBy: { createdAt: "desc" },
            take: 20
        });
    }
}
