import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { Product } from "../../data";       
import AdminUI from "../../components/admin/AdminUI";


export default async function AdminPage() {

  const products = await db.product.findMany();

 
  async function createProduct(data: Partial<Product>) {
    "use server"; 
    await db.product.create({
      data: {
        articleNumber: data.articleNumber ?? `temp-${Date.now()}`,
        title: data.title ?? "Untitled",
        image: data.image ?? "",
        description: data.description ?? "",
        price: data.price ?? 0,
      },
    });
    revalidatePath("/admin"); 
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

 
  return (
    <div className="p-4 md:p-10">
     
      <AdminUI
        products={products}
        createAction={createProduct}
        updateAction={updateProduct}
        deleteAction={deleteProduct}
      />
    </div>
  );
}
