"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaEnvelope, FaUser, FaComment } from "react-icons/fa"; // Font Awesome icons

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
                toast.success("Your message has been sent.");
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error("Failed to send message.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong.");
        }
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
                        Get in Touch
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Have questions or want to ask about a product? Feel free to reach us!
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
                            className="bg-white p-8 rounded-xl shadow-lg"
                        >
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">
                                Contact Information
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <FaEnvelope className="w-6 h-6 text-slate-600" />
                                    <p className="text-slate-600">contact@techgear.com</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FaUser className="w-6 h-6 text-slate-600" />
                                    <p className="text-slate-600">+46 123 456 789</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-slate-200 rounded-xl p-8 h-72 flex items-center justify-center"
                        >
                            <FaComment className="w-24 h-24 text-slate-600" />
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white p-8 rounded-xl shadow-lg"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-slate-700 mb-2">Name</label>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-500"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 mb-2">Email</label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-slate-500"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-700 mb-2">Message</label>
                                <Textarea
                                    name="message"
                                    placeholder="Your message..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                    className="w-full p-3 border rounded-lg h-40 focus:ring-2 focus:ring-slate-500"
                                />
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-800 hover:bg-blue-900 text-white py-5 rounded transition-all cursor-pointer"
                                >
                                    Send Message
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}