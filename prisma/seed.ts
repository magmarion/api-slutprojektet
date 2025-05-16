// prisma/seed.ts
import { db } from "./client";
import { PrismaClient } from "../generated/prisma";

// Typa om db som PrismaClient så vi får modellerna
const typedDb = db as unknown as PrismaClient;

async function main() {
    await typedDb.user.create({
        data: {
            name: "Alice",
            email: "alice@example.com",
        },
    });

    console.log("Seed completed");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => typedDb.$disconnect());
