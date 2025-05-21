import { db } from "./client";
import { products as productData } from "../data/index";

async function main() {
  for (const product of productData) {
    // Skapa eller hitta alla kategorier för produkten
    const categoryRecords = [];
    for (const cat of product.category) {
      const category = await db.category.upsert({
        where: { name: cat },
        update: {},
        create: {
          name: cat,
          category: cat,
        },
      });
      categoryRecords.push({ id: category.id });
    }

    // Skapa produkten och koppla till alla kategorier
    await db.product.create({
      data: {
        id: product.id || undefined,
        articleNumber: product.articleNumber,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        categories: {
          connect: categoryRecords,
        },
      },
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