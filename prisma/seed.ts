import { products as productData } from '@/data/index';
import { db } from './client';
import argon2 from 'argon2';

async function main() {
  console.log(`Starting seed process...`);
  console.log(`Seeding ${productData.length} products...`);

  const user = await db.user.findUnique({
    where: { email: 'cr7@mail.com' },
  });

  if (user) {
    await db.user.update({
      where: { id: user.id },
      data: {
        name: 'Lionel Messi',
        email: 'lm10@gmail.com',
      },
    });
  }

  const email = "admin@example.com";
  const password = "securepassword123";

  // Kontrollera om admin finns
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("Admin-exempel finns redan.");
    return;
  }

  // Hasha lösenord
  const hashedPassword = await argon2.hash(password);

  // Skapa admin
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

  console.log("Admin skapad:", email);

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
