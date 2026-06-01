import { prisma } from "../db/db.js";
export class UserService {
    static async FindUserByEmail(email) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }
    static async FindUserById(id) {
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
    static async CreateUser(data) {
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
//# sourceMappingURL=user.services.js.map