"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AddToCartButton() {
    return (
        <Button
            onClick={() => toast.success("Added to cart!")}
            className="mt-3 w-full cursor-pointer"
        >
            Buy
        </Button>
    )
}
