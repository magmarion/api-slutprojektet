import Image from "next/image";
import { notFound } from "next/navigation";

const products = [
    {
        id: 1,
        name: "Trådlösa Hörlurar",
        price: 5500,
        image: "https://soundium.se/media/catalog/product/cache/705b44c076ccef27260ea5d687f0f9cb/p/x/px8darkforest.jpg",
    },
    {
        id: 2,
        name: "Smartklocka",
        price: 2490,
        image: "https://www.elgiganten.se/image/dv_web_D180001280333226/786744/samsung-galaxy-watch-fe-bt-smartwatch-svart.jpg",
    },
    {
        id: 3,
        name: "Laptop",
        price: 9999,
        image: "https://www.jbhifi.com.au/cdn/shop/files/749929-Product-0-I-638518544407964431.jpg?v=1718771855",
    },
    {
        id: 4,
        name: "Elcykel",
        price: 25999,
        image: "https://images-cdn.ubuy.co.in/636326cdb789336d02347545-electric-bike-totguard-electric-bike.jpg",
    },
    {
        id: 5,
        name: "Trådlösa Hörlurar",
        price: 5500,
        image: "https://soundium.se/media/catalog/product/cache/705b44c076ccef27260ea5d687f0f9cb/p/x/px8darkforest.jpg",
    },
    {
        id: 6,
        name: "Smartklocka",
        price: 2490,
        image: "https://www.elgiganten.se/image/dv_web_D180001280333226/786744/samsung-galaxy-watch-fe-bt-smartwatch-svart.jpg",
    },
    {
        id: 7,
        name: "Laptop",
        price: 9999,
        image: "https://www.jbhifi.com.au/cdn/shop/files/749929-Product-0-I-638518544407964431.jpg?v=1718771855",
    },
    {
        id: 8,
        name: "Elcykel",
        price: 25999,
        image: "https://images-cdn.ubuy.co.in/636326cdb789336d02347545-electric-bike-totguard-electric-bike.jpg",
    },
]


export default function ProductDetail({ params }: { params: { id: string } }) {
    const product = products.find((p) => p.id.toString() === params.id);

    if (!product) return notFound();

    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <Image
                src={product.image}
                alt={product.name}
                width={240}
                height={240}
                className="rounded-lg my-4 border p-4 shadow-md bg-white"
                priority
            />
            <p className="text-gray-700 text-lg ml-14">Price: {product.price} SEK</p>
        </main>
    );
}