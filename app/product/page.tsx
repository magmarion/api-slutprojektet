import AddToCartButton from "@/components/buttons/AddToCartButton";
import { Button } from "@/components/ui/button";
import { db } from "@/prisma/db";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await db.product.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-200 ">
      <h1 className="text-2xl font-bold text-gray-800 m-10">all products</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            data-cy="product"
            key={product.articleNumber}
            className="border rounded-md p-4 shadow-md bg-white flex md:flex-col items-center lg:mt-5 "
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
            <div className=" flex flex-col justify-between items-stretch md:w-full gap-2 ml-3">
              <Link href={`/product/${product.articleNumber}/${product.title}`}>
                <h2
                  data-cy="product-title"
                  className="text-lg font-semibold mt-2 hover:underline flex justify-center"
                >
                  {product.title}
                </h2>
              </Link>
                <div className="flex md:justify-center">
                  <p>Apple</p>
                </div>
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
                <Button className="bg-slate-500 w-full rounded-xs cursor-pointer ">
                  Info
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h1 className="m-15"></h1>
      </div>
    </main>
  );
}
