import { db } from "@/prisma/db";
import AdminUI from "../../components/admin/AdminUI";
import { createProduct, deleteProduct, updateProduct } from "./actions";


export default async function AdminPage() {

  const products = await db.product.findMany();

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
