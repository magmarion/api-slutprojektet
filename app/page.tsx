"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const products = [
  {
    id: 1,
    name: "Trådlösa Hörlurar",
    price: 5500,
    image:
      "https://soundium.se/media/catalog/product/cache/705b44c076ccef27260ea5d687f0f9cb/p/x/px8darkforest.jpg",
  },
  {
    id: 2,
    name: "Smartklocka",
    price: 2490,
    image:
      "https://www.elgiganten.se/image/dv_web_D180001280333226/786744/samsung-galaxy-watch-fe-bt-smartwatch-svart.jpg",
  },
  {
    id: 3,
    name: "Laptop",
    price: 9999,
    image:
      "https://www.jbhifi.com.au/cdn/shop/files/749929-Product-0-I-638518544407964431.jpg?v=1718771855",
  },
  {
    id: 4,
    name: "Elcykel",
    price: 25999,
    image:
      "https://images-cdn.ubuy.co.in/636326cdb789336d02347545-electric-bike-totguard-electric-bike.jpg",
  },
  {
    id: 5,
    name: "Trådlösa Hörlurar",
    price: 5500,
    image:
      "https://soundium.se/media/catalog/product/cache/705b44c076ccef27260ea5d687f0f9cb/p/x/px8darkforest.jpg",
  },
  {
    id: 6,
    name: "Smartklocka",
    price: 2490,
    image:
      "https://www.elgiganten.se/image/dv_web_D180001280333226/786744/samsung-galaxy-watch-fe-bt-smartwatch-svart.jpg",
  },
  {
    id: 7,
    name: "Laptop",
    price: 9999,
    image:
      "https://www.jbhifi.com.au/cdn/shop/files/749929-Product-0-I-638518544407964431.jpg?v=1718771855",
  },
  {
    id: 8,
    name: "Elcykel",
    price: 25999,
    image:
      "https://images-cdn.ubuy.co.in/636326cdb789336d02347545-electric-bike-totguard-electric-bike.jpg",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to the webshop!
      </h1>
      <p className="text-gray-600 mb-8">Here you will find our best products</p>

      <div className="flex flex-wrap justify-between items-center gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <Link href={`/${product.id}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={150}
                className="object-cover w-full h-40 rounded-md cursor-pointer"
              />
            </Link>
            <Link href={`/product/${product.id}`}>
              <h2 className="text-lg font-semibold mt-2 hover:underline">
                {product.name}
              </h2>
            </Link>
            <p className="text-gray-700">Price: {product.price} SEK</p>
            <Button
              onClick={() => toast.success("Added to cart!")}
              className="mt-3 w-full cursor-pointer"
            >
              Buy
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
