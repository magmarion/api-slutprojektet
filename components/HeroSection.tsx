import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[20vh] md:h-[40vh]">
      <Image
        src="/heroimage.jpg"
        alt="logo"
        fill
        priority
        className="object-center object-cover"
      />
      <div className="absolute inset-0 font-extrabold text-gray-800 flex flex-col justify-center text-[16px] md:text-3xl lg:text-5xl md:pl-10 lg:pl-30 ml-3 shadow-md ">
        <div className="text-slate-900 md:tracking-wide text-[11px] hover:text-gray-400 w-fit ">
          <p className="font-medium md:text-[14px]">tech</p>
          <p className="font-extrabold -mt-1.5 lg:-mt-0.5 md:text-[14px]">
            gear
          </p>
        </div>

        <div className="leading-none ">
          <p>tech you need,</p>
          <p className="">when you need.</p>
        </div>
        <div className="leading-none">
          <p className="text-[0.7rem] mt-1 md:mt-2 md:text-[1rem] font-bold">
            ✔ in stock
          </p>
          <p className="text-[0.7rem] md:text-[1rem] font-bold">
            ✔ fast delivery
          </p>
          <p className="text-[0.7rem] md:text-[1rem] font-bold">
            ✔ 24/7 support
          </p>
        </div>
        <Link href="/product" className="w-fit">
          <Button
            variant={"ghost"}
            className="hover:bg-slate-900 hover:text-slate-50 w-[55px] h-[30px] text-xs font-bold mt-3 md:w-[100px] md:h-[35px] rounded-xs cursor-pointer border border-gray-900 "
          >
            Browse
          </Button>
        </Link>
      </div>
    </section>
  );
}
