// components/admin/EditProductForm.tsx
import type { Product } from "@/data";

interface EditProductFormProps {
    product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
    return (
        <form
            action={async (formData: FormData) => {
                "use server";
                const { updateProductAction } = await import("@/app/admin/actionsForm");
                await updateProductAction(formData, product.articleNumber);
            }}
            method="post"
            data-cy="product-form"
            className="max-w-lg mx-auto grid gap-4 py-4"
        >
            <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    name="title"
                    id="title"
                    defaultValue={product.title}
                    placeholder="Product Title"
                    className="input"
                />
                <p data-cy="product-title-error" className="text-red-500 text-sm"></p>
            </div>
            <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image URL
                </label>
                <input
                    name="image"
                    id="image"
                    defaultValue={product.image}
                    placeholder="https://example.com/image.jpg"
                    className="input"
                />
                <p data-cy="product-image-error" className="text-red-500 text-sm"></p>
            </div>
            <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                </label>
                <input
                    name="price"
                    id="price"
                    type="number"
                    defaultValue={product.price}
                    placeholder="999"
                    className="input"
                />
                <p data-cy="product-price-error" className="text-red-500 text-sm"></p>
            </div>
            <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    defaultValue={product.description}
                    placeholder="Short description..."
                    className="textarea"
                />
                <p data-cy="product-description-error" className="text-red-500 text-sm"></p>
            </div>
            <button type="submit" className="btn">
                Save Changes
            </button>
        </form>
    );
}
