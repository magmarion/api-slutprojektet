import AddToCartButton from "@/components/buttons/AddToCartButton";
import { Button } from "@/components/ui/button";
import { db } from "@/prisma/db";
import Image from "next/image";
import Link from "next/link";

export default async function Home({
    searchParams,
  }: {
    searchParams: { page?: string };
  }) {
    const pageSize = 8;
    // Läs av nuvarande sida från query-parametrarna, defaulta till 1 om inget anges
    const currentPage = parseInt(searchParams.page ?? "1", 10);
    const skip = (currentPage - 1) * pageSize;
  
    // Hämta bara de produkter som ska visas på den aktuella sidan
    const products = await db.product.findMany({
      skip,
      take: pageSize,
    });
  
    // Om du vill ha totala antalet produkter för att kunna räkna ut antalet sidor:
    const totalProducts = await db.product.count();
    const totalPages = Math.ceil(totalProducts / pageSize);
  return (
    <main className="flex min-h-screen flex-col items-center  ">
      <section className="relative w-full h-[20vh] md:h-[40vh]">
        <Image
          src="/heroimage.jpg"
          alt="logo"
          fill
          priority
          className="object-center object-cover"
        />
        <div className="absolute inset-0 font-bold text-gray-800 flex flex-col justify-center text-sm md:text-3xl lg:text-4xl md:pl-10 lg:pl-30 ml-3 ">
          <p>Tech You Need.</p>
          <p className="lg:mt-3">When You Need.</p>

          <p className="text-[0.7rem] mt-2 md:mt-5 md:text-[1rem]">✅ In stock</p>
          <p className="text-[0.7rem] md:text-[1rem]">
            🚛 Fast delivery
          </p>
          <Link href={"/product"}>
          <Button className="w-[55px] h-[30px] text-xs mt-3 bg-slate-500 md:w-[100px] md:h-[35px] rounded-xs">Browse</Button>
          </Link>
        </div>
      </section>
      <h1 className="text-2xl font-bold text-gray-800 m-10">Trending Products</h1>

      <div className="flex flex-col w-full md:justify-center md:flex-row md:flex-wrap  gap-2 md:gap-5 md:w-[55%] lg:w-[40%]  ">
        {products.map((product) => (
          <div
            data-cy="product"
            key={product.articleNumber}
            className="border rounded-xs p-4 shadow-md bg-white flex md:flex-col items-center lg:mt-5 "
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
                  className="text-lg font-semibold mt-2 hover:underline"
                >
                  {product.title}
                </h2>
                <div className="flex md:justify-center">
                  <p>Apple</p>
                </div>
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
                <Button className="bg-slate-500 w-full rounded-xs cursor-pointer  ">Info</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

            {/* Pagination-länkar */}
            <div className="flex gap-4 my-8">
        {currentPage > 1 && (
          <Link href={`/?page=${currentPage - 1}`}>
            <Button className="rounded-xs cursor-pointer">Previous</Button>
          </Link>
        )}
        {currentPage < totalPages && (
          <Link href={`/?page=${currentPage + 1}`}>
            <Button className="rounded-xs cursor-pointer ">Next</Button>
          </Link>
        )}
      </div>

      
    </main>
  );
}
