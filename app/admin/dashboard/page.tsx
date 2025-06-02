import AdminProductsGrid, { ProductWithCategory } from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/button";
import { db } from "@/prisma/client";
import Link from "next/link";

export default async function DashboardPage() {
    // Kontroll av ADMIN-session avslagen för att testa ADMIN-dashboard
    // await requireAdminSession();

    const products: ProductWithCategory[] = await db.product.findMany({
        include: { categories: true },
    });

    return (
        <>
            <header className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">ADMIN DASHBOARD</h1>
                <div className="flex flex-wrap flex-col sm:flex-row items-center gap-2">
                    <Link href="/admin/product/new">
                        <Button className="cursor-pointer" data-cy="admin-add-product">
                            Ny produkt
                        </Button>
                    </Link>
                    {/* Du kan lägga till fler admin-länkar här */}
                    <Link href="/admin/orders">
                        <Button variant="outline" className="cursor-pointer">
                            Beställningar
                        </Button>
                    </Link>
                    <Link href="/admin/users">
                        <Button variant="outline" className="cursor-pointer">
                            Användare
                        </Button>
                    </Link>
                </div>
            </header>
            <section>
                <h2 className="text-2xl font-semibold text-[#3D5300] mb-4">
                    Alla Produkter
                </h2>
                {products.length > 0 ? (
                    <AdminProductsGrid products={products} />
                ) : (
                    <p className="text-gray-500">Inga produkter hittades.</p>
                )}
            </section>
        </>
    );
}