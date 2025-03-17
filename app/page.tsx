import AddToCartButton from "@/components/buttons/AddToCartButton";
import { Button } from "@/components/ui/button";
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
          <p>Tech You Need.</p>
          <p className="lg:mt-3">When You Need.</p>

          <p className="text-[0.7rem] md:mt-1 md:text-[1rem]">✅ In stock</p>
          <p className="text-[0.7rem] md:mt-1 md:text-[1rem]">
            🚛 Fast delivery
          </p>
        </div>
      </section>
      <h1 className="text-xl font-bold text-gray-800 m-6">Trending Products</h1>

      <div className="flex flex-col w-full md:flex-row md:flex-wrap ">
        {products.map((product) => (
          <div
            data-cy="product"
            key={product.articleNumber}
            className="border rounded-lg p-4 shadow-md bg-white flex md:flex-col "
          >
            <Link href={`/product/${product.articleNumber}/${product.title}`}>
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={150}
                className="object-cover w-[150px] h-[150px] rounded-md cursor-pointer"
              />
            </Link>
            <div className=" flex flex-col justify-between items-center">
              <Link href={`/product/${product.articleNumber}/${product.title}`}>
                <h2
                  data-cy="product-title"
                  className="text-lg font-semibold mt-2 hover:underline"
                >
                  {product.title}
                </h2>
                <p>Apple</p>
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

              <Link href={`/product/${product.articleNumber}/${product.title}`}>
                <Button className="bg-slate-500">
                    Info
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
