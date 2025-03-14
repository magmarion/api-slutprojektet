"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/cartStore";
import { toast } from "sonner";

interface AddToCartButtonProps {
  id: string;
  title: string;
  price: number;
}

export default function AddToCartButton({ id, title, price }: AddToCartButtonProps) {

  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({ id, title, price, quantity: 1 });
    toast.success("Added to cart!");
  };

  return (
    <Button
      data-cy="product-buy-button"
      onClick={handleAddToCart}
      className="mt-3 w-full cursor-pointer "
    >
      Buy
    </Button>
  );
}
