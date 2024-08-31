"use client";
import { round2 } from "@/lib/utils";
import { CartItemType } from "@/types/orderItemType";
import { useState, createContext, useContext } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 || 0;
    const v = c === 'x' ? r : (r & 0x3) || 0x8;
    return v.toString(16);
  });
}

export type Cart = {
  items: CartItemType[];
};

const initialCartState: Cart = {
  items: [],
};

const createStore = (cart: Cart) =>
  create(
    persist<{
      cart: Cart;
      setCart: (cart: Cart) => void;
    }>(
      (set) => ({
        cart,
        setCart(cart: Cart) {
          set({ cart });
        },
      }),
      {
        name: "cartStore", // Key for localStorage
      }
    )
  );

const calcPrice = (items: CartItemType[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
    taxPrice = round2(Number(0.15 * itemsPrice)),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

const CartContext = createContext<ReturnType<typeof createStore> | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

const CartProvider = ({ children , cart }: { children: React.ReactNode, cart: Cart }) => {
  const [store] = useState(() => createStore( cart ));
  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
};

export default CartProvider;
