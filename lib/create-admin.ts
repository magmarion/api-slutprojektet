// lib/create-admin.ts
import { db } from "@/prisma/client";
import argon2 from "argon2";

interface CreateUserOptions {
    name?: string;
    password?: string;
    isAdmin?: boolean;
    emailVerified?: boolean;
}

export async function createUser(
    email: string,
    options?: CreateUserOptions
) {
    const {
        name = "User",
        password = "",
        isAdmin = false,
        emailVerified = true
    } = options || {};

    const hashedPassword = password ? await argon2.hash(password) : "";

    return db.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
            isAdmin,
            emailVerified,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    });
}

export async function createAdmin(email: string, password: string) {
    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
        if (!existingUser.isAdmin) {
            return db.user.update({
                where: { email },
                data: { isAdmin: true }
            });
        }
        return existingUser;
    }

    return createUser(email, {
        name: "Admin User",
        password,
        isAdmin: true
    });
}