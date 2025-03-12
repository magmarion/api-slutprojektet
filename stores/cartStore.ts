import { create } from "zustand";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartStore {
    cartItems: CartItem[];
    cartCount: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
    cartItems: [],
    cartCount: 0,
    addToCart: (item) =>
        set((state) => ({
            cartItems: [...state.cartItems, item],
            cartCount: state.cartCount + 1,
        })),
    removeFromCart: (itemId) =>
        set((state) => ({
            cartItems: state.cartItems.filter((item) => item.id !== itemId),
            cartCount: state.cartCount - 1,
        })),
}));

export default useCartStore;