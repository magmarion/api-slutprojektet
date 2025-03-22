"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Import useRouter
import { FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";

export default function About() {
    const router = useRouter(); // Initialize the router

    const handleExploreClick = () => {
        router.push("/product"); // Navigate to the product page
    };

    return (
        <main className="min-h-screen bg-slate-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-4 text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        About TechGear
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Empowering the future of technology through innovation and excellence
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
                        <h2 className="text-3xl font-bold text-slate-900">
                            Our Story
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Founded in 2023, TechGear emerged from a shared passion for cutting-edge
                            technology and user-centric design. What started as a small team of
                            enthusiasts has grown into a leading force in the tech industry.
                        </p>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            We specialize in creating innovative solutions that bridge the gap
                            between advanced technology and everyday usability. Our products
                            are crafted with precision, tested rigorously, and designed to
                            elevate your digital experience.
                        </p>
                    </div>

                    {/* Image/Graphic Placeholder */}
                    <div className="bg-slate-200 rounded-xl p-8 h-96 flex items-center justify-center">
                        <FaRocket className="w-24 h-24 text-slate-600" />
                    </div>
                </motion.div>

                {/* Key Points Grid */}
                <div className="grid md:grid-cols-3 gap-8 mt-20">
                    {[
                        {
                            icon: <FaUsers className="w-12 h-12" />,
                            title: "Expert Team",
                            text: "50+ professionals dedicated to excellence"
                        },
                        {
                            icon: <FaShieldAlt className="w-12 h-12" />,
                            title: "Quality Assurance",
                            text: "Rigorous testing for perfect performance"
                        },
                        {
                            icon: <FaRocket className="w-12 h-12" />,
                            title: "Innovation Driven",
                            text: "Pioneering new tech solutions daily"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
                        >
                            <div className="text-slate-600 mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-slate-600">{item.text}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mt-20 py-12 bg-slate-900 rounded-xl"
                >
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Join the Tech Revolution
                    </h2>
                    <Button
                        onClick={handleExploreClick} // Add onClick handler
                        className="bg-blue-800 text-white px-14 py-4 rounded hover:bg-blue-900 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        Explore Our Products
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}