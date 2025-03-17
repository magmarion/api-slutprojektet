import AddToCartButton from "@/components/buttons/AddToCartButton";
import { db } from "@/prisma/db";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await db.product.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <section className="relative w-full h-[20vh] md:h-[40vh]">
        <Image
          src="/heroimage.jpg"
          alt="logo"
          fill
          priority
          className="object-center object-cover"
        />
        <div className="absolute inset-0 font-bold text-gray-800 flex flex-col justify-center ml-2 text-sm md:text-3xl lg:text-4xl lg:pl-30 ">
          <p >Tech You Need.</p>
          <p className="lg:mt-3">When You Need.</p>

          <p className="text-[0.7rem] md:mt-1 md:text-[1rem]">✅ In stock</p>
          <p className="text-[0.7rem] md:mt-1 md:text-[1rem]">🚛 Fast delivery</p>
        </div>
      </section>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to the webshop!
      </h1>
      <p className="text-gray-600 mb-8">Here you will find our best products</p>

      <div className="flex flex-wrap justify-between items-center gap-4">
        {products.map((product) => (
          <div
            data-cy="product"
            key={product.articleNumber}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <Link href={`/product/${product.articleNumber}/${product.title}`}>
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={150}
                className="object-cover w-full h-40 rounded-md cursor-pointer"
              />
            </Link>
            <Link href={`/product/${product.articleNumber}/${product.title}`}>
              <h2
                data-cy="product-title"
                className="text-lg font-semibold mt-2 hover:underline"
              >
                {product.title}
              </h2>
            </Link>
            <p data-cy="product-price" className="text-gray-700">
              Price: {product.price} SEK
            </p>
            <AddToCartButton
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
