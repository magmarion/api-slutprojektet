// components/admin/AddProductForm.tsx
export default function AddProductForm() {
    return (
        <form
            action={async (formData: FormData) => {
                "use server";
                const { createProductAction } = await import("@/app/admin/actionsForm");
                await createProductAction(formData);
            }}
            method="post"
            data-cy="product-form"
            className="max-w-lg mx-auto grid gap-4 py-4"
        >
            <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input name="title" id="title" placeholder="Product Title" className="input" />
                {/* Add error placeholder with data-cy if needed */}
                <p data-cy="product-title-error" className="text-red-500 text-sm"></p>
            </div>
            <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image URL
                </label>
                <input name="image" id="image" placeholder="https://example.com/image.jpg" className="input" />
                <p data-cy="product-image-error" className="text-red-500 text-sm"></p>
            </div>
            <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                </label>
                <input name="price" id="price" type="number" placeholder="999" className="input" />
                <p data-cy="product-price-error" className="text-red-500 text-sm"></p>
            </div>
            <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea name="description" id="description" placeholder="Short description..." className="textarea" />
                <p data-cy="product-description-error" className="text-red-500 text-sm"></p>
            </div>
            <button type="submit" className="btn">
                Save
            </button>
        </form>
    );
}
