// prisma/seed.ts
import { db } from "./client";
import { products as productData } from "../data/index";

async function main() {
    const user = await db.user.findUnique({
        where: { email: "cr7@mail.com" },
    });

    if (user) {
        await db.user.update({
            where: { id: user.id },
            data: {
                name: "Lionel Messi",
                email: "lm10@gmail.com",
            },
        });
    }
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
                category: product.category,

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
