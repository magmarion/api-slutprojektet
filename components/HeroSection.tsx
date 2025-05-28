import { getCategories } from "@/app/admin/actions";
import Image from "next/image";
import Link from "next/link";

export default async function HeroSection() {
    const categories = await getCategories();

    return (
        <section className="relative w-full h-[60vh] md:h-[75vh] lg:h-[95vh] overflow-hidden">
            {/* Bakgrundsbild */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="object-cover object-center w-full h-full"
            >
                <source src="/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay innehåll */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-[#FEFAE1] p-4 md:p-8 z-10 bg-black/20">
                <h1 className="text-5xl md:text-7xl font-bold mb-4">BLOOM</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-md filter backdrop-blur-sm text-[#FEFAE1] rounded-lg">
                    Utforska vårt sortiment för ett grönare hem och gård!
                </p>

                {/* Knappar till dynamiska kategorier */}
                <div className="flex gap-4">
                    {categories.map((category: { id: number; name: string }) => (
                        <Link
                            key={category.id}
                            href={`/categories/${encodeURIComponent(category.name)}`}
                        >
                            <button className={
                                category.id === 1
                                    ? "bg-[#AF3E3E] hover:bg-[#8B322C] text-[#FEFAE1] px-4 py-2 rounded cursor-pointer"
                                    : category.id === 2
                                        ? "bg-[#594100] hover:bg-[#4B352A] text-[#FEFAE1] px-4 py-2 rounded cursor-pointer"
                                        : "bg-gray-600 hover:bg-gray-700 text-[#FEFAE1] px-4 py-2 rounded cursor-pointer"
                            }
                            >
                                {category.name}
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
