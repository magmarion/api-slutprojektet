import AddToCartButton from "@/components/buttons/AddToCartButton";
import { db } from "@/prisma/db";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductDetail({
  params,
}: {
  params: { articleNumber: string; title: string };
}) {
  const { articleNumber, title } = await params;

  const product = await db.product.findUnique({
    where: { articleNumber },
  });

  if (!product) return notFound();

  return (
    <main>
      <div data-cy="product" className="pt-30 lg:flex justify-center ">
          <Image
            src={product.image}
            alt={product.title}
            width={540}
            height={540}
            className="rounded-lg my-4 border p-4 shadow-md bg-white "
            priority
          />

        <div className="max-w-xl lg:max-w-">
          <h1 data-cy="product-title" className="text-3xl font-bold p-5">
            {product.title}
          </h1>
          <p data-cy="product-description" className="text-gray-700 p-5 ">
            {product.description}
          </p>

          <p
            data-cy="product-price"
            className="text-gray-700 text-lg p-5 font-bold "
          >
            Price: {product.price} SEK
          </p>
          <div className="w-64 p-5">
            <AddToCartButton />
          </div>
        </div>
      </div>
    </main>
  );
}
