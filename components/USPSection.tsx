// components/USPSection.tsx
"use client";

import { FaShippingFast, FaLeaf, FaLock } from "react-icons/fa";

export default function USPSection() {
    const usps = [
        {
            icon: <FaShippingFast className="text-3xl text-[#594100]" />,
            title: "Snabb Leverans",
            desc: "Vi levererar blommor inom 24 timmar i hela Sverige.",
        },
        {
            icon: <FaLeaf className="text-3xl text-[#594100]" />,
            title: "Miljövänligt",
            desc: "Alla våra blommor är ekologiskt odlade utan kemikalier.",
        },
        {
            icon: <FaLock className="text-3xl text-[#594100]" />,
            title: "Trygg Betalning",
            desc: "Säker och smidig betalning med Klarna eller kort.",
        },
    ];

    return (
        <section className="w-full bg-[#f8f2c7] py-12 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                {usps.map((usp, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="mb-4">{usp.icon}</div>
                        <h3 className="text-xl font-bold text-[#594100]">{usp.title}</h3>
                        <p className="text-md text-slate-900 mt-2 max-w-xs">{usp.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
