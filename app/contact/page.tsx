"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Import Sonner's toast
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
                // Use Sonner's toast for success
                toast.success("Your message has been sent.");
                setFormData({ name: "", email: "", message: "" }); // Reset form
            } else {
                // Use Sonner's toast for error
                toast.error("Failed to send message.");
            }
        } catch (error) {
            console.error("Error:", error);
            // Use Sonner's toast for error
            toast.error("Something went wrong.");
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-200 p-6">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl text-center">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                        />
                        <Textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}