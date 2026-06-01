import { prisma } from "../db/db.js";
export class InquiryService {
    static async CreateInquiry(data) {
        return await prisma.inquiry.create({
            data
        });
    }
    static async GetInquiriesByVendorId(vendorId) {
        return await prisma.inquiry.findMany({
            where: { vendorId },
            orderBy: { createdAt: "desc" }
        });
    }
    static async GetInquiryById(id) {
        return await prisma.inquiry.findUnique({
            where: { id }
        });
    }
    static async UpdateInquiryStatus(id, status) {
        return await prisma.inquiry.update({
            where: { id },
            data: { status }
        });
    }
}
//# sourceMappingURL=inquiry.services.js.map