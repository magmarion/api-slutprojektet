// app/admin/layout.tsx
import AdminTable from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/button";
import { db } from "@/prisma/client";
import Link from "next/link";

export default async function AdminPage() {
  const products = await db.product.findMany({
    include: { categories: true }, 
  });

  return (
    <div className="p-4 md:p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">ADMIN DASHBOARD</h1>
        <Link href="/admin/product/new">
          <Button className="cursor-pointer" data-cy="admin-add-product">
            Add Product
          </Button>
        </Link>
      </div>
      <AdminTable products={products} />
    </div>
  );
}
