"use client";

import { Cart, generateUUID, useCart } from "@/components/store/CartProvider";
import { ProductType } from "@/schema/product/productSchema";
import { CartItemType, CartType } from "@/types/orderItemType";

function Button({
  product,
  addToBasket,
}: {
  product: ProductType;
  addToBasket: () => Promise<Cart>;
}) {
  const hook = useCart();
  const { cart, setCart } = hook();

  const handleAddToCart = async () => {
    const itemCart = await addToBasket();

    setCart(itemCart);
    
  };
  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Add To Cart
    </button>
  );
}

export default Button;
