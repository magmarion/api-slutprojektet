// prisma/seed.ts
import { db } from "./client";

async function main() {
    await db.user.create({
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
    .finally(() => db.$disconnect());
