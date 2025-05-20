// app/admin/product/[articleNumber]/page.tsx
import EditProductForm from "@/components/admin/EditProductForm";
import type { Product } from "@/generated/prisma";
import { db } from "@/prisma/client";

interface PageProps {
    params: { articleNumber: string };
}

export default async function EditProductPage({ params }: PageProps) {
    const { articleNumber } = params;
    const product: Product | null = await db.product.findUnique({
        where: { articleNumber },
    });

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="p-4 md:p-10">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <EditProductForm product={product} />
        </div>
    );
}
