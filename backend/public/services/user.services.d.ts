import type { Prisma } from "../generated/prisma/client.js";
export declare class UserService {
    static FindUserByEmail(email: string): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        role: import("../generated/prisma/enums.js").Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    static FindUserById(id: string): Promise<{
        id: string;
        email: string;
        role: import("../generated/prisma/enums.js").Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    static CreateUser(data: Prisma.UserCreateInput): Promise<{
        id: string;
        email: string;
        role: import("../generated/prisma/enums.js").Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=user.services.d.ts.map