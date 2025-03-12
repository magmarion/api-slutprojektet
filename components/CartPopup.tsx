"use client"

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}

export default function CartPopup({ isOpen, onClose, cartItems }: CartPopupProps) {
  if (!isOpen) return null;

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}