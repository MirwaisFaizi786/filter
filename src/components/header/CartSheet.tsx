"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { CartItemType } from "@/types/orderItemType";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "../store/CartProvider";
import { cn } from "@/lib/utils";
import { Cart } from "@/components/store/CartProvider";

function CartSheet({
  addToBasket,
//   removeFromBasket,
}: {
  addToBasket: (item: CartItemType) => Promise<Cart>;
//   removeFromBasket: (productId: string) => void;
}) {
  const { cart } = useCart()((state) => state);
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            { cart && cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0 }
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            Review your selected items before checkout
          </SheetDescription>
        </SheetHeader>
        <div className="mt-2 flex flex-col flex-grow overflow-hidden">
          {cart?.items?.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4 overflow-y-auto flex-grow pr-4">
              {cart?.items?.map((item: CartItemType , index) => (
                <li
                  key={item.productId}
                  className={cn(
                    "flex gap-4 items-center border-b border-border pb-4",
                    index === cart?.items?.length - 1 && "border-none"
                  )}
                >
                  <Link href={`/product/${item.productId}`} className="shrink-0">
                    <SheetClose className="aspect-square w-20">
                      <Image
                        src={`/${item.imageUrl}`}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full rounded-md"
                      />
                    </SheetClose>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-foreground truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.categoryName} | {item.brandName}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      €{item.unitPrice}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        // onClick={() => decrease(item)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        // onClick={async () => increase(await addToBasket(item))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    // onClick={() => removeFromBasket(item.productId)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* <div className=" space-y-2 bg-gray-50  border-t border-border pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Items Price:</span>
            <span>€{cart?.itemsPrice?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax:</span>
            <span>€{cart?.taxPrice?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping:</span>
            <span>€{cart?.shippingPrice?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>€{cart?.totalPrice?.toFixed(2)}</span>
          </div>
          <Button className="w-full" disabled={cart?.items?.length === 0}>
            Checkout
          </Button>
        </div> */}
      </SheetContent>
    </Sheet>
  );
}

export default CartSheet;