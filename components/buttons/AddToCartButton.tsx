"use client";

import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/cartStore";
import { toast } from "sonner";

interface AddToCartButtonProps {
  id: string;
  title: string;
  price: number;
  image: string;

  stock: number;
  className?: string;  // Lägg till denna rad

}

export default function AddToCartButton({ id, title, price, image, stock }: AddToCartButtonProps) {

  const { addToCart } = useCartStore();


const handleAddToCart = () => {
  if (stock < 1) {
    toast.error(
      <>
        <span>

          <strong>{title}</strong> är tyvärr slut i lager.

        </span>
      </>
    );
    return;
  }

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
};
