import { prisma } from "../db/db.js";
export class VendorService {
    static async GetProfileByUserId(userId) {
        return await prisma.vendorProfile.findUnique({
            where: { userId }
        });
    }
    static async CreateProfile(data) {
        return await prisma.vendorProfile.create({
            data
        });
    }
    static async UpdateProfile(userId, data) {
        return await prisma.vendorProfile.update({
            where: { userId },
            data
        });
    }
}
//# sourceMappingURL=vendor.services.js.map