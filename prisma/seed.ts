// prisma/seed.ts
import { db } from "./client";
import { products as productData } from "../data/index";

async function main() {
    await db.user.upsert({
        where: { email: "cr7@mail.com" },
        create: { name: "Cristiano", email: "cr7@mail.com" },
        update: {
            name: "Lionel Messi",
            email: "lm10@gmail.com",
        }
    });

    // Seed products
    for (const product of productData) {
        await db.product.create({
            data: {
                id: product.id || undefined,
                articleNumber: product.articleNumber,
                title: product.title,
                description: product.description,
                price: product.price,
                image: product.image,
            }
        });
    }

    console.log("Seed completed");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => db.$disconnect());
