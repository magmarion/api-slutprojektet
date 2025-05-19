// prisma/seed.ts
import { db } from "./client";


async function main() {
    await db.user.upsert({
        where: { email: "cr7@mail.com" },
        create: { name: "Cristiano", email: "cr7@mail.com" },
        update: {
            name: "Lionel Messi",
            email: "lm10@gmail.com",
        }
    });

    console.log("Seed completed");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => db.$disconnect());
