// lib/create-admin.ts
import { db } from "@/prisma/client";
import argon2 from "argon2";

export async function createAdmin(email: string, password: string): Promise<void> {
    // Kontrollera om en användare redan existerar med det angivna e-postadressen
    const existingUser = await db.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error(`Användaren med e-postadressen ${email} finns redan.`);
    }

    // Hasha lösenordet med argon2
    const hashedPassword = await argon2.hash(password);

    // Skapa en ny admin-användare
    await db.user.create({
        data: {
            email,
            name: "Admin User",
            emailVerified: true,
            isAdmin: true,
            password: hashedPassword,
            updatedAt: new Date(),
        },
    });
}