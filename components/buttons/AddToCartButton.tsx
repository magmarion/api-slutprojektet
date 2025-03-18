"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/cartStore";
import { toast } from "sonner";

interface AddToCartButtonProps {
  id: string;
  title: string;
  price: number;
  image: string;
}

export default function AddToCartButton({ id, title, price, image }: AddToCartButtonProps) {

  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({ id, title, price, quantity: 1, image });
    toast.success(
      <span data-cy="added-to-cart-toast">
        <strong>{title}</strong> added to cart!
      </span>
    );
  };

  return (
    <Button
      data-cy="product-buy-button"
      onClick={handleAddToCart}
      className="mt-3 w-full cursor-pointer rounded-xs"
    >
      Buy
    </Button>
  );
}
