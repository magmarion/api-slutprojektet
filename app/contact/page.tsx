"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaEnvelope, FaUser, FaComment } from "react-icons/fa";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Ditt meddelande har skickats.");
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error("Kunde inte skicka meddelandet.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Något gick fel.");
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#FEFAE1] to-[#F4D794]">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-[#616F47] to-[#3D5300] text-white py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-4 text-center"
                >
                    <h1 className="text-[#FEFAE1] text-4xl md:text-6xl font-bold mb-6">
                        Kontakta oss
                    </h1>
                    <p className="text-xl text-[#FEFAE1] max-w-2xl mx-auto">
                        Har du frågor eller vill veta mer om våra växter? Hör av dig till oss!
                    </p>
                </motion.div>
            </div>

            {/* Contact Form Section */}
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-12 items-start"
                >
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-[#FFF6DA] p-8 shadow-lg"
                        >
                            <h2 className="text-3xl font-bold text-[#000000] mb-6">
                                Kontaktuppgifter
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <FaEnvelope className="w-6 h-6 text-[#616F47]" />
                                    <p className="text-[#000000]">kontakt@bloom.se</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FaUser className="w-6 h-6 text-[#616F47]" />
                                    <p className="text-[#000000]">+46 123 456 789</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="p-8 h-72 flex items-center justify-center"
                        >
                            <FaComment className="w-24 h-24 text-[#616F47]" />
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-[#FFF6DA] p-8 shadow-lg"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[#000000] mb-2">Namn</label>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Lucy Montana"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                    className="w-full p-3 border focus:ring-2 focus:ring-[#616F47]"
                                />
                            </div>

                            <div>
                                <label className="block text-[#000000] mb-2">E-post</label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="lucy@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    className="w-full p-3 border focus:ring-2 focus:ring-[#616F47]"
                                />
                            </div>

                            <div>
                                <label className="block text-[#000000] mb-2">Meddelande</label>
                                <Textarea
                                    name="message"
                                    placeholder="Ditt meddelande..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                    className="w-full p-3 border h-40 focus:ring-2 focus:ring-[#616F47]"
                                />
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    type="submit"
                                    className="w-full bg-[#465232] hover:bg-[#4f5e3c] text-white py-5 transition-all cursor-pointer"
                                >
                                    Skicka Meddelande
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
