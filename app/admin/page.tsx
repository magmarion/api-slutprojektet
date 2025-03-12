import { createProduct, updateProduct, deleteProduct } from "./actions";
import AdminUI from "../../components/admin/AdminUI";
import { db } from "@/prisma/db"; 

export default async function AdminPage() {
  // 1. Fetch data from Prisma
  // (You can do this directly here if you like)
    const products = await db.product.findMany()

  // 2. Render the server component, passing actions to the client child
  return (
    <main className="p-4 md:p-10">
      <h1 className="text-2xl font-bold mb-6">ADMIN</h1>
      <AdminUI
        products={products}
        createAction={createProduct}
        updateAction={updateProduct}
        deleteAction={deleteProduct}
      />
    </main>
  );
}
