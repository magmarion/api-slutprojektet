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
    <main className="flex min-h-screen flex-col items-center bg-slate-200  ">
      <section className="relative w-full h-[20vh] md:h-[40vh]">
        <Image
          src="/heroimage.jpg"
          alt="logo"
          fill
          priority
          className="object-center object-cover"
        />
        <div className="absolute inset-0 font-extrabold text-gray-800 flex flex-col justify-center text-[16px] md:text-3xl lg:text-5xl md:pl-10 lg:pl-30 ml-3 shadow-md ">
          <div className="  text-slate-900 md:tracking-wide text-[11px]  hover:text-gray-400 w-fit ">
            <p className="   font-medium md:text-[14px]">TECH</p>
            <p className="font-extrabold -mt-1.5 lg:-mt-0.5   md:text-[14px]">
              GEAR
            </p>
          </div>

          <div className="leading-none ">
            <p>tech you need,</p>
            <p className="">when you need.</p>
          </div>
          <div className="leading-none">
            <p className="text-[0.7rem] mt-1 md:mt-2 md:text-[1rem] font-bold">
              ✔ In stock
            </p>
            <p className="text-[0.7rem] md:text-[1rem] font-bold">
              ✔ Fast delivery
            </p>
            <p className="text-[0.7rem] md:text-[1rem] font-bold">
              ✔ 24/7 support
            </p>
          </div>
          <Link href={"/product"} className="w-fit">
            <Button
              variant={"ghost"}
              className="w-[55px] h-[30px] text-xs font-bold mt-3  md:w-[100px] md:h-[35px] rounded-xs cursor-pointer border border-gray-900 "
            >
              Browse
            </Button>
          </Link>
        </div>
      </section>
      <h1 className="text-2xl font-bold text-center text-gray-900 m-10">
        Supah Dupah Hot Deals Right Now
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {products.map((product) => (
          <div
            data-cy="product"
            key={product.articleNumber}
            className="border rounded-xs p-4 shadow-md bg-white flex md:flex-col items-center  "
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
            <div className=" flex flex-col justify-between items-stretch md:w-full gap-2 ml-5 md:ml-0">
              <Link href={`/product/${product.articleNumber}/${product.title}`}>
                <h2
                  data-cy="product-title"
                  className="text-lg font-semibold mt-2 hover:underline flex md:justify-center "
                >
                  {product.title}
                </h2>
              </Link>
              <div className="flex md:justify-center">
                <p>Apple</p>
              </div>
              <p
                data-cy="product-price"
                className="text-gray-700 flex md:justify-center"
              >
                {product.price} SEK
              </p>
              <AddToCartButton
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
              />
              <Link href={`/product/${product.articleNumber}/${product.title}`}>
                <Button className="bg-slate-500 w-full rounded-xs cursor-pointer  ">
                  Info
                </Button>
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
