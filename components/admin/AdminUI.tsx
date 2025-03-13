"use client"

import type { Product } from "@/data"
import { useState } from "react"
import AddProductDialog from "./AddProductDialog"
import AdminProductCard from "./AdminProductCard"

interface AdminUIProps {
  products: Product[]
  createAction: (data: Partial<Product>) => Promise<void>
  updateAction: (articleNumber: string, data: Partial<Product>) => Promise<void>
  deleteAction: (articleNumber: string) => Promise<void>
}

export default function AdminUI({
  products,
  createAction,
  updateAction,
  deleteAction,
}: AdminUIProps) {
  const [isAddOpen, setAddOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">ADMIN</h1>

        <AddProductDialog
          isOpen={isAddOpen}
          onOpenChange={setAddOpen}
          createAction={createAction}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <AdminProductCard
            key={p.articleNumber}
            product={p}
            updateAction={updateAction}
            deleteAction={deleteAction}
          />
        ))}
      </div>
    </>
  )
}
