// prisma/seed.ts
import { db } from "./client";


async function main() {
    await db.user.create({
        data: { name: "Cristiano", email: "cr7@mail.com", },
    });

    console.log("Seed completed");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => db.$disconnect());
