"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaSeedling, FaLeaf, FaRecycle } from "react-icons/fa";

export default function About() {
    const router = useRouter();

    const handleExploreClick = () => {
        router.push("/product");
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#FEFAE1] to-[#F4D794]">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-[#616F47] to-[#3D5300] text-[#FEFAE1] py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-4 text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Om BLOOM
                    </h1>
                    <p className="text-xl text-[#FEFAE1] max-w-2xl mx-auto">
                        Grönare hem, naturligare liv. Vi förverkligar din blomstrande oas.
                    </p>
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Text Content */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-[#000000]">
                            Vår resa
                        </h2>
                        <p className="text-[#000000] text-lg leading-relaxed">
                            BLOOM startades ur kärleken till naturen och viljan att skapa gröna miljöer
                            i alla typer av hem. Från fönsterbrädan till trädgården erbjuder vi noggrant
                            utvalda växter som både är vackra och hållbara.
                        </p>
                        <p className="text-[#000000] text-lg leading-relaxed">
                            Vi tror på att varje hem förtjänar liv och färg – och med våra produkter vill vi göra det enkelt för alla att skapa sin egen oas, oavsett erfarenhet.
                        </p>
                    </div>

                    {/* Image Placeholder */}
                    <div className="p-8 h-96 flex items-center justify-center">
                        <FaSeedling className="w-24 h-24 text-[#616F47]" />
                    </div>
                </motion.div>

                {/* Key Points Grid */}
                <div className="grid md:grid-cols-3 gap-8 mt-20">
                    {[
                        {
                            icon: <FaLeaf className="w-12 h-12" />,
                            title: "Naturlig skönhet",
                            text: "Växter som förvandlar ditt hem med liv and färg."
                        },
                        {
                            icon: <FaRecycle className="w-12 h-12" />,
                            title: "Hållbarhet i fokus",
                            text: "Miljövänliga val i varje steg – från kruka till leverans."
                        },
                        {
                            icon: <FaSeedling className="w-12 h-12" />,
                            title: "Personlig rådgivning",
                            text: "Vi hjälper dig välja rätt växt för din miljö och livsstil."
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="p-8 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
                        >
                            <div className="text-[#616F47] mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-[#000000]">{item.title}</h3>
                            <p className="text-[#000000]">{item.text}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mt-20 py-12 bg-[#465232]"
                >
                    <h2 className="text-3xl font-bold text-[#FEFAE1] mb-6">
                        Upptäck vårt gröna sortiment
                    </h2>
                    <Button
                        onClick={handleExploreClick}
                        className="bg-[#FEFAE1] text-[#000000] px-14 py-4 hover:bg-[#FEFAE1] hover:text-[#616F47] transition-all duration-300 hover:scale-105"
                    >
                        Utforska Produkter
                    </Button>
                </motion.div>
            </div>
        </main>
);
}
