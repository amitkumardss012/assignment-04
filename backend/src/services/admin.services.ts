
import { prisma } from "../db/db.js";
import { VendorCategory, type VendorProfile } from "../types/types.js";

export interface CreateVendorData {
  vendorName: string;
  category: VendorCategory;
  location: string;
  contactInfo: string;
}


export class AdminService {
  static async getDashboardStats() {
    const [totalVendors, totalInquiries, recentActivity] = await Promise.all([
      prisma.user.count({ where: { role: "VENDOR" } }),
      prisma.inquiry.count(),
      prisma.activityLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          vendor: {
            select: { vendorName: true }
          }
        }
      })
    ]);

    return {
      totalVendors,
      totalInquiries,
      recentActivity
    };
  }

  static async getAllVendors() {
    return prisma.vendorProfile.findMany({
      where: {
        user: {
          role: "VENDOR"
        }
      },
      include: {
        user: {
          select: { email: true }
        },
        _count: {
          select: { inquiries: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
  }

  static async getVendorDetails(vendorId: string) {
    return prisma.vendorProfile.findUnique({
      where: { id: vendorId },
      include: {
        user: {
          select: { email: true, createdAt: true }
        },
        inquiries: {
          take: 10,
          orderBy: { createdAt: "desc" }
        },
        activities: {
          take: 10,
          orderBy: { createdAt: "desc" }
        }
      }
    });
  }

  static async createVendor(email: string, passwordHash: string, vendorData: CreateVendorData) {
    // We must run in a transaction to ensure both user and profile are created or neither
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          role: "VENDOR"
        }
      });

      const profile = await tx.vendorProfile.create({
        data: {
          userId: user.id,
          vendorName: vendorData.vendorName,
          category: vendorData.category,
          location: vendorData.location,
          contactInfo: vendorData.contactInfo
        }
      });

      return { user, profile };
    });
  }
}
