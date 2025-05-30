"use client";
import { useCategories } from "@/hooks/useCategories";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductDropdown({ isOpen, onClose }: Props) {
    const { data: categories = [], isLoading, isError } = useCategories();

    if (isLoading) return null;
    if (isError) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute mt-7 w-48 bg-[#516036] text-[#FEFAE1] shadow-xl rounded-xl z-50 overflow-hidden"
                >
                    {categories.map((category) => (
                        <Link
                            key={category}
                            href={`/categories/${encodeURIComponent(category)}`}
                            className="block px-5 py-3 hover:bg-[#51722a] hover:text-[#F4D794] transition-colors duration-200 text-sm font-medium"
                            onClick={onClose}
                        >
                            {category}
                        </Link>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
