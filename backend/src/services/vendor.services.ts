import { prisma } from "../db/db.js";
import type { Prisma } from "../generated/prisma/client.js";

export class VendorService {
    public static async GetProfileByUserId(userId: string) {
        return await prisma.vendorProfile.findUnique({
            where: { userId }
        });
    }

    public static async CreateProfile(data: Prisma.VendorProfileUncheckedCreateInput) {
        return await prisma.vendorProfile.create({
            data
        });
    }

    public static async UpdateProfile(userId: string, data: Prisma.VendorProfileUncheckedUpdateInput) {
        return await prisma.vendorProfile.update({
            where: { userId },
            data
        });
    }
}
