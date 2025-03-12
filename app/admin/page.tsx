import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { Product } from "../../data";        // Import the Product interface
import AdminUI from "../../components/admin/AdminUI";

// This is a server component by default (no "use client").
export default async function AdminPage() {
  // 1) Fetch products from DB
  const products = await db.product.findMany();

  // 2) Define server actions here:
  async function createProduct(data: Partial<Product>) {
    "use server"; // Tells Next.js this is a server action
    await db.product.create({
      data: {
        articleNumber: data.articleNumber ?? `temp-${Date.now()}`,
        title: data.title ?? "Untitled",
        image: data.image ?? "",
        description: data.description ?? "",
        price: data.price ?? 0,
      },
    });
    revalidatePath("/admin"); // Refresh data on this route
  }

  async function updateProduct(articleNumber: string, data: Partial<Product>) {
    "use server";
    await db.product.update({
      where: { articleNumber },
      data,
    });
    revalidatePath("/admin");
  }

  async function deleteProduct(articleNumber: string) {
    "use server";
    await db.product.delete({
      where: { articleNumber },
    });
    revalidatePath("/admin");
  }

  // 3) Render a minimal layout and pass everything to the client UI
  return (
    <div className="p-4 md:p-10">
      {/* Note: No extra <h1> here to avoid a duplicate heading */}
      <AdminUI
        products={products}
        createAction={createProduct}
        updateAction={updateProduct}
        deleteAction={deleteProduct}
      />
    </div>
  );
}
