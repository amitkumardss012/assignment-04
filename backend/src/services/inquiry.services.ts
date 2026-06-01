import { prisma } from "../db/db.js";
import type { Prisma, InquiryStatus } from "../generated/prisma/client.js";

export class InquiryService {
    public static async CreateInquiry(data: Prisma.InquiryUncheckedCreateInput) {
        return await prisma.inquiry.create({
            data
        });
    }

    public static async GetInquiriesByVendorId(vendorId: string) {
        return await prisma.inquiry.findMany({
            where: { vendorId },
            orderBy: { createdAt: "desc" }
        });
    }



    public static async GetInquiryById(id: string) {
        return await prisma.inquiry.findUnique({
            where: { id }
        });
    }

    public static async UpdateInquiryStatus(id: string, status: InquiryStatus) {
        return await prisma.inquiry.update({
            where: { id },
            data: { status }
        });
    }
}
