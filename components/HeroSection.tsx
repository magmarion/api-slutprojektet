import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[20vh] md:h-[40vh] lg:h-[50vh]">
      <Image
        src="/heroimage.jpg"
        alt="Bloom Hero Image"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">BLOOM</h1>
        <p className="text-xl md:text-2xl mb-8">Shoppa billiga växter idag</p>
        <div className="flex gap-4">
          <Link href="/inomhus" className="w-fit">
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              Inomhus
            </button>
          </Link>
          <Link href="/utomhus" className="w-fit">
            <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded">
              Utomhus
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}