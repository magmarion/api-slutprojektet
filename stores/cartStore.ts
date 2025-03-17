import { create } from "zustand";

interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartStore {
    cartItems: CartItem[];
    cartCount: number;
    totalPrice: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
}

const useCartStore = create<CartStore>((set) => ({
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,

    addToCart: (item: CartItem) =>
        set((state) => {

            console.log("Adding to cart:", item); // ✅ Debugging log
            if (!item.image) {
                console.error("Missing image property in cart item:", item);
            }

            const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
            let updatedCartItems;

            if (existingItem) {
                updatedCartItems = state.cartItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedCartItems = [...state.cartItems, { ...item, quantity: 1 }];
            }

            return {
                cartItems: updatedCartItems,
                cartCount: updatedCartItems.reduce((count, i) => count + i.quantity, 0),
                totalPrice: updatedCartItems.reduce((total, i) => total + i.price * i.quantity, 0),
            };
        }),

    removeFromCart: (itemId) =>
        set((state) => {
            const updatedCartItems = state.cartItems.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
                .filter((item) => item.quantity > 0); // Remove if quantity is 0

            return {
                cartItems: updatedCartItems,
                cartCount: updatedCartItems.reduce((count, i) => count + i.quantity, 0),
                totalPrice: updatedCartItems.reduce((total, i) => total + i.price * i.quantity, 0),
            };
        }),

    increaseQuantity: (itemId: string) =>
        set((state) => {
            const updatedCartItems = state.cartItems.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            return {
                cartItems: updatedCartItems,
                cartCount: updatedCartItems.reduce((count, i) => count + i.quantity, 0),
                totalPrice: updatedCartItems.reduce((total, i) => total + i.price * i.quantity, 0),
            };
        }),

    decreaseQuantity: (itemId: string) =>
        set((state) => {
            const updatedCartItems = state.cartItems.map((item) =>
                item.id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );

            return {
                cartItems: updatedCartItems,
                cartCount: updatedCartItems.reduce((count, i) => count + i.quantity, 0),
                totalPrice: updatedCartItems.reduce((total, i) => total + i.price * i.quantity, 0),
            };
        }),
}));

export default useCartStore;