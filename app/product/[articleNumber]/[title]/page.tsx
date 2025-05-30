import AddToCartButton from "@/components/buttons/AddToCartButton";
import { db } from "@/prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductDetailProps {
    params: Promise<{ articleNumber: string; }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
    // Await params before using its properties
    const { articleNumber } = await params;

    const product = await db.product.findFirst({
        where: { articleNumber: articleNumber },
    });

    if (!product) return notFound();

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#FEFAE1] to-[#daa400] py-12 px-4">
            <div className="mx-auto max-w-6xl animate-fade-in">
                {/* Product Card */}
                <div className="flex flex-col lg:flex-row p-8 gap-8 shadow-2xl overflow-hidden bg-[#fff6da]">
                    {/* Image Section */}
                    <div className="w-full lg:flex-1">
                        <div className="relative w-full aspect-square sm:h-80 lg:h-max mx-auto transition-transform duration-300 hover:scale-103">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover shadow-lg"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-[#3D5300] mb-4 animate-slide-up">
                                {product.title}
                            </h1>
                            <p className="text-[#616F47] text-lg mb-6 leading-relaxed animate-slide-up delay-100">
                                {product.description}
                            </p>


                            <div className="p-4 rounded-lg mb-6 animate-slide-up delay-200">
                                <h2 className="text-xl font-semibold text-[#3D5300] mb-2">
                                    Produktdetaljer
                                </h2>
                                <ul className="text-[#616F47] space-y-1">
                                    <li>Artikelnummer: {product.articleNumber}</li>
                                    <li className={`${product.stock < 1 ? "text-red-600" : "text-green-600"} font-medium`}> {product.stock < 1 ? "❌ Ej i lager" : "✔ I lager"}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="animate-slide-up delay-300">
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-3xl font-bold text-[#3D5300]">
                                    {product.price} SEK
                                </p>
                                <span className="text-sm text-[#616F47]">inkl. moms</span>
                            </div>

                            <AddToCartButton
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                                stock={product.stock}
                                className="w-full py-3 text-lg bg-gradient-to-r from-[#3D5300] to-[#616F47] hover:from-[#616F47] hover:to-[#3D5300] transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-8 text-center text-[#616F47] animate-fade-in delay-500">
                    <p className="inline-flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Säker betalning • 30 dagars öppet köp
                    </p>
                </div>
            </div>
        </main>
    );
}