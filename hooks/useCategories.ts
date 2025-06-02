// hooks/useCategories.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/app/admin/actions";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const categoriesData = await getCategories();
            return categoriesData.map((cat: { name: string }) => cat.name);
        },
    });
}