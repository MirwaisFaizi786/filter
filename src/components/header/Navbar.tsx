"use client";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Cart, useCart } from "../store/CartProvider";

import { CartItemType } from "@/types/orderItemType";
import CartSheet from "./CartSheet";
import { useEffect } from "react";

function Navbar({ addToBasket}: { addToBasket: (item: CartItemType) => Promise<Cart>}) {
const hook = useCart();
  const { cart } = hook();

 
  return (
    <nav className="w-full bg-gray-100">
      <div className="bg-gray-100 max-w-screen-xl flex flex-wrap p-4 items-center justify-between mx-auto">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-gray-100">
                Home
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-gray-100 p-2 ">
                <p>hello</p>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Cart Icon and Sheet */}
        <CartSheet addToBasket={addToBasket}  />
      </div>
    </nav>
  );
}

export default Navbar;
