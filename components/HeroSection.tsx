import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative w-full h-[60vh] md:h-[75vh] lg:h-[95vh] overflow-hidden">
            {/* Bakgrundsbild */}
            <Image
                src="/hero-image.png"
                alt="Bloom Hero Image"
                fill
                priority
                className="object-cover object-center"
            />

            {/* Overlay innehåll */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-[#FEFAE1] p-4 md:p-8 z-10 bg-black/20">
                <h1 className="text-5xl md:text-7xl font-bold mb-4">BLOOM</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-md">
                    Utforska vårt sortiment för ett grönare hem och gård!
                </p>

                {/* Knappar till dynamiska kategorier */}
                <div className="flex gap-4">
                    <Link href={`/categories/${encodeURIComponent("inomhus")}`}>
                        <button className="bg-[#AF3E3E] hover:bg-[#8B322C] text-[#FEFAE1] px-4 py-2 rounded cursor-pointer">
                            Inomhus
                        </button>
                    </Link>
                    <Link href={`/categories/${encodeURIComponent("utomhus")}`}>
                        <button className="bg-[#222831] hover:bg-[#0F0F0F] text-[#FEFAE1] px-4 py-2 rounded cursor-pointer">
                            Utomhus
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
