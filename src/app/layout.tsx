import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import CartProvider, { Cart } from "@/components/store/CartProvider";
import { addToCart, getAllCartData } from "@/lib/data";
import { CartItemType, CartType } from "@/types/orderItemType";
import { getBasket } from "@/actions/product/basketAction";
import { getCookie, setCookie } from "@/lib/cookies";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const addToBasket = async (item: CartItemType) => {
    "use server";

    const existingCart = cookies().get("cartStore")?.value;
    const parsedCart: Cart = JSON.parse(existingCart!);
    console.log(
      "parsedCart ---------------------------------------------",
      parsedCart
    );

    const existingItem = parsedCart.items.find(
      (x: CartItemType) => x.productId === item.productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      parsedCart.items.push(item);
    }

    setCookie("cartStore", JSON.stringify(parsedCart));

    return parsedCart;
  };

  const cart: Cart = JSON.parse(
    (await cookies().get("cartStore")?.value) || JSON.stringify({ items: [] })
  );

  console.log("itemCart *****", cart);

  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider cart={cart}>
          <div className="flex flex-col min-h-screen">
            <Navbar addToBasket={addToBasket} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
