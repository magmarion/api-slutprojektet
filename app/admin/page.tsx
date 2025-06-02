// app/admin/page.tsx
import AddProductForm from "@/components/admin/AddProductForm";
import AdminProductsGrid from "@/components/admin/AdminTable";
import { getAllProducts } from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/requiredSession";

export default async function AdminPage() {
  await requireAdminSession();

  const products = await getAllProducts();

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-[#3D5300] mb-8">
        Administratörspanel
      </h1>

      {/* Product Creation Form */}
      <section className="mb-10">
        <AddProductForm />
      </section>

      {/* Product List */}
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
    </main>
  );
}
