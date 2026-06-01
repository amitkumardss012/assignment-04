import { prisma } from "../db/db.js";
import type { Prisma } from "../generated/prisma/client.js";

export class UserService {
    public static async FindUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    public static async FindUserById(id: string) {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    public static async CreateUser(data: Prisma.UserCreateInput) {
        return await prisma.user.create({
            data,
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }
}