"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/cartStore";
import { toast } from "sonner";

interface AddToCartButtonProps {
  id: string;
  title: string;
  price: number;
  image: string;
  className?: string;  // Lägg till denna rad

}

export default function AddToCartButton({ id, title, price, image }: AddToCartButtonProps) {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({ id, title, price, quantity: 1, image });
    toast.success(
      <>
        <span>
          <strong>{title}</strong> har lagts till i varukorgen!
        </span>
      </>
    );
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="mt-3 w-full cursor-pointer py-4"
    >
      Lägg i varukorg
    </Button>
  );
}
