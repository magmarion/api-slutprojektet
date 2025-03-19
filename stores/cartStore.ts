import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: number;
  city: string;
  country: string;

}

interface CartStore {
  // Cart
  cartItems: CartItem[];
  cartCount: number;
  totalPrice: number;

  // Customer/Checkout
  checkoutInfo: CheckoutInfo | null;

  // Cart actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;

  // Checkout actions
  setCheckoutInfo: (info: CheckoutInfo) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      cartCount: 0,
      totalPrice: 0,


      checkoutInfo: null,


      setCheckoutInfo: (info) => {
        set(() => ({ checkoutInfo: info }));
      },


      clearCart: () => {
        set(() => ({
          cartItems: [],
          cartCount: 0,
          totalPrice: 0,
        }));
      },


      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (cartItem) => cartItem.id === item.id
          );
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
            totalPrice: updatedCartItems.reduce(
              (total, i) => total + i.price * i.quantity,
              0
            ),
          };
        }),

      removeFromCart: (itemId) =>
        set((state) => {
          const updatedCartItems = state.cartItems.filter(
            (item) => item.id !== itemId
          );
          return {
            cartItems: updatedCartItems,
            cartCount: updatedCartItems.reduce((count, i) => count + i.quantity, 0),
            totalPrice: updatedCartItems.reduce(
              (total, i) => total + i.price * i.quantity,
              0
            ),
          };
        }),

      increaseQuantity: (itemId) =>
        set((state) => {
          const updatedCartItems = state.cartItems.map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );


          const updatedItem = updatedCartItems.find((i) => i.id === itemId);

          return {
            cartItems: updatedCartItems,
            cartCount: state.cartCount + 1,
            totalPrice:
              state.totalPrice + (updatedItem ? updatedItem.price : 0),
          };
        }),

      decreaseQuantity: (itemId) =>
        set((state) => {
          const updatedCartItems = state.cartItems
            .map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0);

          return {
            cartItems: updatedCartItems,
            cartCount: updatedCartItems.reduce(
              (count, i) => count + i.quantity,
              0
            ),
            totalPrice: updatedCartItems.reduce(
              (total, i) => total + i.price * i.quantity,
              0
            ),
          };
        }),
    }),
    {
      name: "cart",
    }
  )
);

export default useCartStore;
