import AddProductForm from "@/components/admin/AddProductForm";

export default function AddProductPage() {
    return (
        <div className="p-4 md:p-10">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
            <AddProductForm />
        </div>
    );
}
