import { products as productData } from '@/data/index';
import { db } from './client';

async function main() {
  console.log(`Starting seed process...`);
  console.log(`Seeding ${productData.length} products...`);

  for (const product of productData) {
    // Skapa eller hitta alla kategorier för produkten
    const categoryRecords = [];

    if (!product.category || product.category.length === 0) {
      console.warn(`Product ${product.title} has no categories.`);
      continue;
    }

    for (const cat of product.category) {
      const category = await db.category.upsert({
        where: { name: cat },
        update: {},
        create: {
          name: cat,
        },
      });
      categoryRecords.push({ id: category.id });
    }

    // Skapa produkten och koppla till alla kategorier
    await db.product.upsert({
      where: { articleNumber: product.articleNumber },
      update: {
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        categories: {
          set: [], // Rensa befintliga kategorier
          connect: categoryRecords,
        },
      },
      create: {
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

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
