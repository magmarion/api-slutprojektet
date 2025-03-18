"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/cartStore";
import { toast } from "sonner";

interface AddToCartButtonProps {
  id: string;
  title: string;
  price: number;
  image: string;
  articleNumber: string;
}

export default function AddToCartButton({ id, title, price, image, articleNumber }: AddToCartButtonProps) {

  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({ id, articleNumber, title, price, quantity: 1, image });
    toast.success(
      <span data-cy="added-to-cart-toast">
        <strong>{title}</strong> has been added
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
